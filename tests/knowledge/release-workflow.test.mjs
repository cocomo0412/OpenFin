import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

const root = fileURLToPath(new URL('../../', import.meta.url));
const read = (name) => fs.readFileSync(`${root}/.github/workflows/${name}`, 'utf8').replace(/\r\n/g, '\n');

const shouldRollbackWorker = ({ deployWorkerFinal, promote, validatePromoted, deployPages, parity }) =>
  deployWorkerFinal === 'success' && promote !== 'skipped' &&
  (promote !== 'success' || validatePromoted !== 'success' || deployPages !== 'success' || parity !== 'success');

const shouldRollbackPages = ({ canonical, deployPages, parity }) =>
  canonical === 'success' &&
  (deployPages === 'failure' || deployPages === 'cancelled' ||
    (deployPages === 'success' && parity !== 'success'));

test('full edition workflows cannot deploy on a free-only installation', () => {
  for (const name of ['release-openfin.yml','staging-openfin.yml','diagnose-worker.yml','live-regression.yml']) {
    const jobs = read(name).split('\njobs:\n')[1];
    const blocks = [...jobs.matchAll(/^  [a-z0-9-]+:\n([^]*?)(?=^  [a-z0-9-]+:\n|$(?![^]))/gm)];
    assert.ok(blocks.length > 0);
    for (const block of blocks) assert.match(block[1], /^    if: \$\{\{ false \}\}/m);
  }
  const config = fs.readFileSync(`${root}/mcp/wrangler.toml`, 'utf8');
  assert.match(config, /name = "openfin"/);
  assert.match(config, /main = "src\/free.ts"/);
  assert.doesNotMatch(config, /cpu_ms/);
});

test('soak and canary checks fail closed on bad traffic and runtime bindings', () => {
  const soak = fs.readFileSync(`${root}/mcp/scripts/soak-test.mjs`, 'utf8').replace(/\r\n/g, '\n');
  const canary = fs.readFileSync(`${root}/mcp/scripts/canary-validate.mjs`, 'utf8').replace(/\r\n/g, '\n');
  assert.match(soak, /metrics\.total === 0 \|\| metrics\.http_5xx \|\| metrics\.http_4xx/);
  assert.match(soak, /EXPECTED_DEPLOYMENT_COMMIT/);
  assert.match(soak, /EXPECTED_GENERATION/);
  assert.match(canary, /Cloudflare-Workers-Version-Overrides/);
  assert.match(canary, /health\.deployment_commit !== expectedCommit/);
  assert.match(canary, /traffic_observed > 0/);
});

test('manual live monitoring is read-only and publishes evidence as an artifact', () => {
  const workflow = read('live-regression.yml');
  assert.match(workflow, /permissions:\n\s+contents: read/);
  assert.doesNotMatch(workflow, /git (?:add|commit|push)/);
  assert.doesNotMatch(workflow, /npm run knowledge:build/);
  assert.match(workflow, /evidence\/live-regression/);
  assert.match(workflow, /persistence: "workflow-artifact-only"/);
  assert.match(workflow, /--slurpfile attempt live-regression-report\.json[\s\S]*--slurpfile successful previous-successful\.json/);
  assert.doesNotMatch(workflow, /--argjson attempt "\$\(jq -c \. live-regression-report\.json\)"/);
  assert.match(workflow, /MCP_URL: https:\/\/openfin\.cocomo0412\.workers\.dev\/mcp[\s\S]*LIVE_DIAGNOSTICS: "1"/);
});

test('live diagnostics encode non-ASCII queries before placing them in HTTP headers', () => {
  const liveRegression = fs.readFileSync(`${root}/mcp/scripts/live-regression.mjs`, 'utf8').replace(/\r\n/g, '\n');
  const soak = fs.readFileSync(`${root}/mcp/scripts/soak-test.mjs`, 'utf8').replace(/\r\n/g, '\n');
  assert.match(liveRegression, /const diagnosticQuery = value => encodeURIComponent\(value\.slice\(0, 24\)\)/);
  assert.match(soak, /const diagnosticQuery = value => encodeURIComponent\(value\.slice\(0, 24\)\)/);
  assert.match(fs.readFileSync(`${root}/mcp/src/index.ts`, 'utf8').replace(/\r\n/g, '\n'), /decodeURIComponent\(value\)/);
});

test('live diagnostics are opt-in for normal traffic and enabled on retries', () => {
  const liveRegression = fs.readFileSync(`${root}/mcp/scripts/live-regression.mjs`, 'utf8').replace(/\r\n/g, '\n');
  const soak = fs.readFileSync(`${root}/mcp/scripts/soak-test.mjs`, 'utf8').replace(/\r\n/g, '\n');
  assert.match(liveRegression, /const diagnosticsEnabled = process\.env\.LIVE_DIAGNOSTICS === "1"/);
  assert.match(liveRegression, /const diagnostics = diagnosticsEnabled \|\| attempt > 1/);
  assert.match(liveRegression, /if \(diagnostics\) \{[\s\S]*x-openfin-diagnostics/);
  assert.match(soak, /const diagnosticsEnabled = process\.env\.LIVE_DIAGNOSTICS === "1"/);
  assert.match(soak, /\.\.\.\(diagnosticsEnabled \? \{/);
  assert.doesNotMatch(soak, /"x-openfin-diagnostics": "1",\n\s+"x-openfin-request-id"/);
});

test('rollback contracts cover partial promotion, cancellation, and public Pages failure', () => {
  assert.equal(shouldRollbackWorker({ deployWorkerFinal: 'success', promote: 'success', validatePromoted: 'failure', deployPages: 'skipped', parity: 'skipped' }), true);
  assert.equal(shouldRollbackWorker({ deployWorkerFinal: 'success', promote: 'cancelled', validatePromoted: 'skipped', deployPages: 'skipped', parity: 'skipped' }), true);
  assert.equal(shouldRollbackWorker({ deployWorkerFinal: 'success', promote: 'success', validatePromoted: 'success', deployPages: 'success', parity: 'success' }), false);
  assert.equal(shouldRollbackWorker({ deployWorkerFinal: 'failure', promote: 'skipped', validatePromoted: 'skipped', deployPages: 'skipped', parity: 'skipped' }), false);

  assert.equal(shouldRollbackPages({ canonical: 'success', deployPages: 'failure', parity: 'skipped' }), true);
  assert.equal(shouldRollbackPages({ canonical: 'success', deployPages: 'cancelled', parity: 'cancelled' }), true);
  assert.equal(shouldRollbackPages({ canonical: 'success', deployPages: 'success', parity: 'failure' }), true);
  assert.equal(shouldRollbackPages({ canonical: 'success', deployPages: 'skipped', parity: 'skipped' }), false);
  assert.equal(shouldRollbackPages({ canonical: 'failure', deployPages: 'failure', parity: 'skipped' }), false);
});

test('all workflows are manual and source tracking is report-only unless explicitly opted into a review PR', () => {
  for (const name of fs.readdirSync(`${root}/.github/workflows`).filter(name => /\.ya?ml$/.test(name))) {
    const workflow = read(name);
    const trigger = workflow.match(/\non:([\s\S]*?)(?=\n[^\s#])/)[1];
    assert.match(trigger, /workflow_dispatch:/);
    assert.doesNotMatch(trigger, /^  (?!workflow_dispatch:)[a-z_]+:/m);
    assert.doesNotMatch(workflow, /git push.*main/);
  }
  assert.equal(fs.existsSync(`${root}/.github/dependabot.yml`), false);
  const tracker = read('track-sources.yml');
  assert.match(tracker, /permissions:\n  contents: read/);
  assert.match(tracker, /persist-credentials: false/);
  assert.match(tracker, /default: report-only/);
  assert.match(tracker, /create-review-pr/);
  assert.match(tracker, /knowledge:track-sources -- --dry-run --report-dir/);
  assert.match(tracker, /track-sources\.mjs --write --report-dir/);
  assert.match(tracker, /OPENFIN_SOURCE_TRACKING_TOKEN/);
  assert.match(tracker, /automation\/source-tracking-\$\{\{ github\.run_id \}\}/);
  assert.doesNotMatch(tracker, /contents: write|pull-requests: write|issues: write|git push --force|git push .*main|gh issue|knowledge:build/);
  assert.match(tracker, /retention-days: 3/);
});

test('legacy production deployment workflows are fail-closed', () => {
  for (const name of ['deploy-pages.yml', 'deploy-mcp.yml']) {
    const workflow = read(name);
    assert.match(workflow, /Legacy direct .* deployment is disabled/);
    assert.doesNotMatch(workflow, /wrangler (?:deploy|versions deploy)/);
    assert.doesNotMatch(workflow, /actions\/deploy-pages@/);
  }
});
