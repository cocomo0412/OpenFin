"""Refresh approved API snapshots; preserve provider dates and reject partial data."""
import concurrent.futures
import argparse
import importlib.util
import json
from datetime import datetime, timezone, timedelta
from pathlib import Path

HERE=Path(__file__).parent
spec=importlib.util.spec_from_file_location('collector',HERE/'collect-public-apis.py')
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
spec=importlib.util.spec_from_file_location('inventory',HERE/'build-collection-inventory.py')
v=importlib.util.module_from_spec(spec);spec.loader.exec_module(v)
env=c.load_environment()
today=datetime.now(timezone(timedelta(hours=9))).date()

def refresh(job):
    sid=job['source_id']; op=job['operation_index']; params=dict(job.get('params',{}))
    path=c.ROOT/'.api-candidates'/f'{sid}-{op}.json'
    old=json.loads(path.read_text(encoding='utf-8')) if path.exists() else {}
    result={'source_id':sid,'operation_index':op,'checked_at':datetime.now(timezone.utc).isoformat()}
    try:
        if sid=='source.bok.ecos':
            # A month boundary or holiday must not create a false empty failure.
            params.update(start=(today-timedelta(days=job.get('lookback_days',45))).strftime('%Y%m%d'),end=today.strftime('%Y%m%d'))
            data=c.collect_ecos(env,params,True)
        else:
            source=next(s for s in c.CATALOG if s['id']==sid)
            # Discover available provider periods, never substitute today's date
            # for a financial reporting period that the provider has not issued.
            fields=job.get('latest_period_fields',[])
            if fields:
                probe=c.collect(source,env,{'numOfRows':'100'},op,False)
                for field in fields:
                    values=[str(r['fields'][field]) for r in probe['candidates'] if r['fields'].get(field)]
                    previous=old.get('request_filters',{}).get(field)
                    if previous: values.append(str(previous))
                    if not values: raise ValueError('No provider reporting period found')
                    params[field]=max(values)
            request_params={**params}
            if sid=='source.kdic.insured-products': request_params['numOfRows']='1000'
            data=c.collect(source,env,request_params,op,True)
        data.update(collected_at=datetime.now(timezone.utc).isoformat(),request_filters=params)
        v.validate(data)
        path.parent.mkdir(exist_ok=True)
        temporary=path.with_suffix('.tmp')
        temporary.write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
        temporary.replace(path)
        result.update(status='complete',count=data['collected_count'],filters=params)
    except Exception as error:
        # Arbitrary network exception text can contain the authentication key.
        result.update(status='failed',error_type=type(error).__name__)
    print(json.dumps(result,ensure_ascii=False),flush=True)
    return result

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--retry-failed',action='store_true')
    parser.add_argument('--source')
    args=parser.parse_args()
    jobs=json.loads((HERE/'public-api-refresh-plan.json').read_text(encoding='utf-8'))['jobs']
    report_path=c.ROOT/'.api-candidates/api-refresh-run.json'
    previous=json.loads(report_path.read_text(encoding='utf-8')) if report_path.exists() else {'results':[]}
    if args.source:
        jobs=[j for j in jobs if j['source_id']==args.source]
        if not jobs: parser.error('Unknown source')
    if args.retry_failed:
        failed={(r['source_id'],r['operation_index']) for r in previous['results'] if r['status']=='failed'}
        jobs=[j for j in jobs if (j['source_id'],j['operation_index']) in failed]
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        results=list(pool.map(refresh,jobs))
    if args.retry_failed or args.source:
        merged={(r['source_id'],r['operation_index']):{**r,'checked_at':r.get('checked_at',previous.get('checked_at'))} for r in previous['results']}
        merged.update({(r['source_id'],r['operation_index']):r for r in results})
        results=list(merged.values())
    report={'checked_at':datetime.now(timezone.utc).isoformat(),'results':results}
    report_path.parent.mkdir(exist_ok=True)
    report_path.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    raise SystemExit(1 if any(r['status']!='complete' for r in results) else 0)
