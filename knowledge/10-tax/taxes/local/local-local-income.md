---
{
  "deadlines": [
    "deadline.local.income.final"
  ],
  "folder": "10_Taxes/Local",
  "basis_year": 2026,
  "id": "local.local-income",
  "title": "지방소득세",
  "type": "tax",
  "description": "개인의 종합소득·퇴직소득·양도소득과 법인소득은 각각의 과세표준·세율·계산 규정을 적용합니다. 국세 납부액에 일률적으로 10%를 곱하는 설명만으로 모든 지방소득세를 계산할 수 없습니다.",
  "parents": [
    "category.local-ordinary-taxes"
  ],
  "children": [],
  "related": [
    "tax.income",
    "tax.corporate"
  ],
  "terms": [
    "term.local-tax"
  ],
  "tags": [
    "local-tax"
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
      "label": "구분",
      "condition": "개인의 종합소득·퇴직소득·양도소득과 법인소득은 각각의 과세표준·세율·계산 규정을 적용합니다. 국세 납부액에 일률적으로 10%를 곱하는 설명만으로 모든 지방소득세를 계산할 수 없습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제92조"
    },
    {
      "label": "개인 종합소득",
      "condition": "과세표준 구간별 표준세율은 0.6%, 1.5%, 2.4%, 3.5%, 3.8%, 4.0%, 4.2%, 4.5%이며 초과누진 방식입니다. 구간 경계는 1,400만원·5,000만원·8,800만원·1억5천만원·3억원·5억원·10억원입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제92조"
    },
    {
      "label": "적용 범위",
      "condition": "위 세율은 거주자 종합소득 기준입니다. 퇴직·양도·법인소득에 그대로 적용하지 않으며, 조례상 조정 및 공제·감면을 구분합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제92조"
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
    "path": "opentax/disclosures/dd2f5b02fefa13f78e827e32.json",
    "checksum": "sha256:29451bc09c90f62b1af12f90667902180dec087b970c573806ccb5be07c9f588",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:22.571307+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.local-tax-act.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "local.local-income",
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
        "value": "local.local-income"
      }
    }
  ],
  "search_projection": {
    "id": "local.local-income",
    "title": "지방소득세",
    "type": "tax",
    "description": "개인의 종합소득·퇴직소득·양도소득과 법인소득은 각각의 과세표준·세율·계산 규정을 적용합니다. 국세 납부액에 일률적으로 10%를 곱하는 설명만으로 모든 지방소득세를 계산할 수 없습니다.",
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
    "search_text": "지방소득세 개인의 종합소득·퇴직소득·양도소득과 법인소득은 각각의 과세표준·세율·계산 규정을 적용합니다. 국세 납부액에 일률적으로 10%를 곱하는 설명만으로 모든 지방소득세를 계산할 수 없습니다."
  },
  "record_checksum": "sha256:1340a743002ee6d7d1424b40cac8e1eea632353f12b0beaa8154ca3f866c87cd"
}
---

# 지방소득세

개인의 종합소득·퇴직소득·양도소득과 법인소득은 각각의 과세표준·세율·계산 규정을 적용합니다. 국세 납부액에 일률적으로 10%를 곱하는 설명만으로 모든 지방소득세를 계산할 수 없습니다.

- **구분**: 개인의 종합소득·퇴직소득·양도소득과 법인소득은 각각의 과세표준·세율·계산 규정을 적용합니다. 국세 납부액에 일률적으로 10%를 곱하는 설명만으로 모든 지방소득세를 계산할 수 없습니다.
- **개인 종합소득**: 과세표준 구간별 표준세율은 0.6%, 1.5%, 2.4%, 3.5%, 3.8%, 4.0%, 4.2%, 4.5%이며 초과누진 방식입니다. 구간 경계는 1,400만원·5,000만원·8,800만원·1억5천만원·3억원·5억원·10억원입니다.
- **적용 범위**: 위 세율은 거주자 종합소득 기준입니다. 퇴직·양도·법인소득에 그대로 적용하지 않으며, 조례상 조정 및 공제·감면을 구분합니다.
