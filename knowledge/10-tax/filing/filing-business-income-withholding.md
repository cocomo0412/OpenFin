---
{
  "id": "filing.business-income-withholding",
  "title": "사업소득 원천징수",
  "type": "filing",
  "description": "프리랜서 등 원천징수 대상 사업소득을 지급할 때 지급금액의 일정 비율을 원천징수하고 정해진 기한에 신고·납부하는 흐름입니다.",
  "parents": [
    "category.business-tax-compliance",
    "filing.withholding-tax"
  ],
  "children": [],
  "related": [
    "tax.income.comprehensive",
    "filing.withholding-tax",
    "life-income.freelance-income",
    "scenario.freelancer.income-tax",
    "filing.payment-statement-submission"
  ],
  "terms": [
    "term.withholding",
    "term.withholding-obligor",
    "term.tax-rate",
    "term.deadline-special-rule"
  ],
  "tags": [
    "business-compliance"
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
      "label": "일반 세율",
      "condition": "법정 원천징수대상 사업소득의 소득세 원천징수세율은 3%입니다. 지방소득세를 합친 세율과 구분해야 하며 모든 사업소득이 원천징수 대상인 것은 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "특례",
      "condition": "외국인 직업운동가가 프로스포츠구단과 계약하여 용역을 제공하고 받는 소득은 소득세 20%를 적용합니다.",
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
    "path": "opentax/disclosures/f76f72136b903cb42598b211.json",
    "checksum": "sha256:583a2dca16ab2b7366c3385b7adab139950fcff68c5a8d888fc6485136642bd3",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "filing.business-income-withholding",
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
        "value": "filing.business-income-withholding"
      }
    }
  ],
  "search_projection": {
    "id": "filing.business-income-withholding",
    "title": "사업소득 원천징수",
    "type": "filing",
    "description": "프리랜서 등 원천징수 대상 사업소득을 지급할 때 지급금액의 일정 비율을 원천징수하고 정해진 기한에 신고·납부하는 흐름입니다.",
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
    "search_text": "사업소득 원천징수 프리랜서 등 원천징수 대상 사업소득을 지급할 때 지급금액의 일정 비율을 원천징수하고 정해진 기한에 신고·납부하는 흐름입니다."
  },
  "record_checksum": "sha256:04c35ba5a2a6e320435af0f8b933356f3f80be8bef5ba90065ef19be152cc371"
}
---

# 사업소득 원천징수

프리랜서 등 원천징수 대상 사업소득을 지급할 때 지급금액의 일정 비율을 원천징수하고 정해진 기한에 신고·납부하는 흐름입니다.

- **일반 세율**: 법정 원천징수대상 사업소득의 소득세 원천징수세율은 3%입니다. 지방소득세를 합친 세율과 구분해야 하며 모든 사업소득이 원천징수 대상인 것은 아닙니다.
- **특례**: 외국인 직업운동가가 프로스포츠구단과 계약하여 용역을 제공하고 받는 소득은 소득세 20%를 적용합니다.
