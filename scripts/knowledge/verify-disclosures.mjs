import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {KNOWLEDGE,ROOT,sha256} from './common.mjs';
import {publicReceipt} from './disclosure-receipts.mjs';
import {localTaxReviews} from './local-tax-reviews.mjs';
import {filingTaxReviews} from './filing-tax-reviews.mjs';
import {deadlineReviews} from './deadline-reviews.mjs';
import {corporateTaxReviews} from './corporate-tax-reviews.mjs';
import {personalTaxReviews} from './personal-tax-reviews.mjs';
import {remainingTaxReviews} from './remaining-tax-reviews.mjs';
import {matchingPolicy} from './policy-matching.mjs';
let count=0;
const expectedTax=new Set([...localTaxReviews,...filingTaxReviews,...deadlineReviews,...corporateTaxReviews,...personalTaxReviews,...remainingTaxReviews].map(r=>r[0]));
function check(row){
 if(!row.current_disclosure)return;
 const file=path.resolve(ROOT,'docs',row.current_disclosure.path);
 assert.ok(file.startsWith(path.resolve(ROOT,'docs','opentax','disclosures')+path.sep));
 const payload=JSON.parse(fs.readFileSync(file,'utf8'));
 assert.equal(payload.id,row.id);
 assert.equal(sha256(payload),row.current_disclosure.checksum,`disclosure checksum: ${row.id}`);
 assert.equal(sha256({...row,provenance:undefined,record_checksum:undefined}),row.record_checksum,`record checksum: ${row.id}`);
 assert.equal(payload.receipt.collected_at,row.source_collected_at);
 assert.deepEqual(publicReceipt(payload.receipt),payload.receipt,'Public receipt contains session data');
 if(expectedTax.has(row.id)){
  assert.ok(payload.reviewed_articles.length,`Missing law evidence: ${row.id}`);
  for(const article of payload.reviewed_articles){
   assert.ok(article.text.length>30,`Empty law article: ${row.id}`);
   assert.ok(article.text.startsWith(`제${article.number.replace('의','조의')}`));
  }
  assert.deepEqual(payload.summary,row.criteria,`Summary differs from canonical rules: ${row.id}`);
  for(const extra of payload.supplemental_laws||[]){
   assert.ok(row.sources.includes(extra.source_id),`Supplemental source missing: ${row.id}`);
   assert.deepEqual(publicReceipt(extra.receipt),extra.receipt);
   assert.ok(extra.reviewed_articles.every(a=>a.text.length>30));
  }
  expectedTax.delete(row.id);
 }
 assert.equal(row.recommendation_status,'reference_only');
 assert.equal(row.comparison_engine_gate_passed,false);
 assert.equal(row.domain_gate_passed,false);
 if(payload.receipt.product_code){
  assert.equal(row.product_code,payload.receipt.product_code);
  assert.equal(new URL(payload.receipt.url).searchParams.get('cdPrdCd'),row.product_code);
 }
 for(const document of payload.policy_documents||[]){
  assert.equal(document.document_type,'policy-terms');
  assert.ok(matchingPolicy(payload,document),'Policy product/version mismatch');
  assert.match(document.receipt.sha256,/^[a-f0-9]{64}$/);
  assert.ok(document.page_count>0&&document.text_characters>=1000);
  assert.ok(document.effective_from<=document.receipt.collected_at.slice(0,10));
  assert.match(document.scope,/clause review pending/);
 }
 if(row.product_kind==='pension-savings'){
  assert.match(row.provider_basis,/^\d{4}-Q[1-4]$/);
  assert.ok(row.raw.observations.length);
 }
 count++;
}
function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){
 const file=path.join(dir,e.name);if(e.isDirectory())walk(file);
 else if(e.name.endsWith('.jsonl'))fs.readFileSync(file,'utf8').split(/\r?\n/).filter(Boolean).map(JSON.parse).forEach(check);
 else if(e.name.endsWith('.md')){const text=fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n'),end=text.indexOf('\n---\n',4);if(text.startsWith('---\n')&&end>=0)check(JSON.parse(text.slice(4,end)));}
}}
walk(KNOWLEDGE);
assert.equal(expectedTax.size,0,`Unintegrated law reviews: ${[...expectedTax]}`);
assert.ok(count>0,'No refreshed disclosures found');
console.log(JSON.stringify({ok:true,verified_disclosures:count}));
