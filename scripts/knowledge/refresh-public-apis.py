"""Refresh approved API snapshots; preserve provider dates and reject partial data."""
import concurrent.futures
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

def refresh(path):
    old=json.loads(path.read_text(encoding='utf-8'))
    sid=old['source_id']; op=int(path.stem.rsplit('-',1)[1]); params=dict(old.get('request_filters',{}))
    result={'source_id':sid,'operation_index':op}
    try:
        if sid=='source.bok.ecos':
            params.update(start=today.replace(day=1).strftime('%Y%m%d'),end=today.strftime('%Y%m%d'))
            data=c.collect_ecos(env,params,True)
        else:
            source=next(s for s in c.CATALOG if s['id']==sid)
            # Discover available provider periods, never substitute today's date
            # for a financial reporting period that the provider has not issued.
            fields=[k for k in ('basDt','basYm','bizYear') if k in params]
            if fields:
                probe=c.collect(source,env,{'numOfRows':'100'},op,False)
                for field in fields:
                    values=[str(r['fields'][field]) for r in probe['candidates'] if r['fields'].get(field)]
                    if values: params[field]=max([params[field],*values])
            request_params={**params}
            if sid=='source.kdic.insured-products': request_params['numOfRows']='1000'
            data=c.collect(source,env,request_params,op,True)
        data.update(collected_at=datetime.now(timezone.utc).isoformat(),request_filters=params)
        v.validate(data)
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
    paths=sorted((c.ROOT/'.api-candidates').glob('source.*-*.json'))
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        results=list(pool.map(refresh,paths))
    report={'checked_at':datetime.now(timezone.utc).isoformat(),'results':results}
    (c.ROOT/'.api-candidates/api-refresh-run.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    raise SystemExit(1 if any(r['status']!='complete' for r in results) else 0)
