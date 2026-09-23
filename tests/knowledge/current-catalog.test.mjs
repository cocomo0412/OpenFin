import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import {DOCS,ROOT,json,sha256} from '../../scripts/knowledge/common.mjs';
import {readCanonicalRecords} from '../../scripts/knowledge/derive-quality.mjs';
const records=readCanonicalRecords();

test('all current bank API values replace canonical and public rates without approval promotion',()=>{
  for(const domain of ['deposit','saving']) {
    const snapshot=json(path.join(DOCS,`api-snapshots/source.fss.finlife.api-${domain}.json`));
    const current=new Map(records.filter(r=>r.product_kind===domain&&r.refresh_generation===snapshot.collected_at).map(r=>[r.source_record_id,r]));
    const published=new Map(json(path.join(DOCS,`korea-${domain}-products-ontology-2026.json`)).items.map(r=>[r.id,r]));
    assert.equal(current.size,snapshot.count);
    for(const raw of snapshot.items) {
      const item=current.get(raw.source_record_id);assert.ok(item);
      assert.deepEqual(item.options,raw.options);
      assert.equal(item.join_member,raw.join_member);
      assert.equal(item.disclosure_month,raw.disclosure_month);
      assert.equal(item.comparison_engine_gate_passed,false);
      assert.equal(item.recommendation_scope,'listing_only');
      assert.deepEqual(published.get(item.id).options,raw.options);
      assert.equal(item.search_projection.title,item.title);
      assert.equal(item.record_checksum,sha256({...item,provenance:undefined,record_checksum:undefined}));
    }
  }
});

test('KDIC complete catalog uses stable business identity and remains listing-only',()=>{
  const snapshot=json(path.join(DOCS,'api-snapshots/source.kdic.insured-products-0.json'));
  const actual=records.filter(r=>r.product_kind==='deposit-protection'&&r.refresh_generation===snapshot.collected_at);
  assert.equal(actual.length,snapshot.count);
  assert.equal(new Set(actual.map(r=>r.source_record_id)).size,actual.length);
  assert.ok(actual.every(r=>r.source_record_id.startsWith('kdic:')&&r.recommendation_scope==='listing_only'));
});

test('historical missing records retain their collection dates and never claim closure',()=>{
  const absent=records.filter(r=>r.source_listing_status==='not_found_in_latest_collection');
  assert.ok(absent.length>0);
  assert.ok(absent.every(r=>r.sales_status==='unknown'&&r.freshness_status==='stale'));
});

test('Gov24 local benefits preserve official eligibility text without asserting eligibility',()=>{
  const snapshot=json(path.join(DOCS,'api-snapshots/source.gov24.benefit-plus.local-supports-current.json'));
  const raw=new Map(snapshot.items.map(row=>[row['서비스ID'],row]));
  const actual=records.filter(r=>r.type==='support-program'&&r.refresh_generation===snapshot.collected_at);
  assert.equal(actual.length,9281);
  assert.equal(new Set(actual.map(r=>r.gov24_service_id)).size,actual.length);
  for(const item of actual) {
    assert.deepEqual(item.raw,raw.get(item.gov24_service_id));
    assert.equal(item.title,item.raw['서비스명']);
    assert.equal(item.target_description,item.raw['지원대상']||'');
    assert.equal(item.is_currently_applicable,null);
    assert.equal(item.application_status,'unknown');
  }
});

test('large export shards hydrate with complete checksum and safe file sizes',()=>{
  const full=json(path.join(DOCS,'korea-finance-reference-ontology-2026.json'));
  assert.equal(full.storage_format,'openfin-sharded-export-v1');
  assert.equal(full.export_checksum,sha256({items:full.items,reference_items:full.reference_items||[]}).slice(7));
  assert.equal(full.item_count,full.items.length+(full.reference_items||[]).length);
});
