---
{
  "id": "deduction.health-insurance-premium",
  "title": "보험료공제",
  "type": "deduction",
  "description": "국민건강보험료, 고용보험료 등 법정 보험료 납부액을 특별소득공제로 반영하는 항목입니다.",
  "parents": [
    "deduction.special-income"
  ],
  "children": [],
  "related": [],
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
      "label": "대상",
      "condition": "일용근로자를 제외한 근로소득자가 건강보험법·고용보험법·노인장기요양보험법에 따라 실제 부담하여 납부한 보험료입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "공제 범위",
      "condition": "근로자 본인 부담액을 근로소득금액에서 공제합니다. 사용자 부담분이나 일반 보장성보험료와 구분하며, 법정 신청과 종합소득금액 한도를 적용합니다.",
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
    "path": "opentax/disclosures/a7ab5dc32d5baf406a8636ec.json",
    "checksum": "sha256:e08f3643266ee101cc49776e4154aea55e96ecebf04bf23a547c805a588e69f3",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "deduction.health-insurance-premium",
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
        "value": "deduction.health-insurance-premium"
      }
    }
  ],
  "search_projection": {
    "id": "deduction.health-insurance-premium",
    "title": "보험료공제",
    "type": "deduction",
    "description": "국민건강보험료, 고용보험료 등 법정 보험료 납부액을 특별소득공제로 반영하는 항목입니다.",
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
    "search_text": "보험료공제 국민건강보험료, 고용보험료 등 법정 보험료 납부액을 특별소득공제로 반영하는 항목입니다."
  },
  "record_checksum": "sha256:fbeb1e6916c76cd6bb36bba3409b734887df5bebc5a8a8e6ca39188d415a0e06"
}
---

# 보험료공제

국민건강보험료, 고용보험료 등 법정 보험료 납부액을 특별소득공제로 반영하는 항목입니다.

- **대상**: 일용근로자를 제외한 근로소득자가 건강보험법·고용보험법·노인장기요양보험법에 따라 실제 부담하여 납부한 보험료입니다.
- **공제 범위**: 근로자 본인 부담액을 근로소득금액에서 공제합니다. 사용자 부담분이나 일반 보장성보험료와 구분하며, 법정 신청과 종합소득금액 한도를 적용합니다.
