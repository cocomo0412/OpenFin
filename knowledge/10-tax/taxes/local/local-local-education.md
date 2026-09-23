---
{
  "deadlines": [],
  "folder": "10_Taxes/Local",
  "basis_year": 2026,
  "id": "local.local-education",
  "title": "지방교육세",
  "type": "tax",
  "description": "본세 종류별로 지방교육세 과세표준과 세율이 다릅니다. 취득세는 법정 조정 산식, 등록분 등록면허세는 20%, 레저세는 40%, 담배소비세는 43.99% 등 해당 조문을 적용합니다.",
  "parents": [
    "category.local-purpose-taxes"
  ],
  "children": [],
  "related": [
    "tax.education"
  ],
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
      "label": "계산 원칙",
      "condition": "본세 종류별로 지방교육세 과세표준과 세율이 다릅니다. 취득세는 법정 조정 산식, 등록분 등록면허세는 20%, 레저세는 40%, 담배소비세는 43.99% 등 해당 조문을 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제151조"
    },
    {
      "label": "그 밖의 본세",
      "condition": "재산세는 도시지역분 등을 제외한 법정 세액의 20%, 자동차세는 법정 세액의 30%입니다. 주민세 개인분·사업소 기본세액은 원칙 10%이며 인구 50만 이상 시 등에는 별도 규정이 있습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제151조"
    },
    {
      "label": "조례·유효기간",
      "condition": "조례에 따른 조정과 감면 규정을 함께 확인해야 합니다. 담배소비세 관련 43.99% 규정의 현행 유효기간은 2026년 12월 31일까지입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제151조"
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
    "path": "opentax/disclosures/ec79e7e0e53b19494e7f3a81.json",
    "checksum": "sha256:118206d0214f954dff35bc91628a5b312a65641fab8422478a588c26da97ccd2",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:22.571307+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.local-tax-act.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "local.local-education",
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
        "value": "local.local-education"
      }
    }
  ],
  "search_projection": {
    "id": "local.local-education",
    "title": "지방교육세",
    "type": "tax",
    "description": "본세 종류별로 지방교육세 과세표준과 세율이 다릅니다. 취득세는 법정 조정 산식, 등록분 등록면허세는 20%, 레저세는 40%, 담배소비세는 43.99% 등 해당 조문을 적용합니다.",
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
    "search_text": "지방교육세 본세 종류별로 지방교육세 과세표준과 세율이 다릅니다. 취득세는 법정 조정 산식, 등록분 등록면허세는 20%, 레저세는 40%, 담배소비세는 43.99% 등 해당 조문을 적용합니다."
  },
  "record_checksum": "sha256:bf60c71d30cc22ff330a317d764ac0707e32a1369d463b1006b3e2b733c894cd"
}
---

# 지방교육세

본세 종류별로 지방교육세 과세표준과 세율이 다릅니다. 취득세는 법정 조정 산식, 등록분 등록면허세는 20%, 레저세는 40%, 담배소비세는 43.99% 등 해당 조문을 적용합니다.

- **계산 원칙**: 본세 종류별로 지방교육세 과세표준과 세율이 다릅니다. 취득세는 법정 조정 산식, 등록분 등록면허세는 20%, 레저세는 40%, 담배소비세는 43.99% 등 해당 조문을 적용합니다.
- **그 밖의 본세**: 재산세는 도시지역분 등을 제외한 법정 세액의 20%, 자동차세는 법정 세액의 30%입니다. 주민세 개인분·사업소 기본세액은 원칙 10%이며 인구 50만 이상 시 등에는 별도 규정이 있습니다.
- **조례·유효기간**: 조례에 따른 조정과 감면 규정을 함께 확인해야 합니다. 담배소비세 관련 43.99% 규정의 현행 유효기간은 2026년 12월 31일까지입니다.
