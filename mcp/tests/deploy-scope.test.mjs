import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';

const guard = fileURLToPath(new URL('../scripts/verify-deploy-scope.mjs', import.meta.url));
test('deployment permits later website changes but blocks changed MCP inputs', () => {
  const cwd = mkdtempSync(join(tmpdir(), 'openfin-deploy-scope-'));
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8' }).trim();
  const write = (name, value) => {
    const p = join(cwd, name); mkdirSync(dirname(p), { recursive: true }); writeFileSync(p, value);
  };
  const commit = () => { git('add', '.'); git('-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', '-c', 'commit.gpgsign=false', 'commit', '-qm', 'fixture'); return git('rev-parse', 'HEAD'); };
  const check = (a, b) => spawnSync(process.execPath, [guard, a, b], { cwd }).status;
  try {
    git('init', '-q');
    write('mcp/src/free.ts', 'original');
    write('docs/opentax/korea-tax-ontology-2026.json', '{}');
    write('.github/workflows/deploy-mcp.yml', 'original');
    const base = commit();
    assert.equal(check(base, base), 0);
    write('docs/index.html', 'new heading'); write('handbook/operations.md', 'new notes');
    const website = commit();
    assert.equal(check(base, website), 0, 'later website/manual commit must not block a validated MCP bundle');
    for (const file of ['mcp/src/free.ts', 'docs/opentax/korea-tax-ontology-2026.json', '.github/workflows/deploy-mcp.yml', 'mcp/package-lock.json']) {
      git('checkout', '-q', '--detach', website);
      write(file, 'changed'); const newer = commit();
      assert.notEqual(check(base, newer), 0, `must refuse changed input: ${file}`);
    }
    assert.notEqual(check(base, 'nonexistent-ref'), 0, 'unresolved main must fail closed');
  } finally {
    assert.equal(dirname(resolve(cwd)), resolve(tmpdir()));
    assert.ok(basename(cwd).startsWith('openfin-deploy-scope-'));
    rmSync(cwd, { recursive: true, force: true });
  }
});
