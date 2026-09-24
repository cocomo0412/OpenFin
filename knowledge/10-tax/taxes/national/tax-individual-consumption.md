---
{
  "deadlines": [],
  "folder": "10_Taxes/National",
  "basis_year": 2026,
  "id": "tax.individual-consumption",
  "title": "개별소비세",
  "type": "tax",
  "description": "특정 물품, 장소, 행위 등에 개별적으로 부과되는 국세입니다.",
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
      "label": "종가세·종량세 구분",
      "condition": "특정 물품·입장·유흥음식·영업행위에 부과합니다. 사행기구·수렵용 총포는 법정 가격의 20%, 고급 물품은 법정 기준가격 초과분의 20%, 과세 승용차는 법정 기본세율 5%입니다. 경차 등 제외요건과 별도 감면을 구분합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.individual-consumption-tax-act.rates",
      "criteria_kind": "disclosure"
    },
    {
      "label": "승용차 한시세율",
      "condition": "시행령에 남아 있는 승용차 3.5%와 차액 100만원 한도 규정에는 2026년 6월 30일까지라는 유효기간 주석이 있습니다. 이 수치를 2026년 9월의 일반 유효 세율로 안내하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.individual-consumption-tax-act.rates",
      "criteria_kind": "disclosure"
    },
    {
      "label": "연료별 탄력세율",
      "condition": "시행령 제2조의2는 등유 등 리터당 63원, 해당 부탄은 2026년 9월 30일까지 킬로그램당 206원(본문 275원) 등 물품·용도별 세율을 정합니다. 해당 발전용 천연가스 10.2원은 2026년 말까지이며, 2025년 말까지였던 유연탄 39.1원은 현행 기간으로 연장 표시하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.individual-consumption-tax-act.rates",
      "criteria_kind": "disclosure"
    },
    {
      "label": "장소·영업",
      "condition": "법률상 골프장 입장 1만2천원, 유흥음식요금 10% 등 행위별 과세가 있으며 면세·감면 대상은 별도 확인합니다. 카지노 입장세와 연간 매출액에 대한 영업행위 과세는 서로 다릅니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.individual-consumption-tax-act.rates",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.individual-consumption-tax-act.rates",
    "source.law.individual-consumption-decree.flexible"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280345&chrClsCd=010202&urlMode=lsInfoP&efYd=20260424&ancYnChk=0",
    "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=288847&joNo=0002&joBrNo=02&docCls=jo&urlMode=lsScJoRltInfoR"
  ],
  "collected_at": "2026-09-23T08:26:20.444286+00:00",
  "source_collected_at": "2026-09-23T08:26:20.444286+00:00",
  "last_source_checked_at": "2026-09-23T08:26:20.444286+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-23T08:26:20.444286+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/dac99ca1f5fbdbb1a44dbc72.json",
    "checksum": "sha256:52edb6cce7bfdeb8b606c0c585de12901976ea5e807cbd63549f7214a514f5f8",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280345&chrClsCd=010202&urlMode=lsInfoP&efYd=20260424&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.444286+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.individual-consumption-tax-act.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280345&chrClsCd=010202&urlMode=lsInfoP&efYd=20260424&ancYnChk=0",
      "source_record_id": "tax.individual-consumption",
      "collected_at": "2026-09-23T08:26:20.444286+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
      "checksum": "sha256:aa50120a887cdd1c2b0477ea9104b82fab86effc67bd3d577bdefcebd9332058",
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
        "value": "tax.individual-consumption"
      }
    },
    {
      "source_id": "source.law.individual-consumption-decree.flexible",
      "original_url": "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=288847&joNo=0002&joBrNo=02&docCls=jo&urlMode=lsScJoRltInfoR",
      "collected_at": "2026-09-24T08:26:21.848093+00:00",
      "checksum": "sha256:59f4edf424e5b3271b0f52744784b1afed2daac4482b3dadc9c961b729b50341",
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
    "id": "tax.individual-consumption",
    "title": "개별소비세",
    "type": "tax",
    "description": "특정 물품, 장소, 행위 등에 개별적으로 부과되는 국세입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280345&chrClsCd=010202&urlMode=lsInfoP&efYd=20260424&ancYnChk=0",
      "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=288847&joNo=0002&joBrNo=02&docCls=jo&urlMode=lsScJoRltInfoR"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.individual-consumption-tax-act.rates"
    ],
    "export_id": "tax-ontology",
    "search_text": "개별소비세 특정 물품, 장소, 행위 등에 개별적으로 부과되는 국세입니다."
  },
  "record_checksum": "sha256:9d67040bf1a2574ebfcd039cd4aa2d5ce527304df9ff7c3a40cb5a4d299ccc1d"
}
---

# 개별소비세

특정 물품, 장소, 행위 등에 개별적으로 부과되는 국세입니다.

- **종가세·종량세 구분**: 특정 물품·입장·유흥음식·영업행위에 부과합니다. 사행기구·수렵용 총포는 법정 가격의 20%, 고급 물품은 법정 기준가격 초과분의 20%, 과세 승용차는 법정 기본세율 5%입니다. 경차 등 제외요건과 별도 감면을 구분합니다.
- **승용차 한시세율**: 시행령에 남아 있는 승용차 3.5%와 차액 100만원 한도 규정에는 2026년 6월 30일까지라는 유효기간 주석이 있습니다. 이 수치를 2026년 9월의 일반 유효 세율로 안내하지 않습니다.
- **연료별 탄력세율**: 시행령 제2조의2는 등유 등 리터당 63원, 해당 부탄은 2026년 9월 30일까지 킬로그램당 206원(본문 275원) 등 물품·용도별 세율을 정합니다. 해당 발전용 천연가스 10.2원은 2026년 말까지이며, 2025년 말까지였던 유연탄 39.1원은 현행 기간으로 연장 표시하지 않습니다.
- **장소·영업**: 법률상 골프장 입장 1만2천원, 유흥음식요금 10% 등 행위별 과세가 있으며 면세·감면 대상은 별도 확인합니다. 카지노 입장세와 연간 매출액에 대한 영업행위 과세는 서로 다릅니다.
