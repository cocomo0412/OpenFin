import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { stages, assertCurrentInputs } from '../../scripts/knowledge/refresh-all.mjs';

const fixture=()=>({
  'finlife-catalog.json':{collected_at:'2026-09-30T16:00:00Z'},
  'gov24-current.json':{collected_at:'2026-10-01T01:00:00Z'},
  'public-api-refresh-plan.json':{jobs:[{source_id:'source.example',operation_index:0}]},
  'api-refresh-run.json':{checked_at:'2026-10-01T01:00:00Z',results:[{source_id:'source.example',operation_index:0,status:'complete'}]},
  'source.example-0.json':{collected_at:'2026-10-01T01:00:00Z'},
  'finlife-additional.json':{collected_at:'2026-10-01T01:00:00Z',datasets:[{endpoint:'loan',group:'a',collected_at:'2026-10-01T01:00:00Z'}],failures:[]},
});
test('preparation uses Korea date and rejects success timestamps from older snapshots',()=>{
  const data=fixture(),read=p=>data[path.basename(p)];
  assert.doesNotThrow(()=>assertCurrentInputs('.', '2026-10-01',read));
  data['source.example-0.json'].collected_at='2026-09-24T01:00:00Z';
  assert.throws(()=>assertCurrentInputs('.', '2026-10-01',read),/stale snapshot/);
  data['api-refresh-run.json'].results[0].status='failed';
  assert.doesNotThrow(()=>assertCurrentInputs('.', '2026-10-01',read));
});
test('retry timestamp does not make older successful loan data current',()=>{
  const data=fixture(),read=p=>data[path.basename(p)];
  data['finlife-additional.json'].datasets[0].collected_at='2026-09-24T01:00:00Z';
  assert.throws(()=>assertCurrentInputs('.', '2026-10-01',read),/successful dataset is stale/);
});
test('failed-only mode does not recollect successful providers or publish data',()=>{
  assert.deepEqual(stages(true).map(s=>s.id),['public-api-retry','finlife-retry']);
  assert.ok(stages(true).every(s=>s.args.includes('--retry-failed')));
  const full=stages().map(s=>s.id);
  assert.ok(full.indexOf('validate')>full.indexOf('build'));
  assert.ok(full.indexOf('build')>full.indexOf('integrate'));
});
