---
{
  "id": "tax.income.comprehensive",
  "title": "종합소득세",
  "type": "tax",
  "description": "이자·배당·사업·근로·연금·기타소득 등 종합소득금액에 대해 확정신고하는 소득세 흐름입니다.",
  "parents": [
    "tax.income"
  ],
  "children": [
    "concept.financial-income-comprehensive-taxation"
  ],
  "related": [
    "support.earned-income-tax-credit",
    "filing.income-tax-return",
    "filing.business-income-withholding",
    "scenario.sole-proprietor.compliance",
    "life-income.freelance-income",
    "life-income.side-job-income",
    "scenario.freelancer.income-tax",
    "scenario.employee.side-job-income",
    "concept.additional-tax.general",
    "concept.financial-income-comprehensive-taxation",
    "support.small-business-policy-fund",
    "life-event.small-business-operating-funds"
  ],
  "terms": [
    "term.tax-base",
    "term.tax-rate",
    "term.progressive-deduction",
    "term.deadline-special-rule"
  ],
  "tags": [],
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
    "path": "opentax/disclosures/c90e54af9af3888ead9706c2.json",
    "checksum": "sha256:df70a2f9a272e9479310a4b3e97615752d95ac96c24c8702f7a09bff59414ef0",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "tax.income.comprehensive",
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
        "value": "tax.income.comprehensive"
      }
    }
  ],
  "search_projection": {
    "id": "tax.income.comprehensive",
    "title": "종합소득세",
    "type": "tax",
    "description": "이자·배당·사업·근로·연금·기타소득 등 종합소득금액에 대해 확정신고하는 소득세 흐름입니다.",
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
    "search_text": "종합소득세 이자·배당·사업·근로·연금·기타소득 등 종합소득금액에 대해 확정신고하는 소득세 흐름입니다."
  },
  "record_checksum": "sha256:e28a6b6b7be8294046810597e1c99b34e155caada82b91bae4791ad5754c1539"
}
---

# 종합소득세

이자·배당·사업·근로·연금·기타소득 등 종합소득금액에 대해 확정신고하는 소득세 흐름입니다.

- **1,400만원 이하**: 1,400만원 이하
- **1,400만원 초과 5,000만원 이하**: 1,400만원 초과 5,000만원 이하
- **5,000만원 초과 8,800만원 이하**: 5,000만원 초과 8,800만원 이하
- **8,800만원 초과 1억5,000만원 이하**: 8,800만원 초과 1억5,000만원 이하
- **1억5,000만원 초과 3억원 이하**: 1억5,000만원 초과 3억원 이하
- **3억원 초과 5억원 이하**: 3억원 초과 5억원 이하
- **5억원 초과 10억원 이하**: 5억원 초과 10억원 이하
- **10억원 초과**: 10억원 초과
