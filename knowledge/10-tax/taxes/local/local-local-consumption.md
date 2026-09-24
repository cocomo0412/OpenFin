---
{
  "deadlines": [],
  "folder": "10_Taxes/Local",
  "basis_year": 2026,
  "id": "local.local-consumption",
  "title": "지방소비세",
  "type": "tax",
  "description": "부가가치세 납부세액에서 법정 감면세액·공제세액을 빼고 가산세를 더한 세액입니다.",
  "parents": [
    "category.local-ordinary-taxes"
  ],
  "children": [],
  "related": [
    "tax.value-added"
  ],
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
      "label": "과세표준",
      "condition": "부가가치세 납부세액에서 법정 감면세액·공제세액을 빼고 가산세를 더한 세액입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제69조"
    },
    {
      "label": "세액",
      "condition": "위 과세표준의 25.3%입니다. 소비자에게 부가가치세와 별도로 25.3%를 추가 청구하는 세금이라는 뜻은 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제69조"
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
    "path": "opentax/disclosures/a0cde7d87c1dc0a8c51764d8.json",
    "checksum": "sha256:a48f97d97581a46b67bd2abd3d20ff0d5f38bbb96ccfb7a5aab13061f2c94086",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:22.571307+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.local-tax-act.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "local.local-consumption",
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
        "value": "local.local-consumption"
      }
    }
  ],
  "search_projection": {
    "id": "local.local-consumption",
    "title": "지방소비세",
    "type": "tax",
    "description": "부가가치세 납부세액에서 법정 감면세액·공제세액을 빼고 가산세를 더한 세액입니다.",
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
    "search_text": "지방소비세 부가가치세 납부세액에서 법정 감면세액·공제세액을 빼고 가산세를 더한 세액입니다."
  },
  "record_checksum": "sha256:dc9e66829f5115829068608d139b7f9fc82ca128b8f0e29a3dc5274477d840f8"
}
---

# 지방소비세

부가가치세 납부세액에서 법정 감면세액·공제세액을 빼고 가산세를 더한 세액입니다.

- **과세표준**: 부가가치세 납부세액에서 법정 감면세액·공제세액을 빼고 가산세를 더한 세액입니다.
- **세액**: 위 과세표준의 25.3%입니다. 소비자에게 부가가치세와 별도로 25.3%를 추가 청구하는 세금이라는 뜻은 아닙니다.
