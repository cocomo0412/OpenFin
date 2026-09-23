---
{
  "deadlines": [],
  "folder": "50_Deadlines",
  "basis_year": 2026,
  "id": "deadline.local.acquisition",
  "title": "취득세 신고납부기한",
  "type": "deadline",
  "description": "취득세는 원칙적으로 취득일부터 60일 이내입니다. 무상취득·부담부증여는 취득월 말일부터 3개월, 상속·실종은 법정 기준월 말일부터 6개월이며 외국 주소 상속인이 있으면 9개월입니다.",
  "parents": [
    "category.filing-calendar"
  ],
  "children": [],
  "related": [
    "local.acquisition"
  ],
  "terms": [],
  "tags": [
    "deadline"
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
  "start_date": null,
  "end_date": null,
  "recurrence": {
    "frequency": "event-based",
    "anchor": "취득일 또는 법정 기준월 말일",
    "due_rule": "일반 취득 60일 이내",
    "special_rule": "무상취득·부담부증여 월말+3개월, 상속·실종 월말+6개월(외국 주소 상속인 9개월); 기한 전 등기·등록 시 접수일까지, 토지거래허가 특례 별도"
  },
  "criteria": [
    {
      "label": "신고·납부기한",
      "condition": "취득세는 원칙적으로 취득일부터 60일 이내입니다. 무상취득·부담부증여는 취득월 말일부터 3개월, 상속·실종은 법정 기준월 말일부터 6개월이며 외국 주소 상속인이 있으면 9개월입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.local-tax-act.rates"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
  ],
  "collected_at": "2026-09-23T08:26:22.571307+00:00",
  "source_collected_at": "2026-09-23T08:26:22.571307+00:00",
  "last_source_checked_at": "2026-09-23T08:26:22.571307+00:00",
  "last_reviewed_at": "2026-09-23T08:26:22.571307+00:00",
  "reviewed_at": "2026-09-23T08:26:22.571307+00:00",
  "refresh_generation": "2026-09-23T08:26:22.571307+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/0d03ca0cfce36346ea5a13d9.json",
    "checksum": "sha256:e57019345da0a4fc71b39763f05f06e7b7727ab02b35ff6db02f02ebcd6745f0",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:22.571307+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.local-tax-act.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "deadline.local.acquisition",
      "collected_at": "2026-09-23T08:26:22.571307+00:00",
      "reviewed_at": "2026-09-23T08:26:22.571307+00:00",
      "checksum": "sha256:9f5ef4724aa36b1f62bd0e36aa912309144e85c3e1bc880c960e66d467418995",
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
        "value": "deadline.local.acquisition"
      }
    }
  ],
  "search_projection": {
    "id": "deadline.local.acquisition",
    "title": "취득세 신고납부기한",
    "type": "deadline",
    "description": "취득세는 원칙적으로 취득일부터 60일 이내입니다. 무상취득·부담부증여는 취득월 말일부터 3개월, 상속·실종은 법정 기준월 말일부터 6개월이며 외국 주소 상속인이 있으면 9개월입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.local-tax-act.rates"
    ],
    "export_id": "tax-ontology",
    "search_text": "취득세 신고납부기한 취득세는 원칙적으로 취득일부터 60일 이내입니다. 무상취득·부담부증여는 취득월 말일부터 3개월, 상속·실종은 법정 기준월 말일부터 6개월이며 외국 주소 상속인이 있으면 9개월입니다."
  },
  "record_checksum": "sha256:f955272471db932b9a5ad16c758de547d03124148c00609fee8b76d7d31f7769"
}
---

# 취득세 신고납부기한

취득세는 원칙적으로 취득일부터 60일 이내입니다. 무상취득·부담부증여는 취득월 말일부터 3개월, 상속·실종은 법정 기준월 말일부터 6개월이며 외국 주소 상속인이 있으면 9개월입니다.

- **신고·납부기한**: 취득세는 원칙적으로 취득일부터 60일 이내입니다. 무상취득·부담부증여는 취득월 말일부터 3개월, 상속·실종은 법정 기준월 말일부터 6개월이며 외국 주소 상속인이 있으면 9개월입니다.
