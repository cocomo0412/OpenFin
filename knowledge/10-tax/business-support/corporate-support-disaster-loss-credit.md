---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/CorporateTaxSupports",
  "basis_year": 2026,
  "id": "corporate.support.disaster-loss-credit",
  "title": "재해손실세액공제",
  "type": "corporate-tax-support",
  "description": "천재지변 등 재해로 사업용 총자산가액의 20% 이상을 상실한 경우 적용되는 법인세법상 세액공제입니다.",
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
      "label": "적용 요건",
      "condition": "내국법인이 재해로 법정 자산총액의 20% 이상을 상실하여 납세가 곤란하다고 인정되는 경우입니다. 자산가액에 토지가액은 포함하지 않습니다. 20%는 적용 문턱이며 공제율이 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.corporate-tax-act.credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "공제 계산",
      "condition": "재해 발생일 현재 미부과·미납 법인세 및 재해 발생 사업연도 법인세에 자산상실비율을 곱하여 공제하며, 상실된 자산가액을 한도로 합니다. 자산상실비율은 상실자산가액을 상실 전 자산총액으로 나눈 값입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.corporate-tax-act.credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "신청",
      "condition": "관할 세무서장에게 법정 절차에 따라 신청해야 하며 자산총액 범위와 비율 계산은 시행령을 함께 적용합니다.",
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
    "path": "opentax/disclosures/114aafb605ab58890ebd0f5a.json",
    "checksum": "sha256:da334a377ddd2d6d73016b6731cc57f759d21be09f8e97cda304002493492d06",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280349&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.451325+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.corporate-tax-act.credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280349&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "corporate.support.disaster-loss-credit",
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
        "value": "corporate.support.disaster-loss-credit"
      }
    }
  ],
  "search_projection": {
    "id": "corporate.support.disaster-loss-credit",
    "title": "재해손실세액공제",
    "type": "corporate-tax-support",
    "description": "천재지변 등 재해로 사업용 총자산가액의 20% 이상을 상실한 경우 적용되는 법인세법상 세액공제입니다.",
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
    "search_text": "재해손실세액공제 천재지변 등 재해로 사업용 총자산가액의 20% 이상을 상실한 경우 적용되는 법인세법상 세액공제입니다."
  },
  "record_checksum": "sha256:acaf8b1a1da6f0630384a15736c0e4da831701af42c94381a415ce6f8bf5c4be"
}
---

# 재해손실세액공제

천재지변 등 재해로 사업용 총자산가액의 20% 이상을 상실한 경우 적용되는 법인세법상 세액공제입니다.

- **적용 요건**: 내국법인이 재해로 법정 자산총액의 20% 이상을 상실하여 납세가 곤란하다고 인정되는 경우입니다. 자산가액에 토지가액은 포함하지 않습니다. 20%는 적용 문턱이며 공제율이 아닙니다.
- **공제 계산**: 재해 발생일 현재 미부과·미납 법인세 및 재해 발생 사업연도 법인세에 자산상실비율을 곱하여 공제하며, 상실된 자산가액을 한도로 합니다. 자산상실비율은 상실자산가액을 상실 전 자산총액으로 나눈 값입니다.
- **신청**: 관할 세무서장에게 법정 절차에 따라 신청해야 하며 자산총액 범위와 비율 계산은 시행령을 함께 적용합니다.
