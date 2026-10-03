# OpenFin 무료 MCP

운영자: cocomo0412. OAuth 없이 공개하는 읽기 전용 세금·공제 파일럿입니다.

## 범위

- `search`: 빌드한 세금·공제 카탈로그에서 검색, 최대 10개 반환 (현재 건수는 `exports.item_count`)
- `fetch`: 검색 결과 ID의 요약 및 공식 출처 조회
- `exports`: 데이터 기준일, 체크섬, 제공 범위 조회
- `/health`, `/ready`: 무료판 상태 확인

상품 비교·추천, 전체 금융 도메인 검색, 실시간 갱신은 제공하지 않습니다.
기존 전체 홈페이지와 원본 MCP 코드는 보존됩니다. 출처의 최신성은 재검증하지 않았으며 각 결과에 `not_revalidated`로 표시됩니다.

## 답변과 근거 표시

일반 설명은 검색된 내용과 공식 출처를 중심으로 제공합니다. 카탈로그 전체 기준일과 운영 제한은 `exports` 및 상태 경로에 남기며, 모든 검색·조회 응답에 반복해서 넣지 않습니다. 개별 결과의 원자료 날짜와 검증 상태는 그대로 유지합니다.

서버 instructions는 운영 경고를 상투적으로 덧붙이지 않도록 안내하되, 현재 한도·신청기한·자격처럼 시점에 민감한 조건은 공식 근거를 확인하거나 해당 조건의 불확실성을 구체적으로 밝히도록 합니다. 일반 설명 요청에는 개인별 급여·주거·계약 정보를 자동으로 요구하지 않습니다. 실제 답변 문장은 연결한 AI가 생성하므로 문구를 강제하거나 반복이 전혀 없음을 보장하지는 않습니다.

1.0.2부터 `search`, `fetch`, `exports` 결과에 동일한 `answer_guidance`를 포함합니다. 초기 연결 instructions를 전달하지 않는 클라이언트나 메타데이터를 먼저 조회하는 흐름에서도 카탈로그 날짜를 모든 항목의 적용일로 해석하지 않도록 합니다. 원자료 날짜·검증 상태는 보존하며, 실제 추가 확인 없이 최신 자료를 확인했다고 표현하지 않습니다. `exports`는 사용자가 범위·기준일·검증 여부를 물었을 때 사용하는 도구로 설명합니다.

## GitHub Actions 직접 배포 설정

| 항목 | 값 |
|---|---|
| 저장소 | `cocomo0412/OpenFin` |
| 브랜치 | `main` |
| 루트 디렉터리 | `mcp` |
| Worker 이름 | `openfin` |
| 빌드 실행 환경 | GitHub Actions / Ubuntu / Node 24 |
| Build command | `npx wrangler deploy --config wrangler.free.jsonc --dry-run --outfile <bundle>` |
| Deploy command | `node scripts/deploy-free.mjs <bundle>` |
| 인증 | GitHub 저장소 secret `CLOUDFLARE_API_TOKEN` |
| Cloudflare 계정 | `ac086a8cc9083647e67db51e8310f34b` |
| Cloudflare 자체 Git 빌드 | 직접 배포 전 해당 Worker의 저장소 연결 해제 필요 |

## 푸시부터 운영 검증까지

`main`에 푸시하면 GitHub Actions에서 검증·빌드하고 Wrangler가 생성한 multipart 번들을 Cloudflare 공식 Worker 업로드 API로 배포합니다. Cloudflare Workers Builds의 초기화 단계를 사용하지 않습니다. 홈페이지는 GitHub Pages의 `main /docs` 배포이며 MCP Worker와 별도입니다.

GitHub Actions의 **OpenFin MCP pipeline** (`.github/workflows/deploy-mcp.yml`)이 배포를 담당합니다.

1. Node 24와 lockfile로 의존성을 설치하고 카탈로그 생성·타입 검사·무료 MCP 테스트·Wrangler dry-run을 실행합니다. 관련 PR에서는 검증만 실행합니다.
2. 검증을 통과한 main 커밋만 배포합니다. 배포 직전에 현재 main HEAD인지 확인하여 이미 교체된 커밋의 재배포를 막습니다. 배포 토큰은 이 단계에만 전달합니다.
3. 업로드 성공 후 운영 URL에 공식 MCP SDK로 연결합니다. 버전·도구 목록·검색·조회·응답 안내·원자료 체크섬·입력 제한을 검사하며 전파 지연에는 최대 5회 재시도합니다.

GitHub 자체 토큰은 소스 읽기 권한만 사용합니다. Cloudflare 토큰은 `openfin`에 한정한 `Individual Workers Editor` 권한으로 발급하고 GitHub Actions secret에 저장합니다. 저장소 파일·문서·로그에 토큰을 기록하지 않습니다. Cloudflare 기존 Git 빌드 연결은 해제하여 중복 배포를 방지합니다.

`deploy-free.mjs`는 기존 Worker의 workers.dev 활성 상태를 확인하고 `/accounts/{account_id}/workers/scripts/openfin`에 PUT한 뒤 주소 설정이 유지되었는지 검사합니다. 도메인·경로·스케줄을 변경하지 않으며 최초 Worker 생성용이 아닙니다. 일반 `wrangler deploy`는 코드 업로드 뒤 계정 전체의 `/workers/subdomain`을 조회하므로 개별 Worker 토큰으로 권한 오류가 날 수 있습니다. 이를 무시하거나 계정 전체 권한을 추가하지 않고, 필요한 Worker API만 호출합니다. 업로드 API 성공과 후속 운영 MCP 검사가 모두 통과해야 배포 성공입니다.

실패·시간 초과는 Actions에 실패로 표시합니다. 기존 Worker가 응답하거나 홈페이지 배포가 성공했다는 이유로 MCP의 새 배포를 성공 처리하지 않습니다. 동일 브랜치의 실행은 직렬화하며 진행 중인 업로드를 새 푸시로 중단하지 않습니다.

### 복구 절차

- 인증 실패 시 secret의 유효기간과 계정·Worker 편집 권한을 확인합니다. 토큰을 소스에 붙여 넣지 않습니다.
- 소스 오류라면 수정 후 main에 푸시합니다. 검증 성공 후 직접 배포합니다.
- 일시적인 업로드 오류는 GitHub Actions의 실패한 작업을 다시 실행합니다. `workflow_dispatch`도 main의 검증·직접 배포·운영 검사를 실행합니다.
- 이미 최신 커밋이 올라왔다면 과거 실행을 재시도하지 말고 최신 실행을 사용합니다.

공식 문서: https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/
Worker 업로드 API: https://developers.cloudflare.com/api/resources/workers/subresources/scripts/methods/update/

무료판 설정에는 유료 CPU 상한, 유료 바인딩, AI API, 저장소 사용이 없습니다.
`wrangler.toml`도 동일한 무료판 진입점입니다. 기본 명령과 명시적 무료 설정 모두 openfin을 사용합니다. 전체판 workflow는 비활성화되어 있습니다.
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

운영 MCP: https://openfin.cocomo0412.workers.dev/mcp (Streamable HTTP, 인증 없음). 상태: https://openfin.cocomo0412.workers.dev/health . 현재 커밋의 배포 여부는 GitHub Actions의 **OpenFin MCP pipeline → deploy**의 업로드 결과와 실제 MCP 검사로 확인합니다. 이 문서의 과거 성공 기록을 최신 배포 성공 증거로 사용하지 않습니다. 테스트 성공은 모든 부하에서 무료 한도 충족을 보장하지 않습니다.
