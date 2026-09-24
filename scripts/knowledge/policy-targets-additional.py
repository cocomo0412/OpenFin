"""Public disclosure adapters; collect current policy versions with pagination."""
import json
import re
import urllib.request
from datetime import date
from urllib.parse import urlencode
from bs4 import BeautifulSoup


def fetch(url, form=None, json_body=None):
    body = json.dumps(json_body).encode() if json_body is not None else urlencode(form).encode() if form is not None else None
    headers = {'Content-Type': 'application/json;charset=UTF-8'} if json_body is not None else {}
    with urllib.request.urlopen(urllib.request.Request(url, data=body, headers=headers), timeout=60) as response:
        return response.read()


def kb_targets():
    index = 'https://www.kblife.co.kr/customer-common/productList.do'
    targets, seen = [], set()
    page = 1
    while True:
        data = json.loads(fetch('https://www.kblife.co.kr/customer-common/API/productList1.do', form={
            'pageSize':20, 'paGroupCnt':10, 'pageIndex':page, 'tabType':1, 'srchType':'', 'pdNm':''}))
        for row in data['list']:
            if row['SEQNO'] in seen: continue
            seen.add(row['SEQNO'])
            period = re.fullmatch(r'(\d{4}/\d{2}/\d{2})\s*~\s*', row['SALE_DATE'])
            if not period: continue
            for field, box in [('UPFILE2','2'), ('UPFILE3','8'), ('UPFILE4','9')]:
                if row.get(field):
                    targets.append(({'url':index}, {'url':'https://www.kblife.co.kr/api/archive/archives/download/product-terms/'+row['SEQNO']+'/'+box,
                        'product_title':row['NAME'], 'context':row['NAME']+' '+row['SALE_DATE'], 'effective_from':period[1].replace('/','-')}))
        if page >= data['pagingVO']['finalPgNo']: break
        if page >= 100: raise ValueError('KB pagination exceeded bound')
        page += 1
    return targets


def cardif_targets():
    base = 'https://www.cardif.co.kr'
    targets, seen = [], set()
    for category in ['1','2']:
        products = json.loads(fetch(base+'/pa/pag/rest/selectProductList101.do', json_body={'saleYn':'1','productTypeId':category}))['data']['result']['productList']
        for product in products:
            rows = json.loads(fetch(base+'/pa/pag/rest/selectProductFileList101.do', json_body={'productTypeId':category,'productCode':product['productcode'],'sellable':'1'}))['data']['productFileList']
            for row in rows:
                start, end = row['begindate'].replace('.','-'), row['enddate'].replace('.','-')
                identifier = row.get('file_term_id')
                if not identifier or identifier in seen or not start <= date.today().isoformat() <= end: continue
                seen.add(identifier)
                targets.append(({'url':base+'/ko/web/main/disclosure/product/onsale'}, {'url':base+'/common/rest/fileDownloadFront.do?'+urlencode({'fileId':identifier,'atchFileDiv':'DIS','frontBackDiv':'Front'}),
                    'product_title':row['productname'], 'context':row['productname']+' '+start+' ~ '+end, 'effective_from':start}))
    return targets


def nh_targets():
    base = 'https://www.nhlife.co.kr'
    index = base+'/ho/on/HOON0004M00.nhl'
    targets, seen = [], set()
    page = 1
    while True:
        form={'prsPagcn':page,'selProdNm':'','useyn':'Y','prodDcd':'','prodnm':''}
        soup = BeautifulSoup(fetch(index, form=form), 'lxml')
        names = [button.get('value') for button in soup.select('button[onclick^="goAnonm("]')]
        if not names: break
        if all(name in seen for name in names): raise ValueError('NH pagination repeated')
        for name in names:
            if name in seen: continue
            seen.add(name)
            detail = BeautifulSoup(fetch(base+'/ho/on/HOON0004P10.nhl', form={**form,'prsPagcn':1,'selProdNm':name}), 'lxml')
            for row in detail.select('tr'):
                context = row.get_text(' ',strip=True)
                period = re.search(r'(\d{4}-\d{2}-\d{2})\s*~\s*현재',context)
                if not period: continue
                for button in row.select('button[onclick]'):
                    match = re.fullmatch(r"popupPdfViewer\('([^']+)',\s*'([^']+)'\)",button['onclick'])
                    if match and '보험약관' in button.get_text():
                        targets.append(({'url':index},{'url':base+'/pdfViewer.nhl?'+urlencode({'apdFlid':match[1],'fileSeqn':match[2]}),
                            'product_title':name,'context':context,'effective_from':period[1]}))
        page_links = [int(re.search(r'linkPage\((\d+)\)',b['onclick'])[1]) for b in soup.select('.paging button[onclick]') if re.search(r'linkPage\((\d+)\)',b['onclick'])]
        last_page=max([page, *page_links])
        if page>=last_page: break
        if page>=100: raise ValueError('NH pagination exceeded bound')
        page += 1
    return targets


def kyobo_targets():
    base = 'https://www.kyobo.com'
    index = base+'/dgt/web/product-official/all-product/search'
    targets, seen = [], set()
    page = 1
    while True:
        data = json.loads(fetch(base+'/dtc/product-official/find-allProductSearch',json_body={
            'dgtPdtAtrDvCd':'M','dgtPdtAtrLclCd':'','dgtPdtAtrMclCd':'','dgtPdtAtrSmclCd':'','saleYn':'Y',
            'dgtMseAddiPsYn':'','searchTxt':'','currentPage':page,'pagePerSize':10,'pageNumber':10,'deviceDv':'pc'}))['body']
        for product in data['list']:
            identifier = product['dgtPdtAtrSeqtId']
            if identifier in seen: raise ValueError('Kyobo duplicate listing across pages')
            seen.add(identifier)
            detail = json.loads(fetch(base+'/dtc/product-official/find-allProductSearchDetail',json_body={'dgtPdtPdSeqtId':identifier}))['body']
            if len(detail['list']) != len(detail['list2']): raise ValueError('Kyobo document/version alignment changed')
            for period, files in zip(detail['list'],detail['list2']):
                if period.get('saleEdDt') or not files.get('temp02'): continue
                if not period.get('saleStDt'):
                    print('Kyobo missing effective date: '+product['dgtPdtAtrNm'], flush=True)
                    continue
                targets.append(({'url':index},{'url':base+'/file/ajax/download?'+urlencode({'fName':'/dtc/pdf/mm/'+files['temp02']}),
                    'product_title':product['dgtPdtAtrNm'],'context':product['dgtPdtAtrNm']+' '+period['saleStDt']+' ~ 현재',
                    'effective_from':period['saleStDt']}))
        if page>=data['pageInfo']['totPageCnt']: break
        if page>=100: raise ValueError('Kyobo pagination exceeded bound')
        page += 1
    if len(seen)!=data['listCnt']: raise ValueError('Kyobo listing count mismatch')
    return targets


def lina_targets():
    api = 'https://api.lina.co.kr/public/contents/v1/disclosure/'
    index = 'https://www.lina.co.kr/disclosure/product-public-announcement/product-on-sales?key=0'
    products = json.loads(fetch(api+'get-product-list?'+urlencode({'mtrtDcd':'B','KliaProdClcd':'','KcisInsKcd':'','searchKey':'','inscd':'','prodPbanGrpCd':'','tabTitle':''})))
    if products.get('resultCode')!='0': raise ValueError('Lina listing failed')
    targets, seen = [], set()
    for product in products['listDisclosure']:
        data = json.loads(fetch(api+'product-list-detail?'+urlencode({'insureCd':product['insureCd'],'prodPbanGrpCd':product['prodPbanGrpCd']})))
        if data.get('resultCode')!='0': raise ValueError('Lina detail failed')
        for row in data['listDisclosure']:
            file = row.get('productProvision')
            key = (file,row['insNm'],row['sellOpnDt'])
            if row['sellEndDt']!='99991231' or not file or file=='-' or key in seen: continue
            seen.add(key)
            day = row['sellOpnDt']
            targets.append(({'url':index},{'url':'https://www.lina.co.kr/cms/upload/upload/docs/disclosure/'+file,
                'product_title':row['insNm'],'context':row['insNm']+' '+row.get('itemSection','')+' '+day+' ~ 현재',
                'effective_from':day[:4]+'-'+day[4:6]+'-'+day[6:]}))
    return targets
