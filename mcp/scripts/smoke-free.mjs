import assert from "node:assert/strict";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const endpoint = process.env.MCP_URL ?? "http://127.0.0.1:8787/mcp";
const client = new Client({ name: "openfin-free-smoke", version: "1.0.0" });
try {
  await client.connect(new StreamableHTTPClientTransport(new URL(endpoint)));
  const { tools } = await client.listTools();
  assert.deepEqual(tools.map(t => t.name).sort(), ["exports", "fetch", "search"]);
  const query = await client.callTool({ name: "search", arguments: { query: "월세", limit: 3 } });
  assert.ok(!query.isError);
  const result = JSON.parse(query.content[0].text);
  assert.equal(result.results.length, 3);
  assert.equal(result.recommendation_enabled, false);
  const detail = await client.callTool({ name: "fetch", arguments: { id: "credit.monthly-rent" } });
  assert.ok(!detail.isError);
  assert.ok(JSON.parse(detail.content[0].text).item.source_urls.length > 0);
  const missing = await client.callTool({ name: "fetch", arguments: { id: "missing" } });
  assert.equal(missing.isError, true);
  const invalid = await client.callTool({ name: "search", arguments: { query: "x".repeat(121) } });
  assert.equal(invalid.isError, true);
  const denied = await fetch(endpoint, { method: "POST", headers: { Origin: "https://invalid.example", "Content-Type": "application/json" }, body: "{}" });
  assert.equal(denied.status, 403);
  const huge = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: " ".repeat(9000) });
  assert.equal(huge.status, 413);
  console.log(JSON.stringify({ status: "passed", endpoint, tools: tools.map(t => t.name), records: result.item_count, search: result.results.length }));
} finally { await client.close(); }
