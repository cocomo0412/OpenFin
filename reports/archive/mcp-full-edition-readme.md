# 과거 전체판 MCP 설계 기록 — 현재 운영 안내 아님

2026-10-07에 이전 README를 보존했습니다. 아래의 Paid 요금제·전체 금융 manifest·Immutable Release 설명은 현재 무료 MCP에 적용되지 않습니다. 현행 기능과 배포 절차는 [현재 MCP README](../../mcp/README.md)를 따릅니다. 아래는 당시 문서 원문입니다.

# openfin-mcp

`openfin-mcp` is a Cloudflare Worker Remote MCP adapter for the OpenFin ontology snapshot.

The Worker is bounded to the OpenFin personal-finance contexts (`tax`, `public-support`, `financial-products`, `financial-reference`, and `life-context`). It reads only the OpenFin Pages manifest and verifies artifact checksums before treating data as ready. `/health` is liveness; `/ready` is data readiness and returns HTTP 503 while the release gate is degraded.

It exposes read-only MCP tools for ChatGPT and other remote MCP clients:

- `search`: search tax, deduction, support, local-government support, card, bank, insurance, filing, concept, deadline, and source nodes.
- `fetch`: fetch one ontology item; the default response contains summary and sources, while `include` opts into provenance, relations, or the raw item.
- `exports`: list ontology exports loaded by the MCP adapter.
- Optional provenance artifacts add source registry/status, field provenance, coverage, and relationship metadata without changing the legacy export contract. Missing artifacts are ignored for backward compatibility.

The Worker reads the canonical manifest from GitHub Pages:

```text
https://cocomo0412.github.io/OpenFin/opentax/finance-ontology-manifest.json
```

The manifest can point to separate ontology JSON files, for example:

```text
https://cocomo0412.github.io/OpenFin/opentax/korea-tax-ontology-2026.json
https://cocomo0412.github.io/OpenFin/opentax/korea-local-government-supports-ontology-2026.json
https://cocomo0412.github.io/OpenFin/opentax/korea-card-products-ontology-2026.json
https://cocomo0412.github.io/OpenFin/opentax/korea-deposit-products-ontology-2026.json
https://cocomo0412.github.io/OpenFin/opentax/korea-saving-products-ontology-2026.json
https://cocomo0412.github.io/OpenFin/opentax/korea-loan-products-ontology-2026.json
https://cocomo0412.github.io/OpenFin/opentax/korea-insurance-products-ontology-2026.json
```

## Local Development

```sh
cd mcp
npm install
npm run dev
```

Local MCP endpoint:

```text
http://localhost:8787/mcp
```

Test with MCP Inspector:

```sh
npx @modelcontextprotocol/inspector@latest
```

## Deploy

현재 Worker의 요청 CPU 상한은 `wrangler.toml`의 1000ms이며 Workers Paid 용량이 필요합니다. Free 플랜은 실제 회귀에서 CPU 한도 초과가 확인됐고, 이 설정의 업로드를 오류 `100328`로 거부합니다. 요금제 변경은 배포 workflow가 자동 수행하지 않으며 소유자의 별도 승인이 필요합니다.

Production 배포는 GitHub Actions의 `OpenFin Immutable Release` 수동 실행만 허용합니다. 이 workflow가 immutable Pages/Worker preview, health/ready, tools schema, 120-case regression과 parity를 검증한 뒤 정확한 Worker version과 Pages artifact를 승격합니다. 로컬 `wrangler deploy` 경로는 운영 release 계약을 우회하므로 제공하지 않습니다.

`npm run verify:release`는 manifest와 release gate를 로컬에서 읽기 전용으로 검사합니다. 이는 production 배포 또는 live 검증 증거가 아닙니다.

The deployed MCP endpoint will be:

```text
https://openfin-mcp.<cloudflare-account>.workers.dev/mcp
```

## ChatGPT Connector

Register the deployed `/mcp` URL as a custom MCP connector in ChatGPT.

Recommended first deployment is public and read-only. If write tools are added
later, add OAuth or Cloudflare Access before exposing them.

## Finance Product Imports

Finance products are split from the tax ontology because product values change
frequently. Use the official importer when a FinLife API key is available:

```sh
FINLIFE_API_KEY=... python3 ontology/scripts/import_finance_products.py
python3 ontology/scripts/verify_openfin_release.py --build
```

The generated product nodes must keep provider, product code, sale status,
collected date, source URLs, and source basis dates so stale or ended products
can be checked later.
