---
{
  "deadlines": [
    "deadline.vat.periodic",
    "deadline.vat.general.first-final",
    "deadline.vat.general.second-final",
    "deadline.vat.simplified.annual",
    "deadline.vat.simplified.preliminary"
  ],
  "folder": "50_Deadlines",
  "basis_year": 2026,
  "id": "filing.vat-return",
  "title": "부가가치세 신고 납부 절차",
  "type": "filing",
  "description": "부가가치세 과세사업자가 과세기간별 매출세액과 매입세액을 신고·납부하는 절차입니다. 일반과세자 확정신고, 간이과세자 연간 신고, 일부 간이과세자 예정신고 예외를 함께 관리합니다.",
  "parents": [
    "category.filing-calendar",
    "category.business-tax-compliance"
  ],
  "children": [],
  "related": [
    "tax.value-added",
    "concept.general-vat-taxpayer",
    "concept.simple-vat-taxpayer",
    "concept.vat-payment-exemption",
    "filing.business-registration",
    "application-channel.hometax-vat",
    "life-event.first-vat-return",
    "scenario.first-vat-return",
    "scenario.simple-vat-taxpayer-decision",
    "concept.additional-tax.general",
    "scenario.tax-penalty-risk"
  ],
  "terms": [
    "term.tax-period",
    "term.general-vat-taxpayer",
    "term.simple-vat-taxpayer",
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
      "label": "일반과세자 확정신고",
      "condition": "각 과세기간 종료 후 25일 이내에 신고·납부합니다. 폐업하면 폐업일이 속한 달의 다음 달 25일까지입니다. 이미 신고한 예정신고분·조기환급분은 중복 신고하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.value-added-tax-act.filing",
      "criteria_kind": "disclosure"
    },
    {
      "label": "예정신고·예정고지",
      "condition": "원칙적으로 1~3월 및 7~9월 예정신고기간 종료 후 25일 이내입니다. 개인사업자·법정 소규모 법인은 직전 과세기간 납부세액의 50% 예정고지 방식이 적용될 수 있고, 50만원 미만·과세유형 전환 등 징수 제외 및 자진 예정신고 예외가 있습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.value-added-tax-act.filing",
      "criteria_kind": "disclosure"
    },
    {
      "label": "간이과세자",
      "condition": "과세기간 종료 후 25일 이내에 확정신고·납부하며 폐업 시 별도 기한이 있습니다. 예정부과·과세유형 변경·세금계산서 발급에 따른 예외를 구분해야 합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.value-added-tax-act.filing",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.value-added-tax-act.filing"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0"
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
    "path": "opentax/disclosures/071e4b988f8d628a6974f7b9.json",
    "checksum": "sha256:2c7c997c6cb1c832bec9cf4f061e9a71969d3d9acfce24fb1533d2d69a3e9bdb",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:24.306633+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.value-added-tax-act.filing",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
      "source_record_id": "filing.vat-return",
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
        "value": "filing.vat-return"
      }
    }
  ],
  "search_projection": {
    "id": "filing.vat-return",
    "title": "부가가치세 신고 납부 절차",
    "type": "filing",
    "description": "부가가치세 과세사업자가 과세기간별 매출세액과 매입세액을 신고·납부하는 절차입니다. 일반과세자 확정신고, 간이과세자 연간 신고, 일부 간이과세자 예정신고 예외를 함께 관리합니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.value-added-tax-act.filing"
    ],
    "export_id": "tax-ontology",
    "search_text": "부가가치세 신고 납부 절차 부가가치세 과세사업자가 과세기간별 매출세액과 매입세액을 신고·납부하는 절차입니다. 일반과세자 확정신고, 간이과세자 연간 신고, 일부 간이과세자 예정신고 예외를 함께 관리합니다."
  },
  "record_checksum": "sha256:96af7a34abb6c3b47e73814f2ba98f1c60c76c96367725846310ea849c434754"
}
---

# 부가가치세 신고 납부 절차

부가가치세 과세사업자가 과세기간별 매출세액과 매입세액을 신고·납부하는 절차입니다. 일반과세자 확정신고, 간이과세자 연간 신고, 일부 간이과세자 예정신고 예외를 함께 관리합니다.

- **일반과세자 확정신고**: 각 과세기간 종료 후 25일 이내에 신고·납부합니다. 폐업하면 폐업일이 속한 달의 다음 달 25일까지입니다. 이미 신고한 예정신고분·조기환급분은 중복 신고하지 않습니다.
- **예정신고·예정고지**: 원칙적으로 1~3월 및 7~9월 예정신고기간 종료 후 25일 이내입니다. 개인사업자·법정 소규모 법인은 직전 과세기간 납부세액의 50% 예정고지 방식이 적용될 수 있고, 50만원 미만·과세유형 전환 등 징수 제외 및 자진 예정신고 예외가 있습니다.
- **간이과세자**: 과세기간 종료 후 25일 이내에 확정신고·납부하며 폐업 시 별도 기한이 있습니다. 예정부과·과세유형 변경·세금계산서 발급에 따른 예외를 구분해야 합니다.
