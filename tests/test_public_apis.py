import importlib.util
from pathlib import Path
import unittest
from urllib.parse import parse_qs, urlsplit

spec = importlib.util.spec_from_file_location('public_apis', Path(__file__).resolve().parents[1] / 'scripts/knowledge/collect-public-apis.py')
api = importlib.util.module_from_spec(spec)
spec.loader.exec_module(api)


class PublicApiTests(unittest.TestCase):
    def test_business_error_on_http_success(self):
        with self.assertRaisesRegex(ValueError, 'API business error'):
            api.parse_response(b'<response><header><resultCode>30</resultCode></header></response>')

    def test_json_single_record(self):
        rows, total = api.parse_response(b'{"response":{"header":{"resultCode":"00"},"body":{"totalCount":1,"items":{"item":{"name":"bank"}}}}}')
        self.assertEqual(rows, [{'name': 'bank'}])
        self.assertEqual(total, 1)

    def test_pagination_and_secret_not_in_candidates(self):
        calls = []
        source = next(s for s in api.CATALOG if s['id'] == 'source.kdic.insured-products')
        def loader(url):
            query = parse_qs(urlsplit(url).query)
            calls.append(query)
            page = query['pageNo'][0]
            return f'<response><header><resultCode>00</resultCode></header><body><totalCount>2</totalCount><items><item><num>{page}</num><prdNm>A&amp;B</prdNm></item></items></body></response>'.encode()
        result = api.collect(source, {'DATA_GO_KR_SERVICE_KEY': 'test%2Bkey'}, {}, all_pages=True, loader=loader)
        self.assertEqual(len(calls), 2)
        self.assertEqual(calls[0]['serviceKey'], ['test+key'])
        self.assertEqual(calls[0]['resultType'], ['json'])
        self.assertEqual(result['collected_count'], 2)
        self.assertTrue(result['complete'])
        self.assertEqual(result['candidates'][0]['fields']['prdNm'], 'A&B')
        self.assertNotIn('test+key', str(result))
        self.assertFalse(result['candidates'][0]['public_eligible'])

    def test_repeated_page_is_rejected(self):
        source = next(s for s in api.CATALOG if s['id'] == 'source.kdic.insured-products')
        body = b'<response><resultCode>00</resultCode><totalCount>2</totalCount><items><item><num>1</num></item></items></response>'
        with self.assertRaisesRegex(ValueError, 'repeated'):
            api.collect(source, {'DATA_GO_KR_SERVICE_KEY': 'test'}, {}, all_pages=True, loader=lambda url: body)

    def test_overlapping_provider_pages_use_unique_ids(self):
        source = api.CATALOG[0]
        def loader(url):
            page = int(parse_qs(urlsplit(url).query)['pageNo'][0])
            ids = {1: [1, 2], 2: [2, 3], 3: [3, 4]}[page]
            items = ''.join(f'<item><idNo>{i}</idNo></item>' for i in ids)
            return f'<response><resultCode>00</resultCode><totalCount>4</totalCount><items>{items}</items></response>'.encode()
        result = api.collect(source, {'DATA_GO_KR_SERVICE_KEY': 'test'}, {}, all_pages=True, loader=loader)
        self.assertEqual(result['collected_count'], 4)
        self.assertEqual([c['fields']['idNo'] for c in result['candidates']], ['1', '2', '3', '4'])

    def test_overlapping_identity_with_changed_content_is_rejected(self):
        source = api.CATALOG[0]
        def loader(url):
            page = parse_qs(urlsplit(url).query)['pageNo'][0]
            return f'<response><resultCode>00</resultCode><totalCount>2</totalCount><items><item><idNo>1</idNo><value>{page}</value></item></items></response>'.encode()
        with self.assertRaisesRegex(ValueError, 'conflicting'):
            api.collect(source, {'DATA_GO_KR_SERVICE_KEY': 'test'}, {}, all_pages=True, loader=loader)

    def test_catalog_has_all_data_go_sources(self):
        self.assertEqual(len(api.CATALOG), 15)
        self.assertEqual(len({s['id'] for s in api.CATALOG}), 15)
        for source in api.CATALOG:
            for op in source['operations']:
                self.assertEqual(urlsplit(op['url']).hostname, 'apis.data.go.kr')

    def test_kdic_operation_wrapped_json(self):
        rows, total = api.parse_response(b'{"getProductList202607":{"header":{"resultCode":"00"},"item":[{"num":"1101","prdNm":"A & B"}],"totalCount":45226}}')
        self.assertEqual(total, 45226)
        self.assertEqual(rows[0]['prdNm'], 'A & B')

    def test_bank_tables_paginate_independently(self):
        source = next(s for s in api.CATALOG if s['id'] == 'source.fsc.domestic-bank-statistics')
        def loader(url):
            page = int(parse_qs(urlsplit(url).query)['pageNo'][0])
            tables = ''
            for title, count in [('employees', 3), ('branches', 1), ('empty', 0)]:
                item = f'<item><value>{page}</value></item>' if page <= count else ''
                tables += f'<table><title>{title}</title><totalCount>{count}</totalCount><items>{item}</items></table>'
            return f'<response><header><resultCode>00</resultCode></header><body>{tables}</body></response>'.encode()
        result = api.collect(source, {'DATA_GO_KR_SERVICE_KEY': 'test'}, {}, all_pages=True, loader=loader)
        self.assertEqual(result['total_count'], 4)
        self.assertEqual(result['collected_count'], 4)
        self.assertEqual(result['table_counts'], {'employees': 3, 'branches': 1, 'empty': 0})
        self.assertEqual(result['candidates'][1]['fields']['_source_table'], 'branches')

    def test_kdic_missing_sequence_is_rejected(self):
        source = next(s for s in api.CATALOG if s['id'] == 'source.kdic.insured-products')
        body = b'{"getProductList202607":{"header":{"resultCode":"00"},"item":[{"num":"2"}],"totalCount":1}}'
        with self.assertRaisesRegex(ValueError, 'missing KDIC'):
            api.collect(source, {'DATA_GO_KR_SERVICE_KEY': 'test'}, {}, all_pages=True, loader=lambda url: body)


if __name__ == '__main__':
    unittest.main()
