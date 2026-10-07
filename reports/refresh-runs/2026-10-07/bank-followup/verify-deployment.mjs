import fs from 'node:fs';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../../../', import.meta.url));
const commit = '3e090c850b3fa0275991ee1540e0670d017e6711';
const previous = '3a6fbf52802553650fcb02c4e5a4c7cc39479a9a';
const api = 'https://api.github.com/repos/cocomo0412/OpenFin';
const read = async url => {
  const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200); return response.json();
};
const runs = (await read(`${api}/actions/runs?head_sha=${commit}&per_page=30&verify=${Date.now()}`)).workflow_runs;
const pages = runs.find(run => run.name === 'pages build and deployment');
if (!pages || pages.conclusion !== 'success' || runs.some(run => run.name === 'OpenFin search quality' && run.conclusion !== 'success')) {
  console.log(JSON.stringify({ status: pages?.status || 'pending', conclusion: pages?.conclusion, runs: runs.map(run => ({ id: run.id, name: run.name, status: run.status, conclusion: run.conclusion })) }));
} else {
  assert.equal((await read(`${api}/git/ref/heads/main?verify=${Date.now()}`)).object.sha, commit);
  assert.equal(execFileSync('git', ['-c', 'core.safecrlf=false', 'diff', '--name-only', previous, commit, '--', 'mcp', 'docs/opentax/korea-tax-ontology-2026.json', '.github/workflows/deploy-mcp.yml'], { cwd: root, encoding: 'utf8' }).trim(), '');
  assert.ok(!runs.some(run => run.name === 'OpenFin MCP pipeline'));
  const files = ['docs/app.js', 'docs/explorer.css', 'docs/opentax/finance-ontology-manifest.json', 'docs/opentax/collection-inventory.json', 'docs/opentax/api-snapshots/source.fss.finlife.api-deposit.json', 'docs/opentax/api-snapshots/source.fss.finlife.api-saving.json'];
  const checked = [];
  const data = new Map();
  for (const path of files) {
    const url = `https://cocomo0412.github.io/OpenFin/${path.slice(5)}`;
    const response = await fetch(`${url}?verify=${commit}`, { cache: 'no-store', signal: AbortSignal.timeout(30000) });
    assert.equal(response.status, 200);
    const bytes = Buffer.from(await response.arrayBuffer());
    const expected = execFileSync('git', ['show', `${commit}:${path}`], { cwd: root, maxBuffer: 20 * 1024 * 1024 });
    assert.ok(bytes.equals(expected), `Live bytes mismatch: ${path}`);
    checked.push({ path, url, sha256: createHash('sha256').update(bytes).digest('hex'), matches_commit: true });
    if (path.endsWith('.json')) data.set(path, JSON.parse(bytes));
  }
  const inventory = data.get(files[3]);
  assert.equal(inventory.pending.length, 5);
  assert.ok(inventory.pending.every(row => row.endpoint === 'annuitySavingProductsSearch'));
  const bank = files.slice(4).map((path, index) => {
    const snapshot = data.get(path);
    assert.equal(snapshot.count, index ? 335 : 432);
    assert.equal(snapshot.items.length, snapshot.count);
    assert.equal(snapshot.collected_at, '2026-10-07T08:02:47.885Z');
    return { operation: index ? 'saving' : 'deposit', count: snapshot.count, collected_at: snapshot.collected_at };
  });
  assert.equal(data.get(files[2]).version, 'KR-FINANCE-ONTOLOGY-MANIFEST-2026.10.07.1');
  const result = { verified_at: new Date().toISOString(), commit, website: { deployed: true, checked_files: checked, bank, pension_pending: inventory.pending.length }, pages: { id: pages.id, url: pages.html_url, conclusion: pages.conclusion }, mcp: { redeployed: false, required: false, reason: 'No changed code, configuration, dependencies, or tax bundle inputs' }, workflows: runs.map(run => ({ name: run.name, status: run.status, conclusion: run.conclusion })) };
  fs.writeFileSync(new URL('deployment.json', import.meta.url), JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ status: 'verified', commit, pages: pages.html_url, files: checked.length, bank, mcp_redeployed: false }));
}
