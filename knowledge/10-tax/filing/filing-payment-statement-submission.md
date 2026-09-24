---
{
  "id": "filing.payment-statement-submission",
  "title": "지급명세서 제출",
  "type": "filing",
  "description": "근로·퇴직·사업·종교인·연금계좌, 일용근로, 간이지급명세서, 이자·배당·기타소득 지급자료를 제출기한별로 관리하는 원천징수 후속 신고입니다.",
  "parents": [
    "category.filing-calendar",
    "filing.withholding-tax"
  ],
  "children": [],
  "related": [
    "filing.business-income-withholding",
    "life-income.freelance-income",
    "life-income.side-job-income",
    "scenario.payment-statement-submission"
  ],
  "terms": [
    "term.withholding",
    "term.withholding-obligor",
    "term.deadline"
  ],
  "tags": [
    "filing",
    "withholding",
    "deadline",
    "custom-overlay"
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
      "label": "일반 지급명세서",
      "condition": "원칙적으로 지급일이 속하는 과세기간의 다음 연도 2월 말일까지 제출합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "3월 10일 대상",
      "condition": "원천징수대상 사업소득, 근로소득·퇴직소득, 종교인소득 및 법정 봉사료는 다음 연도 3월 10일까지입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "일용근로소득",
      "condition": "지급일이 속하는 달의 다음 달 말일까지 제출합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "휴업·폐업·해산",
      "condition": "원칙적으로 해당 달의 다음다음 달 말일까지이며, 일용근로소득은 다음 달 말일까지입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "제출·간주",
      "condition": "정보통신망 또는 전자저장매체 제출이 원칙입니다. 법정 제출 면제·서면 제출 예외와 다른 서류·간이지급명세서 제출로 갈음하는 범위가 있습니다. 간이지급명세서의 별도 제출기한과 일반 지급명세서 기한을 혼동하지 않아야 합니다.",
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
    "path": "opentax/disclosures/39abe758260b64d823205da5.json",
    "checksum": "sha256:15272a7fd6c684a349042ee1b86d6df3f6f9b83f5907c7983ca5fc4ef7c07259",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "filing.payment-statement-submission",
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
        "value": "filing.payment-statement-submission"
      }
    }
  ],
  "search_projection": {
    "id": "filing.payment-statement-submission",
    "title": "지급명세서 제출",
    "type": "filing",
    "description": "근로·퇴직·사업·종교인·연금계좌, 일용근로, 간이지급명세서, 이자·배당·기타소득 지급자료를 제출기한별로 관리하는 원천징수 후속 신고입니다.",
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
    "search_text": "지급명세서 제출 근로·퇴직·사업·종교인·연금계좌, 일용근로, 간이지급명세서, 이자·배당·기타소득 지급자료를 제출기한별로 관리하는 원천징수 후속 신고입니다."
  },
  "record_checksum": "sha256:f269407cda77279eb56fa2f42beab9a4b261e53506f94205ee93c61689cd51bc"
}
---

# 지급명세서 제출

근로·퇴직·사업·종교인·연금계좌, 일용근로, 간이지급명세서, 이자·배당·기타소득 지급자료를 제출기한별로 관리하는 원천징수 후속 신고입니다.

- **일반 지급명세서**: 원칙적으로 지급일이 속하는 과세기간의 다음 연도 2월 말일까지 제출합니다.
- **3월 10일 대상**: 원천징수대상 사업소득, 근로소득·퇴직소득, 종교인소득 및 법정 봉사료는 다음 연도 3월 10일까지입니다.
- **일용근로소득**: 지급일이 속하는 달의 다음 달 말일까지 제출합니다.
- **휴업·폐업·해산**: 원칙적으로 해당 달의 다음다음 달 말일까지이며, 일용근로소득은 다음 달 말일까지입니다.
- **제출·간주**: 정보통신망 또는 전자저장매체 제출이 원칙입니다. 법정 제출 면제·서면 제출 예외와 다른 서류·간이지급명세서 제출로 갈음하는 범위가 있습니다. 간이지급명세서의 별도 제출기한과 일반 지급명세서 기한을 혼동하지 않아야 합니다.
