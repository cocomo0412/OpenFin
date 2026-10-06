# OpenFin 개발 매뉴얼

작성일: 2026년 10월 3일 · 수정일: 2026년 10월 6일 · 버전 1.1.1 · 관리 담당: 개발 담당과 총괄 PM

버전 변경 기준과 이력은 [매뉴얼 변경 이력](CHANGELOG.md)을 따른다.

이 문서는 OpenFin의 코드와 데이터 구조를 변경하고 검증하는 절차다. 기준은 이 개선 브랜치의 코드와 현재 저장된 배포 설정이며, 운영 반영 여부는 별도로 확인한다. 자료 갱신 일정과 장애 대응은 [운영 매뉴얼](operations.md)을 따른다.

## 1 서비스 구성과 개발 범위

| 구성 | 위치 | 역할 |
| --- | --- | --- |
| 원본 지식 | `knowledge/` | 개념, 관계, 출처, 상품과 지원사업 자료 |
| 데이터 계약 | `schemas/`, `contracts/` | 구조와 검증 기준 |
| 수집과 빌드 | `scripts/knowledge/` | 공식 자료 수집, 식별자 연결, 지식 통합, 공개 파일 생성 |
| 공개 홈페이지 | `docs/` | 정적 홈페이지와 탐색기 |
| 공개 데이터 | `docs/opentax/` | 생성된 검색 인덱스, 분야별 export, 출처 상태 |
| 무료 MCP | `mcp/src/free.ts`, `mcp/src/free-catalog.ts` | 세금·공제 검색과 조회, 메타데이터 제공 |
| 검사 | `tests/knowledge/`, `mcp/tests/` | 데이터 계약과 동작 회귀 검사 |
| 운영 기록 | `reports/`, `evidence/source-receipts/` | 갱신 보류 사유, 출처 확인 근거 |

홈페이지의 전체 자료 범위와 무료 MCP의 범위는 다르다. 무료 MCP는 `search`, `fetch`, `exports`를 제공하며 전체 금융상품 비교·추천 서비스로 확장해 설명하지 않는다. 카탈로그 건수는 고정 숫자 대신 생성 결과와 `exports.item_count`를 확인한다.

## 2 팀의 작업 분담

- 총괄 PM: 문제와 완료 조건을 정하고 다른 작업과 충돌을 조정한다.
- 사용자 경험 담당: 실제 이용 흐름과 기대 동작을 정의한다.
- 금융 데이터·온톨로지 담당: 출처, 식별자, 관계, 날짜, 검색 의미를 검토한다.
- 개발 담당: 구현과 관련 검사를 작성한다.
- 품질 검증 담당: 구현자와 별도로 실패 사례와 수정 결과를 검토한다.

팀의 상세 운영 원칙은 [AGENTS.md](../AGENTS.md)를 따른다. AI 담당의 검토는 공식 기관의 법령 해석이나 외부 전문가의 인증을 뜻하지 않는다.

## 3 개발 환경 준비

새 작업은 기존 미커밋 변경을 보존한 별도 브랜치 또는 작업 공간에서 시작한다. 이 프로젝트의 개선 작업 공간은 `OpenFin-team-improvement`이며, 배포용 작업 공간과 혼동하지 않는다.

기본 환경은 Git, Node.js 24, npm, Python 3이다. Node 24는 현재 무료 MCP 배포 검사 환경과 맞춘 선택이다. Python 수집기에는 표준 라이브러리를 사용하며, 별도 실행 파일이 필요하면 `OPENFIN_PYTHON`으로 지정할 수 있다.

아래 명령은 저장소 루트에서 하나씩 실행하며, 실패한 명령 다음 단계는 원인 확인 후 진행한다.

```powershell
git status --short
node --version
python --version
npm ci
npm --prefix mcp ci
```

수집이 필요한 경우에만 [환경 변수 예시](../.env.example)를 바탕으로 루트 `.env`를 준비한다. 기존 `.env`는 덮어쓰지 않는다. 키 이름은 `FINLIFE_API_KEY`, `DATA_GO_KR_SERVICE_KEY`, `ECOS_API_KEY`이며 값은 문서·커밋·보고서에 기록하지 않는다. 배포용 Cloudflare 토큰은 GitHub Actions secret으로 관리한다.

## 4 변경 절차

1. 문제를 재현하고 현재 결과, 기대 결과, 영향 범위를 적는다.
2. 변경 파일의 소유 담당을 정한다. 다른 채팅이나 브랜치가 같은 파일을 수정하고 있는지 확인한다.
3. 변경을 구현한다. 재발 위험이 있는 오류는 실패 사례를 검사로 남긴다.
4. 변경 범위에 맞는 검사를 실행하고 품질 담당에게 독립 검토를 요청한다.
5. 코드, 생성물, 검증 결과, 남은 제한을 함께 리뷰한다.
6. 승인된 변경만 배포 대상에 포함한다. 로컬 커밋, 원격 반영, 운영 검증 완료를 구분한다.

PR 또는 변경 설명에는 사용자에게 달라지는 동작, 이유, 실행한 검사와 결과, 데이터 영향, 복구 방법을 적는다. 실제 실행하지 않은 검사는 통과로 기록하지 않는다.

## 5 데이터 변경 규칙

- 자료 구축과 갱신은 공공데이터포털 또는 제공기관의 공식 API를 사용한다. 수집 범위를 API 제공 범위에 맞추고 기관 직접 API와 포털 API를 구분해 기록한다.
- API 오류·미제공을 이유로 HTML 크롤러, 브라우저 수집, PDF 추출로 대체하지 않는다. 웹페이지 내부 요청도 문서화된 공식 API라고 확인되지 않으면 대체 수집 경로로 채택하지 않는다.
- 공식 개발 문서는 API 경로·요청 변수·응답 규격 확인을 위해 읽을 수 있다. 자료 구축용 웹 수집의 예외는 사용자가 범위를 별도로 명시한 경우에만 적용한다.
- 기존 웹 수집 자료는 출처와 날짜를 보존하고 API 갱신 대상과 구분한다. 이를 일괄 삭제하거나 API 조회 자료로 표시하지 않는다.
- 생성된 공개 JSON만 고쳐 끝내지 않는다. 원본 지식이나 생성 경로를 수정하고 필요한 산출물을 다시 만든다.
- 기존 `id`와 관계를 유지한다. 페이지 순서나 목록의 행 번호를 영구 식별자로 사용하지 않는다.
- 공식 출처 URL, 원본 레코드 식별자, 수집 시각, 검토 범위, 체크섬을 연결한다.
- 원자료 기준일, 수집일, API 필드 매핑 검토일, 제도 적용일은 별도 의미다. 날짜를 일괄 오늘로 바꾸지 않는다.
- API 목록에서 사라진 항목을 곧바로 판매 종료나 제도 폐지로 단정하지 않는다.
- 일부 페이지 누락, 중복 ID 충돌, 스키마 변경은 정상 자료로 덮어쓰지 않는다. 기존 성공 자료와 실패 사유를 보존한다.
- 수집 성공이 상품 추천 적합성이나 법령 현행성을 보장하지 않는다. 무료판의 비교·추천 제한을 유지한다.
- 분할 export는 루트의 `shards` 전체를 읽는다. 첫 파일이나 일부 항목만 검사해 전체 검증으로 보고하지 않는다.

## 6 변경 유형별 검사

| 변경 | 필요한 검토 |
| --- | --- |
| 화면과 검색 | JavaScript 문법, 관련 회귀 검사, 실제 브라우저 이용 흐름 |
| 수집과 식별자 매핑 | 페이지 완전성, ID 안정성, 체크섬, 실패 시 이전 자료 보존 |
| 지식과 출처 | 스키마, 관계, 근거, 날짜 의미, 공개 산출물 일치 |
| 무료 MCP | 타입 검사, 무료판 계약과 검색 검사, 배포 번들 사전 생성 |
| 배포 설정 | PR 검증 경로, 무료 설정, 최신 main 확인, 배포 후 SDK 검사 |

화면과 무료 검색의 빠른 검사:

```powershell
node --check docs/app.js
node --experimental-strip-types --test mcp/tests/free-search.test.mjs mcp/tests/free-catalog.test.mjs tests/knowledge/ui-search-input.test.mjs tests/knowledge/ui-search-contract.test.mjs
npm --prefix mcp run typecheck
git diff --check
```

지식과 데이터 구조를 변경한 경우 관련 회귀 검사에 더해 다음을 실행한다. 빌드 명령은 작업 파일을 변경하므로 실행 전후 차이를 확인한다.

```powershell
npm run knowledge:build
npm run knowledge:schema-validate
npm run knowledge:validate
npm run knowledge:derive-quality:check
npm test
```

무료 MCP 데이터나 런타임을 변경한 경우:

```powershell
npm --prefix mcp run build:free
npm --prefix mcp test
```

Wrangler 사전 검증과 로컬 실행은 `mcp` 폴더에서 수행한다.

```powershell
npx wrangler deploy --config wrangler.free.jsonc --dry-run
npx wrangler dev --config wrangler.free.jsonc
```

Wrangler의 `--dry-run`도 설정된 사전 빌드를 실행하므로 로컬 `free-catalog.json`이 다시 생성될 수 있다. 운영 배포가 없다는 뜻이며 작업 파일이 전혀 바뀌지 않는다는 뜻은 아니다.

로컬 Worker가 실행 중일 때 별도 터미널의 저장소 루트에서 `node mcp/scripts/smoke-free.mjs`를 실행한다. 기본 연결 대상은 `http://127.0.0.1:8787/mcp`다.

홈페이지 확인은 저장소 루트에서 `python -m http.server 4176 --bind 127.0.0.1 --directory docs`로 시작할 수 있다. `http://127.0.0.1:4176/explorer.html`에서 첫 검색, 공백 입력, 연속 입력, 분야 변경, 결과 선택을 확인한다. 화면 크기와 키보드 이용도 변경 범위에 맞춰 점검한다. 검증을 마치면 서버를 종료한다.

가상 DOM 검사는 실제 브라우저의 화면 배치나 접근성 검증을 대신하지 않는다. 실패한 검사가 변경 전에도 실패했는지는 기준 버전과 비교해 구분한다.

## 7 통합과 배포

현재 MCP 배포의 기준은 [deploy-mcp.yml](../.github/workflows/deploy-mcp.yml)과 [무료판 배포 안내](../mcp/FREE-DEPLOYMENT.md)다. 과거 문서의 Cloudflare 자체 Git 빌드나 유료 전체판 절차를 현재 운영에 적용하지 않는다.

- 관련 PR에서는 무료 MCP 검증을 실행하고 배포하지 않는다.
- `mcp/**`, `docs/opentax/korea-tax-ontology-2026.json`, `.github/workflows/deploy-mcp.yml` 변경이 `main`에 반영되면 무료 MCP pipeline이 검증, 번들 생성, 기존 Worker 업로드, 실제 MCP 검사를 수행한다.
- 배포 직전 최신 main과 MCP 입력 범위를 비교한다. 화면·매뉴얼만 달라졌으면 검증된 번들을 허용하고, MCP 입력이 달라졌으면 차단한다.
- 홈페이지는 현재 운영 문서상 GitHub Pages의 `main /docs` 방식이다. 기존 `Deploy GitHub Pages` workflow는 의도적으로 실패하게 되어 있으므로 배포 수단으로 사용하지 않는다.
- `OpenFin search quality`는 별도 검사 workflow다. 현재 MCP 배포 job의 `needs` 조건에 연결된 것은 아니므로 병합 전 통과를 별도로 확인한다. 필수 브랜치 보호 규칙 설정 여부도 별도 확인 대상이다.
- 무료 설정을 사용하고, 유료 전체판 workflow를 활성화하지 않는다.

배포 완료는 업로드 성공과 대상 버전의 운영 MCP 검사 성공을 함께 확인해 판정한다. 기존 홈페이지나 Worker가 응답한다는 사실만으로 새 버전 배포 성공을 판단하지 않는다. 상세 운영 확인과 복구는 [운영 매뉴얼](operations.md)을 따른다.

### 배포 대상 구분

화면 문구·HTML·CSS·브라우저 JavaScript 변경은 홈페이지 배포로 충분하다. 무료 MCP는 번들에 포함된 세금 카탈로그를 사용하므로 공개 자료 변경 중 세금 원자료가 동일하면 MCP 재배포는 필요하지 않다. MCP 코드·의존성·설정·번들 입력이 바뀌면 MCP를 배포한다. 새 번들 입력 경로를 추가할 때는 workflow의 push와 PR 경로 조건을 함께 갱신한다.

배포 판단은 이번 수정 파일뿐 아니라 main에 실제 반영할 전체 변경 묶음을 기준으로 한다. 이전 미배포 MCP 개선까지 합치면 MCP 배포가 필요하다. workflow 자체 변경도 MCP 검증·배포를 실행한다. 수동 실행은 복구 등 필요한 경우에만 사용한다. 홈페이지만 변경한 작업에서는 해당 화면과 자료 요청을 검사하며 MCP 운영 검사를 반복하지 않는다.

API 키는 비공개 수집 환경 또는 서버 secret에만 보관한다. 공개 HTML·JavaScript·JSON·브라우저 요청·URL·로그에 키를 넣지 않는다. 개발자 링크를 숨겨도 파일은 공개 접근 가능하므로 공개 산출물과 Git 추적 파일을 별도로 점검한다. 점검 결과에는 비밀값 대신 범위와 발견 여부만 기록한다.

## 8 완료 기록과 매뉴얼 유지

완료 기록에는 변경 커밋, 실제 검사 결과, 검토 담당, 운영 반영 여부를 남긴다. 경로·명령·배포 흐름이 바뀌면 코드와 같은 변경에서 이 매뉴얼을 갱신한다.

이 버전은 코드와 명령 정의를 대조했으며, 갱신 단계 출력과 도움말을 실제 확인했다. 문서 작성을 위해 자료 전체 갱신이나 운영 배포를 실행하지 않았다. 첫 팀 개선의 검증 기록은 [활동 기록](../reports/team-review-2026-10-03.md)에 있다.
