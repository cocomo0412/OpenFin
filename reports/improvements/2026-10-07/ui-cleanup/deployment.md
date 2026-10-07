# 홈페이지 배포 완료

2026-10-07 오후 6시 13분 이후 한국시간 운영 검증 완료.

- 배포 커밋: `2c2b4554682299fd3b98839e61894af82995b79b`.
- [Pages 배포 성공](https://github.com/cocomo0412/OpenFin/actions/runs/37598808270), [검색 품질 검사 성공](https://github.com/cocomo0412/OpenFin/actions/runs/37598808962).
- 홈페이지 HTML 2개, JavaScript, CSS, manifest가 배포 커밋과 바이트 SHA-256까지 일치한다. 상세 값은 [검증 기록](deployment.json)에 있다.
- 공개 검색 화면에서 `대출` 검색·정기예금 분야 선택 후 `개인사업자 대출상품`을 열어 재확인 문구와 상태 배지 0개를 확인했다. 새 JavaScript 버전은 `2026.10.07.2`다.
- 공개 홈 버전은 `KR-FINANCE-ONTOLOGY-MANIFEST-2026.10.07.01`이다.
- 홈 요약 수치 5개 모두 31px이며 같은 24px 위쪽 여백을 적용한다. 별도 행의 기준일 카드에는 구분선 두께 1px이 추가되지만 내부 여백·텍스트 간격은 동일하다.
- [운영 화면](live-metrics.png).
- 전체 push 범위에 MCP 코드·설정·의존성·세금 번들 입력 변경이 없으며 MCP 배포 workflow도 실행되지 않았다.

이 문서는 배포 전 README와 manifest 표기 보고서에 적힌 미배포 상태를 대체하는 최종 운영 기록이다. 배포 이후 증적은 로컬 기록 커밋으로 보존하며, 증적 추가만을 위해 홈페이지 배포를 반복하지 않는다.

사용자팀 신뢰 검토의 7개 추가 제안은 [별도 검토 기록](../mcp-user-trust-review.md)에 있으며 이번 배포에 구현하지 않았다.
