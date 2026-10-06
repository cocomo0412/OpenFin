import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../../../..', import.meta.url));
const commit = '3e225a1bad283d7898681cec88a47bcbe1e6f4c1';
const endpoint = 'https://openfin.cocomo0412.workers.dev/mcp';
const gitBlob = path => execFileSync('git', ['show', `${commit}:${path}`], { cwd: root, maxBuffer: 20 * 1024 * 1024 });
const sha256 = value => createHash('sha256').update(value).digest('hex');
const getJson = async url => {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200, url);
  return response.json();
};
const runs = (await getJson(`https://api.github.com/repos/cocomo0412/OpenFin/actions/runs?head_sha=${commit}&per_page=20`)).workflow_runs;
const selected = [];
for (const name of ['pages build and deployment', 'OpenFin MCP pipeline', 'OpenFin search quality']) {
  const run = runs.find(row => row.name === name);
  assert.ok(run, `Missing workflow: ${name}`);
  assert.equal(run.conclusion, 'success', `${name}: ${run.status}`);
  assert.equal(run.head_sha, commit);
  const jobs = (await getJson(`${run.url}/jobs?per_page=100`)).jobs;
  selected.push({ name, id: run.id, url: run.html_url, head_sha: run.head_sha, conclusion: run.conclusion,
    jobs: jobs.map(job => ({ name: job.name, conclusion: job.conclusion, steps: job.steps.map(step => ({ name: step.name, conclusion: step.conclusion })) })) });
}
const remoteMain = await getJson('https://api.github.com/repos/cocomo0412/OpenFin/git/ref/heads/main');
assert.equal(remoteMain.object.sha, commit);
const liveFiles = [];
for (const path of ['docs/index.html', 'docs/opentax/app.js']) {
  const url = `https://cocomo0412.github.io/OpenFin/${path.slice(5)}`;
  const response = await fetch(url, { cache: 'no-store', signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, 200);
  const actual = sha256(Buffer.from(await response.arrayBuffer()));
  const expected = sha256(gitBlob(path));
  assert.equal(actual, expected, path);
  liveFiles.push({ path, url, status: response.status, sha256: actual, matches_committed_blob: true });
}
const health = await getJson('https://openfin.cocomo0412.workers.dev/health');

// Execute the committed SDK smoke checks unchanged except import locations and
// source bytes. Linux deployment hashes Git LF bytes; Windows checkout uses CRLF.
let smoke = gitBlob('mcp/scripts/smoke-free.mjs').toString('utf8');
for (const entry of ['index.js', 'streamableHttp.js']) {
  smoke = smoke.replace(`@modelcontextprotocol/sdk/client/${entry}`, pathToFileURL(resolve(root, `mcp/node_modules/@modelcontextprotocol/sdk/dist/esm/client/${entry}`)).href);
}
const source = gitBlob('docs/opentax/korea-tax-ontology-2026.json');
const originalRead = "readFileSync(new URL('../../docs/opentax/korea-tax-ontology-2026.json', import.meta.url))";
assert.ok(smoke.includes(originalRead));
smoke = smoke.replace(originalRead, `Buffer.from(${JSON.stringify(source.toString('base64'))}, 'base64')`);
const checked = execFileSync(process.execPath, ['--input-type=module', '-'], {
  input: smoke, cwd: root, env: { ...process.env, MCP_URL: endpoint }, encoding: 'utf8', timeout: 90000, maxBuffer: 1024 * 1024
});
writeFileSync(new URL('live-mcp-smoke.log', import.meta.url), checked);
const evidence = {
  verified_at: new Date().toISOString(), commit, remote_main: remoteMain.object.sha,
  website: { deployed: true, reason: 'SEC-05 legacy source-link output protection', live_files: liveFiles },
  mcp: { deployed: true, edition: 'free', endpoint, reason: 'SEC-01 production bundle dependencies updated', health,
    smoke: JSON.parse(checked.trim()), source_sha256: sha256(source), source_checksum_basis: 'Exact Git blob bytes used by Linux deployment; Windows CRLF working copy not used' },
  runs: selected,
  boundaries: ['Financial data and collection dates unchanged', 'Full edition and disabled release/staging jobs remain inactive', 'SEC-11 full-edition binding/migration and live validation required before future activation']
};
writeFileSync(new URL('deployment.json', import.meta.url), JSON.stringify(evidence, null, 2) + '\n');
console.log(JSON.stringify({ status: 'passed', commit, runs: selected.map(r => ({ name: r.name, conclusion: r.conclusion })), website_files: liveFiles.length, mcp: evidence.mcp.smoke }, null, 2));
