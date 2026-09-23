import fs from 'node:fs';
import path from 'node:path';
import { ROOT, DOCS, json, writeJson, sha256 } from './common.mjs';
import { readCanonicalRecords } from './derive-quality.mjs';

const inventory = json(path.join(DOCS, 'collection-inventory.json'));
const collection = json(path.join(ROOT, '.api-candidates/finlife-catalog.json'));
const rowsBySourceRecord = new Map();
inventory.datasets = inventory.datasets.filter(entry => entry.source_id !== 'source.fss.finlife.api');
for (const [domain, data] of Object.entries(collection.domains)) {
  if (data.candidates.length !== data.available_count || data.selected_count !== data.available_count) throw new Error('Incomplete Finlife catalog');
  const seen = new Set();
  for (const row of data.candidates) {
    if (sha256(row.extracted) !== row.checksum || seen.has(row.source_record_id)) throw new Error('Finlife checksum or duplicate record error');
    seen.add(row.source_record_id);
    rowsBySourceRecord.set(row.source_record_id, {domain, row});
  }
  const file = `source.fss.finlife.api-${domain}.json`;
  const title = `금융감독원 ${domain === 'deposit' ? '정기예금' : '적금'} 공시`;
  const payload = {source_id:collection.source_id, title, source_url:'https://finlife.fss.or.kr/', collected_at:collection.collected_at,
    verification:'collection_integrity_only', recommendation_eligible:false, count:data.candidates.length,
    items:data.candidates.map(row => ({...row.extracted, source_record_id:row.source_record_id}))};
  writeJson(path.join(DOCS, 'api-snapshots', file), payload);
  const months = data.candidates.map(row => row.extracted.disclosure_month).filter(Boolean).sort();
  inventory.datasets.push({source_id:collection.source_id, title, operation:domain, count:payload.count, collected_at:collection.collected_at,
    basis_start:months[0], basis_end:months.at(-1), status:'collected_integrity_checked', canonical_applied:false,
    reference_published:true, path:`opentax/api-snapshots/${file}`});
}
const links = {};
for (const item of readCanonicalRecords()) {
  if (item.type !== 'bank-product') continue;
  const match = rowsBySourceRecord.get(item.source_record_id);
  if (!match) continue;
  if (item.provider_code !== match.row.extracted.provider_code || item.product_code !== match.row.extracted.product_code) throw new Error('Product identity mismatch');
  links[item.id] = {source_id:collection.source_id, source_record_id:item.source_record_id,
    collected_at:collection.collected_at, domain:match.domain, extracted:match.row.extracted,
    verification_status:'listing_only', comparison_approved:false};
}
writeJson(path.join(DOCS, 'api-record-links.json'), {collected_at:collection.collected_at, match_rule:'exact source_record_id + provider_code + product_code', count:Object.keys(links).length, records:links});
inventory.product_link_count = Object.keys(links).length;
inventory.integration = 'Exact product identity links and source-level reference snapshots; legacy comparison assertions remain separate.';
writeJson(path.join(DOCS, 'collection-inventory.json'), inventory);
console.log(JSON.stringify({linked_products:Object.keys(links).length, finlife_records:rowsBySourceRecord.size, datasets:inventory.datasets.length}));
