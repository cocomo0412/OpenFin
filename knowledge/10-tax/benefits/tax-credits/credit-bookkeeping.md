---
{
  "id": "credit.bookkeeping",
  "title": "기장세액공제",
  "type": "tax-credit",
  "description": "간편장부대상자가 복식부기에 따라 기장하여 소득금액을 계산한 경우 적용되는 세액공제입니다.",
  "parents": [
    "category.tax-credits"
  ],
  "children": [],
  "related": [
    "filing.income-tax-return",
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
      "label": "대상·계산",
      "condition": "간편장부대상자가 확정신고 시 복식부기로 소득금액을 계산하고 법정 서류를 제출하면, 종합소득산출세액에 장부로 계산한 사업소득금액의 종합소득금액 대비 비율을 곱한 금액의 20%를 공제합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "한도",
      "condition": "기장세액공제액은 100만원을 한도로 합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "배제 조건",
      "condition": "장부에 따라 신고할 소득금액의 20% 이상을 누락하거나 관련 장부·증빙을 확정신고기간 종료일부터 5년간 보관하지 않으면 적용하지 않습니다. 보관에는 천재지변 등 법정 예외가 있습니다.",
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
    "path": "opentax/disclosures/20c2a3bfb9f0dac6b325baea.json",
    "checksum": "sha256:bf5c548bee285e0e2d5abbec0c168c558ef499eb5fd8163e47fd056161ecf698",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "credit.bookkeeping",
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
        "value": "credit.bookkeeping"
      }
    }
  ],
  "search_projection": {
    "id": "credit.bookkeeping",
    "title": "기장세액공제",
    "type": "tax-credit",
    "description": "간편장부대상자가 복식부기에 따라 기장하여 소득금액을 계산한 경우 적용되는 세액공제입니다.",
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
    "search_text": "기장세액공제 간편장부대상자가 복식부기에 따라 기장하여 소득금액을 계산한 경우 적용되는 세액공제입니다."
  },
  "record_checksum": "sha256:83594bf1490905d4ccf55f197121b8cb9b615fea1dcb24bc5514d5a855754988"
}
---

# 기장세액공제

간편장부대상자가 복식부기에 따라 기장하여 소득금액을 계산한 경우 적용되는 세액공제입니다.

- **대상·계산**: 간편장부대상자가 확정신고 시 복식부기로 소득금액을 계산하고 법정 서류를 제출하면, 종합소득산출세액에 장부로 계산한 사업소득금액의 종합소득금액 대비 비율을 곱한 금액의 20%를 공제합니다.
- **한도**: 기장세액공제액은 100만원을 한도로 합니다.
- **배제 조건**: 장부에 따라 신고할 소득금액의 20% 이상을 누락하거나 관련 장부·증빙을 확정신고기간 종료일부터 5년간 보관하지 않으면 적용하지 않습니다. 보관에는 천재지변 등 법정 예외가 있습니다.
