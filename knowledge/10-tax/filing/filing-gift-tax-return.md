---
{
  "deadlines": [
    "deadline.gift.general"
  ],
  "folder": "50_Deadlines",
  "basis_year": 2026,
  "id": "filing.gift-tax-return",
  "title": "증여세 신고",
  "type": "filing",
  "description": "증여받은 날이 속하는 달의 말일부터 일반 증여 3개월 기한을 기준으로 신고·납부를 관리하는 절차입니다.",
  "parents": [
    "category.filing-calendar",
    "tax.gift"
  ],
  "children": [],
  "related": [],
  "terms": [
    "term.donee",
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
      "label": "일반 증여",
      "condition": "증여받은 날이 속하는 달의 말일부터 3개월 이내에 과세가액과 과세표준을 신고합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.inheritance-gift-tax-act.rates",
      "criteria_kind": "disclosure"
    },
    {
      "label": "특례",
      "condition": "비상장주식 상장·합병 관련 정산은 정산기준일, 일감몰아주기 등 법정 증여의제는 법인세 신고기한을 기준으로 별도 계산합니다. 모든 증여에 증여일 기준만 적용하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.inheritance-gift-tax-act.rates",
      "criteria_kind": "disclosure"
    },
    {
      "label": "첨부서류",
      "condition": "증여재산의 종류·수량·평가가액 및 공제 등을 증명하는 법정 서류를 제출합니다.",
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
    "path": "opentax/disclosures/d71ffb58a3489660abb23da8.json",
    "checksum": "sha256:d6549f8f1063645fc708cccacd1a138df40784c2e570eec8817532ad90c21182",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276123&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:22.158326+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.inheritance-gift-tax-act.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276123&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
      "source_record_id": "filing.gift-tax-return",
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
        "value": "filing.gift-tax-return"
      }
    }
  ],
  "search_projection": {
    "id": "filing.gift-tax-return",
    "title": "증여세 신고",
    "type": "filing",
    "description": "증여받은 날이 속하는 달의 말일부터 일반 증여 3개월 기한을 기준으로 신고·납부를 관리하는 절차입니다.",
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
    "search_text": "증여세 신고 증여받은 날이 속하는 달의 말일부터 일반 증여 3개월 기한을 기준으로 신고·납부를 관리하는 절차입니다."
  },
  "record_checksum": "sha256:ce1f574713a94645a2e6189dd6bf782a15654b1802dfe21f8c4b7e07135ea880"
}
---

# 증여세 신고

증여받은 날이 속하는 달의 말일부터 일반 증여 3개월 기한을 기준으로 신고·납부를 관리하는 절차입니다.

- **일반 증여**: 증여받은 날이 속하는 달의 말일부터 3개월 이내에 과세가액과 과세표준을 신고합니다.
- **특례**: 비상장주식 상장·합병 관련 정산은 정산기준일, 일감몰아주기 등 법정 증여의제는 법인세 신고기한을 기준으로 별도 계산합니다. 모든 증여에 증여일 기준만 적용하지 않습니다.
- **첨부서류**: 증여재산의 종류·수량·평가가액 및 공제 등을 증명하는 법정 서류를 제출합니다.
