---
{
  "deadlines": [
    "deadline.year-end-settlement"
  ],
  "folder": "20_Deductions/IncomeDeductions",
  "basis_year": 2026,
  "id": "deduction.small-business-mutual-aid",
  "title": "소기업·소상공인 공제부금",
  "type": "deduction",
  "description": "노란우산 등 소기업·소상공인 공제부금에 대한 소득공제입니다.",
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
      "label": "납입액·한도",
      "condition": "법정 소기업·소상공인 공제부금 납입액과 소득구간별 한도 중 적은 금액을 기초로 공제합니다. 사업소득 4천만원 이하 600만원, 4천만원 초과 6천만원 이하 500만원, 6천만원 초과 1억원 이하 400만원, 1억원 초과 200만원입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "부동산임대·법인대표",
      "condition": "사업소득 중 부동산임대업 소득을 제외한 비율을 위 기초금액에 곱하며, 공제액도 해당 비임대 사업소득을 한도로 합니다. 법인 대표자는 해당 과세기간 총급여 8천만원 이하인 경우 근로소득금액 기준을 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "수령·해지",
      "condition": "폐업 등 법정 사유에 따른 공제금은 법정 계산에 따른 퇴직소득으로 과세합니다. 일반 중도해지 환급금은 기타소득이며, 120개월 이상 납입 후 법정 경영악화 사유 등 예외에는 퇴직소득 규정을 적용합니다.",
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
    "path": "opentax/disclosures/ab3ad08b6f800855fce8b3d5.json",
    "checksum": "sha256:cf2864f46ea3eeb8418d21a9a349079cdf8008c0d6e5f80bd1807bed7bcb33dc",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "deduction.small-business-mutual-aid",
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
        "value": "deduction.small-business-mutual-aid"
      }
    }
  ],
  "search_projection": {
    "id": "deduction.small-business-mutual-aid",
    "title": "소기업·소상공인 공제부금",
    "type": "deduction",
    "description": "노란우산 등 소기업·소상공인 공제부금에 대한 소득공제입니다.",
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
    "search_text": "소기업·소상공인 공제부금 노란우산 등 소기업·소상공인 공제부금에 대한 소득공제입니다."
  },
  "record_checksum": "sha256:19516b1723c452c517c739117c8f3f8c7d8699356253bd2f914c20ad8053151a"
}
---

# 소기업·소상공인 공제부금

노란우산 등 소기업·소상공인 공제부금에 대한 소득공제입니다.

- **납입액·한도**: 법정 소기업·소상공인 공제부금 납입액과 소득구간별 한도 중 적은 금액을 기초로 공제합니다. 사업소득 4천만원 이하 600만원, 4천만원 초과 6천만원 이하 500만원, 6천만원 초과 1억원 이하 400만원, 1억원 초과 200만원입니다.
- **부동산임대·법인대표**: 사업소득 중 부동산임대업 소득을 제외한 비율을 위 기초금액에 곱하며, 공제액도 해당 비임대 사업소득을 한도로 합니다. 법인 대표자는 해당 과세기간 총급여 8천만원 이하인 경우 근로소득금액 기준을 적용합니다.
- **수령·해지**: 폐업 등 법정 사유에 따른 공제금은 법정 계산에 따른 퇴직소득으로 과세합니다. 일반 중도해지 환급금은 기타소득이며, 120개월 이상 납입 후 법정 경영악화 사유 등 예외에는 퇴직소득 규정을 적용합니다.
