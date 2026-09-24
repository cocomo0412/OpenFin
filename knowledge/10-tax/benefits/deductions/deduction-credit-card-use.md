---
{
  "deadlines": [
    "deadline.year-end-settlement"
  ],
  "requires": [
    "eligibility-rule.credit-card-floor"
  ],
  "folder": "20_Deductions/IncomeDeductions",
  "basis_year": 2026,
  "id": "deduction.credit-card-use",
  "title": "신용카드 등 사용금액",
  "type": "deduction",
  "description": "신용카드, 직불카드, 현금영수증 등 사용금액에 대한 소득공제입니다.",
  "parents": [
    "deduction.other-income"
  ],
  "children": [],
  "related": [
    "eligibility-rule.credit-card-floor",
    "life-expense.card-spending"
  ],
  "terms": [
    "term.income-deduction",
    "term.deduction-limit",
    "term.eligibility-threshold"
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
      "label": "대상·문턱",
      "condition": "일용근로자를 제외한 근로소득자의 국내 적격 사용액이 총급여의 25%를 초과하는 경우 적용합니다. 현행 법정 적용기한은 2028년 말이며 사업비·비정상 사용·자동차 구입 등 제외항목과 중고차 예외를 구분합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "공제율",
      "condition": "일반 신용카드 15%, 현금영수증·직불카드 등 30%, 전통시장·대중교통 40%입니다. 총급여 7천만원 이하자의 법정 문화체육사용분은 30%입니다. 중복 지출은 한 번만 계산하며 25% 문턱에 해당하는 금액은 법정 순서·공제율로 차감합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "기본한도",
      "condition": "총급여 7천만원 이하이면 기본 300만원, 법정 자녀 등 1명은 350만원, 2명 이상은 400만원입니다. 총급여 7천만원 초과이면 각각 250만원·275만원·300만원입니다. 자녀 수는 시행령상 부양가족 요건으로 판단합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "추가한도·연도 구분",
      "condition": "기본한도 초과액 중 전통시장·대중교통 공제액은 합계 200만원까지 추가하며, 총급여 7천만원 이하자는 문화체육분도 합쳐 300만원까지 추가합니다. 2023년 한시 인상률이나 2024년 소비증가분 공제를 2026년 지출에 적용하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.tax-special-treatment-restriction-act.reliefs"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0"
  ],
  "collected_at": "2026-09-23T08:26:25.182612+00:00",
  "source_collected_at": "2026-09-23T08:26:25.182612+00:00",
  "last_source_checked_at": "2026-09-23T08:26:25.182612+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-23T08:26:25.182612+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/e7b1ef5d0299f99a89dd2cdf.json",
    "checksum": "sha256:cb330c746e7042cced6cc1d3f221b5ce25f1abbf67b18f30c26c8380da094ed4",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "deduction.credit-card-use",
      "collected_at": "2026-09-23T08:26:25.182612+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
      "checksum": "sha256:bf7a2db72fa6b5273f5e3b3483f49305d70145e3c4d3ef89e16b2b1b2280ae80",
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
        "value": "deduction.credit-card-use"
      }
    }
  ],
  "search_projection": {
    "id": "deduction.credit-card-use",
    "title": "신용카드 등 사용금액",
    "type": "deduction",
    "description": "신용카드, 직불카드, 현금영수증 등 사용금액에 대한 소득공제입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.tax-special-treatment-restriction-act.reliefs"
    ],
    "export_id": "tax-ontology",
    "search_text": "신용카드 등 사용금액 신용카드, 직불카드, 현금영수증 등 사용금액에 대한 소득공제입니다."
  },
  "record_checksum": "sha256:a849dfe127cb1a1adc943e706b8582ed1fde35c126fb3c6532bb9fda23dc31ce"
}
---

# 신용카드 등 사용금액

신용카드, 직불카드, 현금영수증 등 사용금액에 대한 소득공제입니다.

- **대상·문턱**: 일용근로자를 제외한 근로소득자의 국내 적격 사용액이 총급여의 25%를 초과하는 경우 적용합니다. 현행 법정 적용기한은 2028년 말이며 사업비·비정상 사용·자동차 구입 등 제외항목과 중고차 예외를 구분합니다.
- **공제율**: 일반 신용카드 15%, 현금영수증·직불카드 등 30%, 전통시장·대중교통 40%입니다. 총급여 7천만원 이하자의 법정 문화체육사용분은 30%입니다. 중복 지출은 한 번만 계산하며 25% 문턱에 해당하는 금액은 법정 순서·공제율로 차감합니다.
- **기본한도**: 총급여 7천만원 이하이면 기본 300만원, 법정 자녀 등 1명은 350만원, 2명 이상은 400만원입니다. 총급여 7천만원 초과이면 각각 250만원·275만원·300만원입니다. 자녀 수는 시행령상 부양가족 요건으로 판단합니다.
- **추가한도·연도 구분**: 기본한도 초과액 중 전통시장·대중교통 공제액은 합계 200만원까지 추가하며, 총급여 7천만원 이하자는 문화체육분도 합쳐 300만원까지 추가합니다. 2023년 한시 인상률이나 2024년 소비증가분 공제를 2026년 지출에 적용하지 않습니다.
