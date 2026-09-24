---
{
  "deadlines": [
    "deadline.year-end-settlement"
  ],
  "folder": "20_Deductions/IncomeDeductions",
  "basis_year": 2026,
  "id": "deduction.employment-maintenance-worker",
  "title": "고용유지중소기업 근로자 소득공제",
  "type": "deduction",
  "description": "고용유지 중소기업 근로자에게 적용되는 소득공제 항목입니다.",
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
      "label": "대상·기한",
      "condition": "법정 고용유지중소기업에 근로를 제공하는 상시근로자에게 2026년 12월 31일이 속하는 과세연도까지 적용합니다. 기업의 고용·임금 요건 충족 여부를 먼저 확인합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "소득공제",
      "condition": "전년 해당 근로자 연간 임금총액에서 해당 연도 임금총액을 뺀 금액의 50%를 근로소득금액에서 공제하며, 공제한도는 1천만원입니다. 세금 자체에서 50%를 빼는 세액공제가 아닙니다.",
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
    "path": "opentax/disclosures/06e1dc4ee2536ab846250843.json",
    "checksum": "sha256:e9fc49b36e8bcf7046387577afcfcc2b879657c5d65c86dff8d954533d67108e",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "deduction.employment-maintenance-worker",
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
        "value": "deduction.employment-maintenance-worker"
      }
    }
  ],
  "search_projection": {
    "id": "deduction.employment-maintenance-worker",
    "title": "고용유지중소기업 근로자 소득공제",
    "type": "deduction",
    "description": "고용유지 중소기업 근로자에게 적용되는 소득공제 항목입니다.",
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
    "search_text": "고용유지중소기업 근로자 소득공제 고용유지 중소기업 근로자에게 적용되는 소득공제 항목입니다."
  },
  "record_checksum": "sha256:505bcaa152c1dd93e07bf3ae10004a445dc3930fe47fe88a825882f6a153b04c"
}
---

# 고용유지중소기업 근로자 소득공제

고용유지 중소기업 근로자에게 적용되는 소득공제 항목입니다.

- **대상·기한**: 법정 고용유지중소기업에 근로를 제공하는 상시근로자에게 2026년 12월 31일이 속하는 과세연도까지 적용합니다. 기업의 고용·임금 요건 충족 여부를 먼저 확인합니다.
- **소득공제**: 전년 해당 근로자 연간 임금총액에서 해당 연도 임금총액을 뺀 금액의 50%를 근로소득금액에서 공제하며, 공제한도는 1천만원입니다. 세금 자체에서 50%를 빼는 세액공제가 아닙니다.
