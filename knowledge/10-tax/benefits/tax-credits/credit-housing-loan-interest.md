---
{
  "deadlines": [
    "deadline.year-end-settlement"
  ],
  "folder": "20_Deductions/TaxCredits",
  "basis_year": 2026,
  "id": "credit.housing-loan-interest",
  "title": "주택자금차입금 이자세액공제",
  "type": "tax-credit",
  "description": "1995년 11월 1일부터 1997년 12월 31일까지 취득한 주택의 미상환 차입금 이자상환액에 대해 적용되는 경과조치 세액공제입니다.",
  "parents": [
    "category.tax-credits"
  ],
  "children": [],
  "related": [
    "deduction.housing-funds",
    "deduction.housing-savings"
  ],
  "terms": [
    "term.tax-credit"
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
      "label": "대상·공제율",
      "condition": "종전 조세감면규제법 제92조의4는 무주택 또는 법정 1주택 세대주가 1995년 11월 1일부터 1997년 12월 31일까지 법정 미분양주택을 취득한 경우의 적격 차입금 이자상환액 30%를 세액공제합니다. 1997년 말까지 매매계약과 계약금을 납부한 경우를 포함하며 1주택자는 법정 대체취득 조건을 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-reduction-1997.housing",
      "criteria_kind": "disclosure"
    },
    {
      "label": "경과조치·한도",
      "condition": "현행 조세특례제한법에 수록된 제정 부칙 제12조 제5항은 당시 적용받던 주택자금차입금에 상환완료까지 종전 규정을 적용하도록 정합니다. 공제액이 종합소득산출세액을 넘는 부분은 인정하지 않습니다. 모든 현재 주택대출의 이자에 적용하는 공제가 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-reduction-1997.housing",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.tax-reduction-1997.housing",
    "source.law.tax-special-treatment-restriction-act.reliefs"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW/lsInfoR.do?lsiSeq=50697&chrClsCd=010202&efYd=19970830&ancYnChk=0",
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0"
  ],
  "collected_at": "2026-09-24T08:31:04.447519+00:00",
  "source_collected_at": "2026-09-24T08:31:04.447519+00:00",
  "last_source_checked_at": "2026-09-24T08:31:04.447519+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-24T08:31:04.447519+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/df1dd8265f8a0c0ddf16150a.json",
    "checksum": "sha256:0586ecc79583263c745d4127bff284c5979ff07a4f96e7dd47f47c5318ab441f",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW/lsInfoR.do?lsiSeq=50697&chrClsCd=010202&efYd=19970830&ancYnChk=0",
    "collected_at": "2026-09-24T08:31:04.447519+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-reduction-1997.housing",
      "original_url": "https://www.law.go.kr/LSW/lsInfoR.do?lsiSeq=50697&chrClsCd=010202&efYd=19970830&ancYnChk=0",
      "source_record_id": "credit.housing-loan-interest",
      "collected_at": "2026-09-24T08:31:04.447519+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
      "checksum": "sha256:5f223b4a96a18e382796bfee1f09a832afef5f815befe837335a8e6d05ca0794",
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
        "value": "credit.housing-loan-interest"
      }
    },
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "collected_at": "2026-09-23T08:26:25.182612+00:00",
      "checksum": "sha256:bf7a2db72fa6b5273f5e3b3483f49305d70145e3c4d3ef89e16b2b1b2280ae80",
      "checksum_scope": "official-disclosure-response",
      "verification_status": "reference_only",
      "supported_fields": [
        "criteria",
        "current_disclosure"
      ],
      "reviewed_at": "2026-09-24T00:00:00+09:00"
    }
  ],
  "search_projection": {
    "id": "credit.housing-loan-interest",
    "title": "주택자금차입금 이자세액공제",
    "type": "tax-credit",
    "description": "1995년 11월 1일부터 1997년 12월 31일까지 취득한 주택의 미상환 차입금 이자상환액에 대해 적용되는 경과조치 세액공제입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW/lsInfoR.do?lsiSeq=50697&chrClsCd=010202&efYd=19970830&ancYnChk=0",
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.tax-reduction-1997.housing"
    ],
    "export_id": "tax-ontology",
    "search_text": "주택자금차입금 이자세액공제 1995년 11월 1일부터 1997년 12월 31일까지 취득한 주택의 미상환 차입금 이자상환액에 대해 적용되는 경과조치 세액공제입니다."
  },
  "record_checksum": "sha256:3a5472c47a410dbf1c55210f242bf8c9532aa4aa77703369b21ac8baa5414e47"
}
---

# 주택자금차입금 이자세액공제

1995년 11월 1일부터 1997년 12월 31일까지 취득한 주택의 미상환 차입금 이자상환액에 대해 적용되는 경과조치 세액공제입니다.

- **대상·공제율**: 종전 조세감면규제법 제92조의4는 무주택 또는 법정 1주택 세대주가 1995년 11월 1일부터 1997년 12월 31일까지 법정 미분양주택을 취득한 경우의 적격 차입금 이자상환액 30%를 세액공제합니다. 1997년 말까지 매매계약과 계약금을 납부한 경우를 포함하며 1주택자는 법정 대체취득 조건을 적용합니다.
- **경과조치·한도**: 현행 조세특례제한법에 수록된 제정 부칙 제12조 제5항은 당시 적용받던 주택자금차입금에 상환완료까지 종전 규정을 적용하도록 정합니다. 공제액이 종합소득산출세액을 넘는 부분은 인정하지 않습니다. 모든 현재 주택대출의 이자에 적용하는 공제가 아닙니다.
