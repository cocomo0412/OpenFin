---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/CorporateTaxSupports",
  "basis_year": 2026,
  "id": "corporate.support.e-filing-credit",
  "title": "전자신고 세액공제",
  "type": "corporate-tax-support",
  "description": "법인이 직접 법인세를 전자신고할 때 적용되는 세액공제입니다.",
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
      "label": "법인세 전자신고",
      "condition": "조세특례제한법 시행령 제104조의5 제1항·제2항에 따른 법인세법 제60조 과세표준 전자신고의 공제금액은 1만원입니다. 법인세 신고와 양도소득세 신고의 공제금액을 혼동하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-decree.e-filing",
      "criteria_kind": "disclosure"
    },
    {
      "label": "신청",
      "condition": "공제를 받으려면 전자신고 시 법정 세액공제신청서를 관할 세무서장에게 제출합니다. 세무대리인의 공제와 납세자 본인의 공제는 구분하며, 실제 적용은 모법 제104조의8의 요건에 따릅니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-decree.e-filing",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.tax-special-treatment-decree.e-filing"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=288915&joNo=0104&joBrNo=05&docCls=jo&urlMode=lsScJoRltInfoR"
  ],
  "collected_at": "2026-09-24T08:14:54.192130+00:00",
  "source_collected_at": "2026-09-24T08:14:54.192130+00:00",
  "last_source_checked_at": "2026-09-24T08:14:54.192130+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-24T08:14:54.192130+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/6d7a97a36540aea1ed1c07f5.json",
    "checksum": "sha256:c0650580fe2b1c05169e175e97da137852473f8491ede065223563359a15e601",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=288915&joNo=0104&joBrNo=05&docCls=jo&urlMode=lsScJoRltInfoR",
    "collected_at": "2026-09-24T08:14:54.192130+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-decree.e-filing",
      "original_url": "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=288915&joNo=0104&joBrNo=05&docCls=jo&urlMode=lsScJoRltInfoR",
      "source_record_id": "corporate.support.e-filing-credit",
      "collected_at": "2026-09-24T08:14:54.192130+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
      "checksum": "sha256:8ff35dd3a82dd7d8e8bff480e5875b931606b8e5046f3771f40b51ade447b5b8",
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
        "value": "corporate.support.e-filing-credit"
      }
    }
  ],
  "search_projection": {
    "id": "corporate.support.e-filing-credit",
    "title": "전자신고 세액공제",
    "type": "corporate-tax-support",
    "description": "법인이 직접 법인세를 전자신고할 때 적용되는 세액공제입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=288915&joNo=0104&joBrNo=05&docCls=jo&urlMode=lsScJoRltInfoR"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.tax-special-treatment-decree.e-filing"
    ],
    "export_id": "tax-ontology",
    "search_text": "전자신고 세액공제 법인이 직접 법인세를 전자신고할 때 적용되는 세액공제입니다."
  },
  "record_checksum": "sha256:b9a7231728b774d8b28fc2848e625d4de5b306758ea5c867f6c34e79dd38a841"
}
---

# 전자신고 세액공제

법인이 직접 법인세를 전자신고할 때 적용되는 세액공제입니다.

- **법인세 전자신고**: 조세특례제한법 시행령 제104조의5 제1항·제2항에 따른 법인세법 제60조 과세표준 전자신고의 공제금액은 1만원입니다. 법인세 신고와 양도소득세 신고의 공제금액을 혼동하지 않습니다.
- **신청**: 공제를 받으려면 전자신고 시 법정 세액공제신청서를 관할 세무서장에게 제출합니다. 세무대리인의 공제와 납세자 본인의 공제는 구분하며, 실제 적용은 모법 제104조의8의 요건에 따릅니다.
