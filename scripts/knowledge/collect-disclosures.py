"""Collect public disclosure pages with source receipts; never change review dates.

Dependencies: beautifulsoup4, lxml. Cached raw responses stay in .api-candidates.
Run with --insurance to collect all existing KLIA product groups and pages.
"""
import argparse
import concurrent.futures
import hashlib
import html
import json
import re
import time
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import parse_qs, urlencode, urlparse, quote, urljoin
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.api-candidates/disclosures'
OUT.mkdir(parents=True, exist_ok=True)
NOW = datetime.now(timezone.utc).isoformat()

def clean(value):
    return re.sub(r'\s+', ' ', value).strip()

def retrieve(url):
    url = quote(url, safe=':/?=&%+#')
    name = hashlib.sha256(url.encode()).hexdigest()
    raw_path = OUT / (name + '.html')
    meta_path = OUT / (name + '.json')
    if raw_path.exists() and meta_path.exists():
        meta = json.loads(meta_path.read_text(encoding='utf-8'))
        if meta['collected_at'][:10] == NOW[:10]:
            return raw_path.read_bytes(), meta
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'OpenFin/1.0 public disclosure refresh', 'Accept': 'text/html,application/json'})
            with urllib.request.urlopen(req, timeout=30) as response:
                raw = response.read(15_000_001)
                if len(raw) > 15_000_000:
                    raise ValueError('Response too large')
                meta = {'url': url, 'final_url': response.url, 'collected_at': datetime.now(timezone.utc).isoformat(), 'http_status': response.status, 'sha256': hashlib.sha256(raw).hexdigest()}
            raw_path.write_bytes(raw)
            meta_path.write_text(json.dumps(meta), encoding='utf-8')
            return raw, meta
        except Exception:
            if attempt == 2:
                raise
            time.sleep(attempt + 1)

def insurance_page(group, page):
    url = 'https://pub.insure.or.kr/compareDis/prodCompare/assurance/listNew.do?' + urlencode({'search_prodGroup': group, 'pageIndex': page, 'pageUnit': 20})
    raw, receipt = retrieve(url)
    soup = BeautifulSoup(raw, 'lxml')
    table = soup.select_one('#gongsi_table tbody')
    if table is None:
        raise ValueError('Missing disclosure table')
    products = []
    current = None
    for tr in table.select('tr'):
        cells = tr.find_all('td', recursive=False)
        identity = tr.select_one('input[name=listAprChk]')
        if identity:
            code = identity['value']
            title = soup.find(id='l_prodNm_' + code)
            provider = soup.find(id='l_memberNm_' + code)
            if not title or not provider or len(cells) < 8:
                raise ValueError('Malformed product row')
            current = {'code': code, 'group': group, 'title': clean(title.text), 'provider': clean(provider.text), 'cells': [clean(c.get_text(' ', strip=True)) for c in cells[1:]], 'coverage': [], 'documents': [], 'receipt': receipt}
            current['provider_disclosure_urls'] = list(dict.fromkeys(
                a['href'].strip() for a in tr.select('a[href]')
                if a['href'].strip().startswith(('https://','http://'))
                and clean(a.get_text(' ',strip=True)) == current['title']))
            current['document_scope'] = 'comparison-disclosure attachments; full policy terms not verified'
            for button in tr.select('button[onclick]'):
                match = re.search(r"fn_fileDown\('([^']+)',\s*'([^']+)'\)", button['onclick'])
                if match:
                    current['documents'].append('https://pub.insure.or.kr/FileDown.do?' + urlencode({'fileNo': match[1], 'seq': match[2]}))
            products.append(current)
        if current:
            for cell in tr.select('td.insureOpRate.t_left'):
                text = clean(cell.get_text(' ', strip=True))
                if text:
                    current['coverage'].append(text)
    pages = [int(m) for m in re.findall(r'fn_page\((\d+)\)', str(soup))]
    return products, max([page] + pages)

def insurance_group(group):
    products = []; seen = set(); page = 1; last = 1
    while page <= last:
        rows, discovered = insurance_page(group, page)
        if not rows:
            raise ValueError(f'Empty page in group {group} at {page}')
        for row in rows:
            if row['code'] in seen:
                raise ValueError(f'Repeated product across pages: {group}')
            seen.add(row['code']); products.append(row)
        last = max(last, discovered)
        if last > 500:
            raise ValueError('Unbounded pagination')
        page += 1
    print(json.dumps({'group': group, 'pages': last, 'products': len(products)}), flush=True)
    return {'group': group, 'pages': last, 'products': products}

def run_insurance():
    groups = set()
    for p in (ROOT / 'knowledge/30-financial-products/insurance').rglob('*.jsonl'):
        for line in p.read_text(encoding='utf-8').splitlines():
            row = json.loads(line)
            for url in row.get('source_urls', []):
                if 'pub.insure.or.kr/compareDis/prodCompare/assurance/listNew.do' in url:
                    groups.update(parse_qs(urlparse(url).query).get('search_prodGroup', []))
    results = []; failures = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        tasks = {pool.submit(insurance_group, group): group for group in sorted(groups)}
        for future in concurrent.futures.as_completed(tasks):
            try: results.append(future.result())
            except Exception as error: failures.append({'group': tasks[future], 'error': str(error)})
    report = {'collected_at': NOW, 'groups': results, 'failures': failures}
    (OUT / 'insurance.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'groups': len(results), 'failures': failures}), flush=True)

def pension_group(group):
    page = 1; last = 1; rows = []; seen = set(); page_hashes=set(); duplicate_rows=0
    while page <= last:
        url = 'https://www.fss.or.kr/fss/lifeplan/goodsCmpr/list4.do?' + urlencode({'menuNo': '201274', 'paramClassCd': group, 'pageIndex': page})
        raw, receipt = retrieve(url); soup = BeautifulSoup(raw, 'lxml')
        table = soup.select_one('table.tbl')
        if table is None: raise ValueError('Pension disclosure table missing')
        year = soup.select_one('input[name=criteriaYear]')['value']
        quarter = soup.select_one('input[name=criteriaQuarter]')['value']
        batch = []
        for tr in table.select('tbody tr'):
            cells = [clean(c.get_text(' ', strip=True)) for c in tr.find_all('td', recursive=False)]
            if len(cells) < 6: continue
            batch.append({'group': group, 'provider': cells[0], 'title': cells[1], 'cells': cells, 'headers': [clean(x.text) for x in table.select('thead th')], 'basis_period': f'20{year[-2:]}-Q{quarter}', 'receipt': receipt})
        if not batch: raise ValueError(f'Empty pension page {page}')
        page_hash=hashlib.sha256(json.dumps([r['cells'] for r in batch]).encode()).hexdigest()
        if page_hash in page_hashes: raise ValueError('Repeated pension page')
        page_hashes.add(page_hash)
        for row in batch:
            identity='|'.join(row['cells'])
            if identity in seen: duplicate_rows+=1; continue
            seen.add(identity);rows.append(row)
        pages = [int(x['data-pageindex']) for x in soup.select('[data-pageindex]')]
        last = max([last] + pages)
        if last > 1000: raise ValueError('Unbounded pension pagination')
        page += 1
    print(json.dumps({'pension_group': group, 'pages': last, 'products': len(rows)}), flush=True)
    return {'group': group, 'pages': last, 'duplicate_rows':duplicate_rows, 'products': rows}

def run_pension():
    results=[]; failures=[]
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        tasks={pool.submit(pension_group, group): group for group in ['1','3','4','5']}
        for future in concurrent.futures.as_completed(tasks):
            try: results.append(future.result())
            except Exception as error: failures.append({'group': tasks[future], 'error': str(error)})
    (OUT / 'pension.json').write_text(json.dumps({'collected_at':NOW,'groups':results,'failures':failures}, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'pension_groups':len(results),'failures':failures}),flush=True)

def collect_card(row):
    candidates = [u for u in row.get('source_urls', []) if any(marker in u for marker in ['cooperationcode=', 'gdsno=', 'CardinfoDetails001?code='])]
    if not candidates:
        candidates=[u for u in row.get('source_urls',[]) if any(host in urlparse(u).netloc for host in ['lottecard.co.kr','samsungcard.com','shinhancard.com','wooricard.com','hanacard.co.kr','hyundaicard.com']) and urlparse(u).path not in ['', '/']]
    if not candidates: return {'id':row['id'],'error':'No supported product detail URL'}
    url = candidates[0]
    try:
        raw, receipt = retrieve(url); soup = BeautifulSoup(raw,'lxml')
        content = soup.select_one('#main_contents') if 'kbcard.com' in url else soup.select_one('#contents') if 'bccard.com' in url else soup.select_one('main') or soup.select_one('#content') or soup.select_one('#contents') or soup.select_one('#container') or soup.select_one('.contents')
        if content is None: return {'id':row['id'],'error':'Product content missing','receipt':receipt}
        for el in content.select('script,style,header,footer,nav'): el.decompose()
        text = clean(html.unescape(content.get_text(' ',strip=True)))
        normalized = re.sub(r'[^가-힣a-zA-Z0-9]','',text).lower()
        title = BeautifulSoup(html.unescape(row['title']),'lxml').get_text().removeprefix(row.get('provider','')).strip()
        title = re.sub(r'[^가-힣a-zA-Z0-9]','',title).lower()
        product_title=content.select_one('h2.card_title')
        code=parse_qs(urlparse(url).query).get('gdsno',[''])[0]
        renamed=bool(code and product_title and product_title.get_text(strip=True) and ('cardGdsNo='+code) in raw.decode('utf-8','replace'))
        if 'kbcard.com' in url:
            heading=content.select_one('h1.tit')
            cooperation=parse_qs(urlparse(url).query).get('cooperationcode',[''])[0]
            if heading and cooperation and cooperation in raw.decode('utf-8','replace'):
                product_title=heading
                renamed=True
        if len(text)<200 or not title or (title not in normalized and not renamed):
            return {'id':row['id'],'error':'Detail identity not matched','receipt':receipt,'page_title':soup.title.get_text() if soup.title else ''}
        return {'id':row['id'],'title':product_title.get_text(' ',strip=True) if renamed else row['title'],'text':text,'receipt':receipt,'scope':'official product detail text; numeric rule extraction pending'}
    except Exception as error: return {'id':row['id'],'error':type(error).__name__}

def run_cards():
    rows = [json.loads(line) for p in (ROOT/'knowledge/30-financial-products/cards').rglob('*.jsonl') for line in p.read_text(encoding='utf-8').splitlines() if line]
    results=[]
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        for i,result in enumerate(pool.map(collect_card,rows),1):
            results.append(result)
            if i%50==0: print(json.dumps({'cards_checked':i,'collected':sum('text' in r for r in results)}),flush=True)
    (OUT/'cards.json').write_text(json.dumps({'collected_at':NOW,'results':results},ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'cards':len(results),'collected':sum('text' in r for r in results)}),flush=True)

def collect_source(source):
    try:
        raw, receipt = retrieve(source['url']); soup = BeautifulSoup(raw,'lxml')
        if 'law.go.kr' in source['url']:
            frame=soup.select_one('iframe[src]')
            if frame:
                detail=urljoin(receipt['final_url'],frame['src'])
                detail=detail.replace('lsInfoP.do','lsInfoR.do')
                raw,receipt=retrieve(detail); soup=BeautifulSoup(raw,'lxml')
            content=soup.select_one('#conScroll') or soup
        else:
            content=soup.select_one('#contents') or soup.select_one('#content') or soup.select_one('main')
        if content is None: raise ValueError('No source content selector')
        for x in content.select('script,style,header,footer,nav'): x.decompose()
        images=[]
        for img in content.select('img'):
            alt=clean(img.get('alt',''))
            if alt and img.get('src'):
                images.append({'url':urljoin(receipt['final_url'],img['src']),'alt':alt})
                img.replace_with(' [도표 대체텍스트: '+alt+'] ')
        text=clean(content.get_text(' ',strip=True))
        minimum=20 if 'law.go.kr' in source['url'] else 150
        if len(text)<minimum: raise ValueError('Source body empty or insufficient')
        if 'law.go.kr' in source['url'] and ('오류페이지' in text or not re.search(r'제\d+조',text)):
            raise ValueError('Law endpoint returned an error or no article text')
        return {'id':source['id'],'title':source['title'],'text':text,'images':images,'receipt':receipt,'scope':'source text collection only; image alternatives require visual review'}
    except Exception as error: return {'id':source['id'],'error':str(error)}

def run_tax_sources():
    sources=[]
    for p in (ROOT/'knowledge/90-sources').rglob('*.md'):
        text=p.read_text(encoding='utf-8')
        if not text.startswith('---\n'): continue
        source=json.loads(text.split('---\n')[1])
        if 'tax' in source.get('domains',[]): sources.append(source)
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        results=list(pool.map(collect_source,sources))
    (OUT/'tax-sources.json').write_text(json.dumps({'collected_at':NOW,'results':results},ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'tax_sources':len(results),'collected':sum('text' in r for r in results),'failures':[r for r in results if 'error' in r]}),flush=True)

def run_accounts():
    pages=[('housing','https://nhuf.molit.go.kr/FP/FP07/FP0701/FP07010101.jsp','#contArea',None),
           ('youth','https://nhuf.molit.go.kr/FP/FP07/FP0701/FP07010301.jsp','#contArea',None),
           ('isa','https://securities.miraeasset.com/hks/hks4659/n02.do','body','cp949')]
    results=[]
    for name,url,selector,encoding in pages:
        raw,receipt=retrieve(url)
        soup=BeautifulSoup(raw.decode(encoding) if encoding else raw,'lxml')
        content=soup.select_one(selector)
        if content is None: raise ValueError('Account source body missing')
        for el in content.select('script,style,header,footer,nav'): el.decompose()
        text=clean(content.get_text(' ',strip=True))
        if len(text)<500: raise ValueError('Account source body too short')
        results.append({'name':name,'text':text,'receipt':receipt})
    (OUT/'accounts.json').write_text(json.dumps({'results':results},ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'accounts_sources':len(results)}),flush=True)

def run_insurance_indexes():
    insurance=json.loads((OUT/'insurance.json').read_text(encoding='utf-8'))
    targets={}
    for group in insurance['groups']:
        for row in group['products']:
            for url in row.get('provider_disclosure_urls',[]):
                targets.setdefault(url,set()).add(row['provider'])
    def collect(target):
        url,providers=target
        try:
            if url.lower().endswith('.pdf'):
                return {'url':url,'providers':sorted(providers),'direct_document':True}
            raw,receipt=retrieve(url)
            soup=BeautifulSoup(raw,'lxml')
            links=[]
            for anchor in soup.select('a[href]'):
                href=anchor['href'].strip(); label=clean(anchor.get_text(' ',strip=True))
                if '.pdf' in href.lower() or '약관' in label or 'filedown' in href.lower():
                    parent=anchor.find_parent('tr') or anchor.parent
                    links.append({'url':urljoin(receipt['final_url'],href),'label':label,'context':clean(parent.get_text(' ',strip=True))[:1200]})
            actions=[{'action':el['onclick'],'label':clean(el.get_text(' ',strip=True))} for el in soup.select('[onclick]') if any(word in el['onclick'].lower() for word in ['filedown','.pdf','download'])]
            for el in soup.select('script,style,header,footer,nav'):el.decompose()
            return {'url':url,'providers':sorted(providers),'receipt':receipt,'document_links':links,'download_actions':actions,'text':clean(soup.get_text(' ',strip=True))}
        except Exception as error:return {'url':url,'providers':sorted(providers),'error':str(error)}
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:results=list(pool.map(collect,targets.items()))
    (OUT/'insurance-provider-indexes.json').write_text(json.dumps({'results':results},ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'provider_pages':len(results),'fetched':sum('receipt' in r for r in results),'failed':sum('error' in r for r in results),'document_links':sum(len(r.get('document_links',[])) for r in results)}),flush=True)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(); parser.add_argument('--insurance', action='store_true'); parser.add_argument('--pension', action='store_true'); parser.add_argument('--cards', action='store_true'); parser.add_argument('--tax-sources', action='store_true'); parser.add_argument('--accounts', action='store_true'); parser.add_argument('--insurance-indexes', action='store_true')
    args = parser.parse_args()
    if args.insurance: run_insurance()
    if args.pension: run_pension()
    if args.cards: run_cards()
    if args.tax_sources: run_tax_sources()
    if args.accounts: run_accounts()
    if args.insurance_indexes: run_insurance_indexes()
