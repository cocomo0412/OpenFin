---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/CorporateTaxSupports",
  "basis_year": 2026,
  "id": "corporate.support.foreign-tax-paid-credit",
  "title": "외국납부세액공제",
  "type": "corporate-tax-support",
  "description": "국외원천소득에 대한 이중과세 조정을 위한 법인세법상 세액공제입니다.",
  "parents": [
    "category.corporate-tax-supports"
  ],
  "children": [],
  "related": [
    "credit.foreign-tax-paid"
  ],
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
      "label": "공제 대상",
      "condition": "내국법인의 과세표준에 포함된 국외원천소득에 대하여 납부했거나 납부할 법정 외국법인세액이 대상입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.corporate-tax-act.credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "공제 한도",
      "condition": "법정 조정 후 산출세액 × 조정 후 국외원천소득 ÷ 해당 사업연도 과세표준이 한도입니다. 토지등 양도소득 법인세 등 법정 제외세액과 감면·면제 대상 국외소득 조정을 반영해야 합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.corporate-tax-act.credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "이월·제외",
      "condition": "한도 초과액은 다음 사업연도 개시일부터 10년 이내에 끝나는 사업연도로 이월할 수 있습니다. 이월기간 내 미공제액은 종료 다음 날이 속하는 사업연도에 손금산입할 수 있습니다. 제18조의4에 따른 수입배당금 익금불산입 대상에는 이 공제를 적용하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.corporate-tax-act.credits",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.corporate-tax-act.credits"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280349&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
  ],
  "collected_at": "2026-09-23T08:26:20.451325+00:00",
  "source_collected_at": "2026-09-23T08:26:20.451325+00:00",
  "last_source_checked_at": "2026-09-23T08:26:20.451325+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-23T08:26:20.451325+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/fdc79bbb27e6ded6f4911c5b.json",
    "checksum": "sha256:9519cf0365f8f303000b9533453013ce5bf59b3f2dccf528fe64b83068ed4318",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280349&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.451325+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.corporate-tax-act.credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280349&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "corporate.support.foreign-tax-paid-credit",
      "collected_at": "2026-09-23T08:26:20.451325+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
      "checksum": "sha256:48963f0d0fc1a5851adf2e6bd6e56d5d90ec187436ae76bee379f4a5b7230125",
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
        "value": "corporate.support.foreign-tax-paid-credit"
      }
    }
  ],
  "search_projection": {
    "id": "corporate.support.foreign-tax-paid-credit",
    "title": "외국납부세액공제",
    "type": "corporate-tax-support",
    "description": "국외원천소득에 대한 이중과세 조정을 위한 법인세법상 세액공제입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280349&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.corporate-tax-act.credits"
    ],
    "export_id": "tax-ontology",
    "search_text": "외국납부세액공제 국외원천소득에 대한 이중과세 조정을 위한 법인세법상 세액공제입니다."
  },
  "record_checksum": "sha256:0829840eb0abf30fd161acc1006ead15a7be3e22ffa7e18f6d2b034e5e603503"
}
---

# 외국납부세액공제

국외원천소득에 대한 이중과세 조정을 위한 법인세법상 세액공제입니다.

- **공제 대상**: 내국법인의 과세표준에 포함된 국외원천소득에 대하여 납부했거나 납부할 법정 외국법인세액이 대상입니다.
- **공제 한도**: 법정 조정 후 산출세액 × 조정 후 국외원천소득 ÷ 해당 사업연도 과세표준이 한도입니다. 토지등 양도소득 법인세 등 법정 제외세액과 감면·면제 대상 국외소득 조정을 반영해야 합니다.
- **이월·제외**: 한도 초과액은 다음 사업연도 개시일부터 10년 이내에 끝나는 사업연도로 이월할 수 있습니다. 이월기간 내 미공제액은 종료 다음 날이 속하는 사업연도에 손금산입할 수 있습니다. 제18조의4에 따른 수입배당금 익금불산입 대상에는 이 공제를 적용하지 않습니다.
