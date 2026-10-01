import path from 'node:path';
import fs from 'node:fs';
import {ROOT, writeJson, sha256} from './common.mjs';
import {readCanonicalRecords} from './derive-quality.mjs';

const key = process.env.FINLIFE_API_KEY?.trim();
if (!key) throw new Error('FINLIFE_API_KEY required');
const records = readCanonicalRecords();
const groups = new Map();
for (const item of records) {
  const [endpoint, group] = (item.source_record_id || '').split(':');
  if (!['mortgageLoanProductsSearch','rentHouseLoanProductsSearch','creditLoanProductsSearch','annuitySavingProductsSearch'].includes(endpoint)) continue;
  if (!groups.has(endpoint)) groups.set(endpoint, new Set());
  groups.get(endpoint).add(group);
}
// Retirement savings were not previously collected into product nodes.
groups.set('annuitySavingProductsSearch', new Set(['020000','030200','030300','050000','060000']));
const datasets = [], failures = [];
const output=path.join(ROOT,'.api-candidates/finlife-additional.json');
const retryOnly=process.argv.includes('--retry-failed');
const previous=fs.existsSync(output)?JSON.parse(fs.readFileSync(output,'utf8')):null;
if(retryOnly && !previous) throw new Error('Previous collection required for retry');
if(retryOnly) {
  groups.clear();
  for(const f of previous.failures) {
    if(!groups.has(f.endpoint)) groups.set(f.endpoint,new Set());
    groups.get(f.endpoint).add(f.group);
  }
  // Keep prior successful timestamps; a retry must not make them look new.
  datasets.push(...previous.datasets.map(d=>({...d,collected_at:d.collected_at||previous.collected_at})));
}
for (const [endpoint, sectors] of groups) for (const group of [...sectors].sort()) {
  const rows = [], seen = new Set(); let expected = null;
  try {
    for (let page = 1; ; page++) {
      const url = new URL(`https://finlife.fss.or.kr/finlifeapi/${endpoint}.json`);
      url.search = new URLSearchParams({auth:key,topFinGrpNo:group,pageNo:String(page)});
      let result;
      for (let attempt=0; attempt<3; attempt++) {
        try {
          const response = await fetch(url,{signal:AbortSignal.timeout(20000)});
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          result=(await response.json()).result;
          if (result?.err_cd !== '000') throw new Error(`API ${result?.err_cd || 'invalid'}`);
          break;
        } catch { if(attempt===2) throw new Error('Request failed after 3 attempts'); }
      }
      const total=Number(result.total_count);
      if (!Number.isInteger(total) || total<0 || (expected!==null && expected!==total)) throw new Error('Unstable total');
      expected=total;
      for(const base of result.baseList || []) {
        const id=`${endpoint}:${group}:${base.fin_co_no}:${base.fin_prdt_cd}${base.crdt_prdt_type ? ':'+base.crdt_prdt_type : ''}`;
        if(seen.has(id)) throw new Error('Repeated product');
        seen.add(id);
        const options=(result.optionList||[]).filter(o=>o.fin_co_no===base.fin_co_no && o.fin_prdt_cd===base.fin_prdt_cd && (!base.crdt_prdt_type || o.crdt_prdt_type===base.crdt_prdt_type));
        rows.push({source_record_id:id,base,options});
      }
      if(endpoint==='annuitySavingProductsSearch' && rows.some(row=>!('pnsn_kind' in row.base))) throw new Error('Unexpected schema: response is not retirement savings');
      if(rows.length===expected) break;
      if(rows.length>expected || !(result.baseList||[]).length || page>1000) throw new Error('Incomplete pagination');
    }
    const prior=datasets.findIndex(d=>d.endpoint===endpoint&&d.group===group);
    if(prior>=0)datasets.splice(prior,1);
    datasets.push({endpoint,group,collected_at:new Date().toISOString(),count:rows.length,rows,checksum:sha256(rows)});
    console.log(JSON.stringify({endpoint,group,count:rows.length}));
  } catch(error) {
    const prior=previous?.datasets.find(d=>d.endpoint===endpoint&&d.group===group);
    if(prior && !datasets.some(d=>d.endpoint===endpoint&&d.group===group)) datasets.push({...prior,collected_at:prior.collected_at||previous.collected_at});
    failures.push({endpoint,group,checked_at:new Date().toISOString(),error:error.message,
    reason:endpoint==='annuitySavingProductsSearch'?'제공기관 연금저축 API 응답의 상품 구조 또는 총건수와 실제 행수가 일치하지 않아 반영하지 않았습니다.':'API 응답 검증 실패',
    documentation_url:endpoint==='annuitySavingProductsSearch'?'https://finlife.fss.or.kr/finlife/api/anntySvingsApi/list.do?menuNo=700054':null}); }
}
writeJson(output,{collected_at:new Date().toISOString(),datasets,failures});
console.log(JSON.stringify({datasets:datasets.length,failures}));
