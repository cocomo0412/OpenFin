# 갱신 보류·유지 항목 관리

기준일: 2026-09-24

이 보고서는 내부 작업용이며 홈페이지에 표시하지 않습니다. 빌드할 때 자동 재생성합니다.

| 구분 | 항목 수 | 다음 조치 |
|---|---:|---|
| 금일 반영 | 72,953 | 추가 작업 없음 |
| 최신 전체 목록에서 미확인 | 296 | 다음 전체 수집에서 동일 식별자를 재대조합니다. 판매 종료로 단정하지 않습니다. |
| 구조·출처·용어 정보 유지 | 306 | API 매일 갱신 대상에서 분리합니다. 정의나 출처가 변경될 때 검토합니다. |
| 이전 성공 자료 유지 | 6,566 | 기존 성공 이력을 재사용하고 다음 수집 경로를 확인합니다. 오늘 미수집한 원인을 오류로 추정하지 않습니다. |
| 미갱신 원인 추가 분류 필요 | 410 | API 제공 범위·식별자 매핑·수집기 구현 여부를 확인한 뒤 원인을 확정합니다. |

전체 80,531개 중 금일 미반영 7,578개입니다.

## 요청 단위 오류: 5건

위 항목 수에 더하지 않습니다. 오류 5건을 미갱신 자료 5개로 해석하거나, 연금 전체에 오류를 일괄 귀속하지 않습니다.

- source.fss.finlife.api / annuitySavingProductsSearch / 020000: Unexpected schema: response is not retirement savings
- source.fss.finlife.api / annuitySavingProductsSearch / 030200: Unexpected schema: response is not retirement savings
- source.fss.finlife.api / annuitySavingProductsSearch / 030300: Unexpected schema: response is not retirement savings
- source.fss.finlife.api / annuitySavingProductsSearch / 050000: Unexpected schema: response is not retirement savings
- source.fss.finlife.api / annuitySavingProductsSearch / 060000: Incomplete pagination

## 다음 작업 순서

1. 요청 단위 오류만 먼저 재시도합니다. 이미 정상 수집한 API의 승인 절차를 반복하지 않습니다.
2. 최신 목록 미확인 항목은 다음 전체 수집 때 ID로 재대조합니다.
3. 이전 성공 자료는 해당 자료의 마지막 성공일을 확인하고 재수집합니다.
4. 원인 미분류 항목만 제공 범위·수집기·매핑을 조사합니다. 추정으로 오류/미구현 판정을 내리지 않습니다.
5. 구조·출처·용어는 정의 변경 시 검토하며, 매일 상품 수집 실패 건수에 포함하지 않습니다.

항목별 ID·분야·사유·근거·마지막 성공일·다음 조치는 [current.json](current.json)에 보관합니다.
