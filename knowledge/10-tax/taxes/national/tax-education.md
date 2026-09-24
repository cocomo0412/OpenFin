---
{
  "deadlines": [],
  "folder": "10_Taxes/National",
  "basis_year": 2026,
  "id": "tax.education",
  "title": "교육세",
  "type": "tax",
  "description": "교육재정 확충을 위한 목적세 성격의 국세입니다.",
  "parents": [
    "category.national-taxes"
  ],
  "children": [],
  "related": [
    "local.local-education"
  ],
  "terms": [
    "term.national-tax",
    "term.tax-law"
  ],
  "tags": [
    "national-tax"
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
      "label": "금융·보험업",
      "condition": "법정 수익금액 1조원 이하분의 세율은 0.5%, 1조원 초과분은 1%입니다. 매출액 전체를 임의로 과세표준으로 삼지 않으며 법정 수익금액 계산과 한국은행 스와프거래 특례를 확인합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.education-tax-act.full",
      "criteria_kind": "disclosure"
    },
    {
      "label": "다른 세액에 부가",
      "condition": "개별소비세액의 30%가 원칙이나 개별소비세법 제1조 제2항 제4호 가·라·바·아목 물품은 15%입니다. 교통·에너지·환경세액에는 15%를 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.education-tax-act.full",
      "criteria_kind": "disclosure"
    },
    {
      "label": "주세 관련",
      "condition": "주세액의 10%가 원칙이며 맥주와 법정 주세율이 70%를 초과하는 주류는 30%입니다. 주류 판매가격에 직접 곱하는 세율이 아닙니다. 세율표는 법제처 원문 이미지와 직접 대조했습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.education-tax-act.full",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.education-tax-act.full"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280369&chrClsCd=010202&urlMode=lsInfoP&efYd=20260101&ancYnChk=0"
  ],
  "collected_at": "2026-09-24T08:14:53.791704+00:00",
  "source_collected_at": "2026-09-24T08:14:53.791704+00:00",
  "last_source_checked_at": "2026-09-24T08:14:53.791704+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-24T08:14:53.791704+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/197d6577b99542d32196ac1c.json",
    "checksum": "sha256:e7725bd272461c5f2d74e719462a859858d7c78abf843a75a1c701c909726a81",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280369&chrClsCd=010202&urlMode=lsInfoP&efYd=20260101&ancYnChk=0",
    "collected_at": "2026-09-24T08:14:53.791704+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.education-tax-act.full",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280369&chrClsCd=010202&urlMode=lsInfoP&efYd=20260101&ancYnChk=0",
      "source_record_id": "tax.education",
      "collected_at": "2026-09-24T08:14:53.791704+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
      "checksum": "sha256:37173dce173f1f170243205fd9a0935f37b4d16f53bbb8785a8ab60d3227bba2",
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
        "value": "tax.education"
      }
    }
  ],
  "search_projection": {
    "id": "tax.education",
    "title": "교육세",
    "type": "tax",
    "description": "교육재정 확충을 위한 목적세 성격의 국세입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280369&chrClsCd=010202&urlMode=lsInfoP&efYd=20260101&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.education-tax-act.full"
    ],
    "export_id": "tax-ontology",
    "search_text": "교육세 교육재정 확충을 위한 목적세 성격의 국세입니다."
  },
  "record_checksum": "sha256:6fe9a051817767ef59d801d42108c54e901137cba2784acfd91991986f896b58"
}
---

# 교육세

교육재정 확충을 위한 목적세 성격의 국세입니다.

- **금융·보험업**: 법정 수익금액 1조원 이하분의 세율은 0.5%, 1조원 초과분은 1%입니다. 매출액 전체를 임의로 과세표준으로 삼지 않으며 법정 수익금액 계산과 한국은행 스와프거래 특례를 확인합니다.
- **다른 세액에 부가**: 개별소비세액의 30%가 원칙이나 개별소비세법 제1조 제2항 제4호 가·라·바·아목 물품은 15%입니다. 교통·에너지·환경세액에는 15%를 적용합니다.
- **주세 관련**: 주세액의 10%가 원칙이며 맥주와 법정 주세율이 70%를 초과하는 주류는 30%입니다. 주류 판매가격에 직접 곱하는 세율이 아닙니다. 세율표는 법제처 원문 이미지와 직접 대조했습니다.
