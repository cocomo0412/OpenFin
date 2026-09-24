---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/CorporateTaxSupports",
  "basis_year": 2026,
  "id": "corporate.support.crisis-area-startup-reduction",
  "title": "위기지역 창업기업 감면",
  "type": "corporate-tax-support",
  "description": "위기지역 지정 또는 선포 기간에 창업하거나 사업장을 신설한 기업에 대한 감면입니다.",
  "parents": [
    "category.corporate-tax-supports"
  ],
  "children": [],
  "related": [],
  "terms": [
    "term.tax-credit",
    "term.tax-reduction"
  ],
  "tags": [
    "corporate-tax-support"
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
      "condition": "2028년 12월 31일까지 위기지역 지정·선포기간 중 대상 업종으로 창업하거나 사업장을 신설하고 법정 투자·고용 기준을 충족한 기업입니다. 기존 사업장의 이전은 제외합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "감면기간·율",
      "condition": "최초 소득 발생 과세연도 개시일부터 5년 이내 종료 과세연도까지 해당 사업소득의 세금 100%, 다음 2년 이내 종료 과세연도까지 50%를 감면합니다. 사업개시 후 5년간 소득이 없으면 법정 기산연도를 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "누적한도·추징",
      "condition": "감면기간 총한도는 법정 투자누계액 50%와 상시근로자 수 × 1,500만원을 합산합니다. 청년 및 법정 서비스업 근로자는 2천만원을 적용합니다. 인원감소·폐업·지역 외 이전에는 법정 추징 규정이 있습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.tax-special-treatment-restriction-act.reliefs"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0"
  ],
  "collected_at": "2026-09-23T08:26:25.182612+00:00",
  "source_collected_at": "2026-09-23T08:26:25.182612+00:00",
  "last_source_checked_at": "2026-09-23T08:26:25.182612+00:00",
  "last_reviewed_at": "2026-09-24",
  "reviewed_at": "2026-09-24",
  "refresh_generation": "2026-09-23T08:26:25.182612+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/d704b357d2e5e02220cdb3a2.json",
    "checksum": "sha256:a3996441339b5bf0889e26bef4a2a1f2d325d15ae4e3f9f84f9b0f749e136d2b",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "corporate.support.crisis-area-startup-reduction",
      "collected_at": "2026-09-23T08:26:25.182612+00:00",
      "reviewed_at": "2026-09-24T00:00:00+09:00",
      "checksum": "sha256:bf7a2db72fa6b5273f5e3b3483f49305d70145e3c4d3ef89e16b2b1b2280ae80",
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
        "value": "corporate.support.crisis-area-startup-reduction"
      }
    }
  ],
  "search_projection": {
    "id": "corporate.support.crisis-area-startup-reduction",
    "title": "위기지역 창업기업 감면",
    "type": "corporate-tax-support",
    "description": "위기지역 지정 또는 선포 기간에 창업하거나 사업장을 신설한 기업에 대한 감면입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.tax-special-treatment-restriction-act.reliefs"
    ],
    "export_id": "tax-ontology",
    "search_text": "위기지역 창업기업 감면 위기지역 지정 또는 선포 기간에 창업하거나 사업장을 신설한 기업에 대한 감면입니다."
  },
  "record_checksum": "sha256:b51634c61134379445a3a9b88601aceb42ef5c6edffc6f35e972ec262bb25479"
}
---

# 위기지역 창업기업 감면

위기지역 지정 또는 선포 기간에 창업하거나 사업장을 신설한 기업에 대한 감면입니다.

- **대상**: 2028년 12월 31일까지 위기지역 지정·선포기간 중 대상 업종으로 창업하거나 사업장을 신설하고 법정 투자·고용 기준을 충족한 기업입니다. 기존 사업장의 이전은 제외합니다.
- **감면기간·율**: 최초 소득 발생 과세연도 개시일부터 5년 이내 종료 과세연도까지 해당 사업소득의 세금 100%, 다음 2년 이내 종료 과세연도까지 50%를 감면합니다. 사업개시 후 5년간 소득이 없으면 법정 기산연도를 적용합니다.
- **누적한도·추징**: 감면기간 총한도는 법정 투자누계액 50%와 상시근로자 수 × 1,500만원을 합산합니다. 청년 및 법정 서비스업 근로자는 2천만원을 적용합니다. 인원감소·폐업·지역 외 이전에는 법정 추징 규정이 있습니다.
