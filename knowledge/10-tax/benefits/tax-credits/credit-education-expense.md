---
{
  "id": "credit.education-expense",
  "title": "교육비 세액공제",
  "type": "tax-credit",
  "description": "본인과 기본공제대상자 교육비 등에 대한 특별세액공제입니다.",
  "parents": [
    "credit.special-tax"
  ],
  "children": [],
  "related": [
    "required-document.education-payment-certificate",
    "eligibility-rule.education-dependent-type",
    "conflict-rule.education-nongrad",
    "life-expense.education-costs",
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
      "label": "공제율·대상",
      "condition": "일용근로자를 제외한 근로소득자가 지출한 법정 교육비의 15%입니다. 현행 조문은 기본공제대상자의 나이·소득 제한을 적용하지 않습니다. 비과세 교육비와 법정 지원금 등은 제외합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "가족 교육비 한도",
      "condition": "배우자·직계비속·형제자매·입양자·위탁아동의 대학 교육비는 1명당 연 900만원, 취학 전 아동·초중고생은 연 300만원까지입니다. 가족의 대학원 교육비와 가족이 학자금 대출로 지급한 교육비는 제외합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "초등학생 예능·체육",
      "condition": "과세기간 종료일 현재 9세 미만 또는 2학년 이하 초등학생의 법정 예능학원·체육시설 교육비도 포함됩니다. 모든 학원비가 대상인 것은 아니며 시행령상 시설·금액 요건을 충족해야 합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "본인 교육비",
      "condition": "본인의 법정 학교·대학원·직업능력개발훈련 교육비와 법정 학자금 대출 원리금 상환액은 가족 교육비의 300만원·900만원 한도를 적용하지 않습니다. 연체로 인한 추가 지급액 등은 제외합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "장애인 특수교육",
      "condition": "법정 사회복지시설·비영리법인·발달재활서비스 기관 등의 특수교육비가 대상입니다. 발달재활서비스 기관은 과세기간 종료일 현재 18세 미만인 경우만 해당합니다.",
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
    "path": "opentax/disclosures/899b8c3fa444c2c26be29740.json",
    "checksum": "sha256:5806926aac4fe82e8da2f37ea3b1210fa9d23b64caa9ab12534b62646cb869e1",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "credit.education-expense",
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
        "value": "credit.education-expense"
      }
    }
  ],
  "search_projection": {
    "id": "credit.education-expense",
    "title": "교육비 세액공제",
    "type": "tax-credit",
    "description": "본인과 기본공제대상자 교육비 등에 대한 특별세액공제입니다.",
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
    "search_text": "교육비 세액공제 본인과 기본공제대상자 교육비 등에 대한 특별세액공제입니다."
  },
  "record_checksum": "sha256:94192cc6d4c339c3301873b36dd4fc5eb10139c02f0e9e079df341333673a507"
}
---

# 교육비 세액공제

본인과 기본공제대상자 교육비 등에 대한 특별세액공제입니다.

- **공제율·대상**: 일용근로자를 제외한 근로소득자가 지출한 법정 교육비의 15%입니다. 현행 조문은 기본공제대상자의 나이·소득 제한을 적용하지 않습니다. 비과세 교육비와 법정 지원금 등은 제외합니다.
- **가족 교육비 한도**: 배우자·직계비속·형제자매·입양자·위탁아동의 대학 교육비는 1명당 연 900만원, 취학 전 아동·초중고생은 연 300만원까지입니다. 가족의 대학원 교육비와 가족이 학자금 대출로 지급한 교육비는 제외합니다.
- **초등학생 예능·체육**: 과세기간 종료일 현재 9세 미만 또는 2학년 이하 초등학생의 법정 예능학원·체육시설 교육비도 포함됩니다. 모든 학원비가 대상인 것은 아니며 시행령상 시설·금액 요건을 충족해야 합니다.
- **본인 교육비**: 본인의 법정 학교·대학원·직업능력개발훈련 교육비와 법정 학자금 대출 원리금 상환액은 가족 교육비의 300만원·900만원 한도를 적용하지 않습니다. 연체로 인한 추가 지급액 등은 제외합니다.
- **장애인 특수교육**: 법정 사회복지시설·비영리법인·발달재활서비스 기관 등의 특수교육비가 대상입니다. 발달재활서비스 기관은 과세기간 종료일 현재 18세 미만인 경우만 해당합니다.
