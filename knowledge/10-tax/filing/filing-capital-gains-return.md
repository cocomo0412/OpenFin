---
{
  "deadlines": [
    "deadline.capital-gains.preliminary",
    "deadline.capital-gains.final"
  ],
  "folder": "50_Deadlines",
  "basis_year": 2026,
  "id": "filing.capital-gains-return",
  "title": "양도소득세 신고",
  "type": "filing",
  "description": "부동산, 주식 등 자산 양도 후 예정신고와 다음연도 확정신고 필요 여부를 구분해 관리하는 신고 절차입니다.",
  "parents": [
    "category.filing-calendar",
    "tax.income.capital-gains"
  ],
  "children": [],
  "related": [
    "tax.securities-transaction",
    "concept.capital-gains.calculation-flow",
    "concept.capital-gains.stock-basic-deduction",
    "scenario.real-estate-transfer",
    "concept.additional-tax.general",
    "scenario.tax-penalty-risk"
  ],
  "terms": [
    "term.capital-gain",
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
      "label": "부동산 등 예정신고",
      "condition": "법정 대상 자산은 양도일이 속하는 달의 말일부터 2개월 이내에 예정신고합니다. 토지거래허가 전 대금청산의 경우 허가일 또는 허가구역 해제일 기준 특례를 확인합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "주식·부담부증여",
      "condition": "법정 국내주식 등은 양도 반기 말일부터 2개월, 부담부증여 중 양도로 보는 채무액 부분은 양도월 말일부터 3개월입니다. 국외주식·파생상품에 이 예정신고기한을 그대로 적용하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "확정신고",
      "condition": "원칙적으로 다음 연도 5월 1~31일입니다. 예정신고를 마친 경우 생략할 수 있으나 복수 양도 합산 등 시행령상 예외에는 확정신고가 필요합니다. 양도차익이 없거나 결손이어도 신고대상이 될 수 있습니다.",
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
    "path": "opentax/disclosures/096cd5fea81574df16a56c71.json",
    "checksum": "sha256:1a4feb482e1a0aabb594e1da5415356e6ffa1b43fdb8ed507886bc39e65dc1ba",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "filing.capital-gains-return",
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
        "value": "filing.capital-gains-return"
      }
    }
  ],
  "search_projection": {
    "id": "filing.capital-gains-return",
    "title": "양도소득세 신고",
    "type": "filing",
    "description": "부동산, 주식 등 자산 양도 후 예정신고와 다음연도 확정신고 필요 여부를 구분해 관리하는 신고 절차입니다.",
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
    "search_text": "양도소득세 신고 부동산, 주식 등 자산 양도 후 예정신고와 다음연도 확정신고 필요 여부를 구분해 관리하는 신고 절차입니다."
  },
  "record_checksum": "sha256:bbcd9eb54b9a6c23b5d8dc6c9d316926a0e7442c51145eeacb6eed456b6d0bbb"
}
---

# 양도소득세 신고

부동산, 주식 등 자산 양도 후 예정신고와 다음연도 확정신고 필요 여부를 구분해 관리하는 신고 절차입니다.

- **부동산 등 예정신고**: 법정 대상 자산은 양도일이 속하는 달의 말일부터 2개월 이내에 예정신고합니다. 토지거래허가 전 대금청산의 경우 허가일 또는 허가구역 해제일 기준 특례를 확인합니다.
- **주식·부담부증여**: 법정 국내주식 등은 양도 반기 말일부터 2개월, 부담부증여 중 양도로 보는 채무액 부분은 양도월 말일부터 3개월입니다. 국외주식·파생상품에 이 예정신고기한을 그대로 적용하지 않습니다.
- **확정신고**: 원칙적으로 다음 연도 5월 1~31일입니다. 예정신고를 마친 경우 생략할 수 있으나 복수 양도 합산 등 시행령상 예외에는 확정신고가 필요합니다. 양도차익이 없거나 결손이어도 신고대상이 될 수 있습니다.
