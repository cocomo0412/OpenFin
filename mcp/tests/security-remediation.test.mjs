import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import ts from "typescript";
import { consumeOwnerProof, expireOwnerProof, ownerProofReplayStore } from "../src/owner-proof-replay.ts";
import { ownerSessionTokenPayload, verifyOwnerSessionProof, registerRecommendOwnerPilotTool } from "../src/tools/recommend-owner-pilot.ts";
import { registerRecommendShadowTool } from "../src/tools/recommend-shadow.ts";
import { buildRecommendationCandidates } from "../src/tools/recommend.ts";
import { evaluateEligibility } from "../src/recommendation/policy.ts";

// The production transaction algorithm runs against a serialized storage double.
// Independent namespace clients below share the same backing object storage.
function storageDouble() {
  const values = new Map();
  let tail = Promise.resolve(), alarm;
  const tx = {
    async get(key) { return values.get(key); },
    async put(key, value) { values.set(key, value); },
    async delete(key) { return values.delete(key); },
    async setAlarm(value) { alarm = value; },
  };
  return { values, get alarm() { return alarm; }, transaction(fn) {
    const next = tail.then(() => fn(tx));
    tail = next.catch(() => {});
    return next;
  } };
}
function namespaceDouble() {
  const stores = new Map();
  return { stores, idFromName: name => name, get(id) {
    if (!stores.has(id)) stores.set(id, storageDouble());
    return { async fetch(request) {
      const { expiresAt } = await request.json();
      return new Response(null, { status: await consumeOwnerProof(stores.get(id), expiresAt) ? 204 : 409 });
    } };
  } };
}
const encode = value => Buffer.from(typeof value === "string" ? value : JSON.stringify(value)).toString("base64url");
async function hmac(secret, text) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return Buffer.from(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(text))).toString("base64url");
}
async function proofFixture(jti = crypto.randomUUID()) {
  const now = Math.floor(Date.now() / 1000);
  const args = { secret: "synthetic-fixture", domain: "deposit", asOf: "2026-10-06", sessionId: "fixture-session", generationId: "fixture-generation", candidateSetChecksum: "fixture-checksum", now };
  const header = encode({ alg: "HS256", typ: "OPENFIN_OWNER_PILOT" });
  const payload = encode(ownerSessionTokenPayload({ ...args, issuedAt: now, expiresAt: now + 60, jti }));
  return { ...args, proof: `${header}.${payload}.${await hmac(args.secret, `${header}.${payload}`)}` };
}

test("SEC-11: independent consumers consume a signed proof exactly once through the shared backend", async () => {
  const namespace = namespaceDouble();
  const proof = await proofFixture();
  const independent = await import("../src/tools/recommend-owner-pilot.ts?independent-consumer");
  const consumers = Array.from({ length: 12 }, (_, i) => (i % 2 ? independent.verifyOwnerSessionProof : verifyOwnerSessionProof)({ ...proof, replayStore: ownerProofReplayStore(namespace) }));
  const results = await Promise.all(consumers);
  assert.equal(results.filter(Boolean).length, 1);
  assert.equal(namespace.stores.size, 1);
  assert.match([...namespace.stores.keys()][0], /^[a-f0-9]{64}$/);
});

test("SEC-11: missing or failing storage never authenticates and invalid signatures never consume", async () => {
  const proof = await proofFixture();
  assert.equal(await verifyOwnerSessionProof(proof), false);
  assert.equal(await verifyOwnerSessionProof({ ...proof, replayStore: { consume: async () => { throw new Error("offline"); } } }), false);
  assert.equal(await verifyOwnerSessionProof({ ...proof, replayStore: { consume: async () => "true" } }), false);
  let calls = 0;
  assert.equal(await verifyOwnerSessionProof({ ...proof, secret: "wrong-fixture", replayStore: { consume: async () => { calls++; return true; } } }), false);
  assert.equal(calls, 0);
});

test("SEC-11: backend retention lasts until expiry and a delayed alarm preserves a newer claim", async () => {
  const storage = storageDouble();
  assert.equal(await consumeOwnerProof(storage, 1060, 1000000), true);
  assert.equal(await consumeOwnerProof(storage, 1090, 1020000), false);
  await expireOwnerProof(storage, 1030000);
  assert.equal(storage.values.get("expires_at"), 1060);
  assert.equal(await consumeOwnerProof(storage, 1120, 1070000), true);
  await expireOwnerProof(storage, 1080000);
  assert.equal(storage.values.get("expires_at"), 1120);
  await expireOwnerProof(storage, 1120000);
  assert.equal(storage.values.size, 0);
  assert.equal(await consumeOwnerProof(storage, 1000, 1000000), false);
  assert.equal(await consumeOwnerProof(storage, 1901, 1000000), false);
});

async function pilotHandler(register, withStore = true) {
  const proof = await proofFixture();
  const approval = { reviewer_signature_algorithm: "HMAC-SHA256" };
  const fields = ["approval_id", "domain", "mode", "generation_id", "candidate_set_checksum", "policy_version", "ranking_version", "calculator_version", "quality_suite_checksum", "approved_at", "expires_at", "reviewer", "reviewer_role", "reviewer_permission", "rollback_generation_id"];
  const signed = Object.fromEntries(fields.map(key => [key, approval[key]]).sort(([a], [b]) => a.localeCompare(b)));
  approval.reviewer_signature = `hmac-sha256:${await hmac(proof.secret, JSON.stringify(signed))}`;
  const candidate = { id: "good", title: "Good", type: "bank-product", provider: "BANK-A", term_months: 3, risk_level: "low", verification_status: "verified", freshness_status: "current", sales_status: "active", sales_verification_status: "verified_active", comparison_approved: true, recommendation_approved: true };
  const items = [candidate, { ...candidate, id: "wrong-provider", provider: "BANK-B" }, { ...candidate, id: "wrong-term", term_months: 12 }, { ...candidate, id: "wrong-liquidity", term_months: 6 }, { ...candidate, id: "wrong-risk", risk_level: "high" }];
  let handler, schema, loads = 0;
  register({
    server: { registerTool(_name, config, fn) { handler = fn; schema = config.inputSchema; } },
    env: { OWNER_PILOT_ENABLED: "true", OWNER_PILOT_SESSION_SECRET: proof.secret, OWNER_PILOT_REVIEWER_SIGNATURE_SECRET: proof.secret, ...(withStore ? { OWNER_PILOT_REPLAY_STORE: namespaceDouble() } : {}) },
    mcpResult: value => value, assertFinanceSafe: () => {},
    loadFinanceManifest: async () => ({ generation_id: proof.generationId, artifact_contract: { candidate_set_checksum: proof.candidateSetChecksum }, owner_pilot_approval_receipt: approval }),
    loadDetailedItemsForDomain: async () => { loads++; return items; },
    evaluateReleaseGate: () => ({ status: "ready", reasons: [] }), manifestChecksumContract: () => true,
    buildRecommendationCandidates, evaluateEligibility,
    rankCandidate: () => ({ score: 1, score_components: {}, ranking_key: [1] }), explainCandidate: () => ({}),
  });
  const context = schema.context.parse({ as_of: proof.asOf, constraints: { provider: "BANK-A", term_months: [3, 6] }, decision_context: { risk_capacity: "low", liquidity_requirement: { months: 3 } } });
  return { run: () => handler({ domain: "deposit", context, owner_session_id: proof.sessionId, owner_session_proof: proof.proof }), get loads() { return loads; } };
}

test("SEC-09: shadow handler preserves provider, term, risk and liquidity conditions", async () => {
  const result = await (await pilotHandler(registerRecommendShadowTool)).run();
  assert.equal(result.eligible_count, 1);
  assert.equal(result.excluded_count, 4);
  assert.deepEqual(result.reason_counts, { provider_failed: 1, risk_capacity_failed: 1, term_exceeds_liquidity_horizon: 2 });
});
test("SEC-09/11: authenticated owner handler filters conditions and denies a missing replay binding", async () => {
  const result = await (await pilotHandler(registerRecommendOwnerPilotTool)).run();
  assert.equal(result.status, "ready");
  assert.deepEqual(result.candidates.map(c => c.item_id), ["good"]);
  const missingStore = await pilotHandler(registerRecommendOwnerPilotTool, false);
  const denied = await missingStore.run();
  assert.equal(denied.status, "blocked");
  assert.ok(denied.reason_codes.includes("OWNER_REPLAY_STORE_UNAVAILABLE"));
  assert.equal(missingStore.loads, 0);
});

// Execute the actual local functions without starting a Cloudflare Worker.
const worker = readFileSync(new URL("../src/index.ts", import.meta.url), "utf8");
const ast = ts.createSourceFile("index.ts", worker, ts.ScriptTarget.Latest, true);
function functions(names, dependencies = {}) {
  const selected = ast.statements.filter(s => ts.isFunctionDeclaration(s) && names.includes(s.name?.text)).map(s => s.getText(ast)).join("\n");
  const js = ts.transpileModule(selected, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
  return new Function(...Object.keys(dependencies), `${js};return {${names.join(",")}};`)(...Object.values(dependencies));
}
const finance = functions(["isRecord", "financeNumber", "optionalFinanceNumber", "normalizeFinanceSnapshot", "financeMetric", "financeMetrics"], { assertFinanceSafe: () => {}, PERSONAL_FINANCE_POLICY_VERSION: "fixture" });
test("SEC-12: unknown values remain null through normalization while explicit zeros remain known", () => {
  const unknown = finance.financeMetrics(finance.normalizeFinanceSnapshot({}));
  assert.equal(unknown.net_worth.value, null);
  assert.ok(unknown.net_worth.missing_information.includes("liabilities"));
  const supplied = { liquid_assets_krw: 0, investment_assets_krw: 0, other_assets_krw: 0, liabilities: [], goals: [], monthly_net_income_krw: 3000000, essential_monthly_expenses_krw: 1000000, discretionary_monthly_expenses_krw: 0 };
  const known = finance.financeMetrics(finance.normalizeFinanceSnapshot(supplied));
  assert.equal(known.net_worth.value, 0);
  assert.equal(known.debt_service_ratio.value, 0);
  assert.equal(known.monthly_surplus.value, 2000000);
  assert.equal(known.goal_funding_gap.value, 0);
  const partial = finance.financeMetrics(finance.normalizeFinanceSnapshot({ ...supplied, liabilities: [{ balance_krw: 10000000 }] }));
  assert.equal(partial.net_worth.value, -10000000);
  assert.equal(partial.debt_service_ratio.value, null);
  assert.equal(partial.monthly_surplus.value, null);
  assert.deepEqual(partial.debt_service_ratio.missing_information, ["liabilities[0].monthly_payment_krw"]);
  const zeroPayment = finance.financeMetrics(finance.normalizeFinanceSnapshot({ ...supplied, liabilities: [{ balance_krw: 10000000, monthly_payment_krw: 0 }] }));
  assert.equal(zeroPayment.debt_service_ratio.value, 0);
  assert.equal(zeroPayment.monthly_surplus.value, 2000000);
  assert.deepEqual(zeroPayment.debt_service_ratio.missing_information, []);
  const singleton = finance.financeMetrics(finance.normalizeFinanceSnapshot({ ...supplied, liabilities: { balance_krw: 100, monthly_payment_krw: 0 } }));
  assert.equal(singleton.net_worth.value, -100);
  assert.equal(singleton.debt_service_ratio.value, 0);
  assert.equal(finance.financeMetrics(finance.normalizeFinanceSnapshot({ ...supplied, liabilities: null })).net_worth.value, null);
});
test("SEC-12: unreported funding, coverage and expenses cannot become zero automatically", () => {
  const metrics = finance.financeMetrics(finance.normalizeFinanceSnapshot({ monthly_net_income_krw: 100, essential_monthly_expenses_krw: 50, liabilities: [], goals: [{ target_amount_krw: 100 }], insurance_coverage: { required_coverage_krw: 100 } }));
  assert.equal(metrics.monthly_surplus.value, null);
  assert.equal(metrics.goal_funding_gap.value, null);
  assert.equal(metrics.insurance_coverage_gap.value, null);
});
test("SEC-10: server opt-in is required and arbitrary request header content never enters diagnostics", () => {
  const budget = { snapshot: () => ({ bytes: 0 }) };
  const { requestDiagnostics } = functions(["requestDiagnostics"], { DIAGNOSTICS_HEADER: "x-openfin-diagnostics", diagnosticNow: () => 0, searchCacheBudget: budget, exactFetchCacheBudget: budget, artifactCacheBudget: budget });
  const marker = "sensitive-fixture-only";
  const headers = Object.fromEntries(["request-id", "case-id", "query", "tool", "query-class"].map(name => [`x-openfin-${name}`, marker]));
  const request = new Request("https://fixture.invalid/mcp", { headers: { ...headers, "x-openfin-diagnostics": "1" } });
  assert.equal(requestDiagnostics(request, {}), undefined);
  const result = requestDiagnostics(request, { OPENFIN_DIAGNOSTICS_ENABLED: "true" });
  assert.ok(result);
  assert.equal(JSON.stringify(result).includes(marker), false);
  assert.equal(Object.hasOwn(result, "query"), false);
  assert.match(result.request_id, /^[a-f0-9-]{36}$/);
  assert.equal(result.tool, null);
});
