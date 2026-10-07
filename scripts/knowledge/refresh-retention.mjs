import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { sha256, writeJson } from './common.mjs';

export const retentionStages = {
  bank: { file: 'finlife-catalog.json', source: 'source.fss.finlife.api', scope: '예금·적금 목록 수집 단계 전체; 개별 API 요청별 실패 판정은 아님' },
  gov24: { file: 'gov24-current.json', source: 'source.gov24.benefit-plus.local-supports', scope: '정부24 serviceList 전체 목록 수집 단계' },
};
export const koreaDate = value => {
  if (!value || !Number.isFinite(Date.parse(value))) throw new Error('Invalid collection timestamp');
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(new Date(value));
};
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
export function inspectRetainedInput(root, stage) {
  const config = retentionStages[stage];
  if (!config) throw new Error('Unsupported retained collection stage');
  const bytes = fs.readFileSync(path.join(root, '.api-candidates', config.file));
  const data = JSON.parse(bytes);
  koreaDate(data.collected_at);
  if (data.source_id !== config.source) throw new Error('Retained source mismatch');
  if (stage === 'bank') {
    if (!data.domains || Object.keys(data.domains).sort().join(',') !== 'deposit,saving') throw new Error('Invalid retained bank domains');
    const identities = new Set();
    for (const domain of ['deposit', 'saving']) {
      const state = data.domains[domain];
      if (!Array.isArray(state.candidates) || !state.candidates.length || state.available_count !== state.candidates.length
        || state.candidate_pool_count !== state.candidates.length || state.selected_count !== state.candidates.length) throw new Error('Incomplete retained bank collection');
      for (const row of state.candidates) {
        if (row.source_id !== config.source || row.collected_at !== data.collected_at || !row.source_record_id
          || identities.has(row.source_record_id) || !row.extracted?.provider_code || !row.extracted?.product_code
          || row.checksum !== sha256(row.extracted)) throw new Error('Invalid retained bank identity or checksum');
        identities.add(row.source_record_id);
      }
    }
  } else {
    if (!Array.isArray(data.items) || !data.items.length || data.count !== data.items.length || data.checksum !== sha256(data.items)) throw new Error('Invalid retained Gov24 collection');
    const ids = data.items.map(row => row['서비스ID']);
    if (ids.some(id => !id) || new Set(ids).size !== ids.length) throw new Error('Invalid retained Gov24 identity');
  }
  return { file: config.file, source_id: config.source, collected_at: data.collected_at, bytes: bytes.length, sha256: digest(bytes) };
}
export function verifyRetention(root, stage, basisDate, record) {
  if (!record || record.id !== stage || record.status !== 'failed' || !Number.isInteger(record.exit_code) || record.exit_code === 0
    || koreaDate(record.checked_at) !== basisDate || !record.retained_input) throw new Error(`Missing current failure evidence for ${stage}`);
  const actual = inspectRetainedInput(root, stage);
  if (koreaDate(actual.collected_at) > basisDate || JSON.stringify(actual) !== JSON.stringify(record.retained_input)) throw new Error(`Retained ${stage} snapshot changed or date invalid`);
  return actual;
}

// Adopt a pre-patch failed run only with a pre-run byte-hash baseline. Neither
// the collection date nor any old snapshot is rewritten by this operation.
export function adoptFailureEvidence(root, basisDate, reportFile, baselineFile) {
  const reportBytes = fs.readFileSync(reportFile), baselineBytes = fs.readFileSync(baselineFile);
  const report = JSON.parse(reportBytes), baseline = JSON.parse(baselineBytes);
  if (report.status !== 'failed' || report.mode !== 'refresh' || report.basis_date !== basisDate || baseline.basis_date !== basisDate
    || koreaDate(report.started_at) !== basisDate || koreaDate(baseline.started_at) !== basisDate
    || Date.parse(baseline.started_at) > Date.parse(report.started_at) || !Array.isArray(report.stages)
    || new Set(report.stages.map(stage=>stage.id)).size !== report.stages.length) throw new Error('Invalid prior failure evidence');
  const records = [];
  let elapsed = 0;
  for (const stage of report.stages) {
    if (!Number.isFinite(stage.duration_ms) || stage.duration_ms < 0) throw new Error('Invalid prior stage duration');
    elapsed += stage.duration_ms;
    if (!retentionStages[stage.id] || stage.status !== 'failed') continue;
    const actual = inspectRetainedInput(root, stage.id);
    const original = baseline.copied_snapshots?.filter(entry => entry.name === actual.file);
    if (original?.length !== 1 || original[0].sha256 !== actual.sha256 || original[0].bytes !== actual.bytes) throw new Error('Prior snapshot baseline mismatch');
    const record = { id: stage.id, status: 'failed', exit_code: stage.exit_code,
      checked_at: new Date(Date.parse(report.started_at) + elapsed).toISOString(), retained_input: actual,
      checked_at_basis: 'prior-run-start-plus-stage-durations (approximate)',
      evidence: { report_sha256: digest(reportBytes), baseline_sha256: digest(baselineBytes) } };
    verifyRetention(root, stage.id, basisDate, record); records.push(record);
  }
  if (!records.length) throw new Error('No supported failed stage in prior evidence');
  return records;
}

export function publishRetentions(root, basisDate, records) {
  const file = path.join(root, 'docs/opentax/collection-inventory.json');
  const inventory = JSON.parse(fs.readFileSync(file, 'utf8'));
  inventory.pending = (inventory.pending || []).filter(item => !item.retained_collection_stage);
  for (const record of records.filter(record => record.retained_input)) {
    const input = verifyRetention(root, record.id, basisDate, record), config = retentionStages[record.id];
    inventory.pending.push({ source_id: config.source, retained_collection_stage: record.id,
      scope: config.scope, status: 'collection_failed_existing_snapshot_retained', checked_at: record.checked_at,
      ...(record.checked_at_basis ? { checked_at_basis: record.checked_at_basis } : {}),
      retained_collected_at: input.collected_at, retained_snapshot_sha256: input.sha256,
      reason: '전체 목록 수집 단계가 완료되지 않아 이전 정상 자료와 원래 수집일을 유지했습니다. 개별 요청의 성공·실패를 확대 해석하지 않습니다.' });
  }
  writeJson(file, inventory);
}
