---
{
  "id": "credit.medical-expense",
  "title": "의료비 세액공제",
  "type": "tax-credit",
  "description": "총급여액의 일정 비율 초과 의료비 등에 대한 특별세액공제입니다.",
  "parents": [
    "credit.special-tax"
  ],
  "children": [],
  "related": [
    "required-document.medical-expense-statement",
    "required-document.medical-receipt",
    "required-document.eyeglasses-receipt",
    "eligibility-rule.medical-expense-floor",
    "life-expense.medical-costs",
    "scenario.dual-income-personal-deduction"
  ],
  "terms": [
    "term.tax-credit",
    "term.eligibility-threshold"
  ],
  "tags": [
    "tax-credit"
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
      "label": "대상·기준",
      "condition": "일용근로자를 제외한 근로소득자가 본인과 기본공제대상자를 위해 지급한 법정 의료비가 대상입니다. 부양가족의 나이·소득 제한을 적용하지 않으며 총급여의 3%를 초과한 지출부터 계산합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "일반 의료비",
      "condition": "다른 특례 대상 의료비를 제외한 일반 의료비는 3% 문턱을 초과한 금액 중 연 700만원까지 15%를 공제합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "한도 특례",
      "condition": "본인, 과세기간 개시일 현재 6세 이하, 종료일 현재 65세 이상, 장애인 및 법정 중증질환자·희귀난치성질환자·결핵환자의 의료비에는 일반 의료비의 700만원 한도를 적용하지 않습니다. 공제율은 15%입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "미숙아·선천성이상아",
      "condition": "법정 의료비 공제율은 20%입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "난임시술",
      "condition": "법정 난임시술비와 관련 처방 의약품 구입비의 공제율은 30%입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "중복 문턱 방지",
      "condition": "3% 기준액은 일반 의료비, 한도 특례 의료비, 미숙아·선천성이상아, 난임시술비 순으로 미달액을 차감합니다. 각 항목에서 3%를 별도로 중복 공제하는 방식이 아닙니다.",
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
    "path": "opentax/disclosures/5e33706356f7a475076b9b16.json",
    "checksum": "sha256:fbcff67ce7a93d9747b9a003fed0921be82d8c26d73cdbd8b2aa527a89e5611c",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "credit.medical-expense",
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
        "value": "credit.medical-expense"
      }
    }
  ],
  "search_projection": {
    "id": "credit.medical-expense",
    "title": "의료비 세액공제",
    "type": "tax-credit",
    "description": "총급여액의 일정 비율 초과 의료비 등에 대한 특별세액공제입니다.",
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
    "search_text": "의료비 세액공제 총급여액의 일정 비율 초과 의료비 등에 대한 특별세액공제입니다."
  },
  "record_checksum": "sha256:4383928912984f6a30255746b27d0a9f76b93b4cbe32a8d39cdd1ddfb7248d0a"
}
---

# 의료비 세액공제

총급여액의 일정 비율 초과 의료비 등에 대한 특별세액공제입니다.

- **대상·기준**: 일용근로자를 제외한 근로소득자가 본인과 기본공제대상자를 위해 지급한 법정 의료비가 대상입니다. 부양가족의 나이·소득 제한을 적용하지 않으며 총급여의 3%를 초과한 지출부터 계산합니다.
- **일반 의료비**: 다른 특례 대상 의료비를 제외한 일반 의료비는 3% 문턱을 초과한 금액 중 연 700만원까지 15%를 공제합니다.
- **한도 특례**: 본인, 과세기간 개시일 현재 6세 이하, 종료일 현재 65세 이상, 장애인 및 법정 중증질환자·희귀난치성질환자·결핵환자의 의료비에는 일반 의료비의 700만원 한도를 적용하지 않습니다. 공제율은 15%입니다.
- **미숙아·선천성이상아**: 법정 의료비 공제율은 20%입니다.
- **난임시술**: 법정 난임시술비와 관련 처방 의약품 구입비의 공제율은 30%입니다.
- **중복 문턱 방지**: 3% 기준액은 일반 의료비, 한도 특례 의료비, 미숙아·선천성이상아, 난임시술비 순으로 미달액을 차감합니다. 각 항목에서 3%를 별도로 중복 공제하는 방식이 아닙니다.
