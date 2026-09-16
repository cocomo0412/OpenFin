/// <reference path="../free-env.d.ts" />
import { createMcpHandler } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { freeMetadata, searchFree, fetchFree } from "./free-catalog.ts";

const annotations = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
const result = (value: object, isError = false) => ({ content: [{ type: "text" as const, text: JSON.stringify(value) }], isError });
const allowedOrigins = new Set(["https://cocomo0412.github.io", "https://chatgpt.com", "https://claude.ai", "http://localhost:6274", "http://127.0.0.1:6274"]);

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    if (origin && origin !== url.origin && !allowedOrigins.has(origin)) return new Response("Origin not allowed", { status: 403 });
    const cors = { "Access-Control-Allow-Origin": origin ?? "*", "Access-Control-Allow-Methods": "POST, GET, OPTIONS", "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version", "Vary": "Origin" };
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (url.pathname === "/" || url.pathname === "/health" || url.pathname === "/ready") {
      return Response.json({ status: "ready", ...freeMetadata, mcp_endpoint: "/mcp", authentication: "none" }, { headers: cors });
    }
    if (url.pathname !== "/mcp") return new Response("Not found", { status: 404 });
    if (request.method !== "POST") return new Response("Use MCP Streamable HTTP POST", { status: 405, headers: { ...cors, Allow: "POST, OPTIONS" } });
    if (!request.headers.get("Content-Type")?.includes("application/json")) return new Response("Expected JSON", { status: 415 });
    const reader = request.body?.getReader();
    if (!reader) return new Response("Missing body", { status: 400 });
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) { await reader.cancel(); return new Response("Request too large", { status: 413 }); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const boundedRequest = new Request(request.url, { method: "POST", headers: request.headers, body: bytes, signal: request.signal });
    const server = new McpServer({ name: "openfin-free", version: "1.0.0" }, { instructions: freeMetadata.limitations });
    server.registerTool("search", { description: "세금·공제 무료판 스냅샷 검색. 상품 비교·추천이나 최신성 보장은 제공하지 않습니다.", annotations,
      inputSchema: { query: z.string().trim().min(1).max(120), limit: z.number().int().min(1).max(10).optional() } },
      async ({ query, limit }) => result(searchFree(query, limit)));
    server.registerTool("fetch", { description: "search에서 반환한 세금·공제 ID의 요약과 공식 출처 조회. 전체 조건은 공식 출처에서 확인하세요.", annotations,
      inputSchema: { id: z.string().min(1).max(200) } }, async ({ id }) => {
      const item = fetchFree(id);
      return item ? result({ ...freeMetadata, item }) : result({ error: "NOT_FOUND", message: "이 ID는 세금·공제 무료판 범위에 없습니다." }, true);
    });
    server.registerTool("exports", { description: "무료판 범위·데이터 기준일·제한과 전체 홈페이지 주소 조회.", annotations, inputSchema: {} }, async () => result(freeMetadata));
    try {
      const response = await createMcpHandler(server, { route: "/mcp", enableJsonResponse: true })(boundedRequest, env, ctx);
      const headers = new Headers(response.headers);
      for (const [key, value] of Object.entries(cors)) headers.set(key, value);
      return new Response(response.body, { status: response.status, headers });
    } finally { await server.close(); }
  },
} satisfies ExportedHandler<Env>;
