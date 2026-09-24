---
{
  "deadlines": [
    "deadline.year-end-settlement"
  ],
  "folder": "20_Deductions/TaxCredits",
  "basis_year": 2026,
  "id": "credit.special-tax",
  "title": "특별세액공제",
  "type": "tax-credit",
  "description": "근로소득자가 해당 과세기간에 지출한 일정 비용을 산출세액에서 공제하는 항목 묶음입니다.",
  "parents": [
    "category.tax-credits"
  ],
  "children": [
    "credit.insurance-premium",
    "credit.medical-expense",
    "credit.education-expense",
    "credit.donation"
  ],
  "related": [],
  "terms": [
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
      "label": "보험료",
      "condition": "적격 보장성보험료는 12%, 장애인전용 보장성보험료는 15%이며 각 보험료 공제대상액 한도는 연 100만원입니다. 근로소득·기본공제대상자·보험계약 요건을 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "의료비",
      "condition": "총급여 3% 문턱을 법정 순서로 차감합니다. 일반 적격 의료비는 15%, 일반 부양가족분 공제대상액 한도는 700만원입니다. 본인·6세 이하·65세 이상·장애인·법정 중증질환자 등에는 이 한도가 없으며 미숙아·선천성이상아 20%, 난임시술 30%를 구분합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "교육비",
      "condition": "적격 교육비는 15%입니다. 부양가족 취학 전·초중고는 1명당 300만원, 대학생은 900만원 한도이며 본인 적격 교육비와 장애인 특수교육비는 별도 한도 제한이 없습니다. 2026년 조문상 소득·나이 제한 완화와 9세 미만 또는 초등 2학년 이하 예능학원·체육시설 요건을 구분합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "기부금·표준공제",
      "condition": "일반·특례 기부금은 소득세법 제59조의4, 정치자금·고향사랑기부금은 각각 조세특례제한법 제76조·제58조의 별도 기준입니다. 근로자 표준세액공제 13만원은 법정 소득·세액공제를 신청하지 않은 경우 적용하는 대안이며 중복 가산하지 않습니다.",
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
    "path": "opentax/disclosures/e23cabb51ab10858a6e845e2.json",
    "checksum": "sha256:2fb6be8d0da082b9aad546e8fc54a552f19637dca94a7567156f93cd3eb9c104",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "credit.special-tax",
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
        "value": "credit.special-tax"
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
    "id": "credit.special-tax",
    "title": "특별세액공제",
    "type": "tax-credit",
    "description": "근로소득자가 해당 과세기간에 지출한 일정 비용을 산출세액에서 공제하는 항목 묶음입니다.",
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
    "search_text": "특별세액공제 근로소득자가 해당 과세기간에 지출한 일정 비용을 산출세액에서 공제하는 항목 묶음입니다."
  },
  "record_checksum": "sha256:d080619e839fb0422e72a0088cc30f541103e27f173ab3036496aaf3b135d23a"
}
---

# 특별세액공제

근로소득자가 해당 과세기간에 지출한 일정 비용을 산출세액에서 공제하는 항목 묶음입니다.

- **보험료**: 적격 보장성보험료는 12%, 장애인전용 보장성보험료는 15%이며 각 보험료 공제대상액 한도는 연 100만원입니다. 근로소득·기본공제대상자·보험계약 요건을 적용합니다.
- **의료비**: 총급여 3% 문턱을 법정 순서로 차감합니다. 일반 적격 의료비는 15%, 일반 부양가족분 공제대상액 한도는 700만원입니다. 본인·6세 이하·65세 이상·장애인·법정 중증질환자 등에는 이 한도가 없으며 미숙아·선천성이상아 20%, 난임시술 30%를 구분합니다.
- **교육비**: 적격 교육비는 15%입니다. 부양가족 취학 전·초중고는 1명당 300만원, 대학생은 900만원 한도이며 본인 적격 교육비와 장애인 특수교육비는 별도 한도 제한이 없습니다. 2026년 조문상 소득·나이 제한 완화와 9세 미만 또는 초등 2학년 이하 예능학원·체육시설 요건을 구분합니다.
- **기부금·표준공제**: 일반·특례 기부금은 소득세법 제59조의4, 정치자금·고향사랑기부금은 각각 조세특례제한법 제76조·제58조의 별도 기준입니다. 근로자 표준세액공제 13만원은 법정 소득·세액공제를 신청하지 않은 경우 적용하는 대안이며 중복 가산하지 않습니다.
