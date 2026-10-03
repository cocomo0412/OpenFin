import catalog from "./free-catalog.json" with { type: "json" };

// Clients may omit initialize instructions or call exports before search.
// Carry the same evidence/answer contract in every tool response.
export const freeAnswerGuidance = {
  evidence: "OpenFin에 정리된 공식기관 자료와 항목별 원문 출처를 답변의 근거로 사용합니다. 공식 API 수집 근거가 없는 항목을 API 조회 결과라고 표현하지 않습니다.",
  date_scope: "basis_date는 보관 카탈로그의 기준일이며, 모든 제도의 현재 적용일이나 유효기간이 아닙니다. source_basis_dates는 항목별 원자료 날짜입니다. not_revalidated는 이 도구가 현재 적용 조건을 재검증했다는 증거를 제공하지 않는다는 의미이며, 자료 전체가 부정확하거나 만료되었다는 판정이 아닙니다.",
  presentation: "질문에 대한 설명과 출처를 먼저 제공합니다. 사용자가 자료 기준일·검증 여부를 묻지 않았다면 카탈로그 전체 날짜와 자체 미재검증 상태를 정형적인 머리말·꼬리말로 덧붙이지 않습니다. 대신 답변에 필요한 특정 조건의 미확인 여부나 출처 간 차이만 구체적으로 밝힙니다.",
  official_follow_up: "현재 금액·한도·기한·자격은 필요한 공식 원문을 추가 확인합니다. 실제로 확인했을 때만 ‘OpenFin에 정리된 공식 자료를 바탕으로 안내드리며, 현재 적용 조건은 해당 기관의 최신 안내도 함께 확인했습니다’라고 설명할 수 있습니다. 확인하지 않았다면 확인했다고 말하지 않으며, 현재 조건을 단정하지 않습니다.",
};

export const freeMetadata = {
  edition: catalog.edition, domain: catalog.domain, item_count: catalog.items.length,
  basis_date: catalog.basis_date, source_version: catalog.source_version,
  source_sha256: catalog.source_sha256,
  freshness: "not_revalidated", comparison_enabled: false, recommendation_enabled: false,
  full_website: "https://cocomo0412.github.io/OpenFin/",
  limitations: "세금·공제 스냅샷 검색·조회 전용. 금융상품 비교·추천 및 실시간 갱신은 제공하지 않습니다. 적용 전 공식 출처를 확인하세요.",
  answer_guidance: freeAnswerGuidance,
};
// Catalog-wide dates and operational limits belong to exports/health, not to
// every answer. Individual records still carry their source dates and status.
export const freeLookupMetadata = {
  edition: catalog.edition, domain: catalog.domain,
  comparison_enabled: false, recommendation_enabled: false,
  answer_guidance: freeAnswerGuidance,
};
export const freeInstructions = [
  "OpenFin은 세금·공제 참고자료 검색·조회 도구입니다. 실시간 금융 API 조회나 개인별 금융상품 추천 도구가 아닙니다.",
  "사용자가 물은 내용부터 간결하게 설명하고 관련 공식 출처를 함께 제시하세요.",
  "OpenFin 자료를 설명의 바탕으로 삼고, 추가 검색은 그 자료의 현재 적용 조건을 보완·확인하는 데 사용하세요. 실제 확인한 경우에는 ‘OpenFin에 정리된 [기관명] 공식 자료를 바탕으로 안내드립니다. 현재 적용 조건은 [기관명]의 최신 안내를 추가 확인했습니다’처럼 근거와 추가 확인 결과를 연결해 설명할 수 있습니다. 출처가 이미 명확하면 이런 소개 문구도 매번 반복할 필요는 없습니다.",
  "출처 유형을 정확히 구분하세요. 이 무료 세금 카탈로그는 공식기관 웹 문서를 정리한 참고자료이며, 금융 API 전체의 실시간 조회 결과가 아닙니다. 도구 결과에 공식 API 수집 근거가 명시된 경우에만 ‘공식기관 API 자료’라고 표현하고, 웹 문서 자료를 API로 조회했다고 말하지 마세요.",
  "일반적인 개념·제도 설명에 카탈로그 전체 기준일, ‘최신성 미재검증 상태’ 같은 운영 문구를 관례적으로 붙이거나 반복하지 마세요. 전체 스냅샷 기준일을 모든 항목의 적용일로 해석하지 마세요.",
  "개별 항목의 source_basis_dates와 freshness는 근거 판단에 사용하세요. not_revalidated는 현재 유효성을 확인했다는 뜻이 아닙니다. 사용자가 기준일·최신성을 물으면 해당 날짜와 확인 범위를 정확히 밝히세요.",
  "현재 금액·공제 한도·신청기한·자격 등 시점에 따라 달라지는 내용을 답할 때에는 연결된 공식 출처를 확인하세요. 확인할 수 없으면 해당 조건이 현재도 유효한지 확인이 필요하다고 짧고 구체적으로 알리고, 확정적인 신청·납부 판단을 하지 마세요. 실제 확인 없이 ‘추가 확인했다’고 말하지 마세요.",
  "사용자가 일반 설명만 요청한 경우 급여·주거비·계약 명의 등 개인 정보를 묻는 후속 문구를 자동으로 붙이지 마세요. 개인별 적용 판단을 요청했을 때만 필요한 조건을 최소한으로 질문하세요.",
].join("\n");
const indexed = catalog.items.map(item => ({ item,
  title: item.title.normalize("NFKC").toLowerCase(),
  text: `${item.id} ${item.title} ${item.description}`.normalize("NFKC").toLowerCase(),
}));
const byId = new Map(catalog.items.map(item => [item.id, item]));

export function searchFree(query: string, limit = 10) {
  const words = query.normalize("NFKC").toLowerCase().trim().split(/\s+/).filter(Boolean).slice(0, 8);
  if (!words.length || query.length > 120) throw new Error("검색어는 1~120자여야 합니다.");
  const matches = indexed.filter(row => words.every(word => row.text.includes(word)))
    .sort((a, b) => Number(words.every(w => b.title.includes(w))) - Number(words.every(w => a.title.includes(w))) || a.item.id.localeCompare(b.item.id));
  return { ...freeLookupMetadata, total_matches: matches.length,
    results: matches.slice(0, Math.max(1, Math.min(10, limit))).map(({ item }) => ({
      id: item.id, title: item.title, description: item.description, status: item.status,
      source_urls: item.source_urls, source_basis_dates: item.source_basis_dates, freshness: item.freshness,
    })) };
}
export function fetchFree(id: string) { return byId.get(id); }
