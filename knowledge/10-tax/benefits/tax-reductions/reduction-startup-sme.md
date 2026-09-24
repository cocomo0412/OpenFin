---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/TaxReductions",
  "basis_year": 2026,
  "id": "reduction.startup-sme",
  "title": "창업중소기업 등에 대한 세액감면",
  "type": "tax-reduction",
  "description": "창업중소기업 등의 최초 소득발생 과세연도와 이후 일정 기간에 적용되는 세액감면입니다.",
  "parents": [
    "category.tax-reductions"
  ],
  "children": [],
  "related": [
    "corporate.support.startup-sme-reduction"
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
      "label": "대상·기간",
      "condition": "2027년 12월 31일 이전에 법정 감면업종으로 창업한 적격 중소기업 등이 대상입니다. 최초 소득 발생 과세연도와 다음 4개 과세연도에 적용하며 사업개시 후 5년간 소득이 없으면 법정 기산연도를 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "2026년 이후 창업",
      "condition": "청년창업은 수도권 밖·수도권 인구감소지역 100%, 그 밖의 수도권 비과밀지역 75%, 수도권과밀억제권역 50%입니다. 일반 창업은 수도권 밖·수도권 인구감소지역 50%, 그 밖의 수도권 비과밀지역 25%입니다. 수도권과밀억제권역의 일반 창업에 기본 감면을 일률 적용하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "2025년까지 창업",
      "condition": "청년창업은 수도권과밀억제권역 밖 100%·안 50%, 일반 창업은 과밀억제권역 밖 50% 등 창업시점별 규정을 적용합니다. 2026년 창업에 옛 지역구분을 적용하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "소규모·벤처 등",
      "condition": "적격 일반 창업의 해당 연도 연환산 수입금액이 1억400만원 이하이면 제6항 지역별 특례를 적용합니다. 2026년 이후 창업은 수도권 밖·인구감소지역 100%, 그 밖의 수도권 비과밀지역 75%, 과밀억제권역 50%입니다. 창업벤처·에너지신기술·보육센터 및 과거 신성장서비스 특례는 별도 요건을 따릅니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "한도·창업 판정",
      "condition": "연간 감면 합계는 5억원 한도입니다. 합병·사업승계·법인전환·폐업 후 동종 재개·사업확장 등은 원칙적으로 창업이 아니며 법정 예외를 확인합니다. 고용증가 추가감면은 최소고용 요건·기본 감면율별 상한을 적용합니다.",
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
    "path": "opentax/disclosures/dae9cd7340c2d5ab362d0189.json",
    "checksum": "sha256:ac9eb60993f31079bc2f35e5ad4ba12851deea70617319c13bed8eee25ab9e22",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "reduction.startup-sme",
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
        "value": "reduction.startup-sme"
      }
    }
  ],
  "search_projection": {
    "id": "reduction.startup-sme",
    "title": "창업중소기업 등에 대한 세액감면",
    "type": "tax-reduction",
    "description": "창업중소기업 등의 최초 소득발생 과세연도와 이후 일정 기간에 적용되는 세액감면입니다.",
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
    "search_text": "창업중소기업 등에 대한 세액감면 창업중소기업 등의 최초 소득발생 과세연도와 이후 일정 기간에 적용되는 세액감면입니다."
  },
  "record_checksum": "sha256:3d862fea0173f16f27e061653aa9e449fdc04fc9ddc1d99b0af8471df8c7fd2b"
}
---

# 창업중소기업 등에 대한 세액감면

창업중소기업 등의 최초 소득발생 과세연도와 이후 일정 기간에 적용되는 세액감면입니다.

- **대상·기간**: 2027년 12월 31일 이전에 법정 감면업종으로 창업한 적격 중소기업 등이 대상입니다. 최초 소득 발생 과세연도와 다음 4개 과세연도에 적용하며 사업개시 후 5년간 소득이 없으면 법정 기산연도를 적용합니다.
- **2026년 이후 창업**: 청년창업은 수도권 밖·수도권 인구감소지역 100%, 그 밖의 수도권 비과밀지역 75%, 수도권과밀억제권역 50%입니다. 일반 창업은 수도권 밖·수도권 인구감소지역 50%, 그 밖의 수도권 비과밀지역 25%입니다. 수도권과밀억제권역의 일반 창업에 기본 감면을 일률 적용하지 않습니다.
- **2025년까지 창업**: 청년창업은 수도권과밀억제권역 밖 100%·안 50%, 일반 창업은 과밀억제권역 밖 50% 등 창업시점별 규정을 적용합니다. 2026년 창업에 옛 지역구분을 적용하지 않습니다.
- **소규모·벤처 등**: 적격 일반 창업의 해당 연도 연환산 수입금액이 1억400만원 이하이면 제6항 지역별 특례를 적용합니다. 2026년 이후 창업은 수도권 밖·인구감소지역 100%, 그 밖의 수도권 비과밀지역 75%, 과밀억제권역 50%입니다. 창업벤처·에너지신기술·보육센터 및 과거 신성장서비스 특례는 별도 요건을 따릅니다.
- **한도·창업 판정**: 연간 감면 합계는 5억원 한도입니다. 합병·사업승계·법인전환·폐업 후 동종 재개·사업확장 등은 원칙적으로 창업이 아니며 법정 예외를 확인합니다. 고용증가 추가감면은 최소고용 요건·기본 감면율별 상한을 적용합니다.
