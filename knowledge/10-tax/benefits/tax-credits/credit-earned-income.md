---
{
  "id": "credit.earned-income",
  "title": "근로소득 세액공제",
  "type": "tax-credit",
  "description": "근로소득자의 산출세액에서 차감되는 세액공제입니다.",
  "parents": [
    "category.tax-credits"
  ],
  "children": [],
  "related": [],
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
      "label": "산출세액 130만원 이하",
      "condition": "근로소득에 대한 종합소득 산출세액의 55%입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "산출세액 130만원 초과",
      "condition": "71만5천원에 130만원 초과 산출세액의 30%를 더합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "총급여 3,300만원 이하 한도",
      "condition": "74만원입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "총급여 3,300만원 초과 7,000만원 이하 한도",
      "condition": "74만원에서 총급여의 3,300만원 초과분 × 0.008을 차감하되 최소 66만원입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "총급여 7,000만원 초과 1억2천만원 이하 한도",
      "condition": "66만원에서 총급여의 7,000만원 초과분 × 0.5를 차감하되 최소 50만원입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "총급여 1억2천만원 초과 한도",
      "condition": "50만원에서 총급여의 1억2천만원 초과분 × 0.5를 차감하되 최소 20만원입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "일용근로자",
      "condition": "일용근로소득 원천징수 시 해당 산출세액의 55%를 공제합니다.",
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
    "path": "opentax/disclosures/3890695cf2cd25f182eaeb13.json",
    "checksum": "sha256:ab056cda1b8619a7596ac6a862b73e04155015c53639e7d7c613439d00de3209",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "credit.earned-income",
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
        "value": "credit.earned-income"
      }
    }
  ],
  "search_projection": {
    "id": "credit.earned-income",
    "title": "근로소득 세액공제",
    "type": "tax-credit",
    "description": "근로소득자의 산출세액에서 차감되는 세액공제입니다.",
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
    "search_text": "근로소득 세액공제 근로소득자의 산출세액에서 차감되는 세액공제입니다."
  },
  "record_checksum": "sha256:eb3a2bc151dd488cf247a9b1429f5c7aa66e652088b247440a0cd4b3730d365d"
}
---

# 근로소득 세액공제

근로소득자의 산출세액에서 차감되는 세액공제입니다.

- **산출세액 130만원 이하**: 근로소득에 대한 종합소득 산출세액의 55%입니다.
- **산출세액 130만원 초과**: 71만5천원에 130만원 초과 산출세액의 30%를 더합니다.
- **총급여 3,300만원 이하 한도**: 74만원입니다.
- **총급여 3,300만원 초과 7,000만원 이하 한도**: 74만원에서 총급여의 3,300만원 초과분 × 0.008을 차감하되 최소 66만원입니다.
- **총급여 7,000만원 초과 1억2천만원 이하 한도**: 66만원에서 총급여의 7,000만원 초과분 × 0.5를 차감하되 최소 50만원입니다.
- **총급여 1억2천만원 초과 한도**: 50만원에서 총급여의 1억2천만원 초과분 × 0.5를 차감하되 최소 20만원입니다.
- **일용근로자**: 일용근로소득 원천징수 시 해당 산출세액의 55%를 공제합니다.
