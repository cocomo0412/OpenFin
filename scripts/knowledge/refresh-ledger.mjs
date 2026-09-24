import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT, DOCS, json, writeJson, writeText } from './common.mjs';

const STRUCTURAL = new Set(['source', 'category', 'term', 'concept', 'domain']);
export const REASONS = {
  refreshed: ['금일 반영', '추가 작업 없음'],
  historical_absent: ['최신 전체 목록에서 미확인', '다음 전체 수집에서 동일 식별자를 재대조합니다. 판매 종료로 단정하지 않습니다.'],
  structural_reference: ['구조·출처·용어 정보 유지', 'API 매일 갱신 대상에서 분리합니다. 정의나 출처가 변경될 때 검토합니다.'],
  previous_success: ['이전 성공 자료 유지', '기존 성공 이력을 재사용하고 다음 수집 경로를 확인합니다. 오늘 미수집한 원인을 오류로 추정하지 않습니다.'],
  cause_unclassified: ['미갱신 원인 추가 분류 필요', 'API 제공 범위·식별자 매핑·수집기 구현 여부를 확인한 뒤 원인을 확정합니다.'],
};

function day(value) {
  if (!value) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const time = Date.parse(value);
  return Number.isNaN(time) ? null : new Date(time + 9 * 3600000).toISOString().slice(0, 10);
}

export function classify(item, basisDate) {
  const refreshedDay = day(item.refresh_generation);
  // Absence is an actual check result, even when an older successful refresh exists.
  if (item.source_listing_status === 'not_found_in_latest_collection') return 'historical_absent';
  if (refreshedDay === basisDate) return 'refreshed';
  if (STRUCTURAL.has(item.type)) return 'structural_reference';
  if (refreshedDay) return 'previous_success';
  return 'cause_unclassified';
}

export function buildRefreshLedger() {
  const manifest = json(path.join(DOCS, 'finance-ontology-manifest.json'));
  const inventory = json(path.join(DOCS, 'collection-inventory.json'));
  const basisDate = inventory.snapshot_basis_date;
  const records = new Map();
  for (const entry of manifest.exports) {
    for (const item of json(path.join(ROOT, 'docs', entry.path)).items || []) {
      const existing = records.get(item.id);
      if (existing) existing.domains.push(entry.domain);
      else records.set(item.id, { item, domains: [entry.domain] });
    }
  }
  const counts = Object.fromEntries(Object.keys(REASONS).map(key => [key, 0]));
  const retained = [];
  for (const {item, domains} of [...records.values()].sort((a,b) => a.item.id.localeCompare(b.item.id, 'en'))) {
    const reason = classify(item, basisDate);
    counts[reason]++;
    if (reason === 'refreshed') continue;
    retained.push({
      id: item.id, title: item.title, type: item.type, domains: [...new Set(domains)],
      reason_code: reason, reason: REASONS[reason][0], next_action: REASONS[reason][1],
      last_successful_refresh: item.refresh_generation || null,
      last_checked_at: item.last_source_checked_at || null,
      last_reviewed_at: item.last_reviewed_at || item.reviewed_at || null,
      source_listing_status: item.source_listing_status || null,
      source_ids: item.sources || [],
      evidence: reason === 'historical_absent' ? item.status_reason || 'source_listing_status=not_found_in_latest_collection'
        : reason === 'previous_success' ? `refresh_generation=${item.refresh_generation}`
        : reason === 'structural_reference' ? `type=${item.type}` : '금일 반영 또는 미갱신 원인을 확정할 기록이 부족합니다.',
    });
  }
  // Request failures and item counts are different units. Do not assign a failed
  // pension request to thousands of records without provider/product ID evidence.
  const failures = (inventory.pending || []).map(f => ({
    source_id: f.source_id, endpoint: f.endpoint, group: f.group,
    checked_at: f.checked_at, reason_code: 'provider_response_rejected',
    error: f.error, reason: f.reason,
    affected_item_ids: null, affected_item_count: null,
    attribution: '요청 단위 오류입니다. 개별 항목과의 대응 관계는 미확정입니다.',
    next_action: '해당 endpoint·group만 먼저 재시도하고 스키마·총건수·페이지 완전성 통과 후 반영합니다. 승인 재신청은 인증 오류가 확인될 때만 검토합니다.',
  }));
  const report = { version: 1, basis_date: basisDate, evidence_checked_at: inventory.validated_at,
    counting_scope: '공개 export의 items를 ID로 중복 제거. reference_items 별도 목록은 제외.',
    total_items: records.size, counts, retained_count: retained.length,
    dataset_failure_count: failures.length, dataset_failures: failures, retained_items: retained };
  const out = path.join(ROOT, 'reports', 'refresh');
  writeJson(path.join(out, 'current.json'), report);
  const lines = ['# 갱신 보류·유지 항목 관리', '', `기준일: ${basisDate}`, '',
    '이 보고서는 내부 작업용이며 홈페이지에 표시하지 않습니다. 빌드할 때 자동 재생성합니다.', '',
    '| 구분 | 항목 수 | 다음 조치 |', '|---|---:|---|',
    ...Object.entries(counts).map(([code,count]) => `| ${REASONS[code][0]} | ${count.toLocaleString('en-US')} | ${REASONS[code][1]} |`), '',
    `전체 ${records.size.toLocaleString('en-US')}개 중 금일 미반영 ${retained.length.toLocaleString('en-US')}개입니다.`, '',
    `## 요청 단위 오류: ${failures.length}건`, '',
    '위 항목 수에 더하지 않습니다. 오류 5건을 미갱신 자료 5개로 해석하거나, 연금 전체에 오류를 일괄 귀속하지 않습니다.', '',
    ...failures.map(f => `- ${f.source_id} / ${f.endpoint} / ${f.group}: ${f.error}`), '',
    '## 다음 작업 순서', '',
    '1. 요청 단위 오류만 먼저 재시도합니다. 이미 정상 수집한 API의 승인 절차를 반복하지 않습니다.',
    '2. 최신 목록 미확인 항목은 다음 전체 수집 때 ID로 재대조합니다.',
    '3. 이전 성공 자료는 해당 자료의 마지막 성공일을 확인하고 재수집합니다.',
    '4. 원인 미분류 항목만 제공 범위·수집기·매핑을 조사합니다. 추정으로 오류/미구현 판정을 내리지 않습니다.',
    '5. 구조·출처·용어는 정의 변경 시 검토하며, 매일 상품 수집 실패 건수에 포함하지 않습니다.', '',
    '항목별 ID·분야·사유·근거·마지막 성공일·다음 조치는 [current.json](current.json)에 보관합니다.', ''];
  writeText(path.join(out, 'README.md'), lines.join('\n'));
  return { basis_date: basisDate, total_items: records.size, counts, dataset_failure_count: failures.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(buildRefreshLedger(), null, 2));
}
