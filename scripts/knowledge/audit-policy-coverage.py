"""Find exact policy evidence for published comparison statements.

This is a candidate audit, not an automatic semantic-review approval. Keep
variant/date ambiguities and unmatched clauses visible to the reviewer.
"""
import hashlib
import json
import re
import unicodedata
from pathlib import Path
from urllib.parse import urlencode, urlparse

ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'.api-candidates/disclosures'

def norm(value):
    return re.sub(r'[^a-z0-9가-힣]', '', unicodedata.normalize('NFKC',value).lower())

def family(value):
    return norm(re.split(r'\(구[,):]|\d[종형]',value)[0].replace('무배당','').replace('(무)',''))

def main():
    documents=json.loads((OUT/'insurance-policy-documents.json').read_text(encoding='utf-8'))['results']
    products=[r for g in json.loads((OUT/'insurance.json').read_text(encoding='utf-8'))['groups'] for r in g['products']]
    cache={}
    for position,d in enumerate(documents):
        if not d.get('receipt'): continue
        body=urlencode(d['receipt']['request_form'], encoding=d['receipt'].get('request_encoding','utf-8')).encode() if d['receipt'].get('request_form') else b''
        key=hashlib.sha256(d['receipt']['url'].encode()+body).hexdigest()
        path=OUT/('policy-'+key+'.txt')
        normalized=path.with_suffix('.normalized.txt')
        if path.exists():
            if not normalized.exists() or normalized.stat().st_mtime<path.stat().st_mtime:
                normalized.write_text(norm(path.read_text(encoding='utf-8')),encoding='utf-8')
            cache[d['receipt']['sha256']]=normalized
        if position%100==0: print(json.dumps({'indexed_documents':position}),flush=True)
    results=[]
    for row in products:
        candidates=[]
        hosts={urlparse(u).hostname.removeprefix('www.') for u in row.get('provider_disclosure_urls',[]) if urlparse(u).hostname}
        dates=[c for c in row['cells'] if re.fullmatch(r'\d{4}-\d{2}-\d{2}',c)]
        for d in documents:
            if not d.get('receipt') or urlparse(d['index_url']).hostname.removeprefix('www.') not in hosts:continue
            name=family(d.get('product_title',''))
            if not name or len(name)<6 or not (family(row['title']).startswith(name) or name.startswith(family(row['title']))):continue
            text_path=cache.get(d['receipt']['sha256'])
            text=text_path.read_text(encoding='utf-8') if text_path else ''
            clauses=[]
            for clause in row['coverage']:
                body=re.split(r'\*\s*지급사유\s*:',clause,maxsplit=1)[-1].split('※이외')[0].strip()
                key=norm(body)
                clauses.append({'statement':clause,'normalized_exact_match':len(key)>15 and key in text})
            candidates.append({'document_url':d['url'],'sha256':d['receipt']['sha256'],'product_title':d.get('product_title'),'effective_from':d['effective_from'],'same_start_date':d['effective_from'] in dates,'clauses':clauses})
        results.append({'code':row['code'],'provider':row['provider'],'title':row['title'],'candidates':candidates})
        if len(results)%100==0: print(json.dumps({'compared_products':len(results)}),flush=True)
    report={'scope':'candidate evidence only; requires product variant and semantic review','products':len(results),'with_candidates':sum(bool(r['candidates']) for r in results),'results':results}
    (OUT/'policy-coverage-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({k:v for k,v in report.items() if k!='results'}))

if __name__=='__main__':main()
