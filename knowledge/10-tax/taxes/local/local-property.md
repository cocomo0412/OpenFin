---
{
  "deadlines": [
    "deadline.local.property.first",
    "deadline.local.property.second"
  ],
  "folder": "10_Taxes/Local",
  "basis_year": 2026,
  "id": "local.property",
  "title": "재산세",
  "type": "tax",
  "description": "기존 구조화 표는 지방세법 제111조의 일반 주택·토지 세율입니다. 1세대 1주택 특례와 조례상 조정, 감면을 적용하기 전의 기준입니다.",
  "parents": [
    "category.local-ordinary-taxes"
  ],
  "children": [],
  "related": [
    "tax.comprehensive-real-estate",
    "concept.cre-tax-base-date",
    "concept.cre-deduction-thresholds",
    "scenario.homeowner.real-estate-tax"
  ],
  "terms": [
    "term.local-tax",
    "term.publicly-notified-price",
    "term.tax-rate"
  ],
  "tags": [
    "local-tax"
  ],
  "publication_memberships": [
    "korea-tax-ontology-2026.json"
  ],
  "search_shard": "reference",
  "status": "reference_only",
  "sales_status": "unknown",
  "recommendation_status": "reference_only",
  "recommendation_scope": "listing_only",
  "comparison_engine_gate_passed": false,
  "domain_gate_passed": false,
  "criteria": [
    {
      "label": "주택 6천만원 이하",
      "basis": "재산세 과세표준",
      "condition": "주택 6천만원 이하; 일반세율, 1세대 1주택 특례·조례 조정 적용 전",
      "threshold_krw_max": 60000000,
      "rate_percent": 0.1,
      "progressive_deduction_krw": 0,
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "rate",
      "rate_basis": "재산세 과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.local-tax-act.rates",
      "law_reference": "지방세법 제111조"
    },
    {
      "label": "주택 1억5천만원 이하",
      "basis": "재산세 과세표준",
      "condition": "주택 1억5천만원 이하; 일반세율, 1세대 1주택 특례·조례 조정 적용 전",
      "threshold_krw_max": 150000000,
      "rate_percent": 0.15,
      "progressive_deduction_krw": 30000,
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "rate",
      "rate_basis": "재산세 과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.local-tax-act.rates",
      "law_reference": "지방세법 제111조"
    },
    {
      "label": "주택 3억원 이하",
      "basis": "재산세 과세표준",
      "condition": "주택 3억원 이하; 일반세율, 1세대 1주택 특례·조례 조정 적용 전",
      "threshold_krw_max": 300000000,
      "rate_percent": 0.25,
      "progressive_deduction_krw": 180000,
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "rate",
      "rate_basis": "재산세 과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.local-tax-act.rates",
      "law_reference": "지방세법 제111조"
    },
    {
      "label": "주택 3억원 초과",
      "basis": "재산세 과세표준",
      "condition": "주택 3억원 초과; 일반세율, 1세대 1주택 특례·조례 조정 적용 전",
      "threshold_krw_min": 300000000,
      "rate_percent": 0.4,
      "progressive_deduction_krw": 630000,
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "rate",
      "rate_basis": "재산세 과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.local-tax-act.rates",
      "law_reference": "지방세법 제111조"
    },
    {
      "label": "종합합산 5천만원 이하",
      "basis": "재산세 과세표준",
      "condition": "종합합산 5천만원 이하; 일반세율, 1세대 1주택 특례·조례 조정 적용 전",
      "threshold_krw_max": 50000000,
      "rate_percent": 0.2,
      "progressive_deduction_krw": 0,
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "rate",
      "rate_basis": "재산세 과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.local-tax-act.rates",
      "law_reference": "지방세법 제111조"
    },
    {
      "label": "종합합산 1억원 이하",
      "basis": "재산세 과세표준",
      "condition": "종합합산 1억원 이하; 일반세율, 1세대 1주택 특례·조례 조정 적용 전",
      "threshold_krw_max": 100000000,
      "rate_percent": 0.3,
      "progressive_deduction_krw": 50000,
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "rate",
      "rate_basis": "재산세 과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.local-tax-act.rates",
      "law_reference": "지방세법 제111조"
    },
    {
      "label": "종합합산 1억원 초과",
      "basis": "재산세 과세표준",
      "condition": "종합합산 1억원 초과; 일반세율, 1세대 1주택 특례·조례 조정 적용 전",
      "threshold_krw_min": 100000000,
      "rate_percent": 0.5,
      "progressive_deduction_krw": 250000,
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "rate",
      "rate_basis": "재산세 과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.local-tax-act.rates",
      "law_reference": "지방세법 제111조"
    },
    {
      "label": "별도합산 2억원 이하",
      "basis": "재산세 과세표준",
      "condition": "별도합산 2억원 이하; 일반세율, 1세대 1주택 특례·조례 조정 적용 전",
      "threshold_krw_max": 200000000,
      "rate_percent": 0.2,
      "progressive_deduction_krw": 0,
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "rate",
      "rate_basis": "재산세 과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.local-tax-act.rates",
      "law_reference": "지방세법 제111조"
    },
    {
      "label": "별도합산 10억원 이하",
      "basis": "재산세 과세표준",
      "condition": "별도합산 10억원 이하; 일반세율, 1세대 1주택 특례·조례 조정 적용 전",
      "threshold_krw_max": 1000000000,
      "rate_percent": 0.3,
      "progressive_deduction_krw": 200000,
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "rate",
      "rate_basis": "재산세 과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.local-tax-act.rates",
      "law_reference": "지방세법 제111조"
    },
    {
      "label": "별도합산 10억원 초과",
      "basis": "재산세 과세표준",
      "condition": "별도합산 10억원 초과; 일반세율, 1세대 1주택 특례·조례 조정 적용 전",
      "threshold_krw_min": 1000000000,
      "rate_percent": 0.4,
      "progressive_deduction_krw": 1200000,
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "rate",
      "rate_basis": "재산세 과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.local-tax-act.rates",
      "law_reference": "지방세법 제111조"
    },
    {
      "label": "일반세율 적용 범위",
      "condition": "기존 구조화 표는 지방세법 제111조의 일반 주택·토지 세율입니다. 1세대 1주택 특례와 조례상 조정, 감면을 적용하기 전의 기준입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제110조·지방세법 제111조·지방세법 제111조의2·지방세법 제114조·지방세법 제115조"
    },
    {
      "label": "1세대 1주택 특례",
      "condition": "법정 1세대 1주택으로 시가표준액 9억원 이하이면 과세표준 6천만원 이하 0.05%, 6천만원 초과 1억5천만원 이하 3만원+초과분 0.1%, 1억5천만원 초과 3억원 이하 12만원+초과분 0.2%, 3억원 초과 42만원+초과분 0.35%입니다. 현행 특례는 2026년 12월 28일까지 성립한 납세의무에 한정됩니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제110조·지방세법 제111조·지방세법 제111조의2·지방세법 제114조·지방세법 제115조"
    },
    {
      "label": "과세기준·납기",
      "condition": "과세기준일은 6월 1일입니다. 토지는 9월 16~30일, 건축물·선박·항공기는 7월 16~31일, 주택은 7월과 9월에 절반씩 납부합니다. 주택 세액 20만원 이하는 조례에 따라 7월에 전액 부과할 수 있습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제110조·지방세법 제111조·지방세법 제111조의2·지방세법 제114조·지방세법 제115조"
    },
    {
      "label": "과세표준",
      "condition": "시가표준액과 과세표준은 다릅니다. 토지·건축물·주택에는 법정 공정시장가액비율을 적용하고 주택 과세표준상한 등 별도 규정도 확인해야 합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제110조·지방세법 제111조·지방세법 제111조의2·지방세법 제114조·지방세법 제115조"
    }
  ],
  "sources": [
    "source.law.local-tax-act.rates"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
  ],
  "collected_at": "2026-09-23T08:26:22.571307+00:00",
  "source_collected_at": "2026-09-23T08:26:22.571307+00:00",
  "last_source_checked_at": "2026-09-23T08:26:22.571307+00:00",
  "last_reviewed_at": "2026-09-23T08:26:22.571307+00:00",
  "reviewed_at": "2026-09-23T08:26:22.571307+00:00",
  "refresh_generation": "2026-09-23T08:26:22.571307+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/bcf280996c36044fb8aa0cef.json",
    "checksum": "sha256:fbb954fe735c2ffaa650cb356fd200b37398e3302ed0faf46c9d19af9abeab06",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:22.571307+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.local-tax-act.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "local.property",
      "collected_at": "2026-09-23T08:26:22.571307+00:00",
      "reviewed_at": "2026-09-23T08:26:22.571307+00:00",
      "checksum": "sha256:9f5ef4724aa36b1f62bd0e36aa912309144e85c3e1bc880c960e66d467418995",
      "checksum_scope": "official-disclosure-response",
      "verification_status": "listing_only",
      "supported_fields": [
        "title",
        "description",
        "criteria",
        "current_disclosure"
      ],
      "locator": {
        "kind": "record-id",
        "value": "local.property"
      }
    }
  ],
  "search_projection": {
    "id": "local.property",
    "title": "재산세",
    "type": "tax",
    "description": "기존 구조화 표는 지방세법 제111조의 일반 주택·토지 세율입니다. 1세대 1주택 특례와 조례상 조정, 감면을 적용하기 전의 기준입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.local-tax-act.rates"
    ],
    "export_id": "tax-ontology",
    "search_text": "재산세 기존 구조화 표는 지방세법 제111조의 일반 주택·토지 세율입니다. 1세대 1주택 특례와 조례상 조정, 감면을 적용하기 전의 기준입니다."
  },
  "record_checksum": "sha256:8a4617340ce85d57a21b4cf0a7dfde9a78d2262de7dfab79fe7ec647d8a189ca"
}
---

# 재산세

기존 구조화 표는 지방세법 제111조의 일반 주택·토지 세율입니다. 1세대 1주택 특례와 조례상 조정, 감면을 적용하기 전의 기준입니다.

- **주택 6천만원 이하**: 주택 6천만원 이하; 일반세율, 1세대 1주택 특례·조례 조정 적용 전
- **주택 1억5천만원 이하**: 주택 1억5천만원 이하; 일반세율, 1세대 1주택 특례·조례 조정 적용 전
- **주택 3억원 이하**: 주택 3억원 이하; 일반세율, 1세대 1주택 특례·조례 조정 적용 전
- **주택 3억원 초과**: 주택 3억원 초과; 일반세율, 1세대 1주택 특례·조례 조정 적용 전
- **종합합산 5천만원 이하**: 종합합산 5천만원 이하; 일반세율, 1세대 1주택 특례·조례 조정 적용 전
- **종합합산 1억원 이하**: 종합합산 1억원 이하; 일반세율, 1세대 1주택 특례·조례 조정 적용 전
- **종합합산 1억원 초과**: 종합합산 1억원 초과; 일반세율, 1세대 1주택 특례·조례 조정 적용 전
- **별도합산 2억원 이하**: 별도합산 2억원 이하; 일반세율, 1세대 1주택 특례·조례 조정 적용 전
- **별도합산 10억원 이하**: 별도합산 10억원 이하; 일반세율, 1세대 1주택 특례·조례 조정 적용 전
- **별도합산 10억원 초과**: 별도합산 10억원 초과; 일반세율, 1세대 1주택 특례·조례 조정 적용 전
- **일반세율 적용 범위**: 기존 구조화 표는 지방세법 제111조의 일반 주택·토지 세율입니다. 1세대 1주택 특례와 조례상 조정, 감면을 적용하기 전의 기준입니다.
- **1세대 1주택 특례**: 법정 1세대 1주택으로 시가표준액 9억원 이하이면 과세표준 6천만원 이하 0.05%, 6천만원 초과 1억5천만원 이하 3만원+초과분 0.1%, 1억5천만원 초과 3억원 이하 12만원+초과분 0.2%, 3억원 초과 42만원+초과분 0.35%입니다. 현행 특례는 2026년 12월 28일까지 성립한 납세의무에 한정됩니다.
- **과세기준·납기**: 과세기준일은 6월 1일입니다. 토지는 9월 16~30일, 건축물·선박·항공기는 7월 16~31일, 주택은 7월과 9월에 절반씩 납부합니다. 주택 세액 20만원 이하는 조례에 따라 7월에 전액 부과할 수 있습니다.
- **과세표준**: 시가표준액과 과세표준은 다릅니다. 토지·건축물·주택에는 법정 공정시장가액비율을 적용하고 주택 과세표준상한 등 별도 규정도 확인해야 합니다.
