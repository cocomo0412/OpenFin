import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { ROOT, PUBLIC_BASE } from '../../scripts/knowledge/common.mjs';
import { collectPages } from '../../scripts/knowledge/api-pagination.mjs';

test('ROOT resolves the actual repository including non-ASCII paths', () => {
  assert.ok(fs.existsSync(new URL('../../package.json', import.meta.url)));
  assert.ok(fs.existsSync(`${ROOT}/package.json`));
  assert.equal(PUBLIC_BASE, 'https://cocomo0412.github.io/OpenFin/opentax');
});
test('collects past page one and preserves more than twenty records', async () => {
  const rows = Array.from({length: 53}, (_, id) => ({id}));
  assert.deepEqual(await collectPages(async p => ({items: rows.slice((p-1)*20,p*20),total:53})),rows);
});
test('rejects repeated pages and premature termination', async () => {
  await assert.rejects(collectPages(async () => ({items:[1],total:3})),/repeated/);
  await assert.rejects(collectPages(async p => ({items:p===1?[1]:[],total:3})),/ended/);
  await assert.rejects(collectPages(async p => ({items:[p],total:3}),{maxPages:2}),/limit/);
});
