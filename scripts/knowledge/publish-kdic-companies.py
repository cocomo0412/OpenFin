"""Validate a complete KDIC company snapshot before publishing reference data."""
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def validate(data):
    rows = [c['fields'] for c in data['candidates']]
    if not data['complete'] or len(rows) != data['total_count'] or not rows:
        raise ValueError('Incomplete company snapshot')
    if any(not r.get('fncIstNm', '').strip() or '\ufffd' in r['fncIstNm'] for r in rows):
        raise ValueError('Missing or corrupted company name')
    if len({r['num'] for r in rows}) != len(rows):
        raise ValueError('Duplicate company row identifier')
    if {int(r['num']) for r in rows} != set(range(1, len(rows) + 1)):
        raise ValueError('Missing company row identifier')
    return rows


if __name__ == '__main__':
    source = ROOT / '.api-candidates/source.kdic.insured-products-1.json'
    data = json.loads(source.read_text(encoding='utf-8'))
    rows = validate(data)
    output = {
        'source': '예금보험공사 예금자보호 금융상품 API · 보호대상 금융회사 목록',
        'source_url': 'https://www.data.go.kr/data/3037352/openapi.do',
        'operation': data['operation'],
        'collected_at': data['collected_at'],
        'validated_at': datetime.now(timezone.utc).isoformat(),
        'source_basis_date': None,
        'validation': '전체 페이지·총건수·연속 행번호·필수 회사명·문자 인코딩 확인',
        'scope': 'API에 등재된 금융회사 목록입니다. 개별 상품의 보호 여부·판매 상태·금리는 검증하지 않았습니다.',
        'count': len(rows),
        'checksum': hashlib.sha256(json.dumps(rows, ensure_ascii=False, sort_keys=True).encode()).hexdigest(),
        'companies': rows,
    }
    (ROOT / 'docs/opentax/kdic-companies-current.json').write_text(json.dumps(output, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'validated_companies': len(rows), 'collected_at': data['collected_at']}))
