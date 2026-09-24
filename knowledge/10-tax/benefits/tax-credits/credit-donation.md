---
{
  "deadlines": [
    "deadline.year-end-settlement"
  ],
  "requires": [
    "eligibility-rule.donation-type",
    "required-document.donation-receipt"
  ],
  "folder": "20_Deductions/TaxCredits",
  "basis_year": 2026,
  "id": "credit.donation",
  "title": "기부금 세액공제",
  "type": "tax-credit",
  "description": "정치자금, 고향사랑, 특례, 우리사주조합, 일반기부금 등 공제한도 내 기부금에 대한 특별세액공제입니다.",
  "parents": [
    "credit.special-tax"
  ],
  "children": [],
  "related": [
    "required-document.donation-receipt",
    "eligibility-rule.donation-type",
    "conflict-rule.donation-carryover",
    "life-expense.donation",
    "scenario.dual-income-personal-deduction"
  ],
  "terms": [
    "term.tax-credit"
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
      "label": "일반·특례 기부금",
      "condition": "적격 공제대상 기부금 합계의 1천만원 이하분은 15%, 초과분은 30%입니다. 사업소득 필요경비 산입액은 중복 공제하지 않습니다. 종교단체 기부 여부에 따른 소득금액 한도와 특례기부금 우선순위를 적용합니다. 2024년 3천만원 초과분 추가 공제는 2026년 기부에 적용하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "정치자금",
      "condition": "조세특례제한법 제76조에 따라 10만원 이하는 100/110, 초과분은 15%이며 그 초과분 중 3천만원을 넘는 부분은 25%입니다. 사업자인 거주자의 10만원 초과분은 소득금액 범위의 손금산입 규정과 구분합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "고향사랑기부금",
      "condition": "현행 제58조는 10만원 이하분 100/110, 10만원 초과 20만원 이하분 40%, 20만원 초과 2천만원 이하분 15%입니다. 법정 기간 내 특별재난지역 기부의 해당 초과분은 30%입니다. 지방소득세 효과를 포함한 비율과 혼동하지 않으며 산출세액 한도와 사업자 손금산입을 구분합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.income-tax-act.deductions-credits",
    "source.law.tax-special-treatment-restriction-act.reliefs"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0"
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
    "path": "opentax/disclosures/772d4aaaf3dc06f579a925b9.json",
    "checksum": "sha256:ffc59138d60c4ea4f8663f5594f817bdf954f2a87a6469a2fbd1c3c3d5417edd",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "credit.donation",
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
        "value": "credit.donation"
      }
    },
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "collected_at": "2026-09-23T08:26:25.182612+00:00",
      "checksum": "sha256:bf7a2db72fa6b5273f5e3b3483f49305d70145e3c4d3ef89e16b2b1b2280ae80",
      "checksum_scope": "official-disclosure-response",
      "verification_status": "reference_only",
      "supported_fields": [
        "criteria",
        "current_disclosure"
      ],
      "reviewed_at": "2026-09-24T00:00:00+09:00"
    }
  ],
  "search_projection": {
    "id": "credit.donation",
    "title": "기부금 세액공제",
    "type": "tax-credit",
    "description": "정치자금, 고향사랑, 특례, 우리사주조합, 일반기부금 등 공제한도 내 기부금에 대한 특별세액공제입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.income-tax-act.deductions-credits"
    ],
    "export_id": "tax-ontology",
    "search_text": "기부금 세액공제 정치자금, 고향사랑, 특례, 우리사주조합, 일반기부금 등 공제한도 내 기부금에 대한 특별세액공제입니다."
  },
  "record_checksum": "sha256:b0e58b172392aef487a01123e5489e5d7b235bd7a56b701420a63baa0e4761ee"
}
---

# 기부금 세액공제

정치자금, 고향사랑, 특례, 우리사주조합, 일반기부금 등 공제한도 내 기부금에 대한 특별세액공제입니다.

- **일반·특례 기부금**: 적격 공제대상 기부금 합계의 1천만원 이하분은 15%, 초과분은 30%입니다. 사업소득 필요경비 산입액은 중복 공제하지 않습니다. 종교단체 기부 여부에 따른 소득금액 한도와 특례기부금 우선순위를 적용합니다. 2024년 3천만원 초과분 추가 공제는 2026년 기부에 적용하지 않습니다.
- **정치자금**: 조세특례제한법 제76조에 따라 10만원 이하는 100/110, 초과분은 15%이며 그 초과분 중 3천만원을 넘는 부분은 25%입니다. 사업자인 거주자의 10만원 초과분은 소득금액 범위의 손금산입 규정과 구분합니다.
- **고향사랑기부금**: 현행 제58조는 10만원 이하분 100/110, 10만원 초과 20만원 이하분 40%, 20만원 초과 2천만원 이하분 15%입니다. 법정 기간 내 특별재난지역 기부의 해당 초과분은 30%입니다. 지방소득세 효과를 포함한 비율과 혼동하지 않으며 산출세액 한도와 사업자 손금산입을 구분합니다.
