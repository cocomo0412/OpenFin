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

test('rejects changed totals, overcounts and overlapping record identities', async () => {
  for (const total of [2, 5]) await assert.rejects(collectPages(async page => ({ items: [{ id: page }], total: page === 1 ? 4 : total })), /total changed/);
  await assert.rejects(collectPages(async () => ({ items: [1, 2], total: 1 })), /exceeded/);
  await assert.rejects(collectPages(async page => ({ items: page === 1 ? [{id: 'a'}, {id: 'b'}] : [{id: 'b'}, {id: 'c'}], total: 4 }), { identity: row => row.id }), /duplicate/);
  assert.deepEqual(await collectPages(async () => ({ items: [], total: 0 })), []);
});
