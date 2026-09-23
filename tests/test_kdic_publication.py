import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location('publisher', Path(__file__).resolve().parents[1] / 'scripts/knowledge/publish-kdic-companies.py')
publisher = importlib.util.module_from_spec(spec)
spec.loader.exec_module(publisher)


class PublicationTests(unittest.TestCase):
    def snapshot(self, rows):
        return {'complete': True, 'total_count': len(rows), 'candidates': [{'fields': r} for r in rows]}

    def test_valid(self):
        rows = [{'num': '1', 'fncIstNm': '은행'}]
        self.assertEqual(publisher.validate(self.snapshot(rows)), rows)

    def test_incomplete_or_corrupted_is_rejected(self):
        for rows in [[], [{'num': '1', 'fncIstNm': ''}], [{'num': '2', 'fncIstNm': '은행'}], [{'num': '1', 'fncIstNm': '\ufffd'}], [{'num': '1', 'fncIstNm': '가'}, {'num': '1', 'fncIstNm': '나'}]]:
            with self.subTest(rows=rows), self.assertRaises(ValueError):
                publisher.validate(self.snapshot(rows))
        data = self.snapshot([{'num': '1', 'fncIstNm': '은행'}])
        data['complete'] = False
        with self.assertRaises(ValueError):
            publisher.validate(data)
