# MCP 개발·보안 검토 — 2026-10-06

담당: 보안설계·구현검토. 검토 대상 HEAD `1e6d7f02`; 총괄이 제시한 운영 기준 `785add92`. 두 커밋 사이 `mcp/` 차이는 없다. 운영 서버 호출이나 Cloudflare 계정 설정 조회는 하지 않았다. 따라서 운영 버전은 제공된 기준과 저장소 설정을 기준으로 구분하며, 실서버 침투·부하·설정 검증을 수행했다는 뜻이 아니다.

## 범위와 결과

`mcp/src/**`, `mcp/scripts/**`, `mcp/tests/**`, 패키지·타입·Wrangler 설정을 포함한 추적 파일 95개를 인벤토리에 넣었다. 파일별 깊이는 `mcp-coverage.json`에 기록했다. 중요 경계의 정밀 검토, 나머지 파일의 정적 패턴/호출 경로 확인, 안전한 단위검사를 조합했으며 모든 줄의 완전 검토라고 주장하지 않는다.

현재 무료판 진입점에서 원격 악용까지 입증한 고위험 취약점은 없다. 아래 구현 결함 4건은 모두 **비활성 전체판**에 있으며 무료판에서 호출할 수 없다. 별도 공급망 감사에서는 무료 번들에 포함되는 fast-uri의 보안 업데이트 필요성을 확인했다. 구현 결함은 전체판을 다시 제공하기 전에 수정 및 재검증할 사항이다. 확인된 문제가 없다는 표현을 전체 서비스 보안 인증으로 해석해서는 안 된다.

## 실행 경계

| 구분 | 근거 | 판단 |
| --- | --- | --- |
| 무료 운영 | `mcp/wrangler.toml:3`, `mcp/wrangler.free.jsonc:4`, `mcp/package.json` | 둘 다 `src/free.ts`. 기본 dev/deploy도 무료판 설정. |
| 공개 기능 | `mcp/src/free.ts:40-49` | search / fetch / exports만 등록. 공개 참고자료 조회이고 무인증은 명시적 설계다. |
| 비활성 전체판 | `mcp/src/index.ts`, 계산·추천·개인재무 도구 | 무료 진입점에서 import/등록되지 않으며 현재 Wrangler 설정의 실행 대상이 아니다. |
| 배포 보조 | `mcp/scripts/deploy-free.mjs:7-43` | 계정 ID 형식, multipart 메타데이터, 무료판 binding 없음 검증. Authorization 헤더, redirect 차단, 에러 코드만 기록. 실제 배포 미실행. |

## 핵심 발견 사항

### MCP-01 · P2 · pilot 평가에서 필수 조건과 위험·유동성 정보가 사라짐

- 근거: `mcp/src/recommendation/context.ts:61,77`; `mcp/src/tools/pilot-evaluation.ts:32-35`; `mcp/src/tools/recommend-shadow.ts:79`; `mcp/src/tools/recommend-owner-pilot.ts:128`.
- 정규화 결과는 `hard_constraints`를 반환하지만 두 pilot 호출은 그 객체를 그대로 넘기고 평가기는 `context.constraints`를 읽는다. 입력 `decision_context.risk_capacity`와 `liquidity_requirement`도 반환 객체에 보존되지 않는다.
- 안전한 로컬 재현: provider=`BANK-A`, term=12, risk=`low`, liquidity=3개월을 정규화해 평가기에 전달했다. 정규화된 필수 조건은 `{provider:"BANK-A",term_months:12}`였으나 후보 생성기에 전달된 constraints는 `{}`, decision_context는 `{fact_sources:{},as_of:"2026-10-06"}`뿐이었다. 후보 생성기를 메모리 내 stub으로 대체하여 네트워크와 파일 변경 없이 데이터 손실을 확인했다.
- 영향: shadow 평가가 실제 사용자 조건을 반영하지 못하고, owner pilot이 활성화되면 은행·기간·위험·유동성 조건을 어기는 후보가 조건 검사에서 누락될 수 있다. 출시 승인과 인증 자체를 우회한다는 뜻은 아니다.
- 조치: 정규화된 공통 컨텍스트를 평가기 계약으로 사용하고 `hard_constraints` 및 결정 조건을 명시적으로 연결한다. 실제 두 도구 handler를 통해 조건 불일치 후보가 제외되는 회귀 검사를 추가한다.
- 운영 도달성: 무료판 비도달. owner 출력에는 별도 활성화·서명·승인 gate가 추가로 필요하다.

### MCP-02 · P2 · 인증 없는 진단 헤더가 검색어 원문을 로그로 보냄

- 근거: `mcp/src/index.ts:459-468,500,706-713,3510-3520`.
- `x-openfin-diagnostics: 1`만으로 진단이 켜지고, 호출자가 넣은 `x-openfin-query`를 decode하여 `diagnostics.query`에 보관한다. 이 문자열이 응답 진단 헤더 및 `console.log`의 JSON에 그대로 포함된다. 길이 256 제한은 비식별화가 아니다.
- 영향: 진단 클라이언트가 실사용자의 질문을 넣으면 소득·부채 등 자유문장 내용이 transient-only 설계와 별개로 서버 로그에 남을 수 있다. 다른 사용자의 데이터를 읽는 취약점으로 확인된 것은 아니다.
- 조치: 진단 로그는 요청 ID·도구명·분류·처리량·소요시간으로 제한하고 query 원문을 제거한다. 진단 사용은 서버 설정 또는 별도 인증으로 통제하고 민감정보가 로그에 남지 않는 검사를 추가한다.
- 검증: 로컬 정적 데이터 흐름 추적. 실제 사용자 질문, 로그, secret은 조회하지 않았다.
- 운영 도달성: 무료판 비도달. 전체판을 그대로 재배포하면 공개 요청에서 도달한다.

### MCP-03 · P2 · owner 토큰 재사용 방지가 프로세스 메모리에만 적용됨

- 근거: `mcp/src/tools/recommend-owner-pilot.ts:11,39-42,66-68`.
- 사용한 JTI를 모듈 `Map`에 저장한다. 새 isolate/인스턴스에는 기록이 없으며, 4,096개 초과 시 유효기간이 남은 기존 기록도 제거한다. 주석 역시 per-isolate 제약을 명시한다.
- 안전한 로컬 재현: 가상 테스트 키로 60초짜리 토큰을 메모리에서 생성했다. 같은 모듈은 최초 `true`, 재사용 `false`; 독립적으로 로드된 동일 모듈은 동일 토큰을 `true`로 허용했다. 키·토큰 값은 기록하지 않았다. 독립 모듈은 분리 메모리 동작을 재현한 것이며 실제 Cloudflare 공격은 하지 않았다.
- 영향: 이미 소지한 유효 owner proof의 재사용 방지 약속이 여러 인스턴스에서 성립하지 않는다. 서명 없는 공격자가 proof를 위조할 수 있다는 뜻은 아니다.
- 조치: 활성화 전에 원자적인 JTI 소비와 만료를 공유하는 저장소/단일 인증 경계를 둔다. 저장소 장애는 차단하고 서로 다른 인스턴스의 중복 소비를 검사한다. 재사용 가능한 세션을 의도했다면 계약과 검사를 그 의미로 다시 정의한다.
- 운영 도달성: 무료판 비도달. owner pilot 활성화 및 유효 proof 확보가 전제다.

### MCP-04 · P2 · 미입력 재무값을 0으로 계산해 확정 지표를 반환함

- 근거: `mcp/src/index.ts:3292-3307,3311`; `mcp/src/tools/personal-finance.ts:39-47`.
- 자산 입력이 없을 때 `?? 0`으로 합산해 순자산을 0으로 반환한다. 부채 잔액만 있고 월 상환액이 없을 때도 상환액을 0으로 합산하여 소득 대비 상환비율을 0으로 반환한다. 도구의 설명은 “missing inputs produce null metrics”여서 실제 동작과 다르다.
- 안전한 로컬 재현: TypeScript AST에서 `isRecord`, `financeMetric`, `financeMetrics` 세 함수만 메모리에서 추출·실행했다. 빈 snapshot의 net_worth는 `0`; 소득 300만원, 부채 1,000만원, 월 상환액 미입력의 debt_service_ratio도 `0`이었다.
- 영향: 미입력과 실제 0원이 구분되지 않아 재무요약과 필요 판단에 과도하게 확정적인 지표가 전달될 수 있다. 상위 응답의 missing_information이 있어도 개별 지표 0은 잘못 읽힐 수 있다.
- 조치: 지표별 필수 입력이 하나라도 미확인일 때 null과 해당 missing_information을 반환한다. 명시적 빈 부채 목록·상환액 0과 필드 미제공을 구분하는 검사를 추가한다.
- 운영 도달성: 무료판 비도달. 전체판 개인재무 도구 활성화 시 도달한다.

## 추가 공급망 감사 · P2 · 알려진 취약 버전 갱신 필요

총괄의 추가 요청으로 npm 공식 registry에 lock 기반 audit를 수행했다. 명령은 `npm audit --package-lock-only --ignore-scripts --json --logs-max=0 --registry=https://registry.npmjs.org`; exit 1이며 설치/fix/lock 변경은 하지 않았다. 2026-10-06 응답 기준 영향 패키지 7개(critical 1, high 2, moderate 4)다. 이는 패키지 단위 advisory 집계이며 OpenFin 서비스의 실제 악용 가능한 취약점 개수가 아니다.

| 패키지 / 잠긴 버전 | advisory 등급 | 의존 경로 / 무료 번들 판단 |
| --- | --- | --- |
| fast-uri 3.1.6 | high | SDK → ajv → fast-uri. 무료판 메모리 번들에 실제 포함. |
| proxy-addr 2.0.7 | critical | SDK의 Express 의존 경로. 무료판 메모리 번들에는 미포함. |
| hono 4.13.5 | moderate | SDK / @hono/node-server 경로. 무료판 메모리 번들에는 미포함. |
| ip-address 10.7.0 | moderate | express-rate-limit 경로. 무료판 메모리 번들에는 미포함. |
| undici 7.29.0 | high | 이 audit node는 dev인 miniflare 경로. 무료판 메모리 번들에는 미포함. |
| miniflare 5.20260911.0-alpha | moderate | wrangler 개발 의존성, undici 영향 전파. 무료판 미포함. |
| wrangler 4.131.1 | moderate | 직접 dev 의존성, miniflare 영향 전파. 무료판 미포함. |

근거 위치는 `mcp/package-lock.json:2813,2996,3047,3254,3448,3907,4012`다. 의존성 위치와 프로덕션 번들 포함 여부는 별개다. 설치된 모듈로 `esbuild`를 `write:false`·Worker/browser 조건·Node/Cloudflare builtin 외부 처리하여 메모리에서만 분석했다. 전체 입력 336개 중 fast-uri 입력 3개가 출력 41,753 bytes를 차지했고 나머지 위 패키지는 0개였다. 이는 깨끗한 CI 빌드나 실제 배포 번들 대조를 대신하지 않는다. 최초 메모리 분석은 Node builtin `path` 외부 처리 누락으로 실패했고 builtin 목록을 외부 처리한 재실행이 성공했다.

- **fast-uri**: 무료 경로는 `free.ts → SDK McpServer → Server → AjvJsonSchemaValidator → ajv → fast-uri`. 설치된 SDK `server/index.js:3,51`, validator `ajv-provider.js:4-15`, Ajv `runtime/uri.js:3`에서 확인했다. 알려진 문제는 URI 포트 조립, 호스트 해석 차이, 호스트 대소문자 정규화 문제다. 현재 무료 도구는 사용자 URL을 호스트 접근제어에 쓰지 않고 외부 fetch/elicitation도 호출하지 않아 해당 원격 악용 경로는 입증되지 않았다. 그럼에도 운영 번들에 영향을 받는 버전이 있으므로 **다음 MCP 변경 묶음에서 우선 갱신·재검사**할 대상이다. 3.x의 세 advisory를 함께 해소하는 기준은 3.1.8 이상이다. [포트 조립 advisory](https://github.com/fastify/fast-uri/security/advisories/GHSA-qw65-cvwx-89v3), [호스트 해석 advisory](https://github.com/fastify/fast-uri/security/advisories/GHSA-58mr-gqgx-xq4g), [정규화 advisory](https://github.com/fastify/fast-uri/security/advisories/GHSA-hrr3-gc8f-f4qj).
- **proxy-addr**: critical은 잘못 지정한 IPv4-mapped IPv6 trust subnet을 사용하는 조건에 대한 등급이다. 무료 `agents/mcp`의 `createMcpHandler`는 `WorkerTransport`를 생성하며 Express의 trust proxy 경로를 사용하지 않는다. 서비스 critical로 보고하지 않는다. 패키지 수정 버전은 2.0.8이다. [유지관리자 advisory](https://github.com/jshttp/proxy-addr/security/advisories/GHSA-jqcg-44mw-7w3h).
- **hono**: 해당 건은 JSX 경계의 문자열 HTML escape 문제다. 무료 Worker는 해당 JSX 렌더링 경로가 없고 메모리 번들에도 Hono가 없다. 패키지 수정 버전은 4.13.7이다. [유지관리자 advisory](https://github.com/honojs/hono/security/advisories/GHSA-hxh3-vqpv-xpqv).
- **기타 audit 증적**: ip-address는 GHSA-j6r3-76f7-8jcv / GHSA-h3mg-xc3c-68pw, undici는 GHSA-3wwx-pv8p-q78v / GHSA-pmjh-fq2x-6v4x / GHSA-r53p-7pc4-xj5r / GHSA-rfgv-xxqx-mfg5 / GHSA-3xpg-4rpp-hhhm / GHSA-2jfj-6hjv-fm6j / GHSA-2gqq-gqf2-x968 / GHSA-w293-vg96-wgc3 / GHSA-8436-99hf-9mmv / GHSA-rx4f-c7p8-82vq로 보고되었다. 이 항목들의 구체적 악용 조건은 개발 도구 경로의 후속 검토 범위다.

조치 제안은 의존성 업데이트와 테스트/실제 CI 번들 검증이다. 사용자의 수정 금지 지시를 유지하여 이번에 패키지는 바꾸지 않았다. 향후 fast-uri를 고쳐 번들 입력이 변경되면 **MCP 재배포가 필요**하며 홈페이지 단독 배포로 해결되지 않는다.

## 확인한 방어와 남은 검증

- 무료판: 허용 Origin 또는 동일 Origin만 통과시키며 Origin 없는 서버 클라이언트도 허용한다. CORS는 인증이나 요청 횟수 제한이 아니다. POST/JSON, 스트림 누적 8,192 bytes, 검색 120자/10건, fetch ID 200자 제한을 확인했다. 이 진입점에는 외부 URL fetch나 사용자 재무 저장 기능이 없다.
- 무료판 가용성: 저장소에는 요청 빈도 제한 binding/처리가 없고 body 읽기 전용 타임아웃도 없다. Cloudflare 외부 제한·WAF·실제 요금제 및 요청량은 확인하지 않았으므로 “실운영 무방비” 또는 실제 서비스 거부 취약점으로 단정하지 않았다. 무료 한도 보호 정책과 느린 body 로컬 검사는 후속 확인 항목이다.
- 전체판 SSRF: 입력 ID의 URL은 식별자 해석에 사용되고 임의 URL을 곧바로 fetch하지 않는다. 아티팩트 URL은 manifest 기준의 파일명으로 다시 만들지만 네트워크 fetch는 redirect를 기본 처리한다. manifest 설정과 호스팅 관리 권한이 신뢰 경계이며, 일반 도구 입력에서 임의 서버로 연결되는 재현은 찾지 못했다.
- 전체판 캐시: 크기·행수·동시 로드·대기열·타임아웃·세대별 키/단일 요청 합치기 방어가 있다. 관련 단위검사는 통과했으나 전체 Worker 동시성/메모리 부하 검사는 금지 범위여서 실행하지 않았다.
- 계산기 보조 관찰: `mcp/src/calculators/deposit.ts:21-24`는 음수 accrual_days를 거부하지 않는다. 가상 원금 100만원·3%·12개월·ACT/365·-365일에서 세전 -30,000원이 나왔다. 현재 `outcome.ts` 호출 경로가 해당 인수를 전달하지 않아 핵심 운영 finding으로 올리지 않았다. 직접 사용 경로를 만들기 전에 입력 경계 검사가 필요하다.
- 수집 원칙: 무료 빌더는 기존 저장소 세금 JSON을 묶는 작업이다. 공식 API 수집이라고 재표기하지 않고 `not_revalidated` 및 기존 출처/날짜를 전달한다. 신규 HTML/PDF/브라우저 수집은 하지 않았다.
- 공급망: lock v3의 루트 포함 292개 항목을 정적으로 확인했다. resolved 항목에 무결성 누락 및 비 HTTPS 주소가 없었고 직접 잠긴 버전은 SDK 1.29.0 / agents 0.12.3 / zod 4.4.2다. 추가 npm audit와 중요 advisory 원문을 위와 같이 확인했으며, 전체 의존성 소스 보안감사를 수행한 것은 아니다.
- 번들 데이터: 무료 카탈로그 399개, 223,781 bytes. 공개 source URL의 userinfo와 key/token/secret/auth 이름의 query parameter는 0개였다. 전체 secret 탐지나 Git 이력 감사에 해당하지 않는다.

## 실행한 검사와 수정·배포 여부

- 외부 호출/서버 시작/파일 변경 가능 검사를 제외한 `mcp/tests` 24개 파일의 단위검사 119개 통과. 실행: `node --experimental-strip-types --test --test-reporter=dot` + 선별 파일 목록.
- 제외 5개: canary-validate, deploy-scope, soak-test, verify-release, tool-schema-contract. 로컬 서버/별도 프로세스/임시 Git 또는 환경 변수에 따른 네트워크 경로를 피하기 위한 선택이며 실패한 검사가 아니다.
- `node mcp/node_modules/typescript/bin/tsc --noEmit -p mcp/tsconfig.json` 통과. 첫 시도는 루트 node_modules 경로를 사용해 모듈을 찾지 못했으며 올바른 MCP 경로로 재실행했다.
- 위 4건 중 3건과 계산 보조 관찰을 메모리 내 가상 입력으로 재현했다. 진단 로그 건은 정적 경로 추적으로 확인했다.
- 서비스 소스·설정·카탈로그 수정 없음. 이 보고서와 범위 JSON만 작성. commit/push/deploy 없음.
- 홈페이지 배포: **불필요** — 화면/공개 데이터 변경 없음.
- MCP 배포: **불필요** — 코드·설정·의존성·번들 입력 변경 없음. 이 보고서는 기존 미배포 변경을 묶어 배포하라는 승인이 아니다.
