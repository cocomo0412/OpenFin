---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/CorporateTaxSupports",
  "basis_year": 2026,
  "id": "corporate.support.restructuring-deferral",
  "title": "구조조정 및 재무구조개선 과세이연",
  "type": "corporate-tax-support",
  "description": "양도차익 등에 대한 손금산입 또는 익금불산입 등 구조조정 지원입니다.",
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
      "label": "자산매각·채무상환",
      "condition": "승인된 재무구조개선계획에 따라 2026년 말 이전에 자산을 양도하고 법정 기한에 채무를 상환하는 경우, 결손금을 초과한 법정 채무상환 해당 양도차익을 해당 사업연도 및 이후 3개 사업연도에 익금불산입하고 다음 3개 사업연도에 균분액 이상을 익금산입합니다. 영구 면제가 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "채무 인수·변제",
      "condition": "법인 주주 등이 대상 법인의 채무를 인수·변제하면 법정 한도에서 손금산입할 수 있습니다. 승인계획에 따른 지배주주 지분 전부 양도는 2026년 말까지, 법정 청산계획에 따른 청산종결은 2027년 말까지 등 별개 요건이 있습니다. 대상 법인의 채무감소액은 제39조의 이연·익금산입 기준을 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "주주 자산증여",
      "condition": "제40조는 승인계획에 따른 자산 증여와 금융채무 상환을 대상으로 합니다. 증여자와 수증법인의 손금·익금 및 양도차익 특례가 서로 다르므로 한 가지 공제액으로 계산하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "사후관리",
      "condition": "채무상환 미이행, 부채비율 증가, 법정 기간 내 폐업·해산 등에는 익금산입·감면세액 추징·이자상당액이 발생할 수 있습니다. 기존의 제37~46조라는 포괄 표기를 실제 해당 조문별 조건으로 구분했습니다.",
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
    "path": "opentax/disclosures/6dde9fb48d4c235e05c30c90.json",
    "checksum": "sha256:3ac49dbb26c5c91c4446202c2ab886a90a515a724ca5357d16f12972cbfacbea",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "corporate.support.restructuring-deferral",
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
        "value": "corporate.support.restructuring-deferral"
      }
    }
  ],
  "search_projection": {
    "id": "corporate.support.restructuring-deferral",
    "title": "구조조정 및 재무구조개선 과세이연",
    "type": "corporate-tax-support",
    "description": "양도차익 등에 대한 손금산입 또는 익금불산입 등 구조조정 지원입니다.",
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
    "search_text": "구조조정 및 재무구조개선 과세이연 양도차익 등에 대한 손금산입 또는 익금불산입 등 구조조정 지원입니다."
  },
  "record_checksum": "sha256:e9766befb28fa27189004749731c5a4e0bcf43798889d0bbdab08d7bd15c9d14"
}
---

# 구조조정 및 재무구조개선 과세이연

양도차익 등에 대한 손금산입 또는 익금불산입 등 구조조정 지원입니다.

- **자산매각·채무상환**: 승인된 재무구조개선계획에 따라 2026년 말 이전에 자산을 양도하고 법정 기한에 채무를 상환하는 경우, 결손금을 초과한 법정 채무상환 해당 양도차익을 해당 사업연도 및 이후 3개 사업연도에 익금불산입하고 다음 3개 사업연도에 균분액 이상을 익금산입합니다. 영구 면제가 아닙니다.
- **채무 인수·변제**: 법인 주주 등이 대상 법인의 채무를 인수·변제하면 법정 한도에서 손금산입할 수 있습니다. 승인계획에 따른 지배주주 지분 전부 양도는 2026년 말까지, 법정 청산계획에 따른 청산종결은 2027년 말까지 등 별개 요건이 있습니다. 대상 법인의 채무감소액은 제39조의 이연·익금산입 기준을 적용합니다.
- **주주 자산증여**: 제40조는 승인계획에 따른 자산 증여와 금융채무 상환을 대상으로 합니다. 증여자와 수증법인의 손금·익금 및 양도차익 특례가 서로 다르므로 한 가지 공제액으로 계산하지 않습니다.
- **사후관리**: 채무상환 미이행, 부채비율 증가, 법정 기간 내 폐업·해산 등에는 익금산입·감면세액 추징·이자상당액이 발생할 수 있습니다. 기존의 제37~46조라는 포괄 표기를 실제 해당 조문별 조건으로 구분했습니다.
