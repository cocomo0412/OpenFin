"""Collect explicitly current insurer policy PDFs, separate from product summaries.

Run with a Python environment containing pypdfium2. Raw documents/text stay private;
only document URLs, version periods and verification receipts enter exports.
"""
import hashlib
import importlib.util
import json
import re
import subprocess
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote, urlencode, urljoin
from bs4 import BeautifulSoup
import pypdfium2 as pdfium

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.api-candidates/disclosures'


def schannel_request(url, form=None, encoding='utf-8'):
    # Windows TLS backend supports this insurer's valid legacy TLS endpoint.
    # Certificate verification stays enabled (no insecure/legacy SSL flags).
    command=['curl.exe','--fail','--silent','--show-error','--max-time','60',url]
    if form: command += ['--data',urlencode(form, encoding=encoding)]
    result=subprocess.run(command,capture_output=True,check=True)
    return result.stdout


def collect(target):
    index, link = target
    url = quote(link['url'], safe=':/?=&%+#')
    encoding = link.get('request_encoding', 'utf-8')
    body = urlencode(link['form'], encoding=encoding).encode() if link.get('form') else None
    key = hashlib.sha256(url.encode() + (body or b'')).hexdigest()
    destination = OUT / ('policy-' + key + '.pdf')
    try:
        if link.get('transport')=='schannel':
            raw=schannel_request(url,link.get('form'), encoding);final_url,status=url,200
        else:
            with urllib.request.urlopen(urllib.request.Request(url, data=body, headers={'User-Agent': 'OpenFin/1.0 disclosure review'}), timeout=60) as response:
                raw = response.read(160_000_001)
                final_url, status = response.url, response.status
        if len(raw) > 160_000_000 or not raw.startswith(b'%PDF-'):
            raise ValueError('Not a supported PDF response')
        reader = pdfium.PdfDocument(raw)
        pages = []
        for page in reader:
            textpage = page.get_textpage()
            pages.append(textpage.get_text_range())
            textpage.close(); page.close()
        reader.close()
        if not pages or '약관' not in ''.join(pages[:10]):
            raise ValueError('Policy identity not found in opening pages')
        if sum(len(text.strip()) for text in pages) < 1000:
            raise ValueError('Policy text requires OCR review')
        destination.write_bytes(raw)
        destination.with_suffix('.txt').write_text('\n\n'.join(pages), encoding='utf-8')
        period = re.search(r'(\d{4}\.\d{2}\.\d{2})\s*~\s*현재', link.get('context', ''))
        return {'index_url': index['url'], 'url': link['url'], 'document_type': 'policy-terms',
                'product_title': link.get('product_title', ''), 'context': link.get('context', ''),
                'effective_from': link.get('effective_from') or period[1].replace('.', '-'), 'page_count': len(pages),
                'text_characters': sum(map(len, pages)),
                'scope': 'current policy document collected; individual clause review pending',
                'receipt': {'url': url, 'final_url': final_url, 'http_status': status,
                            'collected_at': datetime.now(timezone.utc).isoformat(),
                            'request_method': 'POST' if body else 'GET', 'request_form': link.get('form'), 'request_encoding': encoding,
                            'sha256': hashlib.sha256(raw).hexdigest()}}
    except Exception as error:
        return {'index_url': index['url'], 'url': link['url'], 'product_title': link.get('product_title'), 'request_form': link.get('form'), 'error': str(error)}


def additional_targets():
    targets = []
    aia = 'https://mypage.aia.co.kr/AIAHomepage/disclosure/our-products/selling/individual.do'
    im = 'https://www.imlifeins.co.kr/BA/BA_A020.do'
    hana = 'https://www.hanalife.co.kr/anm/product/allProduct.do?status=on'
    metlife = 'https://brand.metlife.co.kr/pn/mcvrgProd/retrieveMcvrgProdMain.do'
    for url in [aia, im, hana, metlife]:
        with urllib.request.urlopen(url, timeout=60) as response:
            soup = BeautifulSoup(response.read(), 'lxml')
        title = ''
        for row in soup.select('tr'):
            cells = row.find_all('td', recursive=False)
            if not cells:
                continue
            context = row.get_text(' ', strip=True)
            if url == aia:
                if cells[0].get('rowspan') or len(cells) >= 6:
                    title = cells[0].get_text(' ', strip=True)
                period = re.search(r'(\d{8})\s*~\s*현재', context)
                if not period:
                    continue
                for anchor in row.select('a[href]'):
                    icon = anchor.find('i')
                    label = icon.get('alt', '') if icon else anchor.get_text(' ', strip=True)
                    match = re.search(r"downLoad\('([^']+)',\s*'([^']+)'\)", anchor['href'])
                    if match and label.strip().endswith('약관'):
                        day = period[1]
                        targets.append(({'url': url}, {'url': 'https://mypage.aia.co.kr/AIAHomepage/disclosure/download.do?' + urlencode({'serverFileNm': match[1], 'usrFileNm': match[2]}), 'product_title': title, 'context': context, 'effective_from': f'{day[:4]}-{day[4:6]}-{day[6:]}'}))
            elif url == metlife:
                period = next((re.fullmatch(r'(\d{4}\.\d{2}\.\d{2})\s*~',c.get_text(' ',strip=True)) for c in cells if re.fullmatch(r'(\d{4}\.\d{2}\.\d{2})\s*~',c.get_text(' ',strip=True))),None)
                link = row.select_one('a[href*="fnum=03"]')
                if period and link:
                    targets.append(({'url':url},{'url':urljoin(url,link['href']),'product_title':link.get('title',''),'context':context,'effective_from':period[1].replace('.','-')}))
            elif url == hana:
                name_cell = row.select_one('td.txt-l[rowspan]')
                if name_cell:
                    title = name_cell.get_text(' ', strip=True)
                period = re.search(r'(\d{4}\.\d{2}\.\d{2})\s*-\s*$', next((c.get_text(' ',strip=True) for c in cells if re.search(r'\d{4}\.\d{2}\.\d{2}',c.get_text())),''))
                link = cells[-1].find('a', href=True)
                if title and period and link and '/anm/product/download.do?' in link['href']:
                    targets.append(({'url':url},{'url':urljoin(url,link['href']),'product_title':title,'context':context,'effective_from':period[1].replace('.','-')}))
            else:
                title_cell = row.select_one('td.al')
                if not title_cell:
                    continue
                title = title_cell.get_text(' ', strip=True)
                position = cells.index(title_cell)
                if len(cells) <= position + 2 or cells[position+2].get_text(strip=True):
                    continue
                day = cells[position+1].get_text(strip=True)
                if not re.fullmatch(r'\d{4}-\d{2}-\d{2}', day):
                    continue
                for anchor in row.select('a[href]'):
                    match = re.search(r"fileDownload\('([^']+)'\)", anchor['href'])
                    if match and anchor.get_text(strip=True) == '약관':
                        targets.append(({'url': url}, {'url': 'https://www.imlifeins.co.kr/www/downloadChk.do', 'form': {'fileName': match[1]}, 'product_title': title, 'context': context, 'effective_from': day}))
    heungkuk = 'https://www.heungkuklife.co.kr/front/public/saleProduct.do?searchFlgSale=Y'
    with urllib.request.urlopen(heungkuk, timeout=60) as response:
        soup = BeautifulSoup(response.read(), 'lxml')
    for anchor in soup.select('#productList a'):
        title = anchor.get_text(' ',strip=True)
        query = {'searchFlgSale':'Y','beforeYn':'','searchCdPublicPrtType1':'I101','searchCdPublicPrtType2':'','searchCdPublicPrtType3':quote(title),'searchText':''}
        request = urllib.request.Request('https://www.heungkuklife.co.kr/front/public/saleProductAjax.do', data=urlencode(query).encode())
        with urllib.request.urlopen(request,timeout=60) as response:
            parts = response.read().decode('cp949').split('%||%')
        if len(parts)<3: raise ValueError('Heungkuk disclosure schema changed')
        for record in parts[2].strip().split('%|%'):
            fields=record.split('%,%')
            if len(fields)>5 and not fields[1].strip() and fields[4] and re.fullmatch(r'\d{4}\.\d{2}\.\d{2}',fields[0]):
                targets.append(({'url':heungkuk},{'url':'https://www.heungkuklife.co.kr/servlet/DownLoadEnc.do','form':{'encValue':fields[4]},'product_title':title,'context':title+' '+fields[0]+' ~ 현재 '+fields[5],'effective_from':fields[0].replace('.','-')}))
    chubb = 'https://www.chubblife.co.kr'
    seen=set()
    for category in ['S1','S2','S3','S4']:
        index_url=chubb+'/front/official/sale/listSale.do?searchCateCd='+category
        page=1
        while True:
            with urllib.request.urlopen(index_url+'&pageNo='+str(page),timeout=60) as response:
                soup=BeautifulSoup(response.read(),'lxml')
            actions=[]
            for anchor in soup.select('a[href]'):
                match=re.fullmatch(r"javascript:goPopup\('(\d+)','S'\);",anchor['href'])
                if match and match[1] not in seen:
                    seen.add(match[1]);actions.append(match[1])
            if not actions:break
            for identifier in actions:
                request=urllib.request.Request(chubb+'/front/official/sale/viewSaleAjax.do',data=urlencode({'disSeqNum':identifier,'disTypeCd':'S'}).encode())
                with urllib.request.urlopen(request,timeout=60) as response:
                    details=json.loads(response.read())
                if details.get('result')!='success':raise ValueError('Chubb policy lookup failed')
                for item in details['salePopList']:
                    if not item.get('salesEndDt') and item.get('pdtClaufileSeqNum'):
                        targets.append(({'url':index_url},{'url':chubb+'/downloadFile.do','form':{'fileSeqNum':item['pdtClaufileSeqNum']},'product_title':item['pdtName'],'context':item['pdtName']+' '+item['salesStartDt']+' ~ 현재','effective_from':item['salesStartDt']}))
            if page>=30:raise ValueError('Unbounded Chubb policy pagination')
            page+=1
    hanwha='https://www.hanwhalife.com'
    base=hanwha+'/main/disclosure/goods/goodslist/'
    query={'PType':'1','sellFlag':'Y','goodsType':'','sellType':'','goodsIndex':'','schText':''}
    listing=json.loads(schannel_request(base+'getList.do',query))
    products={}
    for category in listing['list1']:
        if category['SELL_TYPE']=='SD':continue
        values={**query,'goodsType':category['GOODS_TYPE'],'sellType':category['SELL_TYPE']}
        result=json.loads(schannel_request(base+'getList2.do',values))
        for product in result.get('list2',[]):products[product['IDX']]=product
    for identifier in products:
        result=json.loads(schannel_request(base+'getList3.do',{**query,'goodsIndex':identifier}))
        for item in result.get('list3',[]):
            if not item.get('SELL_END_DT','').strip() and item.get('FILE_NAME3'):
                targets.append(({'url':base+'DF_GDGL000_P10000.do'},{'url':'https://file.hanwhalife.com/www/announce/goods/download_chk.asp','form':{'file_name':item['FILE_NAME3']},'transport':'schannel','request_encoding':'cp949','product_title':item['GOODS_NAME'],'context':item['GOODS_NAME']+' '+item['SELL_START_DT']+' ~ 현재','effective_from':item['SELL_START_DT']}))
    return targets


if __name__ == '__main__':
    indexes = json.loads((OUT / 'insurance-provider-indexes.json').read_text(encoding='utf-8'))['results']
    targets = [(index, link) for index in indexes for link in index.get('document_links', [])
               if link['label'].strip() == '약관' and re.search(r'\d{4}\.\d{2}\.\d{2}\s*~\s*현재', link['context'])
               and '.pdf' in link['url'].lower()]
    # PDFium is not thread-safe; keep document parsing sequential.
    targets += additional_targets()
    module_path = Path(__file__).with_name('policy-targets-additional.py')
    spec = importlib.util.spec_from_file_location('policy_targets_additional', module_path)
    adapters = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(adapters)
    for adapter in [adapters.kb_targets, adapters.cardif_targets, adapters.nh_targets, adapters.kyobo_targets, adapters.lina_targets]:
        targets += adapter()
    output = OUT / 'insurance-policy-documents.json'
    previous = json.loads(output.read_text(encoding='utf-8'))['results'] if output.exists() else []
    results = []
    for target in targets:
        index, link = target
        cached = next((r for r in previous if r.get('receipt') and r['url'] == link['url'] and r['receipt'].get('request_form') == link.get('form')), None)
        results.append(cached or collect(target))
        output.write_text(json.dumps({'results': results}, ensure_ascii=False, indent=2), encoding='utf-8')
        if not cached or len(results)%25==0:
            print(json.dumps({'checked': len(results), 'collected': sum('receipt' in r for r in results)}), flush=True)
    (OUT / 'insurance-policy-documents.json').write_text(json.dumps({'results': results}, ensure_ascii=False, indent=2), encoding='utf-8')
