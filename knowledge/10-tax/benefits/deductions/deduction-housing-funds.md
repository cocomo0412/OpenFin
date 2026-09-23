---
{
  "id": "deduction.housing-funds",
  "title": "주택자금공제",
  "type": "deduction",
  "description": "주택임차차입금 원리금상환액과 장기주택저당차입금 이자상환액 등 주택자금 관련 소득공제입니다.",
  "parents": [
    "deduction.special-income"
  ],
  "children": [],
  "related": [
    "required-document.lease-contract",
    "required-document.resident-registration-copy",
    "conflict-rule.monthly-rent-household-duplicate"
  ],
  "terms": [
    "term.income-deduction",
    "term.tax-base"
  ],
  "tags": [
    "income-deduction"
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
      "label": "주택임차차입금",
      "condition": "과세기간 말 무주택 세대의 법정 세대주 또는 해당 공제를 받지 않는 세대주의 세대원인 근로소득자가 일정 규모 이하 주택·주거용 오피스텔의 법정 임차차입금 원리금을 상환하면 40%를 공제합니다. 주택마련저축 공제와 합하여 연 400만원 한도입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "장기주택저당차입금 대상",
      "condition": "과세기간 말 무주택 또는 1주택 세대의 법정 대상 근로소득자가 취득 당시 기준시가 6억원 이하 주택의 법정 장기주택저당차입금 이자를 상환한 경우입니다. 세대 전체가 2주택 이상이면 제외하며 세대원은 실제 거주 요건도 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "15년 이상 기본 한도",
      "condition": "상환기간 15년 이상은 연 800만원입니다. 주택임차차입금과 주택마련저축 공제액을 합산해 한도를 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "고정금리·비거치식 특례",
      "condition": "15년 이상이며 고정금리와 비거치식 분할상환을 모두 충족하면 연 2,000만원, 둘 중 하나이면 연 1,800만원입니다. 10년 이상이며 둘 중 하나이면 연 600만원입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "적용 시점·요건",
      "condition": "위 금액은 현행 조문의 기준이며 차입·취득 시점에 따른 부칙 및 경과규정, 시행령상 차입 요건을 함께 확인해야 합니다. 기존 대출에 새로운 한도를 무조건 소급 적용하지 않습니다.",
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
    "path": "opentax/disclosures/753609a6a0c6885b86176a92.json",
    "checksum": "sha256:cff16331b68904eef26d3e00013b3033e4a90cc129ad83b38b34febad82e95fc",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "deduction.housing-funds",
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
        "value": "deduction.housing-funds"
      }
    }
  ],
  "search_projection": {
    "id": "deduction.housing-funds",
    "title": "주택자금공제",
    "type": "deduction",
    "description": "주택임차차입금 원리금상환액과 장기주택저당차입금 이자상환액 등 주택자금 관련 소득공제입니다.",
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
    "search_text": "주택자금공제 주택임차차입금 원리금상환액과 장기주택저당차입금 이자상환액 등 주택자금 관련 소득공제입니다."
  },
  "record_checksum": "sha256:d5155746c58441874661c5eaad5ebefc4a2c325795988db8f17cbb39719eafc4"
}
---

# 주택자금공제

주택임차차입금 원리금상환액과 장기주택저당차입금 이자상환액 등 주택자금 관련 소득공제입니다.

- **주택임차차입금**: 과세기간 말 무주택 세대의 법정 세대주 또는 해당 공제를 받지 않는 세대주의 세대원인 근로소득자가 일정 규모 이하 주택·주거용 오피스텔의 법정 임차차입금 원리금을 상환하면 40%를 공제합니다. 주택마련저축 공제와 합하여 연 400만원 한도입니다.
- **장기주택저당차입금 대상**: 과세기간 말 무주택 또는 1주택 세대의 법정 대상 근로소득자가 취득 당시 기준시가 6억원 이하 주택의 법정 장기주택저당차입금 이자를 상환한 경우입니다. 세대 전체가 2주택 이상이면 제외하며 세대원은 실제 거주 요건도 적용합니다.
- **15년 이상 기본 한도**: 상환기간 15년 이상은 연 800만원입니다. 주택임차차입금과 주택마련저축 공제액을 합산해 한도를 적용합니다.
- **고정금리·비거치식 특례**: 15년 이상이며 고정금리와 비거치식 분할상환을 모두 충족하면 연 2,000만원, 둘 중 하나이면 연 1,800만원입니다. 10년 이상이며 둘 중 하나이면 연 600만원입니다.
- **적용 시점·요건**: 위 금액은 현행 조문의 기준이며 차입·취득 시점에 따른 부칙 및 경과규정, 시행령상 차입 요건을 함께 확인해야 합니다. 기존 대출에 새로운 한도를 무조건 소급 적용하지 않습니다.
