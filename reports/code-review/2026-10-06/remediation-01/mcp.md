# MCP 보안 검토 후속 조치 — SEC-09~12

작성일: 2026-10-06. 담당: 개발 구현 담당. 초기 검토 보고서는 변경하지 않았다. 아래 네 항목은 모두 비활성 전체판 `mcp/src/index.ts` 경로에 해당한다. 현재 운영 무료판 `mcp/src/free.ts`에는 해당 도구·진단·인증 경로가 없다. 로컬 수정이며 배포·실기관 요청·운영 부하 시험은 하지 않았다.

## 조치

| 항목 | 변경과 근거 | 회귀 확인 |
| --- | --- | --- |
| SEC-09 조건 전달 누락 | `tools/pilot-evaluation.ts:33`이 정규화된 `hard_constraints`를 읽는다. `recommend-shadow.ts:79`, `recommend-owner-pilot.ts:126`에서 검증된 `decision_context`도 전달한다. | 실제 두 handler와 후보 평가기를 연결해 공급자·기간·위험·유동성 조건 중 하나라도 어기는 후보를 제외했다. 적합 1건/제외 4건을 확인했다. |
| SEC-10 임의 진단 평문 | `index.ts:459`에서 서버 환경 `OPENFIN_DIAGNOSTICS_ENABLED === "true"`와 요청 opt-in을 함께 요구한다. 검색어·사용자 request/case ID를 수집하지 않는다. 서버 UUID를 생성하고 tool/query-class는 고정 열거값만 허용한다. `index.ts:549`에서 shard 오류 원문도 최종 진단에서 제외한다. | 서버 설정 부재 시 진단이 생성되지 않는다. 임의 민감정보 표식을 각 입력 헤더에 넣어도 진단에 포함되지 않음을 실제 함수로 확인했다. |
| SEC-11 인스턴스별 재사용 방지 | `recommend-owner-pilot.ts:44`의 로컬 Map을 제거했다. 서명/클레임 검증 후 JTI의 SHA-256 키를 공유 소비 경계에 전달한다. `owner-proof-replay.ts:20`이 Durable Object `storage.transaction`에서 최초 소비와 만료 보관을 원자적으로 수행한다. `owner-proof-replay-object.ts`는 실제 fetch/alarm 구현이고 `index.ts`가 전체판에만 export한다. | 서로 다른 verifier 모듈·namespace adapter 12개가 동시에 같은 서명 증표를 소비할 때 정확히 1개만 승인됐다. 실제 트랜잭션 알고리즘을 직렬화 저장소 double에서 실행했다. binding 부재/예외/잘못된 반환값/서명 오류는 모두 거부하며, 만료 및 지연 alarm도 검사했다. |
| SEC-12 미입력과 0 혼동 | `index.ts:3208` 정규화에서 미입력 자산·재량지출·목표현재액·부채/목표 목록을 0/빈 목록으로 바꾸지 않는다. `index.ts:3290`의 순자산·잉여금·저축률·상환비율·목표/보장 차액은 필수값 미확인 시 null과 지표별 `missing_information`을 반환한다. | 빈 snapshot, 부채 월상환액 미입력, 명시적 월상환액 0, 명시적 빈 목록, 자산 0, 목표현재액/보험현재보장 미입력 결과를 구분했다. |

## 검사와 한계

- 신규 `mcp/tests/security-remediation.test.mjs` 8건 통과. `owner-pilot.test.mjs`, `search-compact.test.mjs`의 기존 계약 검사도 새 보안 경계에 맞췄다.
- 전체 MCP 단위 검사 140/140 통과, 실패/skip 0. 명령: `node --experimental-strip-types --test mcp/tests/*.test.mjs`. 외부 연결 선택용 `MCP_URL`, `TOOLS_LIST_FILE` 환경을 제거하고 실행했다. 기존 localhost fixture 검사를 포함한다.
- 독립 검토에서 기존 단일객체 부채 입력 계약의 회귀를 지적받아 보존했다. 단일객체 상환액 0과 null 목록 검사도 추가했다. 최종 보완 후 신규 8건 및 `node mcp/node_modules/typescript/bin/tsc --noEmit -p mcp/tsconfig.json` 재검사 통과.
- Cloudflare의 실제 분산 저장소/리전/장애 동작은 배포 시험하지 않았다. 단위 검사는 실제 backend 함수의 원자적 로직을 검사하며 Cloudflare 인프라 보장을 대신하지 않는다.
- 기존 `weighted_debt_rate_percent`는 명시된 가정대로 알려진 금리의 부채만 계산한다. SEC-12는 지표 계산 경계를 수정한 것이며 별도 재무 시나리오 모델을 변경한 것은 아니다.

## 전체판의 향후 연결 요건

현재 무료 Wrangler 설정에 namespace·migration·진단 변수를 추가하지 않았다. 전체판도 계속 비활성이다. 향후 전체판 활성화를 별도 승인받는 경우에는 `OwnerProofReplayObject`의 Durable Object namespace/migration을 만들고 `OWNER_PILOT_REPLAY_STORE`에 연결해야 한다. 모든 소비 인스턴스가 같은 namespace와 JTI 기반 object 이름을 사용해야 한다. 임의 KV의 get/put이나 인스턴스별 Map으로 대체하면 안 된다. binding이 없거나 저장소 소비가 실패하면 owner pilot은 승인하지 않는다. 승인된 세션이라도 증표는 한 번만 쓰며, 이후 후보 로드 실패 시 재시도에는 새 증표가 필요하다.

진단은 서버 설정을 명시적으로 켜기 전까지 꺼져 있다. 켜더라도 사용자 질의/임의 헤더와 오류 원문을 되살리지 않고 숫자·분류 중심 결과를 사용해야 한다.

## 배포 구분

- 홈페이지: 이 담당 변경만으로는 배포 불필요. 홈페이지 파일을 수정하지 않았다.
- MCP: 코드 변경이 있으므로 향후 승인된 전체 변경 묶음의 MCP 배포 판단에 포함해야 한다. 이번 작업은 로컬 수정/검사만 완료했으며 무료판 경로 확장이나 전체판 활성화는 수행하지 않았다. 의존성 조치는 총괄 담당 보고서를 따른다.
