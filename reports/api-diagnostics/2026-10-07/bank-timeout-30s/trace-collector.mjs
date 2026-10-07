import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../../../..', import.meta.url));
const watched = ['.api-candidates/finlife-catalog.json', 'docs/opentax/collection-inventory.json', 'docs/opentax/finance-ontology-manifest.json'];
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const before = Object.fromEntries(watched.map(file => [file, hash(file)]));
const requests = [];
const originalFetch = globalThis.fetch;
const started_at = new Date().toISOString();
globalThis.fetch = async (input, options) => {
  const url = new URL(input);
  if (url.hostname !== 'finlife.fss.or.kr' || !/^\/finlifeapi\/(deposit|saving)ProductsSearch\.json$/.test(url.pathname)) throw new Error('Unexpected diagnostic request');
  const start = performance.now();
  const row = { endpoint: url.pathname.split('/').at(-1), group: url.searchParams.get('topFinGrpNo'), page: Number(url.searchParams.get('pageNo')), started_at: new Date().toISOString(), phase: 'waiting_for_headers' };
  requests.push(row);
  try {
    const response = await originalFetch(input, options);
    row.headers_ms = Math.round(performance.now() - start);
    row.http_status = response.status;
    row.phase = 'reading_body';
    const originalJson = response.json.bind(response);
    response.json = async () => {
      try {
        const payload = await originalJson();
        const result = payload.result;
        Object.assign(row, { phase: 'complete', duration_ms: Math.round(performance.now() - start),
          provider_code: /^\d{3}$/.test(String(result?.err_cd)) ? String(result.err_cd) : null,
          total: Number(result?.total_count), rows: result?.baseList?.length ?? null,
          options: result?.optionList?.length ?? null, max_page: Number(result?.max_page_no),
          payload_sha256: crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex') });
        console.log(JSON.stringify(row));
        return payload;
      } catch (error) {
        Object.assign(row, { duration_ms: Math.round(performance.now() - start), error_type: error.name });
        throw error;
      }
    };
    return response;
  } catch (error) {
    Object.assign(row, { duration_ms: Math.round(performance.now() - start), error_type: error.name });
    throw error;
  }
};
let status = 'passed', error_type = null;
try {
  const collector = path.join(root, 'scripts/knowledge/collect-finlife-candidates.mjs');
  process.argv = [process.execPath, collector, '--catalog-only'];
  await import(pathToFileURL(collector).href);
} catch (error) { status = 'failed'; error_type = error.name; }
finally {
  globalThis.fetch = originalFetch;
  const unchanged = watched.every(file => before[file] === hash(file));
  const result = { started_at, finished_at: new Date().toISOString(), mode: 'Exact collector without --write; updated 30-second timeout', status, error_type, requests, data_unchanged: unchanged, before_sha256: before };
  fs.writeFileSync(new URL('collector-trace.json', import.meta.url), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ status, requests: requests.length, error_type, data_unchanged: unchanged, last_request: requests.at(-1) }));
}
