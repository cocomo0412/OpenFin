# MCP 신뢰 검토 높음 3건 조치

조치일: 2026-10-07 (한국시간). 기준 커밋: `130d7edc`.
사용자 요청: “수정사항 높음 3개도 조치”. 구현: PM·화면 담당, 독립 QA: `manifest_padding_qa`.

| 항목 | 조치 | 상태 |
| --- | --- | --- |
| TRUST-01 | 홈 소개·운영 목적·MCP 흐름·샤드 설명에서 웹 전체 금융 자료와 무료 MCP 세금·공제 검색·조회를 구분. 웹 갱신이 MCP에 자동 반영되지 않음을 설명 | 로컬 수정·검증 완료 |
| TRUST-02 | 웹 날짜를 ‘웹 API 기준일’로 명명. 연결 영역에 MCP의 공식기관 웹 문서 기반 출처를 표시. 운영 `/health`의 MCP 건수·기준일을 별도로 읽으며 웹 manifest 값으로 대체하지 않음 | 로컬 수정·검증 완료 |
| TRUST-03 | 루트·MCP README를 현재 무료판으로 통일. 수기 387개 삭제, 실제 메타데이터 안내. 갱신 목표를 7일 간격으로 정정. 과거 전체판 README를 원문 보존·비운영 표시하여 별도 보관 | 로컬 수정·검증 완료 |

## 확인 근거

- 운영 `/health` 읽기 전용 확인: `edition=free-tax-pilot`, `domain=tax`, `item_count=399`, `basis_date=2026-05-04`, `source_version=KR-TAX-OBSIDIAN-ONTOLOGY-2026.05.05.1`.
- 운영 서버에 `Origin: https://cocomo0412.github.io`로 요청하여 해당 출처의 CORS 허용을 확인했다. API 키·쿠키 없이 공개 메타데이터만 조회한다.
- 로컬 4176은 기존 Worker 허용 출처에 포함되지 않아 실패 안내가 표시됨을 확인했다. 보안 설정을 넓히지 않고 기존 허용 출처인 `http://127.0.0.1:6274`에서 같은 페이지를 검증했다.
- 브라우저 실제 DOM: `MCP 제공 항목: 399개 · MCP 자료 기준일: 2026-05-04`. 실제 CSS 폭 850px에서 가로 넘침 없음. 스크린샷 도구는 빈 화면을 반환하여 이미지 증적 대신 DOM 관찰 결과를 기록한다.
- `node --test tests/knowledge/mcp-catalog-status.test.mjs tests/knowledge/ui-search-input.test.mjs tests/knowledge/ui-search-contract.test.mjs`: 32건 통과. 신규 3개 테스트는 정상/변경된 메타데이터, 네트워크·시간초과·HTTP·JSON·형식 오류, 표시 영역 없는 페이지를 검증한다.
- 독립 QA 통과: 구현과 분리하여 diff·신규 테스트 3건·형식 검사·이전 README 원문 보존·기존 카드 간격 변경 보존 확인. 추가 수정 필요 사항 없음.
- MCP 도구 호출·실제 연결 성공을 검사한 결과로 해석하지 않는다. 원자료 수집·카탈로그 재생성·날짜 변경은 수행하지 않았다.

## 반영 범위

- 홈페이지: `docs/index.html`과 신규 `docs/mcp-catalog-status.js` 반영 필요. 앞선 `130d7edc`의 좁은 화면 카드 간격 변경도 미배포 상태로 보존했다.
- 저장소 문서: 루트/MCP README와 과거 문서·조치 증적 반영 필요.
- MCP: 실행 코드·설정·의존성·카탈로그 입력 변경 없음. 기능상 Worker 재배포는 필요하지 않다. 다만 현재 workflow의 `mcp/**` 필터에는 README도 포함되어 **그대로 main에 push하면 불필요한 자동 MCP 배포가 실행된다**. 다음 원격 반영에서 이 필터와 배포 실행 범위를 먼저 처리해야 한다. 이번 수정에서는 배포 설정을 변경하지 않았다.
- 이번 회차 원격 push·홈페이지 배포·MCP 배포는 수행하지 않았다. TRUST-04~07은 후속 제안으로 남긴다.
