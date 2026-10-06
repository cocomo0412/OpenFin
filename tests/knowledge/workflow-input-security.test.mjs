import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const files = ['staging-openfin.yml', 'release-openfin.yml'];
const workflows = files.map(name => ({ name, source: fs.readFileSync(new URL(`../../.github/workflows/${name}`, import.meta.url), 'utf8').replace(/\r\n/g, '\n') }));
function runs(source) {
  return [...source.matchAll(/^      (?:  |- )run: (.*)\n((?:          .*\n|\n)*)/gm)].map(match => match[1] === '|' ? match[2].replace(/^          /gm, '') : match[1]);
}

test('disabled full-edition workflows never interpolate Actions values into shell source', () => {
  for (const { name, source } of workflows) {
    const jobCount = [...source.split('\njobs:\n')[1].matchAll(/^  [a-z][\w-]*:\n/gm)].length;
    const disabledCount = [...source.matchAll(/^    if: \$\{\{ false \}\} # Full edition disabled for free-only deployment$/gm)].length;
    assert.ok(jobCount > 0, `${name}: no jobs found`);
    assert.equal(disabledCount, jobCount, `${name}: every job must remain disabled`);
    assert.ok(runs(source).length > 0);
    for (const script of runs(source)) assert.doesNotMatch(script, /\$\{\{/, `${name}: script expression crosses shell boundary`);
  }
});

const bash = process.platform === 'win32' ? 'C:/Program Files/Git/bin/bash.exe' : 'bash';
const bashAvailable = spawnSync(bash, ['--version'], { encoding: 'utf8' }).status === 0;
const validInputs = {
  EXPECTED_DEPLOYMENT_COMMIT: 'a'.repeat(40),
  EXPECTED_GENERATION_ID: 'b'.repeat(64),
  EXPECTED_CANDIDATE_SET_CHECKSUM: 'c'.repeat(64),
  EXPECTED_POLICY_VERSION: 'openfin-policy-v1.0',
  EXPECTED_RANKING_VERSION: 'openfin-ranking-v1.0',
  EXPECTED_CALCULATOR_VERSION: 'openfin-calculator-v1.0',
};

test('actual staging format validator rejects malformed values before network checks', () => {
  const source = workflows.find(item => item.name === 'staging-openfin.yml').source;
  const validator = runs(source).find(script => script.includes('Invalid staging input format'));
  assert.ok(validator);
  assert.ok(source.indexOf('Validate staging input formats') < source.indexOf('- run: npm ci'));
  const program = validator.match(/node <<'NODE'\n([\s\S]*?)\nNODE/)[1];
  const execute = input => spawnSync(process.execPath, ['-e', program], { env: { ...process.env, ...input }, encoding: 'utf8' });
  assert.equal(execute(validInputs).status, 0);
  for (const key of Object.keys(validInputs)) {
    const invalidValues = key.includes('VERSION')
      ? ['', 'x'.repeat(129), 'version\nINJECTED', '$(printf INPUT_EXECUTED >&2)', '"; printf INPUT_EXECUTED >&2; #']
      : ['', validInputs[key].slice(1), 'z'.repeat(validInputs[key].length), '$(printf INPUT_EXECUTED >&2)'];
    for (const value of [...invalidValues, `${validInputs[key]}\n`]) {
      const result = execute({ ...validInputs, [key]: value });
      assert.equal(result.status, 1, key);
      assert.match(result.stderr, new RegExp(key));
      assert.doesNotMatch(result.stderr + result.stdout, /INPUT_EXECUTED|INJECTED/, 'input values must not be logged');
    }
  }
});

test('actual staging comparison treats shell metacharacters as literal input', { skip: !bashAvailable && 'Bash unavailable' }, () => {
  const source = workflows.find(item => item.name === 'staging-openfin.yml').source;
  const script = runs(source).find(value => value.includes('.runtime_contract.deployment_commit'));
  assert.ok(script);
  // Stub the report reader only: execute the workflow comparison script unchanged.
  const jqStub = `jq() {
    if [ "$1" = -r ]; then shift; fi
    case "$1" in
      .live_execution_status) printf executed;;
      .live_status) printf current;;
      '.live_blocked_cases | length') printf 0;;
      '.live_positive_cases | length'|.positive_fixture_count) printf 1;;
      .runtime_contract.deployment_commit) printf '${validInputs.EXPECTED_DEPLOYMENT_COMMIT}';;
      .runtime_contract.generation_id) printf '${validInputs.EXPECTED_GENERATION_ID}';;
      .runtime_contract.candidate_set_checksum) printf '${validInputs.EXPECTED_CANDIDATE_SET_CHECKSUM}';;
      .runtime_contract.policy_version) printf '${validInputs.EXPECTED_POLICY_VERSION}';;
      .runtime_contract.ranking_version) printf '${validInputs.EXPECTED_RANKING_VERSION}';;
      .runtime_contract.calculator_version) printf '${validInputs.EXPECTED_CALCULATOR_VERSION}';;
      *) return 1;;
    esac
  }\n`;
  const env = { ...process.env, ...validInputs };
  const execute = values => spawnSync(bash, ['--noprofile', '--norc', '-c', jqStub + script], { env: values, encoding: 'utf8' });
  const valid = execute(env);
  assert.equal(valid.status, 0, valid.stderr);
  for (const key of Object.keys(env).filter(key => key.startsWith('EXPECTED_'))) {
    for (const payload of ['$(printf INPUT_EXECUTED >&2)', '`printf INPUT_EXECUTED >&2`', '"; printf INPUT_EXECUTED >&2; #', 'version\nprintf INPUT_EXECUTED >&2']) {
      const result = execute({ ...env, [key]: payload });
      assert.notEqual(result.status, 0, `${key}: mismatched input accepted`);
      assert.doesNotMatch(result.stderr + result.stdout, /INPUT_EXECUTED/, `${key}: input executed`);
    }
  }
});
