---
{
  "deadlines": [
    "deadline.year-end-settlement"
  ],
  "folder": "20_Deductions/IncomeDeductions",
  "basis_year": 2026,
  "id": "deduction.personal-pension-savings",
  "title": "개인연금저축 소득공제",
  "type": "deduction",
  "description": "연금저축 세액공제와 구분되는 개인연금저축 관련 소득공제 항목입니다.",
  "parents": [
    "deduction.other-income"
  ],
  "children": [],
  "related": [],
  "terms": [
    "term.income-deduction",
    "term.tax-base"
  ],
  "tags": [
    "income-deduction"
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
      "label": "종전 계약에 적용",
      "condition": "2000년 12월 31일까지 가입한 적격 개인연금저축은 연 납입액의 40%를 종합소득금액에서 공제하며 한도는 72만원입니다. 새로 가입하는 연금계좌의 세액공제와 다른 제도입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-2012.pension",
      "criteria_kind": "disclosure"
    },
    {
      "label": "현재 적용 근거",
      "condition": "현행법의 제86조 삭제만으로 종전 계약의 공제가 모두 종료된 것은 아닙니다. 2013년 개정 부칙 제40조는 종전 제86조에 따라 가입한 개인연금저축에 종전 규정을 적용하도록 정합니다. 이 기록은 과거 계약의 경과조치에 대한 현행 검토입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-2012.pension",
      "criteria_kind": "disclosure"
    },
    {
      "label": "수령·해지",
      "condition": "적격 연금수령 시 저축에서 발생한 소득의 비과세와 중도해지·연금 외 수령 시 이자소득 과세를 구분합니다. 법정 사유 예외 및 종전법의 조기해지 추징 요건은 계약별로 확인합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-2012.pension",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.tax-special-treatment-2012.pension",
    "source.law.tax-special-treatment-restriction-act.reliefs"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW/lsInfoR.do?lsiSeq=128964&chrClsCd=010202&efYd=20121002&ancYnChk=0",
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0"
  ],
  "collected_at": "2026-09-24T08:31:25.484456+00:00",
  "source_collected_at": "2026-09-24T08:31:25.484456+00:00",
  "last_source_checked_at": "2026-09-24T08:31:25.484456+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-24T08:31:25.484456+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/9df686c967c6a0c39df3d36b.json",
    "checksum": "sha256:a4458ff84566ea13d7ec6337146e6779f94a7d30e6ff116c553bb58096d82b86",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW/lsInfoR.do?lsiSeq=128964&chrClsCd=010202&efYd=20121002&ancYnChk=0",
    "collected_at": "2026-09-24T08:31:25.484456+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-2012.pension",
      "original_url": "https://www.law.go.kr/LSW/lsInfoR.do?lsiSeq=128964&chrClsCd=010202&efYd=20121002&ancYnChk=0",
      "source_record_id": "deduction.personal-pension-savings",
      "collected_at": "2026-09-24T08:31:25.484456+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
      "checksum": "sha256:6022356fcbdfe2690eb0e10f6c79dcf2068fddb21a4ae423dea635584d29d4ef",
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
        "value": "deduction.personal-pension-savings"
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
    "id": "deduction.personal-pension-savings",
    "title": "개인연금저축 소득공제",
    "type": "deduction",
    "description": "연금저축 세액공제와 구분되는 개인연금저축 관련 소득공제 항목입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW/lsInfoR.do?lsiSeq=128964&chrClsCd=010202&efYd=20121002&ancYnChk=0",
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.tax-special-treatment-2012.pension"
    ],
    "export_id": "tax-ontology",
    "search_text": "개인연금저축 소득공제 연금저축 세액공제와 구분되는 개인연금저축 관련 소득공제 항목입니다."
  },
  "record_checksum": "sha256:a4059006e183ed859258d3b4f4a59b7763b5273b3a1cae262e6450915375eeb8"
}
---

# 개인연금저축 소득공제

연금저축 세액공제와 구분되는 개인연금저축 관련 소득공제 항목입니다.

- **종전 계약에 적용**: 2000년 12월 31일까지 가입한 적격 개인연금저축은 연 납입액의 40%를 종합소득금액에서 공제하며 한도는 72만원입니다. 새로 가입하는 연금계좌의 세액공제와 다른 제도입니다.
- **현재 적용 근거**: 현행법의 제86조 삭제만으로 종전 계약의 공제가 모두 종료된 것은 아닙니다. 2013년 개정 부칙 제40조는 종전 제86조에 따라 가입한 개인연금저축에 종전 규정을 적용하도록 정합니다. 이 기록은 과거 계약의 경과조치에 대한 현행 검토입니다.
- **수령·해지**: 적격 연금수령 시 저축에서 발생한 소득의 비과세와 중도해지·연금 외 수령 시 이자소득 과세를 구분합니다. 법정 사유 예외 및 종전법의 조기해지 추징 요건은 계약별로 확인합니다.
