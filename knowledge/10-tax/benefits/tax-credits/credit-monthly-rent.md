---
{
  "deadlines": [
    "deadline.year-end-settlement"
  ],
  "requires": [
    "eligibility-rule.gross-pay-income-threshold",
    "eligibility-rule.homeless-household",
    "eligibility-rule.monthly-rent-address-match",
    "eligibility-rule.monthly-rent-house-standard",
    "required-document.lease-contract",
    "required-document.rent-payment-proof",
    "required-document.resident-registration-copy"
  ],
  "folder": "20_Deductions/TaxCredits",
  "basis_year": 2026,
  "id": "credit.monthly-rent",
  "title": "월세액 세액공제",
  "type": "tax-credit",
  "description": "무주택, 총급여·종합소득금액, 주택 요건 등을 충족한 월세액에 대한 세액공제입니다.",
  "parents": [
    "category.tax-credits"
  ],
  "children": [],
  "related": [
    "support.didimdol-loan",
    "support.youth-special-rent-guarantee",
    "required-document.lease-contract",
    "required-document.rent-payment-proof",
    "required-document.resident-registration-copy",
    "eligibility-rule.homeless-household",
    "eligibility-rule.gross-pay-income-threshold",
    "eligibility-rule.monthly-rent-address-match",
    "eligibility-rule.monthly-rent-house-standard",
    "conflict-rule.monthly-rent-household-duplicate",
    "life-expense.monthly-rent",
    "scenario.monthly-rent-tenant-credit",
    "support.youth-monthly-rent-special",
    "life-expense.monthly-rent-support",
    "scenario.youth-monthly-rent-support"
  ],
  "terms": [
    "term.tax-credit",
    "term.eligibility-threshold"
  ],
  "tags": [
    "tax-credit"
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
      "label": "기본 대상",
      "condition": "과세기간 말 현재 법정 무주택 세대의 세대주 등으로서 총급여 8천만원 이하인 근로자가 대상입니다. 종합소득금액 7천만원 초과자는 제외하며 법정 임차주택·월세·주소 및 신청 요건을 갖추어야 합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "공제율·한도",
      "condition": "연간 적격 월세액 1천만원 한도에 15%를 적용합니다. 총급여 5,500만원 이하이면서 종합소득금액 4,500만원 이하인 근로자는 17%를 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "배우자 추가 공제",
      "condition": "세대주와 주소를 달리하는 등 법정 조건과 기본 공제요건을 모두 충족한 배우자도 추가 공제가 가능하지만, 세대주와 배우자의 월세액을 합쳐 1천만원 한도를 적용합니다. 각자 1천만원씩 공제하는 것은 아닙니다.",
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
    "path": "opentax/disclosures/5ab0005d1ed17b7bb0248640.json",
    "checksum": "sha256:81694e2c9139a90ce3de91024b9087fe114c1141277ba60da043c2c7e5f2ce53",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "credit.monthly-rent",
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
        "value": "credit.monthly-rent"
      }
    }
  ],
  "search_projection": {
    "id": "credit.monthly-rent",
    "title": "월세액 세액공제",
    "type": "tax-credit",
    "description": "무주택, 총급여·종합소득금액, 주택 요건 등을 충족한 월세액에 대한 세액공제입니다.",
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
    "search_text": "월세액 세액공제 무주택, 총급여·종합소득금액, 주택 요건 등을 충족한 월세액에 대한 세액공제입니다."
  },
  "record_checksum": "sha256:6cecad8b5a82c62732798bd8f9a5422affc5eaaf5c7c734e6bb381a6294d8f67"
}
---

# 월세액 세액공제

무주택, 총급여·종합소득금액, 주택 요건 등을 충족한 월세액에 대한 세액공제입니다.

- **기본 대상**: 과세기간 말 현재 법정 무주택 세대의 세대주 등으로서 총급여 8천만원 이하인 근로자가 대상입니다. 종합소득금액 7천만원 초과자는 제외하며 법정 임차주택·월세·주소 및 신청 요건을 갖추어야 합니다.
- **공제율·한도**: 연간 적격 월세액 1천만원 한도에 15%를 적용합니다. 총급여 5,500만원 이하이면서 종합소득금액 4,500만원 이하인 근로자는 17%를 적용합니다.
- **배우자 추가 공제**: 세대주와 주소를 달리하는 등 법정 조건과 기본 공제요건을 모두 충족한 배우자도 추가 공제가 가능하지만, 세대주와 배우자의 월세액을 합쳐 1천만원 한도를 적용합니다. 각자 1천만원씩 공제하는 것은 아닙니다.
