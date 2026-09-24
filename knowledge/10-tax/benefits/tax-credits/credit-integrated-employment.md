---
{
  "deadlines": [
    "deadline.corporate-tax.return"
  ],
  "folder": "20_Deductions/TaxCredits",
  "basis_year": 2026,
  "id": "credit.integrated-employment",
  "title": "통합고용세액공제",
  "type": "tax-credit",
  "description": "고용 증가, 청년·장애인·경력단절자 등 정책 대상 고용에 대한 세액공제입니다.",
  "parents": [
    "category.tax-credits"
  ],
  "children": [],
  "related": [
    "support.youth-job-leap-incentive"
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
      "label": "2026~2028년 구조",
      "condition": "해당 연도 인원을 직전 1·2·3개 연도와 법정 방식으로 비교합니다. 2024년 말 이전 개시 과세연도는 비교에서 제외하며, 2·3년 비교에는 중간 연도 인원의 최솟값을 사용합니다. 단순히 전년 대비 증가인원에 동일 단가를 곱하는 방식이 아닙니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "중소기업 청년 등",
      "condition": "청년 정규직·장애인·60세 이상·법정 경력단절 근로자 등의 1·2·3년 비교 증가분에 각각 700만원·1,600만원·1,700만원을 적용합니다. 수도권 밖 증가는 각각 1,000만원·1,900만원·2,000만원입니다. 각 음수 금액은 0이며 전체 증가인원 한도를 적용합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "중소기업 일반 근로자",
      "condition": "청년 등 외 근로자의 1·2·3년 비교 증가분 단가는 400만원·900만원·1,000만원, 수도권 밖은 700만원·1,200만원·1,300만원입니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "중견기업 등",
      "condition": "중견기업 청년 등 단가는 500만원·900만원·900만원, 일반은 300만원·500만원·500만원입니다. 그 밖의 기업은 청년 등 1·2년 비교분에 300만원·500만원을 적용합니다. 중소기업 외에는 최소고용증가인원 초과 요건과 제1항 제3호의 차감 산식이 추가됩니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.tax-special-treatment-restriction-act.reliefs",
      "criteria_kind": "disclosure"
    },
    {
      "label": "추가 특례·환수",
      "condition": "법정 육아휴직 복귀자를 2026년 말까지 복직시키면 중소기업 1,300만원·중견기업 900만원 공제를 검토하되 고용감소 시 제외합니다. 복직 전 1년 근무·연속 6개월 육아휴직 등 요건과 2년 내 근로관계 종료 시 환수 규정이 있습니다. 정규직 전환 특례는 2024년 전환분 규정으로 구분합니다.",
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
    "path": "opentax/disclosures/f83d29f74c3f89df5cfc5c4e.json",
    "checksum": "sha256:26c21b2274a52f38f94504c9e31cc3fe488399455f24efbc47e4e9a1ed8647c1",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:25.182612+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.tax-special-treatment-restriction-act.reliefs",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=284389&chrClsCd=010202&urlMode=lsInfoP&efYd=20260918&ancYnChk=0",
      "source_record_id": "credit.integrated-employment",
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
        "value": "credit.integrated-employment"
      }
    }
  ],
  "search_projection": {
    "id": "credit.integrated-employment",
    "title": "통합고용세액공제",
    "type": "tax-credit",
    "description": "고용 증가, 청년·장애인·경력단절자 등 정책 대상 고용에 대한 세액공제입니다.",
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
    "search_text": "통합고용세액공제 고용 증가, 청년·장애인·경력단절자 등 정책 대상 고용에 대한 세액공제입니다."
  },
  "record_checksum": "sha256:07d69acdee1b930ce5c0efebaa2452d0dbc597e254fe146ec35f1082691d0c4e"
}
---

# 통합고용세액공제

고용 증가, 청년·장애인·경력단절자 등 정책 대상 고용에 대한 세액공제입니다.

- **2026~2028년 구조**: 해당 연도 인원을 직전 1·2·3개 연도와 법정 방식으로 비교합니다. 2024년 말 이전 개시 과세연도는 비교에서 제외하며, 2·3년 비교에는 중간 연도 인원의 최솟값을 사용합니다. 단순히 전년 대비 증가인원에 동일 단가를 곱하는 방식이 아닙니다.
- **중소기업 청년 등**: 청년 정규직·장애인·60세 이상·법정 경력단절 근로자 등의 1·2·3년 비교 증가분에 각각 700만원·1,600만원·1,700만원을 적용합니다. 수도권 밖 증가는 각각 1,000만원·1,900만원·2,000만원입니다. 각 음수 금액은 0이며 전체 증가인원 한도를 적용합니다.
- **중소기업 일반 근로자**: 청년 등 외 근로자의 1·2·3년 비교 증가분 단가는 400만원·900만원·1,000만원, 수도권 밖은 700만원·1,200만원·1,300만원입니다.
- **중견기업 등**: 중견기업 청년 등 단가는 500만원·900만원·900만원, 일반은 300만원·500만원·500만원입니다. 그 밖의 기업은 청년 등 1·2년 비교분에 300만원·500만원을 적용합니다. 중소기업 외에는 최소고용증가인원 초과 요건과 제1항 제3호의 차감 산식이 추가됩니다.
- **추가 특례·환수**: 법정 육아휴직 복귀자를 2026년 말까지 복직시키면 중소기업 1,300만원·중견기업 900만원 공제를 검토하되 고용감소 시 제외합니다. 복직 전 1년 근무·연속 6개월 육아휴직 등 요건과 2년 내 근로관계 종료 시 환수 규정이 있습니다. 정규직 전환 특례는 2024년 전환분 규정으로 구분합니다.
