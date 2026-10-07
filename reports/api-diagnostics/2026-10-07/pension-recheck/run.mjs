import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../../../../', import.meta.url));
const credential = process.env.FINLIFE_API_KEY?.trim();
if (!credential) throw new Error('Required API credential missing');
const target = new URL('result.json', import.meta.url);
assert.ok(!fs.existsSync(target), 'Preserve prior diagnostic evidence');
const watched = ['.api-candidates/finlife-additional.json', 'docs/opentax/collection-inventory.json', 'docs/opentax/finance-ontology-manifest.json'];
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const before = Object.fromEntries(watched.map(file => [file, hash(fs.readFileSync(path.join(root, file)))]));
const report = { started_at: new Date().toISOString(), timeout_ms: 30000, endpoint: 'annuitySavingProductsSearch.json', source: 'Financial Supervisory Service direct official API', scope: 'Diagnostic only; no data publication', results: [] };
for (const group of ['020000', '030200', '030300', '050000', '060000']) {
  const result = { group, requests: [], rows: 0, status: 'pending' };
  const ids = new Set(); let expected;
  for (let page = 1; page <= 30; page++) {
    const url = new URL(`https://finlife.fss.or.kr/finlifeapi/${report.endpoint}`);
    url.search = new URLSearchParams({ auth: credential, topFinGrpNo: group, pageNo: String(page) });
    let payload;
    for (let attempt = 1; attempt <= 2; attempt++) {
      const started = performance.now();
      const request = { page, attempt, checked_at: new Date().toISOString(), phase: 'headers' };
      result.requests.push(request);
      try {
        const response = await fetch(url, { signal: AbortSignal.timeout(report.timeout_ms) });
        request.http_status = response.status; request.phase = 'body';
        const bytes = Buffer.from(await response.arrayBuffer());
        request.bytes = bytes.length; request.sha256 = hash(bytes);
        const body = JSON.parse(bytes); payload = body.result;
        request.api_code = /^\d{3}$/.test(String(payload?.err_cd)) ? String(payload.err_cd) : null;
        request.phase = 'complete';
        if (!response.ok || request.api_code !== '000') result.status = 'provider_error';
      } catch (error) { request.error_type = error.name; }
      request.duration_ms = Math.round(performance.now() - started);
      if (!request.error_type || attempt === 2) break;
    }
    if (!payload || result.status === 'provider_error') { if (result.status === 'pending') result.status = 'request_failed'; break; }
    const request = result.requests.at(-1);
    const rows = payload.baseList;
    request.total_raw = typeof payload.total_count === 'number' || /^\d+$/.test(String(payload.total_count)) ? payload.total_count : null;
    request.base_rows = Array.isArray(rows) ? rows.length : null;
    request.option_rows = Array.isArray(payload.optionList) ? payload.optionList.length : null;
    request.max_page_no = payload.max_page_no;
    request.base_fields = Array.isArray(rows) ? [...new Set(rows.flatMap(row => Object.keys(row)))].sort() : [];
    request.option_fields = Array.isArray(payload.optionList) ? [...new Set(payload.optionList.flatMap(row => Object.keys(row)))].sort() : [];
    const total = Number(payload.total_count);
    if (!Array.isArray(rows) || !Number.isSafeInteger(total) || total < 0 || (expected !== undefined && total !== expected)) { result.status = 'invalid_pagination_metadata'; break; }
    expected ??= total;
    result.reported_total = expected;
    result.rows += rows.length;
    const violations = [];
    if (rows.some(row => !('pnsn_kind' in row))) violations.push('retirement_savings_field_pnsn_kind_missing');
    if (result.rows > total) violations.push('received_rows_exceed_reported_total');
    for (const row of rows) {
      const id = `${row.fin_co_no}:${row.fin_prdt_cd}`;
      if (!row.fin_co_no || !row.fin_prdt_cd || ids.has(id)) violations.push('missing_or_duplicate_identity');
      ids.add(id);
    }
    if (violations.length) { result.status = 'response_rejected'; result.violations = [...new Set(violations)]; break; }
    if (result.rows === expected) { result.status = expected === 0 ? 'valid_empty' : 'complete'; break; }
    if (rows.length === 0) { result.status = 'incomplete_pagination'; break; }
    if (page === 30) result.status = 'diagnostic_page_limit';
  }
  report.results.push(result);
  console.log(JSON.stringify({ group, status: result.status, requests: result.requests.length, http_status: result.requests.at(-1)?.http_status, api_code: result.requests.at(-1)?.api_code, total: result.reported_total, rows: result.rows, violations: result.violations }));
}
report.finished_at = new Date().toISOString();
report.data_unchanged = watched.every(file => before[file] === hash(fs.readFileSync(path.join(root, file))));
report.before_sha256 = before;
assert.ok(report.data_unchanged);
fs.writeFileSync(target, JSON.stringify(report, null, 2) + '\n');
