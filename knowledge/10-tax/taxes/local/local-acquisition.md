---
{
  "deadlines": [
    "deadline.local.acquisition"
  ],
  "folder": "10_Taxes/Local",
  "basis_year": 2026,
  "id": "local.acquisition",
  "title": "취득세",
  "type": "tax",
  "description": "부동산·차량·기계장비·선박·회원권 등 법정 과세물건을 취득한 자에게 부과합니다. 등기 여부와 별개로 사실상 취득도 포함하며, 과세표준은 원칙적으로 취득 당시 가액입니다.",
  "parents": [
    "category.local-ordinary-taxes"
  ],
  "children": [],
  "related": [],
  "terms": [
    "term.local-tax"
  ],
  "tags": [
    "local-tax"
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
      "label": "과세대상",
      "condition": "부동산·차량·기계장비·선박·회원권 등 법정 과세물건을 취득한 자에게 부과합니다. 등기 여부와 별개로 사실상 취득도 포함하며, 과세표준은 원칙적으로 취득 당시 가액입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제7조·지방세법 제10조·지방세법 제11조·지방세법 제12조"
    },
    {
      "label": "세액 계산",
      "condition": "과세표준에 취득원인과 과세물건별 세율을 적용합니다. 주택 유상취득 일반세율과 법인·다주택 중과, 감면·경과규정은 구분해야 합니다. 모든 취득에 하나의 세율을 적용하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제7조·지방세법 제10조·지방세법 제11조·지방세법 제12조"
    }
  ],
  "sources": [
    "source.law.local-tax-act.rates"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
  ],
  "collected_at": "2026-09-23T08:26:22.571307+00:00",
  "source_collected_at": "2026-09-23T08:26:22.571307+00:00",
  "last_source_checked_at": "2026-09-23T08:26:22.571307+00:00",
  "last_reviewed_at": "2026-09-23T08:26:22.571307+00:00",
  "reviewed_at": "2026-09-23T08:26:22.571307+00:00",
  "refresh_generation": "2026-09-23T08:26:22.571307+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/e206085d319e1d2202baecbb.json",
    "checksum": "sha256:dd07773d212a0e3cdf278a93642ddc0ad7c481653b0fdb0daa89a4d863e5ca8d",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:22.571307+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.local-tax-act.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "local.acquisition",
      "collected_at": "2026-09-23T08:26:22.571307+00:00",
      "reviewed_at": "2026-09-23T08:26:22.571307+00:00",
      "checksum": "sha256:9f5ef4724aa36b1f62bd0e36aa912309144e85c3e1bc880c960e66d467418995",
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
        "value": "local.acquisition"
      }
    }
  ],
  "search_projection": {
    "id": "local.acquisition",
    "title": "취득세",
    "type": "tax",
    "description": "부동산·차량·기계장비·선박·회원권 등 법정 과세물건을 취득한 자에게 부과합니다. 등기 여부와 별개로 사실상 취득도 포함하며, 과세표준은 원칙적으로 취득 당시 가액입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.local-tax-act.rates"
    ],
    "export_id": "tax-ontology",
    "search_text": "취득세 부동산·차량·기계장비·선박·회원권 등 법정 과세물건을 취득한 자에게 부과합니다. 등기 여부와 별개로 사실상 취득도 포함하며, 과세표준은 원칙적으로 취득 당시 가액입니다."
  },
  "record_checksum": "sha256:1d3e25004d3a9b43e41dca2e8da526e87bb83aaca9f07d19ef4935d9b810c7be"
}
---

# 취득세

부동산·차량·기계장비·선박·회원권 등 법정 과세물건을 취득한 자에게 부과합니다. 등기 여부와 별개로 사실상 취득도 포함하며, 과세표준은 원칙적으로 취득 당시 가액입니다.

- **과세대상**: 부동산·차량·기계장비·선박·회원권 등 법정 과세물건을 취득한 자에게 부과합니다. 등기 여부와 별개로 사실상 취득도 포함하며, 과세표준은 원칙적으로 취득 당시 가액입니다.
- **세액 계산**: 과세표준에 취득원인과 과세물건별 세율을 적용합니다. 주택 유상취득 일반세율과 법인·다주택 중과, 감면·경과규정은 구분해야 합니다. 모든 취득에 하나의 세율을 적용하지 않습니다.
