---
{
  "deadlines": [
    "deadline.year-end-settlement"
  ],
  "folder": "20_Deductions/IncomeDeductions",
  "basis_year": 2026,
  "id": "deduction.other-income",
  "title": "그 밖의 소득공제",
  "type": "deduction",
  "description": "과세표준 계산 전 추가로 반영되는 소득공제 항목 묶음입니다.",
  "parents": [
    "category.income-deductions"
  ],
  "children": [
    "deduction.personal-pension-savings",
    "deduction.small-business-mutual-aid",
    "deduction.housing-savings",
    "deduction.investment-association",
    "deduction.credit-card-use",
    "deduction.employee-stock-ownership",
    "deduction.employment-maintenance-worker",
    "deduction.long-term-fund",
    "deduction.youth-long-term-fund"
  ],
  "related": [],
  "terms": [
    "term.income-deduction",
    "term.deduction-limit"
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
      "label": "종합한도",
      "condition": "조세특례제한법 제132조의2에 열거된 소득공제·필요경비 합계에는 2,500만원 종합한도를 적용합니다. 모든 소득공제를 일률적으로 합산하는 규정은 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "포함·제외",
      "condition": "특별소득공제 중 보험료 소득공제는 제외합니다. 법정 벤처출자 공제 중 제16조 제1항 제3·4·6호 출자·투자도 제외합니다. 공제부금·청약저축·우리사주·장기집합투자증권저축·신용카드 등 해당 조문에 열거된 공제별로 포함 여부를 판단합니다.",
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
    "path": "opentax/disclosures/62a1f8be731c7b0d2368970f.json",
    "checksum": "sha256:db88484628f4206c5b23ed5ce7dbbea753076fbf424738eb0feab7cb12af264c",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "deduction.other-income",
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
        "value": "deduction.other-income"
      }
    }
  ],
  "search_projection": {
    "id": "deduction.other-income",
    "title": "그 밖의 소득공제",
    "type": "deduction",
    "description": "과세표준 계산 전 추가로 반영되는 소득공제 항목 묶음입니다.",
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
    "search_text": "그 밖의 소득공제 과세표준 계산 전 추가로 반영되는 소득공제 항목 묶음입니다."
  },
  "record_checksum": "sha256:99aedb5dab734a8d6babc7ae9fd4b4f41fe5964fe92ff260afb1f68422da4e40"
}
---

# 그 밖의 소득공제

과세표준 계산 전 추가로 반영되는 소득공제 항목 묶음입니다.

- **종합한도**: 조세특례제한법 제132조의2에 열거된 소득공제·필요경비 합계에는 2,500만원 종합한도를 적용합니다. 모든 소득공제를 일률적으로 합산하는 규정은 아닙니다.
- **포함·제외**: 특별소득공제 중 보험료 소득공제는 제외합니다. 법정 벤처출자 공제 중 제16조 제1항 제3·4·6호 출자·투자도 제외합니다. 공제부금·청약저축·우리사주·장기집합투자증권저축·신용카드 등 해당 조문에 열거된 공제별로 포함 여부를 판단합니다.
