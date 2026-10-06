# MCP 조치 독립 검토

검토일: 2026-10-06 한국시간. 검토자: 품질 담당. 개발 담당이 수정한 SEC-09~12와 총괄이 수정한 SEC-01을 읽기 전용으로 검토했다. 서비스 소스 수정·배포·외부 API 호출은 수행하지 않았다. 본인이 구현한 SEC-05/07/08의 최종 승인을 뜻하지 않는다.

판정: 아래 후속 보완까지 반영된 로컬 변경에 승인. 이번 검토 범위에서 남은 차단 문제는 찾지 못했다. 원격 반영·운영 배포 완료 판정은 아니다.

## 검토 범위와 결과

| 항목 | 확인한 코드와 근거 | 판정 |
| --- | --- | --- |
| SEC-09 | `mcp/src/tools/pilot-evaluation.ts`, `recommend-shadow.ts`, `recommend-owner-pilot.ts` 및 정규화/적격성 계약을 연결해 읽었다. 정규화된 `hard_constraints`와 검증된 `decision_context`가 실제 평가기로 이어진다. 실제 handler 회귀에서 공급자·기간·위험·유동성 불일치 후보 4개가 제외되고 일치 후보 1개만 남는다. | 승인 |
| SEC-10 | `mcp/src/index.ts`의 진단 생성·요약·헤더/로그 출력을 확인했다. 서버 설정이 없으면 비활성이고, 요청의 임의 식별자/검색어를 저장하지 않는다. 캐시 snapshot은 키나 질의 대신 수치만 노출한다. 실제 함수들을 메모리에서 연결해 임의 입력 헤더와 shard 오류에 합성 민감정보 표식을 넣었으며, 최종 응답 진단 헤더와 `console.log` 모두에서 표식이 없었다. | 승인 |
| SEC-11 | `owner-proof-replay.ts`, `owner-proof-replay-object.ts`, `types/runtime-bindings.ts` 및 서명 검사와 호출 경계를 검토했다. 서명·권한·세대 확인 이후 해시 JTI로 동일 namespace object를 선택하고, `storage.transaction` 안에서 조회·소비 기록·만료 alarm을 함께 수행한다. 저장소 부재/예외는 승인하지 않으며 로컬 Map 대체 경로가 없다. 독립 소비자 12개의 동시 소비 중 1개 승인, 만료 보존 및 지연 alarm 검사가 통과한다. | 현재 비활성 경계에서 승인; 실제 Cloudflare 분산 실행은 미검증 |
| SEC-12 | `index.ts`의 정규화부터 지표 계산까지 읽었다. 미확인 필수값은 null 및 누락 필드로 남고 명시적 0/빈 목록과 구분된다. 검토 중 아래 단일 부채 객체 회귀를 발견했으며 개발 담당의 보완 후 재검사했다. | 보완 후 승인 |
| SEC-01 | root/MCP lock의 변경 버전과 실제 설치된 package 버전을 [dependencies.json](dependencies.json)의 각 항목과 대조했다. 기록된 audit은 두 범위 모두 0건이다. 저장된 실제 bundle과 map 파일 해시를 [bundle-check.json](bundle-check.json)과 대조했고, map에 포함된 fast-uri 3.1.8의 3개 모듈 본문 해시가 실제 설치 파일과 일치했다. [로컬 MCP smoke](local-mcp-smoke.json) 및 로그의 search/fetch/exports 성공 기록을 확인했다. | 로컬 의존성 조치 승인; audit·smoke 자체를 중복 실행한 것은 아님 |

## 독립 검토에서 발견해 보완한 회귀

첫 검토본은 `normalizeFinanceSnapshot({liabilities:{balance_krw:100,monthly_payment_krw:0}})`를 읽고도 `liabilities:null`로 반환했다. 기존 구현이 단일 부채 객체를 배열로 받아들이던 계약이므로, 제공한 값을 미입력으로 처리하는 회귀였다. 합성 입력으로 null 반환을 재현하고 개발 담당에게 전달했다.

개발 담당은 단일 객체도 정규화한 배열을 보존하고 null/미제공은 미확인으로 남기도록 수정했다. 부채 100·월상환 0 입력의 순자산 -100 및 상환비율 0, null 입력의 순자산 null 회귀를 추가했다. 이 최종 상태에서 아래 검사와 타입 검사를 다시 실행해 통과했다.

## 직접 실행한 검사

```text
node --experimental-strip-types --test mcp/tests/security-remediation.test.mjs mcp/tests/owner-pilot.test.mjs mcp/tests/search-compact.test.mjs
node mcp/node_modules/typescript/bin/tsc --noEmit -p mcp/tsconfig.json
```

- 30/30 통과, 실패·skip 0. TypeScript 검사 통과.
- 추가 메모리 실행: 실제 `requestDiagnostics` → `diagnosticsSummary` → `attachDiagnostics` 경로에서 합성 표식이 최종 헤더·로그에 없는 것을 확인했다. 첫 실행은 테스트 의존 상수 하나를 빠뜨려 중단됐고, 상수를 제공한 재실행에서 통과했다. 서비스 오류로 분류하지 않는다.
- 의존성 대조: root/MCP lock 및 설치 버전 일치. 실제 임시 bundle/map 해시 일치, 포함된 fast-uri 모듈 3개의 본문 해시가 설치된 3.1.8과 일치.

## 한계와 배포 경계

전체판 추천·진단 경로는 현재 무료 진입점 `mcp/src/free.ts`에 연결되지 않는다. `wrangler.free.jsonc`에는 replay Durable Object binding/migration이나 진단 활성 설정이 없다. 배포 설정을 바꾸지 않았으며 기능을 활성화하지 않았다.

공유 저장소 검사는 실제 transaction 알고리즘을 직렬화 저장소 double에 연결한 로컬 검사다. Cloudflare 실제 리전·장애·재시도 동작을 검증했다고 주장하지 않는다. 전체판을 별도로 활성화할 때는 모든 인스턴스가 같은 namespace를 사용하도록 provision/migration하고 실제 환경 검증을 해야 한다. 유효 증표 소비 후 후보 로드가 실패하면 새 증표가 필요한 동작은 fail-closed 설계로 문서화돼 있다.

이 검토 범위만으로 홈페이지 배포는 필요하지 않다. MCP 의존성과 코드가 변경됐으므로 전체 조치 묶음의 MCP 배포 판단에는 포함해야 한다. 현재 완료된 것은 로컬 수정에 대한 독립 검증이다.
