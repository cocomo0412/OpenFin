---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/CorporateTaxSupports",
  "basis_year": 2026,
  "id": "corporate.support.winwin-payment-credit",
  "title": "상생결제 지급금액 세액공제",
  "type": "corporate-tax-support",
  "description": "상생결제제도를 통해 구매대금을 지급한 경우 적용되는 세액공제입니다.",
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
      "label": "대상·기간",
      "condition": "법정 중소·중견기업이 2028년 12월 31일까지 중소·중견기업에 상생결제로 구매대금을 지급한 경우입니다. 구매대금 중 약속어음 결제비율이 전년보다 증가하지 않아야 합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "기한별 공제",
      "condition": "세금계산서 등 작성일부터 지급기한 15일 이내분은 0.5%, 15일 초과 30일 이내분은 0.3%, 30일 초과 60일 이내분은 0.15%입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "차감·한도",
      "condition": "전년 대비 현금성결제 감소액은 먼저 15일 이내분에서 차감하고 남은 차감액을 뒤 구간으로 순차 이월합니다. 각 계산금액은 0 미만이면 0으로 하며 합산 공제액은 해당 연도 소득세 또는 법인세의 10%가 한도입니다.",
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
    "path": "opentax/disclosures/4cd5d8fdff15ca374352c942.json",
    "checksum": "sha256:97d0a02d9ae72e3eea6c2fb8ea86d4db125bed016f7aaae2ca9da7ad901b7d24",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "corporate.support.winwin-payment-credit",
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
        "value": "corporate.support.winwin-payment-credit"
      }
    }
  ],
  "search_projection": {
    "id": "corporate.support.winwin-payment-credit",
    "title": "상생결제 지급금액 세액공제",
    "type": "corporate-tax-support",
    "description": "상생결제제도를 통해 구매대금을 지급한 경우 적용되는 세액공제입니다.",
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
    "search_text": "상생결제 지급금액 세액공제 상생결제제도를 통해 구매대금을 지급한 경우 적용되는 세액공제입니다."
  },
  "record_checksum": "sha256:af11e443aad71577df75a14d4fcc3cdb2652f14cfb1f13e830beac25066abe6c"
}
---

# 상생결제 지급금액 세액공제

상생결제제도를 통해 구매대금을 지급한 경우 적용되는 세액공제입니다.

- **대상·기간**: 법정 중소·중견기업이 2028년 12월 31일까지 중소·중견기업에 상생결제로 구매대금을 지급한 경우입니다. 구매대금 중 약속어음 결제비율이 전년보다 증가하지 않아야 합니다.
- **기한별 공제**: 세금계산서 등 작성일부터 지급기한 15일 이내분은 0.5%, 15일 초과 30일 이내분은 0.3%, 30일 초과 60일 이내분은 0.15%입니다.
- **차감·한도**: 전년 대비 현금성결제 감소액은 먼저 15일 이내분에서 차감하고 남은 차감액을 뒤 구간으로 순차 이월합니다. 각 계산금액은 0 미만이면 0으로 하며 합산 공제액은 해당 연도 소득세 또는 법인세의 10%가 한도입니다.
