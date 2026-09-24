---
{
  "id": "credit.dividend",
  "title": "배당세액공제",
  "type": "tax-credit",
  "description": "종합과세되는 배당소득에 더해진 배당가산액을 종합소득 산출세액에서 공제해 법인세와의 이중과세를 조정하는 세액공제입니다.",
  "parents": [
    "category.tax-credits"
  ],
  "children": [],
  "related": [
    "concept.financial-income-comprehensive-taxation",
    "tax.income.comprehensive"
  ],
  "terms": [
    "term.tax-credit"
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
      "label": "대상",
      "condition": "종합소득에 합산한 배당 중 소득세법 제17조 제3항의 배당가산 대상 배당에 적용합니다. 모든 배당에 일률적으로 적용하는 공제가 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "가산·공제",
      "condition": "법정 대상 배당소득에는 10%를 소득에 가산하고 그 가산액에 해당하는 금액을 종합소득 산출세액에서 공제합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "적용 범위",
      "condition": "종합소득 과세표준에 포함된 배당 중 금융소득 종합과세기준금액을 초과하는 부분이 대상입니다. 법인세 비과세·면제 관련 배당 등 법정 제외사항과 시행령상 공제 계산을 적용합니다.",
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
    "path": "opentax/disclosures/f2b03e74d5eb615876c9491c.json",
    "checksum": "sha256:9718d6184cbaa0468039ceb1456003a82019bae748512e5918d3e5fae13e20a3",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "credit.dividend",
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
        "value": "credit.dividend"
      }
    }
  ],
  "search_projection": {
    "id": "credit.dividend",
    "title": "배당세액공제",
    "type": "tax-credit",
    "description": "종합과세되는 배당소득에 더해진 배당가산액을 종합소득 산출세액에서 공제해 법인세와의 이중과세를 조정하는 세액공제입니다.",
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
    "search_text": "배당세액공제 종합과세되는 배당소득에 더해진 배당가산액을 종합소득 산출세액에서 공제해 법인세와의 이중과세를 조정하는 세액공제입니다."
  },
  "record_checksum": "sha256:290b64be58fb3c7217950b87ecb73e2c8078594b52300fed553434c28f14783d"
}
---

# 배당세액공제

종합과세되는 배당소득에 더해진 배당가산액을 종합소득 산출세액에서 공제해 법인세와의 이중과세를 조정하는 세액공제입니다.

- **대상**: 종합소득에 합산한 배당 중 소득세법 제17조 제3항의 배당가산 대상 배당에 적용합니다. 모든 배당에 일률적으로 적용하는 공제가 아닙니다.
- **가산·공제**: 법정 대상 배당소득에는 10%를 소득에 가산하고 그 가산액에 해당하는 금액을 종합소득 산출세액에서 공제합니다.
- **적용 범위**: 종합소득 과세표준에 포함된 배당 중 금융소득 종합과세기준금액을 초과하는 부분이 대상입니다. 법인세 비과세·면제 관련 배당 등 법정 제외사항과 시행령상 공제 계산을 적용합니다.
