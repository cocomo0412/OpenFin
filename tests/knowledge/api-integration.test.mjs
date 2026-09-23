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
