"""Official API -> unreviewed candidates. No public knowledge is overwritten.

Python 3.10+, standard library only. Defaults to one-page probe, no files saved.
"""
import argparse
import hashlib
import json
import os
import time
from datetime import datetime, timezone
from pathlib import Path
import urllib.error
from urllib.parse import urlencode, unquote, quote
from urllib.request import urlopen
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[2]
CATALOG = json.loads((Path(__file__).with_name('public-api-catalog.json')).read_text(encoding='utf-8'))['sources']


def load_environment():
    env = dict(os.environ)
    p = ROOT / '.env'
    if p.exists():
        for line in p.read_text(encoding='utf-8-sig').splitlines():
            if '=' in line and not line.lstrip().startswith('#'):
                name, value = line.split('=', 1)
                env.setdefault(name.strip(), value.strip().strip('"').strip("'"))
    return env


def parse_response(raw, with_tables=False):
    """Preserve provider field names and check business errors, even on HTTP 200."""
    if raw.lstrip().startswith(b'{'):
        value = json.loads(raw)
        response = value.get('response', value)
        for wrapper in ('getProductList202607', 'getCompanyList202607'):
            if wrapper in value:
                response = value[wrapper]
        header = response.get('header', response.get('RESULT', {}))
        code = str(header.get('resultCode', header.get('CODE', '')))
        if code not in ('00', '000', '0000', 'INFO-000'):
            raise ValueError('API business error: ' + (code or 'missing result code'))
        body = response.get('body', response)
        items = body.get('items', body.get('item')) or []
        if isinstance(items, dict):
            items = items.get('item') or []
        if isinstance(items, dict):
            items = [items]
        result = (items, int(body.get('totalCount', len(items))))
        return (*result, {}) if with_tables else result
    root = ET.fromstring(raw)
    for el in root.iter():
        el.tag = el.tag.split('}')[-1]
    code = root.findtext('.//resultCode') or root.findtext('.//returnReasonCode')
    if code not in ('00', '000', '0000'):
        raise ValueError('API business error: ' + (code or 'missing result code'))
    tables = root.findall('./body/table')
    if tables:
        items, totals = [], {}
        for table in tables:
            title = table.findtext('title')
            if not title or title in totals:
                raise ValueError('API missing or duplicate table title')
            totals[title] = int(table.findtext('totalCount'))
            for item in table.findall('./items/item'):
                row = {el.tag: ''.join(el.itertext()).strip() for el in item}
                row['_source_table'] = title
                items.append(row)
        result = (items, sum(totals.values()))
        return (*result, totals) if with_tables else result
    items = [{el.tag: ''.join(el.itertext()).strip() for el in item} for item in root.findall('.//item')]
    result = (items, int(root.findtext('.//totalCount') or len(items)))
    return (*result, {}) if with_tables else result


def request(url):
    try:
        with urlopen(url, timeout=20) as response:
            raw = response.read(8_000_001)
            if len(raw) > 8_000_000:
                raise ValueError('API response exceeded 8 MB')
            return raw
    except urllib.error.HTTPError as exc:
        raise ValueError(f'HTTP {exc.code}; check service approval and key') from None
    except urllib.error.URLError:
        raise ValueError('API connection failed') from None


def candidate(source, record):
    canonical = json.dumps(record, ensure_ascii=False, sort_keys=True)
    digest = hashlib.sha256(canonical.encode()).hexdigest()
    # Snapshot IDs identify exact records; field names are retained for review.
    return {'id': source['id'] + ':' + digest[:24], 'source_id': source['id'],
            'documentation': source['documentation'], 'verification_status': 'collected_unreviewed',
            'public_eligible': False, 'checksum': 'sha256:' + digest, 'fields': record}


def collect(source, env, params, operation=0, all_pages=False, loader=request):
    key = env.get(source['credential_env'], '')
    if not key:
        raise ValueError('Missing credential: ' + source['credential_env'])
    op = source['operations'][operation]
    if 'serviceKey' in params or 'ServiceKey' in params:
        raise ValueError('Pass credentials through .env only')
    for required in op['required']:
        if required not in params and required not in ('resultType', 'type'):
            raise ValueError('Missing required parameter: ' + required)
    records, seen, record_ids = [], set(), {}
    expected_total = None
    expected_tables, table_counts = None, {}
    identity_field = {
        'source.data.go.kr.kinfa-loan-handling-agencies': 'idNo',
        'source.data.go.kr.kinfa-loan-products': 'seq',
        'source.kdic.insured-products': 'num',
    }.get(source['id'])
    for page in range(1, 1001):
        query = {'pageNo': page, 'numOfRows': 100, **params}
        query['pageNo'] = page
        query['serviceKey'] = unquote(key)
        if source['id'] == 'source.kdic.insured-products':
            query.setdefault('resultType', 'json')
        for field in ('resultType', 'type'):
            if field in op['required']:
                query.setdefault(field, 'xml')
        for attempt in range(3):
            try:
                items, total, tables = parse_response(loader(op['url'] + '?' + urlencode(query)), with_tables=True)
                break
            except ValueError as exc:
                if str(exc) != 'API business error: 04' or attempt == 2:
                    raise ValueError(f'API page {page} failed: {exc}') from None
                time.sleep(1 + attempt)
        if page % 25 == 0:
            print(f'Collected page {page}: {len(records) + len(items)}/{total}', flush=True)
        fingerprint = json.dumps(items, sort_keys=True)
        if items and fingerprint in seen:
            raise ValueError('API repeated a page; collection incomplete')
        seen.add(fingerprint)
        if expected_total is not None and total != expected_total:
            raise ValueError('API total changed during collection; retry snapshot')
        expected_total = total
        if expected_tables is not None and tables != expected_tables:
            raise ValueError('API table totals changed during collection')
        expected_tables = tables
        for item in items:
            # These two providers return overlapping ranges on later pages.
            # Reconcile by their explicit row IDs, never by page-size arithmetic.
            if identity_field:
                identity = item.get(identity_field)
                if not identity:
                    raise ValueError('API missing record identity')
                if identity in record_ids:
                    if record_ids[identity] != item:
                        raise ValueError('API conflicting records for one identity')
                    continue
                record_ids[identity] = item
            records.append(item)
            if tables:
                title = item['_source_table']
                table_counts[title] = table_counts.get(title, 0) + 1
                if table_counts[title] > tables[title]:
                    raise ValueError('API table count exceeds declared total')
        if len(records) > total:
            raise ValueError('API count exceeds declared total')
        complete = len(records) == total
        if complete or not all_pages:
            if complete and any(table_counts.get(title, 0) != count for title, count in tables.items()):
                raise ValueError('API incomplete table')
            if complete and source['id'] == 'source.kdic.insured-products' and {int(row['num']) for row in records} != set(range(1, total + 1)):
                raise ValueError('API missing KDIC row numbers')
            return {'source_id': source['id'], 'operation': op['url'], 'complete': complete,
                    'total_count': total, 'collected_count': len(records),
                    'table_counts': tables,
                    'request_filters': {k: v for k, v in params.items() if k not in ('numOfRows', 'resultType', 'type')},
                    'candidates': [candidate(source, item) for item in records]}
        if not items:
            raise ValueError('API ended before declared total')
    raise ValueError('Page limit exceeded; collection incomplete')


def collect_ecos(env, params, all_pages=False):
    key = env.get('ECOS_API_KEY')
    if not key:
        raise ValueError('Missing credential: ECOS_API_KEY')
    required = ['stat_code', 'cycle', 'start', 'end', 'item_code']
    if any(not params.get(p) for p in required):
        raise ValueError('ECOS requires: ' + ', '.join(required))
    rows = []
    for start in range(1, 1000001, 100):
        parts = ['StatisticSearch', key, 'json', 'kr', str(start), str(start + 99)] + [params[p] for p in required]
        payload = json.loads(request('https://ecos.bok.or.kr/api/' + '/'.join(quote(v, safe='') for v in parts)))
        data = payload.get('StatisticSearch')
        if not data:
            raise ValueError('ECOS error: ' + str(payload.get('RESULT', {}).get('CODE', 'invalid response')))
        batch = data.get('row', [])
        rows.extend(batch)
        total = int(data['list_total_count'])
        if len(rows) >= total or not all_pages:
            source = {'id': 'source.bok.ecos', 'documentation': 'https://ecos.bok.or.kr/api/'}
            return {'source_id': source['id'], 'complete': len(rows) >= total, 'total_count': total,
                    'collected_count': len(rows), 'candidates': [candidate(source, row) for row in rows]}
        if not batch:
            raise ValueError('ECOS incomplete response')
    raise ValueError('ECOS page limit exceeded')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', choices=[s['id'] for s in CATALOG] + ['source.bok.ecos'])
    parser.add_argument('--list', action='store_true')
    parser.add_argument('--operation', type=int, default=0)
    parser.add_argument('--param', action='append', default=[], metavar='NAME=VALUE')
    parser.add_argument('--all-pages', action='store_true')
    parser.add_argument('--write', action='store_true', help='Save complete candidates locally; confirm provider storage terms first')
    args = parser.parse_args()
    env = load_environment()
    if args.list:
        print(json.dumps([{'source_id': s['id'], 'credential_configured': bool(env.get(s['credential_env'])),
                           'utilization_approval': 'not_verified', 'operations': len(s['operations'])} for s in CATALOG] +
                         [{'source_id': 'source.bok.ecos', 'credential_configured': bool(env.get('ECOS_API_KEY')), 'utilization_approval': 'not_verified'}], indent=2))
        return
    if not args.source:
        parser.error('--source is required unless --list is used')
    params = dict(value.split('=', 1) for value in args.param)
    if args.source == 'source.bok.ecos':
        result = collect_ecos(env, params, args.all_pages)
    else:
        source = next(s for s in CATALOG if s['id'] == args.source)
        result = collect(source, env, params, args.operation, args.all_pages)
    result['collected_at'] = datetime.now(timezone.utc).isoformat()
    if args.write:
        if not result['complete']:
            raise ValueError('Refusing partial output; use filters or --all-pages')
        output = ROOT / '.api-candidates' / (args.source + f'-{args.operation}.json')
        output.parent.mkdir(exist_ok=True)
        output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({k: v for k, v in result.items() if k != 'candidates'}, ensure_ascii=False))


if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        # Exception URLs may contain credentials; never print arbitrary exceptions.
        if isinstance(exc, ValueError) and str(exc).startswith(('API ', 'Missing ', 'HTTP ', 'ECOS ', 'Page ', 'Refusing ', 'Pass ')):
            print(str(exc))
        else:
            print('Collection failed: ' + type(exc).__name__)
        raise SystemExit(1)
