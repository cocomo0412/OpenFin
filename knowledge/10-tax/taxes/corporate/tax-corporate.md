---
{
  "id": "tax.corporate",
  "title": "법인세",
  "type": "tax",
  "description": "2026년 이후 개시 사업연도의 각 사업연도 소득에 적용되는 법인세입니다. 일반법인·소규모법인·조합법인의 세율을 구분하며 토지 등 양도소득의 추가세액은 별도입니다.",
  "parents": [
    "category.national-taxes"
  ],
  "children": [],
  "related": [
    "category.corporate-tax-supports",
    "local.local-income",
    "scenario.corporate-tax-manager"
  ],
  "terms": [
    "term.national-tax",
    "term.tax-law",
    "term.tax-base",
    "term.tax-rate",
    "term.progressive-deduction"
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
      "label": "일반법인 · 2억원 이하",
      "basis": "각 사업연도 소득 과세표준",
      "condition": "영리·비영리법인의 각 사업연도 소득 일반세율(소규모법인·조합법인 특례 제외); 2억원 이하",
      "threshold_krw_max": 200000000,
      "rate_percent": 10,
      "progressive_deduction_krw": 0,
      "note": "2026.1.1. 이후 개시 사업연도 기준",
      "source": "source.nts.corporate-tax.rates",
      "criteria_kind": "rate",
      "rate_basis": "각 사업연도 소득 과세표준",
      "basis_category": "tax-base",
      "basis_definition": "법인의 각 사업연도 소득금액에서 세법상 조정과 공제를 반영한 법인세 세율 적용 기준입니다.",
      "basis_lookup": "법인세 신고서와 세무조정계산서의 각 사업연도 소득 과세표준에서 확인합니다.",
      "selection_rule": "과세표준이 2억원, 200억원, 3,000억원 경계 중 어디에 속하는지에 따라 세율과 누진공제액을 선택합니다.",
      "basis_source": "source.nts.corporate-tax.rates",
      "law_reference": "법인세법 제55조",
      "tax_year": 2026
    },
    {
      "label": "일반법인 · 2억원 초과 200억원 이하",
      "basis": "각 사업연도 소득 과세표준",
      "condition": "영리·비영리법인의 각 사업연도 소득 일반세율(소규모법인·조합법인 특례 제외); 2억원 초과 200억원 이하",
      "threshold_krw_min": 200000000,
      "threshold_krw_max": 20000000000,
      "rate_percent": 20,
      "progressive_deduction_krw": 20000000,
      "note": "2026.1.1. 이후 개시 사업연도 기준",
      "source": "source.nts.corporate-tax.rates",
      "criteria_kind": "rate",
      "rate_basis": "각 사업연도 소득 과세표준",
      "basis_category": "tax-base",
      "basis_definition": "법인의 각 사업연도 소득금액에서 세법상 조정과 공제를 반영한 법인세 세율 적용 기준입니다.",
      "basis_lookup": "법인세 신고서와 세무조정계산서의 각 사업연도 소득 과세표준에서 확인합니다.",
      "selection_rule": "과세표준이 2억원, 200억원, 3,000억원 경계 중 어디에 속하는지에 따라 세율과 누진공제액을 선택합니다.",
      "basis_source": "source.nts.corporate-tax.rates",
      "law_reference": "법인세법 제55조",
      "tax_year": 2026
    },
    {
      "label": "일반법인 · 200억원 초과 3,000억원 이하",
      "basis": "각 사업연도 소득 과세표준",
      "condition": "영리·비영리법인의 각 사업연도 소득 일반세율(소규모법인·조합법인 특례 제외); 200억원 초과 3,000억원 이하",
      "threshold_krw_min": 20000000000,
      "threshold_krw_max": 300000000000,
      "rate_percent": 22,
      "progressive_deduction_krw": 420000000,
      "note": "2026.1.1. 이후 개시 사업연도 기준",
      "source": "source.nts.corporate-tax.rates",
      "criteria_kind": "rate",
      "rate_basis": "각 사업연도 소득 과세표준",
      "basis_category": "tax-base",
      "basis_definition": "법인의 각 사업연도 소득금액에서 세법상 조정과 공제를 반영한 법인세 세율 적용 기준입니다.",
      "basis_lookup": "법인세 신고서와 세무조정계산서의 각 사업연도 소득 과세표준에서 확인합니다.",
      "selection_rule": "과세표준이 2억원, 200억원, 3,000억원 경계 중 어디에 속하는지에 따라 세율과 누진공제액을 선택합니다.",
      "basis_source": "source.nts.corporate-tax.rates",
      "law_reference": "법인세법 제55조",
      "tax_year": 2026
    },
    {
      "label": "일반법인 · 3,000억원 초과",
      "basis": "각 사업연도 소득 과세표준",
      "condition": "영리·비영리법인의 각 사업연도 소득 일반세율(소규모법인·조합법인 특례 제외); 3,000억원 초과",
      "threshold_krw_min": 300000000000,
      "rate_percent": 25,
      "progressive_deduction_krw": 9420000000,
      "note": "2026.1.1. 이후 개시 사업연도 기준",
      "source": "source.nts.corporate-tax.rates",
      "criteria_kind": "rate",
      "rate_basis": "각 사업연도 소득 과세표준",
      "basis_category": "tax-base",
      "basis_definition": "법인의 각 사업연도 소득금액에서 세법상 조정과 공제를 반영한 법인세 세율 적용 기준입니다.",
      "basis_lookup": "법인세 신고서와 세무조정계산서의 각 사업연도 소득 과세표준에서 확인합니다.",
      "selection_rule": "과세표준이 2억원, 200억원, 3,000억원 경계 중 어디에 속하는지에 따라 세율과 누진공제액을 선택합니다.",
      "basis_source": "source.nts.corporate-tax.rates",
      "law_reference": "법인세법 제55조",
      "tax_year": 2026
    },
    {
      "label": "소규모법인 · 200억원 이하",
      "condition": "해당 법인유형의 법정 요건을 충족하는 경우; 200억원 이하",
      "basis": "공식 공시 원문",
      "source": "source.nts.corporate-tax.rates",
      "criteria_kind": "rate",
      "rate_percent": 20,
      "progressive_deduction_krw": 0,
      "threshold_krw_min": 0,
      "threshold_krw_max": 20000000000,
      "tax_year": 2026
    },
    {
      "label": "소규모법인 · 200억원 초과 3,000억원 이하",
      "condition": "해당 법인유형의 법정 요건을 충족하는 경우; 200억원 초과 3,000억원 이하",
      "basis": "공식 공시 원문",
      "source": "source.nts.corporate-tax.rates",
      "criteria_kind": "rate",
      "rate_percent": 22,
      "progressive_deduction_krw": 400000000,
      "threshold_krw_min": 20000000000,
      "threshold_krw_max": 300000000000,
      "tax_year": 2026
    },
    {
      "label": "소규모법인 · 3,000억원 초과",
      "condition": "해당 법인유형의 법정 요건을 충족하는 경우; 3,000억원 초과",
      "basis": "공식 공시 원문",
      "source": "source.nts.corporate-tax.rates",
      "criteria_kind": "rate",
      "rate_percent": 25,
      "progressive_deduction_krw": 9400000000,
      "threshold_krw_min": 300000000000,
      "tax_year": 2026
    },
    {
      "label": "조합법인(조특법 제72조 적용) · 20억원 이하",
      "condition": "해당 법인유형의 법정 요건을 충족하는 경우; 20억원 이하",
      "basis": "공식 공시 원문",
      "source": "source.nts.corporate-tax.rates",
      "criteria_kind": "rate",
      "rate_percent": 9,
      "progressive_deduction_krw": 0,
      "threshold_krw_min": 0,
      "threshold_krw_max": 2000000000,
      "tax_year": 2026
    },
    {
      "label": "조합법인(조특법 제72조 적용) · 20억원 초과",
      "condition": "해당 법인유형의 법정 요건을 충족하는 경우; 20억원 초과",
      "basis": "공식 공시 원문",
      "source": "source.nts.corporate-tax.rates",
      "criteria_kind": "rate",
      "rate_percent": 15,
      "progressive_deduction_krw": 120000000,
      "threshold_krw_min": 2000000000,
      "tax_year": 2026
    }
  ],
  "sources": [
    "source.nts.corporate-tax.rates"
  ],
  "source_urls": [
    "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7746"
  ],
  "collected_at": "2026-09-23T08:26:12.390383+00:00",
  "source_collected_at": "2026-09-23T08:26:12.390383+00:00",
  "last_source_checked_at": "2026-09-23T08:26:12.390383+00:00",
  "last_reviewed_at": "2026-09-23T08:26:12.390383+00:00",
  "reviewed_at": "2026-09-23T08:26:12.390383+00:00",
  "refresh_generation": "2026-09-23T08:26:12.390383+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/516c333191cecf660d0b8024.json",
    "checksum": "sha256:ac5af44b411db26e5d54c99fb30603cb43176e4c56c9b4cbe2427a72216e900d",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7746",
    "collected_at": "2026-09-23T08:26:12.390383+00:00"
  },
  "provenance": [
    {
      "source_id": "source.nts.corporate-tax.rates",
      "original_url": "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7746",
      "source_record_id": "tax.corporate",
      "collected_at": "2026-09-23T08:26:12.390383+00:00",
      "reviewed_at": "2026-09-23T08:26:12.390383+00:00",
      "checksum": "sha256:6640838f60e5ac9049f0e92c2f79018da526c364c610dc02a30561c3416cc05a",
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
        "value": "tax.corporate"
      }
    }
  ],
  "search_projection": {
    "id": "tax.corporate",
    "title": "법인세",
    "type": "tax",
    "description": "2026년 이후 개시 사업연도의 각 사업연도 소득에 적용되는 법인세입니다. 일반법인·소규모법인·조합법인의 세율을 구분하며 토지 등 양도소득의 추가세액은 별도입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7746"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.nts.corporate-tax.rates"
    ],
    "export_id": "tax-ontology",
    "search_text": "법인세 2026년 이후 개시 사업연도의 각 사업연도 소득에 적용되는 법인세입니다. 일반법인·소규모법인·조합법인의 세율을 구분하며 토지 등 양도소득의 추가세액은 별도입니다."
  },
  "record_checksum": "sha256:8961b461bb8dec32b09d9d01689c48ac4524525a8a53a9100d64300e46404f8b"
}
---

# 법인세

2026년 이후 개시 사업연도의 각 사업연도 소득에 적용되는 법인세입니다. 일반법인·소규모법인·조합법인의 세율을 구분하며 토지 등 양도소득의 추가세액은 별도입니다.

- **일반법인 · 2억원 이하**: 영리·비영리법인의 각 사업연도 소득 일반세율(소규모법인·조합법인 특례 제외); 2억원 이하
- **일반법인 · 2억원 초과 200억원 이하**: 영리·비영리법인의 각 사업연도 소득 일반세율(소규모법인·조합법인 특례 제외); 2억원 초과 200억원 이하
- **일반법인 · 200억원 초과 3,000억원 이하**: 영리·비영리법인의 각 사업연도 소득 일반세율(소규모법인·조합법인 특례 제외); 200억원 초과 3,000억원 이하
- **일반법인 · 3,000억원 초과**: 영리·비영리법인의 각 사업연도 소득 일반세율(소규모법인·조합법인 특례 제외); 3,000억원 초과
- **소규모법인 · 200억원 이하**: 해당 법인유형의 법정 요건을 충족하는 경우; 200억원 이하
- **소규모법인 · 200억원 초과 3,000억원 이하**: 해당 법인유형의 법정 요건을 충족하는 경우; 200억원 초과 3,000억원 이하
- **소규모법인 · 3,000억원 초과**: 해당 법인유형의 법정 요건을 충족하는 경우; 3,000억원 초과
- **조합법인(조특법 제72조 적용) · 20억원 이하**: 해당 법인유형의 법정 요건을 충족하는 경우; 20억원 이하
- **조합법인(조특법 제72조 적용) · 20억원 초과**: 해당 법인유형의 법정 요건을 충족하는 경우; 20억원 초과
