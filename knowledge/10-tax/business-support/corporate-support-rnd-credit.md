---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/CorporateTaxSupports",
  "basis_year": 2026,
  "id": "corporate.support.rnd-credit",
  "title": "연구·인력개발비 세액공제",
  "type": "corporate-tax-support",
  "description": "일반, 신성장·원천기술, 국가전략기술 연구개발비에 대한 세액공제입니다.",
  "parents": [
    "category.corporate-tax-supports"
  ],
  "children": [],
  "related": [
    "credit.research-and-development"
  ],
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
      "label": "일반 연구개발",
      "condition": "일반 연구·인력개발비는 법정 요건에 따라 증가액 방식 또는 당기발생액 방식을 선택합니다. 증가액은 전년 초과분에 일반 25%·중견 40%·중소 50%를 적용합니다. 직전 4년 비용이 없거나 전년 비용이 직전 4년 평균보다 적으면 당기발생액 방식만 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "당기발생액 방식",
      "condition": "중소기업은 25%, 법정 중소 졸업기업은 최초 3년 20%·다음 2년 15%, 그 밖의 중견기업은 8%입니다. 나머지는 매출액 중 일반 연구개발비 비율의 절반을 공제율로 하되 2%가 한도입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "신성장·국가전략",
      "condition": "신성장·원천기술은 중소 30%·법정 졸업기업 25%·그 외 20%, 국가전략기술은 각각 40%·35%·30%에 법정 매출 대비 비율에 따른 최대 10%포인트를 더합니다. 기술별 적격비용 구분경리가 필요하며 신성장·국가전략 중복 적용은 선택해야 합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "기간·비용 범위",
      "condition": "신성장·국가전략 비용은 2029년 12월 31일까지, 국가전략 중 반도체 분야는 2031년 12월 31일까지 발생분이 대상입니다. 시설투자 공제와 구분하고 시행령상 인정 비용·기술 및 기업분류를 확인합니다.",
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
    "path": "opentax/disclosures/d879706ea0a46c274cefb292.json",
    "checksum": "sha256:0584460da7356292cbb4cd2f819a79052c6bfaac4fd98f9dd596a66dda79a90a",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "corporate.support.rnd-credit",
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
        "value": "corporate.support.rnd-credit"
      }
    }
  ],
  "search_projection": {
    "id": "corporate.support.rnd-credit",
    "title": "연구·인력개발비 세액공제",
    "type": "corporate-tax-support",
    "description": "일반, 신성장·원천기술, 국가전략기술 연구개발비에 대한 세액공제입니다.",
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
    "search_text": "연구·인력개발비 세액공제 일반, 신성장·원천기술, 국가전략기술 연구개발비에 대한 세액공제입니다."
  },
  "record_checksum": "sha256:c3767c1e1240bb81bef2c49dd4e6c78fccd04661db7ea8acb5cea43a69a52ec4"
}
---

# 연구·인력개발비 세액공제

일반, 신성장·원천기술, 국가전략기술 연구개발비에 대한 세액공제입니다.

- **일반 연구개발**: 일반 연구·인력개발비는 법정 요건에 따라 증가액 방식 또는 당기발생액 방식을 선택합니다. 증가액은 전년 초과분에 일반 25%·중견 40%·중소 50%를 적용합니다. 직전 4년 비용이 없거나 전년 비용이 직전 4년 평균보다 적으면 당기발생액 방식만 적용합니다.
- **당기발생액 방식**: 중소기업은 25%, 법정 중소 졸업기업은 최초 3년 20%·다음 2년 15%, 그 밖의 중견기업은 8%입니다. 나머지는 매출액 중 일반 연구개발비 비율의 절반을 공제율로 하되 2%가 한도입니다.
- **신성장·국가전략**: 신성장·원천기술은 중소 30%·법정 졸업기업 25%·그 외 20%, 국가전략기술은 각각 40%·35%·30%에 법정 매출 대비 비율에 따른 최대 10%포인트를 더합니다. 기술별 적격비용 구분경리가 필요하며 신성장·국가전략 중복 적용은 선택해야 합니다.
- **기간·비용 범위**: 신성장·국가전략 비용은 2029년 12월 31일까지, 국가전략 중 반도체 분야는 2031년 12월 31일까지 발생분이 대상입니다. 시설투자 공제와 구분하고 시행령상 인정 비용·기술 및 기업분류를 확인합니다.
