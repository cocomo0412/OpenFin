import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const REFRESH_OUTPUTS = ['knowledge', 'docs/opentax', 'evidence/source-reviews',
  'evidence/candidate-promotions', 'evidence/vertical-slice', 'reports/refresh', 'mcp/src/free-catalog.json'];
const candidateName = name => /^(?:source\..+|finlife-catalog|finlife-additional|gov24-current|api-refresh-run)\.json$/.test(name);
const alive = pid => { try { process.kill(pid, 0); return true; } catch (e) { return e.code !== 'ESRCH'; } };

function inside(root, relative) {
  const target = path.resolve(root, relative);
  if (!relative || path.isAbsolute(relative) || target === root || !target.startsWith(root + path.sep)) throw new Error('Unsafe refresh transaction path');
  // Refuse junctions/symlinks, including ancestors, before copying or removal.
  let current = root;
  for (const part of path.relative(root, target).split(path.sep)) {
    current = path.join(current, part);
    if (fs.existsSync(current) && fs.lstatSync(current).isSymbolicLink()) throw new Error('Refresh transaction refuses symbolic links');
  }
  return target;
}
function copy(source, destination) {
  fs.cpSync(source, destination, { recursive: true, preserveTimestamps: true, filter: file => {
    if (fs.lstatSync(file).isSymbolicLink()) throw new Error('Refresh transaction refuses symbolic links');
    return true;
  } });
}
function atomicJson(file, value) {
  const temporary = file + '.tmp';
  fs.writeFileSync(temporary, JSON.stringify(value), { flush: true });
  fs.renameSync(temporary, file);
}

// A durable journal permits recovery after wrapper/child interruption. Outputs
// are local working files; this does not make a multi-directory live deployment
// atomic. Never deploy a tree while its transaction journal exists.
export function createRefreshTransaction(rootPath, { outputs = REFRESH_OUTPUTS, candidates = true } = {}) {
  const root = fs.realpathSync(rootPath);
  const work = inside(root, '.api-candidates'); fs.mkdirSync(work, { recursive: true });
  const directory = inside(root, '.api-candidates/refresh-transaction');
  const lock = inside(root, '.api-candidates/refresh-transaction.lock');
  const journalPath = path.join(directory, 'journal.json');
  const allowed = relative => outputs.includes(relative) || (candidates && relative.startsWith('.api-candidates/') && candidateName(relative.slice(16)) && !relative.slice(16).includes('/'));
  const remove = relative => fs.rmSync(inside(root, relative), { recursive: true, force: true });
  const candidatePaths = () => candidates ? fs.readdirSync(work).filter(candidateName).map(name => `.api-candidates/${name}`) : [];
  const validateJournal = journal => {
    if (journal.version !== 1 || !['active', 'committed'].includes(journal.state) || !Array.isArray(journal.entries)
      || journal.entries.some(entry => !entry || typeof entry.path !== 'string' || typeof entry.existed !== 'boolean' || !allowed(entry.path))
      || new Set(journal.entries.map(entry => entry.path)).size !== journal.entries.length
      || outputs.some(relative => !journal.entries.some(entry => entry.path === relative))) throw new Error('Invalid refresh recovery journal');
  };
  const restore = journal => {
    validateJournal(journal);
    for (const relative of candidatePaths()) if (!journal.entries.some(entry => entry.path === relative)) remove(relative);
    for (const [index, entry] of journal.entries.entries()) {
      const target = inside(root, entry.path);
      const backup = path.join(directory, 'backup', String(index));
      if (entry.existed && !fs.existsSync(backup)) throw new Error('Refresh recovery backup missing; journal retained');
      // Prepare restoration before removing the damaged destination. Retain the
      // original backup until ALL entries are restored, so recovery is retryable.
      const staged = path.join(directory, `restore-${index}`);
      if (fs.existsSync(staged)) remove(`.api-candidates/refresh-transaction/restore-${index}`);
      if (entry.existed) copy(backup, staged);
      remove(entry.path);
      if (entry.existed) { fs.mkdirSync(path.dirname(target), { recursive: true }); fs.renameSync(staged, target); }
    }
  };
  const cleanup = () => { remove('.api-candidates/refresh-transaction'); fs.rmSync(lock, { force: true }); };
  return {
    begin() {
      const claim = inside(root, '.api-candidates/refresh-recovery-claim');
      try { fs.mkdirSync(claim); }
      catch (error) { if (error.code === 'EEXIST') throw new Error('Refresh recovery claim exists; another recovery is running or requires operator inspection'); throw error; }
      try {
      fs.writeFileSync(path.join(claim, 'owner.json'), JSON.stringify({ pid: process.pid }));
      if (fs.existsSync(lock)) {
        const owner = JSON.parse(fs.readFileSync(lock, 'utf8'));
        if (!Number.isSafeInteger(owner.pid) || alive(owner.pid)) throw new Error('Another refresh transaction is running');
        if (fs.existsSync(journalPath)) {
          const previous = JSON.parse(fs.readFileSync(journalPath, 'utf8'));
          validateJournal(previous);
          if (previous.launch_in_progress) throw new Error('Refresh launch was interrupted before PID registration; operator inspection required');
          if ([previous.child_pid, ...(previous.stage_pids || [])].filter(Boolean).some(alive)) throw new Error('Previous refresh child is still running');
        }
        fs.unlinkSync(lock);
      }
      fs.writeFileSync(lock, JSON.stringify({ pid: process.pid }), { flag: 'wx' });
      try {
        if (fs.existsSync(journalPath)) {
          const previous = JSON.parse(fs.readFileSync(journalPath, 'utf8'));
          validateJournal(previous);
          if (previous.launch_in_progress) throw new Error('Refresh launch was interrupted before PID registration; operator inspection required');
          if ([previous.child_pid, ...(previous.stage_pids || [])].filter(Boolean).some(alive)) throw new Error('Previous refresh child is still running');
          if (previous.state === 'active') restore(previous);
        }
        remove('.api-candidates/refresh-transaction');
        fs.mkdirSync(path.join(directory, 'backup'), { recursive: true });
        const entries = [...outputs, ...candidatePaths()].map(relative => ({ path: relative, existed: fs.existsSync(inside(root, relative)) }));
        for (const [index, entry] of entries.entries()) if (entry.existed) copy(inside(root, entry.path), path.join(directory, 'backup', String(index)));
        const journal = { version: 1, state: 'active', token: crypto.randomUUID(), entries };
        atomicJson(journalPath, journal);
        return journal.token;
      } catch (error) { fs.rmSync(lock, { force: true }); throw error; }
      } finally { remove('.api-candidates/refresh-recovery-claim'); }
    },
    launch(pending = true) { const journal = JSON.parse(fs.readFileSync(journalPath, 'utf8')); journal.launch_in_progress = pending; atomicJson(journalPath, journal); },
    child(pid) { const journal = JSON.parse(fs.readFileSync(journalPath, 'utf8')); journal.child_pid = pid; journal.launch_in_progress = false; atomicJson(journalPath, journal); },
    commit() {
      const journal = JSON.parse(fs.readFileSync(journalPath, 'utf8'));
      journal.state = 'committed'; atomicJson(journalPath, journal);
      // After commit, cleanup failure must NEVER trigger rollback from partly
      // deleted backups. A later run can discard any committed leftovers.
      try { cleanup(); } catch { console.warn('Refresh committed; backup cleanup will be retried on the next run.'); }
    },
    rollback() {
      const journal = JSON.parse(fs.readFileSync(journalPath, 'utf8'));
      if (journal.state !== 'active') throw new Error('Cannot roll back a committed refresh');
      if (journal.launch_in_progress) throw new Error('Refresh launch may have an unregistered child; journal retained for operator inspection');
      if ([journal.child_pid, ...(journal.stage_pids || [])].filter(Boolean).some(alive)) throw new Error('Cannot roll back while refresh children are running; recovery journal retained');
      restore(journal); cleanup();
    },
  };
}

export async function runTrackedStage(command, args, options) {
  const journalPath = path.join(options.cwd, '.api-candidates/refresh-transaction/journal.json');
  const launch = pending => {
    if (!fs.existsSync(journalPath)) return;
    const journal = JSON.parse(fs.readFileSync(journalPath, 'utf8'));
    if (journal.token !== options.env?.OPENFIN_REFRESH_TRANSACTION) return;
    journal.launch_in_progress = pending; atomicJson(journalPath, journal);
  };
  launch(true);
  const child = spawn(command, args, { ...options, stdio: ['ignore', 'pipe', 'pipe'] });
  if (!child.pid) launch(false);
  const update = add => {
    if (!child.pid || !fs.existsSync(journalPath)) return;
    const journal = JSON.parse(fs.readFileSync(journalPath, 'utf8'));
    if (journal.token !== options.env?.OPENFIN_REFRESH_TRANSACTION) return;
    journal.stage_pids = add ? [...(journal.stage_pids || []), child.pid] : (journal.stage_pids || []).filter(pid => pid !== child.pid);
    journal.launch_in_progress = false;
    atomicJson(journalPath, journal);
  };
  try { update(true); } catch (error) {
    const closed = new Promise(resolve => { child.once('close', resolve); child.once('error', resolve); });
    child.kill(); await closed; throw error;
  }
  let stdout = '', stderr = '', bytes = 0;
  child.stdout.setEncoding('utf8'); child.stderr.setEncoding('utf8');
  const collect = (kind, chunk) => {
    bytes += Buffer.byteLength(chunk);
    if (bytes > (options.maxBuffer || 16 * 1024 * 1024)) { child.kill(); return; }
    if (kind === 'stdout') stdout += chunk.toString(); else stderr += chunk.toString();
  };
  child.stdout.on('data', chunk => collect('stdout', chunk)); child.stderr.on('data', chunk => collect('stderr', chunk));
  try { return await new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('close', status => resolve({ status: bytes > (options.maxBuffer || 16 * 1024 * 1024) ? 1 : status, stdout, stderr }));
  }); } finally { update(false); }
}

export async function transactionalEntry(moduleUrl, { validate = [] } = {}) {
  const file = fileURLToPath(moduleUrl);
  if (!process.argv[1] || path.resolve(process.argv[1]) !== file) return;
  // Only refresh-all implements a real dry-run; never accidentally run a
  // mutating builder outside its transaction when an unsupported flag is used.
  if (process.argv.includes('--dry-run') || process.argv.includes('--help')) {
    if (path.basename(file) === 'refresh-all.mjs' && process.argv.includes('--dry-run')) return;
    throw new Error('This entry does not support dry-run/help; no files changed');
  }
  const root = fs.realpathSync(fileURLToPath(new URL('../../', moduleUrl)));
  const journalPath = path.join(root, '.api-candidates/refresh-transaction/journal.json');
  if (process.env.OPENFIN_REFRESH_TRANSACTION && fs.existsSync(journalPath)) {
    for (let attempt = 0; attempt < 3000; attempt++) {
      const journal = JSON.parse(fs.readFileSync(journalPath, 'utf8'));
      if (journal.state !== 'active' || journal.token !== process.env.OPENFIN_REFRESH_TRANSACTION) break;
      if (!journal.launch_in_progress && [journal.child_pid, ...(journal.stage_pids || [])].includes(process.pid)) return;
      // The child cannot launch a stage until its own PID registration commits.
      await new Promise(resolve => setTimeout(resolve, 10));
      if (attempt === 2999) throw new Error('Refresh child registration did not complete; no work started');
    }
  }
  const transaction = createRefreshTransaction(root);
  const token = transaction.begin();
  let status = 1;
  try {
    transaction.launch();
    const child = spawn(process.execPath, [file, ...process.argv.slice(2)], { cwd: root, stdio: 'inherit', env: { ...process.env, OPENFIN_REFRESH_TRANSACTION: token } });
    if (!child.pid) transaction.launch(false);
    if (child.pid) try { transaction.child(child.pid); } catch (error) {
      const closed = new Promise(resolve => { child.once('close', resolve); child.once('error', resolve); });
      child.kill(); await closed; throw error;
    }
    status = await new Promise((resolve, reject) => { child.once('error', reject); child.once('exit', code => resolve(code ?? 1)); });
    for (const validator of validate) {
      if (status !== 0) break;
      const result = await runTrackedStage(process.execPath, [validator], { cwd: root, env: { ...process.env, OPENFIN_REFRESH_TRANSACTION: token } });
      process.stdout.write(result.stdout); process.stderr.write(result.stderr); status = result.status ?? 1;
    }
    if (status === 0) transaction.commit(); else transaction.rollback();
  } catch (error) { transaction.rollback(); throw error; }
  process.exit(status);
}
