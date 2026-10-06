# 공개 웹·CI·루트 의존성 독립 보안 검토

검토일: 2026-10-06 한국시간. 기준 HEAD: `1e6d7f025e0decede75c82495a9ab9854ba536da`. 운영 기준으로 전달받은 커밋: `785add92`. 이 기록은 로컬 소스 검토이며 운영 배포를 실행하거나 운영 환경의 설정을 확인한 기록이 아니다.

웹·CI 30개 파일과 루트 package/lock 2개 파일을 확인했다. 파일별 단계·해시·제한은 [web-ci-coverage.json](web-ci-coverage.json)에 기록한다. vendor 3개는 구조만 확인했고, docs/opentax의 나머지 생성 자료 7,223개는 파일 목록·형식 구분만 확인했다. 그 데이터의 의미·모든 필드 및 vendor 내부 구현을 전수 감사했다는 뜻은 아니다.

## 판단

현재 공개 검색 페이지에서 사용자 검색어만으로 실행되는 XSS나, 외부 PR이 현행 배포 자격증명을 얻는 경로는 확인하지 못했다. 다만 루트 개발 의존성의 공개 취약점, 레거시 웹 화면의 URL 프로토콜 검사 누락, 비활성 CI의 명령어 삽입 구조를 발견했다. 마지막 두 항목은 도달 조건을 충족한 실제 공격으로 확인한 것이 아니다. 코드 수정·패키지 설치·자동 수정·기관 API 호출·운영 부하 검사는 수행하지 않았다.

## 발견 사항

### WEB-CI-01 — 루트 fast-uri 3.1.6에 공개 보안 권고가 존재함

- 우선순위: P2, 의존성 조치 필요. npm 분류는 high 1개 패키지다. 공개 서비스의 원격 악용 심각도로 그대로 환산하지 않는다.
- 근거: `package-lock.json:58-59`의 `node_modules/fast-uri` 3.1.6, `package.json`의 개발 의존성 ajv. 6개 설치 대상 모두 dev로 기록되어 있다.
- 재현: 제공된 로컬 npm CLI로 `audit --package-lock-only --ignore-scripts --json` 실행. high 1개 패키지와 아래 3개 권고가 반환되었다. 패키지 설치·lock 수정은 없었다.
- [GHSA-qw65-cvwx-89v3](https://github.com/fastify/fast-uri/security/advisories/GHSA-qw65-cvwx-89v3): serialize의 검증되지 않은 port를 통한 authority 주입, 3.x 영향 `>=3.0.0 <3.1.7`.
- [GHSA-58mr-gqgx-xq4g](https://github.com/fastify/fast-uri/security/advisories/GHSA-58mr-gqgx-xq4g): 닫히지 않은 대괄호의 URI host 혼동, 3.x 영향 `3.1.6`.
- [GHSA-hrr3-gc8f-f4qj](https://github.com/fastify/fast-uri/security/advisories/GHSA-hrr3-gc8f-f4qj): percent 인코딩 host의 대소문자 정규화 불일치, 3.x 영향 `>=3.0.0 <3.1.8`.
- 위 버전 범위와 수정 버전은 2026-10-06 maintainer의 공식 GHSA 원문까지 대조했다. unclosed bracket 권고는 Node global fetch처럼 자격증명 포함 URL을 거부하는 client는 해당 보고 vector의 영향을 받지 않는다고 명시한다. 저장소가 원격 SSRF에 취약하다는 증거로 이 advisory만 사용하지 않는다.
- 현재 도달성: 루트의 빌드·자료 검사 도구가 설치하는 개발 의존성이다. 직접 작성한 공개 웹 JS는 이 모듈을 import하지 않는다. 공격자가 제어하는 URI가 해당 취약 함수까지 전달되는 전체 경로는 이 담당 범위에서 확정하지 않았다. MCP lock의 결과는 별도 담당 범위다.
- 제안: 승인된 수정 단계에서 관련 lock을 호환되는 수정 버전으로 갱신하고 스키마·자료 검사를 수행한다. 위 3개 권고를 모두 벗어나려면 최소 3.1.8 이상인지 확인한다. 현행 CI에는 정기 의존성 감사가 없으며, 비활성 release의 루트 `--omit=dev` 감사는 이 의존성을 제외한다.

### WEB-CI-02 — 레거시 출처 링크가 임의 프로토콜을 허용함

- 우선순위: P2, 악성 자료 유입을 전제로 하는 방어 경계 보완.
- 근거: `docs/opentax/app.js:158`, `370`, `372`, `375`, `604`. HTML 문자는 escape하지만 URL scheme은 검사하지 않는다. `docs/opentax/index.html:301`이 이 코드를 읽으므로 소스상 레거시 페이지의 실행 경로는 남아 있다.
- 재현: 디스크 수정 없이 실제 JS의 첫 줄 내장 자료만 메모리 fixture로 치환했다. `source.url`과 `source_urls`에 `javascript:void(0)`을 넣으면 출처 목록과 상세의 출력에 `href="javascript:void(0)"`이 남았다.
- 현재 도달성: 현재 내장 자료의 문자열 14,539개를 검사했을 때 javascript/data/vbscript 시작 문자열은 0개였다. 이용자의 검색어가 이 URL 필드를 바꾸는 경로도 확인되지 않았다. 따라서 현재 악성 링크가 배포되어 있다거나 XSS가 실제 실행된다고 단정하지 않는다. 브라우저의 새 창·noopener 정책을 포함한 클릭 후 실행은 시험하지 않았다.
- 영향: 향후 출처 자료에 허용되지 않은 scheme이 들어와도 이를 공식 출처 링크로 표시한다. 신규 탐색기 `docs/app.js`에는 이미 http/https 제한이 있어 레거시 쪽 방어가 다르다.
- 제안: 레거시 생성 템플릿과 결과물에서 동일한 http/https URL 검사를 적용하고, 거부된 주소는 링크 없는 텍스트로 처리한다. 재생성으로 수정이 사라지지 않도록 생성 경로 담당과 함께 변경한다.

### WEB-CI-03 — 비활성 staging 작업의 dispatch 값이 shell 코드로 삽입됨

- 우선순위: P2, 재활성화 전 필수 보완. 현재는 도달 불가.
- 근거: `.github/workflows/staging-openfin.yml:73-78`은 `inputs.expected_*` 문자열을 `run` 내부 큰따옴표에 직접 삽입한다. 40행의 job `if: false`가 현재 실행을 차단한다.
- 재현: 실제 운영·워크플로우를 실행하지 않고 Git Bash에서 같은 대입 형태의 안전한 식을 실행했다. dispatch 값에 해당하는 `$(printf WEB_CI_INJECTION_PROOF >&2)`가 비교 문자열의 일부로 처리되지 않고 실행되어 marker가 stderr에 기록되었다. 파일·네트워크·자격증명 접근은 없는 재현이다.
- 현재 도달성: job이 비활성화되어 있고 dispatch는 저장소 실행 권한을 필요로 한다. 외부 PR에서 즉시 악용할 수 있는 결함으로 분류하지 않는다. job에는 contents:read이며 직접적인 배포 secret 전달도 없다.
- 제안: 재활성화 시 입력을 env로 전달하고 shell에서는 quoted 변수로 읽는다. commit/checksum/version 각각에 형식 검증을 추가한다. disabled release의 출력값 직접 보간도 재활성화 전 함께 재검토한다.

### WEB-CI-04 — 확장 웹 검사에서 예전 출처 표시 계약 2개 실패

- 우선순위: P3, 검사 유지보수. 보안 취약점으로 집계하지 않는다.
- 근거: `tests/knowledge/ui-source-evidence.test.mjs:51`, `66`. 예전 `publisher:`와 `freshness: unknown` 표시를 기대하지만 현재 UI는 `제공기관:`과 `확인 기록 없음`을 표시한다.
- 재현: ui-source-evidence, ui-search-input, ui-search-contract, api-data-ui를 함께 실행하면 41개 중 39개 통과, 2개 실패다. 실제 출처 상태 경고가 빠진 것으로 확인된 실패가 아니라 과거 영문 UI 계약과의 불일치다.
- 영향: 좁은 search-quality 목록은 이 파일을 실행하지 않으므로 전체 검사를 통과했다고 오해할 수 있다.
- 제안: 향후 수정 단계에서 출력 표현보다 실제 상태·출처 URL·안전한 렌더링을 검증하도록 갱신한다. 이번 검토에서는 테스트도 수정하지 않았다.

## 확인한 보호 동작

- `docs/app.js`: 출처 URL은 http/https 검사 후 raw attribute escaping을 적용한다. 숫자·named entity 해제 후 HTML escape를 다시 하며 attribute에는 entity 해제를 적용하지 않는다. query/hash는 데이터 선택·검색에 사용하고 HTML로 그대로 삽입하지 않는다.
- `docs/api-data.js`, `collection-status.js`: 기관 자료를 주로 textContent로 넣는다. API 화면의 원자료 상세는 문자열로 표시하며 실행하지 않는다. 자료 선택은 같은 출처 inventory에서 찾고, 미공개·없는 대상을 첫 자료로 대체하지 않는다. path는 inventory 신뢰 경계이며 URL 파라미터가 직접 fetch 주소가 되지 않는다.
- `galaxy3d.js`: tooltip/legend의 문자열은 고정 분야 메타데이터와 Number/Intl 결과에서 오며, 사용자 검색어를 받지 않는다. 이동 주소의 domain은 encodeURIComponent를 사용한다. Three.js는 로컬 vendor로 연결된다.
- analytics 메모리 재현: 운영 host/path에서 외부 script 1개, opt-out·저장소 접근 실패·다른 host에서 각각 0개였다. settings 페이지 자체는 수집 스크립트를 넣지 않는다. 이미 열린 페이지는 새로고침해야 한다는 제한이 화면에 고지되어 있다. 공개 beacon 식별자는 API 자격증명이 아니다.
- 현행 deploy-mcp: contents:read, PR 검사는 secret 없는 validate job, 배포는 main/non-PR 조건, 사용 action은 commit SHA 고정, 자격증명은 배포 단계에만 전달한다. 최신 main 입력 비교가 존재한다. 원격 branch protection·secret scope·environment 보호 규칙은 확인하지 않았다.
- deploy-pages는 의도적으로 실패하는 폐기된 직접 배포 경로다. release/staging/live-regression/diagnose-worker는 job 수준에서 비활성화되어 있다. track-sources는 main의 명시적 수동 실행이며 report와 PR 발행 credential 단계가 분리되어 있다. 데이터 수집·receipt 안의 secret redaction은 데이터 담당 검토 범위다.
- 루트 lock 6개는 HTTPS npm registry 경로와 integrity가 있고 install-script flag가 없다. 이는 공급망 무결성의 일부이며 알려진 취약점이 없다는 뜻은 아니다.

## 남은 제한과 운영 반영

정적 페이지에서 CSP·referrer policy meta는 확인되지 않았다. 보안 헤더의 실제 운영 응답, 외부 analytics script의 현재 배포본과 beacon payload는 이 검토에서 요청하지 않았으므로 쿼리 유출을 확정하지 않았다. 개인정보처리방침의 제3자 통계 설명은 제공자 구현·정책에 의존하는 부분이다. vendor 내부 전수 검토, GitHub/Cloudflare 계정 권한 실사, 브라우저 실제 클릭 exploit, 동적 침투·부하 테스트는 수행하지 않았다.

이번에 작성한 것은 이 보고서와 coverage JSON뿐이다. 소스·자료·의존성·운영에는 변경이 없다. 후속 URL 렌더러 수정은 홈페이지 반영 대상이며, 루트 개발 의존성·CI만 수정하는 경우 MCP 실행 번들의 변경 여부를 별도로 판단해야 한다. 이번 검토 자체에는 홈페이지·MCP 배포가 모두 필요하지 않다.
