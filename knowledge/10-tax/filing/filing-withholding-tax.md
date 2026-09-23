---
{
  "id": "filing.withholding-tax",
  "title": "원천세 신고 납부 절차",
  "type": "filing",
  "description": "원천징수의무자가 원천징수한 세액을 신고·납부하는 절차입니다. 매월 납부와 반기별 납부를 모두 연결해 급여·사업소득 지급자의 반복 업무로 관리합니다.",
  "parents": [
    "category.filing-calendar",
    "category.business-tax-compliance"
  ],
  "children": [
    "filing.business-income-withholding",
    "filing.payment-statement-submission"
  ],
  "related": [
    "filing.business-income-withholding",
    "scenario.payment-statement-submission"
  ],
  "terms": [
    "term.withholding",
    "term.withholding-obligor",
    "term.deadline-special-rule"
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
      "label": "원칙",
      "condition": "원천징수한 소득세는 징수일이 속한 달의 다음 달 10일까지 납부합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "반기납부",
      "condition": "상시고용인원·업종 등 시행령상 요건을 충족한 원천징수의무자는 해당 반기의 마지막 달의 다음 달 10일까지 납부할 수 있습니다. 모든 사업자가 임의로 선택하는 방식은 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "반기납부 제외",
      "condition": "법인세법상 소득처분에 따른 상여·배당·기타소득, 국제조세조정법상 처분 배당 및 법에서 정한 특정 원천징수세액은 반기납부에서 제외됩니다.",
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
    "path": "opentax/disclosures/ccd59811587f6ee980da1d92.json",
    "checksum": "sha256:7a3b0f73e2927cedaa2c97268bae329a0def71ee108aa8c9f74d4cfe30f828ba",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "filing.withholding-tax",
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
        "value": "filing.withholding-tax"
      }
    }
  ],
  "search_projection": {
    "id": "filing.withholding-tax",
    "title": "원천세 신고 납부 절차",
    "type": "filing",
    "description": "원천징수의무자가 원천징수한 세액을 신고·납부하는 절차입니다. 매월 납부와 반기별 납부를 모두 연결해 급여·사업소득 지급자의 반복 업무로 관리합니다.",
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
    "search_text": "원천세 신고 납부 절차 원천징수의무자가 원천징수한 세액을 신고·납부하는 절차입니다. 매월 납부와 반기별 납부를 모두 연결해 급여·사업소득 지급자의 반복 업무로 관리합니다."
  },
  "record_checksum": "sha256:ee7341ffe1a54099210f1cae4894e9ae5a0fa9e8e64507a563da6d26f0a5a506"
}
---

# 원천세 신고 납부 절차

원천징수의무자가 원천징수한 세액을 신고·납부하는 절차입니다. 매월 납부와 반기별 납부를 모두 연결해 급여·사업소득 지급자의 반복 업무로 관리합니다.

- **원칙**: 원천징수한 소득세는 징수일이 속한 달의 다음 달 10일까지 납부합니다.
- **반기납부**: 상시고용인원·업종 등 시행령상 요건을 충족한 원천징수의무자는 해당 반기의 마지막 달의 다음 달 10일까지 납부할 수 있습니다. 모든 사업자가 임의로 선택하는 방식은 아닙니다.
- **반기납부 제외**: 법인세법상 소득처분에 따른 상여·배당·기타소득, 국제조세조정법상 처분 배당 및 법에서 정한 특정 원천징수세액은 반기납부에서 제외됩니다.
