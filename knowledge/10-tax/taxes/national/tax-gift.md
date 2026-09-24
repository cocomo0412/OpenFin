---
{
  "deadlines": [
    "deadline.gift.general"
  ],
  "folder": "10_Taxes/National",
  "basis_year": 2026,
  "id": "tax.gift",
  "title": "증여세",
  "type": "tax",
  "description": "상속세·증여세 일반 과세표준에 적용하는 10~50% 누진세율입니다. 재산가액 자체와 공제 후 과세표준을 구분하고 세대생략 할증·세액공제·특례를 별도로 적용합니다.",
  "parents": [
    "tax.inheritance-and-gift"
  ],
  "children": [
    "filing.gift-tax-return"
  ],
  "related": [
    "scenario.inheritance-gift"
  ],
  "terms": [
    "term.tax-base",
    "term.donee",
    "term.tax-rate",
    "term.progressive-deduction"
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
      "label": "1억원 이하",
      "basis": "과세표준",
      "condition": "1억원 이하; 일반 과세표준 세율, 할증·공제·특례 적용 전",
      "threshold_krw_max": 100000000,
      "rate_percent": 10,
      "progressive_deduction_krw": 0,
      "source": "source.law.inheritance-gift-tax-act.rates",
      "criteria_kind": "rate",
      "rate_basis": "과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.inheritance-gift-tax-act.rates",
      "law_reference": "상속세 및 증여세법 제26조·제56조"
    },
    {
      "label": "1억원 초과 5억원 이하",
      "basis": "과세표준",
      "condition": "1억원 초과 5억원 이하; 일반 과세표준 세율, 할증·공제·특례 적용 전",
      "threshold_krw_min": 100000000,
      "threshold_krw_max": 500000000,
      "rate_percent": 20,
      "progressive_deduction_krw": 10000000,
      "source": "source.law.inheritance-gift-tax-act.rates",
      "criteria_kind": "rate",
      "rate_basis": "과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.inheritance-gift-tax-act.rates",
      "law_reference": "상속세 및 증여세법 제26조·제56조"
    },
    {
      "label": "5억원 초과 10억원 이하",
      "basis": "과세표준",
      "condition": "5억원 초과 10억원 이하; 일반 과세표준 세율, 할증·공제·특례 적용 전",
      "threshold_krw_min": 500000000,
      "threshold_krw_max": 1000000000,
      "rate_percent": 30,
      "progressive_deduction_krw": 60000000,
      "source": "source.law.inheritance-gift-tax-act.rates",
      "criteria_kind": "rate",
      "rate_basis": "과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.inheritance-gift-tax-act.rates",
      "law_reference": "상속세 및 증여세법 제26조·제56조"
    },
    {
      "label": "10억원 초과 30억원 이하",
      "basis": "과세표준",
      "condition": "10억원 초과 30억원 이하; 일반 과세표준 세율, 할증·공제·특례 적용 전",
      "threshold_krw_min": 1000000000,
      "threshold_krw_max": 3000000000,
      "rate_percent": 40,
      "progressive_deduction_krw": 160000000,
      "source": "source.law.inheritance-gift-tax-act.rates",
      "criteria_kind": "rate",
      "rate_basis": "과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.inheritance-gift-tax-act.rates",
      "law_reference": "상속세 및 증여세법 제26조·제56조"
    },
    {
      "label": "30억원 초과",
      "basis": "과세표준",
      "condition": "30억원 초과; 일반 과세표준 세율, 할증·공제·특례 적용 전",
      "threshold_krw_min": 3000000000,
      "rate_percent": 50,
      "progressive_deduction_krw": 460000000,
      "source": "source.law.inheritance-gift-tax-act.rates",
      "criteria_kind": "rate",
      "rate_basis": "과세표준",
      "basis_category": "tax-base",
      "basis_definition": "공제와 필요경비 등을 반영한 뒤 세율을 적용하는 최종 세액 계산 기준금액입니다.",
      "basis_lookup": "해당 세목의 신고서, 계산명세서, 국세청 세율 안내에서 확인합니다.",
      "selection_rule": "구간별 하한·상한을 비교해 해당 과세표준이 들어가는 세율 구간을 선택하고 누진공제액을 함께 적용합니다.",
      "basis_source": "source.law.inheritance-gift-tax-act.rates",
      "law_reference": "상속세 및 증여세법 제26조·제56조"
    }
  ],
  "sources": [
    "source.law.inheritance-gift-tax-act.rates"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276123&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0"
  ],
  "collected_at": "2026-09-23T08:26:22.158326+00:00",
  "source_collected_at": "2026-09-23T08:26:22.158326+00:00",
  "last_source_checked_at": "2026-09-23T08:26:22.158326+00:00",
  "last_reviewed_at": "2026-09-23T08:26:22.158326+00:00",
  "reviewed_at": "2026-09-23T08:26:22.158326+00:00",
  "refresh_generation": "2026-09-23T08:26:22.158326+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/f9fa75d77b75d77ab414293d.json",
    "checksum": "sha256:1c2c96d2cc478cf1906822835cbbe19fe96d81af5bbcde0f78667812fe4ceb73",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276123&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:22.158326+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.inheritance-gift-tax-act.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276123&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
      "source_record_id": "tax.gift",
      "collected_at": "2026-09-23T08:26:22.158326+00:00",
      "reviewed_at": "2026-09-23T08:26:22.158326+00:00",
      "checksum": "sha256:f7eb4bb5a445a4b3ba707743626e7f0de3331175f2965540ac93c55b0eca1a1b",
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
        "value": "tax.gift"
      }
    }
  ],
  "search_projection": {
    "id": "tax.gift",
    "title": "증여세",
    "type": "tax",
    "description": "상속세·증여세 일반 과세표준에 적용하는 10~50% 누진세율입니다. 재산가액 자체와 공제 후 과세표준을 구분하고 세대생략 할증·세액공제·특례를 별도로 적용합니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276123&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.inheritance-gift-tax-act.rates"
    ],
    "export_id": "tax-ontology",
    "search_text": "증여세 상속세·증여세 일반 과세표준에 적용하는 10~50% 누진세율입니다. 재산가액 자체와 공제 후 과세표준을 구분하고 세대생략 할증·세액공제·특례를 별도로 적용합니다."
  },
  "record_checksum": "sha256:519a4a8893cbcca47e234c6a7d8c4e71609cc65599436a3b75fcfd05e797d50f"
}
---

# 증여세

상속세·증여세 일반 과세표준에 적용하는 10~50% 누진세율입니다. 재산가액 자체와 공제 후 과세표준을 구분하고 세대생략 할증·세액공제·특례를 별도로 적용합니다.

- **1억원 이하**: 1억원 이하; 일반 과세표준 세율, 할증·공제·특례 적용 전
- **1억원 초과 5억원 이하**: 1억원 초과 5억원 이하; 일반 과세표준 세율, 할증·공제·특례 적용 전
- **5억원 초과 10억원 이하**: 5억원 초과 10억원 이하; 일반 과세표준 세율, 할증·공제·특례 적용 전
- **10억원 초과 30억원 이하**: 10억원 초과 30억원 이하; 일반 과세표준 세율, 할증·공제·특례 적용 전
- **30억원 초과**: 30억원 초과; 일반 과세표준 세율, 할증·공제·특례 적용 전
