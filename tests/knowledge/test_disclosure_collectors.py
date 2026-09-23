import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('collector', ROOT / 'scripts/knowledge/collect-disclosures.py')
collector = importlib.util.module_from_spec(spec)
spec.loader.exec_module(collector)


class Response:
    def __init__(self, data): self.data = data
    def read(self, *args): return self.data
    def __enter__(self): return self
    def __exit__(self, *args): pass


class WooriCollectorTest(unittest.TestCase):
    def collect(self, code='500045', title='카드의정석2 ROUTINE', body=None):
        row = {'id': 'test.card', 'provider': '우리카드', 'title': '카드의정석2 ROUTINE'}
        detail = {'crd01DtlVo': {'cdPrdCd': code, 'cdPrdNm': title},
                  'bdtCntnts': body if body is not None else '&lt;p&gt;' + '실적 조건 및 할인 한도 안내 ' * 100 + '&lt;/p&gt;'}
        raw = json.dumps({'resultVo': detail, 'elHeader': {'clientIp': 'private-metadata'}}).encode()
        with tempfile.TemporaryDirectory() as directory, patch.object(collector, 'OUT', Path(directory)), \
                patch.object(collector.urllib.request, 'build_opener') as factory:
            factory.return_value.open.side_effect = [Response(b'<html></html>'), Response(raw)]
            result = collector.collect_woori(row, 'https://pc.wooricard.com/dcpc/yh1/crd/crd01/H1CRD101S02.do?cdPrdCd=500045')
            request = factory.return_value.open.call_args_list[1].args[0]
            self.assertEqual(request.get_header('Proworks-body'), 'Y')
            self.assertNotIn('private-metadata', json.dumps(result))
            self.assertNotIn('private-metadata', next(Path(directory).glob('*.json')).read_text(encoding='utf-8'))
            return result

    def test_public_detail_receipt_and_decoded_terms(self):
        result = self.collect()
        self.assertIn('실적 조건', result['text'])
        self.assertEqual(result['receipt']['product_code'], '500045')
        self.assertEqual(len(result['receipt']['sha256']), 64)

    def test_wrong_product_code_is_not_accepted(self):
        with self.assertRaisesRegex(ValueError, 'code mismatch'): self.collect(code='103489')

    def test_wrong_card_name_is_not_accepted(self):
        with self.assertRaisesRegex(ValueError, 'name mismatch'): self.collect(title='위비트래블 체크카드')

    def test_summary_without_terms_is_not_accepted(self):
        with self.assertRaisesRegex(ValueError, 'terms missing'): self.collect(body='혜택 요약')


if __name__ == '__main__': unittest.main()
