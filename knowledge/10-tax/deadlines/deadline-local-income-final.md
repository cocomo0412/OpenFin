---
{
  "deadlines": [],
  "folder": "50_Deadlines",
  "basis_year": 2026,
  "id": "deadline.local.income.final",
  "title": "개인지방소득세 종합소득 확정신고",
  "type": "deadline",
  "description": "개인지방소득세 종합소득 확정신고는 종합소득세 신고기한까지입니다. 2025년 귀속 일반 신고는 2026년 6월 1일, 성실신고확인서 제출자는 6월 30일까지입니다.",
  "parents": [
    "category.filing-calendar"
  ],
  "children": [],
  "related": [
    "local.local-income",
    "tax.income.comprehensive"
  ],
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
  "start_date": "2026-05-01",
  "end_date": "2026-06-01",
  "recurrence": {
    "frequency": "annual",
    "anchor": "과세기간 다음연도",
    "start_rule": "5월 1일",
    "due_rule": "소득세법상 확정신고기한까지",
    "special_rule": "성실신고확인서 제출자는 6월 30일; 납부세액 100만원 초과 시 법정 분납 요건 확인"
  },
  "criteria": [
    {
      "label": "신고·납부기한",
      "condition": "개인지방소득세 종합소득 확정신고는 종합소득세 신고기한까지입니다. 2025년 귀속 일반 신고는 2026년 6월 1일, 성실신고확인서 제출자는 6월 30일까지입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.local-tax-act.rates",
    "source.nts.tax-calendar.2026"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "https://www.nts.go.kr/nts/ad/taxSchdul/selectList.do?mi=135747&taxYear=2026&taxMonth=06"
  ],
  "collected_at": "2026-09-23T08:26:22.571307+00:00",
  "source_collected_at": "2026-09-23T08:26:22.571307+00:00",
  "last_source_checked_at": "2026-09-23T08:26:22.571307+00:00",
  "last_reviewed_at": "2026-09-23T08:26:22.571307+00:00",
  "reviewed_at": "2026-09-23T08:26:22.571307+00:00",
  "refresh_generation": "2026-09-23T08:26:22.571307+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/e2ab61663674ca3a68eaf120.json",
    "checksum": "sha256:86361f324799b2483a05cd3fd3206806f78c4f8ef681baa3982a889911b23ef9",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:22.571307+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.local-tax-act.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "deadline.local.income.final",
      "collected_at": "2026-09-23T08:26:22.571307+00:00",
      "reviewed_at": "2026-09-23T08:26:22.571307+00:00",
      "checksum": "sha256:9f5ef4724aa36b1f62bd0e36aa912309144e85c3e1bc880c960e66d467418995",
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
        "value": "deadline.local.income.final"
      }
    },
    {
      "source_id": "source.nts.tax-calendar.2026",
      "original_url": "https://www.nts.go.kr/nts/ad/taxSchdul/selectList.do?mi=135747&taxYear=2026&taxMonth=06",
      "collected_at": "2026-09-23T12:24:09.555876+00:00",
      "reviewed_at": "2026-09-23T12:24:09.555876+00:00",
      "checksum": "sha256:9e3aa17a59b0173247c375f88dec8bba7edbca76f4964138d67ad14e9723428d",
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
    "id": "deadline.local.income.final",
    "title": "개인지방소득세 종합소득 확정신고",
    "type": "deadline",
    "description": "개인지방소득세 종합소득 확정신고는 종합소득세 신고기한까지입니다. 2025년 귀속 일반 신고는 2026년 6월 1일, 성실신고확인서 제출자는 6월 30일까지입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "https://www.nts.go.kr/nts/ad/taxSchdul/selectList.do?mi=135747&taxYear=2026&taxMonth=06"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.local-tax-act.rates"
    ],
    "export_id": "tax-ontology",
    "search_text": "개인지방소득세 종합소득 확정신고 개인지방소득세 종합소득 확정신고는 종합소득세 신고기한까지입니다. 2025년 귀속 일반 신고는 2026년 6월 1일, 성실신고확인서 제출자는 6월 30일까지입니다."
  },
  "record_checksum": "sha256:d437f8ed1ece1743adb5b23aacef4710d7f86cc4ca41a6c95e61e8e5d9d8e81d"
}
---

# 개인지방소득세 종합소득 확정신고

개인지방소득세 종합소득 확정신고는 종합소득세 신고기한까지입니다. 2025년 귀속 일반 신고는 2026년 6월 1일, 성실신고확인서 제출자는 6월 30일까지입니다.

- **신고·납부기한**: 개인지방소득세 종합소득 확정신고는 종합소득세 신고기한까지입니다. 2025년 귀속 일반 신고는 2026년 6월 1일, 성실신고확인서 제출자는 6월 30일까지입니다.
