---
{
  "deadlines": [
    "deadline.business-registration.application"
  ],
  "requires": [
    "required-document.small-business-registration"
  ],
  "folder": "60_Business",
  "basis_year": 2026,
  "id": "filing.business-registration",
  "title": "사업자등록 신청",
  "type": "filing",
  "description": "신규사업자가 사업 개시 전 또는 사업 개시일부터 20일 이내 관할 세무서장에게 등록하는 절차입니다. 일반과세자·간이과세자 유형 선택과 간이과세 배제 업종 확인을 함께 관리합니다.",
  "parents": [
    "category.business-tax-compliance"
  ],
  "children": [],
  "related": [
    "tax.value-added",
    "concept.general-vat-taxpayer",
    "concept.simple-vat-taxpayer",
    "filing.vat-return",
    "life-event.first-vat-return",
    "required-document.small-business-registration"
  ],
  "terms": [
    "term.general-vat-taxpayer",
    "term.simple-vat-taxpayer"
  ],
  "tags": [
    "business-compliance"
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
      "label": "신청기한",
      "condition": "사업장마다 사업 개시일부터 20일 이내에 사업자등록을 신청합니다. 사업 개시 전에도 신청할 수 있습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.value-added-tax-act.filing",
      "criteria_kind": "disclosure"
    },
    {
      "label": "신청 방식",
      "condition": "관할 세무서 외 다른 세무서에도 신청할 수 있습니다. 사업자 단위 과세 등록, 추가 사업장 개설 및 변경등록에는 별도 기한과 요건이 적용됩니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.value-added-tax-act.filing",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.value-added-tax-act.filing"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0"
  ],
  "collected_at": "2026-09-23T08:26:24.306633+00:00",
  "source_collected_at": "2026-09-23T08:26:24.306633+00:00",
  "last_source_checked_at": "2026-09-23T08:26:24.306633+00:00",
  "last_reviewed_at": "2026-09-23T08:26:24.306633+00:00",
  "reviewed_at": "2026-09-23T08:26:24.306633+00:00",
  "refresh_generation": "2026-09-23T08:26:24.306633+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/ae358915de332cce83daa2d1.json",
    "checksum": "sha256:5a8b5d2b3c244c4bcbb7e9adfcf2e801ae4fe933c3dd5ed6b4d583d0ab2fa744",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:24.306633+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.value-added-tax-act.filing",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
      "source_record_id": "filing.business-registration",
      "collected_at": "2026-09-23T08:26:24.306633+00:00",
      "reviewed_at": "2026-09-23T08:26:24.306633+00:00",
      "checksum": "sha256:5184bc889a7758b16e563761bb6f3f77e87860e9b82d856b6e2e3d2239900879",
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
        "value": "filing.business-registration"
      }
    }
  ],
  "search_projection": {
    "id": "filing.business-registration",
    "title": "사업자등록 신청",
    "type": "filing",
    "description": "신규사업자가 사업 개시 전 또는 사업 개시일부터 20일 이내 관할 세무서장에게 등록하는 절차입니다. 일반과세자·간이과세자 유형 선택과 간이과세 배제 업종 확인을 함께 관리합니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.value-added-tax-act.filing"
    ],
    "export_id": "tax-ontology",
    "search_text": "사업자등록 신청 신규사업자가 사업 개시 전 또는 사업 개시일부터 20일 이내 관할 세무서장에게 등록하는 절차입니다. 일반과세자·간이과세자 유형 선택과 간이과세 배제 업종 확인을 함께 관리합니다."
  },
  "record_checksum": "sha256:71da296a249399a33426ec5def4d754ab59f789a589419ae5c6b2b89163cb489"
}
---

# 사업자등록 신청

신규사업자가 사업 개시 전 또는 사업 개시일부터 20일 이내 관할 세무서장에게 등록하는 절차입니다. 일반과세자·간이과세자 유형 선택과 간이과세 배제 업종 확인을 함께 관리합니다.

- **신청기한**: 사업장마다 사업 개시일부터 20일 이내에 사업자등록을 신청합니다. 사업 개시 전에도 신청할 수 있습니다.
- **신청 방식**: 관할 세무서 외 다른 세무서에도 신청할 수 있습니다. 사업자 단위 과세 등록, 추가 사업장 개설 및 변경등록에는 별도 기한과 요건이 적용됩니다.
