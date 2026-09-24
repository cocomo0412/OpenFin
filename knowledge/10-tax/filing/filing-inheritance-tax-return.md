---
{
  "deadlines": [
    "deadline.inheritance.resident",
    "deadline.inheritance.nonresident"
  ],
  "folder": "50_Deadlines",
  "basis_year": 2026,
  "id": "filing.inheritance-tax-return",
  "title": "상속세 신고",
  "type": "filing",
  "description": "상속개시일이 속하는 달의 말일부터 거주자 6개월, 비거주자 9개월 기한을 기준으로 신고·납부를 관리하는 절차입니다.",
  "parents": [
    "category.filing-calendar",
    "tax.inheritance"
  ],
  "children": [],
  "related": [],
  "terms": [
    "term.heir",
    "term.tax-base",
    "term.deadline"
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
      "label": "일반 기한",
      "condition": "상속개시일이 속하는 달의 말일부터 6개월 이내에 신고합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.inheritance-gift-tax-act.rates",
      "criteria_kind": "disclosure"
    },
    {
      "label": "해외 주소",
      "condition": "피상속인이나 상속인이 외국에 주소를 둔 경우 법정 신고기간은 9개월입니다. 단순 국적만으로 판단하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.inheritance-gift-tax-act.rates",
      "criteria_kind": "disclosure"
    },
    {
      "label": "특례·서류",
      "condition": "유언집행자·상속재산관리인의 지정·선임 및 상속인 미확정에는 별도 규정이 있습니다. 상속재산 평가, 분할, 공제를 증명하는 서류를 함께 제출합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.inheritance-gift-tax-act.rates",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.inheritance-gift-tax-act.rates"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276123&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0"
  ],
  "collected_at": "2026-09-23T08:26:22.158326+00:00",
  "source_collected_at": "2026-09-23T08:26:22.158326+00:00",
  "last_source_checked_at": "2026-09-23T08:26:22.158326+00:00",
  "last_reviewed_at": "2026-09-23T08:26:22.158326+00:00",
  "reviewed_at": "2026-09-23T08:26:22.158326+00:00",
  "refresh_generation": "2026-09-23T08:26:22.158326+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/555a7c61cf979d2b7569719f.json",
    "checksum": "sha256:42c1199297fb9b4decaa5545f2aa8a961617b4ecbec45074f4dac99e0c506ca3",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276123&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:22.158326+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.inheritance-gift-tax-act.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276123&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
      "source_record_id": "filing.inheritance-tax-return",
      "collected_at": "2026-09-23T08:26:22.158326+00:00",
      "reviewed_at": "2026-09-23T08:26:22.158326+00:00",
      "checksum": "sha256:f7eb4bb5a445a4b3ba707743626e7f0de3331175f2965540ac93c55b0eca1a1b",
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
        "value": "filing.inheritance-tax-return"
      }
    }
  ],
  "search_projection": {
    "id": "filing.inheritance-tax-return",
    "title": "상속세 신고",
    "type": "filing",
    "description": "상속개시일이 속하는 달의 말일부터 거주자 6개월, 비거주자 9개월 기한을 기준으로 신고·납부를 관리하는 절차입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276123&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.inheritance-gift-tax-act.rates"
    ],
    "export_id": "tax-ontology",
    "search_text": "상속세 신고 상속개시일이 속하는 달의 말일부터 거주자 6개월, 비거주자 9개월 기한을 기준으로 신고·납부를 관리하는 절차입니다."
  },
  "record_checksum": "sha256:af2766dba620807008dd2fb5e00f9170e07d44e11f3653ccda82bec9a86ec97c"
}
---

# 상속세 신고

상속개시일이 속하는 달의 말일부터 거주자 6개월, 비거주자 9개월 기한을 기준으로 신고·납부를 관리하는 절차입니다.

- **일반 기한**: 상속개시일이 속하는 달의 말일부터 6개월 이내에 신고합니다.
- **해외 주소**: 피상속인이나 상속인이 외국에 주소를 둔 경우 법정 신고기간은 9개월입니다. 단순 국적만으로 판단하지 않습니다.
- **특례·서류**: 유언집행자·상속재산관리인의 지정·선임 및 상속인 미확정에는 별도 규정이 있습니다. 상속재산 평가, 분할, 공제를 증명하는 서류를 함께 제출합니다.
