// Reproducible catalog refresh. Collection integrity is not suitability approval.
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, KNOWLEDGE, DOCS, json, writeJson, sha256, stable} from './common.mjs';

const files=[], byId=new Map();
function walk(dir) { for(const e of fs.readdirSync(dir,{withFileTypes:true})) {
  const file=path.join(dir,e.name);
  if(e.isDirectory()) walk(file);
  else if(e.name.endsWith('.jsonl')) {
    const rows=fs.readFileSync(file,'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);
    files.push({file,rows}); rows.forEach(r=>byId.set(r.id,r));
  } else if(e.name.endsWith('.md')) {
    const text=fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n'), end=text.indexOf('\n---\n',4);
    if(text.startsWith('---\n') && end>=0) {const row=JSON.parse(text.slice(4,end));if(row.id) { files.push({file,rows:[row],tail:text.slice(end+5)});byId.set(row.id,row);}}
  }
}}
walk(KNOWLEDGE);
const inventory=json(path.join(DOCS,'collection-inventory.json'));
const catalog=json(path.join(ROOT,'.api-candidates/finlife-catalog.json'));
const additional=json(path.join(ROOT,'.api-candidates/finlife-additional.json'));
const additions=[], changed=new Set(), refreshed=new Set();
const report={version:1,collected_at:catalog.collected_at,review_scope:'API identity, schema, pagination and field mapping; not suitability or legal review',domains:{},unresolved:[],datasets:[]};
const exportFile=domain=>`korea-${domain}-ontology-2026.json`;
const projectionKeys=['id','title','type','description','provider','provider_code','product_kind','search_type','status','product_status','sales_status','source_listing_status','sales_verification_status','freshness_status','source_freshness_status','recommendation_status','recommendation_scope','canonical_product_id','source_urls','source_basis_dates','structured_summary','search_facets','base_rate_percent','maximum_rate_percent','term_months','join_member','join_channel','last_source_checked_at','last_reviewed_at'];
function finish(item, source, at, raw, locator) {
  if(item.type==='support-program') item.search_shard='support';
  item.parents=item.parents.map(p=>p==='category.finance.saving-products'?'category.finance.savings-products':p==='category.finance.loan-products'?`category.finance.${item.product_kind==='rent-house-loan'?'rent-loan':item.product_kind==='policy-loan'?'policy-loan':item.product_kind==='mortgage-loan'?'mortgage-loan':'credit-loan'}-products`:p);
  item.collected_at=at; item.source_collected_at=at;
  item.last_source_checked_at=at; item.last_reviewed_at=at; item.reviewed_at=at;
  item.review_scope='API 응답과 상품 식별자·필드 매핑 검증';
  item.sources=[source];item.source_urls=[byId.get(source)?.urls?.canonical || byId.get(source)?.url || 'https://www.data.go.kr/'];
  const rawRows=Array.isArray(raw)?raw:[raw];
  item.source_basis_dates=[...new Set(rawRows.flatMap(r=>['basDt','basYm','TIME','dcls_month','disclosure_month'].map(k=>r?.[k]).filter(Boolean)).map(String))];item.verification_status='listing_only';
  item.recommendation_status='reference_only';item.recommendation_scope='listing_only';
  item.source_listing_status='listed';item.sales_verification_status='listed_unverified';
  item.freshness_status='current';item.source_freshness_status='current';
  item.comparison_engine_gate_passed=false;item.domain_gate_passed=false;
  item.source_checksum=sha256(raw);item.refresh_generation=at;
  item.provenance=[{source_id:source,original_url:item.source_urls[0],source_record_id:item.source_record_id||locator,
    collected_at:at,reviewed_at:at,verification_status:'listing_only',checksum:sha256(raw),checksum_scope:'API-record',
    supported_fields:Object.keys(item).filter(k=>!['provenance','search_projection','record_checksum'].includes(k)),locator:{kind:'record-id',value:locator}}];
  delete item.legacy_compatibility_dates;delete item.legacy_export_variants;
  item.search_projection=Object.fromEntries(projectionKeys.filter(k=>item[k]!==undefined).map(k=>[k,item[k]]));
  item.search_projection.export_id=item.publication_memberships[0].replace('korea-','').replace('-2026.json','');
  item.search_projection.search_text=[item.id,item.title,item.provider,item.description,item.product_code].filter(Boolean).join(' ').toLowerCase();
  item.search_projection.source_ids=[source];
  for(const key of Object.keys(item)) if(item[key]===undefined) delete item[key];
  item.record_checksum=sha256({...item,provenance:undefined,record_checksum:undefined});
  changed.add(item.id);refreshed.add(item.id);return item;
}
function base(old, id, title, type, parent, domain, shard) {
  // Retain graph identity only. Old rates, verification flags and derived fields
  // must never survive a fresh API mapping through object spread.
  return {id:old?.id||id,title,type,description:'',parents:old?.parents||[parent],children:old?.children||[],
    related:old?.related||[],terms:old?.terms||[],deadlines:[],tags:old?.tags||[],
    publication_memberships:old?.publication_memberships||[exportFile(domain)],search_shard:old?.search_shard||shard,
    search_position:old?.search_position,legacy_ids:old?.legacy_ids||[],product_status:'unknown',sales_status:'unknown',status:'reference_only'};
}
function put(old,item) { if(old){Object.keys(old).forEach(k=>delete old[k]);Object.assign(old,item);}else{additions.push(item);byId.set(item.id,item);} }
function missing(item,at) {
  if(item.refresh_generation===at) return;
  item.source_listing_status='not_found_in_latest_collection';item.sales_status='unknown';item.product_status='unknown';
  item.status='reference_only';item.freshness_status='stale';item.source_freshness_status='stale';
  item.last_source_checked_at=at;item.recommendation_scope='listing_only';item.recommendation_status='reference_only';
  item.comparison_engine_gate_passed=false;item.domain_gate_passed=false;
  item.status_reason='이번 전체 API 목록에서 식별되지 않아 과거 기록으로 유지합니다. 판매 종료 여부는 미확인입니다.';
  if(item.search_projection) Object.assign(item.search_projection,{source_listing_status:item.source_listing_status,status:item.status,sales_status:'unknown',product_status:'unknown',freshness_status:'stale',recommendation_scope:'listing_only',recommendation_status:'reference_only'});
  item.record_checksum=sha256({...item,provenance:undefined,record_checksum:undefined});changed.add(item.id);
}
for(const [domain,data] of Object.entries(catalog.domains)) {
  if(data.available_count!==data.candidates.length) throw new Error('Incomplete bank collection');
  const existing=[...byId.values()].filter(r=>r.type==='bank-product' && r.product_kind===domain);
  const lookup=new Map(existing.map(r=>[r.source_record_id,r]));let matched=0,added=0;
  for(const row of data.candidates) {
    if(sha256(row.extracted)!==row.checksum) throw new Error('Bank checksum mismatch');
    const e=row.extracted,old=lookup.get(row.source_record_id);
    if(old && (old.provider_code!==e.provider_code || old.product_code!==e.product_code)) throw new Error('Bank identity mismatch');
    const id=`finance.${domain}.${domain}.${e.provider_code}.${sha256(e.product_code).slice(7,23)}`;
    const item=base(old,id,`${e.provider} ${e.product_name}`,'bank-product',`category.finance.${domain}-products`,`${domain}-products`,'bank-products');
    Object.assign(item,{description:e.additional_terms_text||`${e.provider}의 ${e.product_name} 공식 공시입니다.`,provider:e.provider,provider_code:e.provider_code,product_code:e.product_code,
      product_kind:domain,search_type:domain,source_record_id:row.source_record_id,disclosure_month:e.disclosure_month,raw:e,
      join_member:e.join_member,join_channel:e.join_way?[e.join_way]:[],preferential_rate_conditions:e.preferential_conditions_text?[{description:e.preferential_conditions_text,condition_status:'source_text'}]:[],
      options:e.options,term_months:[...new Set(e.options.map(o=>o.term_months))],
      base_rate_percent:[...new Set(e.options.map(o=>o.base_rate_percent).filter(v=>v!==null))],maximum_rate_percent:[...new Set(e.options.map(o=>o.maximum_rate_percent).filter(v=>v!==null))],
      criteria:e.options.flatMap(o=>[['기본금리',o.base_rate_percent],['최고금리',o.maximum_rate_percent]].filter(([,v])=>v!==null).map(([label,value])=>({label,basis:String(o.term_months),condition:`${o.term_months}개월 · ${o.interest_method} · ${label} ${value}%`,source:catalog.source_id,rate_percent:value,criteria_kind:'rate'}))),
      structured_summary:{rates:{option_rates:e.options.map(o=>o.base_rate_percent)},periods:{terms:e.options.map(o=>String(o.term_months))}},canonical_product_id:old?.canonical_product_id||id});
    finish(item,catalog.source_id,catalog.collected_at,e,row.source_record_id);put(old,item);old?matched++:added++;
  }
  const absent=existing.filter(r=>!data.candidates.some(c=>c.source_record_id===r.source_record_id));absent.forEach(r=>missing(r,catalog.collected_at));
  report.domains[domain]={updated:matched,added,not_in_latest:absent.length,current_total:data.candidates.length};
}
// Other Finlife products: preserve loan-type identity to avoid merging different
// credit products with a shared company/product code.
for(const dataset of additional.datasets) {
  if(sha256(dataset.rows)!==dataset.checksum || dataset.rows.length!==dataset.count) throw new Error('Additional Finlife integrity');
  let matched=0,added=0;
  for(const row of dataset.rows) {
    const b=row.base, candidates=[...byId.values()].filter(i=>i.source_record_id===row.source_record_id || i.source_record_id===row.source_record_id.split(':').slice(0,4).join(':'));
    const old=candidates.find(i=>i.raw?.crdt_prdt_type===b.crdt_prdt_type) || (candidates.length===1 && !b.crdt_prdt_type?candidates[0]:null);
    const kind=dataset.endpoint.startsWith('mortgage')?'mortgage-loan':dataset.endpoint.startsWith('rent')?'rent-house-loan':'credit-loan';
    const item=base(old,`finance.loan.api.${sha256(row.source_record_id).slice(7,27)}`,`${b.kor_co_nm} ${b.fin_prdt_nm}${b.crdt_prdt_type_nm?' · '+b.crdt_prdt_type_nm:''}`,'bank-product','category.finance.loan-products','loan-products','bank-products');
    Object.assign(item,{description:Object.entries(b).filter(([k])=>['loan_lmt','join_way','loan_inci_expn','erly_rpay_fee'].includes(k)).map(([k,v])=>`${k}: ${v}`).join(' / '),provider:b.kor_co_nm,provider_code:b.fin_co_no,product_code:b.fin_prdt_cd,product_kind:kind,search_type:'loan',source_record_id:row.source_record_id,disclosure_month:b.dcls_month,raw:b,options:row.options,
      criteria:row.options.map(o=>({label:'공식 대출 공시',condition:JSON.stringify(o),source:'source.fss.finlife.api'}))});
    finish(item,'source.fss.finlife.api',additional.collected_at,row,row.source_record_id);put(old,item);old?matched++:added++;
  }
  report.datasets.push({source_id:'source.fss.finlife.api',operation:dataset.endpoint,group:dataset.group,updated:matched,added,count:dataset.count});
}
report.unresolved.push(...additional.failures);
for(const r of byId.values()) {
  if(r.type!=='bank-product'||r.refresh_generation===additional.collected_at) continue;
  const [endpoint,group]=String(r.source_record_id||'').split(':');
  if(additional.datasets.some(d=>d.endpoint===endpoint&&d.group===group)) missing(r,additional.collected_at);
}
// KDIC's row number is not a persistent product ID. Match exact company/name
// and registration date; ambiguous older identities remain historical.
const kdic=json(path.join(DOCS,'api-snapshots/source.kdic.insured-products-0.json'));
const kdicKey=r=>stable([r.fncIstNm,r.prdNm,r.regDate]);
const groups=new Map();for(const r of kdic.items){const key=kdicKey(r);if(!groups.has(key))groups.set(key,[]);groups.get(key).push(r);}
const oldProtected=[...byId.values()].filter(r=>r.product_kind==='deposit-protection');
const oldKeys=new Map();for(const r of oldProtected){const o=r.options?.[0];const key=stable([r.provider,o?.product_name,(o?.registration_date||'').replaceAll('-','')]);if(!oldKeys.has(key))oldKeys.set(key,[]);oldKeys.get(key).push(r);}
let protectedMatched=0,protectedAdded=0;
for(const [key,rows] of groups) {
  const r=rows[0], olds=oldKeys.get(key)||[], old=olds.length===1?olds[0]:null;
  const item=base(old,`finance.protection.kdic.${sha256(key).slice(7,31)}`,`${r.fncIstNm} ${r.prdNm}`,'financial-product',oldProtected[0].parents[0],'finance-reference','deposit-protection');
  Object.assign(item,{description:'예금보험공사 보호대상 상품 목록에 등재된 기록입니다. 실제 계약의 보호 여부는 공식 약관을 확인하세요.',provider:r.fncIstNm,product_code:sha256(key).slice(7,31),product_kind:'deposit-protection',search_type:'deposit-protection',source_record_id:`kdic:${sha256(key).slice(7,31)}`,
    options:rows.map(v=>({financial_company:v.fncIstNm,product_name:v.prdNm,registration_date:v.regDate,sales_discontinued_date:v.prdSalDscnDt,protection_status:'listed'})),raw_records:rows});
  finish(item,'source.kdic.insured-products',kdic.collected_at,rows,item.source_record_id);put(old,item);old?protectedMatched++:protectedAdded++;
}
oldProtected.filter(r=>r.refresh_generation!==kdic.collected_at).forEach(r=>missing(r,kdic.collected_at));
report.domains.deposit_protection={updated:protectedMatched,added:protectedAdded,current_entities:groups.size,source_rows:kdic.count,not_in_latest:oldProtected.length-protectedMatched};
// Remaining official datasets become typed observations, keeping their original
// fields, units and provider basis dates instead of inventing product attributes.
const observationRows=[];
for(const entry of inventory.datasets.filter(e=>e.source_id!=='source.fss.finlife.api' && e.source_id!=='source.gov24.benefit-plus.local-supports' && !(e.source_id==='source.kdic.insured-products' && /getProductList/.test(String(e.operation))))) {
  const payload=json(path.join(ROOT,'docs',entry.path));
  if(payload.count!==entry.count || payload.items.length!==entry.count) throw new Error(`Incomplete ${entry.path}`);
  if(!byId.has(entry.source_id)) throw new Error(`Missing source ${entry.source_id}`);
  const seen=new Set();
  for(const r of payload.items) {
    const identity=sha256({source:entry.source_id,operation:entry.operation,row:r}).slice(7,31);
    if(seen.has(identity)) continue;seen.add(identity);
    const title=[r.provider,r.fncIstNm,r.fncoNm,r.cmpyNm,r.ofrinstnm,r.finPrdNm,r.finprdnm,r.prdNm,r.fndNm,r.brnNm,r.ITEM_NAME1,r.acitNm].filter(Boolean).join(' · ')||payload.title;
    const item=base(null,`finance.api.${identity}`,title,'api-observation','category.finance.api-observations','finance-reference','reference');
    Object.assign(item,{description:`${payload.title} · ${r.basDt||r.basYm||r.TIME||r.bizYear||'원문 기준일 미제공'}`,source_record_id:`${entry.source_id}:${entry.operation}:${identity}`,raw:r,dataset_operation:entry.operation,provider_basis:r.basDt||r.basYm||r.TIME||r.bizYear||null});
    finish(item,entry.source_id,entry.collected_at,r,item.source_record_id);observationRows.push(item);
  }
  report.datasets.push({source_id:entry.source_id,operation:entry.operation,count:entry.count,canonical_observations:seen.size});
  entry.canonical_applied=true;entry.canonical_scope='API observation records; provider dates preserved';
}
const kinfa=json(path.join(DOCS,'api-snapshots/source.data.go.kr.kinfa-loan-products-0.json'));
let kinfaUpdated=0,kinfaAdded=0;
for(const r of kinfa.items) {
  const id=`finance.bank.policy-loan.kinfa-api.${r.seq}`,old=byId.get(id);
  const item=base(old,id,`${r.ofrinstnm} ${r.finprdnm}`,'bank-product','category.finance.loan-products','loan-products','bank-products');
  Object.assign(item,{description:r.suprtgtdtlcond||r.finprdnm,provider:r.ofrinstnm,product_code:r.seq,product_kind:'policy-loan',search_type:'loan',source_record_id:`kinfa-loan-products:${r.seq}`,raw:r,
    criteria:[['대출한도(만원)',r.lnlmt],['금리',r.irt],['기간',r.maxtotlntrm],['지원대상',r.suprtgtdtlcond]].map(([label,condition])=>({label,condition:String(condition||'미제공'),source:kinfa.source_id}))});
  finish(item,kinfa.source_id,kinfa.collected_at,r,item.source_record_id);put(old,item);old?kinfaUpdated++:kinfaAdded++;
}
report.domains.kinfa_loans={updated:kinfaUpdated,added:kinfaAdded,current_total:kinfa.count};
const govPath=path.join(ROOT,'.api-candidates/gov24-current.json');
if(fs.existsSync(govPath)) {
  const gov=json(govPath);if(gov.count!==gov.items.length||sha256(gov.items)!==gov.checksum)throw new Error('Gov24 integrity');
  const existing=[...byId.values()].filter(r=>r.type==='support-program'&&r.sources?.includes(gov.source_id));
  const lookup=new Map(existing.map(r=>[r.gov24_service_id,r]));let updated=0,added=0;
  const selected=gov.items.filter(r=>['시군구','광역시도','지방출자_출연기관','지방공기업','교육청'].includes(r['소관기관유형'])||lookup.has(r['서비스ID']));
  for(const r of selected) {
    const serviceId=r['서비스ID'],old=lookup.get(serviceId);
    const item=base(old,`support.local-gov.api.${serviceId}`,r['서비스명'],'support-program','category.local-government-supports','local-government-supports',old?.search_shard||'local-government-supports');
    Object.assign(item,{description:r['서비스목적요약'],gov24_service_id:serviceId,gov24_service_seq:old?.gov24_service_seq,source_record_id:serviceId,
      jurisdiction:r['소관기관명'],jurisdiction_code:r['소관기관코드'],provider:r['소관기관명'],target_group:[],target_description:r['지원대상']||'',support_category:[r['서비스분야']||''],
      application_deadline_text:r['신청기한'],application_method:r['신청방법'],receiving_agency:r['접수기관'],contact:r['전화문의'],
      application_status:'unknown',is_currently_applicable:null,collection_status:'collected',current_refresh_succeeded:true,last_successful_collected_at:gov.collected_at,
      raw:r,criteria:[['지원대상',r['지원대상']],['선정기준',r['선정기준']],['지원내용',r['지원내용']],['신청기한',r['신청기한']]].map(([label,condition])=>({label,condition:String(condition||'미제공'),source:gov.source_id})),
      benefits:[{label:'지원내용',text:r['지원내용']}],conditions:[{label:'선정기준',text:r['선정기준']}],provider_modified_date:r['수정일시']});
    finish(item,gov.source_id,gov.collected_at,r,serviceId);put(old,item);old?updated++:added++;
  }
  const absent=existing.filter(r=>r.refresh_generation!==gov.collected_at);absent.forEach(r=>missing(r,gov.collected_at));
  report.domains.local_supports={updated,added,current_total:selected.length,not_in_latest:absent.length,source_total:gov.count};
}
const cat={id:'category.finance.api-observations',title:'공식 API 통계·공시 관측 자료',type:'category',parents:['finance.reference-ontology'],children:[],canonical_folder:'40-financial-reference/api-observations',population_status:'populated',publication_memberships:[exportFile('finance-reference')],search_shard:'reference',description:'원본 필드와 제공기관 기준일을 보존한 공식 API 관측 자료입니다.'};
cat.search_projection={id:cat.id,title:cat.title,type:cat.type,export_id:'finance-reference-ontology',search_text:cat.title};
observationRows.unshift(cat);
// Replace the existing base-rate value using ECOS, retaining its stable graph ID.
const ecos=json(path.join(DOCS,'api-snapshots/source.bok.ecos-0.json'));
const latest=[...ecos.items].sort((a,b)=>a.TIME.localeCompare(b.TIME)).at(-1);
const oldRate=byId.get('finance.benchmark-rate.bok-base-rate');
if(oldRate && latest) {
  const item=base(oldRate,oldRate.id,oldRate.title,'benchmark-rate',oldRate.parents[0],'finance-reference','reference');
  Object.assign(item,{description:`한국은행 기준금리 ${latest.DATA_VALUE}${latest.UNIT_NAME} (관측일 ${latest.TIME})`,rate_percent:Number(latest.DATA_VALUE),unit:latest.UNIT_NAME,observation_date:latest.TIME,raw:latest,
    criteria:[{label:'한국은행 기준금리',condition:`${latest.DATA_VALUE}${latest.UNIT_NAME}`,source:'source.bok.ecos',rate_percent:Number(latest.DATA_VALUE)}]});
  finish(item,'source.bok.ecos',ecos.collected_at,latest,`${latest.STAT_CODE}:${latest.ITEM_CODE1}:${latest.TIME}`);put(oldRate,item);
}
const generatedPath=path.join(KNOWLEDGE,'40-financial-reference/api-observations/current.jsonl');
fs.mkdirSync(path.dirname(generatedPath),{recursive:true});
for(const f of files) {
  if(f.file===generatedPath) continue;
  if(/new-products(?:-[0-9a-f]+)?\.jsonl$/.test(f.file)) continue;
  if(!f.rows.some(r=>changed.has(r.id))) continue;
  if(f.tail!==undefined) fs.writeFileSync(f.file,`---\n${JSON.stringify(f.rows[0],null,2)}\n---\n${f.tail}`);
  else fs.writeFileSync(f.file,f.rows.map(r=>JSON.stringify(r)).join('\n')+'\n');
}
fs.writeFileSync(generatedPath,observationRows.map(r=>JSON.stringify(r)).join('\n')+'\n');
const newPath=path.join(KNOWLEDGE,'40-financial-reference/api-observations/new-products.jsonl');
const previous=files.filter(f=>/new-products(?:-[0-9a-f]+)?\.jsonl$/.test(f.file)).flatMap(f=>f.rows);
const newMap=new Map([...previous,...additions].map(r=>[r.id,byId.get(r.id)||r]));
for(const bucket of '0123456789abcdef') {
  const rows=[...newMap.values()].filter(r=>sha256(r.id)[7]===bucket);
  fs.writeFileSync(newPath.replace('.jsonl',`-${bucket}.jsonl`),rows.map(r=>JSON.stringify(r)).join('\n')+'\n');
}
if(fs.existsSync(newPath))fs.rmSync(newPath);
report.canonical_refreshed=refreshed.size;report.observation_records=observationRows.length;
report.collected_at=[catalog.collected_at,additional.collected_at,...inventory.datasets.map(e=>e.collected_at),...(fs.existsSync(govPath)?[json(govPath).collected_at]:[])].filter(Boolean).sort().at(-1);
report.remaining_domains=['카드 혜택',...(report.domains.local_supports?[]:['지자체 지원금']),'세금·공제 법령','세제혜택 계좌','보험 상품별 보장·약관','연금저축 상세 공시'];
report.remaining_reason='이번 승인 API가 해당 원문의 내용을 제공하지 않거나 응답 스키마가 맞지 않아 기존 사실의 검토일을 변경하지 않았습니다.';
writeJson(path.join(DOCS,'canonical-refresh-report.json'),report);
for(const entry of inventory.datasets.filter(e=>e.source_id==='source.fss.finlife.api'||e.source_id==='source.kdic.insured-products')){entry.canonical_applied=true;entry.canonical_scope='catalog fields';}
inventory.canonical_refresh={path:'opentax/canonical-refresh-report.json',count:refreshed.size};
for(const dataset of additional.datasets) {
  const operation=`${dataset.endpoint}-${dataset.group}`,file=`source.fss.finlife.api-${operation}.json`;
  const title=`금융감독원 ${dataset.endpoint.startsWith('mortgage')?'주택담보대출':dataset.endpoint.startsWith('rent')?'전세자금대출':'신용대출'} (${dataset.group})`;
  writeJson(path.join(DOCS,'api-snapshots',file),{source_id:'source.fss.finlife.api',title,source_url:'https://finlife.fss.or.kr/',collected_at:additional.collected_at,count:dataset.count,items:dataset.rows,recommendation_eligible:false});
  inventory.datasets=inventory.datasets.filter(e=>!(e.source_id==='source.fss.finlife.api'&&e.operation===operation));
  inventory.datasets.push({source_id:'source.fss.finlife.api',title,operation,count:dataset.count,collected_at:additional.collected_at,canonical_applied:true,path:`opentax/api-snapshots/${file}`});
}
if(fs.existsSync(govPath)) {
  const gov=json(govPath),file='source.gov24.benefit-plus.local-supports-current.json';
  writeJson(path.join(DOCS,'api-snapshots',file),{...gov,title:'행정안전부 공공서비스 혜택 정보',recommendation_eligible:false});
  inventory.datasets=inventory.datasets.filter(e=>e.source_id!==gov.source_id);
  inventory.datasets.push({source_id:gov.source_id,title:'행정안전부 공공서비스 혜택 정보',operation:'serviceList',count:gov.count,collected_at:gov.collected_at,canonical_applied:true,canonical_scope:'지방기관·기존 서비스 9,281개; 중앙기관 등 나머지는 원문 검색으로 제공',path:`opentax/api-snapshots/${file}`});
}
inventory.scope='전체 건수·체크섬을 검증한 API 수집본. 예금·적금·대출·예금자보호·지방 혜택은 식별자를 대조해 본문에 반영하고, 나머지 통계·공시는 원문 필드를 보존한 관측 자료로 제공합니다. 미갱신 분야와 제공기관 기준일은 별도입니다.';
inventory.integration='canonical catalog fields and typed API observations; see canonical-refresh-report.json for coverage and remaining domains';
inventory.pending=additional.failures.map(f=>({...f,source_id:'source.fss.finlife.api',checked_at:additional.collected_at,status:'provider_response_rejected'}));
inventory.snapshot_basis_date=report.collected_at.slice(0,10);
inventory.validated_at=report.collected_at;
inventory.validation_scope='API collection counts, identity and schema mapping; provider reporting dates preserved';
writeJson(path.join(DOCS,'collection-inventory.json'),inventory);
console.log(JSON.stringify({refreshed:refreshed.size,added:additions.length,observations:observationRows.length,domains:report.domains,unresolved:report.unresolved}));
