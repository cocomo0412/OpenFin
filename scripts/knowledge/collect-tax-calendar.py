"""Collect the official evidence used by the explicitly reviewed 2026 rules.

This does not advance review dates on its own. A different year requires another
manual review of deadline-reviews.mjs and the relevant statutory provisions.
"""
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup

OUT = Path(__file__).resolve().parents[2] / '.api-candidates/disclosures'


def collect(url, expected):
    with urlopen(Request(url, headers={'User-Agent': 'OpenFin official source review'}), timeout=30) as response:
        raw = response.read()
        text = BeautifulSoup(raw, 'html.parser').get_text(' ', strip=True)
        if any(fragment not in text for fragment in expected):
            raise ValueError('Official page changed; manual review required: ' + url)
        return {'text': text, 'receipt': {
            'url': url, 'final_url': response.url, 'http_status': response.status,
            'collected_at': datetime.now(timezone.utc).isoformat(),
            'sha256': hashlib.sha256(raw).hexdigest(),
        }}


if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    calendars = []
    for month in ['05', '06', '07', '10']:
        url = f'https://www.nts.go.kr/nts/ad/taxSchdul/selectList.do?mi=135747&taxYear=2026&taxMonth={month}'
        calendars.append({'month': month, **collect(url, ['2026', '원천세'])})
    guide = {'id': 'source.nts.vat.overview', **collect(
        'https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7693&mi=2272',
        ['10,400만원', '매출세액(매출액의 10%)'])}
    # Only replace the evidence set when every requested page was accepted.
    for filename, data in [('tax-calendars-2026.json', {'results': calendars}), ('vat-overview.json', guide)]:
        (OUT / filename).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding='utf-8')
    print('Collected four 2026 calendars and the official VAT guide; rule review remains separate.')
