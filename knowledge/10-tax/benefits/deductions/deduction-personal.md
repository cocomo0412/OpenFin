---
{
  "id": "deduction.personal",
  "title": "인적공제",
  "type": "deduction",
  "description": "기본공제와 추가공제로 구성되는 소득공제입니다.",
  "parents": [
    "category.income-deductions"
  ],
  "children": [
    "deduction.personal.basic",
    "deduction.personal.additional"
  ],
  "related": [
    "scenario.dual-income-personal-deduction"
  ],
  "terms": [
    "term.income-deduction"
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
      "label": "기본공제 금액",
      "condition": "종합소득이 있는 거주자 본인과 요건을 충족한 배우자·부양가족 1명당 연 150만원입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "배우자·부양가족 소득",
      "condition": "해당 과세기간 소득금액 합계 100만원 이하. 근로소득만 있으면 총급여 500만원 이하를 포함합니다. 본인에게 이 소득상한을 적용하는 것은 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "부양가족 나이·관계",
      "condition": "생계를 같이 하는 직계존속은 60세 이상, 직계비속·동거 입양자는 20세 이하, 형제자매는 20세 이하 또는 60세 이상입니다. 법정 장애인은 나이 제한을 받지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "기타 대상·중복 제한",
      "condition": "법정 수급권자·위탁아동 및 장애인 직계비속 등의 배우자는 별도 법정 요건을 따릅니다. 같은 배우자·부양가족을 여러 거주자가 중복 공제할 수 없습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "경로우대",
      "condition": "기본공제대상자 중 70세 이상인 사람 1명당 연 100만원을 추가 공제합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "장애인",
      "condition": "법정 장애인에 해당하는 기본공제대상자 1명당 연 200만원을 추가 공제합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "부녀자",
      "condition": "합산 종합소득금액 3천만원 이하인 여성 중 배우자가 있거나, 배우자가 없고 기본공제대상 부양가족이 있는 세대주이면 연 50만원입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "한부모",
      "condition": "배우자가 없고 기본공제대상 직계비속 또는 입양자가 있으면 연 100만원입니다. 부녀자공제와 동시에 해당하면 한부모공제만 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "공제 범위",
      "condition": "인적공제 합계액 중 종합소득금액을 초과하는 금액은 공제하지 않습니다.",
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
    "path": "opentax/disclosures/7ef0fd3b687b1d2c37a4f9e0.json",
    "checksum": "sha256:7269460017903892936681560d59c30a806c8b91ab78e5ac7b6288f98cbd7836",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "deduction.personal",
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
        "value": "deduction.personal"
      }
    }
  ],
  "search_projection": {
    "id": "deduction.personal",
    "title": "인적공제",
    "type": "deduction",
    "description": "기본공제와 추가공제로 구성되는 소득공제입니다.",
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
    "search_text": "인적공제 기본공제와 추가공제로 구성되는 소득공제입니다."
  },
  "record_checksum": "sha256:d6754d04d9a762fec3e1dbc75545c3c173bf7f25774a7d6d7b2be10997a4387d"
}
---

# 인적공제

기본공제와 추가공제로 구성되는 소득공제입니다.

- **기본공제 금액**: 종합소득이 있는 거주자 본인과 요건을 충족한 배우자·부양가족 1명당 연 150만원입니다.
- **배우자·부양가족 소득**: 해당 과세기간 소득금액 합계 100만원 이하. 근로소득만 있으면 총급여 500만원 이하를 포함합니다. 본인에게 이 소득상한을 적용하는 것은 아닙니다.
- **부양가족 나이·관계**: 생계를 같이 하는 직계존속은 60세 이상, 직계비속·동거 입양자는 20세 이하, 형제자매는 20세 이하 또는 60세 이상입니다. 법정 장애인은 나이 제한을 받지 않습니다.
- **기타 대상·중복 제한**: 법정 수급권자·위탁아동 및 장애인 직계비속 등의 배우자는 별도 법정 요건을 따릅니다. 같은 배우자·부양가족을 여러 거주자가 중복 공제할 수 없습니다.
- **경로우대**: 기본공제대상자 중 70세 이상인 사람 1명당 연 100만원을 추가 공제합니다.
- **장애인**: 법정 장애인에 해당하는 기본공제대상자 1명당 연 200만원을 추가 공제합니다.
- **부녀자**: 합산 종합소득금액 3천만원 이하인 여성 중 배우자가 있거나, 배우자가 없고 기본공제대상 부양가족이 있는 세대주이면 연 50만원입니다.
- **한부모**: 배우자가 없고 기본공제대상 직계비속 또는 입양자가 있으면 연 100만원입니다. 부녀자공제와 동시에 해당하면 한부모공제만 적용합니다.
- **공제 범위**: 인적공제 합계액 중 종합소득금액을 초과하는 금액은 공제하지 않습니다.
