import catalog from "./free-catalog.json" with { type: "json" };

export const freeMetadata = {
  edition: catalog.edition, domain: catalog.domain, item_count: catalog.items.length,
  basis_date: catalog.basis_date, source_version: catalog.source_version,
  source_sha256: catalog.source_sha256,
  freshness: "not_revalidated", comparison_enabled: false, recommendation_enabled: false,
  full_website: "https://cocomo0412.github.io/OpenFin/",
  limitations: "세금·공제 스냅샷 검색·조회 전용. 금융상품 비교·추천 및 실시간 갱신은 제공하지 않습니다. 적용 전 공식 출처를 확인하세요.",
};
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
  return { ...freeMetadata, total_matches: matches.length,
    results: matches.slice(0, Math.max(1, Math.min(10, limit))).map(({ item }) => ({
      id: item.id, title: item.title, description: item.description, status: item.status,
      source_urls: item.source_urls, freshness: item.freshness,
    })) };
}
export function fetchFree(id: string) { return byId.get(id); }
