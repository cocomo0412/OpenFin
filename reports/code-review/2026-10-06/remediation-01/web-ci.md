# 웹·CI 보안 조치 기록

- 조치일: 2026-10-06 한국시간
- 담당: 품질 담당(이번 조치의 구현자). 최종 독립 검토는 다른 담당에게 요청한다.
- 최초 검토 기준: `1e6d7f025e0decede75c82495a9ab9854ba536da`
- 최초 증적: [웹·CI 검토](../web-ci-review.md), [파일별 범위](../web-ci-coverage.json). 최초 기록은 수정하지 않았다.
- 상태: 로컬 구현 및 아래 검사 완료. 원격 반영·배포·실제 자료 수집은 수행하지 않았다.

## SEC05 — 레거시 출처 링크

`docs/opentax/app.js`의 `safeSourceUrl`과 `sourceLink`에서 절대 HTTP(S) 주소만 링크로 허용한다. 다른 프로토콜, 상대 주소, 파싱 실패, 제어문자·내부 공백, 사용자명/비밀번호를 포함한 주소는 클릭 가능한 링크로 만들지 않는다. 링크의 주소와 표시문은 HTML 이스케이프하며 새 창 링크에는 `noopener noreferrer`를 붙인다.

근거 출처 관계, `source_urls`, `status_check_url`, `legal_basis`, 출처 카드의 모든 외부 링크에 적용했다. 허용되지 않은 출처의 제목·메타데이터는 일반 텍스트로 보존하고, 출처 카드의 원문 열기 링크만 생략한다. 내장 자료가 있는 첫 줄은 기준 HEAD와 동일함을 확인했다.

별도 생성 템플릿을 수정했다고 주장하지 않는다. 저장소의 스크립트에서 `ONTOLOGY_DATA`, `sourceBlock`, `build_site`, `opentax/app`에 해당하는 생성 원본을 찾지 못했으며, 총괄도 기존 체크아웃에서 해당 생성기를 찾지 못했다고 확인했다. 현재 이 파일의 렌더러가 관리 원본이다. 회귀 검사는 그 렌더러를 직접 읽어 실행하므로, 향후 외부 생성기가 보호 코드를 덮어쓰면 차단 검사가 실패한다. 존재하지 않는 외부 생성기의 동작까지 검증한 것은 아니다.

`tests/knowledge/legacy-source-url.test.mjs`는 내장 금융자료 대신 메모리 표본을 넣어 실제 렌더러를 실행한다. javascript/data/vbscript, 대소문자·줄바꿈 우회, 상대/무호스트/인증정보 주소를 모든 링크 출력 지점에서 차단하는지 확인했다. 정상 HTTP(S), 쿼리 문자열, HTML처럼 보이는 제목·따옴표의 안전한 출력도 검사했다. 실제 브라우저에서 스크립트를 실행하거나 외부 사이트에 요청하지 않았다.

## SEC07 — 한국어 출처 안내 회귀 검사

`tests/knowledge/ui-source-evidence.test.mjs`의 낡은 영어 문구 기대값을 현재 한국어 안내로 고쳤다. 공식 등록기관이 과거 제공기관 값을 덮어쓰는지, stale 상태와 실제 확인 날짜가 보이는지, 기록이 없을 때 unknown 안내를 표시하고 점검 완료라고 표시하지 않는지를 유지한다. 서비스 문구를 검사에 맞춰 되돌리지 않았다.

## SEC08 — 비활성 워크플로우 입력 경계

`staging-openfin.yml`의 6개 수동 입력과 `release-openfin.yml`의 12개 작업 출력 표현식을 `run` 본문에서 제거했다. 각 단계의 `env`에 전달하고 shell에서는 따옴표로 감싼 환경변수로 읽는다. 입력 문자열이 shell 명령문으로 재해석되는 경로를 제거했으며, 기존 예상 값과의 일치 검사는 유지했다. 워크플로우 활성화나 배포 순서는 변경하지 않았다.

staging의 설치·네트워크 검사 전에 commit은 40자리 hex, generation/checksum은 64자리 hex, 버전은 1~128자리 영문·숫자·점·밑줄·콜론·더하기·하이픈 식별자로 검증한다. 공백과 마지막 줄바꿈도 거부하며, 오류에는 입력 이름만 표시한다. 실제 검증 구문을 실행하는 검사에서 정상 형식과 33개 잘못된 입력을 확인했다. 활성 `search-quality.yml`에도 새 링크/CI 검사 및 출처 표시 검사를 실행 목록과 변경 경로에 연결했다.

`tests/knowledge/workflow-input-security.test.mjs`는 두 파일의 모든 `run`에서 Actions 표현식 삽입이 없는지와 17개 job의 비활성 상태를 확인한다. 실제 staging 비교 구문을 추출하여 자료 판독 함수만 대체하고 Bash에서 실행했다. 정상 6개 값은 통과하며, 각 값에 명령 치환·백틱·따옴표 탈출·줄바꿈 입력 4종(총 24회)을 넣으면 불일치로 실패하고 표본 명령은 실행되지 않는다. GitHub 워크플로우, 수집 또는 배포 명령은 실행하지 않았다. Bash가 없는 환경에서는 이 동적 검사만 명시적으로 skip되며, 이번 환경에서는 skip 없이 통과했다.

## 검증 결과와 운영 구분

실행 명령:

```text
node --experimental-strip-types --test mcp/tests/free-search.test.mjs mcp/tests/free-catalog.test.mjs tests/knowledge/ui-search-input.test.mjs tests/knowledge/ui-search-contract.test.mjs tests/knowledge/api-data-ui.test.mjs tests/knowledge/ui-source-evidence.test.mjs tests/knowledge/legacy-source-url.test.mjs tests/knowledge/workflow-input-security.test.mjs
node --check docs/opentax/app.js
git diff --check
```

- 관련 검사 57/57 통과, 실패·skip 없음.
- 수정한 세 workflow는 PyYAML로 파싱했으며 비활성 workflow의 17개 job의 `if: ${{ false }}`를 확인했다.
- 세 workflow의 56개 `run` 본문을 Bash `-n`으로 구문 검사했다. 본문 실행은 하지 않았다.
- `node --check`, `git diff --check` 통과. Git의 기존 CRLF 변환 안내는 오류가 아니다.
- 홈페이지: 레거시 출처 링크 보호를 운영에 반영하려면 홈페이지 배포가 필요하다. 이번 단계에서는 미배포다.
- MCP: 이 담당 범위에는 MCP 코드·번들 입력 변경이 없으므로 단독으로 MCP 배포가 필요하지 않다. 전체 조치의 다른 담당 변경은 총괄이 별도 판정한다.
- CI: 저장소 반영이 필요하지만 staging/release job은 계속 비활성이다. 실제 GitHub 실행과 브라우저 검증은 수행하지 않았다.
