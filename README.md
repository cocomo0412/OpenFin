# OpenFin

## cocomo0412 운영 안내

홈페이지: <https://cocomo0412.github.io/OpenFin/>. 무료 Cloudflare MCP는 세금·공제 387개에 대한 `search`, `fetch`, `exports`만 제공합니다. MCP 주소는 <https://openfin.cocomo0412.workers.dev/mcp>이며, 전체 금융상품 비교·추천 MCP는 무료판에 포함되지 않습니다. [무료판 배포 설정](mcp/FREE-DEPLOYMENT.md)을 사용하세요. 기본 `mcp/wrangler.toml`도 무료판이며, 전체판 배포 workflow는 비활성화했습니다.

OpenFin은 금융 도메인 지식과 상품 데이터를 같은 출처·관계 계약으로 공개하는 읽기 전용 탐색기와 Cloudflare Remote MCP입니다.

범위 결정은 개인 금융 플랫폼 전체를 하나의 추천기로 만드는 것이 아니라, `tax`, `public-support`, `financial-products`, `financial-reference`, `life-context` bounded context를 각각 출처·신선도·공개등급으로 운영하는 방식입니다. 현재 공개 기능은 조회·탐색 중심이며 예금·적금 비교는 제한 파일럿, 추천은 release gate와 현재 배포 세대 generation-bound 120/120 live regression을 통과하기 전까지 fail-closed입니다. 최상위 `release_status`는 호환용 deprecated alias이고, 외부 상태 판단은 `core_search_status`, `comparison_status`, `recommendation_status`를 사용합니다.

- 사이트: <https://cocomo0412.github.io/OpenFin/>
- MCP: <https://openfin.cocomo0412.workers.dev/mcp> (Streamable HTTP, 인증 없음, 공개 읽기 전용)
- 운영자 및 프로젝트 저작권: cocomo0412

## Source of truth

원본 지식은 `knowledge/`에 금융 의미를 기준으로 배치합니다. `10-tax`, `20-public-support`, `30-financial-products`, `40-financial-reference`, `50-life-context`, `90-sources` 같은 도메인 폴더가 분류 체계입니다. `taxonomy/`, `ontology/`, `topology/` 폴더는 만들지 않습니다.

- 사람이 검토하는 규칙·개념·용어·시나리오는 Markdown으로 관리합니다.
- 반복 구조의 상품·지원사업 대량 데이터는 JSONL로 관리합니다.
- 각 항목은 안정적인 `id`, `type`, `relations`, `provenance`를 가집니다.
- 모든 외부 사실은 `source_id`, 원본 `original_url`, 원본 레코드/locator, 수집·검토시각, freshness 상태와 체크섬을 기록합니다.
- `90-sources/`에는 발행기관·공식 URL·접근방식·갱신 SLA·이용조건을 기록합니다. 비밀키와 토큰은 저장하지 않습니다.
- 출처 확인 실패나 체크섬 충돌은 기존 데이터를 삭제하거나 추천으로 승격하지 않고 `stale`, `unreachable`, `conflict`, `reference_only`로 fail-closed 처리합니다.

`schemas/`는 entity/source/provenance/relation 계약을 정의하고, `evidence/source-receipts/YYYY-MM/`에는 원본 콘텐츠 대신 갱신 확인 결과를 누적합니다. 산출물은 결정적 빌드로 `docs/opentax/`에 생성됩니다.

## Local commands

```sh
npm ci
npm run knowledge:build
npm run knowledge:schema-validate
npm run knowledge:validate
npm run knowledge:derive-quality:check
npm run knowledge:track-sources -- --dry-run --report-dir .reports/source-tracking
npm test
cd mcp && npm run test:mutation
```

`knowledge:track-sources`는 기본적으로 읽기 전용입니다. 로컬 상태·영수증을 저장하려면 `npm run knowledge:track-sources:write`를 명시적으로 사용합니다. 사람이 검토하기 전에는 원본 지식이나 추천 설정을 자동 변경하지 않습니다.

인증형 공식 API는 로컬 `.env`와 GitHub Actions secret의 `FINLIFE_API_KEY`, `DATA_GO_KR_SERVICE_KEY`를 사용합니다. 키가 없으면 해당 출처는 `secret-required`로 남고, 키 값은 URL·상태·영수증에 저장되지 않습니다.

## Deployment

현재 홈페이지는 GitHub Pages의 main /docs를 사용합니다. Cloudflare Git 연동은 mcp를 루트로 사용하고 `npm run deploy` 또는 `npx wrangler deploy --config wrangler.free.jsonc`를 실행합니다. 기본 wrangler.toml도 같은 무료 Worker를 가리킵니다. 유료 CPU 설정은 없습니다.

전체판 release/staging/diagnosis/live-regression workflow의 모든 job은 비활성화되어 있습니다. 비교·추천 기능을 무료판에 배포하지 않습니다. 배포 이전에는 mcp에서 `npm run typecheck`, 무료 카탈로그 테스트, Wrangler dry-run을 실행합니다. 상세 사항은 [무료 배포 안내](mcp/FREE-DEPLOYMENT.md)를 참조하세요.

## API collection

[API 수집 안내](API-COLLECTION.md)를 참조하세요. Finlife 예금·적금 수집기는 은행/저축은행의 모든 페이지를 순회하고 20개 제한 없이 검토 후보를 만듭니다. 추가 공공데이터 15개와 ECOS는 Python 표준 라이브러리 수집기를 사용합니다. 인증값은 .env/비밀 설정에만 둡니다. 수집 결과는 검토 전 공개 지식으로 자동 승격되지 않습니다.
