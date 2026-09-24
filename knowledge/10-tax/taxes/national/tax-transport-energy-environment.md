---
{
  "deadlines": [],
  "folder": "10_Taxes/National",
  "basis_year": 2026,
  "id": "tax.transport-energy-environment",
  "title": "교통·에너지·환경세",
  "type": "tax",
  "description": "교통시설, 에너지, 환경 관련 재원 목적의 국세입니다.",
  "parents": [
    "category.national-taxes"
  ],
  "children": [],
  "related": [],
  "terms": [
    "term.national-tax",
    "term.tax-law"
  ],
  "tags": [
    "national-tax"
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
      "label": "과세 방식",
      "condition": "휘발유·경유 및 각각의 법정 대체유류에 수량 기준으로 부과합니다. 법률의 기본세율은 휘발유 리터당 475원, 경유 340원이지만 실제 적용 시 시행령 탄력세율을 확인합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.transport-energy-environment-tax-act.rates",
      "criteria_kind": "disclosure"
    },
    {
      "label": "2026년 9월 적용",
      "condition": "현행 시행령 제3조의2에 따라 2026년 9월 30일까지 휘발유 리터당 450원, 경유 리터당 281원입니다. 같은 조 본문은 각각 529원·375원이므로 한시기간 종료 후 연장·개정 여부를 재확인해야 합니다. 교육세 등 다른 세목을 포함한 금액은 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.transport-energy-environment-tax-act.rates",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.transport-energy-environment-tax-act.rates",
    "source.law.transport-energy-decree.flexible"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276071&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
    "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=288439&joNo=0003&joBrNo=02&docCls=jo&urlMode=lsScJoRltInfoR"
  ],
  "collected_at": "2026-09-23T08:26:23.547997+00:00",
  "source_collected_at": "2026-09-23T08:26:23.547997+00:00",
  "last_source_checked_at": "2026-09-23T08:26:23.547997+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-23T08:26:23.547997+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/2b5f4edbc9fd60a9de14eb9a.json",
    "checksum": "sha256:8a604db895ac339984a18b5da4d19873fa027bb4f6faad8a35b46f038c83fe47",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276071&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:23.547997+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.transport-energy-environment-tax-act.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276071&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
      "source_record_id": "tax.transport-energy-environment",
      "collected_at": "2026-09-23T08:26:23.547997+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
      "checksum": "sha256:95b9f33cab0010ac3c60c2b26e4fb7bbd2ef9e4eeab3f12f231fffcae0830f2c",
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
        "value": "tax.transport-energy-environment"
      }
    },
    {
      "source_id": "source.law.transport-energy-decree.flexible",
      "original_url": "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=288439&joNo=0003&joBrNo=02&docCls=jo&urlMode=lsScJoRltInfoR",
      "collected_at": "2026-09-24T08:26:22.410898+00:00",
      "checksum": "sha256:acbcf4e1d3655c1e71ff181cceaacece823732ee5a912f6bb125534a3609773e",
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
    "id": "tax.transport-energy-environment",
    "title": "교통·에너지·환경세",
    "type": "tax",
    "description": "교통시설, 에너지, 환경 관련 재원 목적의 국세입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276071&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
      "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=288439&joNo=0003&joBrNo=02&docCls=jo&urlMode=lsScJoRltInfoR"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.transport-energy-environment-tax-act.rates"
    ],
    "export_id": "tax-ontology",
    "search_text": "교통·에너지·환경세 교통시설, 에너지, 환경 관련 재원 목적의 국세입니다."
  },
  "record_checksum": "sha256:33ac0ea3ab8d217e048d7e82be99e90ddacf464d9937a282b7ae9f4d49102451"
}
---

# 교통·에너지·환경세

교통시설, 에너지, 환경 관련 재원 목적의 국세입니다.

- **과세 방식**: 휘발유·경유 및 각각의 법정 대체유류에 수량 기준으로 부과합니다. 법률의 기본세율은 휘발유 리터당 475원, 경유 340원이지만 실제 적용 시 시행령 탄력세율을 확인합니다.
- **2026년 9월 적용**: 현행 시행령 제3조의2에 따라 2026년 9월 30일까지 휘발유 리터당 450원, 경유 리터당 281원입니다. 같은 조 본문은 각각 529원·375원이므로 한시기간 종료 후 연장·개정 여부를 재확인해야 합니다. 교육세 등 다른 세목을 포함한 금액은 아닙니다.
