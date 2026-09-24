---
{
  "id": "deduction.housing-savings",
  "title": "주택마련저축",
  "type": "deduction",
  "description": "총급여 7천만원 이하 근로자인 무주택 세대주 및 그 배우자의 주택마련저축 소득공제입니다.",
  "parents": [
    "deduction.other-income"
  ],
  "children": [],
  "related": [
    "required-document.resident-registration-copy",
    "required-document.housing-savings-payment-certificate",
    "eligibility-rule.homeless-household",
    "eligibility-rule.gross-pay-income-threshold",
    "eligibility-rule.housing-savings-employee-household",
    "conflict-rule.monthly-rent-household-duplicate",
    "life-expense.housing-subscription"
  ],
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
      "label": "소득공제 대상",
      "condition": "총급여 7천만원 이하 근로자인 무주택 세대주 및 무주택 세대주의 배우자. 다음 연도 2월 말까지 가입은행에 무주택확인서를 제출해야 합니다.",
      "basis": "공식 공시 원문",
      "source": "source.nhuf.housing-subscription",
      "criteria_kind": "disclosure"
    },
    {
      "label": "소득공제 한도",
      "condition": "연 납입액 300만원 한도의 40%, 최대 120만원을 소득공제합니다.",
      "basis": "공식 공시 원문",
      "source": "source.nhuf.housing-subscription",
      "criteria_kind": "disclosure"
    },
    {
      "label": "추징",
      "condition": "가입 후 5년 이내 해지 또는 국민주택규모 초과 주택 당첨 등은 추징 대상입니다. 해외이주·85㎡ 이하 당첨해지 등 예외와 상세 기준은 공식 안내를 확인합니다.",
      "basis": "공식 공시 원문",
      "source": "source.nhuf.housing-subscription",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.nhuf.housing-subscription"
  ],
  "source_urls": [
    "https://nhuf.molit.go.kr/FP/FP07/FP0701/FP07010101.jsp"
  ],
  "collected_at": "2026-09-23T08:40:37.994428+00:00",
  "source_collected_at": "2026-09-23T08:40:37.994428+00:00",
  "last_source_checked_at": "2026-09-23T08:40:37.994428+00:00",
  "last_reviewed_at": "2026-09-23T08:40:37.994428+00:00",
  "reviewed_at": "2026-09-23T08:40:37.994428+00:00",
  "refresh_generation": "2026-09-23T08:40:37.994428+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/10cffba87d08b7284d67d013.json",
    "checksum": "sha256:16be16f3084a3ae78257672ee982bb839b951794aa49db8b2b800a954b4caadc",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://nhuf.molit.go.kr/FP/FP07/FP0701/FP07010101.jsp",
    "collected_at": "2026-09-23T08:40:37.994428+00:00"
  },
  "provenance": [
    {
      "source_id": "source.nhuf.housing-subscription",
      "original_url": "https://nhuf.molit.go.kr/FP/FP07/FP0701/FP07010101.jsp",
      "source_record_id": "deduction.housing-savings",
      "collected_at": "2026-09-23T08:40:37.994428+00:00",
      "reviewed_at": "2026-09-23T08:40:37.994428+00:00",
      "checksum": "sha256:14a9dae122f5b77bed8ff0220e3d8a5c76f0db3728d49f59d5bdd33f02f40e34",
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
        "value": "deduction.housing-savings"
      }
    }
  ],
  "search_projection": {
    "id": "deduction.housing-savings",
    "title": "주택마련저축",
    "type": "deduction",
    "description": "총급여 7천만원 이하 근로자인 무주택 세대주 및 그 배우자의 주택마련저축 소득공제입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://nhuf.molit.go.kr/FP/FP07/FP0701/FP07010101.jsp"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.nhuf.housing-subscription"
    ],
    "export_id": "tax-ontology",
    "search_text": "주택마련저축 총급여 7천만원 이하 근로자인 무주택 세대주 및 그 배우자의 주택마련저축 소득공제입니다."
  },
  "record_checksum": "sha256:60e1c19a95a5ceb14573131671c96ec8faaad59b9e923245fcead6b8dc260481"
}
---

# 주택마련저축

총급여 7천만원 이하 근로자인 무주택 세대주 및 그 배우자의 주택마련저축 소득공제입니다.

- **소득공제 대상**: 총급여 7천만원 이하 근로자인 무주택 세대주 및 무주택 세대주의 배우자. 다음 연도 2월 말까지 가입은행에 무주택확인서를 제출해야 합니다.
- **소득공제 한도**: 연 납입액 300만원 한도의 40%, 최대 120만원을 소득공제합니다.
- **추징**: 가입 후 5년 이내 해지 또는 국민주택규모 초과 주택 당첨 등은 추징 대상입니다. 해외이주·85㎡ 이하 당첨해지 등 예외와 상세 기준은 공식 안내를 확인합니다.
