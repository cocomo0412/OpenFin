---
{
  "deadlines": [
    "deadline.local.resident"
  ],
  "folder": "10_Taxes/Local",
  "basis_year": 2026,
  "id": "local.resident",
  "title": "주민세",
  "type": "tax",
  "description": "지방자치단체에 주소를 둔 개인에 대한 주민세입니다. 원칙적으로 1만원 이하 범위의 조례상 세액이며 법정 주민청구가 있으면 1만5천원 이하로 읍면동별 차등 설정할 수 있습니다.",
  "parents": [
    "category.local-ordinary-taxes"
  ],
  "children": [],
  "related": [],
  "terms": [
    "term.local-tax"
  ],
  "tags": [
    "local-tax"
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
      "label": "개인분",
      "condition": "지방자치단체에 주소를 둔 개인에 대한 주민세입니다. 원칙적으로 1만원 이하 범위의 조례상 세액이며 법정 주민청구가 있으면 1만5천원 이하로 읍면동별 차등 설정할 수 있습니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제74조·지방세법 제78조·지방세법 제81조·지방세법 제84조의3"
    },
    {
      "label": "사업소분",
      "condition": "사업소의 기본세액과 연면적 세액을 구분합니다. 개인사업소 기본세액은 5만원, 법인은 자본금 등에 따라 5만·10만·20만원입니다. 연면적 표준세액은 ㎡당 250원이며 법정 오염물질 배출 사업소는 500원입니다. 면세점·조례 조정은 별도 확인합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제74조·지방세법 제78조·지방세법 제81조·지방세법 제84조의3"
    },
    {
      "label": "종업원분",
      "condition": "사업소 종업원의 급여총액에 표준세율 0.5%를 적용하며 법정 면세점과 조례에 따른 세율 조정을 확인합니다.",
      "basis": "공식 공시 원문",
      "source": "source.law.local-tax-act.rates",
      "criteria_kind": "disclosure",
      "law_reference": "지방세법 제74조·지방세법 제78조·지방세법 제81조·지방세법 제84조의3"
    }
  ],
  "sources": [
    "source.law.local-tax-act.rates"
  ],
  "source_urls": [
    "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
  ],
  "collected_at": "2026-09-23T08:26:22.571307+00:00",
  "source_collected_at": "2026-09-23T08:26:22.571307+00:00",
  "last_source_checked_at": "2026-09-23T08:26:22.571307+00:00",
  "last_reviewed_at": "2026-09-23T08:26:22.571307+00:00",
  "reviewed_at": "2026-09-23T08:26:22.571307+00:00",
  "refresh_generation": "2026-09-23T08:26:22.571307+00:00",
  "review_scope": "공식 공시의 식별자·본문·필드 연결 확인",
  "source_listing_status": "listed",
  "source_freshness_status": "current",
  "freshness_status": "current",
  "verification_status": "listing_only",
  "sales_verification_status": "listed_unverified",
  "current_disclosure": {
    "path": "opentax/disclosures/eef0f93b6fe0625cbd363ade.json",
    "checksum": "sha256:fc9efb2f8bb7412e44375e72c0ee22154b8577e3dc541a70ad27bb4ef61c15fc",
    "checksum_scope": "normalized-disclosure-json",
    "source_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
    "collected_at": "2026-09-23T08:26:22.571307+00:00"
  },
  "provenance": [
    {
      "source_id": "source.law.local-tax-act.rates",
      "original_url": "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0",
      "source_record_id": "local.resident",
      "collected_at": "2026-09-23T08:26:22.571307+00:00",
      "reviewed_at": "2026-09-23T08:26:22.571307+00:00",
      "checksum": "sha256:9f5ef4724aa36b1f62bd0e36aa912309144e85c3e1bc880c960e66d467418995",
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
        "value": "local.resident"
      }
    }
  ],
  "search_projection": {
    "id": "local.resident",
    "title": "주민세",
    "type": "tax",
    "description": "지방자치단체에 주소를 둔 개인에 대한 주민세입니다. 원칙적으로 1만원 이하 범위의 조례상 세액이며 법정 주민청구가 있으면 1만5천원 이하로 읍면동별 차등 설정할 수 있습니다.",
    "status": "reference_only",
    "sales_status": "unknown",
    "source_urls": [
      "https://www.law.go.kr/LSW//lsInfoR.do?lsiSeq=282559&chrClsCd=010202&urlMode=lsInfoP&efYd=20260701&ancYnChk=0"
    ],
    "freshness_status": "current",
    "recommendation_status": "reference_only",
    "recommendation_scope": "listing_only",
    "source_ids": [
      "source.law.local-tax-act.rates"
    ],
    "export_id": "tax-ontology",
    "search_text": "주민세 지방자치단체에 주소를 둔 개인에 대한 주민세입니다. 원칙적으로 1만원 이하 범위의 조례상 세액이며 법정 주민청구가 있으면 1만5천원 이하로 읍면동별 차등 설정할 수 있습니다."
  },
  "record_checksum": "sha256:121f9a9c6230621a8029ba8e32792685fe489570c9becacf09b0c046ab08f051"
}
---

# 주민세

지방자치단체에 주소를 둔 개인에 대한 주민세입니다. 원칙적으로 1만원 이하 범위의 조례상 세액이며 법정 주민청구가 있으면 1만5천원 이하로 읍면동별 차등 설정할 수 있습니다.

- **개인분**: 지방자치단체에 주소를 둔 개인에 대한 주민세입니다. 원칙적으로 1만원 이하 범위의 조례상 세액이며 법정 주민청구가 있으면 1만5천원 이하로 읍면동별 차등 설정할 수 있습니다.
- **사업소분**: 사업소의 기본세액과 연면적 세액을 구분합니다. 개인사업소 기본세액은 5만원, 법인은 자본금 등에 따라 5만·10만·20만원입니다. 연면적 표준세액은 ㎡당 250원이며 법정 오염물질 배출 사업소는 500원입니다. 면세점·조례 조정은 별도 확인합니다.
- **종업원분**: 사업소 종업원의 급여총액에 표준세율 0.5%를 적용하며 법정 면세점과 조례에 따른 세율 조정을 확인합니다.
