// Fresh official disclosures. Keep unverified historic facts out of new records.
import fs from 'node:fs';
import path from 'node:path';
import {ROOT,KNOWLEDGE,DOCS,json,sha256,writeJson,writeText} from './common.mjs';
import {normalizePensionGroup} from './disclosure-normalizers.mjs';
import {localTaxReviews} from './local-tax-reviews.mjs';
import {publicReceipt} from './disclosure-receipts.mjs';
import {filingTaxReviews} from './filing-tax-reviews.mjs';
import {deadlineReviews} from './deadline-reviews.mjs';
const sourceDir=path.join(ROOT,'.api-candidates/disclosures');
const cards=json(path.join(sourceDir,'cards.json'));
const insurance=json(path.join(sourceDir,'insurance.json'));
const policyFile=path.join(sourceDir,'insurance-policy-documents.json');
const policyDocuments=fs.existsSync(policyFile)?json(policyFile).results.filter(r=>r.receipt):[];
const pension=json(path.join(sourceDir,'pension.json'));
if(insurance.failures.length || pension.failures.length) throw new Error('Incomplete official disclosure collection');
const pensionProducts=pension.groups.flatMap(normalizePensionGroup);
const files=[],byId=new Map();
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,e.name);if(e.isDirectory()){walk(file);continue;}
 if(e.name.endsWith('.jsonl')){const rows=fs.readFileSync(file,'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse);files.push({file,rows});rows.forEach(r=>byId.set(r.id,r));}
 else if(e.name.endsWith('.md')){const t=fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n'),end=t.indexOf('\n---\n',4);if(t.startsWith('---\n')&&end>=0){const r=JSON.parse(t.slice(4,end));if(r.id){files.push({file,rows:[r],tail:t.slice(end+5)});byId.set(r.id,r);}}}
}}
walk(KNOWLEDGE);
const changed=new Set(),added=[],report={generated_at:new Date().toISOString(),domains:{}};
function base(old,id,title,type,parent,domain,shard){return {...Object.fromEntries(['deadlines','requires','folder','basis_year'].filter(k=>old?.[k]!==undefined).map(k=>[k,old[k]])),id:old?.id||id,title,type,description:'',parents:old?.parents||[parent],children:old?.children||[],related:old?.related||[],terms:old?.terms||[],tags:old?.tags||[],publication_memberships:old?.publication_memberships||[`korea-${domain}-ontology-2026.json`],search_shard:old?.search_shard||shard,status:'reference_only',sales_status:'unknown',recommendation_status:'reference_only',recommendation_scope:'listing_only',comparison_engine_gate_passed:false,domain_gate_passed:false};}
function finish(item,source,receipt,payload){
 receipt=publicReceipt(receipt);
 const at=receipt.collected_at;
 Object.assign(item,{sources:[source],source_urls:[receipt.url,...(payload.provider_disclosure_urls||[])],collected_at:at,source_collected_at:at,last_source_checked_at:at,last_reviewed_at:at,reviewed_at:at,refresh_generation:at,review_scope:'공식 공시의 식별자·본문·필드 연결 확인',source_listing_status:'listed',source_freshness_status:'current',freshness_status:'current',verification_status:'listing_only',sales_verification_status:'listed_unverified'});
 const key=sha256(item.id).slice(7,31),relative=`disclosures/${key}.json`;
 const disclosure=JSON.parse(JSON.stringify({id:item.id,source_id:source,...payload,receipt}));
 writeJson(path.join(DOCS,relative),disclosure);
 item.current_disclosure={path:`opentax/${relative}`,checksum:sha256(disclosure),checksum_scope:'normalized-disclosure-json',source_url:receipt.url,collected_at:at};
 item.provenance=[{source_id:source,original_url:receipt.url,source_record_id:item.source_record_id||item.id,collected_at:at,reviewed_at:at,checksum:`sha256:${receipt.sha256}`,checksum_scope:'official-disclosure-response',verification_status:'listing_only',supported_fields:['title','description','criteria','current_disclosure'],locator:{kind:'record-id',value:item.source_record_id||item.id}}];
 item.search_projection={...Object.fromEntries(['id','title','type','description','provider','product_kind','status','sales_status','source_urls','freshness_status','recommendation_status','recommendation_scope'].filter(k=>item[k]!==undefined).map(k=>[k,item[k]])),source_ids:[source],export_id:item.publication_memberships[0].replace('korea-','').replace('-2026.json',''),search_text:[item.title,item.provider,item.description].filter(Boolean).join(' ').toLowerCase()};
 item.record_checksum=sha256({...item,provenance:undefined,record_checksum:undefined});changed.add(item.id);
}
function put(old,item){if(old){Object.keys(old).forEach(k=>delete old[k]);Object.assign(old,item);}else{added.push(item);byId.set(item.id,item);}}
function criterion(label,condition,source){return {label,condition,basis:'공식 공시 원문',source,criteria_kind:'disclosure'};}
let cardUpdated=0;
for(const row of cards.results.filter(r=>r.text)){
 const old=byId.get(row.id);if(!old)throw new Error(`Unknown card ${row.id}`);
 const source=(old.sources||[]).find(s=>row.receipt.url.includes('kbcard')?s.includes('kbcard'):row.receipt.url.includes('bccard')?s.includes('bccard'):row.receipt.url.includes('samsungcard')?s.includes('samsungcard'):s.includes('carddamoa'))||old.sources[0];
 const item=base(old,old.id,row.title,'card-product',null,'card-products','card-products');
 Object.assign(item,{provider:old.provider,provider_code:old.provider_code,product_code:old.product_code,product_kind:old.product_kind,source_record_id:old.source_record_id,description:`${row.title}의 공식 상세 안내입니다. 혜택·이용조건·한도·유의사항은 수집된 상세 원문에서 확인할 수 있습니다.`,criteria:[criterion('공식 상품 상세 안내',row.text,source)]});
 if(row.receipt.product_code)item.product_code=row.receipt.product_code;
 finish(item,source,row.receipt,{text:row.text,scope:row.scope});put(old,item);cardUpdated++;
}
report.domains.cards={updated:cardUpdated,unresolved:cards.results.filter(r=>r.error).map(({id,error})=>({id,error}))};
const oldInsurance=new Map([...byId.values()].filter(r=>r.type==='insurance-product').map(r=>[r.source_record_id,r]));
let insuranceUpdated=0,insuranceAdded=0;
for(const group of insurance.groups)for(const row of group.products){
 const source='source.klia.insurance-disclosure',record=`klia-assurance:${group.group}:${row.code}`,old=oldInsurance.get(record);
 const template=old||[...oldInsurance.values()].find(r=>r.source_record_id?.startsWith(`klia-assurance:${group.group}:`));
 if(!template)throw new Error('Insurance group template missing');
 const item=base(old,`finance.insurance.klia.current.${sha256(record).slice(7,27)}`,`${row.provider} ${row.title}`,'insurance-product',template.parents[0],'insurance-products','insurance-products');
 Object.assign(item,{provider:row.provider,product_code:row.code,product_kind:template.product_kind,source_record_id:record,description:row.coverage.join(' / '),criteria:row.coverage.map(t=>criterion('공시 보장내용·지급사유',t,source)),raw:{disclosure_cells:row.cells,document_urls:row.documents}});
 const policies=policyDocuments.filter(document=>(row.provider_disclosure_urls||[]).includes(document.index_url));
 if(policies.length)item.raw.policy_documents=policies;
 finish(item,source,row.receipt,{...row,policy_documents:policies,receipt:undefined});put(old,item);old?insuranceUpdated++:insuranceAdded++;
}
report.domains.insurance={updated:insuranceUpdated,added:insuranceAdded,collected:insuranceUpdated+insuranceAdded,
 policy_documents_collected:policyDocuments.length,policy_clauses_fully_reviewed:false};
let pensionCount=0;const pensionIds=new Set();
for(const row of pensionProducts){
 const source='source.fss.integrated-pension-portal',record=row.record;
 if(pensionIds.has(record))throw new Error('Duplicate pension record');pensionIds.add(record);
 const id=`finance.pension.disclosure.${sha256(record).slice(7,31)}`,old=byId.get(id),item=base(old,id,`${row.provider} ${row.title}`,'financial-product','category.finance.pension-savings-products','pension-products','pension-products');
 Object.assign(item,{provider:row.provider,product_kind:'pension-savings',search_type:'pension',source_record_id:record,provider_basis:row.basis_period,description:`${row.basis_period} 기준 연금저축 상품별 수익률·수수료율 공식 공시입니다. 수집일과 공시 기준 분기는 다릅니다.`,criteria:row.observations.flatMap((observation,index)=>Object.entries(observation.fields).map(([label,value])=>criterion(`${row.observations.length>1?`공시행 ${index+1} · `:''}${label}`,value,source))),raw:{observations:row.observations,basis_period:row.basis_period}});
 finish(item,source,row.receipt,row);put(old,item);pensionCount++;
}
report.domains.pension={collected:pensionCount};
for(const id of ['category.finance.pension-savings-products','category.finance.pension-products']){const r=byId.get(id);r.population_status='populated';r.population_reason='금융감독원 통합연금포털의 상품별 수익률·수수료율 공시 반영';r.description='연금저축 상품별 수익률·수수료율 공시와 공식 원문을 확인합니다. 수익률의 기준 분기와 자료 수집일을 구분합니다.';changed.add(id);}
const accounts=json(path.join(sourceDir,'accounts.json'));
const accountRules={
 housing:[
  ['가입대상','국민인 개인(국내 거주 재외동포 포함) 또는 외국인 거주자. 청약저축 종류를 합하여 전 금융기관 1인 1계좌입니다.'],
  ['납입방식','매월 2만원 이상 50만원 이하 자유납입. 잔액 1,500만원 미만이면 1,500만원까지 일시예치할 수 있습니다.'],
  ['소득공제 대상','총급여 7천만원 이하 근로자인 무주택 세대주 및 무주택 세대주의 배우자. 다음 연도 2월 말까지 가입은행에 무주택확인서를 제출해야 합니다.'],
  ['소득공제 한도','연 납입액 300만원 한도의 40%, 최대 120만원을 소득공제합니다.'],
  ['추징','가입 후 5년 이내 해지 또는 국민주택규모 초과 주택 당첨 등은 추징 대상입니다. 해외이주·85㎡ 이하 당첨해지 등 예외와 상세 기준은 공식 안내를 확인합니다.'],
  ['보호 여부','예금자보호법에 따른 보호상품이 아니며 주택도시기금 재원으로 정부가 관리합니다.']
 ],
 youth:[
  ['가입대상','만 19~34세 무주택자. 병역 이행기간은 최대 6년을 나이에서 차감합니다. 신고·증빙 소득 연 5천만원 이하가 기준이며, 근로기간 1년 미만자·군인·전역자 등의 예외는 공식 안내를 따릅니다.'],
  ['우대금리','공식 안내의 최고 연 4.5%는 조건부 변동금리입니다. 가입기간 2년 이상, 무주택기간, 가입일부터 10년 이내 등 적용 요건을 확인해야 합니다.'],
  ['비과세 가입기한·한도','2028년 12월 31일까지 가입하고 비과세 요건을 충족하여 2년 이상 유지하면 이자소득 합계 500만원, 납입원금 연 600만원 한도로 비과세가 적용됩니다.'],
  ['비과세 자격','가입자격과 별도로, 무주택 세대의 세대주 또는 배우자이면서 총급여 3,600만원 이하 근로소득자 또는 종합소득금액 2,600만원 이하 등 요건을 충족해야 합니다. 소득 종류 및 귀속연도 예외는 공식 안내를 확인합니다.'],
  ['금융소득 요건','직전 3개 과세기간 중 1회 이상 금융소득종합과세 기준을 초과하면 이자소득 비과세 대상에서 제외됩니다.'],
  ['소득공제','청약 및 소득공제 등은 주택청약종합저축의 해당 요건을 따릅니다.']
 ],
 isa:[
  ['가입대상','만 19세 이상 거주자 또는 직전연도 근로소득이 있는 만 15~19세 미만 거주자. 직전 3개 과세기간 중 금융소득종합과세 대상 여부 등 법정 제외요건을 확인합니다.'],
  ['납입한도·기간','연 2천만원, 총 1억원 한도이며 미납입 한도는 이월할 수 있습니다. 의무가입기간은 3년입니다.'],
  ['세제혜택','일반형 200만원, 서민형·농어민형 400만원까지 비과세하며 초과 순이익에 9.9%(지방소득세 포함) 분리과세가 적용됩니다. 유형별 소득·자격요건을 충족해야 합니다.'],
  ['유형별 요건','서민형은 총급여 5천만원 또는 종합소득 3천8백만원 이하, 농어민형은 종합소득 3천8백만원 이하 등 해당 요건과 소득 귀속연도를 확인합니다.'],
  ['중도인출','납입원금 범위에서 중도인출할 수 있으나 인출금액만큼 납입한도가 복원되지는 않습니다.'],
  ['운용방식','중개형은 투자자가 투자상품을 선택하고, 신탁형은 운용 지시를 하며, 일임형은 금융회사가 일임 운용합니다. 유형별 투자 가능 상품과 수수료는 다릅니다.']
 ]
};
let accountCount=0;
for(const old of [...byId.values()].filter(r=>r.type==='account-product'&&r.id.startsWith('finance.account.'))){
 const name=old.id.includes('isa-account')?'isa':old.id.endsWith('youth-dream')?'youth':'housing';
 const row=accounts.results.find(r=>r.name===name);if(!row)throw new Error('Missing account receipt');
 const source=name==='isa'?'source.mirae.isa-guide':'source.nhuf.housing-subscription';
 if(name==='isa'&&!byId.has(source)){
  const node={id:source,type:'source',terms:[],publication_memberships:['korea-tax-advantaged-accounts-ontology-2026.json'],provenance_shard:'reference',title:'미래에셋증권 ISA 가입자격·종류 안내',publisher:'미래에셋증권',authority_class:'provider_official',domains:['tax-advantaged-accounts'],url:row.receipt.url,urls:{canonical:row.receipt.url,all:[row.receipt.url]},access:{method:'product-page',parser_id:'html:mirae-isa-guide',requires_secret:false},refresh:{sla_hours:168,change_detection:'content checksum'},usage_terms:{license_or_terms:'공식 공개 상품 안내; 사실 요약 및 출처 연결',raw_snapshot_allowed:false},recommendation_eligible:false,status:'active'};
  const file=path.join(KNOWLEDGE,'90-sources/providers/source-mirae-isa-guide.md');files.push({file,rows:[node],tail:'\n'});byId.set(source,node);changed.add(source);
 }
 const item=base(old,old.id,old.title,'account-product',null,'tax-advantaged-accounts','tax-advantaged-accounts');
 Object.assign(item,{provider:old.provider,product_kind:old.product_kind,description:`${old.title}의 가입 요건과 세제혜택을 공식 안내에 따라 정리했습니다.`,criteria:accountRules[name].map(([label,text])=>criterion(label,text,source))});
 finish(item,source,row.receipt,{summary:item.criteria.map(({label,condition})=>({label,condition}))});put(old,item);accountCount++;
}
report.domains.accounts={updated:accountCount};
// Explicitly reviewed changes: do not promote the rest of the tax corpus from
// availability checks. Transitional provisions are part of the legal basis.
const lawSource=json(path.join(sourceDir,'tax-sources.json')).results.find(r=>r.id==='source.law.income-tax-act.deductions-credits');
const taxQueue=json(path.join(sourceDir,'tax-review-queue.json'));
const childArticle=taxQueue.facts.find(r=>r.id==='credit.child').criteria.flatMap(c=>c.matched_articles).find(a=>a.reference==='소득세법 제59조의2');
const transitionalStart=lawSource.text.lastIndexOf('부 칙 <법률 제21548호, 2026. 4. 21.>');
if(!childArticle||transitionalStart<0)throw new Error('Child credit transitional law not located');
const transitional=lawSource.text.slice(transitionalStart);
if(!transitional.includes('2026년 12월 31일까지의 과세기간분: 9세 이상')||!transitional.includes('2017년 1월 1일'))throw new Error('Child credit law changed; manual review required');
const oldChild=byId.get('credit.child');
const child=base(oldChild,oldChild.id,oldChild.title,oldChild.type,null,'tax','tax');
child.description='기본공제대상 자녀·손자녀 및 출산·입양에 대한 세액공제입니다. 2026년 연령 기준은 개정법 부칙과 출생연도 예외를 함께 적용합니다.';
child.criteria=taxQueue.facts.find(r=>r.id===child.id).criteria.map(({existing:c})=>({...c,source:lawSource.id,basis_source:lawSource.id,...(c.age_min!==undefined?{age_min:9,tax_year:2026,basis:'2026년 귀속 기본공제대상 자녀·손자녀',condition:c.condition+'; 2026년 9세 이상 기준 및 2017년 출생자 예외는 부칙 제2조 적용',note:[c.note,'2027년 10세·2028년 11세·2029년 12세 이상 경과규정. 2017년 출생자는 부칙 제2조 제3항에 따라 경과규정 제외.'].filter(Boolean).join(' ')}:{})}));
finish(child,lawSource.id,lawSource.receipt,{article:childArticle.text,transitional_provisions:transitional});put(oldChild,child);
const pensionArticle=taxQueue.facts.find(r=>r.id==='credit.pension-account').criteria.flatMap(c=>c.matched_articles).find(a=>a.reference==='소득세법 제59조의3');
if(!pensionArticle)throw new Error('Pension credit article missing');
const oldCredit=byId.get('credit.pension-account'),credit=base(oldCredit,oldCredit.id,oldCredit.title,oldCredit.type,null,'tax','tax');
credit.description='연금저축과 퇴직연금 납입액에 대한 세액공제입니다. 소득구간별 공제율, 납입 제외금액, ISA 만기 전환 특례를 구분합니다.';
credit.criteria=[
 {...criterion('공제율 15%','종합소득금액 4,500만원 이하. 근로소득만 있으면 총급여 5,500만원 이하에 적용합니다.',lawSource.id),rate_percent:15,limit_krw:9000000},
 {...criterion('공제율 12%','위 15% 적용 소득구간에 해당하지 않는 경우에 적용합니다.',lawSource.id),rate_percent:12,limit_krw:9000000},
 {...criterion('납입액 한도','연금저축계좌 연 600만원, 퇴직연금계좌를 합하여 연 900만원입니다.',lawSource.id),limit_krw:9000000},
 criterion('납입 제외','과세이연 퇴직소득 등과 연금계좌 간 계약이전으로 납입된 금액은 공제대상 납입액에서 제외합니다.',lawSource.id),
 criterion('ISA 만기 전환','법정 방법으로 만기 ISA 잔액을 연금계좌에 납입하면 전환액의 10%와 300만원 중 적은 금액을 한도에 추가합니다. 두 과세기간에 걸친 납입은 전년도 적용액을 차감합니다.',lawSource.id)
];
finish(credit,lawSource.id,lawSource.receipt,{article:pensionArticle.text});put(oldCredit,credit);
const oldHousing=byId.get('deduction.housing-savings');
const housing=base(oldHousing,oldHousing.id,oldHousing.title,oldHousing.type,null,'tax','tax');
housing.description='총급여 7천만원 이하 근로자인 무주택 세대주 및 그 배우자의 주택마련저축 소득공제입니다.';
housing.criteria=accountRules.housing.filter(([label])=>label.startsWith('소득공제')||label==='추징').map(([label,text])=>criterion(label,text,'source.nhuf.housing-subscription'));
const housingReceipt=accounts.results.find(r=>r.name==='housing').receipt;
finish(housing,'source.nhuf.housing-subscription',housingReceipt,{summary:housing.criteria});put(oldHousing,housing);
const reviewedTax=[child.id,credit.id,housing.id];
// The current Article 55 rate table was visually reviewed, including its last
// bracket whose HTML image alternative omits the fixed base amount.
const expectedIncomeRates=[6,15,24,35,38,40,42,45];
const expectedIncomeDeductions=[0,1260000,5760000,15440000,19940000,25940000,35940000,65940000];
for(const id of ['tax.income','tax.income.comprehensive']){
 const original=taxQueue.facts.find(r=>r.id===id),old=byId.get(id);
 const criteria=original.criteria.map(({existing:c},i)=>{
  if(c.rate_percent!==expectedIncomeRates[i]||c.progressive_deduction_krw!==expectedIncomeDeductions[i])throw new Error('Income tax table differs from reviewed values');
  return {...c,source:lawSource.id,basis_source:lawSource.id,law_reference:'소득세법 제55조 제1항'};
 });
 if(criteria.length!==8)throw new Error('Income tax bracket count mismatch');
 const item=base(old,id,old.title,old.type,null,'tax','tax');Object.assign(item,{description:old.description,criteria});
 finish(item,lawSource.id,lawSource.receipt,{reviewed_article:'소득세법 제55조 제1항',table_image_url:'https://www.law.go.kr/LSW/flDownload.do?flSeq=123278409',rate_percent:expectedIncomeRates,progressive_deduction_krw:expectedIncomeDeductions});put(old,item);reviewedTax.push(id);
}
const corporateSource=json(path.join(sourceDir,'tax-sources.json')).results.find(r=>r.id==='source.nts.corporate-tax.rates');
if(!corporateSource.text.includes('2026년 이후')||!corporateSource.text.includes('소규모법인'))throw new Error('Corporate tax source changed; review required');
const oldCorporate=byId.get('tax.corporate'),corporate=base(oldCorporate,oldCorporate.id,oldCorporate.title,oldCorporate.type,null,'tax','tax');
corporate.description='2026년 이후 개시 사업연도의 각 사업연도 소득에 적용되는 법인세입니다. 일반법인·소규모법인·조합법인의 세율을 구분하며 토지 등 양도소득의 추가세액은 별도입니다.';
corporate.criteria=taxQueue.facts.find(r=>r.id===corporate.id).criteria.map(({existing:c})=>({...c,label:'일반법인 · '+c.label,condition:'영리·비영리법인의 각 사업연도 소득 일반세율(소규모법인·조합법인 특례 제외); '+c.condition,source:corporateSource.id,basis_source:corporateSource.id,law_reference:'법인세법 제55조',tax_year:2026}));
for(const [label,condition,lower,upper,rate,deduction] of [
 ['소규모법인','200억원 이하',0,20000000000,20,0],
 ['소규모법인','200억원 초과 3,000억원 이하',20000000000,300000000000,22,400000000],
 ['소규모법인','3,000억원 초과',300000000000,null,25,9400000000],
 ['조합법인(조특법 제72조 적용)','20억원 이하',0,2000000000,9,0],
 ['조합법인(조특법 제72조 적용)','20억원 초과',2000000000,null,15,120000000]
])corporate.criteria.push({...criterion(label+' · '+condition,'해당 법인유형의 법정 요건을 충족하는 경우; '+condition,corporateSource.id),criteria_kind:'rate',rate_percent:rate,progressive_deduction_krw:deduction,threshold_krw_min:lower,...(upper===null?{}:{threshold_krw_max:upper}),tax_year:2026});
finish(corporate,corporateSource.id,corporateSource.receipt,{text:corporateSource.text});put(oldCorporate,corporate);reviewedTax.push(corporate.id);
// Manually reconciled with the current Income Tax Act, including exclusions
// omitted from the old summaries. Store the exact article with every summary.
function incomeArticle(number){
 const marker=`제${number.replace('의','조의')}${number.includes('의')?'':'조'}(`;
 const start=lawSource.text.indexOf(marker);
 if(start<0)throw new Error(`Missing income article ${number}`);
 const rest=lawSource.text.slice(start),next=rest.slice(marker.length).search(/제\d+조(?:의\d+)?\(/);
 return next<0?rest:rest.slice(0,next+marker.length);
}
const personalBasic=[
 ['기본공제 금액','종합소득이 있는 거주자 본인과 요건을 충족한 배우자·부양가족 1명당 연 150만원입니다.'],
 ['배우자·부양가족 소득','해당 과세기간 소득금액 합계 100만원 이하. 근로소득만 있으면 총급여 500만원 이하를 포함합니다. 본인에게 이 소득상한을 적용하는 것은 아닙니다.'],
 ['부양가족 나이·관계','생계를 같이 하는 직계존속은 60세 이상, 직계비속·동거 입양자는 20세 이하, 형제자매는 20세 이하 또는 60세 이상입니다. 법정 장애인은 나이 제한을 받지 않습니다.'],
 ['기타 대상·중복 제한','법정 수급권자·위탁아동 및 장애인 직계비속 등의 배우자는 별도 법정 요건을 따릅니다. 같은 배우자·부양가족을 여러 거주자가 중복 공제할 수 없습니다.']
];
const personalAdditional=[
 ['경로우대','기본공제대상자 중 70세 이상인 사람 1명당 연 100만원을 추가 공제합니다.'],
 ['장애인','법정 장애인에 해당하는 기본공제대상자 1명당 연 200만원을 추가 공제합니다.'],
 ['부녀자','합산 종합소득금액 3천만원 이하인 여성 중 배우자가 있거나, 배우자가 없고 기본공제대상 부양가족이 있는 세대주이면 연 50만원입니다.'],
 ['한부모','배우자가 없고 기본공제대상 직계비속 또는 입양자가 있으면 연 100만원입니다. 부녀자공제와 동시에 해당하면 한부모공제만 적용합니다.'],
 ['공제 범위','인적공제 합계액 중 종합소득금액을 초과하는 금액은 공제하지 않습니다.']
];
const housingFundRules=[
 ['주택임차차입금','과세기간 말 무주택 세대의 법정 세대주 또는 해당 공제를 받지 않는 세대주의 세대원인 근로소득자가 일정 규모 이하 주택·주거용 오피스텔의 법정 임차차입금 원리금을 상환하면 40%를 공제합니다. 주택마련저축 공제와 합하여 연 400만원 한도입니다.'],
 ['장기주택저당차입금 대상','과세기간 말 무주택 또는 1주택 세대의 법정 대상 근로소득자가 취득 당시 기준시가 6억원 이하 주택의 법정 장기주택저당차입금 이자를 상환한 경우입니다. 세대 전체가 2주택 이상이면 제외하며 세대원은 실제 거주 요건도 적용합니다.'],
 ['15년 이상 기본 한도','상환기간 15년 이상은 연 800만원입니다. 주택임차차입금과 주택마련저축 공제액을 합산해 한도를 적용합니다.'],
 ['고정금리·비거치식 특례','15년 이상이며 고정금리와 비거치식 분할상환을 모두 충족하면 연 2,000만원, 둘 중 하나이면 연 1,800만원입니다. 10년 이상이며 둘 중 하나이면 연 600만원입니다.'],
 ['적용 시점·요건','위 금액은 현행 조문의 기준이며 차입·취득 시점에 따른 부칙 및 경과규정, 시행령상 차입 요건을 함께 확인해야 합니다. 기존 대출에 새로운 한도를 무조건 소급 적용하지 않습니다.']
];
const manualIncomeReviews=[
 ['deduction.housing-funds',['52'],housingFundRules],
 ['deduction.special-income',['52'],[
  ['근로자 보험료','일용근로자를 제외한 근로소득자가 부담하여 지급한 건강보험료·고용보험료·노인장기요양보험료를 공제합니다.'],
  ...housingFundRules,
  ['공통 제한','법정 신청을 해야 하며 공제액이 해당 과세기간 합산과세 종합소득금액을 초과하면 초과분은 공제하지 않습니다.']
 ]],
 ['credit.earned-income',['59'],[
  ['산출세액 130만원 이하','근로소득에 대한 종합소득 산출세액의 55%입니다.'],
  ['산출세액 130만원 초과','71만5천원에 130만원 초과 산출세액의 30%를 더합니다.'],
  ['총급여 3,300만원 이하 한도','74만원입니다.'],
  ['총급여 3,300만원 초과 7,000만원 이하 한도','74만원에서 총급여의 3,300만원 초과분 × 0.008을 차감하되 최소 66만원입니다.'],
  ['총급여 7,000만원 초과 1억2천만원 이하 한도','66만원에서 총급여의 7,000만원 초과분 × 0.5를 차감하되 최소 50만원입니다.'],
  ['총급여 1억2천만원 초과 한도','50만원에서 총급여의 1억2천만원 초과분 × 0.5를 차감하되 최소 20만원입니다.'],
  ['일용근로자','일용근로소득 원천징수 시 해당 산출세액의 55%를 공제합니다.']
 ]],
 ['credit.dividend',['17','56'],[
  ['대상','종합소득에 합산한 배당 중 소득세법 제17조 제3항의 배당가산 대상 배당에 적용합니다. 모든 배당에 일률적으로 적용하는 공제가 아닙니다.'],
  ['가산·공제','법정 대상 배당소득에는 10%를 소득에 가산하고 그 가산액에 해당하는 금액을 종합소득 산출세액에서 공제합니다.'],
  ['적용 범위','종합소득 과세표준에 포함된 배당 중 금융소득 종합과세기준금액을 초과하는 부분이 대상입니다. 법인세 비과세·면제 관련 배당 등 법정 제외사항과 시행령상 공제 계산을 적용합니다.']
 ]],
 ['filing.withholding-tax',['128'],[
  ['원칙','원천징수한 소득세는 징수일이 속한 달의 다음 달 10일까지 납부합니다.'],
  ['반기납부','상시고용인원·업종 등 시행령상 요건을 충족한 원천징수의무자는 해당 반기의 마지막 달의 다음 달 10일까지 납부할 수 있습니다. 모든 사업자가 임의로 선택하는 방식은 아닙니다.'],
  ['반기납부 제외','법인세법상 소득처분에 따른 상여·배당·기타소득, 국제조세조정법상 처분 배당 및 법에서 정한 특정 원천징수세액은 반기납부에서 제외됩니다.']
 ]],
 ['filing.business-income-withholding',['129'],[
  ['일반 세율','법정 원천징수대상 사업소득의 소득세 원천징수세율은 3%입니다. 지방소득세를 합친 세율과 구분해야 하며 모든 사업소득이 원천징수 대상인 것은 아닙니다.'],
  ['특례','외국인 직업운동가가 프로스포츠구단과 계약하여 용역을 제공하고 받는 소득은 소득세 20%를 적용합니다.']
 ]],
 ['filing.year-end-settlement',['137'],[
  ['시기','원천징수의무자가 다음 연도 2월분 급여를 지급할 때 정산합니다. 퇴직자는 퇴직하는 달의 급여 지급 시 정산합니다.'],
  ['정산 방법','근로소득금액에 신고된 소득공제를 적용하여 과세표준을 계산하고 기본세율을 적용한 뒤, 이미 원천징수한 세액과 법정 세액공제를 차감합니다. 초과 납부한 세액은 환급합니다.'],
  ['미신고·분납','공제 신고가 없으면 본인 기본공제와 표준세액공제만 적용합니다. 추가 납부세액이 10만원을 초과하면 다음 연도 2~4월 급여에서 나누어 원천징수할 수 있습니다.']
 ]],
 ['filing.payment-statement-submission',['164'],[
  ['일반 지급명세서','원칙적으로 지급일이 속하는 과세기간의 다음 연도 2월 말일까지 제출합니다.'],
  ['3월 10일 대상','원천징수대상 사업소득, 근로소득·퇴직소득, 종교인소득 및 법정 봉사료는 다음 연도 3월 10일까지입니다.'],
  ['일용근로소득','지급일이 속하는 달의 다음 달 말일까지 제출합니다.'],
  ['휴업·폐업·해산','원칙적으로 해당 달의 다음다음 달 말일까지이며, 일용근로소득은 다음 달 말일까지입니다.'],
  ['제출·간주','정보통신망 또는 전자저장매체 제출이 원칙입니다. 법정 제출 면제·서면 제출 예외와 다른 서류·간이지급명세서 제출로 갈음하는 범위가 있습니다. 간이지급명세서의 별도 제출기한과 일반 지급명세서 기한을 혼동하지 않아야 합니다.']
 ]],
 ['deduction.health-insurance-premium',['52'],[
  ['대상','일용근로자를 제외한 근로소득자가 건강보험법·고용보험법·노인장기요양보험법에 따라 실제 부담하여 납부한 보험료입니다.'],
  ['공제 범위','근로자 본인 부담액을 근로소득금액에서 공제합니다. 사용자 부담분이나 일반 보장성보험료와 구분하며, 법정 신청과 종합소득금액 한도를 적용합니다.']
 ]],
 ['credit.medical-expense',['59의4'],[
  ['대상·기준','일용근로자를 제외한 근로소득자가 본인과 기본공제대상자를 위해 지급한 법정 의료비가 대상입니다. 부양가족의 나이·소득 제한을 적용하지 않으며 총급여의 3%를 초과한 지출부터 계산합니다.'],
  ['일반 의료비','다른 특례 대상 의료비를 제외한 일반 의료비는 3% 문턱을 초과한 금액 중 연 700만원까지 15%를 공제합니다.'],
  ['한도 특례','본인, 과세기간 개시일 현재 6세 이하, 종료일 현재 65세 이상, 장애인 및 법정 중증질환자·희귀난치성질환자·결핵환자의 의료비에는 일반 의료비의 700만원 한도를 적용하지 않습니다. 공제율은 15%입니다.'],
  ['미숙아·선천성이상아','법정 의료비 공제율은 20%입니다.'],
  ['난임시술','법정 난임시술비와 관련 처방 의약품 구입비의 공제율은 30%입니다.'],
  ['중복 문턱 방지','3% 기준액은 일반 의료비, 한도 특례 의료비, 미숙아·선천성이상아, 난임시술비 순으로 미달액을 차감합니다. 각 항목에서 3%를 별도로 중복 공제하는 방식이 아닙니다.']
 ]],
 ['credit.education-expense',['59의4'],[
  ['공제율·대상','일용근로자를 제외한 근로소득자가 지출한 법정 교육비의 15%입니다. 현행 조문은 기본공제대상자의 나이·소득 제한을 적용하지 않습니다. 비과세 교육비와 법정 지원금 등은 제외합니다.'],
  ['가족 교육비 한도','배우자·직계비속·형제자매·입양자·위탁아동의 대학 교육비는 1명당 연 900만원, 취학 전 아동·초중고생은 연 300만원까지입니다. 가족의 대학원 교육비와 가족이 학자금 대출로 지급한 교육비는 제외합니다.'],
  ['초등학생 예능·체육','과세기간 종료일 현재 9세 미만 또는 2학년 이하 초등학생의 법정 예능학원·체육시설 교육비도 포함됩니다. 모든 학원비가 대상인 것은 아니며 시행령상 시설·금액 요건을 충족해야 합니다.'],
  ['본인 교육비','본인의 법정 학교·대학원·직업능력개발훈련 교육비와 법정 학자금 대출 원리금 상환액은 가족 교육비의 300만원·900만원 한도를 적용하지 않습니다. 연체로 인한 추가 지급액 등은 제외합니다.'],
  ['장애인 특수교육','법정 사회복지시설·비영리법인·발달재활서비스 기관 등의 특수교육비가 대상입니다. 발달재활서비스 기관은 과세기간 종료일 현재 18세 미만인 경우만 해당합니다.']
 ]],
 ['credit.foreign-tax-paid',['57'],[
  ['대상','거주자의 종합소득 또는 퇴직소득에 합산된 국외원천소득에 대해 외국에서 납부했거나 납부할 법정 외국소득세액입니다.'],
  ['한도','해당 종합소득·퇴직소득 산출세액에 전체 소득 중 국외원천소득의 비율을 곱해 계산합니다. 감면·면제 대상 국외소득은 법정 조정을 적용합니다.'],
  ['이월','종합소득 산출세액에서 공제하는 경우 한도 초과액은 다음 과세기간부터 10년 이내의 공제한도에서 이월공제합니다. 이월기간 종료 후 미공제액은 법정 요건에 따라 필요경비에 산입합니다. 퇴직소득 공제에 이 이월규정을 그대로 적용하지 않습니다.'],
  ['추가 요건','조세조약상 간주납부세액과 외국법인 배당 관련 출자자 과세에는 별도 법정 요건이 있습니다. 국가별 계산·증빙 등 시행령상 절차를 확인해야 합니다.']
 ]],
 ['deduction.personal.basic',['50'],personalBasic],
 ['deduction.personal.additional',['51'],personalAdditional],
 ['deduction.personal',['50','51'],[...personalBasic,...personalAdditional]],
 ['deduction.pension-insurance',['51의3'],[
  ['공제 대상','종합소득이 있는 거주자가 공적연금 관련법에 따라 해당 과세기간에 납입한 기여금 또는 개인부담금을 소득공제합니다.'],
  ['공제 한계','인적공제·연금보험료공제·주택담보노후연금 이자비용공제·특별소득공제·조세특례제한법상 소득공제 합계가 종합소득금액을 초과하면 그 초과액 한도로 연금보험료공제를 받지 않은 것으로 봅니다.']
 ]],
 ['credit.bookkeeping',['56의2'],[
  ['대상·계산','간편장부대상자가 확정신고 시 복식부기로 소득금액을 계산하고 법정 서류를 제출하면, 종합소득산출세액에 장부로 계산한 사업소득금액의 종합소득금액 대비 비율을 곱한 금액의 20%를 공제합니다.'],
  ['한도','기장세액공제액은 100만원을 한도로 합니다.'],
  ['배제 조건','장부에 따라 신고할 소득금액의 20% 이상을 누락하거나 관련 장부·증빙을 확정신고기간 종료일부터 5년간 보관하지 않으면 적용하지 않습니다. 보관에는 천재지변 등 법정 예외가 있습니다.']
 ]],
 ['credit.insurance-premium',['59의4'],[
  ['보장성보험료','일용근로자를 제외한 근로소득자가 기본공제대상자를 피보험자로 하는 법정 보장성보험료를 납입하면 연 100만원 한도로 12%를 공제합니다. 만기환급금이 납입보험료를 초과하지 않는 보험이어야 합니다.'],
  ['장애인전용 보험료','기본공제대상 장애인을 피보험자 또는 수익자로 하는 법정 장애인전용 보장성보험료는 별도로 연 100만원 한도로 15%를 공제합니다.']
 ]],
 ['credit.standard',['59의4'],[
  ['근로소득자','특별소득공제·특별세액공제·월세액 세액공제를 신청하지 않은 근로소득 있는 거주자는 연 13만원을 공제합니다.'],
  ['성실사업자','근로소득이 없고 조세특례제한법 제122조의3 세액공제를 신청하지 않은 종합소득자 중 사업용계좌 신고 등 법정 성실사업자 요건을 충족하면 연 12만원입니다.'],
  ['그 밖의 종합소득자','근로소득이 없고 조세특례제한법 제122조의3 세액공제를 신청하지 않은 종합소득자 중 위 성실사업자에 해당하지 않으면 연 7만원입니다.']
 ]]
];
for(const [id,numbers,rules] of manualIncomeReviews){
 const old=byId.get(id),item=base(old,id,old.title,old.type,null,'tax','tax');
 Object.assign(item,{description:old.description,criteria:rules.map(([label,text])=>criterion(label,text,lawSource.id))});
 finish(item,lawSource.id,lawSource.receipt,{reviewed_articles:numbers.map(number=>({number,text:incomeArticle(number)})),summary:item.criteria});
 put(old,item);reviewedTax.push(id);
}
const localLaw=json(path.join(sourceDir,'tax-sources.json')).results.find(r=>r.id==='source.law.local-tax-act.rates');
function reviewedArticle(source,number){
 const marker=`제${number.replace('의','조의')}${number.includes('의')?'':'조'}(`;
 const start=source.text.indexOf(marker);if(start<0)throw new Error(`Missing ${source.id} ${marker}`);
 const rest=source.text.slice(start+marker.length),next=rest.search(/(?<![가-힣\d])제\d+조(?:의\d+)?\(/);
 return source.text.slice(start,next<0?undefined:start+marker.length+next);
}
for(const [id,numbers,rules,keepRateTable] of localTaxReviews){
 const old=byId.get(id),item=base(old,id,old.title,old.type,null,'tax','tax');
 const references=numbers.map(n=>`지방세법 제${n.replace('의','조의')}${n.includes('의')?'':'조'}`).join('·');
 const retained=keepRateTable?taxQueue.facts.find(r=>r.id===id).criteria.map(({existing:c})=>({...c,source:localLaw.id,basis_source:localLaw.id,law_reference:'지방세법 제111조',condition:c.condition+'; 일반세율, 1세대 1주택 특례·조례 조정 적용 전'})):[];
 Object.assign(item,{description:rules[0][1],criteria:[...retained,...rules.map(([label,text])=>({...criterion(label,text,localLaw.id),law_reference:references}))]});
 finish(item,localLaw.id,localLaw.receipt,{reviewed_articles:numbers.map(number=>({number,text:reviewedArticle(localLaw,number)})),summary:item.criteria,scope:'listed summary rules reviewed; not an exhaustive tax calculator'});
 put(old,item);reviewedTax.push(id);
}
for(const [id,sourceId,numbers,rules] of filingTaxReviews){
 const source=json(path.join(sourceDir,'tax-sources.json')).results.find(r=>r.id===sourceId);
 const old=byId.get(id),item=base(old,id,old.title,old.type,null,'tax','tax');
 Object.assign(item,{description:old.description,criteria:rules.map(([label,text])=>criterion(label,text,sourceId))});
 finish(item,sourceId,source.receipt,{reviewed_articles:numbers.map(number=>({number,text:reviewedArticle(source,number)})),summary:item.criteria});
 put(old,item);reviewedTax.push(id);
}
const calendars=json(path.join(sourceDir,'tax-calendars-2026.json')).results;
for(const [id,sourceId,numbers,patch] of deadlineReviews){
 const source=json(path.join(sourceDir,'tax-sources.json')).results.find(r=>r.id===sourceId);
 const old=byId.get(id),item=base(old,id,patch.title||old.title,old.type,null,'tax','tax');
 const {calendar_month,...fields}=patch;
 const calendar=calendar_month?calendars.find(r=>r.month===calendar_month):null;
 if(calendar_month&&!calendar)throw new Error(`Missing official calendar: ${id}`);
 Object.assign(item,{start_date:old.start_date,end_date:old.end_date,...fields,criteria:[criterion('신고·납부기한',patch.description,sourceId)]});
 finish(item,sourceId,source.receipt,{reviewed_articles:numbers.map(number=>({number,text:reviewedArticle(source,number)})),summary:item.criteria,calendar_evidence:calendar?{source_id:'source.nts.tax-calendar.2026',receipt:publicReceipt(calendar.receipt),text:calendar.text}:undefined});
 if(calendar){
  item.sources.push('source.nts.tax-calendar.2026');
  item.source_urls.push(calendar.receipt.url);
  item.provenance.push({source_id:'source.nts.tax-calendar.2026',original_url:calendar.receipt.url,collected_at:calendar.receipt.collected_at,reviewed_at:calendar.receipt.collected_at,checksum:`sha256:${calendar.receipt.sha256}`,checksum_scope:'official-calendar-response',verification_status:'reference_only',supported_fields:['description','end_date','recurrence']});
 }
 put(old,item);reviewedTax.push(id);
}
const inheritanceLaw=json(path.join(sourceDir,'tax-sources.json')).results.find(r=>r.id==='source.law.inheritance-gift-tax-act.rates');
for(const id of ['tax.gift','tax.inheritance','tax.inheritance-and-gift']){
 const old=byId.get(id),item=base(old,id,old.title,old.type,null,'tax','tax');
 const rates=[10,20,30,40,50],deductions=[0,10000000,60000000,160000000,460000000];
 const criteria=taxQueue.facts.find(r=>r.id===id).criteria.map(({existing:c},i)=>{
  if(c.rate_percent!==rates[i]||c.progressive_deduction_krw!==deductions[i])throw new Error(`Inheritance/gift rate table changed: ${id}`);
  return {...c,source:inheritanceLaw.id,basis_source:inheritanceLaw.id,law_reference:'상속세 및 증여세법 제26조·제56조',condition:c.condition+'; 일반 과세표준 세율, 할증·공제·특례 적용 전'};
 });
 if(criteria.length!==5)throw new Error('Inheritance/gift brackets missing');
 Object.assign(item,{description:'상속세·증여세 일반 과세표준에 적용하는 10~50% 누진세율입니다. 재산가액 자체와 공제 후 과세표준을 구분하고 세대생략 할증·세액공제·특례를 별도로 적용합니다.',criteria});
 finish(item,inheritanceLaw.id,inheritanceLaw.receipt,{reviewed_articles:['26','56'].map(number=>({number,text:reviewedArticle(inheritanceLaw,number)})),summary:criteria});put(old,item);reviewedTax.push(id);
}
const vatLaw=json(path.join(sourceDir,'tax-sources.json')).results.find(r=>r.id==='source.law.value-added-tax-act.filing');
const vatGuide=json(path.join(sourceDir,'vat-overview.json'));
if(!vatGuide.text.includes('10,400만원')||!vatGuide.text.includes('매출세액(매출액의 10%)'))throw new Error('VAT official guide changed; review required');
{
 const old=byId.get('tax.value-added'),item=base(old,old.id,old.title,old.type,null,'tax','tax');
 const rules=[
  ['일반세율','과세표준인 공급가액에 10%를 적용해 매출세액을 계산합니다. 매출세액에 다시 10%를 곱하는 방식이 아닙니다. 영세율·면세·불공제매입세액은 별도 요건에 따릅니다.'],
  ['간이과세 판정','원칙적으로 직전 연도 공급대가 1억400만원 미만인 개인사업자에 적용합니다. 부동산임대업·과세유흥장소의 4,800만원 기준, 배제업종, 다른 사업장 및 복수 사업장 합산, 신규사업자의 연환산 등 예외를 함께 확인합니다.'],
  ['간이과세 산식','공급대가 × 업종별 부가가치율 × 10%에서 법정 공제세액을 뺍니다. 부가가치율 자체에 다시 15~40%를 곱하는 방식이 아닙니다. 겸영 업종은 각각 계산합니다.'],
  ['업종별 부가가치율','소매·음식점 등 15%, 제조·농림어업·소화물 전문 운송 등 20%, 숙박업 25%, 건설·운수창고(소화물 제외)·정보통신 등 30%, 법정 금융보험 관련·전문과학기술·사업지원·부동산 관련 서비스 등 40%, 그 밖의 서비스업 30%입니다. 국세청의 세부 업종 구분을 확인합니다.'],
  ['매입 공제','간이과세자는 적격 증빙과 제출요건을 충족한 재화·용역 공급대가의 0.5% 등을 공제합니다. 공제금액 합계가 납부세액을 초과하는 부분은 없는 것으로 봅니다.'],
  ['납부의무 면제','해당 과세기간의 공급대가가 4,800만원 미만이면 법정 납부의무 면제를 적용합니다. 직전연도 매출 기준이 아니며, 신규·휴폐업·과세유형 전환 등은 연환산하고 제64조 가산 세액 등 예외를 구분합니다.'],
  ['예정신고','예정부과기간 중 법정 세금계산서를 발급한 간이과세자는 예정신고 대상입니다. 일반 과세유형 판정과 예정신고 의무를 동일한 매출 구간만으로 판단하지 않습니다.']
 ];
 Object.assign(item,{description:'일반과세와 간이과세의 판정 기준, 매출세액 계산 및 납부의무 면제를 구분합니다. 매출액·공급가액·공급대가·매출세액은 서로 다른 기준입니다.',criteria:rules.map(([label,text])=>criterion(label,text,vatLaw.id))});
 finish(item,vatLaw.id,vatLaw.receipt,{reviewed_articles:['30','61','63','66','69'].map(number=>({number,text:reviewedArticle(vatLaw,number)})),summary:item.criteria,official_guide:{source_id:vatGuide.id,receipt:publicReceipt(vatGuide.receipt),text:vatGuide.text}});
 item.sources.push(vatGuide.id);item.source_urls.push(vatGuide.receipt.url);
 put(old,item);reviewedTax.push(item.id);
}
report.domains.tax={reviewed_ids:reviewedTax,other_facts_reviewed:false};
for(const id of changed){const r=byId.get(id);if(r){const normalized=JSON.parse(JSON.stringify(r));Object.keys(r).forEach(k=>delete r[k]);Object.assign(r,normalized);r.record_checksum=sha256({...r,provenance:undefined,record_checksum:undefined});}}
for(const f of files){
 if(!f.rows.some(r=>changed.has(r.id)))continue;
 if(f.tail!==undefined){
  const item=f.rows[0];
  const tail=reviewedTax.includes(item.id)?`\n# ${item.title}\n\n${item.description}\n\n${item.criteria.map(c=>`- **${c.label}**: ${c.condition||c.basis||''}`).join('\n')}\n`:f.tail;
  writeText(f.file,`---\n${JSON.stringify(item,null,2)}\n---\n${tail}`);
 }else writeText(f.file,f.rows.map(JSON.stringify).join('\n')+'\n');
}
// New records reside in their own domain folders and use deterministic IDs.
for(const [domain,folder] of [['insurance-products','insurance'],['pension-products','retirement/pensions']]){
 const rows=added.filter(r=>r.publication_memberships.includes(`korea-${domain}-ontology-2026.json`));
 const target=path.join(KNOWLEDGE,'30-financial-products',folder,'current-disclosures.jsonl');
 if(rows.length){const previous=files.find(f=>f.file===target)?.rows||[];writeText(target,[...previous,...rows].map(JSON.stringify).join('\n')+'\n');}
}
writeJson(path.join(sourceDir,'integration-report.json'),report);
console.log(JSON.stringify(report.domains));
