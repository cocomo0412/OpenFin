---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/CorporateTaxSupports",
  "basis_year": 2026,
  "id": "corporate.support.facility-investment-credit",
  "title": "시설투자 등에 대한 세액공제",
  "type": "corporate-tax-support",
  "description": "각종 시설투자 금액과 투자 증가분에 적용되는 세액공제입니다.",
  "parents": [
    "category.corporate-tax-supports"
  ],
  "children": [],
  "related": [],
  "terms": [
    "term.tax-credit",
    "term.tax-reduction"
  ],
  "tags": [
    "corporate-tax-support"
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
      "label": "일반 기본공제",
      "condition": "적격 신규 자산 투자액에 일반 1%, 중견 5%, 중소 10%를 적용합니다. 최초 중소기업 졸업 후 법정 3년 이내 기업은 7.5%입니다. 중고품·법정 임대용 자산·제외 리스는 공제대상이 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "기술별 기본공제",
      "condition": "신성장 사업화·연구개발시설은 일반 3%·중견 6%·법정 중소 졸업기업 9%·중소 12%입니다. 2029년 말까지 국가전략기술 시설은 일반 15%·법정 졸업기업 20%·중소 25%, 반도체 분야 적격 시설은 각각 20%·25%·30%입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "추가공제·연도",
      "condition": "직전 3년 연평균 투자·취득금액 초과분의 10%를 추가 공제하며 기본공제의 2배가 상한입니다. 제3호 임시공제는 2023~2025년 해당 과세연도 규정이므로 2026년 기본공제율로 사용하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "사후관리",
      "condition": "여러 해에 걸친 투자는 각 연도 투자액을 기준으로 합니다. 법정 사후관리기간 내 목적 외 전용 등에는 이자상당액을 포함해 추징하며 시설분류·투자액은 시행령 기준을 확인해야 합니다.",
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
    "path": "opentax/disclosures/2d635956eb18bb1c1509804f.json",
    "checksum": "sha256:893319f03798bd677325bad7d62fe81a903a28ffd0d2454b5e05162b191ca4e6",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "corporate.support.facility-investment-credit",
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
        "value": "corporate.support.facility-investment-credit"
      }
    }
  ],
  "search_projection": {
    "id": "corporate.support.facility-investment-credit",
    "title": "시설투자 등에 대한 세액공제",
    "type": "corporate-tax-support",
    "description": "각종 시설투자 금액과 투자 증가분에 적용되는 세액공제입니다.",
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
    "search_text": "시설투자 등에 대한 세액공제 각종 시설투자 금액과 투자 증가분에 적용되는 세액공제입니다."
  },
  "record_checksum": "sha256:9b46fc32b72e73a8309ac05ca8d647c251285c93d8aae3b7a034aa1bdfec0f8d"
}
---

# 시설투자 등에 대한 세액공제

각종 시설투자 금액과 투자 증가분에 적용되는 세액공제입니다.

- **일반 기본공제**: 적격 신규 자산 투자액에 일반 1%, 중견 5%, 중소 10%를 적용합니다. 최초 중소기업 졸업 후 법정 3년 이내 기업은 7.5%입니다. 중고품·법정 임대용 자산·제외 리스는 공제대상이 아닙니다.
- **기술별 기본공제**: 신성장 사업화·연구개발시설은 일반 3%·중견 6%·법정 중소 졸업기업 9%·중소 12%입니다. 2029년 말까지 국가전략기술 시설은 일반 15%·법정 졸업기업 20%·중소 25%, 반도체 분야 적격 시설은 각각 20%·25%·30%입니다.
- **추가공제·연도**: 직전 3년 연평균 투자·취득금액 초과분의 10%를 추가 공제하며 기본공제의 2배가 상한입니다. 제3호 임시공제는 2023~2025년 해당 과세연도 규정이므로 2026년 기본공제율로 사용하지 않습니다.
- **사후관리**: 여러 해에 걸친 투자는 각 연도 투자액을 기준으로 합니다. 법정 사후관리기간 내 목적 외 전용 등에는 이자상당액을 포함해 추징하며 시설분류·투자액은 시행령 기준을 확인해야 합니다.
