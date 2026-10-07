# MCP 신뢰 검토 높음 3건 조치

조치일: 2026-10-07 (한국시간). 기준 커밋: `130d7edc`.
최신 상태: 사용자 ‘반영’ 요청으로 홈페이지·저장소 반영 완료. 배포 커밋 `921569aba301e8ed1cfd0483a6550ea9210ca36a`. 아래 로컬/미배포 기록은 최초 조치 당시 상태이며, 최종 결과는 문서 하단을 따른다.
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

## 사용자 승인 후 운영 반영

- 요청: “반영”. 앞선 카드 간격 변경과 TRUST-01~03, README·과거 문서 보관을 함께 main에 반영했다.
- 배포 설정 보완: Markdown 문서 수정은 MCP 실행 필터에서 제외한다. workflow만 수정되면 검증을 실행하되 Worker 입력 diff가 없으면 업로드하지 않는다. 수동 실행은 명시적 재배포로 취급한다. MCP 코드·설정·의존성·원자료 변경은 배포 대상으로 유지한다. Git 비교 실패 시 배포를 중단한다.
- 실제 workflow Bash 실행 테스트와 관련 UI 회귀 검사 총 33건 통과. 독립 QA가 scope 테스트를 별도 실행하고 통과 판정했다.
- [Pages 배포](https://github.com/cocomo0412/OpenFin/actions/runs/37612499402): build·deploy 성공.
- [MCP pipeline](https://github.com/cocomo0412/OpenFin/actions/runs/37612501140): validate·scope 성공, deploy **skipped**. MCP 실행 코드·카탈로그 및 운영 Worker는 재배포하지 않았다.
- 공개 파일을 작업 디렉터리의 CRLF 사본이 아닌 배포 커밋의 Git blob과 비교하여 4개 모두 일치 확인했다.

| 공개 파일 | SHA-256 |
| --- | --- |
| index.html | 6156d61475bd0fdd6d6d40b7b9a6d3a551edb1b0f4c3ac7de9e97fc3c05111db |
| explorer.html | 723dbc9913aefaff34a15b321c5b774cef74abf90d024426e1bb4fe9690b1707 |
| styles.css | 33c4a864837c09ab527ae84afe9ed048be45862b51d9c473db8fdd88850240b1 |
| mcp-catalog-status.js | 8e603b1ae5a434a6bc011c4931c616759a4c9c23c38249f493d1cedb91e8782f |

- 공개 브라우저 재확인: `MCP 제공 항목: 399개 · MCP 자료 기준일: 2026-05-04` 정상 표시.
- 실제 화면 폭 680px: 요약 카드 첫 4개 높이 83px, 날짜 카드 118px, 상하 여백 16px, 숫자 글꼴 31px로 일치. 가로 넘침 없음. 임시 화면 크기 설정은 복원했다.
- 이 후속 배포 증적은 로컬 커밋으로 보존하며 배포 대상 기능 파일과 구분한다.
