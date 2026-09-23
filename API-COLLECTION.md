# OpenFin API 수집·연결·배포

## 2026-09-23 본문 통합 갱신

- 공식 API 18개 출처, 40개 수집본을 보관합니다. 수집본의 행 수에는 서로 다른 통계·명세와 중복 상품이 포함되므로 고유 상품 수로 해석하지 않습니다.
- 예금 432개·적금 335개의 공시 필드, 추가 대출 281개, 서민금융 대출 318개를 실제 온톨로지 본문에 반영했습니다.
- 예금자보호 상품 45,226개는 회사·상품명·등록일을 대조해 기존 ID를 유지하거나 새 ID를 부여했습니다. 페이지 행번호를 영구 식별자로 사용하지 않습니다.
- 행정안전부 공공서비스 10,933개를 수집해 지방기관 혜택 및 기존 항목 9,281개를 본문에 통합했습니다. 처음 통합할 때 기존 7,593개를 갱신하고 1,688개를 추가했습니다. 이번 목록에 없는 125개는 종료로 단정하지 않고 과거 자료로 구분합니다.
- 원문 통계·공시는 `api-observation` 유형으로 보존합니다. 보험 통계 수집이 기존 보험 상품의 약관 검토를 대신하지 않습니다.
- 카드 혜택, 세금·공제 법령, 세제혜택 계좌, 보험 상품별 보장·약관, 연금저축 상세 공시는 별도 검증이 남아 있습니다. 해당 자료의 과거 수집·검토일은 변경하지 않습니다.

## 이전 수집·연결 단계

- 공식 공공 API·한국은행: 16개 출처, 27개 수집본, 62,550행.
- 금융감독원: 은행·저축은행 전체 페이지 예금 432개, 적금 335개. 추가 후 총 17개 출처, 29개 수집본, 63,317행.
- 기존 예금·적금 758개를 source_record_id, provider_code, product_code 모두 일치하는 경우에만 최신 수집본과 연결. 나머지 9개는 새 API 자료 검색에서 조회 가능.
- 예금자보호 상품: JSON 형식과 operation 래퍼 지원으로 기존 12페이지 오류 해결. 45,226개 연속 행번호 검증 완료.
- 국내은행 통계: 표별 totalCount 합산·표별 누락 검증. 2026년 3월 기준 818행 확인.
- 서민금융 API의 겹치는 페이지는 고유 ID로 중복 제거하고 같은 ID의 내용 충돌 시 실패 처리.

## 데이터 계층과 날짜

`docs/opentax/api-snapshots/`는 공식 원자료 필드를 보존한 참고용 수집본이다. `collection-inventory.json`은 수집일, 원자료 기준일, 범위를 기록한다. `api-record-links.json`은 기존 온톨로지와 최신 금융감독원 공시의 정확한 상품 식별자 연결이다.

상품의 비교·추천 검증을 수집 성공만으로 승격하지 않는다. 갱신 항목은 기존 그래프 ID와 관계를 유지하며 공시 본문·검색 필드를 새 응답으로 교체한다. 수집·매핑 검증일과 제공기관의 원자료 기준일을 구분한다. 미갱신 항목과 이번 목록에서 찾지 못한 항목은 과거 날짜를 유지한다. 전체 원문은 `api-data.html`, 통합 범위는 `canonical-refresh-report.json`에서 확인한다.

80MiB를 넘는 공개 export는 `openfin-sharded-export-v1` 루트와 분할 파일로 저장한다. 루트의 `shards` 목록을 순서대로 읽고 `items` 및 `reference_items`를 합쳐야 전체 export가 된다. 공통 `json()`과 웹 탐색기는 이를 처리한다. 체크섬은 합친 전체 배열을 기준으로 검증한다.

홈페이지 최종 기준일은 공식 API 수집본의 최종 수집 기준일(2026-09-23)이다. 원자료 기준일과 기존 온톨로지 검토일은 별도이며, 모든 상품이 해당 날짜로 재검증됐다는 의미는 아니다.

## 로컬 수집 명령

인증키는 Git에서 제외되는 루트 `.env`의 `FINLIFE_API_KEY`, `DATA_GO_KR_SERVICE_KEY`, `ECOS_API_KEY`에서 읽는다. 키를 공개 JSON·명령줄·로그에 포함하지 않는다.

```sh
node --env-file=.env scripts/knowledge/collect-finlife-candidates.mjs --catalog-only --write
python scripts/knowledge/collect-public-apis.py --source source.kdic.insured-products --all-pages --param numOfRows=1000 --write
python scripts/knowledge/collect-public-apis.py --source source.fsc.domestic-bank-statistics --all-pages --param basYm=202603 --write
python scripts/knowledge/build-collection-inventory.py
node scripts/knowledge/link-api-snapshots.mjs
node --env-file=.env scripts/knowledge/collect-finlife-additional.mjs
node --env-file=.env scripts/knowledge/collect-gov24.mjs
node scripts/knowledge/integrate-current-data.mjs
node scripts/knowledge/build.mjs
node scripts/knowledge/validate.mjs
```

다른 API는 `public-api-catalog.json`의 source ID와 operation 번호를 사용한다. 최신 기준일을 확인하고 basDt/basYm/bizYear 필터를 명시한다. 호출 가능한 가장 최근 자료가 오늘 자료라고 가정하지 않는다. 부분 수집은 저장하지 않으며 `.api-candidates/`는 Git 제외한다.

ECOS는 `--source source.bok.ecos --param stat_code=722Y001 --param cycle=D --param start=20260901 --param end=20260923 --param item_code=0101000 --all-pages --write`와 같이 조회한다. 복합 항목 차원이 필요한 다른 통계는 추가 구현이 필요하다.

## 배포

홈페이지는 GitHub main의 /docs에서 배포한다. Cloudflare Git 연동은 mcp 경로의 무료 설정을 사용한다. 수동 배포 시 `wrangler deploy --config wrangler.free.jsonc`를 사용한다. 유료 전체 서버 배포 워크플로는 실행하지 않는다. 무료 MCP는 계속 세금 387개 스냅샷 범위이며 금융 API 전체를 MCP에 제공한다고 표시하지 않는다.
