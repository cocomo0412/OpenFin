# OpenFin API 수집·연결·배포

## 2026-09-23 반영

- 공식 공공 API·한국은행: 16개 출처, 27개 수집본, 62,550행.
- 금융감독원: 은행·저축은행 전체 페이지 예금 432개, 적금 335개. 추가 후 총 17개 출처, 29개 수집본, 63,317행.
- 기존 예금·적금 758개를 source_record_id, provider_code, product_code 모두 일치하는 경우에만 최신 수집본과 연결. 나머지 9개는 새 API 자료 검색에서 조회 가능.
- 예금자보호 상품: JSON 형식과 operation 래퍼 지원으로 기존 12페이지 오류 해결. 45,226개 연속 행번호 검증 완료.
- 국내은행 통계: 표별 totalCount 합산·표별 누락 검증. 2026년 3월 기준 818행 확인.
- 서민금융 API의 겹치는 페이지는 고유 ID로 중복 제거하고 같은 ID의 내용 충돌 시 실패 처리.

## 데이터 계층과 날짜

`docs/opentax/api-snapshots/`는 공식 원자료 필드를 보존한 참고용 수집본이다. `collection-inventory.json`은 수집일, 원자료 기준일, 범위를 기록한다. `api-record-links.json`은 기존 온톨로지와 최신 금융감독원 공시의 정확한 상품 식별자 연결이다.

상품의 비교·추천 검증을 수집 성공만으로 승격하지 않는다. 기존 온톨로지 관계·검토일은 보존하며 탐색기에서 최신 API 공시를 별도로 연결한다. 최신 API 자료는 `api-data.html`에서 검색한다. 세금·지자체 지원·카드·연금저축·세제혜택 계좌의 기존 자료를 이번 API 수집으로 재검증했다고 표시하지 않는다.

홈페이지 최종 기준일은 공식 API 수집본의 최종 수집 기준일(2026-09-23)이다. 원자료 기준일과 기존 온톨로지 검토일은 별도이며, 모든 상품이 해당 날짜로 재검증됐다는 의미는 아니다.

## 로컬 수집 명령

인증키는 Git에서 제외되는 루트 `.env`의 `FINLIFE_API_KEY`, `DATA_GO_KR_SERVICE_KEY`, `ECOS_API_KEY`에서 읽는다. 키를 공개 JSON·명령줄·로그에 포함하지 않는다.

```sh
node --env-file=.env scripts/knowledge/collect-finlife-candidates.mjs --catalog-only --write
python scripts/knowledge/collect-public-apis.py --source source.kdic.insured-products --all-pages --param numOfRows=1000 --write
python scripts/knowledge/collect-public-apis.py --source source.fsc.domestic-bank-statistics --all-pages --param basYm=202603 --write
python scripts/knowledge/build-collection-inventory.py
node scripts/knowledge/link-api-snapshots.mjs
node scripts/knowledge/build.mjs
node scripts/knowledge/validate.mjs
```

다른 API는 `public-api-catalog.json`의 source ID와 operation 번호를 사용한다. 최신 기준일을 확인하고 basDt/basYm/bizYear 필터를 명시한다. 호출 가능한 가장 최근 자료가 오늘 자료라고 가정하지 않는다. 부분 수집은 저장하지 않으며 `.api-candidates/`는 Git 제외한다.

ECOS는 `--source source.bok.ecos --param stat_code=722Y001 --param cycle=D --param start=20260901 --param end=20260923 --param item_code=0101000 --all-pages --write`와 같이 조회한다. 복합 항목 차원이 필요한 다른 통계는 추가 구현이 필요하다.

## 배포

홈페이지는 GitHub main의 /docs에서 배포한다. Cloudflare Git 연동은 mcp 경로의 무료 설정을 사용한다. 수동 배포 시 `wrangler deploy --config wrangler.free.jsonc`를 사용한다. 유료 전체 서버 배포 워크플로는 실행하지 않는다. 무료 MCP는 계속 세금 387개 스냅샷 범위이며 금융 API 전체를 MCP에 제공한다고 표시하지 않는다.
