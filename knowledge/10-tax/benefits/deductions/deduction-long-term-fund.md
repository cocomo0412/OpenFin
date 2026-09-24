---
{
  "deadlines": [
    "deadline.year-end-settlement"
  ],
  "folder": "20_Deductions/IncomeDeductions",
  "basis_year": 2026,
  "id": "deduction.long-term-fund",
  "title": "장기집합투자증권저축",
  "type": "deduction",
  "description": "장기집합투자증권저축에 대한 소득공제입니다.",
  "parents": [
    "deduction.other-income"
  ],
  "children": [],
  "related": [],
  "terms": [
    "term.income-deduction",
    "term.tax-base"
  ],
  "tags": [
    "income-deduction"
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
      "label": "가입기한·공제기간",
      "condition": "2015년 12월 31일까지 가입한 법정 장기집합투자증권저축에 가입일부터 10년간 적용하는 제도입니다. 2026년 새로 가입할 수 있는 소득공제 상품으로 안내하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "공제액·조건",
      "condition": "적격 기간 납입액의 40%를 근로소득금액 한도로 공제하며 연 납입한도는 600만원입니다. 가입 당시 직전 연도 총급여 5천만원 이하 등 요건이 있고, 공제연도 총급여 8천만원 초과 또는 근로소득이 없으면 공제하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "해지",
      "condition": "가입일부터 10년 미만에 인출·해지·양도하면 해당 연도부터 공제하지 않습니다. 5년 미만 해지는 원칙적으로 누적 납입액의 6%를 추징하되 법정 예외와 실제 감면세액 한도를 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.tax-special-treatment-restriction-act.reliefs"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0"
  ],
  "collected_at": "2026-09-23T08:26:25.182612+00:00",
  "source_collected_at": "2026-09-23T08:26:25.182612+00:00",
  "last_source_checked_at": "2026-09-23T08:26:25.182612+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-23T08:26:25.182612+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/3c645c38f91cc49a3c630f55.json",
    "checksum": "sha256:e8843215e7f502ae1b735319c05f65c8e55a429b756393f9c038452dd64e35ab",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "deduction.long-term-fund",
      "collected_at": "2026-09-23T08:26:25.182612+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
      "checksum": "sha256:bf7a2db72fa6b5273f5e3b3483f49305d70145e3c4d3ef89e16b2b1b2280ae80",
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
        "value": "deduction.long-term-fund"
      }
    }
  ],
  "search_projection": {
    "id": "deduction.long-term-fund",
    "title": "장기집합투자증권저축",
    "type": "deduction",
    "description": "장기집합투자증권저축에 대한 소득공제입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.tax-special-treatment-restriction-act.reliefs"
    ],
    "export_id": "tax-ontology",
    "search_text": "장기집합투자증권저축 장기집합투자증권저축에 대한 소득공제입니다."
  },
  "record_checksum": "sha256:ccf8775dfdec78645635471b7858e86907e7ff8fa96574b28d887e5c8761b92d"
}
---

# 장기집합투자증권저축

장기집합투자증권저축에 대한 소득공제입니다.

- **가입기한·공제기간**: 2015년 12월 31일까지 가입한 법정 장기집합투자증권저축에 가입일부터 10년간 적용하는 제도입니다. 2026년 새로 가입할 수 있는 소득공제 상품으로 안내하지 않습니다.
- **공제액·조건**: 적격 기간 납입액의 40%를 근로소득금액 한도로 공제하며 연 납입한도는 600만원입니다. 가입 당시 직전 연도 총급여 5천만원 이하 등 요건이 있고, 공제연도 총급여 8천만원 초과 또는 근로소득이 없으면 공제하지 않습니다.
- **해지**: 가입일부터 10년 미만에 인출·해지·양도하면 해당 연도부터 공제하지 않습니다. 5년 미만 해지는 원칙적으로 누적 납입액의 6%를 추징하되 법정 예외와 실제 감면세액 한도를 적용합니다.
