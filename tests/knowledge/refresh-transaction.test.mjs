import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, execFileSync } from 'node:child_process';
import { once } from 'node:events';
import { createRefreshTransaction } from '../../scripts/knowledge/refresh-transaction.mjs';
import { writeText } from '../../scripts/knowledge/common.mjs';

const moduleUrl = new URL('../../scripts/knowledge/refresh-transaction.mjs', import.meta.url).href;
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'openfin-transaction-'));
  t.after(() => { assert.ok(root.startsWith(os.tmpdir() + path.sep)); fs.rmSync(root, { recursive: true, force: true }); });
  fs.mkdirSync(path.join(root, 'output')); fs.mkdirSync(path.join(root, '.api-candidates'));
  fs.writeFileSync(path.join(root, 'output/old.json'), '{"collected_at":"2026-09-01"}');
  fs.writeFileSync(path.join(root, '.api-candidates/source.test-0.json'), '{"collected_at":"2026-09-01"}');
  return root;
}
const transaction = root => createRefreshTransaction(root, { outputs: ['output'] });

test('validated success keeps new generation, removes journal and prevents concurrent writers', t => {
  const root = fixture(t), tx = transaction(root); tx.begin();
  assert.throws(() => transaction(root).begin(), /running/);
  writeText(path.join(root, 'output/old.json'), 'validated'); tx.commit();
  assert.equal(fs.readFileSync(path.join(root, 'output/old.json'), 'utf8'), 'validated');
  assert.equal(fs.existsSync(path.join(root, '.api-candidates/refresh-transaction')), false);
});

test('stage failure restores bytes/dates, deleted files and excludes new snapshots; logs survive', t => {
  const root = fixture(t), tx = transaction(root); tx.begin();
  fs.unlinkSync(path.join(root, 'output/old.json'));
  writeText(path.join(root, 'output/new.json'), 'partial');
  writeText(path.join(root, '.api-candidates/source.test-0.json'), 'partial');
  writeText(path.join(root, '.api-candidates/source.new-0.json'), 'new');
  writeText(path.join(root, '.api-candidates/pipeline-prepare.log'), 'failure');
  tx.rollback();
  for (const relative of ['output/old.json', '.api-candidates/source.test-0.json']) assert.equal(fs.readFileSync(path.join(root, relative), 'utf8'), '{"collected_at":"2026-09-01"}');
  assert.equal(fs.existsSync(path.join(root, 'output/new.json')), false);
  assert.equal(fs.existsSync(path.join(root, '.api-candidates/source.new-0.json')), false);
  assert.equal(fs.readFileSync(path.join(root, '.api-candidates/pipeline-prepare.log'), 'utf8'), 'failure');
});

test('next invocation recovers after an actually killed fixture process', async t => {
  const root = fixture(t);
  const code = `import fs from 'node:fs'; import path from 'node:path'; import {createRefreshTransaction} from ${JSON.stringify(moduleUrl)};
    const root=process.argv[1]; const tx=createRefreshTransaction(root,{outputs:['output']}); tx.begin();
    fs.writeFileSync(path.join(root,'output/old.json'),'interrupted'); console.log('ready'); setInterval(()=>{},1000);`;
  const child = spawn(process.execPath, ['--input-type=module', '-e', code, root], { stdio: ['ignore', 'pipe', 'pipe'] });
  const ready = once(child.stdout, 'data'); await ready;
  const exit = once(child, 'exit'); child.kill(); await exit;
  const next = transaction(root); next.begin();
  assert.equal(fs.readFileSync(path.join(root, 'output/old.json'), 'utf8'), '{"collected_at":"2026-09-01"}');
  next.rollback();
});

test('atomic write failure leaves previous destination intact and removes temporary files', t => {
  const root = fixture(t), target = path.join(root, 'output/old.json');
  const original = fs.renameSync;
  fs.renameSync = () => { throw new Error('synthetic replacement failure'); };
  try { assert.throws(() => writeText(target, 'invalid'), /synthetic/); }
  finally { fs.renameSync = original; }
  assert.equal(fs.readFileSync(target, 'utf8'), '{"collected_at":"2026-09-01"}');
  assert.deepEqual(fs.readdirSync(path.dirname(target)), ['old.json']);
});

test('commit cleanup failure does not roll back validated output', t => {
  const root = fixture(t), tx = transaction(root); tx.begin();
  writeText(path.join(root, 'output/old.json'), 'validated');
  const original = fs.rmSync;
  fs.rmSync = () => { throw new Error('synthetic cleanup failure'); };
  try { tx.commit(); } finally { fs.rmSync = original; }
  assert.equal(fs.readFileSync(path.join(root, 'output/old.json'), 'utf8'), 'validated');
  assert.throws(() => tx.rollback(), /committed/);
});

test('paths outside workspace fail closed before mutation', t => {
  const root = fixture(t);
  assert.throws(() => createRefreshTransaction(root, { outputs: ['../outside'] }).begin(), /Unsafe/);
  // No data can be mutated until all outputs have been safely snapshotted.
  assert.equal(fs.readFileSync(path.join(root, 'output/old.json'), 'utf8'), '{"collected_at":"2026-09-01"}');
});

test('malformed journal cannot discard recovery backups', t => {
  const root = fixture(t), tx = transaction(root); tx.begin();
  const journalPath = path.join(root, '.api-candidates/refresh-transaction/journal.json');
  const original = fs.readFileSync(journalPath, 'utf8');
  const journal = JSON.parse(original); journal.entries[0].path = '../outside';
  fs.writeFileSync(journalPath, JSON.stringify(journal));
  assert.throws(() => tx.rollback(), /Invalid refresh recovery/);
  assert.ok(fs.existsSync(path.join(root, '.api-candidates/refresh-transaction/backup/0')));
  fs.writeFileSync(journalPath, original); tx.rollback();
});

test('recovery claim prevents competing stale-lock cleanup without changing the lock', t => {
  const root = fixture(t), lock = path.join(root, '.api-candidates/refresh-transaction.lock');
  fs.writeFileSync(lock, JSON.stringify({pid: 2147483647}));
  fs.mkdirSync(path.join(root, '.api-candidates/refresh-recovery-claim'));
  assert.throws(() => transaction(root).begin(), /recovery claim/);
  assert.equal(JSON.parse(fs.readFileSync(lock, 'utf8')).pid, 2147483647);
  assert.equal(fs.readFileSync(path.join(root, 'output/old.json'), 'utf8'), '{"collected_at":"2026-09-01"}');
});

test('unregistered launch interruption retains backup and blocks automatic rollback', t => {
  const root = fixture(t), tx = transaction(root); tx.begin(); tx.launch();
  assert.throws(() => tx.rollback(), /unregistered child/);
  assert.ok(fs.existsSync(path.join(root, '.api-candidates/refresh-transaction/backup/0')));
  assert.equal(fs.readFileSync(path.join(root, 'output/old.json'), 'utf8'), '{"collected_at":"2026-09-01"}');
  tx.launch(false); tx.rollback();
});

test('rollback waits for orphan stage completion before restoring prior generation', async t => {
  const root = fixture(t), tx = transaction(root); tx.begin();
  const code = `import fs from 'node:fs'; import path from 'node:path';
    console.log('ready'); setTimeout(()=>{fs.writeFileSync(path.join(process.argv[1],'output/old.json'),'late-stage-write');},100);`;
  const stage = spawn(process.execPath, ['--input-type=module', '-e', code, root], { stdio: ['ignore', 'pipe', 'pipe'] });
  const exit = once(stage, 'exit'); await once(stage.stdout, 'data');
  const journalPath = path.join(root, '.api-candidates/refresh-transaction/journal.json');
  const journal = JSON.parse(fs.readFileSync(journalPath, 'utf8')); journal.stage_pids = [stage.pid];
  fs.writeFileSync(journalPath, JSON.stringify(journal));
  assert.throws(() => tx.rollback(), /children are running/);
  assert.ok(fs.existsSync(journalPath));
  await exit; tx.rollback();
  assert.equal(fs.readFileSync(path.join(root, 'output/old.json'), 'utf8'), '{"collected_at":"2026-09-01"}');
});

test('standalone entry rolls back failed validation and commits only a validated generation', t => {
  const root = fixture(t), scripts = path.join(root, 'scripts/knowledge'); fs.mkdirSync(scripts, { recursive: true });
  fs.mkdirSync(path.join(root, 'docs/opentax'), { recursive: true });
  fs.writeFileSync(path.join(root, 'docs/opentax/old.json'), 'old-generation');
  fs.copyFileSync(new URL('../../scripts/knowledge/refresh-transaction.mjs', import.meta.url), path.join(scripts, 'refresh-transaction.mjs'));
  fs.writeFileSync(path.join(scripts, 'entry.mjs'), `import fs from 'node:fs'; import {transactionalEntry} from './refresh-transaction.mjs';
    await transactionalEntry(import.meta.url,{validate:['scripts/knowledge/check.mjs']});
    fs.writeFileSync('docs/opentax/old.json','candidate-generation'); fs.writeFileSync('docs/opentax/new.json','new');`);
  fs.writeFileSync(path.join(scripts, 'check.mjs'), 'process.exit(1);');
  assert.throws(() => execFileSync(process.execPath, [path.join(scripts, 'entry.mjs')], { cwd: root, stdio: 'pipe' }));
  assert.equal(fs.readFileSync(path.join(root, 'docs/opentax/old.json'), 'utf8'), 'old-generation');
  assert.equal(fs.existsSync(path.join(root, 'docs/opentax/new.json')), false);
  fs.writeFileSync(path.join(scripts, 'check.mjs'), 'process.exit(0);');
  execFileSync(process.execPath, [path.join(scripts, 'entry.mjs')], { cwd: root, stdio: 'pipe' });
  assert.equal(fs.readFileSync(path.join(root, 'docs/opentax/old.json'), 'utf8'), 'candidate-generation');
  assert.equal(fs.existsSync(path.join(root, '.api-candidates/refresh-transaction')), false);
});
