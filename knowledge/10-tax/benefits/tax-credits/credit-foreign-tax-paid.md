---
{
  "id": "credit.foreign-tax-paid",
  "title": "외국납부세액공제",
  "type": "tax-credit",
  "description": "국외원천소득에 대한 이중과세 조정을 위한 세액공제입니다.",
  "parents": [
    "category.tax-credits"
  ],
  "children": [],
  "related": [
    "corporate.support.foreign-tax-paid-credit"
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
      "label": "대상",
      "condition": "거주자의 종합소득 또는 퇴직소득에 합산된 국외원천소득에 대해 외국에서 납부했거나 납부할 법정 외국소득세액입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "한도",
      "condition": "해당 종합소득·퇴직소득 산출세액에 전체 소득 중 국외원천소득의 비율을 곱해 계산합니다. 감면·면제 대상 국외소득은 법정 조정을 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "이월",
      "condition": "종합소득 산출세액에서 공제하는 경우 한도 초과액은 다음 과세기간부터 10년 이내의 공제한도에서 이월공제합니다. 이월기간 종료 후 미공제액은 법정 요건에 따라 필요경비에 산입합니다. 퇴직소득 공제에 이 이월규정을 그대로 적용하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "disclosure"
    },
    {
      "label": "추가 요건",
      "condition": "조세조약상 간주납부세액과 외국법인 배당 관련 출자자 과세에는 별도 법정 요건이 있습니다. 국가별 계산·증빙 등 시행령상 절차를 확인해야 합니다.",
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
    "path": "opentax/disclosures/de88ee0098076eaf454baa98.json",
    "checksum": "sha256:816862c0de86617d09e20b1432b8fdaa6bfd122424d5559a3410df1ed722ef69",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "credit.foreign-tax-paid",
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
        "value": "credit.foreign-tax-paid"
      }
    }
  ],
  "search_projection": {
    "id": "credit.foreign-tax-paid",
    "title": "외국납부세액공제",
    "type": "tax-credit",
    "description": "국외원천소득에 대한 이중과세 조정을 위한 세액공제입니다.",
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
    "search_text": "외국납부세액공제 국외원천소득에 대한 이중과세 조정을 위한 세액공제입니다."
  },
  "record_checksum": "sha256:f3babfb17c1bb46ad8e08ee7b7f8d9e2386a5956ab3d0b89dfab0138e5959287"
}
---

# 외국납부세액공제

국외원천소득에 대한 이중과세 조정을 위한 세액공제입니다.

- **대상**: 거주자의 종합소득 또는 퇴직소득에 합산된 국외원천소득에 대해 외국에서 납부했거나 납부할 법정 외국소득세액입니다.
- **한도**: 해당 종합소득·퇴직소득 산출세액에 전체 소득 중 국외원천소득의 비율을 곱해 계산합니다. 감면·면제 대상 국외소득은 법정 조정을 적용합니다.
- **이월**: 종합소득 산출세액에서 공제하는 경우 한도 초과액은 다음 과세기간부터 10년 이내의 공제한도에서 이월공제합니다. 이월기간 종료 후 미공제액은 법정 요건에 따라 필요경비에 산입합니다. 퇴직소득 공제에 이 이월규정을 그대로 적용하지 않습니다.
- **추가 요건**: 조세조약상 간주납부세액과 외국법인 배당 관련 출자자 과세에는 별도 법정 요건이 있습니다. 국가별 계산·증빙 등 시행령상 절차를 확인해야 합니다.
