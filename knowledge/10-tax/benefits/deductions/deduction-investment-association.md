---
{
  "deadlines": [
    "deadline.year-end-settlement"
  ],
  "folder": "20_Deductions/IncomeDeductions",
  "basis_year": 2026,
  "id": "deduction.investment-association",
  "title": "중소기업창업투자조합 출자 등",
  "type": "deduction",
  "description": "중소기업창업투자조합 출자 등 투자 관련 소득공제입니다.",
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
      "label": "일반 공제",
      "condition": "2028년 12월 31일까지 법정 벤처투자조합 등에 출자·투자한 금액의 10%를 종합소득금액에서 공제합니다. 타인의 지분·수익증권을 양수하는 투자는 제외합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "특정 직접투자 등",
      "condition": "제16조 제1항 제3·4·6호의 법정 투자는 3천만원 이하분 100%, 3천만원 초과 5천만원 이하분 70%, 5천만원 초과분 30%를 구간별로 적용합니다. 모든 벤처펀드에 이 공제율을 적용하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "한도·기간·추징",
      "condition": "공제액은 해당 과세연도 종합소득금액의 50%가 한도입니다. 법정 신청으로 투자연도부터 투자 후 2년이 되는 날이 속하는 연도까지 중 한 해를 선택할 수 있습니다. 투자 후 3년 내 회수·양도·환매 등에는 법정 예외를 제외하고 추징합니다.",
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
    "path": "opentax/disclosures/dc05cafb0891a45a73ea24d6.json",
    "checksum": "sha256:e4cad4fd9edd3a022d1b0a7967dd0bc84aef8e539fa0d4f2ab8e9ec09954dc88",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "deduction.investment-association",
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
        "value": "deduction.investment-association"
      }
    }
  ],
  "search_projection": {
    "id": "deduction.investment-association",
    "title": "중소기업창업투자조합 출자 등",
    "type": "deduction",
    "description": "중소기업창업투자조합 출자 등 투자 관련 소득공제입니다.",
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
    "search_text": "중소기업창업투자조합 출자 등 중소기업창업투자조합 출자 등 투자 관련 소득공제입니다."
  },
  "record_checksum": "sha256:2677a63a728813ba8d642d8fcb46f502c21ee40042cf60d2f22a1a38f3ff9b03"
}
---

# 중소기업창업투자조합 출자 등

중소기업창업투자조합 출자 등 투자 관련 소득공제입니다.

- **일반 공제**: 2028년 12월 31일까지 법정 벤처투자조합 등에 출자·투자한 금액의 10%를 종합소득금액에서 공제합니다. 타인의 지분·수익증권을 양수하는 투자는 제외합니다.
- **특정 직접투자 등**: 제16조 제1항 제3·4·6호의 법정 투자는 3천만원 이하분 100%, 3천만원 초과 5천만원 이하분 70%, 5천만원 초과분 30%를 구간별로 적용합니다. 모든 벤처펀드에 이 공제율을 적용하지 않습니다.
- **한도·기간·추징**: 공제액은 해당 과세연도 종합소득금액의 50%가 한도입니다. 법정 신청으로 투자연도부터 투자 후 2년이 되는 날이 속하는 연도까지 중 한 해를 선택할 수 있습니다. 투자 후 3년 내 회수·양도·환매 등에는 법정 예외를 제외하고 추징합니다.
