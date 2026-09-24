---
{
  "deadlines": [],
  "folder": "10_Taxes/National",
  "basis_year": 2026,
  "id": "tax.liquor",
  "title": "주세",
  "type": "tax",
  "description": "주류에 과세되는 국세입니다.",
  "parents": [
    "category.national-taxes"
  ],
  "children": [],
  "related": [],
  "terms": [
    "term.national-tax",
    "term.tax-law"
  ],
  "tags": [
    "national-tax"
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
      "label": "주류별 과세",
      "condition": "탁주는 킬로리터당 44,400원, 맥주는 885,700원의 종량세입니다. 약주·과실주·청주는 법정 과세가격의 30%, 증류주류는 72%입니다. 기타 주류는 법정 분류에 따라 72%·30%·10%로 달라집니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.liquor-tax-act.rates",
      "criteria_kind": "disclosure"
    },
    {
      "label": "주정·생맥주",
      "condition": "주정은 킬로리터당 57,000원에 알코올분 95도 초과 1도마다 600원을 가산합니다. 별도 추출장치를 쓰는 8리터 이상 용기 맥주는 2026년 말 이전 반출·수입신고분에 본문 세율의 80%를 적용하고 100원 미만을 버립니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.liquor-tax-act.rates",
      "criteria_kind": "disclosure"
    },
    {
      "label": "수량·가격·전통주",
      "condition": "소규모 제조자의 수량 인정비율, 국내 제조장 가격의 기준판매비율 차감, 수입 과세가격 등 별도 산정규정을 적용합니다. 적격 전통주는 시행령 제7조의 제조규모·반출순서·수량별 50% 또는 30% 경감을 구분하며 모든 전통주 전체 물량에 절반 세율을 적용하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.liquor-tax-act.rates",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.liquor-tax-act.rates",
    "source.law.liquor-decree.rates"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=267559&chrClsCd=010202&urlMode=lsInfoP&efYd=20250101&ancYnChk=0",
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=283483&chrClsCd=010202&urlMode=lsInfoP&efYd=20260401&ancYnChk=0"
  ],
  "collected_at": "2026-09-23T08:26:21.961480+00:00",
  "source_collected_at": "2026-09-23T08:26:21.961480+00:00",
  "last_source_checked_at": "2026-09-23T08:26:21.961480+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-23T08:26:21.961480+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/3a313190336c8b625082db80.json",
    "checksum": "sha256:bf19027803ab95a9698d454009069fb573f58c0e907277478076f587f4096d4a",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=267559&chrClsCd=010202&urlMode=lsInfoP&efYd=20250101&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:21.961480+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.liquor-tax-act.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=267559&chrClsCd=010202&urlMode=lsInfoP&efYd=20250101&ancYnChk=0",
      "source_record_id": "tax.liquor",
      "collected_at": "2026-09-23T08:26:21.961480+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
      "checksum": "sha256:1f42ef71a62fc15296203b5bd25c2638eb8f0b34c384a75f3f352e7886d05e28",
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
        "value": "tax.liquor"
      }
    },
    {
      "source_id": "source.law.liquor-decree.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=283483&chrClsCd=010202&urlMode=lsInfoP&efYd=20260401&ancYnChk=0",
      "collected_at": "2026-09-24T08:26:49.949228+00:00",
      "checksum": "sha256:64986e425b02a9561f1d7ba14de3ec32b00bb66f093e1d49b67c9e46dd706333",
      "checksum_scope": "official-disclosure-response",
      "verification_status": "reference_only",
      "supported_fields": [
        "criteria",
        "current_disclosure"
      ],
      "reviewed_at": "2026-09-24T00:00:00+09:00"
    }
  ],
  "search_projection": {
    "id": "tax.liquor",
    "title": "주세",
    "type": "tax",
    "description": "주류에 과세되는 국세입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=267559&chrClsCd=010202&urlMode=lsInfoP&efYd=20250101&ancYnChk=0",
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=283483&chrClsCd=010202&urlMode=lsInfoP&efYd=20260401&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.liquor-tax-act.rates"
    ],
    "export_id": "tax-ontology",
    "search_text": "주세 주류에 과세되는 국세입니다."
  },
  "record_checksum": "sha256:a2feb5d168eb46baa6254093f29d97a216cc0074277614748af1569688c8c7aa"
}
---

# 주세

주류에 과세되는 국세입니다.

- **주류별 과세**: 탁주는 킬로리터당 44,400원, 맥주는 885,700원의 종량세입니다. 약주·과실주·청주는 법정 과세가격의 30%, 증류주류는 72%입니다. 기타 주류는 법정 분류에 따라 72%·30%·10%로 달라집니다.
- **주정·생맥주**: 주정은 킬로리터당 57,000원에 알코올분 95도 초과 1도마다 600원을 가산합니다. 별도 추출장치를 쓰는 8리터 이상 용기 맥주는 2026년 말 이전 반출·수입신고분에 본문 세율의 80%를 적용하고 100원 미만을 버립니다.
- **수량·가격·전통주**: 소규모 제조자의 수량 인정비율, 국내 제조장 가격의 기준판매비율 차감, 수입 과세가격 등 별도 산정규정을 적용합니다. 적격 전통주는 시행령 제7조의 제조규모·반출순서·수량별 50% 또는 30% 경감을 구분하며 모든 전통주 전체 물량에 절반 세율을 적용하지 않습니다.
