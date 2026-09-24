---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/CorporateTaxSupports",
  "basis_year": 2026,
  "id": "corporate.support.minimum-tax-preference",
  "title": "최저한세 적용한도 우대",
  "type": "corporate-tax-support",
  "description": "중소기업 등에게 일반법인보다 우대되는 최저한세율을 적용하는 지원입니다.",
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
      "label": "중소기업 법인",
      "condition": "최저한세는 감면을 무제한 적용하지 못하도록 하는 최소세액 기준입니다. 법정 조정 과세표준에 중소기업 7%를 적용하며, 최초 중소기업 졸업 후 법정 3년은 8%, 다음 2년은 9%입니다. 7% 자체가 추가 공제율인 것은 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "그 밖의 법인",
      "condition": "과세표준 100억원 이하 부분 10%, 100억원 초과 1천억원 이하 부분 12%, 1천억원 초과 부분 17%를 적용합니다. 감면 전 과세표준 조정과 법정 제외 법인·세액을 반영합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "적용 감면의 구분",
      "condition": "법정 열거된 공제·감면에만 적용하며 중소기업 연구개발비 공제, 특정 100% 감면 등에는 예외가 있습니다. 개인 사업소득의 최저한세는 별도로 산출세액 3천만원 이하 부분 35%, 초과 부분 45% 기준이므로 법인 과세표준 세율과 혼용하지 않습니다.",
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
    "path": "opentax/disclosures/5143436db5b80b12b9c5abc9.json",
    "checksum": "sha256:0c929ba910900cb79c7dcdbbb1ce8dbe1053db316a19811067cb64e6df104f6f",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "corporate.support.minimum-tax-preference",
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
        "value": "corporate.support.minimum-tax-preference"
      }
    }
  ],
  "search_projection": {
    "id": "corporate.support.minimum-tax-preference",
    "title": "최저한세 적용한도 우대",
    "type": "corporate-tax-support",
    "description": "중소기업 등에게 일반법인보다 우대되는 최저한세율을 적용하는 지원입니다.",
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
    "search_text": "최저한세 적용한도 우대 중소기업 등에게 일반법인보다 우대되는 최저한세율을 적용하는 지원입니다."
  },
  "record_checksum": "sha256:c7296a0204392ad8bd2f0b545a53788064ad3e4de208f8ba0f276de431e0dfe3"
}
---

# 최저한세 적용한도 우대

중소기업 등에게 일반법인보다 우대되는 최저한세율을 적용하는 지원입니다.

- **중소기업 법인**: 최저한세는 감면을 무제한 적용하지 못하도록 하는 최소세액 기준입니다. 법정 조정 과세표준에 중소기업 7%를 적용하며, 최초 중소기업 졸업 후 법정 3년은 8%, 다음 2년은 9%입니다. 7% 자체가 추가 공제율인 것은 아닙니다.
- **그 밖의 법인**: 과세표준 100억원 이하 부분 10%, 100억원 초과 1천억원 이하 부분 12%, 1천억원 초과 부분 17%를 적용합니다. 감면 전 과세표준 조정과 법정 제외 법인·세액을 반영합니다.
- **적용 감면의 구분**: 법정 열거된 공제·감면에만 적용하며 중소기업 연구개발비 공제, 특정 100% 감면 등에는 예외가 있습니다. 개인 사업소득의 최저한세는 별도로 산출세액 3천만원 이하 부분 35%, 초과 부분 45% 기준이므로 법인 과세표준 세율과 혼용하지 않습니다.
