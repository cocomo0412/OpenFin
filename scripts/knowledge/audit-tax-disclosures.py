"""Produce a private field-by-field review queue. Never infer fact verification
from an HTTP response or a number appearing somewhere in a law document.
"""
import json, re
from pathlib import Path

root = Path(__file__).resolve().parents[2]
work = root / '.api-candidates/disclosures'
baseline = work / 'tax-fact-audit.json'
if not baseline.exists():
    records=[]
    for file in (root/'knowledge').rglob('*.md'):
        text=file.read_text(encoding='utf-8')
        if not text.startswith('---\n'): continue
        row=json.loads(text.split('---\n')[1])
        if 'korea-tax-ontology-2026.json' in row.get('publication_memberships',[]) and row.get('type') not in ['source','category','domain']:
            records.append(row)
    if not records: raise ValueError('No canonical tax facts found')
    baseline.write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
facts = json.loads(baseline.read_text(encoding='utf-8'))
sources = json.loads((work / 'tax-sources.json').read_text(encoding='utf-8'))['results']
available = {row['id']:row for row in sources if row.get('text') and '오류페이지' not in row['text']}
law_names = ['조세특례제한법','상속세 및 증여세법','법인세법','소득세법','부가가치세법','지방세법','국세기본법','지방세기본법','관세법']
articles = {}
for source in available.values():
    if not source['id'].startswith('source.law.'):
        continue
    name = next((law for law in law_names if source['title'].startswith(law)),None)
    if not name:
        continue
    text = source['text'].split(' 부칙 ')[0]
    headings = list(re.finditer(r'(?<![가-힣\d])제(\d+)조(?:의(\d+))?\(',text))
    for i, match in enumerate(headings):
        article = f"제{match[1]}조" + (f"의{match[2]}" if match[2] else '')
        end = headings[i+1].start() if i+1<len(headings) else len(text)
        articles.setdefault(name+' '+article,{'source_id':source['id'],'receipt':source['receipt'],'text':text[match.start():end]})

queue=[]
for fact in facts:
    criteria=[]
    for criterion in fact.get('criteria',[]):
        reference=criterion.get('law_reference','')
        law=next((name for name in law_names if name in reference),None)
        requested=re.findall(r'제\d+조(?:의\d+)?',reference)
        matches=[{'reference':law+' '+article,**articles[law+' '+article]} for article in requested if law and law+' '+article in articles]
        criteria.append({'existing':criterion,'matched_articles':matches,'review_status':'manual_semantic_review_required'})
    queue.append({'id':fact['id'],'title':fact['title'],'criteria':criteria,
                  'available_sources':[sid for sid in fact.get('sources',[]) if sid in available],
                  'unavailable_sources':[sid for sid in fact.get('sources',[]) if sid not in available]})
output={'scope':'review queue only; collection is not validation','facts':queue,
        'fact_count':len(queue),'criterion_count':sum(len(r['criteria']) for r in queue),
        'criteria_with_article_candidates':sum(bool(c['matched_articles']) for r in queue for c in r['criteria'])}
(work/'tax-review-queue.json').write_text(json.dumps(output,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in output.items() if k!='facts'}))
