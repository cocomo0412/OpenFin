---
{
  "deadlines": [],
  "folder": "10_Taxes/National",
  "basis_year": 2026,
  "id": "tax.securities-transaction",
  "title": "증권거래세",
  "type": "tax",
  "description": "주권 등의 양도 거래에 과세되는 국세입니다.",
  "parents": [
    "category.national-taxes"
  ],
  "children": [],
  "related": [
    "tax.income.capital-gains",
    "filing.capital-gains-return",
    "concept.capital-gains.stock-basic-deduction"
  ],
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
      "label": "시장별 탄력세율",
      "condition": "현행 시행령 제5조의 증권거래세율은 유가증권시장 0.05%, 코넥스시장 0.10%, 코스닥시장 및 법정 금융투자협회 장외거래 대상 주권 0.20%입니다. 시장별 세율을 구분해야 합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.securities-transaction-decree.rates",
      "criteria_kind": "disclosure"
    },
    {
      "label": "적용 범위",
      "condition": "위 세율은 제5조에 열거된 시장·거래의 주권에 적용하는 탄력세율입니다. 그 밖의 양도에 그대로 적용하지 않으며, 별도 세목인 농어촌특별세와 합산한 세율로 표시하지 않습니다. 비과세·과세표준 등은 모법의 해당 요건을 확인합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.securities-transaction-decree.rates",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.securities-transaction-decree.rates"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=280901&joNo=0005&joBrNo=00&docCls=jo&urlMode=lsScJoRltInfoR"
  ],
  "collected_at": "2026-09-24T08:14:54.059909+00:00",
  "source_collected_at": "2026-09-24T08:14:54.059909+00:00",
  "last_source_checked_at": "2026-09-24T08:14:54.059909+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-24T08:14:54.059909+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/56c56b2360659386a22a0880.json",
    "checksum": "sha256:33384826f03c567302619775157abc7061bdbf34e0efae01e8aa2ad77eb55ffe",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=280901&joNo=0005&joBrNo=00&docCls=jo&urlMode=lsScJoRltInfoR",
    "collected_at": "2026-09-24T08:14:54.059909+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.securities-transaction-decree.rates",
      "original_url": "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=280901&joNo=0005&joBrNo=00&docCls=jo&urlMode=lsScJoRltInfoR",
      "source_record_id": "tax.securities-transaction",
      "collected_at": "2026-09-24T08:14:54.059909+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
      "checksum": "sha256:538b9caa3965a8efe8907d0841f1f061154923d3fb83a4149aee27e7a9a11409",
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
        "value": "tax.securities-transaction"
      }
    }
  ],
  "search_projection": {
    "id": "tax.securities-transaction",
    "title": "증권거래세",
    "type": "tax",
    "description": "주권 등의 양도 거래에 과세되는 국세입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=280901&joNo=0005&joBrNo=00&docCls=jo&urlMode=lsScJoRltInfoR"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.securities-transaction-decree.rates"
    ],
    "export_id": "tax-ontology",
    "search_text": "증권거래세 주권 등의 양도 거래에 과세되는 국세입니다."
  },
  "record_checksum": "sha256:9695f61272fe26e1259abd269ccf2c8da01487b072c8689f2a5631fe1bb075d8"
}
---

# 증권거래세

주권 등의 양도 거래에 과세되는 국세입니다.

- **시장별 탄력세율**: 현행 시행령 제5조의 증권거래세율은 유가증권시장 0.05%, 코넥스시장 0.10%, 코스닥시장 및 법정 금융투자협회 장외거래 대상 주권 0.20%입니다. 시장별 세율을 구분해야 합니다.
- **적용 범위**: 위 세율은 제5조에 열거된 시장·거래의 주권에 적용하는 탄력세율입니다. 그 밖의 양도에 그대로 적용하지 않으며, 별도 세목인 농어촌특별세와 합산한 세율로 표시하지 않습니다. 비과세·과세표준 등은 모법의 해당 요건을 확인합니다.
