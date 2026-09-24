---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/CorporateTaxSupports",
  "basis_year": 2026,
  "id": "corporate.support.employment-maintenance-credit",
  "title": "고용유지 중소기업 등에 대한 과세특례",
  "type": "corporate-tax-support",
  "description": "임금 감소와 시간당 임금 보전액 등을 기준으로 적용되는 세액공제입니다.",
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
      "condition": "2026년 12월 31일이 속하는 과세연도까지 법정 중소기업의 시간당 임금이 감소하지 않고, 근로자 수가 법정 허용비율 이상 감소하지 않으며, 1인당 연간 임금총액은 감소한 경우입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "기업 공제 계산",
      "condition": "전년 대비 1인당 연간 임금 감소액 × 해당 연도 상시근로자 수 × 10%와, 해당 연도 시간당 임금에서 전년 시간당 임금의 105%를 뺀 금액 × 해당 연도 전체 근로시간 × 15%를 합합니다. 두 번째 금액은 음수이면 0입니다. 근로자 소득공제율 50%를 기업 공제율로 사용하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "특례·범위",
      "condition": "위기지역 내 중견기업 사업장에는 지정·선포기간이 속하는 과세연도에도 적용합니다. 상시근로자 및 임금총액의 정의는 시행령에 따릅니다.",
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
    "path": "opentax/disclosures/9f7117af0868a921c2e92ced.json",
    "checksum": "sha256:43a7fdc20fe6694e9f2c05ef271523facf46ab3fdad0b6494b7f8d8388fc6867",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "corporate.support.employment-maintenance-credit",
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
        "value": "corporate.support.employment-maintenance-credit"
      }
    }
  ],
  "search_projection": {
    "id": "corporate.support.employment-maintenance-credit",
    "title": "고용유지 중소기업 등에 대한 과세특례",
    "type": "corporate-tax-support",
    "description": "임금 감소와 시간당 임금 보전액 등을 기준으로 적용되는 세액공제입니다.",
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
    "search_text": "고용유지 중소기업 등에 대한 과세특례 임금 감소와 시간당 임금 보전액 등을 기준으로 적용되는 세액공제입니다."
  },
  "record_checksum": "sha256:2064627eee69cc5d02d36dad7727a83e4fdc3118cc19e5cd9c963290c29d9805"
}
---

# 고용유지 중소기업 등에 대한 과세특례

임금 감소와 시간당 임금 보전액 등을 기준으로 적용되는 세액공제입니다.

- **적용 요건**: 2026년 12월 31일이 속하는 과세연도까지 법정 중소기업의 시간당 임금이 감소하지 않고, 근로자 수가 법정 허용비율 이상 감소하지 않으며, 1인당 연간 임금총액은 감소한 경우입니다.
- **기업 공제 계산**: 전년 대비 1인당 연간 임금 감소액 × 해당 연도 상시근로자 수 × 10%와, 해당 연도 시간당 임금에서 전년 시간당 임금의 105%를 뺀 금액 × 해당 연도 전체 근로시간 × 15%를 합합니다. 두 번째 금액은 음수이면 0입니다. 근로자 소득공제율 50%를 기업 공제율로 사용하지 않습니다.
- **특례·범위**: 위기지역 내 중견기업 사업장에는 지정·선포기간이 속하는 과세연도에도 적용합니다. 상시근로자 및 임금총액의 정의는 시행령에 따릅니다.
