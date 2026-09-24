---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/CorporateTaxSupports",
  "basis_year": 2026,
  "id": "corporate.support.wage-increase-credit",
  "title": "근로소득을 증대시킨 기업에 대한 세액공제",
  "type": "corporate-tax-support",
  "description": "임금 증가와 정규직 전환 근로자 임금 증가 등에 대한 세액공제입니다.",
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
      "label": "일반 요건·율",
      "condition": "2028년 12월 31일이 속하는 과세연도까지 상시근로자 수가 전년 이상이고 평균임금 증가율이 직전 3년 평균 증가율보다 높은 중소·중견기업이 대상입니다. 법정 초과 임금증가분의 중소기업 20%, 중견기업 10%를 공제합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "초과분 계산",
      "condition": "해당 연도 평균임금에서 전년도 평균임금 × (1 + 직전 3년 평균임금 증가율의 평균)을 뺀 금액에 전년도 상시근로자 수를 곱합니다. 전체 임금지급액에 공제율을 곱하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "전환·대체방식",
      "condition": "법정 정규직 전환 근로자의 임금증가분도 요건 충족 시 중소 20%·중견 10%를 공제하며 이후 근로관계 종료에 추징 규정이 있습니다. 중소기업은 법정 전체 중소기업 임금증가율 기준을 충족하면 제5항 대체방식을 선택할 수 있습니다.",
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
    "path": "opentax/disclosures/720243d6c59d3bd5c56d1d3d.json",
    "checksum": "sha256:a15b40295346b2937e38f4a129b76b18a03433fa725ffd1dbf50b48bb180e062",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "corporate.support.wage-increase-credit",
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
        "value": "corporate.support.wage-increase-credit"
      }
    }
  ],
  "search_projection": {
    "id": "corporate.support.wage-increase-credit",
    "title": "근로소득을 증대시킨 기업에 대한 세액공제",
    "type": "corporate-tax-support",
    "description": "임금 증가와 정규직 전환 근로자 임금 증가 등에 대한 세액공제입니다.",
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
    "search_text": "근로소득을 증대시킨 기업에 대한 세액공제 임금 증가와 정규직 전환 근로자 임금 증가 등에 대한 세액공제입니다."
  },
  "record_checksum": "sha256:1079041dc2eba7d6bd51dba85a24fb04787ad871060f4ab5d40b70d98057ea06"
}
---

# 근로소득을 증대시킨 기업에 대한 세액공제

임금 증가와 정규직 전환 근로자 임금 증가 등에 대한 세액공제입니다.

- **일반 요건·율**: 2028년 12월 31일이 속하는 과세연도까지 상시근로자 수가 전년 이상이고 평균임금 증가율이 직전 3년 평균 증가율보다 높은 중소·중견기업이 대상입니다. 법정 초과 임금증가분의 중소기업 20%, 중견기업 10%를 공제합니다.
- **초과분 계산**: 해당 연도 평균임금에서 전년도 평균임금 × (1 + 직전 3년 평균임금 증가율의 평균)을 뺀 금액에 전년도 상시근로자 수를 곱합니다. 전체 임금지급액에 공제율을 곱하지 않습니다.
- **전환·대체방식**: 법정 정규직 전환 근로자의 임금증가분도 요건 충족 시 중소 20%·중견 10%를 공제하며 이후 근로관계 종료에 추징 규정이 있습니다. 중소기업은 법정 전체 중소기업 임금증가율 기준을 충족하면 제5항 대체방식을 선택할 수 있습니다.
