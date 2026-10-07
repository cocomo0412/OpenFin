import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { createRefreshTransaction, runTrackedStage } from '../../../../scripts/knowledge/refresh-transaction.mjs';
import { inspectRetainedInput, koreaDate } from '../../../../scripts/knowledge/refresh-retention.mjs';

const root = fileURLToPath(new URL('../../../../', import.meta.url));
const evidence = fileURLToPath(new URL('./', import.meta.url));
const work = path.join(root, '.api-candidates');
const pipelineFile = path.join(work, 'refresh-pipeline-run.json');
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const write = (name, value) => fs.writeFileSync(path.join(evidence, name), JSON.stringify(value, null, 2) + '\n');
const snapshots = () => Object.fromEntries(fs.readdirSync(work).filter(name => /^(source\..+|finlife-catalog|finlife-additional|gov24-current|api-refresh-run)\.json$/.test(name)).map(name => [name, digest(fs.readFileSync(path.join(work, name)))]));
assert.equal(koreaDate(new Date().toISOString()), '2026-10-07', 'This dated follow-up must not be reused on another day');
assert.ok(!fs.existsSync(path.join(evidence, 'result.json')), 'Preserve existing evidence; use a new run folder');
const previousReport = fs.readFileSync(pipelineFile);
const baseline = snapshots();
write('before.json', { checked_at: new Date().toISOString(), snapshots: baseline, bank: inspectRetainedInput(root, 'bank') });
fs.writeFileSync(path.join(evidence, 'previous-pipeline.json'), previousReport);
fs.copyFileSync(path.join(root, 'docs/opentax/collection-inventory.json'), path.join(evidence, 'before-inventory.json'));
const result = { started_at: new Date().toISOString(), scope: 'Recollect bank deposit and saving only; rebuild using other verified same-day inputs', stages: [] };
const secrets = Object.entries(process.env).filter(([k,v]) => /KEY|TOKEN|SECRET|PASSWORD/.test(k) && v?.length > 7).flatMap(([,v]) => [v, encodeURIComponent(v)]);
const transaction = createRefreshTransaction(root);
const token = transaction.begin();
const env = { ...process.env, OPENFIN_REFRESH_TRANSACTION: token, PYTHONIOENCODING: 'utf-8' };
async function run(id, args) {
  console.log(`START ${id}`);
  const start = Date.now();
  const response = await runTrackedStage(process.execPath, args, { cwd: root, env, maxBuffer: 16 * 1024 * 1024 });
  let output = response.stdout + response.stderr;
  for (const secret of secrets) output = output.split(secret).join('[REDACTED]');
  fs.writeFileSync(path.join(evidence, `${id}.log`), output);
  const stage = { id, status: response.status === 0 ? 'passed' : 'failed', exit_code: response.status, duration_ms: Date.now() - start, checked_at: new Date().toISOString() };
  result.stages.push(stage);
  console.log(JSON.stringify(stage));
  assert.equal(response.status, 0, `${id} failed; see sanitized evidence`);
  return stage;
}
try {
  const bank = await run('bank', ['scripts/knowledge/collect-finlife-candidates.mjs', '--catalog-only', '--write']);
  result.bank_snapshot = inspectRetainedInput(root, 'bank');
  assert.equal(koreaDate(result.bank_snapshot.collected_at), '2026-10-07');
  // Archive the earlier failure intact; a successful new collection supersedes
  // its retention only after complete identity/count/checksum validation.
  const previous = JSON.parse(previousReport);
  previous.stages = [bank, ...previous.stages.filter(stage => stage.id !== 'bank')];
  fs.writeFileSync(pipelineFile, JSON.stringify(previous, null, 2) + '\n');
  await run('prepare-and-validate', ['scripts/knowledge/refresh-all.mjs', '--from', 'prepare']);
  const after = snapshots();
  for (const [name, hash] of Object.entries(baseline)) if (name !== 'finlife-catalog.json') assert.equal(after[name], hash, `Unrelated input changed: ${name}`);
  result.unchanged_other_inputs = Object.keys(baseline).filter(name => name !== 'finlife-catalog.json').length;
  const inventory = JSON.parse(fs.readFileSync(path.join(root, 'docs/opentax/collection-inventory.json')));
  assert.ok(!inventory.pending.some(row => row.retained_collection_stage === 'bank'));
  result.bank_datasets = inventory.datasets.filter(row => row.source_id === 'source.fss.finlife.api' && ['deposit', 'saving'].includes(row.operation));
  assert.equal(result.bank_datasets.length, 2);
  for (const row of result.bank_datasets) assert.equal(row.collected_at, result.bank_snapshot.collected_at);
  result.pending = inventory.pending;
  fs.copyFileSync(pipelineFile, path.join(evidence, 'pipeline.json'));
  transaction.commit();
  result.status = 'validated';
} catch (error) {
  result.status = 'failed'; result.error_type = error.name;
  transaction.rollback();
  fs.writeFileSync(pipelineFile, previousReport);
  result.rolled_back = true;
  process.exitCode = 1;
} finally {
  result.finished_at = new Date().toISOString(); write('result.json', result);
  console.log(JSON.stringify({ status: result.status, finished_at: result.finished_at }));
}
