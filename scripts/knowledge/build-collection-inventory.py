"""Validate and publish official API reference snapshots separately from product assertions."""
import hashlib
import json
from datetime import datetime, timezone, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def validate(data):
    rows = data['candidates']
    if not data['complete'] or not rows or len(rows) != data['total_count'] or len(rows) != data['collected_count']:
        raise ValueError('Incomplete or inconsistent snapshot')
    for row in rows:
        digest = hashlib.sha256(json.dumps(row['fields'], ensure_ascii=False, sort_keys=True).encode()).hexdigest()
        if row['checksum'] != 'sha256:' + digest or row['source_id'] != data['source_id']:
            raise ValueError('Snapshot integrity mismatch')
        for field in ('basDt', 'basYm', 'bizYear'):
            if field in data.get('request_filters', {}) and str(row['fields'].get(field)) != data['request_filters'][field]:
                raise ValueError('Basis filter mismatch')
    if data.get('table_counts'):
        counts = {title: 0 for title in data['table_counts']}
        for row in rows:
            counts[row['fields']['_source_table']] += 1
        if counts != data['table_counts']:
            raise ValueError('Table counts mismatch')
    if data['source_id'] == 'source.kdic.insured-products':
        if {int(row['fields']['num']) for row in rows} != set(range(1, len(rows) + 1)):
            raise ValueError('KDIC row sequence mismatch')
    return rows


def main():
    catalog = json.loads((ROOT / 'scripts/knowledge/public-api-catalog.json').read_text(encoding='utf-8'))['sources']
    titles = {s['id']: s['title'] for s in catalog}
    titles['source.bok.ecos'] = '한국은행 기준금리'
    output_dir = ROOT / 'docs/opentax/api-snapshots'
    output_dir.mkdir(exist_ok=True)
    entries = []
    for path in sorted((ROOT / '.api-candidates').glob('source.*-*.json')):
        data = json.loads(path.read_text(encoding='utf-8'))
        rows = validate(data)
        dates = sorted({str(r['fields'][field]) for r in rows for field in ('basDt', 'basYm', 'TIME') if r['fields'].get(field)})
        # Publish a separate reference layer. Do not mark legacy product nodes or
        # comparison/recommendation assertions as verified by transport checks.
        payload = {
            'source_id': data['source_id'], 'title': titles[data['source_id']],
            'source_url': rows[0]['documentation'], 'collected_at': data['collected_at'],
            'verification': 'collection_integrity_only', 'recommendation_eligible': False,
            'count': len(rows), 'items': [row['fields'] for row in rows],
        }
        (output_dir / path.name).write_text(json.dumps(payload, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
        entries.append({
            'source_id': data['source_id'], 'title': titles[data['source_id']],
            'operation': data.get('operation', 'StatisticSearch').split('/')[-1],
            'count': len(rows), 'collected_at': data['collected_at'],
            'basis_start': dates[0] if dates else None, 'basis_end': dates[-1] if dates else None,
            'filters': data.get('request_filters', {}),
            'table_counts': data.get('table_counts', {}),
            'path': 'opentax/api-snapshots/' + path.name,
            'reference_published': True,
            'status': 'collected_integrity_checked', 'canonical_applied': False,
        })
    result = {
        'generated_at': datetime.now(timezone.utc).isoformat(),
        'snapshot_basis_date': max(datetime.fromisoformat(entry['collected_at']).astimezone(timezone(timedelta(hours=9))).date().isoformat() for entry in entries),
        'basis_date_meaning': '공식 API 수집본을 포함한 사이트 자료 묶음의 최종 수집 기준일. 개별 원자료의 기준일과 기존 온톨로지 검토일은 별도입니다.',
        'scope': 'API 수집본의 전체 건수·체크섬·지정 기준일을 확인했습니다. 상품별 의미 검증 및 기존 온톨로지 병합은 별도 단계이며, 전체 상품의 현행화를 뜻하지 않습니다.',
        'datasets': entries,
        'pending': [],
    }
    (ROOT / 'docs/opentax/collection-inventory.json').write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({'datasets': len(entries), 'sources': len({e['source_id'] for e in entries}), 'rows': sum(e['count'] for e in entries)}))


if __name__ == '__main__':
    main()
