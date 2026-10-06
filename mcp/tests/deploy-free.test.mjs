import assert from 'node:assert/strict';
import test from 'node:test';
import { deployFree } from '../scripts/deploy-free.mjs';

async function fixture(metadataOverrides = {}) {
  const form = new FormData();
  form.set('metadata', JSON.stringify({ main_module: 'free.js', compatibility_date: '2026-09-16', bindings: [], ...metadataOverrides }));
  form.set('free.js', new Blob(['export default {}'], { type: 'application/javascript+module' }), 'free.js');
  return Buffer.from(await new Response(form).arrayBuffer());
}
const accountId = 'a'.repeat(32);
const base = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/openfin`;
test('uploads only the named Worker and preserves production routing', async () => {
  const calls = [];
  const bundle = await fixture();
  const result = await deployFree({ bundle, accountId, token: 'test-token', request: async (url, init) => {
    calls.push([url, init.method ?? 'GET']);
    assert.equal(init.headers.Authorization, 'Bearer test-token');
    assert.equal(init.redirect, 'error');
    if (init.method === 'PUT') assert.equal(init.body, bundle);
    return Response.json({ success: true, result: init.method === 'PUT' ? { id: 'openfin' } : { enabled: true, previews_enabled: false } });
  }});
  assert.deepEqual(calls, [[base + '/subdomain', 'GET'], [base, 'PUT'], [base + '/subdomain', 'GET']]);
  assert.equal(result.status, 'uploaded');
});
test('refuses to upload when the production route is disabled', async () => {
  const calls = [];
  await assert.rejects(deployFree({ bundle: await fixture(), accountId, token: 'test-token', request: async (url, init) => {
    calls.push([url, init.method ?? 'GET']);
    return Response.json({ success: true, result: { enabled: false } });
  }}), /must be enabled/);
  assert.deepEqual(calls, [[base + '/subdomain', 'GET']]);
});
for (const { name, metadata, error } of [
  { name: 'missing entry module name', metadata: { main_module: undefined }, error: /Missing entry module/ },
  { name: 'entry module absent from bundle', metadata: { main_module: 'missing.js' }, error: /Missing entry module/ },
  { name: 'incompatible date', metadata: { compatibility_date: '2026-09-17' }, error: { code: 'ERR_ASSERTION', actual: '2026-09-17', expected: '2026-09-16' } },
  { name: 'additional bindings', metadata: { bindings: [{ type: 'plain_text', name: 'EXTRA', text: 'test' }] }, error: /Free MCP must not introduce bindings/ },
]) {
  test(`rejects ${name} before any API request`, async () => {
    const calls = [];
    await assert.rejects(deployFree({ bundle: await fixture(metadata), accountId, token: 'test-token', request: async (url, init) => {
      calls.push([url, init.method ?? 'GET']);
      return Response.json({ success: true, result: init.method === 'PUT' ? { id: 'openfin' } : { enabled: true, previews_enabled: false } });
    }}), error);
    assert.deepEqual(calls, []);
  });
}
for (const { name, after, error } of [
  { name: 'production route', after: { enabled: false, previews_enabled: false }, error: /Production route changed unexpectedly/ },
  { name: 'preview route', after: { enabled: true, previews_enabled: true }, error: /Preview route changed unexpectedly/ },
]) {
  test(`rejects changed ${name} after upload without another PUT`, async () => {
    const calls = [];
    const results = [{ enabled: true, previews_enabled: false }, { id: 'openfin' }, after];
    await assert.rejects(deployFree({ bundle: await fixture(), accountId, token: 'test-token', request: async (url, init) => {
      calls.push([url, init.method ?? 'GET']);
      return Response.json({ success: true, result: results[calls.length - 1] });
    }}), error);
    assert.deepEqual(calls, [[base + '/subdomain', 'GET'], [base, 'PUT'], [base + '/subdomain', 'GET']]);
  });
}
test('fails on API errors without leaking response bodies', async () => {
  await assert.rejects(deployFree({ bundle: await fixture(), accountId, token: 'test-token', request: async () =>
    Response.json({ success: false, errors: [{ code: 10000, message: 'private-value' }] }, { status: 403 })
  }), error => error.message.includes('10000') && !error.message.includes('private-value'));
});
