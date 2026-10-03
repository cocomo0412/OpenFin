import assert from 'node:assert/strict';
import test from 'node:test';
import { deployFree } from '../scripts/deploy-free.mjs';

async function fixture() {
  const form = new FormData();
  form.set('metadata', JSON.stringify({ main_module: 'free.js', compatibility_date: '2026-09-16', bindings: [] }));
  form.set('free.js', new Blob(['export default {}'], { type: 'application/javascript+module' }), 'free.js');
  return Buffer.from(await new Response(form).arrayBuffer());
}
const accountId = 'a'.repeat(32);
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
  const base = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/openfin`;
  assert.deepEqual(calls, [[base + '/subdomain', 'GET'], [base, 'PUT'], [base + '/subdomain', 'GET']]);
  assert.equal(result.status, 'uploaded');
});
test('refuses to upload when the production route is disabled', async () => {
  let calls = 0;
  await assert.rejects(deployFree({ bundle: await fixture(), accountId, token: 'test-token', request: async () => {
    calls++;
    return Response.json({ success: true, result: { enabled: false } });
  }}), /must be enabled/);
  assert.equal(calls, 1);
});
test('fails on API errors without leaking response bodies', async () => {
  await assert.rejects(deployFree({ bundle: await fixture(), accountId, token: 'test-token', request: async () =>
    Response.json({ success: false, errors: [{ code: 10000, message: 'private-value' }] }, { status: 403 })
  }), error => error.message.includes('10000') && !error.message.includes('private-value'));
});
