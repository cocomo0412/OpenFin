---
{
  "deadlines": [
    "deadline.capital-gains.preliminary",
    "deadline.capital-gains.final"
  ],
  "folder": "10_Taxes/National",
  "basis_year": 2026,
  "id": "tax.income.capital-gains",
  "title": "양도소득세",
  "type": "tax",
  "description": "부동산, 주식 등 자산 양도차익에 대해 과세되는 소득세입니다. 자산 유형별 특례세율이 있으므로 기본세율과 특례세율을 분리해 확인합니다.",
  "parents": [
    "tax.income"
  ],
  "children": [
    "concept.capital-gains.calculation-flow",
    "concept.capital-gains.stock-basic-deduction",
    "filing.capital-gains-return"
  ],
  "related": [
    "tax.securities-transaction",
    "scenario.real-estate-transfer",
    "concept.additional-tax.general"
  ],
  "terms": [
    "term.tax-base",
    "term.capital-gain",
    "term.tax-rate",
    "term.deadline"
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
      "label": "계산·기본공제",
      "condition": "자산별 양도가액에서 취득가액 등 법정 필요경비와 적용 가능한 장기보유특별공제를 빼서 양도소득금액을 계산합니다. 제103조의 소득 구분별 연 250만원 기본공제를 적용하되 미등기양도자산 등 제외대상을 구분합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "기본 누진세율",
      "condition": "제55조 기본세율 대상은 과세표준 1,400만·5,000만·8,800만·1억5천만·3억·5억·10억원을 경계로 6·15·24·35·38·40·42·45%입니다. 누진공제액은 각각 0·126만·576만·1,544만·1,994만·2,594만·3,594만·6,594만원입니다. 전체 양도자산에 일률 적용하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "단기 보유·주택",
      "condition": "법정 부동산 등의 보유 1년 미만은 50%, 1년 이상 2년 미만은 40%가 원칙이나 주택·입주권·분양권은 각각 70%·60%를 적용합니다. 분양권·다주택·비사업용 토지·미등기 등 별도 세율 및 시행령상 제외조건을 확인하고 복수 세율 해당 시 법정 큰 세액 비교를 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "국외 주식·파생상품",
      "condition": "제94조 제1항 제3호 다목의 국외 주식 등은 법정 중소기업 주식 10%, 그 밖의 주식 20%로 구분합니다. 과세대상 파생상품 등은 법률 기본세율 20%에 대해 시행령 제167조의9의 탄력세율 10%를 적용합니다. 국내 대주주 주식·신탁 수익권은 별도 구간과 요건입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.income-tax-act.deductions-credits",
    "source.law.income-decree.capital-gains"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=286211&joNo=0167&joBrNo=09&docCls=jo&urlMode=lsScJoRltInfoR"
  ],
  "collected_at": "2026-09-23T08:26:20.830416+00:00",
  "source_collected_at": "2026-09-23T08:26:20.830416+00:00",
  "last_source_checked_at": "2026-09-23T08:26:20.830416+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-23T08:26:20.830416+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/edccb156aa7795343a66cb91.json",
    "checksum": "sha256:016548b9dc96d683ea54a9807dacad6e0a4f3e5ff53d27954c7fa5892f15becd",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "tax.income.capital-gains",
      "collected_at": "2026-09-23T08:26:20.830416+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
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
        "value": "tax.income.capital-gains"
      }
    },
    {
      "source_id": "source.law.income-decree.capital-gains",
      "original_url": "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=286211&joNo=0167&joBrNo=09&docCls=jo&urlMode=lsScJoRltInfoR",
      "collected_at": "2026-09-24T08:32:13.097058+00:00",
      "checksum": "sha256:abbe6374dd24b062edf7c28f952bcbf884db53eb10b634b2e1228df53e78dbb5",
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
    "id": "tax.income.capital-gains",
    "title": "양도소득세",
    "type": "tax",
    "description": "부동산, 주식 등 자산 양도차익에 대해 과세되는 소득세입니다. 자산 유형별 특례세율이 있으므로 기본세율과 특례세율을 분리해 확인합니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=286211&joNo=0167&joBrNo=09&docCls=jo&urlMode=lsScJoRltInfoR"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.income-tax-act.deductions-credits"
    ],
    "export_id": "tax-ontology",
    "search_text": "양도소득세 부동산, 주식 등 자산 양도차익에 대해 과세되는 소득세입니다. 자산 유형별 특례세율이 있으므로 기본세율과 특례세율을 분리해 확인합니다."
  },
  "record_checksum": "sha256:137bddbb529e3c7bbe812c5338e1f333758471645f95be27f6148b15d44970c9"
}
---

# 양도소득세

부동산, 주식 등 자산 양도차익에 대해 과세되는 소득세입니다. 자산 유형별 특례세율이 있으므로 기본세율과 특례세율을 분리해 확인합니다.

- **계산·기본공제**: 자산별 양도가액에서 취득가액 등 법정 필요경비와 적용 가능한 장기보유특별공제를 빼서 양도소득금액을 계산합니다. 제103조의 소득 구분별 연 250만원 기본공제를 적용하되 미등기양도자산 등 제외대상을 구분합니다.
- **기본 누진세율**: 제55조 기본세율 대상은 과세표준 1,400만·5,000만·8,800만·1억5천만·3억·5억·10억원을 경계로 6·15·24·35·38·40·42·45%입니다. 누진공제액은 각각 0·126만·576만·1,544만·1,994만·2,594만·3,594만·6,594만원입니다. 전체 양도자산에 일률 적용하지 않습니다.
- **단기 보유·주택**: 법정 부동산 등의 보유 1년 미만은 50%, 1년 이상 2년 미만은 40%가 원칙이나 주택·입주권·분양권은 각각 70%·60%를 적용합니다. 분양권·다주택·비사업용 토지·미등기 등 별도 세율 및 시행령상 제외조건을 확인하고 복수 세율 해당 시 법정 큰 세액 비교를 적용합니다.
- **국외 주식·파생상품**: 제94조 제1항 제3호 다목의 국외 주식 등은 법정 중소기업 주식 10%, 그 밖의 주식 20%로 구분합니다. 과세대상 파생상품 등은 법률 기본세율 20%에 대해 시행령 제167조의9의 탄력세율 10%를 적용합니다. 국내 대주주 주식·신탁 수익권은 별도 구간과 요건입니다.
