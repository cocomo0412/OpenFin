import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const script = readFileSync(new URL('../../docs/mcp-catalog-status.js', import.meta.url), 'utf8');
const metadata = { edition: 'free-tax-pilot', domain: 'tax', item_count: 399, basis_date: '2026-05-04' };

async function render(fetchImpl, present = true) {
  const target = { textContent: 'loading' };
  const calls = [];
  await vm.runInNewContext(script, {
    document: { querySelector: () => present ? target : null }, AbortSignal,
    fetch: (...args) => { calls.push(args); return fetchImpl(...args); },
  });
  return { text: target.textContent, calls };
}

test('uses deployed MCP metadata independently of website dates and counts', async () => {
  const result = await render(async () => ({ ok: true, json: async () => metadata }));
  assert.equal(result.text, 'MCP 제공 항목: 399개 · MCP 자료 기준일: 2026-05-04');
  assert.equal(result.calls[0][0], 'https://openfin.cocomo0412.workers.dev/health');
  assert.equal(result.calls[0][1].credentials, 'omit');
  assert.equal(result.calls[0][1].cache, 'no-store');
  assert.ok(result.calls[0][1].signal instanceof AbortSignal);
  const updated = await render(async () => ({ ok: true, json: async () => ({ ...metadata, item_count: 401, basis_date: '2026-10-08' }) }));
  assert.match(updated.text, /401개.*2026-10-08/);
});

test('network, HTTP, JSON and incompatible metadata failures never substitute website values', async () => {
  for (const response of [
    () => { throw new Error('offline'); },
    () => { throw new DOMException('timeout', 'TimeoutError'); },
    () => ({ ok: false }),
    () => ({ ok: true, json: async () => { throw new Error('bad JSON'); } }),
    ...[{ ...metadata, domain: 'all' }, { ...metadata, item_count: -1 }, { ...metadata, item_count: '399' }, { ...metadata, basis_date: '<img>' }]
      .map(data => () => ({ ok: true, json: async () => data })),
  ]) {
    const result = await render(response);
    assert.match(result.text, /불러오지 못했습니다/);
    assert.doesNotMatch(result.text, /399|2026-10-07|75,743/);
  }
});

test('pages without MCP metadata display make no request', async () => {
  const result = await render(() => { throw new Error('unexpected request'); }, false);
  assert.equal(result.calls.length, 0);
});
