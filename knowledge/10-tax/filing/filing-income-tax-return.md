---
{
  "deadlines": [
    "deadline.income-tax.2025-return"
  ],
  "folder": "50_Deadlines",
  "basis_year": 2025,
  "id": "filing.income-tax-return",
  "title": "종합소득세 확정신고",
  "type": "filing",
  "description": "종합소득이 있는 개인이 다음연도 5월 신고·납부하는 절차입니다.",
  "parents": [
    "category.filing-calendar"
  ],
  "children": [],
  "related": [
    "tax.income.comprehensive",
    "application-channel.hometax-income-tax",
    "concept.additional-tax.general",
    "scenario.tax-penalty-risk"
  ],
  "terms": [
    "term.deadline",
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
      "label": "일반 신고기간",
      "condition": "종합소득금액이 있는 거주자는 원칙적으로 다음 연도 5월 1~31일에 종합소득 과세표준을 확정신고합니다. 과세표준이 없거나 결손인 경우와 법정 분리과세 소득의 신고도 해당 규정을 확인합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "성실신고확인",
      "condition": "법정 성실신고확인 대상자가 확인서를 제출하는 경우 다음 연도 5월 1일부터 6월 30일까지 신고합니다. 모든 사업자의 기한이 6월 말인 것은 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "신고서류",
      "condition": "소득계산·공제 증명서류와 법정 재무제표·조정계산서 등을 제출합니다. 신고대상 제외 및 휴일에 따른 실제 마감일은 별도 규정을 확인합니다.",
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
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-23T08:26:20.830416+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/5b1d5d225bb952c9b84f27c0.json",
    "checksum": "sha256:1e31a5eb0dff1f4e1c83ae53b68022210cec6840edd90f7153eb3ff831922cb4",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "filing.income-tax-return",
      "collected_at": "2026-09-23T08:26:20.830416+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
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
        "value": "filing.income-tax-return"
      }
    }
  ],
  "search_projection": {
    "id": "filing.income-tax-return",
    "title": "종합소득세 확정신고",
    "type": "filing",
    "description": "종합소득이 있는 개인이 다음연도 5월 신고·납부하는 절차입니다.",
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
    "search_text": "종합소득세 확정신고 종합소득이 있는 개인이 다음연도 5월 신고·납부하는 절차입니다."
  },
  "record_checksum": "sha256:91f493486f16ffb81b311376be85708773e0b27efcf0d57fc5b020abcb866f96"
}
---

# 종합소득세 확정신고

종합소득이 있는 개인이 다음연도 5월 신고·납부하는 절차입니다.

- **일반 신고기간**: 종합소득금액이 있는 거주자는 원칙적으로 다음 연도 5월 1~31일에 종합소득 과세표준을 확정신고합니다. 과세표준이 없거나 결손인 경우와 법정 분리과세 소득의 신고도 해당 규정을 확인합니다.
- **성실신고확인**: 법정 성실신고확인 대상자가 확인서를 제출하는 경우 다음 연도 5월 1일부터 6월 30일까지 신고합니다. 모든 사업자의 기한이 6월 말인 것은 아닙니다.
- **신고서류**: 소득계산·공제 증명서류와 법정 재무제표·조정계산서 등을 제출합니다. 신고대상 제외 및 휴일에 따른 실제 마감일은 별도 규정을 확인합니다.
