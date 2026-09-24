---
{
  "deadlines": [],
  "folder": "10_Taxes/Customs",
  "basis_year": 2026,
  "id": "tax.customs",
  "title": "관세",
  "type": "tax",
  "description": "수입물품에 부과되는 조세입니다. 국세기본법 제2조의 국세 열거와 별도로 관세법 제14조를 근거로 관리합니다.",
  "parents": [
    "category.customs"
  ],
  "children": [],
  "related": [],
  "terms": [
    "term.customs",
    "term.tax-base"
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
      "label": "과세대상·과세표준",
      "condition": "수입물품에 부과하며 과세표준은 수입물품의 가격 또는 수량입니다. 가격에 세율을 곱하는 종가세와 수량에 세액을 적용하는 종량세를 구분합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.customs-act.full",
      "criteria_kind": "disclosure"
    },
    {
      "label": "과세가격",
      "condition": "실제 지급가격에 법정 수수료·포장비·생산지원비·권리사용료·판매자 귀속 수익·수입항까지의 운임과 보험료 등을 조정합니다. 구매수수료는 가산 대상에서 제외하며, 명백히 구분되는 수입 후 비용·국내 세금 등은 법정 기준에 따라 제외합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.customs-act.full",
      "criteria_kind": "disclosure"
    },
    {
      "label": "거래가격을 쓸 수 없는 경우",
      "condition": "가격에 영향을 주는 특수관계, 금액으로 계산할 수 없는 조건, 입증자료 부족 등에는 제31조부터 제35조의 대체 과세가격 결정방법을 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.customs-act.full",
      "criteria_kind": "disclosure"
    },
    {
      "label": "세율 선택",
      "condition": "모든 수입품에 하나의 세율을 적용하지 않습니다. 품목별 관세율표의 기본·잠정세율과 법정 조정세율, 적용 우선순위 및 협정 적용요건을 확인해야 합니다. 잠정세율은 기본세율보다 우선하지만 다른 세율의 우선 적용에는 제50조의 조건이 있습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.customs-act.full",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.customs-act.full"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=288689&chrClsCd=010202&urlMode=lsInfoP&efYd=20260811&ancYnChk=0"
  ],
  "collected_at": "2026-09-24T08:14:56.108730+00:00",
  "source_collected_at": "2026-09-24T08:14:56.108730+00:00",
  "last_source_checked_at": "2026-09-24T08:14:56.108730+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-24T08:14:56.108730+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/ef74b4896a0d4f1e34bf98e9.json",
    "checksum": "sha256:f4d527839ae8c3413b216695080c26f4ea365461b13e23efd72d9484eda72728",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=288689&chrClsCd=010202&urlMode=lsInfoP&efYd=20260811&ancYnChk=0",
    "collected_at": "2026-09-24T08:14:56.108730+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.customs-act.full",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=288689&chrClsCd=010202&urlMode=lsInfoP&efYd=20260811&ancYnChk=0",
      "source_record_id": "tax.customs",
      "collected_at": "2026-09-24T08:14:56.108730+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
      "checksum": "sha256:5ab72e72d79be60d0fbbd194d7e6cfecd3240d57893400d84723d3266801c3ff",
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
        "value": "tax.customs"
      }
    }
  ],
  "search_projection": {
    "id": "tax.customs",
    "title": "관세",
    "type": "tax",
    "description": "수입물품에 부과되는 조세입니다. 국세기본법 제2조의 국세 열거와 별도로 관세법 제14조를 근거로 관리합니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=288689&chrClsCd=010202&urlMode=lsInfoP&efYd=20260811&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.customs-act.full"
    ],
    "export_id": "tax-ontology",
    "search_text": "관세 수입물품에 부과되는 조세입니다. 국세기본법 제2조의 국세 열거와 별도로 관세법 제14조를 근거로 관리합니다."
  },
  "record_checksum": "sha256:ca2b5f2d212b5fe44028034bcace1a10f5c872e7e4c5bfbeccac86a5be5df537"
}
---

# 관세

수입물품에 부과되는 조세입니다. 국세기본법 제2조의 국세 열거와 별도로 관세법 제14조를 근거로 관리합니다.

- **과세대상·과세표준**: 수입물품에 부과하며 과세표준은 수입물품의 가격 또는 수량입니다. 가격에 세율을 곱하는 종가세와 수량에 세액을 적용하는 종량세를 구분합니다.
- **과세가격**: 실제 지급가격에 법정 수수료·포장비·생산지원비·권리사용료·판매자 귀속 수익·수입항까지의 운임과 보험료 등을 조정합니다. 구매수수료는 가산 대상에서 제외하며, 명백히 구분되는 수입 후 비용·국내 세금 등은 법정 기준에 따라 제외합니다.
- **거래가격을 쓸 수 없는 경우**: 가격에 영향을 주는 특수관계, 금액으로 계산할 수 없는 조건, 입증자료 부족 등에는 제31조부터 제35조의 대체 과세가격 결정방법을 적용합니다.
- **세율 선택**: 모든 수입품에 하나의 세율을 적용하지 않습니다. 품목별 관세율표의 기본·잠정세율과 법정 조정세율, 적용 우선순위 및 협정 적용요건을 확인해야 합니다. 잠정세율은 기본세율보다 우선하지만 다른 세율의 우선 적용에는 제50조의 조건이 있습니다.
