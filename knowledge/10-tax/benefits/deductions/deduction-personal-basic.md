---
{
  "id": "deduction.personal.basic",
  "title": "기본공제",
  "type": "deduction",
  "description": "본인, 배우자, 부양가족 등 기본공제 대상자에 대한 인적공제입니다.",
  "parents": [
    "deduction.personal"
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
      "label": "기본공제 금액",
      "condition": "종합소득이 있는 거주자 본인과 요건을 충족한 배우자·부양가족 1명당 연 150만원입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "배우자·부양가족 소득",
      "condition": "해당 과세기간 소득금액 합계 100만원 이하. 근로소득만 있으면 총급여 500만원 이하를 포함합니다. 본인에게 이 소득상한을 적용하는 것은 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "부양가족 나이·관계",
      "condition": "생계를 같이 하는 직계존속은 60세 이상, 직계비속·동거 입양자는 20세 이하, 형제자매는 20세 이하 또는 60세 이상입니다. 법정 장애인은 나이 제한을 받지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "기타 대상·중복 제한",
      "condition": "법정 수급권자·위탁아동 및 장애인 직계비속 등의 배우자는 별도 법정 요건을 따릅니다. 같은 배우자·부양가족을 여러 거주자가 중복 공제할 수 없습니다.",
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
    "path": "opentax/disclosures/688edf6764ccb3d685be0389.json",
    "checksum": "sha256:4240c8bde94a00faee8645f4e48c92d9f01739aca4db9a95f6296a03f9ae8df0",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "deduction.personal.basic",
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
        "value": "deduction.personal.basic"
      }
    }
  ],
  "search_projection": {
    "id": "deduction.personal.basic",
    "title": "기본공제",
    "type": "deduction",
    "description": "본인, 배우자, 부양가족 등 기본공제 대상자에 대한 인적공제입니다.",
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
    "search_text": "기본공제 본인, 배우자, 부양가족 등 기본공제 대상자에 대한 인적공제입니다."
  },
  "record_checksum": "sha256:a0b2a3ebd567d9d94fcb35ae23e9015a24b8b826f6495f774e1a70b0bc0bc5c0"
}
---

# 기본공제

본인, 배우자, 부양가족 등 기본공제 대상자에 대한 인적공제입니다.

- **기본공제 금액**: 종합소득이 있는 거주자 본인과 요건을 충족한 배우자·부양가족 1명당 연 150만원입니다.
- **배우자·부양가족 소득**: 해당 과세기간 소득금액 합계 100만원 이하. 근로소득만 있으면 총급여 500만원 이하를 포함합니다. 본인에게 이 소득상한을 적용하는 것은 아닙니다.
- **부양가족 나이·관계**: 생계를 같이 하는 직계존속은 60세 이상, 직계비속·동거 입양자는 20세 이하, 형제자매는 20세 이하 또는 60세 이상입니다. 법정 장애인은 나이 제한을 받지 않습니다.
- **기타 대상·중복 제한**: 법정 수급권자·위탁아동 및 장애인 직계비속 등의 배우자는 별도 법정 요건을 따릅니다. 같은 배우자·부양가족을 여러 거주자가 중복 공제할 수 없습니다.
