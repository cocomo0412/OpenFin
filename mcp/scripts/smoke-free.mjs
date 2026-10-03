import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const endpoint = process.env.MCP_URL ?? "http://127.0.0.1:8787/mcp";
const client = new Client({ name: "openfin-free-smoke", version: "1.0.0" });
try {
  await client.connect(new StreamableHTTPClientTransport(new URL(endpoint)));
  assert.equal(client.getServerVersion()?.version, "1.0.2");
  const serverInstructions = client.getInstructions();
  assert.equal(typeof serverInstructions, "string", "Server must publish instructions during initialization");
  const instructions = serverInstructions.replace(/\s+/gu, " ");
  assert.ok(instructions.includes("일반적인 개념·제도 설명"));
  assert.ok(instructions.includes("현재 금액·공제 한도·신청기한·자격"));
  // Check the instructions actually served over MCP, not an imported local copy.
  assert.match(instructions, /OpenFin 자료를 설명의 바탕[^.!?]*추가 검색[^.!?]*현재 적용 조건[^.!?]*보완[^.!?]*확인/u,
    "Server must distinguish OpenFin evidence from current-condition checks");
  assert.match(instructions, /공식기관 웹 문서[^.!?]*정리한 참고자료/u,
    "Server must identify the catalog as web-document reference material");
  assert.match(instructions, /공식 API 수집 근거[^.!?]*명시된 경우에만[^.!?]*공식기관 API 자료/u,
    "Server must reserve the API label for explicit API evidence");
  assert.match(instructions, /실제 확인 없이[^.!?]*추가 확인했다[^.!?]*말하지 마세요/u,
    "Server must forbid unsupported follow-up verification claims");
  const { tools } = await client.listTools();
  assert.deepEqual(tools.map(t => t.name).sort(), ["exports", "fetch", "search"]);
  const query = await client.callTool({ name: "search", arguments: { query: "월세", limit: 3 } });
  assert.ok(!query.isError);
  const result = JSON.parse(query.content[0].text);
  assert.equal(result.results.length, 3);
  assert.equal(result.recommendation_enabled, false);
  assert.equal(Object.hasOwn(result, "basis_date"), false);
  assert.equal(Object.hasOwn(result, "limitations"), false);
  assert.ok(result.answer_guidance.presentation.includes('정형적인 머리말·꼬리말'));
  assert.ok(result.results.every(item => Array.isArray(item.source_basis_dates) && item.freshness === "not_revalidated"));
  const detail = await client.callTool({ name: "fetch", arguments: { id: "credit.monthly-rent" } });
  assert.ok(!detail.isError);
  assert.ok(JSON.parse(detail.content[0].text).item.source_urls.length > 0);
  assert.equal(Object.hasOwn(JSON.parse(detail.content[0].text), "basis_date"), false);
  assert.deepEqual(JSON.parse(detail.content[0].text).answer_guidance, result.answer_guidance);
  const metadata = JSON.parse((await client.callTool({ name: "exports", arguments: {} })).content[0].text);
  assert.ok(metadata.basis_date);
  const source = readFileSync(new URL('../../docs/opentax/korea-tax-ontology-2026.json', import.meta.url));
  assert.equal(metadata.source_sha256, createHash('sha256').update(source).digest('hex'), 'Deployed catalog must match this checkout');
  assert.equal(metadata.freshness, "not_revalidated");
  assert.deepEqual(metadata.answer_guidance, result.answer_guidance);
  const missing = await client.callTool({ name: "fetch", arguments: { id: "missing" } });
  assert.equal(missing.isError, true);
  const invalid = await client.callTool({ name: "search", arguments: { query: "x".repeat(121) } });
  assert.equal(invalid.isError, true);
  const denied = await fetch(endpoint, { method: "POST", headers: { Origin: "https://invalid.example", "Content-Type": "application/json" }, body: "{}" });
  assert.equal(denied.status, 403);
  const huge = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: " ".repeat(9000) });
  assert.equal(huge.status, 413);
  console.log(JSON.stringify({ status: "passed", endpoint, tools: tools.map(t => t.name), records: metadata.item_count, search: result.results.length }));
} finally { await client.close(); }
