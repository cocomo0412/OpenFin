---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/CorporateTaxSupports",
  "basis_year": 2026,
  "id": "corporate.support.ma-credit",
  "title": "M&A 활성화 지원",
  "type": "corporate-tax-support",
  "description": "기술혁신형 합병·주식취득 인수가액 중 기술가치 금액에 대한 법인세 공제입니다.",
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
      "label": "적용 시점",
      "condition": "기술혁신형 합병 세액공제는 2024년 12월 31일까지 이루어진 법정 합병을 대상으로 합니다. 2026년 신규 합병에 적용되는 제도로 안내하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "공제·요건",
      "condition": "대상 합병의 법정 기술가치 금액의 10%를 공제합니다. 1년 이상 사업한 내국법인 간 합병, 순자산시가 130% 이상의 양도가액, 지배주주 제한과 승계사업 계속 요건을 모두 충족해야 하며 특수관계인 합병은 제외합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "사후관리",
      "condition": "법정 사후관리기간에 지배주주 요건 위반 또는 승계사업 폐지가 발생하면 공제세액과 이자상당액을 납부합니다.",
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
    "path": "opentax/disclosures/54fd8320de3c9e6d57e98a6b.json",
    "checksum": "sha256:90208e575690958aa5a10d62fa0a5ec3b1225ab9cc948f7eedbe510b6639b664",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "corporate.support.ma-credit",
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
        "value": "corporate.support.ma-credit"
      }
    }
  ],
  "search_projection": {
    "id": "corporate.support.ma-credit",
    "title": "M&A 활성화 지원",
    "type": "corporate-tax-support",
    "description": "기술혁신형 합병·주식취득 인수가액 중 기술가치 금액에 대한 법인세 공제입니다.",
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
    "search_text": "m&a 활성화 지원 기술혁신형 합병·주식취득 인수가액 중 기술가치 금액에 대한 법인세 공제입니다."
  },
  "record_checksum": "sha256:cf61675deca70bcd81000950a9059f843a87899632f5a74a845c4312e76fce06"
}
---

# M&A 활성화 지원

기술혁신형 합병·주식취득 인수가액 중 기술가치 금액에 대한 법인세 공제입니다.

- **적용 시점**: 기술혁신형 합병 세액공제는 2024년 12월 31일까지 이루어진 법정 합병을 대상으로 합니다. 2026년 신규 합병에 적용되는 제도로 안내하지 않습니다.
- **공제·요건**: 대상 합병의 법정 기술가치 금액의 10%를 공제합니다. 1년 이상 사업한 내국법인 간 합병, 순자산시가 130% 이상의 양도가액, 지배주주 제한과 승계사업 계속 요건을 모두 충족해야 하며 특수관계인 합병은 제외합니다.
- **사후관리**: 법정 사후관리기간에 지배주주 요건 위반 또는 승계사업 폐지가 발생하면 공제세액과 이자상당액을 납부합니다.
