---
{
  "id": "credit.child",
  "title": "자녀 세액공제",
  "type": "tax-credit",
  "description": "기본공제대상 자녀·손자녀 및 출산·입양에 대한 세액공제입니다. 2026년 연령 기준은 개정법 부칙과 출생연도 예외를 함께 적용합니다.",
  "parents": [
    "category.tax-credits"
  ],
  "children": [],
  "related": [
    "support.child-tax-credit",
    "scenario.dual-income-personal-deduction"
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
      "label": "자녀 1명",
      "basis": "2026년 귀속 기본공제대상 자녀·손자녀",
      "condition": "1명; 2026년 9세 이상 기준 및 2017년 출생자 예외는 부칙 제2조 적용",
      "deduction_krw": 250000,
      "source": "source.law.income-tax-act.deductions-credits",
      "age_min": 9,
      "criteria_kind": "deduction",
      "basis_category": "official-standard",
      "basis_definition": "해당 제도에서 대상 여부, 세율, 공제액, 한도 또는 신고기한을 판정하기 위해 공식 출처가 사용하는 기준항목입니다.",
      "basis_lookup": "각 criterion의 출처 노드와 관련 신고·신청 서류에서 확인합니다.",
      "selection_rule": "조건 문구와 구조화된 금액·비율·기간 필드를 함께 보고 해당 구간 또는 요건을 선택합니다.",
      "basis_source": "source.law.income-tax-act.deductions-credits",
      "law_reference": "소득세법 제59조의2",
      "tax_year": 2026,
      "note": "2027년 10세·2028년 11세·2029년 12세 이상 경과규정. 2017년 출생자는 부칙 제2조 제3항에 따라 경과규정 제외."
    },
    {
      "label": "자녀 2명",
      "basis": "2026년 귀속 기본공제대상 자녀·손자녀",
      "condition": "2명; 2026년 9세 이상 기준 및 2017년 출생자 예외는 부칙 제2조 적용",
      "deduction_krw": 550000,
      "source": "source.law.income-tax-act.deductions-credits",
      "age_min": 9,
      "criteria_kind": "deduction",
      "basis_category": "official-standard",
      "basis_definition": "해당 제도에서 대상 여부, 세율, 공제액, 한도 또는 신고기한을 판정하기 위해 공식 출처가 사용하는 기준항목입니다.",
      "basis_lookup": "각 criterion의 출처 노드와 관련 신고·신청 서류에서 확인합니다.",
      "selection_rule": "조건 문구와 구조화된 금액·비율·기간 필드를 함께 보고 해당 구간 또는 요건을 선택합니다.",
      "basis_source": "source.law.income-tax-act.deductions-credits",
      "law_reference": "소득세법 제59조의2",
      "tax_year": 2026,
      "note": "2027년 10세·2028년 11세·2029년 12세 이상 경과규정. 2017년 출생자는 부칙 제2조 제3항에 따라 경과규정 제외."
    },
    {
      "label": "자녀 3명 이상",
      "basis": "2026년 귀속 기본공제대상 자녀·손자녀",
      "condition": "3명 이상; 2026년 9세 이상 기준 및 2017년 출생자 예외는 부칙 제2조 적용",
      "deduction_krw": 550000,
      "note": "2명을 초과하는 1명당 40만원 추가 2027년 10세·2028년 11세·2029년 12세 이상 경과규정. 2017년 출생자는 부칙 제2조 제3항에 따라 경과규정 제외.",
      "source": "source.law.income-tax-act.deductions-credits",
      "age_min": 9,
      "criteria_kind": "deduction",
      "basis_category": "official-standard",
      "basis_definition": "해당 제도에서 대상 여부, 세율, 공제액, 한도 또는 신고기한을 판정하기 위해 공식 출처가 사용하는 기준항목입니다.",
      "basis_lookup": "각 criterion의 출처 노드와 관련 신고·신청 서류에서 확인합니다.",
      "selection_rule": "조건 문구와 구조화된 금액·비율·기간 필드를 함께 보고 해당 구간 또는 요건을 선택합니다.",
      "basis_source": "source.law.income-tax-act.deductions-credits",
      "law_reference": "소득세법 제59조의2",
      "tax_year": 2026
    },
    {
      "label": "출산·입양 첫째",
      "basis": "출산·입양 신고 자녀",
      "condition": "첫째",
      "deduction_krw": 300000,
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "deduction",
      "basis_category": "official-standard",
      "basis_definition": "해당 제도에서 대상 여부, 세율, 공제액, 한도 또는 신고기한을 판정하기 위해 공식 출처가 사용하는 기준항목입니다.",
      "basis_lookup": "각 criterion의 출처 노드와 관련 신고·신청 서류에서 확인합니다.",
      "selection_rule": "조건 문구와 구조화된 금액·비율·기간 필드를 함께 보고 해당 구간 또는 요건을 선택합니다.",
      "basis_source": "source.law.income-tax-act.deductions-credits",
      "law_reference": "소득세법 제59조의2"
    },
    {
      "label": "출산·입양 둘째",
      "basis": "출산·입양 신고 자녀",
      "condition": "둘째",
      "deduction_krw": 500000,
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "deduction",
      "basis_category": "official-standard",
      "basis_definition": "해당 제도에서 대상 여부, 세율, 공제액, 한도 또는 신고기한을 판정하기 위해 공식 출처가 사용하는 기준항목입니다.",
      "basis_lookup": "각 criterion의 출처 노드와 관련 신고·신청 서류에서 확인합니다.",
      "selection_rule": "조건 문구와 구조화된 금액·비율·기간 필드를 함께 보고 해당 구간 또는 요건을 선택합니다.",
      "basis_source": "source.law.income-tax-act.deductions-credits",
      "law_reference": "소득세법 제59조의2"
    },
    {
      "label": "출산·입양 셋째 이상",
      "basis": "출산·입양 신고 자녀",
      "condition": "셋째 이상",
      "deduction_krw": 700000,
      "source": "source.law.income-tax-act.deductions-credits",
      "criteria_kind": "deduction",
      "basis_category": "official-standard",
      "basis_definition": "해당 제도에서 대상 여부, 세율, 공제액, 한도 또는 신고기한을 판정하기 위해 공식 출처가 사용하는 기준항목입니다.",
      "basis_lookup": "각 criterion의 출처 노드와 관련 신고·신청 서류에서 확인합니다.",
      "selection_rule": "조건 문구와 구조화된 금액·비율·기간 필드를 함께 보고 해당 구간 또는 요건을 선택합니다.",
      "basis_source": "source.law.income-tax-act.deductions-credits",
      "law_reference": "소득세법 제59조의2"
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
    "path": "opentax/disclosures/07f710452d5086df8d3c1721.json",
    "checksum": "sha256:c4d21cd0ad1c4dc369d567a8e94f6e0f3551648a935b7355d2c902da2e2440a8",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:20.830416+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.income-tax-act.deductions-credits",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=280405&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "credit.child",
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
        "value": "credit.child"
      }
    }
  ],
  "search_projection": {
    "id": "credit.child",
    "title": "자녀 세액공제",
    "type": "tax-credit",
    "description": "기본공제대상 자녀·손자녀 및 출산·입양에 대한 세액공제입니다. 2026년 연령 기준은 개정법 부칙과 출생연도 예외를 함께 적용합니다.",
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
    "search_text": "자녀 세액공제 기본공제대상 자녀·손자녀 및 출산·입양에 대한 세액공제입니다. 2026년 연령 기준은 개정법 부칙과 출생연도 예외를 함께 적용합니다."
  },
  "record_checksum": "sha256:e9cbb8c51d84a475a050ae57bc3291a73538e69832c010a05e4696d50caa61cf"
}
---

# 자녀 세액공제

기본공제대상 자녀·손자녀 및 출산·입양에 대한 세액공제입니다. 2026년 연령 기준은 개정법 부칙과 출생연도 예외를 함께 적용합니다.

- **자녀 1명**: 1명; 2026년 9세 이상 기준 및 2017년 출생자 예외는 부칙 제2조 적용
- **자녀 2명**: 2명; 2026년 9세 이상 기준 및 2017년 출생자 예외는 부칙 제2조 적용
- **자녀 3명 이상**: 3명 이상; 2026년 9세 이상 기준 및 2017년 출생자 예외는 부칙 제2조 적용
- **출산·입양 첫째**: 첫째
- **출산·입양 둘째**: 둘째
- **출산·입양 셋째 이상**: 셋째 이상
