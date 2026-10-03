import { appendFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

// A green Pages/unrelated check must never count as a Worker deployment.
export function selectBuild(checks, sha) {
  return checks.filter(check => check.head_sha === sha
    && check.app?.slug === 'cloudflare-workers-and-pages'
    && check.name === 'Workers Builds: openfin')
    .sort((a, b) => b.id - a.id)[0];
}

export async function waitForBuild({ readChecks, sha, timeoutMs = 30 * 60_000,
  intervalMs = 30_000, now = Date.now,
  sleep = ms => new Promise(resolve => setTimeout(resolve, ms)), log = console.log }) {
  const deadline = now() + timeoutMs;
  let previous;
  while (now() < deadline) {
    const check = selectBuild(await readChecks(), sha);
    const state = check ? `${check.id}: ${check.status}/${check.conclusion ?? 'pending'}` : 'Waiting for Cloudflare to register the build';
    if (state !== previous) { log(state); previous = state; }
    if (check?.status === 'completed') {
      if (check.conclusion === 'success') return check;
      throw new Error(`Cloudflare build ${check.conclusion}: ${check.details_url ?? check.html_url}. Review its logs; after a successful retry, rerun this workflow.`);
    }
    await sleep(Math.min(intervalMs, Math.max(0, deadline - now())));
  }
  throw new Error(`Cloudflare did not complete deployment for ${sha} within ${timeoutMs / 60_000} minutes. An old responding Worker is not proof of this deployment. Check Workers Builds and rerun after recovery.`);
}

async function main() {
  const { GITHUB_REPOSITORY: repo, GITHUB_SHA: sha, GITHUB_TOKEN: token, GITHUB_STEP_SUMMARY: summary } = process.env;
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo ?? '') || !/^[a-f0-9]{40}$/.test(sha ?? '')) throw new Error('GITHUB_REPOSITORY and full GITHUB_SHA are required');
  const readChecks = async () => {
    const checks = [];
    for (let page = 1; ; page++) {
      const url = `https://api.github.com/repos/${repo}/commits/${sha}/check-runs?filter=all&per_page=100&page=${page}`;
      let response;
      for (let attempt = 0; attempt < 3; attempt++) {
        response = await fetch(url, { headers: {
          Accept: 'application/vnd.github+json', 'User-Agent': 'OpenFin-deployment-verifier',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }, signal: AbortSignal.timeout(20_000) });
        if (response.status < 500) break;
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      if (!response.ok) throw new Error(`GitHub check lookup failed: HTTP ${response.status}`);
      const body = await response.json();
      checks.push(...body.check_runs);
      if (body.check_runs.length < 100) return checks;
    }
  };
  try {
    const check = await waitForBuild({ readChecks, sha });
    const message = `Cloudflare deployment succeeded for ${sha}\n${check.details_url ?? check.html_url}`;
    console.log(message);
    if (summary) appendFileSync(summary, `### Cloudflare deployment\n\n${message}\n\n`);
  } catch (error) {
    if (summary) appendFileSync(summary, `### Cloudflare deployment not verified\n\n${error.message}\n`);
    throw error;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
