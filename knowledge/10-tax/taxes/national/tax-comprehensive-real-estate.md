---
{
  "deadlines": [
    "deadline.comprehensive-real-estate.payment"
  ],
  "folder": "10_Taxes/National",
  "basis_year": 2026,
  "id": "tax.comprehensive-real-estate",
  "title": "종합부동산세",
  "type": "tax",
  "description": "일정 기준을 넘는 주택·토지 보유에 대해 과세되는 국세입니다.",
  "parents": [
    "category.national-taxes"
  ],
  "children": [
    "concept.cre-tax-base-date",
    "concept.cre-deduction-thresholds"
  ],
  "related": [
    "local.property",
    "support.didimdol-loan",
    "scenario.homeowner.real-estate-tax"
  ],
  "terms": [
    "term.national-tax",
    "term.tax-law",
    "term.publicly-notified-price",
    "term.tax-rate",
    "term.eligibility-threshold"
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
      "label": "과세표준",
      "condition": "주택 공시가격 합계에서 일반 9억원, 법정 1세대 1주택자 12억원, 일반 법인 0원을 공제하고 공정시장가액비율 60%를 적용합니다. 종합합산토지는 5억원, 별도합산토지는 80억원을 공제하고 100%를 적용합니다. 음수 과세표준은 0으로 봅니다. 합산배제·주택 수·공익법인 예외를 별도로 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.comprehensive-real-estate-act.full",
      "criteria_kind": "disclosure"
    },
    {
      "label": "2주택 이하 세율",
      "condition": "주택분 과세표준 3억·6억·12억·25억·50억·94억원을 경계로 구간별 한계세율은 0.5·0.7·1.0·1.3·1.5·2.0·2.7%입니다. 각 구간 초과분에 해당 세율을 적용하는 누진세율이며 전체 과세표준에 최고 구간 세율만 곱하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.comprehensive-real-estate-act.full",
      "criteria_kind": "disclosure"
    },
    {
      "label": "3주택 이상·법인",
      "condition": "3주택 이상은 같은 구간에서 0.5·0.7·1.0·2.0·3.0·4.0·5.0%입니다. 일반 법인은 2주택 이하 2.7%, 3주택 이상 5%를 적용하되 공익법인·공공주택사업자 등 제9조 제2항 예외를 구분합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.comprehensive-real-estate-act.full",
      "criteria_kind": "disclosure"
    },
    {
      "label": "토지 세율",
      "condition": "종합합산토지는 과세표준 15억원까지 1%, 15억 초과 45억원까지 1,500만원＋15억원 초과분 2%, 45억원 초과는 7,500만원＋초과분 3%입니다. 별도합산토지는 200억원까지 0.5%, 200억 초과 400억원까지 1억원＋초과분 0.6%, 400억원 초과는 2억2천만원＋초과분 0.7%입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.comprehensive-real-estate-act.full",
      "criteria_kind": "disclosure"
    },
    {
      "label": "1주택 공제",
      "condition": "법정 1세대 1주택자는 나이 60~64세 20%, 65~69세 30%, 70세 이상 40%; 보유 5~9년 20%, 10~14년 40%, 15년 이상 50%의 세액공제를 적용하며 합계 80%가 한도입니다. 특례 주택분 제외와 이미 부과된 재산세 공제 규정을 함께 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.comprehensive-real-estate-act.full",
      "criteria_kind": "disclosure"
    },
    {
      "label": "납부",
      "condition": "12월 1~15일 납부가 원칙이며 고지납부와 신고납부를 구분합니다. 공시가격 공제와 세액공제를 서로 바꾸어 적용하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.comprehensive-real-estate-act.full",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.comprehensive-real-estate-act.full",
    "source.law.comprehensive-real-estate-decree.ratio"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280417&chrClsCd=010202&urlMode=lsInfoP&efYd=20260101&ancYnChk=0",
    "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=283639&joNo=0002&joBrNo=04&docCls=jo&urlMode=lsScJoRltInfoR"
  ],
  "collected_at": "2026-09-24T08:14:55.138639+00:00",
  "source_collected_at": "2026-09-24T08:14:55.138639+00:00",
  "last_source_checked_at": "2026-09-24T08:14:55.138639+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-24T08:14:55.138639+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/58eae80fd523de31d91ddd21.json",
    "checksum": "sha256:83a474ee8b14413574ac5710ecff196145905be5329d4cef4b9aae6982a81a27",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280417&chrClsCd=010202&urlMode=lsInfoP&efYd=20260101&ancYnChk=0",
    "collected_at": "2026-09-24T08:14:55.138639+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.comprehensive-real-estate-act.full",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280417&chrClsCd=010202&urlMode=lsInfoP&efYd=20260101&ancYnChk=0",
      "source_record_id": "tax.comprehensive-real-estate",
      "collected_at": "2026-09-24T08:14:55.138639+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
      "checksum": "sha256:ed50f4429139a93c009d14ba57ae91199071ade13ed0cfba788a80a6a040aa7b",
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
        "value": "tax.comprehensive-real-estate"
      }
    },
    {
      "source_id": "source.law.comprehensive-real-estate-decree.ratio",
      "original_url": "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=283639&joNo=0002&joBrNo=04&docCls=jo&urlMode=lsScJoRltInfoR",
      "collected_at": "2026-09-24T08:26:22.051192+00:00",
      "checksum": "sha256:feff91b2d4b312462efa362a19cf6b104a82150f36762651aa19f321b6f9e8fc",
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
    "id": "tax.comprehensive-real-estate",
    "title": "종합부동산세",
    "type": "tax",
    "description": "일정 기준을 넘는 주택·토지 보유에 대해 과세되는 국세입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280417&chrClsCd=010202&urlMode=lsInfoP&efYd=20260101&ancYnChk=0",
      "https://www.law.go.kr/LSW//lsSideInfoP.do?lsiSeq=283639&joNo=0002&joBrNo=04&docCls=jo&urlMode=lsScJoRltInfoR"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.comprehensive-real-estate-act.full"
    ],
    "export_id": "tax-ontology",
    "search_text": "종합부동산세 일정 기준을 넘는 주택·토지 보유에 대해 과세되는 국세입니다."
  },
  "record_checksum": "sha256:db27916454f8423e3a2744101fec29c5d265f0b7bc196a42657722ec8ea55ca5"
}
---

# 종합부동산세

일정 기준을 넘는 주택·토지 보유에 대해 과세되는 국세입니다.

- **과세표준**: 주택 공시가격 합계에서 일반 9억원, 법정 1세대 1주택자 12억원, 일반 법인 0원을 공제하고 공정시장가액비율 60%를 적용합니다. 종합합산토지는 5억원, 별도합산토지는 80억원을 공제하고 100%를 적용합니다. 음수 과세표준은 0으로 봅니다. 합산배제·주택 수·공익법인 예외를 별도로 적용합니다.
- **2주택 이하 세율**: 주택분 과세표준 3억·6억·12억·25억·50억·94억원을 경계로 구간별 한계세율은 0.5·0.7·1.0·1.3·1.5·2.0·2.7%입니다. 각 구간 초과분에 해당 세율을 적용하는 누진세율이며 전체 과세표준에 최고 구간 세율만 곱하지 않습니다.
- **3주택 이상·법인**: 3주택 이상은 같은 구간에서 0.5·0.7·1.0·2.0·3.0·4.0·5.0%입니다. 일반 법인은 2주택 이하 2.7%, 3주택 이상 5%를 적용하되 공익법인·공공주택사업자 등 제9조 제2항 예외를 구분합니다.
- **토지 세율**: 종합합산토지는 과세표준 15억원까지 1%, 15억 초과 45억원까지 1,500만원＋15억원 초과분 2%, 45억원 초과는 7,500만원＋초과분 3%입니다. 별도합산토지는 200억원까지 0.5%, 200억 초과 400억원까지 1억원＋초과분 0.6%, 400억원 초과는 2억2천만원＋초과분 0.7%입니다.
- **1주택 공제**: 법정 1세대 1주택자는 나이 60~64세 20%, 65~69세 30%, 70세 이상 40%; 보유 5~9년 20%, 10~14년 40%, 15년 이상 50%의 세액공제를 적용하며 합계 80%가 한도입니다. 특례 주택분 제외와 이미 부과된 재산세 공제 규정을 함께 적용합니다.
- **납부**: 12월 1~15일 납부가 원칙이며 고지납부와 신고납부를 구분합니다. 공시가격 공제와 세액공제를 서로 바꾸어 적용하지 않습니다.
