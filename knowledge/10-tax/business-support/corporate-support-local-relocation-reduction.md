---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/CorporateTaxSupports",
  "basis_year": 2026,
  "id": "corporate.support.local-relocation-reduction",
  "title": "공장·본사 등 지방이전 세액감면",
  "type": "corporate-tax-support",
  "description": "수도권과밀억제권역 본사·공장 지방 이전 등에 적용되는 세액감면입니다.",
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
      "label": "이전 요건·기한",
      "condition": "공장은 수도권과밀억제권역에서 3년(중소 2년) 이상 운영 후 시설 전부를 법정 대상지역으로 이전하는 등 요건을 충족해야 합니다. 본사는 과밀억제권역에서 3년 이상 소재 후 수도권 밖 이전 및 투자·인원 요건을 충족해야 합니다. 원칙 사업개시기한은 2028년 말이며 법정 부지보유·이전계획 제출에 따른 신축은 2031년 말입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "지역별 기간",
      "condition": "법정 지역분류에 따라 최초 소득 발생 과세연도부터 5년·7년·10년 범위에 100%, 이후 각각 3년·4년·5년 범위에 50%를 감면합니다. 소득이 5년간 없으면 별도 기산연도를 적용하며 단순히 수도권 밖이면 모두 같은 기간이 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "본사 감면소득",
      "condition": "법정 제외소득을 뺀 과세표준에 이전본사 근무인원 비율과 법정 위탁가공무역을 제외한 매출 비율을 곱합니다. 공장·본사를 함께 이전해도 합산 감면대상소득은 해당 연도 소득금액이 한도입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "누적한도·사후관리",
      "condition": "감면기간 총한도는 법정 투자누계액 70%와 상시근로자 수 × 1,500만원(청년·법정 서비스업 2천만원)의 합입니다. 이전 불이행·단기 폐업·수도권 재설치·인원감소·본사 임원비율 미달 등에는 감면 중단 및 추징 규정을 적용합니다.",
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
    "path": "opentax/disclosures/9c74d0d5a0eef9c384dbfdeb.json",
    "checksum": "sha256:24c2ee5aee0ce1105be6ccdad82d9217499fb2c778231da704c8ee993f1469ac",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "corporate.support.local-relocation-reduction",
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
        "value": "corporate.support.local-relocation-reduction"
      }
    }
  ],
  "search_projection": {
    "id": "corporate.support.local-relocation-reduction",
    "title": "공장·본사 등 지방이전 세액감면",
    "type": "corporate-tax-support",
    "description": "수도권과밀억제권역 본사·공장 지방 이전 등에 적용되는 세액감면입니다.",
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
    "search_text": "공장·본사 등 지방이전 세액감면 수도권과밀억제권역 본사·공장 지방 이전 등에 적용되는 세액감면입니다."
  },
  "record_checksum": "sha256:b6dc425cdc8841723ea3e4646fd342563bb4f2a0949de4d5c27fff24cdd7e518"
}
---

# 공장·본사 등 지방이전 세액감면

수도권과밀억제권역 본사·공장 지방 이전 등에 적용되는 세액감면입니다.

- **이전 요건·기한**: 공장은 수도권과밀억제권역에서 3년(중소 2년) 이상 운영 후 시설 전부를 법정 대상지역으로 이전하는 등 요건을 충족해야 합니다. 본사는 과밀억제권역에서 3년 이상 소재 후 수도권 밖 이전 및 투자·인원 요건을 충족해야 합니다. 원칙 사업개시기한은 2028년 말이며 법정 부지보유·이전계획 제출에 따른 신축은 2031년 말입니다.
- **지역별 기간**: 법정 지역분류에 따라 최초 소득 발생 과세연도부터 5년·7년·10년 범위에 100%, 이후 각각 3년·4년·5년 범위에 50%를 감면합니다. 소득이 5년간 없으면 별도 기산연도를 적용하며 단순히 수도권 밖이면 모두 같은 기간이 아닙니다.
- **본사 감면소득**: 법정 제외소득을 뺀 과세표준에 이전본사 근무인원 비율과 법정 위탁가공무역을 제외한 매출 비율을 곱합니다. 공장·본사를 함께 이전해도 합산 감면대상소득은 해당 연도 소득금액이 한도입니다.
- **누적한도·사후관리**: 감면기간 총한도는 법정 투자누계액 70%와 상시근로자 수 × 1,500만원(청년·법정 서비스업 2천만원)의 합입니다. 이전 불이행·단기 폐업·수도권 재설치·인원감소·본사 임원비율 미달 등에는 감면 중단 및 추징 규정을 적용합니다.
