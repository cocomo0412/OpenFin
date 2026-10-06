import importlib.util
from pathlib import Path
import unittest
import json
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


class EcosIntegrityTests(unittest.TestCase):
    params = {'stat_code': '722Y001', 'cycle': 'D', 'start': '20261001', 'end': '20261031', 'item_code': '0101000'}

    @staticmethod
    def row(day='20261001', value='2.5'):
        return {'STAT_CODE': '722Y001', 'ITEM_CODE1': '0101000', 'TIME': day, 'DATA_VALUE': value}

    def collect(self, pages, all_pages=True):
        responses = iter(pages)
        return api.collect_ecos({'ECOS_API_KEY': 'synthetic'}, self.params, all_pages,
            loader=lambda url: json.dumps({'StatisticSearch': next(responses)}).encode())

    def test_unique_pages_are_complete_and_probe_is_partial(self):
        pages = [{'list_total_count': 2, 'row': [self.row()]}, {'list_total_count': 2, 'row': [self.row('20261002')]}]
        result = self.collect(pages)
        self.assertTrue(result['complete'])
        self.assertEqual(result['collected_count'], 2)
        self.assertFalse(self.collect(pages, False)['complete'])

    def test_duplicate_and_changed_value_at_same_identity_are_rejected(self):
        for value in ['2.5', '3.0']:
            with self.assertRaisesRegex(ValueError, 'duplicate'):
                self.collect([{'list_total_count': 2, 'row': [self.row(), self.row(value=value)]}])

    def test_total_changes_overcount_and_empty_early_page_rejected(self):
        for total in [1, 3]:
            with self.assertRaisesRegex(ValueError, 'total changed'):
                self.collect([{'list_total_count': 2, 'row': [self.row()]}, {'list_total_count': total, 'row': [self.row('20261002')]}])
        with self.assertRaisesRegex(ValueError, 'exceeded'):
            self.collect([{'list_total_count': 1, 'row': [self.row(), self.row('20261002')]}])
        with self.assertRaisesRegex(ValueError, 'incomplete'):
            self.collect([{'list_total_count': 2, 'row': []}])

    def test_wrong_series_period_and_missing_identity_rejected(self):
        for row in [{**self.row(), 'STAT_CODE': 'wrong'}, self.row('20260930'), {'TIME': '20261001'}]:
            with self.assertRaises(ValueError):
                self.collect([{'list_total_count': 1, 'row': [row]}])

    def test_publication_gate_rejects_duplicate_observations_independently(self):
        spec = importlib.util.spec_from_file_location('inventory', Path(api.__file__).with_name('build-collection-inventory.py'))
        inventory = importlib.util.module_from_spec(spec); spec.loader.exec_module(inventory)
        source = {'id': 'source.bok.ecos', 'documentation': 'https://ecos.bok.or.kr/api/'}
        snapshot = {'source_id': source['id'], 'complete': True, 'total_count': 2, 'collected_count': 2,
                    'candidates': [api.candidate(source, self.row()), api.candidate(source, self.row(value='3.0'))]}
        with self.assertRaisesRegex(ValueError, 'duplicate'):
            inventory.validate(snapshot)
        for value in [None, '', '  ']:
            row = {**self.row(), 'STAT_CODE': value}
            invalid = {**snapshot, 'total_count': 1, 'collected_count': 1, 'candidates': [api.candidate(source, row)]}
            with self.assertRaisesRegex(ValueError, 'missing observation identity'):
                inventory.validate(invalid)
            with self.assertRaisesRegex(ValueError, 'missing observation identity'):
                self.collect([{'list_total_count': 1, 'row': [row]}])


if __name__ == '__main__':
    unittest.main()
