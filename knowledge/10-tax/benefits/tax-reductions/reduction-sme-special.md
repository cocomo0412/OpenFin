---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/TaxReductions",
  "basis_year": 2026,
  "id": "reduction.sme-special",
  "title": "중소기업특별세액감면",
  "type": "tax-reduction",
  "description": "제조업 등 일정 업종 중소기업 소득에 대한 세액감면입니다.",
  "parents": [
    "category.tax-reductions"
  ],
  "children": [],
  "related": [
    "corporate.support.sme-special-reduction"
  ],
  "terms": [
    "term.tax-reduction"
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
      "label": "대상·기한",
      "condition": "법정 감면업종을 경영하는 중소기업의 2028년 12월 31일 이전에 끝나는 과세연도까지 해당 사업장 소득에 대한 소득세·법인세를 감면합니다. 법인 본점이 수도권이면 모든 사업장을 수도권으로 보며, 모든 중소기업 업종이 대상인 것은 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "소기업 감면율",
      "condition": "도소매·의료업은 10%, 그 외 법정 업종은 수도권 20%·수도권 밖 30%입니다. 통관 대리 및 관련 서비스업은 해당 20%·30% 비율의 절반을 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "중기업 감면율",
      "condition": "수도권 밖 도소매·의료업 5%, 수도권 법정 출판업 10%, 수도권 밖 그 외 법정 업종 15%입니다. 통관 대리 및 관련 서비스업의 해당 15% 비율에는 절반을 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "한도·특례",
      "condition": "한도는 원칙 1억원이며 상시근로자 감소 시 감소 인원당 500만원을 차감해 최저 0원으로 합니다. 10년 이상 계속영업·종합소득 1억원 이하·법정 성실사업자 요건을 모두 충족하면 해당 감면율의 110%를 적용합니다. 과거 2023년까지 알뜰주유소 특례와 구분합니다.",
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
    "path": "opentax/disclosures/af8a5ba77b3e1be591100f47.json",
    "checksum": "sha256:962374df39c64281e46eb46eb3c0bed596c30799da56ade818c9e8fb94738da4",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "reduction.sme-special",
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
        "value": "reduction.sme-special"
      }
    }
  ],
  "search_projection": {
    "id": "reduction.sme-special",
    "title": "중소기업특별세액감면",
    "type": "tax-reduction",
    "description": "제조업 등 일정 업종 중소기업 소득에 대한 세액감면입니다.",
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
    "search_text": "중소기업특별세액감면 제조업 등 일정 업종 중소기업 소득에 대한 세액감면입니다."
  },
  "record_checksum": "sha256:ce176ca05f55d09f09959ef67e0dd1f8d9e78b21cad6c728a3a1ddad879bf14b"
}
---

# 중소기업특별세액감면

제조업 등 일정 업종 중소기업 소득에 대한 세액감면입니다.

- **대상·기한**: 법정 감면업종을 경영하는 중소기업의 2028년 12월 31일 이전에 끝나는 과세연도까지 해당 사업장 소득에 대한 소득세·법인세를 감면합니다. 법인 본점이 수도권이면 모든 사업장을 수도권으로 보며, 모든 중소기업 업종이 대상인 것은 아닙니다.
- **소기업 감면율**: 도소매·의료업은 10%, 그 외 법정 업종은 수도권 20%·수도권 밖 30%입니다. 통관 대리 및 관련 서비스업은 해당 20%·30% 비율의 절반을 적용합니다.
- **중기업 감면율**: 수도권 밖 도소매·의료업 5%, 수도권 법정 출판업 10%, 수도권 밖 그 외 법정 업종 15%입니다. 통관 대리 및 관련 서비스업의 해당 15% 비율에는 절반을 적용합니다.
- **한도·특례**: 한도는 원칙 1억원이며 상시근로자 감소 시 감소 인원당 500만원을 차감해 최저 0원으로 합니다. 10년 이상 계속영업·종합소득 1억원 이하·법정 성실사업자 요건을 모두 충족하면 해당 감면율의 110%를 적용합니다. 과거 2023년까지 알뜰주유소 특례와 구분합니다.
