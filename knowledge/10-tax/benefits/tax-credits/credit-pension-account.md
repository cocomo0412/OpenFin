---
{
  "id": "credit.pension-account",
  "title": "연금계좌 세액공제",
  "type": "tax-credit",
  "description": "연금저축과 퇴직연금 납입액에 대한 세액공제입니다. 소득구간별 공제율, 납입 제외금액, ISA 만기 전환 특례를 구분합니다.",
  "parents": [
    "category.tax-credits"
  ],
  "children": [],
  "related": [
    "eligibility-rule.gross-pay-income-threshold"
  ],
  "terms": [
    "term.tax-credit",
    "term.eligibility-threshold"
  ],
  "tags": [
    "tax-credit"
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
      "label": "공제율 15%",
      "condition": "종합소득금액 4,500만원 이하. 근로소득만 있으면 총급여 5,500만원 이하에 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure",
      "rate_percent": 15,
      "limit_krw": 9000000
    },
    {
      "label": "공제율 12%",
      "condition": "위 15% 적용 소득구간에 해당하지 않는 경우에 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure",
      "rate_percent": 12,
      "limit_krw": 9000000
    },
    {
      "label": "납입액 한도",
      "condition": "연금저축계좌 연 600만원, 퇴직연금계좌를 합하여 연 900만원입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure",
      "limit_krw": 9000000
    },
    {
      "label": "납입 제외",
      "condition": "과세이연 퇴직소득 등과 연금계좌 간 계약이전으로 납입된 금액은 공제대상 납입액에서 제외합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "ISA 만기 전환",
      "condition": "법정 방법으로 만기 ISA 잔액을 연금계좌에 납입하면 전환액의 10%와 300만원 중 적은 금액을 한도에 추가합니다. 두 과세기간에 걸친 납입은 전년도 적용액을 차감합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.income-tax-act.deductions-credits"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
  ],
  "collected_at": "2026-09-23T08:26:20.830416+00:00",
  "source_collected_at": "2026-09-23T08:26:20.830416+00:00",
  "last_source_checked_at": "2026-09-23T08:26:20.830416+00:00",
  "last_reviewed_at": "2026-09-23T08:26:20.830416+00:00",
  "reviewed_at": "2026-09-23T08:26:20.830416+00:00",
  "refresh_generation": "2026-09-23T08:26:20.830416+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/77b8c1ee7c12c883d33c14ce.json",
    "checksum": "sha256:b1dff533a480dee5ee416eedd32bc056b047a0ee80dc7ed59f2282fb954472af",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "credit.pension-account",
      "collected_at": "2026-09-23T08:26:20.830416+00:00",
      "reviewed_at": "2026-09-23T08:26:20.830416+00:00",
      "checksum": "sha256:75c504ac6e07a5d3eebe4ea12252fd68aeb035939f7dbee34cf260070a4d3013",
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
        "value": "credit.pension-account"
      }
    }
  ],
  "search_projection": {
    "id": "credit.pension-account",
    "title": "연금계좌 세액공제",
    "type": "tax-credit",
    "description": "연금저축과 퇴직연금 납입액에 대한 세액공제입니다. 소득구간별 공제율, 납입 제외금액, ISA 만기 전환 특례를 구분합니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.income-tax-act.deductions-credits"
    ],
    "export_id": "tax-ontology",
    "search_text": "연금계좌 세액공제 연금저축과 퇴직연금 납입액에 대한 세액공제입니다. 소득구간별 공제율, 납입 제외금액, isa 만기 전환 특례를 구분합니다."
  },
  "record_checksum": "sha256:683dcd89a8d15917b20de3234647afd31ec853fd5f5d0a93b8319f88804bfd8d"
}
---

# 연금계좌 세액공제

연금저축과 퇴직연금 납입액에 대한 세액공제입니다. 소득구간별 공제율, 납입 제외금액, ISA 만기 전환 특례를 구분합니다.

- **공제율 15%**: 종합소득금액 4,500만원 이하. 근로소득만 있으면 총급여 5,500만원 이하에 적용합니다.
- **공제율 12%**: 위 15% 적용 소득구간에 해당하지 않는 경우에 적용합니다.
- **납입액 한도**: 연금저축계좌 연 600만원, 퇴직연금계좌를 합하여 연 900만원입니다.
- **납입 제외**: 과세이연 퇴직소득 등과 연금계좌 간 계약이전으로 납입된 금액은 공제대상 납입액에서 제외합니다.
- **ISA 만기 전환**: 법정 방법으로 만기 ISA 잔액을 연금계좌에 납입하면 전환액의 10%와 300만원 중 적은 금액을 한도에 추가합니다. 두 과세기간에 걸친 납입은 전년도 적용액을 차감합니다.
