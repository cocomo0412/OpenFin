# OpenFin

## 개발과 운영 매뉴얼

자료 구축과 갱신은 공식 API 요청을 원칙으로 합니다. API 오류나 미제공 자료를 웹 수집으로 자동 대체하지 않습니다.

- [개발 매뉴얼](handbook/development.md): 환경 준비, 데이터 계약, 검사, 리뷰와 배포
- [운영 매뉴얼](handbook/operations.md): 되도록 7일 간격의 정기 갱신 목표, 실패 처리, 서비스 반영과 복구

정기 갱신은 2026년 10월 7일을 기준 회차로 하며 다음 목표일은 10월 14일입니다. 실행 시각은 미정이고 자동 실행 예약은 아직 설정하지 않았습니다. 웹 자료 현황은 현재 manifest, MCP 제공 범위와 자료 기준일은 운영 서버의 `exports`로 각각 확인합니다.

## cocomo0412 운영 안내

홈페이지에서는 전체 금융 분야를 탐색할 수 있습니다. 무료 Cloudflare MCP는 세금·공제 자료에 대한 `search`, `fetch`, `exports`만 제공합니다. 현재 항목 수와 카탈로그 기준일은 [운영 MCP 메타데이터](https://openfin.cocomo0412.workers.dev/health) 또는 `exports`에서 확인합니다. 이 메타데이터 응답은 MCP 연결·도구 호출 성공을 보증하는 검사는 아닙니다. [현재 MCP 안내](mcp/README.md)와 [무료판 배포 설정](mcp/FREE-DEPLOYMENT.md)을 사용하세요. 기본 `mcp/wrangler.toml`도 무료판이며, 전체판 배포 workflow는 비활성화했습니다.

OpenFin은 금융 도메인 지식과 상품 데이터를 같은 출처·관계 계약으로 공개하는 읽기 전용 탐색기와 Cloudflare Remote MCP입니다.

웹은 분야별 API 수집 자료와 출처·날짜를 보존한 기존 자료를 제공합니다. 무료 MCP는 공식기관 웹 문서를 바탕으로 정리한 세금·공제 카탈로그를 배포 번들에 포함합니다. 웹의 API 수집일과 MCP 카탈로그 기준일은 별개이며, 웹 갱신만으로 MCP 자료가 바뀌지 않습니다. 무료 MCP는 전체 금융상품 검색·비교·추천이나 실시간 갱신을 제공하지 않습니다. 과거 전체판 설계는 [보관 문서](reports/archive/mcp-full-edition-readme.md)로 분리했습니다.

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
npm test
cd mcp && npm run test:mutation
```

`knowledge:track-sources`는 API와 웹 출처를 함께 점검하는 기존 도구로 보존하지만 기본 정기 절차에서는 제외합니다. 검증된 공식 API 대상에 한정하거나 사용자가 별도로 명시한 예외 범위에서만 사용합니다. 기본 모드도 외부 요청을 수행하며, 쓰기 모드는 상태·확인 이력을 변경합니다. 상세 범위는 [운영 매뉴얼](handbook/operations.md)을 따릅니다.

인증형 공식 API는 로컬 `.env`와 GitHub Actions secret의 `FINLIFE_API_KEY`, `DATA_GO_KR_SERVICE_KEY`를 사용합니다. 키가 없으면 해당 출처는 `secret-required`로 남고, 키 값은 URL·상태·영수증에 저장되지 않습니다.

## Deployment

현재 홈페이지는 GitHub Pages의 main /docs를 사용합니다. 무료 MCP는 GitHub Actions의 `OpenFin MCP pipeline`에서 검증한 번들을 `deploy-free.mjs`로 기존 Worker에 업로드합니다. Cloudflare 자체 Git 빌드와 일반 `wrangler deploy`를 현재 운영 배포 경로로 사용하지 않습니다. 기본 wrangler.toml도 같은 무료 Worker를 가리키며 유료 CPU 설정은 없습니다. 상세 절차는 [무료판 배포 안내](mcp/FREE-DEPLOYMENT.md)를 따릅니다.

전체판 release/staging/diagnosis/live-regression workflow의 모든 job은 비활성화되어 있습니다. 비교·추천 기능을 무료판에 배포하지 않습니다. 배포 이전에는 mcp에서 `npm run typecheck`, 무료 카탈로그 테스트, Wrangler dry-run을 실행합니다. 상세 사항은 [무료 배포 안내](mcp/FREE-DEPLOYMENT.md)를 참조하세요.

## API collection

[API 수집 안내](API-COLLECTION.md)를 참조하세요. Finlife 예금·적금 수집기는 은행/저축은행의 모든 페이지를 순회하고 20개 제한 없이 검토 후보를 만듭니다. 추가 공공데이터 15개와 ECOS는 Python 표준 라이브러리 수집기를 사용합니다. 인증값은 .env/비밀 설정에만 둡니다. 수집 결과는 검토 전 공개 지식으로 자동 승격되지 않습니다.
