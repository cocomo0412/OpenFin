# OpenFin 무료 MCP

운영자: cocomo0412. OAuth 없이 공개하는 읽기 전용 세금·공제 파일럿입니다.

## 범위

- `search`: 세금·공제 스냅샷 387개 중 검색, 최대 10개 반환
- `fetch`: 검색 결과 ID의 요약 및 공식 출처 조회
- `exports`: 데이터 기준일, 체크섬, 제공 범위 조회
- `/health`, `/ready`: 무료판 상태 확인

상품 비교·추천, 전체 금융 도메인 검색, 실시간 갱신은 제공하지 않습니다.
기존 전체 홈페이지와 원본 MCP 코드는 보존됩니다. 출처의 최신성은 재검증하지 않았으며 각 결과에 `not_revalidated`로 표시됩니다.

## Cloudflare GitHub 연결 설정

| 항목 | 값 |
|---|---|
| 저장소 | `cocomo0412/OpenFin` |
| 브랜치 | `main` |
| 루트 디렉터리 | `mcp` |
| Worker 이름 | `openfin` |
| Build command | `node scripts/build-free-catalog.mjs && npm run typecheck && node --experimental-strip-types --test tests/free-catalog.test.mjs` |
| Deploy command | `npx wrangler deploy --config wrangler.free.jsonc` |

무료판 설정에는 유료 CPU 상한, 유료 바인딩, AI API, 저장소 사용이 없습니다.
`wrangler.toml`은 원본 유료판 설정이므로 무료 배포에서 사용하지 마세요.
데이터는 배포 시 포함되어 요청 중 외부 JSON 다운로드가 없습니다.
Cloudflare 무료 일일 요청량과 CPU 제한은 그대로 적용되며 실제 배포 후 확인이 필요합니다.

## 검증

```sh
cd mcp
npm ci
node scripts/build-free-catalog.mjs
npm run typecheck
node --experimental-strip-types --test tests/*.test.mjs
npx wrangler deploy --config wrangler.free.jsonc --dry-run
npx wrangler dev --config wrangler.free.jsonc
# 다른 터미널
node scripts/smoke-free.mjs
```

배포 후 `MCP_URL=https://실제-Worker-주소/mcp` 환경변수로 `node scripts/smoke-free.mjs`를 실행합니다.
공식 MCP SDK 클라이언트로 초기 연결, 도구 목록, 검색, 조회, 미존재 ID, 입력 제한을 검사합니다.
로컬 검증 통과가 Cloudflare CPU 제한 충족이나 실제 서비스 배포 완료를 의미하지는 않습니다.

## 배포 상태

Cloudflare Free에 GitHub main 브랜치를 연결하고 배포 완료했습니다. MCP: https://openfin.cocomo0412.workers.dev/mcp (Streamable HTTP, 인증 없음). 상태: https://openfin.cocomo0412.workers.dev/health . 실제 주소에서 공식 SDK 연결·도구 목록·검색·조회·입력 제한 검사를 통과했습니다.
배포 후 확인한 버전: 1d2aa651-adcf-4e1d-ba28-d636da3f631e. 테스트 성공은 모든 부하에서 무료 한도 충족을 보장하지 않습니다.
