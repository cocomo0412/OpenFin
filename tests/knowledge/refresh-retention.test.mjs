import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { sha256 } from '../../scripts/knowledge/common.mjs';
import { inspectRetainedInput, verifyRetention, adoptFailureEvidence, publishRetentions } from '../../scripts/knowledge/refresh-retention.mjs';
import { assertCurrentInputs } from '../../scripts/knowledge/refresh-all.mjs';

const date='2026-10-01T07:00:00Z',basis='2026-10-07';
function fixture(t) {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'openfin-retention-'));
  t.after(()=>fs.rmSync(root,{recursive:true,force:true}));
  fs.mkdirSync(path.join(root,'.api-candidates'));
  fs.mkdirSync(path.join(root,'docs/opentax'),{recursive:true});
  const write=(file,data)=>fs.writeFileSync(path.join(root,file),JSON.stringify(data));
  const source='source.fss.finlife.api';
  const domains=Object.fromEntries(['deposit','saving'].map(domain=>{
    const extracted={provider_code:'P',product_code:domain,options:[]};
    return [domain,{available_count:1,candidate_pool_count:1,selected_count:1,candidates:[{
      source_id:source,source_record_id:domain,collected_at:date,extracted,checksum:sha256(extracted),
    }]}];
  }));
  write('.api-candidates/finlife-catalog.json',{source_id:source,collected_at:date,domains});
  const items=[{'서비스ID':'GOV-1'}];
  write('.api-candidates/gov24-current.json',{source_id:'source.gov24.benefit-plus.local-supports',collected_at:date,count:1,items,checksum:sha256(items)});
  const record=stage=>({id:stage,status:'failed',exit_code:1,checked_at:'2026-10-07T05:00:00Z',retained_input:inspectRetainedInput(root,stage)});
  return {root,write,record};
}
test('retained bank and Gov24 require current failure and exact original byte hash/date',t=>{
  const {root,record}=fixture(t);
  for(const stage of ['bank','gov24']) {
    const evidence=record(stage);
    assert.equal(verifyRetention(root,stage,basis,evidence).collected_at,date);
    for(const change of [{status:'passed'},{exit_code:0},{checked_at:'2026-10-06T05:00:00Z'},{retained_input:null}])
      assert.throws(()=>verifyRetention(root,stage,basis,{...evidence,...change}));
    assert.throws(()=>verifyRetention(root,stage,basis,undefined));
    const file=path.join(root,'.api-candidates',evidence.retained_input.file);
    fs.appendFileSync(file,'\n');
    assert.throws(()=>verifyRetention(root,stage,basis,evidence),/changed/);
  }
});
test('partial, duplicate, wrong source and checksum-invalid old collections fail closed',t=>{
  const {root,write}=fixture(t);
  const file='.api-candidates/finlife-catalog.json';
  const original=JSON.parse(fs.readFileSync(path.join(root,file)));
  for(const modify of [d=>d.domains.deposit.available_count=2,d=>d.domains.deposit.candidates[0].checksum='bad',
    d=>d.source_id='wrong',d=>d.domains.saving.candidates[0].source_record_id='deposit',d=>d.collected_at='invalid']) {
    const data=structuredClone(original);modify(data);write(file,data);
    assert.throws(()=>inspectRetainedInput(root,'bank'));
  }
  const gov='.api-candidates/gov24-current.json';
  const data=JSON.parse(fs.readFileSync(path.join(root,gov)));
  data.items.push(data.items[0]);data.count=2;data.checksum=sha256(data.items);write(gov,data);
  assert.throws(()=>inspectRetainedInput(root,'gov24'),/identity/);
});
test('legacy failure adoption binds same-day pre-run baseline and failed stage to exact old data',t=>{
  const {root,write}=fixture(t),input=inspectRetainedInput(root,'bank');
  const report={basis_date:basis,mode:'refresh',status:'failed',started_at:'2026-10-07T05:00:00Z',stages:[
    {id:'public-api',status:'passed',exit_code:0,duration_ms:1000},{id:'bank',status:'failed',exit_code:1,duration_ms:15000},
  ]};
  const baseline={basis_date:basis,started_at:'2026-10-07T04:00:00Z',copied_snapshots:[{name:input.file,sha256:input.sha256,bytes:input.bytes}]};
  write('run.json',report);write('baseline.json',baseline);
  const adopt=()=>adoptFailureEvidence(root,basis,path.join(root,'run.json'),path.join(root,'baseline.json'));
  const records=adopt();assert.equal(records.length,1);assert.equal(records[0].retained_input.collected_at,date);
  assert.equal(records[0].checked_at,'2026-10-07T05:00:16.000Z');
  assert.equal(records[0].checked_at_basis,'prior-run-start-plus-stage-durations (approximate)');
  for(const change of [{basis_date:'2026-10-06'},{started_at:'2026-10-07T06:00:00Z'},{copied_snapshots:[]},
    {copied_snapshots:[{...baseline.copied_snapshots[0],sha256:'bad'}]}]) {
    write('baseline.json',{...baseline,...change});assert.throws(adopt);
  }
  write('baseline.json',baseline);write('run.json',{...report,status:'completed'});assert.throws(adopt);
});
test('public pending records collection-stage scope and retained date, without inventing per-request failures',t=>{
  const {root,write,record}=fixture(t);
  write('docs/opentax/collection-inventory.json',{pending:[{source_id:'source.other',status:'failed'}]});
  publishRetentions(root,basis,[{...record('bank'),checked_at_basis:'prior-run-start-plus-stage-durations (approximate)'},record('gov24')]);
  const output=JSON.parse(fs.readFileSync(path.join(root,'docs/opentax/collection-inventory.json')));
  assert.equal(output.pending.length,3);
  const bank=output.pending.find(p=>p.retained_collection_stage==='bank');
  assert.equal(bank.retained_collected_at,date);assert.match(bank.scope,/개별 API 요청별 실패 판정은 아님/);
  assert.equal(bank.endpoint,undefined);assert.equal(bank.group,undefined);
  assert.match(bank.checked_at_basis,/approximate/);
  assert.equal(output.pending.filter(p=>p.retained_collection_stage==='gov24').length,1);
  assert.throws(()=>publishRetentions(root,'2026-10-08',[record('bank')]));
});
test('preparation admits old bank data only with current failure proof bound to that original',t=>{
  const {root,write,record}=fixture(t),proof=record('bank');
  const gov=JSON.parse(fs.readFileSync(path.join(root,'.api-candidates/gov24-current.json')));
  gov.collected_at='2026-10-07T05:00:00Z';write('.api-candidates/gov24-current.json',gov);
  const extras={
    'public-api-refresh-plan.json':{jobs:[{source_id:'source.example',operation_index:0}]},
    'api-refresh-run.json':{results:[{source_id:'source.example',operation_index:0,status:'complete',checked_at:'2026-10-07T05:00:00Z'}]},
    'source.example-0.json':{collected_at:'2026-10-07T05:00:00Z'},
    'finlife-additional.json':{datasets:[],failures:[]},
  };
  const read=file=>extras[path.basename(file)]??JSON.parse(fs.readFileSync(file));
  assert.throws(()=>assertCurrentInputs(root,basis,read),/Collect finlife-catalog again/);
  assert.doesNotThrow(()=>assertCurrentInputs(root,basis,read,[proof]));
  assert.throws(()=>assertCurrentInputs(root,basis,read,[{...proof,checked_at:'2026-10-06T05:00:00Z'}]),/failure evidence/);
  fs.appendFileSync(path.join(root,'.api-candidates/finlife-catalog.json'),'\n');
  assert.throws(()=>assertCurrentInputs(root,basis,read,[proof]),/changed/);
});
