import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../../..', import.meta.url));
const commit = '34450ae6ff83c2104c1febacdddd197eed4f3c2c';
const previousProduction = '3e225a1bad283d7898681cec88a47bcbe1e6f4c1';
const api = 'https://api.github.com/repos/cocomo0412/OpenFin';
const sha = bytes => createHash('sha256').update(bytes).digest('hex');
const json = async url => {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, url);
  return response.json();
};
const runs = (await json(`${api}/actions/runs?head_sha=${commit}&per_page=30`)).workflow_runs;
const pages = runs.find(run => run.name === 'pages build and deployment');
assert.ok(pages, 'Pages workflow must exist');
assert.equal(pages.head_sha, commit);
assert.equal(pages.conclusion, 'success', `Pages ${pages.status}`);
assert.equal((await json(`${api}/git/ref/heads/main`)).object.sha, commit);
const mcpDiff = execFileSync('git', ['diff', '--name-only', previousProduction, commit, '--', 'mcp', 'docs/opentax/korea-tax-ontology-2026.json', '.github/workflows/deploy-mcp.yml'], { cwd: root, encoding: 'utf8' }).trim();
assert.equal(mcpDiff, '');
assert.ok(!runs.some(run => run.name === 'OpenFin MCP pipeline'), 'MCP should not deploy for this update');
const checked = [];
const payloads = new Map();
for (const path of ['docs/opentax/finance-ontology-manifest.json', 'docs/opentax/collection-inventory.json', 'docs/opentax/api-snapshots/source.bok.ecos-0.json', 'docs/opentax/api-snapshots/source.fss.finlife.api-deposit.json']) {
  const url = `https://cocomo0412.github.io/OpenFin/${path.slice(5)}`;
  const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, path);
  const bytes = Buffer.from(await response.arrayBuffer());
  const expected = execFileSync('git', ['show', `${commit}:${path}`], { cwd: root, maxBuffer: 20 * 1024 * 1024 });
  assert.equal(sha(bytes), sha(expected), path);
  payloads.set(path, JSON.parse(bytes));
  checked.push({ path, url, status: 200, sha256: sha(bytes), matches_commit: true });
}
const manifest = payloads.get('docs/opentax/finance-ontology-manifest.json');
const inventory = payloads.get('docs/opentax/collection-inventory.json');
assert.equal(manifest.basis_date, '2026-10-07');
assert.equal(inventory.snapshot_basis_date, '2026-10-07');
assert.equal(inventory.pending.filter(row => row.endpoint === 'annuitySavingProductsSearch').length, 5);
const bank = inventory.pending.find(row => row.retained_collection_stage === 'bank');
assert.ok(bank);
assert.equal(bank.retained_collected_at, '2026-10-01T07:44:18.122Z');
assert.equal(payloads.get('docs/opentax/api-snapshots/source.fss.finlife.api-deposit.json').collected_at, bank.retained_collected_at);
const jobs = (await json(`${pages.url}/jobs?per_page=100`)).jobs.map(job => ({ name: job.name, conclusion: job.conclusion }));
const result = { verified_at: new Date().toISOString(), commit, previous_production_commit: previousProduction,
  website: { deployed: true, url: 'https://cocomo0412.github.io/OpenFin/', basis_date: manifest.basis_date, refresh_status: 'partial', checked_files: checked },
  mcp: { required: false, redeployed: false, changed_bundle_inputs: [], reason: 'Tax catalog, MCP code/configuration/dependencies unchanged' },
  pages: { id: pages.id, url: pages.html_url, conclusion: pages.conclusion, head_sha: pages.head_sha, jobs },
  workflows: runs.map(run => ({ name: run.name, id: run.id, conclusion: run.conclusion, url: run.html_url })),
  retained_bank_collected_at: bank.retained_collected_at, pension_pending_requests: 5 };
writeFileSync(new URL('deployment.json', import.meta.url), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ status: 'passed', commit, website_basis_date: manifest.basis_date, live_files_verified: checked.length, mcp_redeployed: false, pages: pages.html_url }, null, 2));
