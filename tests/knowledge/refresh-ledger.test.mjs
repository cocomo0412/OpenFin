import test from 'node:test';
import assert from 'node:assert/strict';
import { classify, buildRefreshLedger } from '../../scripts/knowledge/refresh-ledger.mjs';
import { ROOT, json } from '../../scripts/knowledge/common.mjs';
import path from 'node:path';

test('absence overrides older success; a pension item is not automatically an API failure', () => {
  assert.equal(classify({refresh_generation:'2026-09-23',source_listing_status:'not_found_in_latest_collection'},'2026-09-24'), 'historical_absent');
  assert.equal(classify({type:'pension-product',refresh_generation:'2026-09-23'},'2026-09-24'), 'previous_success');
  assert.equal(classify({type:'insurance-product'},'2026-09-24'), 'cause_unclassified');
  assert.equal(classify({type:'category'},'2026-09-24'), 'structural_reference');
  assert.equal(classify({refresh_generation:'2026-09-23T16:00:00Z'},'2026-09-24'), 'refreshed');
});

test('ledger exhaustively partitions unique items and keeps request failures separate', () => {
  const result=buildRefreshLedger();
  const report=json(path.join(ROOT,'reports/refresh/current.json'));
  assert.equal(Object.values(result.counts).reduce((a,b)=>a+b,0), result.total_items);
  assert.equal(report.retained_count, result.total_items-result.counts.refreshed);
  assert.equal(new Set(report.retained_items.map(r=>r.id)).size,report.retained_count);
  assert.ok(report.retained_items.every(r=>r.reason_code && r.evidence && r.next_action));
  assert.ok(report.dataset_failures.every(r=>r.affected_item_count===null));
  assert.equal(report.dataset_failure_count,json(path.join(ROOT,'docs/opentax/collection-inventory.json')).pending.length);
});
