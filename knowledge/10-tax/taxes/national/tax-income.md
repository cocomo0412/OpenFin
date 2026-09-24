---
{
  "id": "tax.income",
  "title": "소득세",
  "type": "tax",
  "description": "개인의 소득에 과세되는 국세입니다. 종합소득, 퇴직소득, 양도소득 흐름으로 세부 학습 노드를 둡니다.",
  "parents": [
    "category.national-taxes"
  ],
  "children": [
    "tax.income.comprehensive",
    "tax.income.retirement",
    "tax.income.capital-gains"
  ],
  "related": [
    "category.income-deductions",
    "category.tax-credits",
    "local.local-income",
    "support.youth-future-savings",
    "support.youth-leap-account",
    "support.isa"
  ],
  "terms": [
    "term.national-tax",
    "term.tax-law",
    "term.tax-base",
    "term.tax-rate",
    "term.progressive-deduction"
  ],
  "tags": [
    "national-tax"
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
      "label": "1,400만원 이하",
      "basis": "과세표준",
      "condition": "1,400만원 이하",
      "threshold_krw_max": 14000000,
      "rate_percent": 6,
      "progressive_deduction_krw": 0,
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "rate",
      "rate_basis": "과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.income-tax-act.deductions-credits",
      "law_reference": "소득세법 제55조 제1항"
    },
    {
      "label": "1,400만원 초과 5,000만원 이하",
      "basis": "과세표준",
      "condition": "1,400만원 초과 5,000만원 이하",
      "threshold_krw_min": 14000000,
      "threshold_krw_max": 50000000,
      "rate_percent": 15,
      "progressive_deduction_krw": 1260000,
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "rate",
      "rate_basis": "과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.income-tax-act.deductions-credits",
      "law_reference": "소득세법 제55조 제1항"
    },
    {
      "label": "5,000만원 초과 8,800만원 이하",
      "basis": "과세표준",
      "condition": "5,000만원 초과 8,800만원 이하",
      "threshold_krw_min": 50000000,
      "threshold_krw_max": 88000000,
      "rate_percent": 24,
      "progressive_deduction_krw": 5760000,
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "rate",
      "rate_basis": "과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.income-tax-act.deductions-credits",
      "law_reference": "소득세법 제55조 제1항"
    },
    {
      "label": "8,800만원 초과 1억5,000만원 이하",
      "basis": "과세표준",
      "condition": "8,800만원 초과 1억5,000만원 이하",
      "threshold_krw_min": 88000000,
      "threshold_krw_max": 150000000,
      "rate_percent": 35,
      "progressive_deduction_krw": 15440000,
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "rate",
      "rate_basis": "과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.income-tax-act.deductions-credits",
      "law_reference": "소득세법 제55조 제1항"
    },
    {
      "label": "1억5,000만원 초과 3억원 이하",
      "basis": "과세표준",
      "condition": "1억5,000만원 초과 3억원 이하",
      "threshold_krw_min": 150000000,
      "threshold_krw_max": 300000000,
      "rate_percent": 38,
      "progressive_deduction_krw": 19940000,
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "rate",
      "rate_basis": "과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.income-tax-act.deductions-credits",
      "law_reference": "소득세법 제55조 제1항"
    },
    {
      "label": "3억원 초과 5억원 이하",
      "basis": "과세표준",
      "condition": "3억원 초과 5억원 이하",
      "threshold_krw_min": 300000000,
      "threshold_krw_max": 500000000,
      "rate_percent": 40,
      "progressive_deduction_krw": 25940000,
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "rate",
      "rate_basis": "과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.income-tax-act.deductions-credits",
      "law_reference": "소득세법 제55조 제1항"
    },
    {
      "label": "5억원 초과 10억원 이하",
      "basis": "과세표준",
      "condition": "5억원 초과 10억원 이하",
      "threshold_krw_min": 500000000,
      "threshold_krw_max": 1000000000,
      "rate_percent": 42,
      "progressive_deduction_krw": 35940000,
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "rate",
      "rate_basis": "과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.income-tax-act.deductions-credits",
      "law_reference": "소득세법 제55조 제1항"
    },
    {
      "label": "10억원 초과",
      "basis": "과세표준",
      "condition": "10억원 초과",
      "threshold_krw_min": 1000000000,
      "rate_percent": 45,
      "progressive_deduction_krw": 65940000,
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "rate",
      "rate_basis": "과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.income-tax-act.deductions-credits",
      "law_reference": "소득세법 제55조 제1항"
    }
  ],
  "sources": [
    "source.law.income-tax-act.deductions-credits"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
  ],
  "collected_at": "2026-09-23T08:26:20.830416+00:00",
  "source_collected_at": "2026-09-23T08:26:20.830416+00:00",
  "last_source_checked_at": "2026-09-23T08:26:20.830416+00:00",
  "last_reviewed_at": "2026-09-23T08:26:20.830416+00:00",
  "reviewed_at": "2026-09-23T08:26:20.830416+00:00",
  "refresh_generation": "2026-09-23T08:26:20.830416+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/5cf1c5c515956c7317d1c77c.json",
    "checksum": "sha256:2966d16f45c5eda5dd224892fce2d2d40df0745a59e965d1bcd89dfd82b6ae2a",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "tax.income",
      "collected_at": "2026-09-23T08:26:20.830416+00:00",
      "reviewed_at": "2026-09-23T08:26:20.830416+00:00",
      "checksum": "sha256:75c504ac6e07a5d3eebe4ea12252fd68aeb035939f7dbee34cf260070a4d3013",
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
        "value": "tax.income"
      }
    }
  ],
  "search_projection": {
    "id": "tax.income",
    "title": "소득세",
    "type": "tax",
    "description": "개인의 소득에 과세되는 국세입니다. 종합소득, 퇴직소득, 양도소득 흐름으로 세부 학습 노드를 둡니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.income-tax-act.deductions-credits"
    ],
    "export_id": "tax-ontology",
    "search_text": "소득세 개인의 소득에 과세되는 국세입니다. 종합소득, 퇴직소득, 양도소득 흐름으로 세부 학습 노드를 둡니다."
  },
  "record_checksum": "sha256:e67131cb138efea033c966be2c693567bc181c9503ba2a6fe0a8966c6a024997"
}
---

# 소득세

개인의 소득에 과세되는 국세입니다. 종합소득, 퇴직소득, 양도소득 흐름으로 세부 학습 노드를 둡니다.

- **1,400만원 이하**: 1,400만원 이하
- **1,400만원 초과 5,000만원 이하**: 1,400만원 초과 5,000만원 이하
- **5,000만원 초과 8,800만원 이하**: 5,000만원 초과 8,800만원 이하
- **8,800만원 초과 1억5,000만원 이하**: 8,800만원 초과 1억5,000만원 이하
- **1억5,000만원 초과 3억원 이하**: 1억5,000만원 초과 3억원 이하
- **3억원 초과 5억원 이하**: 3억원 초과 5억원 이하
- **5억원 초과 10억원 이하**: 5억원 초과 10억원 이하
- **10억원 초과**: 10억원 초과
