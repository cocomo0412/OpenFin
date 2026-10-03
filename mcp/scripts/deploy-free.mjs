import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

// Upload the Wrangler-built module to the existing Worker. Unlike `wrangler
// deploy`, this does not query or modify account-wide workers.dev settings.
export async function deployFree({ bundle, accountId, token, request = fetch }) {
  assert.match(accountId ?? '', /^[a-f0-9]{32}$/, 'Invalid Cloudflare account ID');
  assert.ok(token, 'CLOUDFLARE_API_TOKEN is required');
  const firstLine = bundle.subarray(0, bundle.indexOf('\r\n')).toString();
  assert.match(firstLine, /^--[-a-zA-Z0-9]+$/, 'Invalid Wrangler multipart bundle');
  const contentType = `multipart/form-data; boundary=${firstLine.slice(2)}`;
  const form = await new Response(bundle, { headers: { 'Content-Type': contentType } }).formData();
  const part = form.get('metadata');
  assert.ok(part, 'Missing Worker metadata');
  const metadata = JSON.parse(typeof part === 'string' ? part : await part.text());
  assert.ok(metadata.main_module && form.has(metadata.main_module), 'Missing entry module');
  assert.equal(metadata.compatibility_date, '2026-09-16');
  assert.ok(!metadata.bindings?.length, 'Free MCP must not introduce bindings');

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/workers/scripts/openfin`;
  async function api(suffix, init = {}) {
    const response = await request(endpoint + suffix, {
      ...init,
      headers: { ...init.headers, Authorization: `Bearer ${token}` },
      redirect: 'error',
      signal: AbortSignal.timeout(120_000),
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) {
      // Do not print arbitrary response bodies or credentials into CI logs.
      const codes = (payload.errors ?? []).map(error => error.code).join(',');
      throw new Error(`Cloudflare ${init.method ?? 'GET'} ${suffix || '/script'} failed: HTTP ${response.status}, codes ${codes}`);
    }
    return payload.result;
  }
  const before = await api('/subdomain');
  assert.equal(before.enabled, true, 'Existing production workers.dev route must be enabled');
  const uploaded = await api('', { method: 'PUT', headers: { 'Content-Type': contentType }, body: bundle });
  assert.ok(uploaded.id, 'Cloudflare did not return an uploaded script ID');
  const after = await api('/subdomain');
  assert.equal(after.enabled, before.enabled, 'Production route changed unexpectedly');
  assert.equal(after.previews_enabled, before.previews_enabled, 'Preview route changed unexpectedly');
  return { status: 'uploaded', worker: uploaded.id };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    assert.ok(process.argv[2], 'Pass the Wrangler --outfile bundle path');
    console.log(JSON.stringify(await deployFree({
      bundle: await readFile(process.argv[2]),
      accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
      token: process.env.CLOUDFLARE_API_TOKEN,
    })));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
