---
{
  "deadlines": [],
  "folder": "10_Taxes/National",
  "basis_year": 2026,
  "id": "tax.stamp",
  "title": "인지세",
  "type": "tax",
  "description": "과세문서 작성에 대해 부과되는 국세입니다.",
  "parents": [
    "category.national-taxes"
  ],
  "children": [],
  "related": [],
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
      "label": "금액별 세액",
      "condition": "부동산·선박·항공기 소유권이전 증서 등 제3조 제1항 제1호 기준 문서는 기재금액 1천만원 초과 3천만원 이하 2만원, 3천만원 초과 5천만원 이하 4만원, 5천만원 초과 1억원 이하 7만원, 1억원 초과 10억원 이하 15만원, 10억원 초과 35만원입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.stamp-tax-act.article3",
      "criteria_kind": "disclosure"
    },
    {
      "label": "문서별 구분",
      "condition": "금융기관 금전소비대차 등 법정 문서는 위 구간 세액을 준용하지만, 모든 문서가 동일한 금액구간을 사용하지 않습니다. 상품권·모바일상품권·증권·통장·보증증서 등은 문서별 정액세액과 비과세 요건을 별도로 확인합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.stamp-tax-act.article3",
      "criteria_kind": "disclosure"
    },
    {
      "label": "과세 단위",
      "condition": "통장은 1권마다, 그 외 문서는 1통마다 적용하며 법정 전자문서도 포함합니다. 문서 이름보다 실질 내용에 따라 구분합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.stamp-tax-act.article3",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.stamp-tax-act.article3"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=276139&joNo=0003&joBrNo=00&docCls=jo&urlMode=lsScJoRltInfoR"
  ],
  "collected_at": "2026-09-23T08:30:52.938550+00:00",
  "source_collected_at": "2026-09-23T08:30:52.938550+00:00",
  "last_source_checked_at": "2026-09-23T08:30:52.938550+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-23T08:30:52.938550+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/87f3fccdbe4b2c626c201ac5.json",
    "checksum": "sha256:90163756700d51fcf3a451d7ee6fe87b44a5ca36e6af3090a0218d7597d1b58b",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=276139&joNo=0003&joBrNo=00&docCls=jo&urlMode=lsScJoRltInfoR",
    "collected_at": "2026-09-23T08:30:52.938550+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.stamp-tax-act.article3",
      "original_url": "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=276139&joNo=0003&joBrNo=00&docCls=jo&urlMode=lsScJoRltInfoR",
      "source_record_id": "tax.stamp",
      "collected_at": "2026-09-23T08:30:52.938550+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
      "checksum": "sha256:0e016b4e1d7371733d4076cdc04a7c0e530c1950c319fde9a20ef6a5a0a05ed1",
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
        "value": "tax.stamp"
      }
    }
  ],
  "search_projection": {
    "id": "tax.stamp",
    "title": "인지세",
    "type": "tax",
    "description": "과세문서 작성에 대해 부과되는 국세입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=276139&joNo=0003&joBrNo=00&docCls=jo&urlMode=lsScJoRltInfoR"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.stamp-tax-act.article3"
    ],
    "export_id": "tax-ontology",
    "search_text": "인지세 과세문서 작성에 대해 부과되는 국세입니다."
  },
  "record_checksum": "sha256:ac1677f596a9f093d8da2fa97c5e3813521931c9e701dec5f88b48063126eebc"
}
---

# 인지세

과세문서 작성에 대해 부과되는 국세입니다.

- **금액별 세액**: 부동산·선박·항공기 소유권이전 증서 등 제3조 제1항 제1호 기준 문서는 기재금액 1천만원 초과 3천만원 이하 2만원, 3천만원 초과 5천만원 이하 4만원, 5천만원 초과 1억원 이하 7만원, 1억원 초과 10억원 이하 15만원, 10억원 초과 35만원입니다.
- **문서별 구분**: 금융기관 금전소비대차 등 법정 문서는 위 구간 세액을 준용하지만, 모든 문서가 동일한 금액구간을 사용하지 않습니다. 상품권·모바일상품권·증권·통장·보증증서 등은 문서별 정액세액과 비과세 요건을 별도로 확인합니다.
- **과세 단위**: 통장은 1권마다, 그 외 문서는 1통마다 적용하며 법정 전자문서도 포함합니다. 문서 이름보다 실질 내용에 따라 구분합니다.
