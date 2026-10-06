import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchSourceResponse } from '../../scripts/knowledge/source-http.mjs';

test('deadline covers stalled response headers and body', async () => {
  await assert.rejects(fetchSourceResponse('https://fixture.invalid', { method: 'GET' }, {
    timeoutMs: 20, maxBodyBytes: 100, fetchImpl: () => new Promise(() => {}),
  }), { name: 'AbortError' });
  let cancelled = false;
  await assert.rejects(fetchSourceResponse('https://fixture.invalid', { method: 'GET' }, {
    timeoutMs: 20, maxBodyBytes: 100, fetchImpl: async () => new Response(new ReadableStream({ cancel() { cancelled = true; } })),
  }), { name: 'AbortError' });
  assert.equal(cancelled, true);
});

test('drip-fed body cannot reset the overall deadline; byte limit remains bounded', async () => {
  let interval;
  await assert.rejects(fetchSourceResponse('https://fixture.invalid', { method: 'GET' }, {
    timeoutMs: 35, maxBodyBytes: 1000, fetchImpl: async () => new Response(new ReadableStream({
      start(controller) { interval = setInterval(() => controller.enqueue(new TextEncoder().encode('a')), 5); },
      cancel() { clearInterval(interval); },
    })),
  }), { name: 'AbortError' });
  const result = await fetchSourceResponse('https://fixture.invalid', { method: 'GET' }, {
    timeoutMs: 100, maxBodyBytes: 3, fetchImpl: async () => new Response('abcdef'),
  });
  assert.deepEqual(result.bodyResult, { body: 'abc', bytes: 3, truncated: true });
});

test('complete response preserves headers and content without marking truncation', async () => {
  const result = await fetchSourceResponse('https://fixture.invalid', { method: 'GET' }, {
    timeoutMs: 100, maxBodyBytes: 3, fetchImpl: async () => new Response('abc', { headers: { etag: 'fixture' } }),
  });
  assert.deepEqual(result.bodyResult, { body: 'abc', bytes: 3, truncated: false });
  assert.equal(result.headers.get('etag'), 'fixture');
});
