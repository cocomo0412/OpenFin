---
{
  "deadlines": [],
  "folder": "50_Deadlines",
  "basis_year": 2026,
  "id": "deadline.withholding.monthly",
  "title": "원천세 신고 납부",
  "type": "deadline",
  "description": "원천징수 소득세는 원칙적으로 징수월의 다음 달 10일까지 납부합니다. 휴일에 따른 기한 특례를 적용하며, 2026년 4월분은 5월 11일까지입니다.",
  "parents": [
    "category.filing-calendar"
  ],
  "children": [],
  "related": [],
  "terms": [],
  "tags": [
    "deadline"
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
  "start_date": null,
  "end_date": null,
  "recurrence": {
    "frequency": "monthly",
    "anchor": "원천징수일이 속하는 달",
    "due_rule": "다음 달 10일; 휴일 등 기한 특례 적용",
    "example": "2026년 4월분 원천세: 2026년 5월 11일"
  },
  "criteria": [
    {
      "label": "신고·납부기한",
      "condition": "원천징수 소득세는 원칙적으로 징수월의 다음 달 10일까지 납부합니다. 휴일에 따른 기한 특례를 적용하며, 2026년 4월분은 5월 11일까지입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.income-tax-act.deductions-credits",
    "source.nts.tax-calendar.2026"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "https://www.nts.go.kr/nts/ad/taxSchdul/selectList.do?mi=135747&taxYear=2026&taxMonth=05"
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
    "path": "opentax/disclosures/1daa59e3f33699946dc3c924.json",
    "checksum": "sha256:4f69f72b8802de1c98afaa035ec0c6d3aed6d3688daab021e8129662381356cd",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "deadline.withholding.monthly",
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
        "value": "deadline.withholding.monthly"
      }
    },
    {
      "source_id": "source.nts.tax-calendar.2026",
      "original_url": "https://www.nts.go.kr/nts/ad/taxSchdul/selectList.do?mi=135747&taxYear=2026&taxMonth=05",
      "collected_at": "2026-09-23T12:24:08.790868+00:00",
      "reviewed_at": "2026-09-23T12:24:08.790868+00:00",
      "checksum": "sha256:53e227a752d746f2c3141b04341cdd2e112447714a513f0a0808df28db9ebf2f",
      "checksum_scope": "official-calendar-response",
      "verification_status": "reference_only",
      "supported_fields": [
        "description",
        "end_date",
        "recurrence"
      ]
    }
  ],
  "search_projection": {
    "id": "deadline.withholding.monthly",
    "title": "원천세 신고 납부",
    "type": "deadline",
    "description": "원천징수 소득세는 원칙적으로 징수월의 다음 달 10일까지 납부합니다. 휴일에 따른 기한 특례를 적용하며, 2026년 4월분은 5월 11일까지입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "https://www.nts.go.kr/nts/ad/taxSchdul/selectList.do?mi=135747&taxYear=2026&taxMonth=05"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.income-tax-act.deductions-credits"
    ],
    "export_id": "tax-ontology",
    "search_text": "원천세 신고 납부 원천징수 소득세는 원칙적으로 징수월의 다음 달 10일까지 납부합니다. 휴일에 따른 기한 특례를 적용하며, 2026년 4월분은 5월 11일까지입니다."
  },
  "record_checksum": "sha256:7117482d675079e60d923db1d669e8eab14226cc2fddba3f1bbe5f34d998b7f9"
}
---

# 원천세 신고 납부

원천징수 소득세는 원칙적으로 징수월의 다음 달 10일까지 납부합니다. 휴일에 따른 기한 특례를 적용하며, 2026년 4월분은 5월 11일까지입니다.

- **신고·납부기한**: 원천징수 소득세는 원칙적으로 징수월의 다음 달 10일까지 납부합니다. 휴일에 따른 기한 특례를 적용하며, 2026년 4월분은 5월 11일까지입니다.
