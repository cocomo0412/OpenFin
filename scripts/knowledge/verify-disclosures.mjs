import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {KNOWLEDGE,ROOT,sha256} from './common.mjs';
let count=0;
function check(row){
 if(!row.current_disclosure)return;
 const file=path.resolve(ROOT,'docs',row.current_disclosure.path);
 assert.ok(file.startsWith(path.resolve(ROOT,'docs','opentax','disclosures')+path.sep));
 const payload=JSON.parse(fs.readFileSync(file,'utf8'));
 assert.equal(payload.id,row.id);
 assert.equal(sha256(payload),row.current_disclosure.checksum,`disclosure checksum: ${row.id}`);
 assert.equal(sha256({...row,provenance:undefined,record_checksum:undefined}),row.record_checksum,`record checksum: ${row.id}`);
 assert.equal(payload.receipt.collected_at,row.source_collected_at);
 assert.equal(row.recommendation_status,'reference_only');
 assert.equal(row.comparison_engine_gate_passed,false);
 assert.equal(row.domain_gate_passed,false);
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
assert.ok(count>0,'No refreshed disclosures found');
console.log(JSON.stringify({ok:true,verified_disclosures:count}));
