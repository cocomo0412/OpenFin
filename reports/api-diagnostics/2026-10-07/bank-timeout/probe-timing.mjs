import fs from 'node:fs';
import crypto from 'node:crypto';
const key = process.env.FINLIFE_API_KEY?.trim();
if (!key) throw new Error('Required credential is absent');
const results = [];
const savingsBankOnly = process.argv.includes('--savings-bank-only');
for (const [group, timeout_ms] of (savingsBankOnly ? [['030300', 45000]] : [['020000', 45000], ['030300', 15000]])) {
  const endpoint = 'savingProductsSearch.json';
  const url = new URL(`https://finlife.fss.or.kr/finlifeapi/${endpoint}`);
  url.search = new URLSearchParams({ auth: key, topFinGrpNo: group, pageNo: '1' });
  const result = { endpoint, group, page: 1, timeout_ms, started_at: new Date().toISOString(), phase: 'waiting_for_headers' };
  const started = performance.now();
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(timeout_ms) });
    result.headers_ms = Math.round(performance.now() - started);
    result.http_status = response.status;
    result.phase = 'reading_body';
    const bytes = Buffer.from(await response.arrayBuffer());
    result.bytes = bytes.length;
    result.sha256 = crypto.createHash('sha256').update(bytes).digest('hex');
    const payload = JSON.parse(bytes).result;
    result.phase = 'complete';
    result.provider_code = /^\d{3}$/.test(String(payload?.err_cd)) ? String(payload.err_cd) : null;
    result.total = Number(payload?.total_count);
    result.rows = payload?.baseList?.length ?? null;
    result.options = payload?.optionList?.length ?? null;
  } catch (error) { result.error_type = error.name; }
  result.duration_ms = Math.round(performance.now() - started);
  results.push(result);
  console.log(JSON.stringify(result));
}
fs.writeFileSync(new URL(savingsBankOnly ? 'timing-savings-bank.json' : 'timing-probes.json', import.meta.url), JSON.stringify({ checked_at: new Date().toISOString(), scope: 'Bounded first-page diagnostic requests only; no data publication or collection-date changes', results }, null, 2) + '\n');
