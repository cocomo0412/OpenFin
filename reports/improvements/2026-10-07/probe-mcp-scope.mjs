// Read-only production scope probe. No deployment, collection, or configuration changes.
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
const require = createRequire(new URL('../../../mcp/package.json', import.meta.url));
const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StreamableHTTPClientTransport } = require('@modelcontextprotocol/sdk/client/streamableHttp.js');
const endpoint = 'https://openfin.cocomo0412.workers.dev/mcp';
const client = new Client({ name: 'openfin-user-requested-scope-check', version: '1.0.0' });
const report = { checked_at: new Date().toISOString(), endpoint, searches: [], fetches: [] };
const call = async (name, args) => {
  const response = await client.callTool({ name, arguments: args }, undefined, { timeout: 30000 });
  const text = response.content?.filter(x => x.type === 'text').map(x => x.text).join('\n');
  return { isError: response.isError === true, data: JSON.parse(text) };
};
try {
  await client.connect(new StreamableHTTPClientTransport(new URL(endpoint)), { timeout: 30000 });
  report.server = client.getServerVersion();
  report.tools = (await client.listTools()).tools;
  report.exports = await call('exports', {});
  for (const query of ['월세', '예금', '적금', '대출']) {
    const result = await call('search', { query, limit: 3 });
    report.searches.push({ query, ...result });
  }
  report.fetches.push({ kind: 'tax-control', id: 'credit.monthly-rent', result: await call('fetch', { id: 'credit.monthly-rent' }) });
  for (const kind of ['deposit', 'saving', 'loan']) {
    const url = `https://cocomo0412.github.io/OpenFin/opentax/korea-${kind}-products-ontology-2026.json`;
    const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw new Error(`Public website ${kind}: HTTP ${response.status}`);
    const data = await response.json();
    const sample = data.items.find(x => x.type === 'bank-product');
    if (!sample) throw new Error(`No public product sample: ${kind}`);
    report.fetches.push({ kind, website_url: url, website_version: data.version, id: sample.id, title: sample.title, result: await call('fetch', { id: sample.id }) });
  }
} finally {
  await client.close();
  writeFileSync(new URL('./mcp-live-scope.json', import.meta.url), JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify({ checked_at: report.checked_at, server: report.server, tools: report.tools.map(t => t.name), metadata: { domain: report.exports.data.domain, item_count: report.exports.data.item_count }, searches: report.searches.map(x => ({ query: x.query, isError: x.isError, total: x.data.total_matches, domain: x.data.domain, results: x.data.results.map(r => ({ id: r.id, title: r.title })) })), fetches: report.fetches.map(x => ({ kind: x.kind, id: x.id, title: x.title, isError: x.result.isError, error: x.result.data.error, message: x.result.data.message, returned: x.result.data.item?.title })) }, null, 2));
