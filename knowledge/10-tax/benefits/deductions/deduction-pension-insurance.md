---
{
  "id": "deduction.pension-insurance",
  "title": "연금보험료공제",
  "type": "deduction",
  "description": "공적연금의 근로자 부담금을 차감소득금액 계산에 반영하는 공제입니다.",
  "parents": [
    "category.income-deductions"
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
      "label": "공제 대상",
      "condition": "종합소득이 있는 거주자가 공적연금 관련법에 따라 해당 과세기간에 납입한 기여금 또는 개인부담금을 소득공제합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "공제 한계",
      "condition": "인적공제·연금보험료공제·주택담보노후연금 이자비용공제·특별소득공제·조세특례제한법상 소득공제 합계가 종합소득금액을 초과하면 그 초과액 한도로 연금보험료공제를 받지 않은 것으로 봅니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
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
    "path": "opentax/disclosures/c45d39b2e6905eb441d4eae0.json",
    "checksum": "sha256:36d63b682277e4b904e7beee92573e8cf120f96a2de119fb6b4bd059b88f468c",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "deduction.pension-insurance",
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
        "value": "deduction.pension-insurance"
      }
    }
  ],
  "search_projection": {
    "id": "deduction.pension-insurance",
    "title": "연금보험료공제",
    "type": "deduction",
    "description": "공적연금의 근로자 부담금을 차감소득금액 계산에 반영하는 공제입니다.",
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
    "search_text": "연금보험료공제 공적연금의 근로자 부담금을 차감소득금액 계산에 반영하는 공제입니다."
  },
  "record_checksum": "sha256:16bc79d25fd3030b38c4d29a5277ee84ceaa03aae53351b39625aabab8a2546b"
}
---

# 연금보험료공제

공적연금의 근로자 부담금을 차감소득금액 계산에 반영하는 공제입니다.

- **공제 대상**: 종합소득이 있는 거주자가 공적연금 관련법에 따라 해당 과세기간에 납입한 기여금 또는 개인부담금을 소득공제합니다.
- **공제 한계**: 인적공제·연금보험료공제·주택담보노후연금 이자비용공제·특별소득공제·조세특례제한법상 소득공제 합계가 종합소득금액을 초과하면 그 초과액 한도로 연금보험료공제를 받지 않은 것으로 봅니다.
