import { execFileSync } from 'node:child_process';

// Keep in sync with deploy-mcp.yml push/pull_request paths.
const deploymentInputs = ['mcp', 'docs/opentax/korea-tax-ontology-2026.json', '.github/workflows/deploy-mcp.yml'];
const [candidate, latest] = process.argv.slice(2);
if (!candidate || !latest) throw new Error('Candidate and current main commit are required');
const root = execFileSync('git', ['rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim();
// Resolve immutable commits and fail closed on missing refs or Git errors.
const resolve = (ref) => execFileSync('git', ['rev-parse', '--verify', '--end-of-options', `${ref}^{commit}`], { cwd: root, encoding: 'utf8' }).trim();
const changed = execFileSync('git', ['diff', '--name-only', resolve(candidate), resolve(latest), '--', ...deploymentInputs], { cwd: root, encoding: 'utf8' }).trim();
if (changed) throw new Error('MCP deployment inputs changed on main. Deploy the newer MCP pipeline run.');
console.log('Current main has identical MCP deployment inputs; the validated bundle may be deployed.');
