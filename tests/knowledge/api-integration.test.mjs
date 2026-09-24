import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { DOCS, ROOT, json } from '../../scripts/knowledge/common.mjs';
import { readCanonicalRecords } from '../../scripts/knowledge/derive-quality.mjs';

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
  assert.equal(inventory.pending.length,report.unresolved.length);
  for(const pending of inventory.pending) assert.equal(pending.status,'provider_response_rejected');
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
