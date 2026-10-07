import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, resolve, basename } from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import test from 'node:test';

test('actual workflow only uploads changed Worker inputs or an explicit manual run', () => {
  const source = readFileSync(new URL('../../.github/workflows/deploy-mcp.yml', import.meta.url), 'utf8').replace(/\r\n/g, '\n');
  const script = source.match(/        run: \|\n([\s\S]*?)\n  validate:/)[1].replace(/^          /gm, '');
  const bash = process.platform === 'win32' ? 'C:/Program Files/Git/bin/bash.exe' : 'bash';
  const cwd = mkdtempSync(join(tmpdir(), 'openfin-upload-filter-'));
  const output = join(cwd, '.git', 'action-output');
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
  const write = (path, content) => { mkdirSync(dirname(join(cwd, path)), { recursive: true }); writeFileSync(join(cwd, path), content); };
  const commit = () => { git('add', '.'); git('-c', 'user.name=QA', '-c', 'user.email=qa@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '-qm', 'fixture'); return git('rev-parse', 'HEAD'); };
  const run = (before, after, event = 'push') => {
    writeFileSync(output, '');
    const result = spawnSync(bash, ['--noprofile', '--norc', '-c', script], { cwd, encoding: 'utf8', env: { ...process.env, EVENT_NAME: event, BEFORE_SHA: before, GITHUB_SHA: after, GITHUB_OUTPUT: output.replace(/\\/g, '/') } });
    return { ...result, output: readFileSync(output, 'utf8').trim() };
  };
  try {
    git('init', '-q'); write('mcp/src/free.ts', 'initial'); const base = commit();
    write('docs/index.html', 'new UI'); write('mcp/README.md', 'current scope');
    write('mcp/nested/guide.md', 'guide'); write('.github/workflows/deploy-mcp.yml', 'workflow-only');
    const docs = commit();
    assert.equal(run(base, docs).output, 'deploy=false');
    for (const path of ['mcp/src/free.ts', 'mcp/package-lock.json', 'mcp/wrangler.toml', 'mcp/scripts/deploy-free.mjs', 'docs/opentax/korea-tax-ontology-2026.json']) {
      git('checkout', '-q', '--detach', docs); write(path, 'changed'); const head = commit();
      const result = run(docs, head); assert.equal(result.status, 0, result.stderr); assert.equal(result.output, 'deploy=true', path);
    }
    assert.equal(run(base, docs, 'workflow_dispatch').output, 'deploy=true');
    assert.equal(run(base, docs, 'pull_request').output, 'deploy=false');
    assert.equal(run('0'.repeat(40), docs).output, 'deploy=true');
    const missing = run('missing-ref', docs); assert.notEqual(missing.status, 0); assert.equal(missing.output, '');
    assert.match(source, /needs\.scope\.outputs\.deploy == 'true'/);
    assert.match(source, /needs: \[validate, scope\]/);
  } finally {
    assert.equal(dirname(resolve(cwd)), resolve(tmpdir()));
    assert.ok(basename(cwd).startsWith('openfin-upload-filter-'));
    rmSync(cwd, { recursive: true, force: true });
  }
});
