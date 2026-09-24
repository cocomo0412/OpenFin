---
{
  "deadlines": [],
  "folder": "10_Taxes/National",
  "basis_year": 2026,
  "id": "tax.income.retirement",
  "title": "퇴직소득세",
  "type": "tax",
  "description": "퇴직으로 받는 소득에 대해 별도 계산 구조를 가지는 소득세입니다.",
  "parents": [
    "tax.income"
  ],
  "children": [],
  "related": [],
  "terms": [
    "term.withholding"
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
      "label": "계산 순서",
      "condition": "퇴직급여에서 비과세소득을 제외한 퇴직소득금액에서 근속연수공제를 뺀 뒤 근속연수로 나누고 12를 곱해 환산급여를 구합니다. 환산급여공제를 빼서 과세표준을 계산하고, 기본세율로 계산한 환산산출세액을 12로 나눈 뒤 근속연수를 곱합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "근속연수공제",
      "condition": "5년 이하 연 100만원, 5년 초과 10년 이하 500만원＋5년 초과 연수당 200만원, 10년 초과 20년 이하 1,500만원＋10년 초과 연수당 250만원, 20년 초과 4,000만원＋20년 초과 연수당 300만원입니다. 공제액은 퇴직소득금액이 한도이며 근속연수의 1년 미만은 1년으로 봅니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "환산급여공제",
      "condition": "800만원 이하 전액, 800만원 초과 7천만원 이하 800만원＋초과분 60%, 7천만원 초과 1억원 이하 4,520만원＋초과분 55%, 1억원 초과 3억원 이하 6,170만원＋초과분 45%, 3억원 초과 1억5,170만원＋초과분 35%입니다. 각 초과분은 해당 구간의 하한을 넘는 금액입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "세율 적용",
      "condition": "환산 과세표준에 소득세법 제55조의 초과누진 기본세율 6~45%를 적용합니다. 단일 최고세율을 전체 금액에 곱하지 않습니다. 정산·기납부세액·과세이연 등은 별도 확인합니다.",
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
    "path": "opentax/disclosures/8e1e133007e326a21584b4d2.json",
    "checksum": "sha256:1fd11e1546b31cdc56e799becea9039929f9c664b54ab932d5fbc44b046aa70a",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "tax.income.retirement",
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
        "value": "tax.income.retirement"
      }
    }
  ],
  "search_projection": {
    "id": "tax.income.retirement",
    "title": "퇴직소득세",
    "type": "tax",
    "description": "퇴직으로 받는 소득에 대해 별도 계산 구조를 가지는 소득세입니다.",
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
    "search_text": "퇴직소득세 퇴직으로 받는 소득에 대해 별도 계산 구조를 가지는 소득세입니다."
  },
  "record_checksum": "sha256:d0cb038f20b2e58125cef0037e3073869686b8d4b070af298e0c1233e414b990"
}
---

# 퇴직소득세

퇴직으로 받는 소득에 대해 별도 계산 구조를 가지는 소득세입니다.

- **계산 순서**: 퇴직급여에서 비과세소득을 제외한 퇴직소득금액에서 근속연수공제를 뺀 뒤 근속연수로 나누고 12를 곱해 환산급여를 구합니다. 환산급여공제를 빼서 과세표준을 계산하고, 기본세율로 계산한 환산산출세액을 12로 나눈 뒤 근속연수를 곱합니다.
- **근속연수공제**: 5년 이하 연 100만원, 5년 초과 10년 이하 500만원＋5년 초과 연수당 200만원, 10년 초과 20년 이하 1,500만원＋10년 초과 연수당 250만원, 20년 초과 4,000만원＋20년 초과 연수당 300만원입니다. 공제액은 퇴직소득금액이 한도이며 근속연수의 1년 미만은 1년으로 봅니다.
- **환산급여공제**: 800만원 이하 전액, 800만원 초과 7천만원 이하 800만원＋초과분 60%, 7천만원 초과 1억원 이하 4,520만원＋초과분 55%, 1억원 초과 3억원 이하 6,170만원＋초과분 45%, 3억원 초과 1억5,170만원＋초과분 35%입니다. 각 초과분은 해당 구간의 하한을 넘는 금액입니다.
- **세율 적용**: 환산 과세표준에 소득세법 제55조의 초과누진 기본세율 6~45%를 적용합니다. 단일 최고세율을 전체 금액에 곱하지 않습니다. 정산·기납부세액·과세이연 등은 별도 확인합니다.
