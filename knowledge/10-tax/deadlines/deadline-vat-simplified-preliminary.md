---
{
  "deadlines": [],
  "folder": "50_Deadlines",
  "basis_year": 2026,
  "id": "deadline.vat.simplified.preliminary",
  "title": "부가가치세 간이과세자 예정신고 예외",
  "type": "deadline",
  "description": "예정부과기간에 법정 세금계산서를 발급한 간이과세자는 그 기간 종료 후 25일 이내에 예정신고합니다. 2026년 7월의 휴일 조정 기한은 7월 27일입니다.",
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
  "start_date": "2026-07-01",
  "end_date": "2026-07-27",
  "recurrence": {
    "frequency": "annual",
    "anchor": "1월 1일~6월 30일 예정부과기간",
    "start_rule": "7월 1일",
    "due_rule": "기간 종료 후 25일; 휴일 등 기한 특례 적용",
    "special_rule": "부가가치세법 제32조 또는 제36조 제3항에 따라 예정부과기간에 세금계산서를 발급한 간이과세자"
  },
  "criteria": [
    {
      "label": "신고·납부기한",
      "condition": "예정부과기간에 법정 세금계산서를 발급한 간이과세자는 그 기간 종료 후 25일 이내에 예정신고합니다. 2026년 7월의 휴일 조정 기한은 7월 27일입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.value-added-tax-act.filing",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.value-added-tax-act.filing",
    "source.nts.tax-calendar.2026"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
    "https://www.nts.go.kr/nts/ad/taxSchdul/selectList.do?mi=135747&taxYear=2026&taxMonth=07"
  ],
  "collected_at": "2026-09-23T08:26:24.306633+00:00",
  "source_collected_at": "2026-09-23T08:26:24.306633+00:00",
  "last_source_checked_at": "2026-09-23T08:26:24.306633+00:00",
  "last_reviewed_at": "2026-09-23T08:26:24.306633+00:00",
  "reviewed_at": "2026-09-23T08:26:24.306633+00:00",
  "refresh_generation": "2026-09-23T08:26:24.306633+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/6fc6f1a9d6f0132e002fafbd.json",
    "checksum": "sha256:e400e38ce59bbacff5f88326452ef057d749b82f7621a6a0b42bf0ad1618f9b5",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:24.306633+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.value-added-tax-act.filing",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
      "source_record_id": "deadline.vat.simplified.preliminary",
      "collected_at": "2026-09-23T08:26:24.306633+00:00",
      "reviewed_at": "2026-09-23T08:26:24.306633+00:00",
      "checksum": "sha256:5184bc889a7758b16e563761bb6f3f77e87860e9b82d856b6e2e3d2239900879",
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
        "value": "deadline.vat.simplified.preliminary"
      }
    },
    {
      "source_id": "source.nts.tax-calendar.2026",
      "original_url": "https://www.nts.go.kr/nts/ad/taxSchdul/selectList.do?mi=135747&taxYear=2026&taxMonth=07",
      "collected_at": "2026-09-23T12:24:10.387077+00:00",
      "reviewed_at": "2026-09-23T12:24:10.387077+00:00",
      "checksum": "sha256:d4382e992844140f99c4dbefdf1caed88bf3cc0dda855108629f45007fc64367",
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
    "id": "deadline.vat.simplified.preliminary",
    "title": "부가가치세 간이과세자 예정신고 예외",
    "type": "deadline",
    "description": "예정부과기간에 법정 세금계산서를 발급한 간이과세자는 그 기간 종료 후 25일 이내에 예정신고합니다. 2026년 7월의 휴일 조정 기한은 7월 27일입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
      "https://www.nts.go.kr/nts/ad/taxSchdul/selectList.do?mi=135747&taxYear=2026&taxMonth=07"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.value-added-tax-act.filing"
    ],
    "export_id": "tax-ontology",
    "search_text": "부가가치세 간이과세자 예정신고 예외 예정부과기간에 법정 세금계산서를 발급한 간이과세자는 그 기간 종료 후 25일 이내에 예정신고합니다. 2026년 7월의 휴일 조정 기한은 7월 27일입니다."
  },
  "record_checksum": "sha256:d06971a6f26b52e4c393cc7387c0f65f1f807f6839499ba0ad86ea09fd664dd5"
}
---

# 부가가치세 간이과세자 예정신고 예외

예정부과기간에 법정 세금계산서를 발급한 간이과세자는 그 기간 종료 후 25일 이내에 예정신고합니다. 2026년 7월의 휴일 조정 기한은 7월 27일입니다.

- **신고·납부기한**: 예정부과기간에 법정 세금계산서를 발급한 간이과세자는 그 기간 종료 후 25일 이내에 예정신고합니다. 2026년 7월의 휴일 조정 기한은 7월 27일입니다.
