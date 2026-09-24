"""Collect supplemental laws used in the September reconciliation.

Collection alone never approves any rule or changes its review date.
"""
import concurrent.futures
import importlib.util
import json
from pathlib import Path

spec = importlib.util.spec_from_file_location('disclosures', Path(__file__).with_name('collect-disclosures.py'))
collector = importlib.util.module_from_spec(spec)
spec.loader.exec_module(collector)
SOURCES = [
    ('source.law.tax-special-treatment-decree.e-filing', '조세특례제한법시행령/제104조의5'),
    ('source.law.securities-transaction-decree.rates', '증권거래세법시행령/제5조'),
    ('source.law.education-tax-act.full', '교육세법'),
    ('source.law.comprehensive-real-estate-act.full', '종합부동산세법'),
    ('source.law.customs-act.full', '관세법'),
    ('source.law.comprehensive-real-estate-decree.ratio', '종합부동산세법시행령/제2조의4'),
    ('source.law.individual-consumption-decree.flexible', '개별소비세법시행령/제2조의2'),
    ('source.law.transport-energy-decree.flexible', '교통ㆍ에너지ㆍ환경세법시행령/제3조의2'),
    ('source.law.liquor-decree.rates', '주세법시행령'),
    ('source.law.income-decree.capital-gains', '소득세법시행령/제167조의9'),
    ('source.law.tax-special-treatment-2012.pension', 'https://www.law.go.kr/LSW/lsInfoR.do?lsiSeq=128964&chrClsCd=010202&efYd=20121002&ancYnChk=0'),
    ('source.law.tax-reduction-1997.housing', 'https://www.law.go.kr/LSW/lsInfoR.do?lsiSeq=50697&chrClsCd=010202&efYd=19970830&ancYnChk=0'),
]

def collect(entry):
    ident, title = entry
    result = collector.collect_source({'id': ident, 'title': title, 'url': title if title.startswith('https://') else 'https://www.law.go.kr/법령/' + title})
    if ident == 'source.law.education-tax-act.full' and 'error' not in result:
        result['table_receipts'] = []
        for image in result['images']:
            if 'flDownload.do?flSeq=159656199' in image['url']:
                _, receipt = collector.retrieve(image['url'])
                result['table_receipts'].append(receipt)
    return result

if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        results = list(pool.map(collect, SOURCES))
    if any('error' in row for row in results):
        raise RuntimeError(json.dumps([row for row in results if 'error' in row], ensure_ascii=False))
    (collector.OUT / 'tax-extra-sources.json').write_text(json.dumps({'results': results}, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f'Collected {len(results)} supplemental laws; manual rule review remains required.')
