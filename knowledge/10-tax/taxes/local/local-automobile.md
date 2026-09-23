---
{
  "deadlines": [
    "deadline.local.automobile"
  ],
  "folder": "10_Taxes/Local",
  "basis_year": 2026,
  "id": "local.automobile",
  "title": "자동차세",
  "type": "tax",
  "description": "등록·신고된 자동차의 소유자에게 부과하며 차종·용도·배기량·적재량 등에 따라 연세액을 계산합니다. 자동차 주행분과는 별도입니다.",
  "parents": [
    "category.local-ordinary-taxes"
  ],
  "children": [],
  "related": [],
  "terms": [
    "term.local-tax"
  ],
  "tags": [
    "local-tax"
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
      "label": "소유분",
      "condition": "등록·신고된 자동차의 소유자에게 부과하며 차종·용도·배기량·적재량 등에 따라 연세액을 계산합니다. 자동차 주행분과는 별도입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제125조·지방세법 제127조·지방세법 제128조"
    },
    {
      "label": "비영업용 승용차",
      "condition": "배기량 1,000cc 이하는 cc당 80원, 1,000cc 초과 1,600cc 이하는 140원, 1,600cc 초과는 200원의 표준세액을 적용합니다. 구간별 초과분 누진계산이 아니라 해당 단가에 전체 배기량을 곱합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제125조·지방세법 제127조·지방세법 제128조"
    },
    {
      "label": "차령·납기",
      "condition": "법정 비영업용 승용차는 차령 3년부터 매년 5%씩, 차령 12년을 상한으로 감액합니다. 일반 납기는 6월 16~30일과 12월 16~31일이며 연납·분납·수시부과는 별도 규정을 따릅니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제125조·지방세법 제127조·지방세법 제128조"
    }
  ],
  "sources": [
    "source.law.local-tax-act.rates"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
  ],
  "collected_at": "2026-09-23T08:26:22.571307+00:00",
  "source_collected_at": "2026-09-23T08:26:22.571307+00:00",
  "last_source_checked_at": "2026-09-23T08:26:22.571307+00:00",
  "last_reviewed_at": "2026-09-23T08:26:22.571307+00:00",
  "reviewed_at": "2026-09-23T08:26:22.571307+00:00",
  "refresh_generation": "2026-09-23T08:26:22.571307+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/60873736177c84629be8c128.json",
    "checksum": "sha256:54e2020d5d8b19a5ffa25fa255ffe4a74005fdb2548be4751455066dfa1d82b7",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:22.571307+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.local-tax-act.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "local.automobile",
      "collected_at": "2026-09-23T08:26:22.571307+00:00",
      "reviewed_at": "2026-09-23T08:26:22.571307+00:00",
      "checksum": "sha256:9f5ef4724aa36b1f62bd0e36aa912309144e85c3e1bc880c960e66d467418995",
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
        "value": "local.automobile"
      }
    }
  ],
  "search_projection": {
    "id": "local.automobile",
    "title": "자동차세",
    "type": "tax",
    "description": "등록·신고된 자동차의 소유자에게 부과하며 차종·용도·배기량·적재량 등에 따라 연세액을 계산합니다. 자동차 주행분과는 별도입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.local-tax-act.rates"
    ],
    "export_id": "tax-ontology",
    "search_text": "자동차세 등록·신고된 자동차의 소유자에게 부과하며 차종·용도·배기량·적재량 등에 따라 연세액을 계산합니다. 자동차 주행분과는 별도입니다."
  },
  "record_checksum": "sha256:d655672fdc50701978866c02260b8d163e5e3bfac75e4bcce22db7a49579f644"
}
---

# 자동차세

등록·신고된 자동차의 소유자에게 부과하며 차종·용도·배기량·적재량 등에 따라 연세액을 계산합니다. 자동차 주행분과는 별도입니다.

- **소유분**: 등록·신고된 자동차의 소유자에게 부과하며 차종·용도·배기량·적재량 등에 따라 연세액을 계산합니다. 자동차 주행분과는 별도입니다.
- **비영업용 승용차**: 배기량 1,000cc 이하는 cc당 80원, 1,000cc 초과 1,600cc 이하는 140원, 1,600cc 초과는 200원의 표준세액을 적용합니다. 구간별 초과분 누진계산이 아니라 해당 단가에 전체 배기량을 곱합니다.
- **차령·납기**: 법정 비영업용 승용차는 차령 3년부터 매년 5%씩, 차령 12년을 상한으로 감액합니다. 일반 납기는 6월 16~30일과 12월 16~31일이며 연납·분납·수시부과는 별도 규정을 따릅니다.
