// Fresh official disclosures. Keep unverified historic facts out of new records.
import fs from 'node:fs';
import path from 'node:path';
import {ROOT,KNOWLEDGE,DOCS,json,sha256,writeJson,writeText} from './common.mjs';
import {normalizePensionGroup} from './disclosure-normalizers.mjs';
const sourceDir=path.join(ROOT,'.api-candidates/disclosures');
const cards=json(path.join(sourceDir,'cards.json'));
const insurance=json(path.join(sourceDir,'insurance.json'));
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
function base(old,id,title,type,parent,domain,shard){return {id:old?.id||id,title,type,description:'',parents:old?.parents||[parent],children:old?.children||[],related:old?.related||[],terms:old?.terms||[],tags:old?.tags||[],publication_memberships:old?.publication_memberships||[`korea-${domain}-ontology-2026.json`],search_shard:old?.search_shard||shard,status:'reference_only',sales_status:'unknown',recommendation_status:'reference_only',recommendation_scope:'listing_only',comparison_engine_gate_passed:false,domain_gate_passed:false};}
function finish(item,source,receipt,payload){
 const at=receipt.collected_at;
 Object.assign(item,{sources:[source],source_urls:[receipt.url],collected_at:at,source_collected_at:at,last_source_checked_at:at,last_reviewed_at:at,reviewed_at:at,refresh_generation:at,review_scope:'공식 공시의 식별자·본문·필드 연결 확인',source_listing_status:'listed',source_freshness_status:'current',freshness_status:'current',verification_status:'listing_only',sales_verification_status:'listed_unverified'});
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
 finish(item,source,row.receipt,{text:row.text});put(old,item);cardUpdated++;
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
 finish(item,source,row.receipt,{...row,receipt:undefined});put(old,item);old?insuranceUpdated++:insuranceAdded++;
}
report.domains.insurance={updated:insuranceUpdated,added:insuranceAdded,collected:insuranceUpdated+insuranceAdded};
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
report.domains.tax={reviewed_ids:[child.id,credit.id,housing.id],other_facts_reviewed:false};
for(const id of changed){const r=byId.get(id);if(r){const normalized=JSON.parse(JSON.stringify(r));Object.keys(r).forEach(k=>delete r[k]);Object.assign(r,normalized);r.record_checksum=sha256({...r,provenance:undefined,record_checksum:undefined});}}
for(const f of files){if(!f.rows.some(r=>changed.has(r.id)))continue;if(f.tail!==undefined)writeText(f.file,`---\n${JSON.stringify(f.rows[0],null,2)}\n---\n${f.tail}`);else writeText(f.file,f.rows.map(JSON.stringify).join('\n')+'\n');}
// New records reside in their own domain folders and use deterministic IDs.
for(const [domain,folder] of [['insurance-products','insurance'],['pension-products','retirement/pensions']]){
 const rows=added.filter(r=>r.publication_memberships.includes(`korea-${domain}-ontology-2026.json`));
 const target=path.join(KNOWLEDGE,'30-financial-products',folder,'current-disclosures.jsonl');
 if(rows.length){const previous=files.find(f=>f.file===target)?.rows||[];writeText(target,[...previous,...rows].map(JSON.stringify).join('\n')+'\n');}
}
writeJson(path.join(sourceDir,'integration-report.json'),report);
console.log(JSON.stringify(report.domains));
