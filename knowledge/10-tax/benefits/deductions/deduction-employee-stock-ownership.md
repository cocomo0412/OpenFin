---
{
  "deadlines": [
    "deadline.year-end-settlement"
  ],
  "folder": "20_Deductions/IncomeDeductions",
  "basis_year": 2026,
  "id": "deduction.employee-stock-ownership",
  "title": "우리사주조합 출연금",
  "type": "deduction",
  "description": "우리사주조합 출연금 관련 소득공제입니다.",
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
      "label": "출자 소득공제",
      "condition": "우리사주 취득을 위한 우리사주조합 출자금은 해당 연도 출자액과 400만원 중 적은 금액을 근로소득금액에서 공제합니다. 법정 벤처기업등의 우리사주조합원은 1,500만원 한도를 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "인출 시 과세",
      "condition": "공제받은 출자금 등으로 취득한 과세인출주식은 인출 시 법정 인출금을 근로소득으로 과세합니다. 소득공제받지 않은 출자금 취득주식 등 제외 주식과 보유기간별 비과세 규정을 구분합니다.",
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
    "path": "opentax/disclosures/3451e91aaad47c1b0e6141ac.json",
    "checksum": "sha256:ead50da13122ef633ea12192b36b2c9ff16960e9cbdbae31d4b610cf9487f90d",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "deduction.employee-stock-ownership",
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
        "value": "deduction.employee-stock-ownership"
      }
    }
  ],
  "search_projection": {
    "id": "deduction.employee-stock-ownership",
    "title": "우리사주조합 출연금",
    "type": "deduction",
    "description": "우리사주조합 출연금 관련 소득공제입니다.",
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
    "search_text": "우리사주조합 출연금 우리사주조합 출연금 관련 소득공제입니다."
  },
  "record_checksum": "sha256:1520599764b82a4e7ecf8feb17ab6fcab5e613177c0cdd197b82b6d440f1891c"
}
---

# 우리사주조합 출연금

우리사주조합 출연금 관련 소득공제입니다.

- **출자 소득공제**: 우리사주 취득을 위한 우리사주조합 출자금은 해당 연도 출자액과 400만원 중 적은 금액을 근로소득금액에서 공제합니다. 법정 벤처기업등의 우리사주조합원은 1,500만원 한도를 적용합니다.
- **인출 시 과세**: 공제받은 출자금 등으로 취득한 과세인출주식은 인출 시 법정 인출금을 근로소득으로 과세합니다. 소득공제받지 않은 출자금 취득주식 등 제외 주식과 보유기간별 비과세 규정을 구분합니다.
