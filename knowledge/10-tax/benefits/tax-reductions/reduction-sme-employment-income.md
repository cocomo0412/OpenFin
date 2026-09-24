---
{
  "deadlines": [
    "deadline.year-end-settlement"
  ],
  "folder": "20_Deductions/TaxReductions",
  "basis_year": 2026,
  "id": "reduction.sme-employment-income",
  "title": "중소기업 취업자 소득세 감면",
  "type": "tax-reduction",
  "description": "청년 등 중소기업 취업자의 소득세를 일정 요건에서 감면하는 항목입니다.",
  "parents": [
    "category.tax-reductions"
  ],
  "children": [],
  "related": [],
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
      "label": "대상·감면",
      "condition": "법정 청년·60세 이상자·장애인·경력단절 근로자 등이 2026년 12월 31일까지 대상 중소기업에 취업한 경우입니다. 일반 대상자는 취업일부터 3년이 되는 날이 속하는 달까지 소득세 70%, 청년은 5년간 90%를 감면하며 과세기간별 한도는 200만원입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "기간 계산·병역",
      "condition": "다른 중소기업으로 이직하거나 재취업·고용승계해도 최초 감면대상 취업일부터 기간을 계산합니다. 법정 병역 이행 후 1년 내 종전 기업 복직은 복직일부터 2년 또는 최초 취업일부터 7년이 되는 날 등 조문상 특례를 확인합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "신청·요건",
      "condition": "기업의 업종·규모와 청년 등 인적 요건은 시행령 기준에 따릅니다. 재직자는 원천징수의무자에게, 퇴직자는 주소지 관할 세무서장에게 신청할 수 있습니다.",
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
    "path": "opentax/disclosures/f7efbeced7e1ca117731820e.json",
    "checksum": "sha256:ee2889bce278c461f3a655db6d4a2e12a93eb07304fa687f834076aa3b2a50b9",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "reduction.sme-employment-income",
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
        "value": "reduction.sme-employment-income"
      }
    }
  ],
  "search_projection": {
    "id": "reduction.sme-employment-income",
    "title": "중소기업 취업자 소득세 감면",
    "type": "tax-reduction",
    "description": "청년 등 중소기업 취업자의 소득세를 일정 요건에서 감면하는 항목입니다.",
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
    "search_text": "중소기업 취업자 소득세 감면 청년 등 중소기업 취업자의 소득세를 일정 요건에서 감면하는 항목입니다."
  },
  "record_checksum": "sha256:935119ed5d4e83d18f50e9ba22ef0684564b0b5395001acfe3f417c85753ef08"
}
---

# 중소기업 취업자 소득세 감면

청년 등 중소기업 취업자의 소득세를 일정 요건에서 감면하는 항목입니다.

- **대상·감면**: 법정 청년·60세 이상자·장애인·경력단절 근로자 등이 2026년 12월 31일까지 대상 중소기업에 취업한 경우입니다. 일반 대상자는 취업일부터 3년이 되는 날이 속하는 달까지 소득세 70%, 청년은 5년간 90%를 감면하며 과세기간별 한도는 200만원입니다.
- **기간 계산·병역**: 다른 중소기업으로 이직하거나 재취업·고용승계해도 최초 감면대상 취업일부터 기간을 계산합니다. 법정 병역 이행 후 1년 내 종전 기업 복직은 복직일부터 2년 또는 최초 취업일부터 7년이 되는 날 등 조문상 특례를 확인합니다.
- **신청·요건**: 기업의 업종·규모와 청년 등 인적 요건은 시행령 기준에 따릅니다. 재직자는 원천징수의무자에게, 퇴직자는 주소지 관할 세무서장에게 신청할 수 있습니다.
