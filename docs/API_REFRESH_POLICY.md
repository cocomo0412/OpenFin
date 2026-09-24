# API 자료 갱신 및 날짜 기준

OpenFin은 승인 API의 전체 페이지를 수집하고 JSON·온톨로지·검색에 반영합니다.
보험 약관 전문, 법령 전문, 카드 원문 전체의 수동 검토는 API 갱신의 선행 조건이 아닙니다.

- `collected_at`: 실제 API 수집 시각입니다. 실패 시 기존 성공 자료를 유지합니다.
- `basis_date` (통합 manifest): API 자료 묶음의 최근 수집 기준일입니다.
- `source_review_date` (통합 manifest): 수집본 건수·상품 식별자·필드 매핑을 검증한 날짜입니다. 모든 상품 조건의 법률 검토일이 아닙니다. `source_review_scope`에 범위를 명시합니다.
- 개별 항목의 `source_basis_dates`, 공시월, 통계 기준연월, 시행일: 제공기관 값이며 오늘 날짜로 대체하지 않습니다.
- API가 제공하지 않는 기존 항목의 수집·검토 이력: 실제 확인 없이 날짜를 변경하지 않습니다.
- 응답 오류·누락·스키마 불일치: `collection-inventory.json`의 `pending`과 `canonical-refresh-report.json`의 `unresolved`에 남깁니다. 유효하지 않은 응답으로 기존 데이터를 덮어쓰지 않습니다.

## 실행 순서

1. `python scripts/knowledge/refresh-public-apis.py`
2. `node --env-file=.env scripts/knowledge/collect-finlife-candidates.mjs --catalog-only --write`
3. `node --env-file=.env scripts/knowledge/collect-finlife-additional.mjs`
4. `node --env-file=.env scripts/knowledge/collect-gov24.mjs`
5. `python scripts/knowledge/build-collection-inventory.py`
6. `node scripts/knowledge/link-api-snapshots.mjs`
7. `node scripts/knowledge/integrate-current-data.mjs`
8. `npm run knowledge:build` 및 `npm run knowledge:validate`
9. API 수집·통합 테스트, 공개 파일 비밀키 검사 후 GitHub main에 반영합니다.
10. GitHub Pages와 Cloudflare 무료 MCP의 배포 결과를 확인합니다.

정기 실행 예약은 별도 설정입니다. 현재 명령은 수동 갱신 절차입니다.
