---
{
  "id": "credit.standard",
  "title": "표준세액공제",
  "type": "tax-credit",
  "description": "특별소득공제·특별세액공제·월세액 세액공제를 신청하지 않은 거주자에게 정액으로 적용되는 세액공제입니다.",
  "parents": [
    "category.tax-credits"
  ],
  "children": [],
  "related": [
    "credit.special-tax",
    "credit.monthly-rent"
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
      "label": "근로소득자",
      "condition": "특별소득공제·특별세액공제·월세액 세액공제를 신청하지 않은 근로소득 있는 거주자는 연 13만원을 공제합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "성실사업자",
      "condition": "근로소득이 없고 조세특례제한법 제122조의3 세액공제를 신청하지 않은 종합소득자 중 사업용계좌 신고 등 법정 성실사업자 요건을 충족하면 연 12만원입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "그 밖의 종합소득자",
      "condition": "근로소득이 없고 조세특례제한법 제122조의3 세액공제를 신청하지 않은 종합소득자 중 위 성실사업자에 해당하지 않으면 연 7만원입니다.",
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
    "path": "opentax/disclosures/455d00a30cc68e4d44f5e30d.json",
    "checksum": "sha256:eb7e7c666d2e941ffaeda807b3d0619e9474354609e187488384a47a2b356d8f",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "credit.standard",
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
        "value": "credit.standard"
      }
    }
  ],
  "search_projection": {
    "id": "credit.standard",
    "title": "표준세액공제",
    "type": "tax-credit",
    "description": "특별소득공제·특별세액공제·월세액 세액공제를 신청하지 않은 거주자에게 정액으로 적용되는 세액공제입니다.",
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
    "search_text": "표준세액공제 특별소득공제·특별세액공제·월세액 세액공제를 신청하지 않은 거주자에게 정액으로 적용되는 세액공제입니다."
  },
  "record_checksum": "sha256:27d0b020dc5a2e2cf80cecb57d59b5f6effd9413d305b32f3aaf2b264916b620"
}
---

# 표준세액공제

특별소득공제·특별세액공제·월세액 세액공제를 신청하지 않은 거주자에게 정액으로 적용되는 세액공제입니다.

- **근로소득자**: 특별소득공제·특별세액공제·월세액 세액공제를 신청하지 않은 근로소득 있는 거주자는 연 13만원을 공제합니다.
- **성실사업자**: 근로소득이 없고 조세특례제한법 제122조의3 세액공제를 신청하지 않은 종합소득자 중 사업용계좌 신고 등 법정 성실사업자 요건을 충족하면 연 12만원입니다.
- **그 밖의 종합소득자**: 근로소득이 없고 조세특례제한법 제122조의3 세액공제를 신청하지 않은 종합소득자 중 위 성실사업자에 해당하지 않으면 연 7만원입니다.
