# OpenFin 무료 MCP

현재 운영 서버는 Cloudflare Worker `openfin`의 `free-tax-pilot`입니다. 세금·공제 카탈로그를 공개 읽기 전용으로 제공합니다.

- 연결 주소: <https://openfin.cocomo0412.workers.dev/mcp>
- 연결 방식: Streamable HTTP, 인증 없음
- `search`: 세금·공제 키워드 검색, 최대 10개 결과
- `fetch`: 검색 결과 ID로 요약과 공식 출처 조회
- `exports`: 제공 범위, 항목 수, 카탈로그 기준일·버전·체크섬 확인

현재 항목 수와 자료 기준일은 [운영 서버 메타데이터](https://openfin.cocomo0412.workers.dev/health) 또는 `exports`로 확인합니다. 건수를 문서에 고정해서 운영값 대신 사용하지 않습니다. 전체 금융상품 검색·비교·추천과 실시간 자료 갱신은 제공하지 않습니다. 전체 분야는 [웹 탐색기](https://cocomo0412.github.io/OpenFin/explorer.html)에서 확인합니다.

## 자료 출처와 반영 시점

무료 MCP 카탈로그는 공식기관 웹 문서를 바탕으로 정리한 기존 세금·공제 자료입니다. 이를 API 수집본으로 재표기하지 않습니다. 카탈로그 기준일과 항목별 원문 기준일·제도 적용일은 서로 다릅니다.

`scripts/build-free-catalog.mjs`는 `../docs/opentax/korea-tax-ontology-2026.json`에서 `src/free-catalog.json`을 생성합니다. `src/free.ts`와 `src/free-catalog.ts`가 이 자료를 정적으로 포함하며, 서버 배포 시 반영됩니다. 요청마다 Pages manifest나 외부 원문을 내려받지 않습니다. 웹의 API 수집일·전체 건수를 MCP의 날짜·건수로 대체하지 않습니다.

`/health`와 `/ready`는 현재 동일한 무료판 메타데이터를 반환합니다. 이 HTTP 응답만으로 MCP 연결이나 도구 호출까지 검증됐다고 판단하지 않습니다. `/mcp`는 POST 전송을 사용하므로 브라우저 GET의 405 응답은 정상적인 메서드 제한입니다.

## 로컬 개발과 검사

저장소 루트에서 다음을 실행합니다.

```sh
cd mcp
npm ci
npm run build:free
npm run typecheck
node --experimental-strip-types --test tests/free-catalog.test.mjs tests/free-search.test.mjs
npm run dev
```

로컬 연결 주소는 `http://localhost:8787/mcp`입니다. `build:free`는 카탈로그 파일을 다시 생성하므로 원자료 변경 여부를 검토해야 합니다.

## 배포

현재 운영 경로는 GitHub Actions `OpenFin MCP pipeline`과 `scripts/deploy-free.mjs`입니다. `wrangler.toml`과 `wrangler.free.jsonc`는 무료판을 가리키며 Paid CPU 설정은 사용하지 않습니다. 전체판 Immutable Release 등의 workflow는 비활성화되어 있습니다. 상세 검증·배포·복구 절차는 [FREE-DEPLOYMENT.md](FREE-DEPLOYMENT.md)를 따릅니다.

홈페이지 표시와 문서만 변경하면 Worker 번들을 다시 배포할 필요는 없습니다. 단, 현재 pipeline의 `mcp/**` 경로 필터에는 이 README도 포함되므로 원격 반영 시 자동 배포 실행 범위를 별도로 확인해야 합니다. MCP 코드·설정·의존성·번들 원자료가 바뀌면 MCP 검증과 배포를 포함합니다.

이전 전체판의 manifest 로딩·Paid·비교 및 추천 설계는 [과거 설계 기록](../reports/archive/mcp-full-edition-readme.md)에 보존했습니다. 현행 무료판 운영 절차로 사용하지 않습니다.
