---
{
  "id": "filing.year-end-settlement",
  "title": "연말정산",
  "type": "filing",
  "description": "원천징수의무자가 근로자의 해당 과세기간 근로소득세를 확정하는 절차입니다.",
  "parents": [
    "category.filing-calendar"
  ],
  "children": [],
  "related": [
    "category.deductions-and-reliefs",
    "scenario.employee.year-end-settlement",
    "application-channel.company-year-end-settlement",
    "application-channel.hometax-simplification",
    "life-income.side-job-income",
    "scenario.employee.side-job-income",
    "scenario.resigned-worker-year-end-settlement",
    "scenario.job-change-year-end-settlement"
  ],
  "terms": [
    "term.withholding",
    "term.income-deduction",
    "term.tax-credit"
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
      "label": "시기",
      "condition": "원천징수의무자가 다음 연도 2월분 급여를 지급할 때 정산합니다. 퇴직자는 퇴직하는 달의 급여 지급 시 정산합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "정산 방법",
      "condition": "근로소득금액에 신고된 소득공제를 적용하여 과세표준을 계산하고 기본세율을 적용한 뒤, 이미 원천징수한 세액과 법정 세액공제를 차감합니다. 초과 납부한 세액은 환급합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "미신고·분납",
      "condition": "공제 신고가 없으면 본인 기본공제와 표준세액공제만 적용합니다. 추가 납부세액이 10만원을 초과하면 다음 연도 2~4월 급여에서 나누어 원천징수할 수 있습니다.",
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
    "path": "opentax/disclosures/8034c35f133cb9155cbe399e.json",
    "checksum": "sha256:d2773ec76dd8ee9ffaab930321371cdfa38f2b7678063a26281482e7c7efba8d",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "filing.year-end-settlement",
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
        "value": "filing.year-end-settlement"
      }
    }
  ],
  "search_projection": {
    "id": "filing.year-end-settlement",
    "title": "연말정산",
    "type": "filing",
    "description": "원천징수의무자가 근로자의 해당 과세기간 근로소득세를 확정하는 절차입니다.",
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
    "search_text": "연말정산 원천징수의무자가 근로자의 해당 과세기간 근로소득세를 확정하는 절차입니다."
  },
  "record_checksum": "sha256:9ecf8e6d5a1a063773e29e2ba913f3bab87926c303b3fcd8f4465e5c398ff9f3"
}
---

# 연말정산

원천징수의무자가 근로자의 해당 과세기간 근로소득세를 확정하는 절차입니다.

- **시기**: 원천징수의무자가 다음 연도 2월분 급여를 지급할 때 정산합니다. 퇴직자는 퇴직하는 달의 급여 지급 시 정산합니다.
- **정산 방법**: 근로소득금액에 신고된 소득공제를 적용하여 과세표준을 계산하고 기본세율을 적용한 뒤, 이미 원천징수한 세액과 법정 세액공제를 차감합니다. 초과 납부한 세액은 환급합니다.
- **미신고·분납**: 공제 신고가 없으면 본인 기본공제와 표준세액공제만 적용합니다. 추가 납부세액이 10만원을 초과하면 다음 연도 2~4월 급여에서 나누어 원천징수할 수 있습니다.
