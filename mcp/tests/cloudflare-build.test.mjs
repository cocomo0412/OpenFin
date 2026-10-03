import test from 'node:test';
import assert from 'node:assert/strict';
import { selectBuild, waitForBuild } from '../scripts/wait-cloudflare-build.mjs';

const sha = 'a'.repeat(40);
const build = (id, status, conclusion, extra = {}) => ({ id, head_sha: sha,
  name: 'Workers Builds: openfin', app: { slug: 'cloudflare-workers-and-pages' },
  status, conclusion, details_url: 'https://example.com/build', ...extra });

test('only the latest Cloudflare build for the exact commit can satisfy deployment', () => {
  const checks = [build(1, 'completed', 'success'), build(2, 'in_progress', null),
    build(3, 'completed', 'success', { head_sha: 'b'.repeat(40) }),
    build(4, 'completed', 'success', { app: { slug: 'github-actions' } }),
    build(5, 'completed', 'success', { name: 'Workers Builds: another-worker' })];
  assert.equal(selectBuild(checks, sha).id, 2);
});

test('missing and pending checks wait until the matching deployment succeeds', async () => {
  let time = 0, reads = 0;
  const states = [[], [build(1, 'in_progress', null)], [build(1, 'completed', 'success')]];
  const result = await waitForBuild({ sha, readChecks: async () => states[reads++],
    now: () => time, sleep: async ms => { time += ms; }, intervalMs: 10, timeoutMs: 100, log: () => {} });
  assert.equal(result.conclusion, 'success');
  assert.equal(reads, 3);
});

test('failure, cancellation and skipped deployment never count as success', async () => {
  for (const conclusion of ['failure', 'cancelled', 'timed_out', 'skipped', 'neutral']) {
    await assert.rejects(waitForBuild({ sha, readChecks: async () => [build(1, 'completed', conclusion)], log: () => {} }), /Cloudflare build/);
  }
});

test('a missing build times out rather than reporting the old live Worker as deployed', async () => {
  let time = 0;
  await assert.rejects(waitForBuild({ sha, readChecks: async () => [], now: () => time,
    sleep: async ms => { time += ms; }, intervalMs: 10, timeoutMs: 25, log: () => {} }), /did not complete/);
  assert.equal(time, 25);
});
