import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import fs from 'node:fs';
import { DOCS, ROOT, json } from '../../scripts/knowledge/common.mjs';
import { readCanonicalRecords } from '../../scripts/knowledge/derive-quality.mjs';
import { retentionStages, inspectRetainedInput, koreaDate } from '../../scripts/knowledge/refresh-retention.mjs';

test('published API snapshots have complete counts and retain source dates', () => {
  const inventory = json(path.join(DOCS, 'collection-inventory.json'));
  for (const entry of inventory.datasets) {
    const snapshot = json(path.join(ROOT, 'docs', entry.path));
    assert.equal(snapshot.items.length, entry.count);
    assert.equal(snapshot.source_id, entry.source_id);
    assert.equal(snapshot.collected_at, entry.collected_at);
    assert.equal(snapshot.recommendation_eligible, false);
  }
});

test('API review metadata preserves failure reporting and provider periods', () => {
  const inventory=json(path.join(DOCS,'collection-inventory.json'));
  const manifest=json(path.join(DOCS,'finance-ontology-manifest.json'));
  const report=json(path.join(DOCS,'canonical-refresh-report.json'));
  assert.equal(manifest.basis_date,inventory.snapshot_basis_date);
  assert.equal(manifest.source_review_date,inventory.validated_at.slice(0,10));
  assert.match(manifest.source_review_scope,/schema mapping/);
  const additional=inventory.pending.filter(row=>row.source_id==='source.fss.finlife.api'&&!row.retained_collection_stage);
  assert.equal(additional.length,report.unresolved.length);
  for(const unresolved of report.unresolved) {
    const matches=additional.filter(row=>row.endpoint===unresolved.endpoint&&row.group===unresolved.group&&row.status===(unresolved.status||'provider_response_rejected'));
    assert.equal(matches.length,1);
    const pending=matches[0];
    for(const [key,value] of Object.entries(unresolved)) assert.deepEqual(pending[key],value);
    assert.ok(Number.isFinite(Date.parse(pending.checked_at)));
  }
  const retained=inventory.pending.filter(row=>row.retained_collection_stage);
  assert.equal(new Set(retained.map(row=>row.retained_collection_stage)).size,retained.length);
  for(const pending of retained) {
    const config=retentionStages[pending.retained_collection_stage];
    assert.ok(config,'Only supported whole collection stages may be retained');
    assert.equal(pending.source_id,config.source);assert.equal(pending.scope,config.scope);
    assert.equal(pending.status,'collection_failed_existing_snapshot_retained');
    assert.equal(pending.endpoint,undefined);assert.equal(pending.group,undefined);assert.equal(pending.operation_index,undefined);
    assert.match(pending.retained_snapshot_sha256,/^[a-f0-9]{64}$/);
    assert.ok(koreaDate(pending.retained_collected_at)<=koreaDate(pending.checked_at));
    assert.equal(koreaDate(pending.checked_at),inventory.snapshot_basis_date);
    const datasets=inventory.datasets.filter(row=>row.source_id===config.source&&
      (pending.retained_collection_stage!=='bank'||['deposit','saving'].includes(row.operation)));
    assert.equal(datasets.length,pending.retained_collection_stage==='bank'?2:1);
    for(const dataset of datasets) assert.equal(dataset.collected_at,pending.retained_collected_at);
    // CI has only public files; a local refresh additionally checks exact bytes
    // against its private original. Fixture tests exercise rejection paths.
    if(fs.existsSync(path.join(ROOT,'.api-candidates',config.file))) {
      const input=inspectRetainedInput(ROOT,pending.retained_collection_stage);
      assert.equal(input.sha256,pending.retained_snapshot_sha256);
      assert.equal(input.collected_at,pending.retained_collected_at);
    }
  }
  const publicFailures=inventory.pending.filter(row=>row.source_id!=='source.fss.finlife.api'&&!row.retained_collection_stage);
  for(const pending of publicFailures) {
    assert.equal(pending.status,'collection_failed_existing_snapshot_retained');
    assert.ok(Number.isInteger(pending.operation_index)&&pending.operation_index>=0);
    assert.ok(typeof pending.error_type==='string'&&pending.error_type.length>0);
    assert.equal(koreaDate(pending.checked_at),inventory.snapshot_basis_date);
    const dataset=inventory.datasets.find(row=>row.path===`opentax/api-snapshots/${pending.source_id}-${pending.operation_index}.json`);
    assert.ok(dataset,'Failed API must retain its last valid published snapshot');
    assert.ok(koreaDate(dataset.collected_at)<=koreaDate(pending.checked_at));
  }
  assert.equal(inventory.pending.length,additional.length+retained.length+publicFailures.length);
  const dated=inventory.datasets.filter(row=>row.basis_end);
  assert.ok(dated.some(row=>row.basis_end.replaceAll('-','')<inventory.snapshot_basis_date.replaceAll('-','')));
});

test('current product links match provider and product identities without enabling recommendation', () => {
  const links = json(path.join(DOCS, 'api-record-links.json'));
  const records = new Map(readCanonicalRecords().map(item => [item.id, item]));
  assert.equal(Object.keys(links.records).length, links.count);
  assert.ok(links.count > 0);
  for (const [id, link] of Object.entries(links.records)) {
    const original = records.get(id);
    assert.equal(original.source_record_id, link.source_record_id);
    assert.equal(original.provider_code, link.extracted.provider_code);
    assert.equal(original.product_code, link.extracted.product_code);
    assert.equal(link.comparison_approved, false);
  }
});
