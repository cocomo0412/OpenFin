---
{
  "deadlines": [
    "deadline.vat.periodic",
    "deadline.vat.general.first-final",
    "deadline.vat.general.second-final",
    "deadline.vat.simplified.annual"
  ],
  "requires": [
    "eligibility-rule.vat-taxpayer-type"
  ],
  "folder": "10_Taxes/National",
  "basis_year": 2026,
  "id": "tax.value-added",
  "title": "부가가치세",
  "type": "tax",
  "description": "일반과세와 간이과세의 판정 기준, 매출세액 계산 및 납부의무 면제를 구분합니다. 매출액·공급가액·공급대가·매출세액은 서로 다른 기준입니다.",
  "parents": [
    "category.national-taxes"
  ],
  "children": [
    "concept.general-vat-taxpayer",
    "concept.simple-vat-taxpayer",
    "concept.vat-payment-exemption"
  ],
  "related": [
    "category.business-tax-compliance",
    "local.local-consumption",
    "filing.business-registration",
    "filing.vat-return",
    "scenario.sole-proprietor.compliance",
    "eligibility-rule.vat-taxpayer-type",
    "concept.additional-tax.general",
    "support.small-business-policy-fund",
    "life-event.small-business-operating-funds"
  ],
  "terms": [
    "term.national-tax",
    "term.tax-period",
    "term.general-vat-taxpayer",
    "term.simple-vat-taxpayer",
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
      "label": "일반세율",
      "condition": "과세표준인 공급가액에 10%를 적용해 매출세액을 계산합니다. 매출세액에 다시 10%를 곱하는 방식이 아닙니다. 영세율·면세·불공제매입세액은 별도 요건에 따릅니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.value-added-tax-act.filing",
      "criteria_kind": "disclosure"
    },
    {
      "label": "간이과세 판정",
      "condition": "원칙적으로 직전 연도 공급대가 1억400만원 미만인 개인사업자에 적용합니다. 부동산임대업·과세유흥장소의 4,800만원 기준, 배제업종, 다른 사업장 및 복수 사업장 합산, 신규사업자의 연환산 등 예외를 함께 확인합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.value-added-tax-act.filing",
      "criteria_kind": "disclosure"
    },
    {
      "label": "간이과세 산식",
      "condition": "공급대가 × 업종별 부가가치율 × 10%에서 법정 공제세액을 뺍니다. 부가가치율 자체에 다시 15~40%를 곱하는 방식이 아닙니다. 겸영 업종은 각각 계산합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.value-added-tax-act.filing",
      "criteria_kind": "disclosure"
    },
    {
      "label": "업종별 부가가치율",
      "condition": "소매·음식점 등 15%, 제조·농림어업·소화물 전문 운송 등 20%, 숙박업 25%, 건설·운수창고(소화물 제외)·정보통신 등 30%, 법정 금융보험 관련·전문과학기술·사업지원·부동산 관련 서비스 등 40%, 그 밖의 서비스업 30%입니다. 국세청의 세부 업종 구분을 확인합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.value-added-tax-act.filing",
      "criteria_kind": "disclosure"
    },
    {
      "label": "매입 공제",
      "condition": "간이과세자는 적격 증빙과 제출요건을 충족한 재화·용역 공급대가의 0.5% 등을 공제합니다. 공제금액 합계가 납부세액을 초과하는 부분은 없는 것으로 봅니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.value-added-tax-act.filing",
      "criteria_kind": "disclosure"
    },
    {
      "label": "납부의무 면제",
      "condition": "해당 과세기간의 공급대가가 4,800만원 미만이면 법정 납부의무 면제를 적용합니다. 직전연도 매출 기준이 아니며, 신규·휴폐업·과세유형 전환 등은 연환산하고 제64조 가산 세액 등 예외를 구분합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.value-added-tax-act.filing",
      "criteria_kind": "disclosure"
    },
    {
      "label": "예정신고",
      "condition": "예정부과기간 중 법정 세금계산서를 발급한 간이과세자는 예정신고 대상입니다. 일반 과세유형 판정과 예정신고 의무를 동일한 매출 구간만으로 판단하지 않습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.value-added-tax-act.filing",
      "criteria_kind": "disclosure"
    }
  ],
  "sources": [
    "source.law.value-added-tax-act.filing",
    "source.nts.vat.overview"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
    "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7693&mi=2272"
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
    "path": "opentax/disclosures/563440d48ae061525ac9acd3.json",
    "checksum": "sha256:8f58adec8215ccd44b08c4d70d3c2a41d46f208ba5d654d6421ca77f463c1998",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:24.306633+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.value-added-tax-act.filing",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
      "source_record_id": "tax.value-added",
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
        "value": "tax.value-added"
      }
    }
  ],
  "search_projection": {
    "id": "tax.value-added",
    "title": "부가가치세",
    "type": "tax",
    "description": "일반과세와 간이과세의 판정 기준, 매출세액 계산 및 납부의무 면제를 구분합니다. 매출액·공급가액·공급대가·매출세액은 서로 다른 기준입니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=276117&chrClsCd=010202&urlMode=lsInfoP&efYd=20260102&ancYnChk=0",
      "https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?cntntsId=7693&mi=2272"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.value-added-tax-act.filing"
    ],
    "export_id": "tax-ontology",
    "search_text": "부가가치세 일반과세와 간이과세의 판정 기준, 매출세액 계산 및 납부의무 면제를 구분합니다. 매출액·공급가액·공급대가·매출세액은 서로 다른 기준입니다."
  },
  "record_checksum": "sha256:33973dbf6543f3e479c163fe4f5c0c32d6a6b7f96c0e57e78c281bfcc9976353"
}
---

# 부가가치세

일반과세와 간이과세의 판정 기준, 매출세액 계산 및 납부의무 면제를 구분합니다. 매출액·공급가액·공급대가·매출세액은 서로 다른 기준입니다.

- **일반세율**: 과세표준인 공급가액에 10%를 적용해 매출세액을 계산합니다. 매출세액에 다시 10%를 곱하는 방식이 아닙니다. 영세율·면세·불공제매입세액은 별도 요건에 따릅니다.
- **간이과세 판정**: 원칙적으로 직전 연도 공급대가 1억400만원 미만인 개인사업자에 적용합니다. 부동산임대업·과세유흥장소의 4,800만원 기준, 배제업종, 다른 사업장 및 복수 사업장 합산, 신규사업자의 연환산 등 예외를 함께 확인합니다.
- **간이과세 산식**: 공급대가 × 업종별 부가가치율 × 10%에서 법정 공제세액을 뺍니다. 부가가치율 자체에 다시 15~40%를 곱하는 방식이 아닙니다. 겸영 업종은 각각 계산합니다.
- **업종별 부가가치율**: 소매·음식점 등 15%, 제조·농림어업·소화물 전문 운송 등 20%, 숙박업 25%, 건설·운수창고(소화물 제외)·정보통신 등 30%, 법정 금융보험 관련·전문과학기술·사업지원·부동산 관련 서비스 등 40%, 그 밖의 서비스업 30%입니다. 국세청의 세부 업종 구분을 확인합니다.
- **매입 공제**: 간이과세자는 적격 증빙과 제출요건을 충족한 재화·용역 공급대가의 0.5% 등을 공제합니다. 공제금액 합계가 납부세액을 초과하는 부분은 없는 것으로 봅니다.
- **납부의무 면제**: 해당 과세기간의 공급대가가 4,800만원 미만이면 법정 납부의무 면제를 적용합니다. 직전연도 매출 기준이 아니며, 신규·휴폐업·과세유형 전환 등은 연환산하고 제64조 가산 세액 등 예외를 구분합니다.
- **예정신고**: 예정부과기간 중 법정 세금계산서를 발급한 간이과세자는 예정신고 대상입니다. 일반 과세유형 판정과 예정신고 의무를 동일한 매출 구간만으로 판단하지 않습니다.
