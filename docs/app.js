// allow: SIZE_OK -- static GitHub Pages app kept dependency-free; split if a bundler is introduced.
const DATA_BASE = "./opentax/";
const MANIFEST_FILE = "finance-ontology-manifest.json";
const MAX_RESULTS = 120;
const SEARCH_DEBOUNCE_MS = 90;
const RATE_QUERY_RE = /(금리|최고금리|중도해지|정기예금|적금|대출|개월)/i;
const PROTECTION_QUERY_RE = /(예금자보호|보호대상|보호상품|kdic|보호)/i;
const GENERIC_SEARCH_TYPES = new Set(["category", "term", "domain", "source"]);
const TAX_DECISION_TYPES = new Set(["tax-credit", "deduction"]);
const TAX_SEARCH_ALIASES = {
  "credit.medical-expense": ["연말정산 의료비 세액공제 한도 대상", "의료비 세액공제 한도 대상"],
  "credit.monthly-rent": ["월세 세액공제 조건", "월세액 세액공제 조건"],
  "credit.education-expense": ["교육비 세액공제 대상"],
  "credit.pension-account": ["연금계좌 세액공제 한도"],
  "deduction.credit-card-use": ["신용카드 소득공제 한도", "신용카드 등 사용금액 소득공제 한도"],
};

const DOMAIN_META = {
  tax: {
    label: "세금·공제",
    short: "Tax",
    className: "tax",
    summary: "세금, 공제, 신고기한, 중앙 정책지원 핵심 노드",
  },
  "local-government-supports": {
    label: "지자체 지원금",
    short: "Local Supports",
    className: "local",
    summary: "정부24 보조금24 기준 전국 지자체 지원사업",
  },
  "card-products": {
    label: "카드 상품",
    short: "Cards",
    className: "card",
    summary: "신용카드·체크카드 혜택, 카드대출, 리볼빙, 전월실적, 한도",
  },
  "deposit-products": {
    label: "정기예금 상품",
    short: "Deposits",
    className: "bank",
    summary: "예금 팩: 예치기간별 금리, 최고우대금리, 가입한도, 우대조건",
  },
  "saving-products": {
    label: "적금 상품",
    short: "Savings",
    className: "bank",
    summary: "적금 팩: 적립방식, 기간별 금리, 납입한도, 우대조건",
  },
  "loan-products": {
    label: "대출 상품",
    short: "Loans",
    className: "bank",
    summary: "대출 팩: 주택담보·전세·개인신용·정책대출 금리, 한도, 상환방식",
  },
  "insurance-products": {
    label: "보험 상품",
    short: "Insurance",
    className: "insurance",
    summary: "보험료, 보장, 면책, 갱신, 약관 출처",
  },
  "pension-products": {
    label: "연금저축 상품",
    short: "Pension",
    className: "pension",
    summary: "연금저축보험·펀드·신탁의 공시이율, 최저보증이율, 과거수익률, 연금계좌 세액공제 연계",
  },
  "tax-advantaged-accounts": {
    label: "세제혜택 계좌",
    short: "Accounts",
    className: "account",
    summary: "주택청약종합저축·청년 주택드림 청약통장·ISA의 가입대상, 납입한도, 세제혜택, 소득공제·청약 연계",
  },
  "finance-reference": {
    label: "금융 기준정보",
    short: "Reference",
    className: "unknown",
    summary: "금융회사, 기준금리, 보험 리스크, 투자·정책금융 후보 출처",
  },
};

const numberFormat = new Intl.NumberFormat("ko-KR");
const state = {
  manifest: null,
  sourceRegistry: new Map(),
  sourceStatus: new Map(),
  evidenceErrors: new Map(),
  provenanceShards: new Map(),
  provenanceShardInflight: new Map(),
  provenanceSelectionToken: 0,
  currentDomain: "all",
  visibleLimit: MAX_RESULTS,
  resultKey: "",
  pendingTypeFilter: null,
  restoreToken: 0,
  items: [],
  loadedDomains: new Map(),
  itemIndex: new Map(),
  searchIndexLoaded: false,
  selectedId: "",
  isLoadingAll: false,
  searchTimer: null,
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  bindStaticControls();
  renderLoadingTabs();

  try {
    state.manifest = await fetchJson(DATA_BASE + MANIFEST_FILE);
    try { state.collectionInventory = await fetchJson(DATA_BASE + 'collection-inventory.json'); }
    catch { state.collectionInventory = null; }
    try { state.apiLinks = (await fetchJson(DATA_BASE + 'api-record-links.json')).records; } catch { state.apiLinks = {}; }
    await Promise.all([loadSourceRegistry(), loadSourceStatus()]);
    updateManifestUI();
    renderOperationalSummary();
    renderExportCards();
    renderDomainTabs();

    if (document.querySelector("[data-results]")) await restoreExplorerUrl({ preserveTypedQuery: true });
  } catch (error) {
    showFatalError(error);
  }
}

// Keep one history entry per live search, avoiding a Back step for every keystroke.
function syncExplorerUrl() {
  if (!document.querySelector("[data-results]")) return;
  const params = new URLSearchParams(window.location.search);
  const query = document.querySelector("[data-search]")?.value.trim() || "";
  const type = document.querySelector("[data-type-filter]")?.value || "";
  for (const [key, value] of [["q", query], ["domain", state.currentDomain === "all" ? "" : state.currentDomain], ["type", type]]) {
    if (value) params.set(key, value); else params.delete(key);
  }
  if (state.currentDomain === "all" && !query && state.searchIndexLoaded) params.set("scope", "all");
  else params.delete("scope");
  const search = params.toString();
  history.replaceState(null, "", `${window.location.pathname}${search ? "?" + search : ""}${window.location.hash || ""}`);
}

async function restoreExplorerUrl({ preserveTypedQuery = false } = {}) {
  if (!state.manifest || !document.querySelector("[data-results]")) return;
  const token = ++state.restoreToken;
  const params = new URLSearchParams(window.location.search);
  const input = document.querySelector("[data-search]");
  if (input && (params.has("q") || !preserveTypedQuery)) input.value = params.get("q") || "";
  state.pendingTypeFilter = params.get("type") || "";
  let hashId = "";
  try { hashId = decodeURIComponent(window.location.hash.replace(/^#/, "")); } catch { /* Invalid fragments select no item. */ }
  const domain = params.get("domain");
  clearSelectedItem();
  if (domain && findExport(domain)) {
    await loadDomain(domain);
  } else if (hashId || params.get("scope") === "all" || input?.value.trim() || state.searchIndexLoaded || state.pendingTypeFilter) {
    await loadAllDomains();
  } else {
    state.currentDomain = "all";
    markActiveDomainTab();
    updateTypeFilter();
    setResultSummary("분야를 선택하거나 검색어를 입력하세요.");
  }
  if (token !== state.restoreToken) return;
  const selected = currentItems().find(item => item.id === hashId);
  const query = normalize(input?.value || "");
  const type = document.querySelector("[data-type-filter]")?.value || "";
  if (selected && (!query || scoreItem(selected, query) > 0) && (!type || selected.type === type) && isSearchVisible(selected, query)) selectItem(hashId);
}

async function loadSourceRegistry() {
  state.sourceRegistry = new Map();
  const descriptor = state.manifest?.source_registry;
  if (!descriptor) {
    state.evidenceErrors.set("source-registry", "출처 레지스트리가 manifest에 없습니다.");
    return;
  }

  const fileName = typeof descriptor === "string"
    ? descriptor.split("/").pop()
    : descriptor.basename || fileNameFromEntry(descriptor);
  if (!fileName) {
    state.evidenceErrors.set("source-registry", "출처 레지스트리 경로를 확인할 수 없습니다.");
    return;
  }

  try {
    const payload = await fetchJson(DATA_BASE + fileName);
    const rawEntries = Array.isArray(payload)
      ? payload
      : payload?.items || payload?.sources || payload?.records || payload?.registry || [];
    const entries = Array.isArray(rawEntries)
      ? rawEntries
      : rawEntries && typeof rawEntries === "object"
        ? Object.values(rawEntries)
        : [];
    for (const entry of entries) {
      const sourceId = entry?.id || entry?.source_id;
      if (sourceId) state.sourceRegistry.set(sourceId, entry);
    }
  } catch (error) {
    state.evidenceErrors.set("source-registry", "출처 레지스트리를 불러오지 못했습니다.");
    console.warn("OpenFin source registry is unavailable; continuing with item provenance.", error);
  }
}

async function loadSourceStatus() {
  state.sourceStatus = new Map();
  const descriptor = state.manifest?.source_status;
  if (!descriptor) {
    state.evidenceErrors.set("source-status", "출처 상태 산출물이 manifest에 없습니다.");
    return;
  }
  const fileName = typeof descriptor === "string"
    ? descriptor.split("/").pop()
    : descriptor.basename || fileNameFromEntry(descriptor);
  if (!fileName) {
    state.evidenceErrors.set("source-status", "출처 상태 산출물 경로를 확인할 수 없습니다.");
    return;
  }
  try {
    const payload = await fetchJson(DATA_BASE + fileName);
    const entries = Array.isArray(payload) ? payload : payload?.statuses || payload?.items || [];
    for (const entry of entries) {
      const sourceId = entry?.id || entry?.source_id;
      if (sourceId) state.sourceStatus.set(sourceId, entry);
    }
  } catch (error) {
    state.evidenceErrors.set("source-status", "출처 최신 상태를 불러오지 못했습니다.");
    console.warn("OpenFin source status is unavailable; freshness is unknown.", error);
  }
}

function bindStaticControls() {
  document.querySelector("[data-search]")?.addEventListener("input", () => {
    ++state.restoreToken;
    window.clearTimeout(state.searchTimer);
    state.searchTimer = window.setTimeout(renderSearchInput, SEARCH_DEBOUNCE_MS);
  });
  document.querySelector("[data-type-filter]")?.addEventListener("change", () => { ++state.restoreToken; renderResults(); });
  window.addEventListener?.("popstate", () => { void restoreExplorerUrl().catch(showFatalError); });
  document.querySelector("[data-load-more]")?.addEventListener("click", showMoreResults);

  document.querySelectorAll("[data-domain]").forEach((node) => {
    node.addEventListener("click", async (event) => {
      ++state.restoreToken;
      const domain = event.currentTarget.dataset.domain;
      if (!domain) return;
      event.preventDefault();
      if (domain === "all") {
        await loadAllDomains();
      } else {
        await loadDomain(domain);
      }
      document.querySelector("#explorer")?.scrollIntoView({ block: "start" });
    });
  });
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store", headers: { accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`${url} 로딩 실패: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

function updateManifestUI() {
  const manifest = state.manifest;
  const exports = manifest.exports || [];
  const exportItemTotal = exports.reduce((sum, item) => sum + Number(item.item_count || 0), 0);
  const totalItems = Number(manifest.search_index?.item_count || manifest.item_count || manifest.unique_item_count || exportItemTotal);
  const productItems = exports.reduce((sum, item) => sum + Number(item.product_count || 0), 0);
  const localCount = exports.find((item) => item.domain === "local-government-supports")?.item_count || 0;
  const versionShort = String(manifest.version || "").replace("-2026.05.05.1", "");
  const sourceReviewDate = manifest.canonical_refresh?.collected_at?.slice(0,10) || manifest.source_review_date || manifest.basis_date || "unknown";
  const productCollectionDates = financeCollectionLabel(manifest);

  setText("[data-version]", manifest.version || "unknown");
  setText("[data-version-short]", versionShort || "KR-FINANCE-ONTOLOGY");
  setText("[data-basis-date]", manifest.api_collection?.basis_date || manifest.basis_date || "unknown");
  setText("[data-basis-date-short]", manifest.api_collection?.basis_date || manifest.basis_date || "unknown");
  setText("[data-source-review-date]", sourceReviewDate);
  setText("[data-product-collection-dates]", productCollectionDates || "미기록");
  setText("[data-total-items]", `${formatNumber(totalItems)} items`);
  setText("[data-total-items-plain]", formatNumber(totalItems));
  setText("[data-export-count]", formatNumber(exports.length));
  setText("[data-product-count]", formatNumber(productItems));
  setText("[data-local-count]", formatNumber(localCount));

  exports.forEach((entry) => {
    document.querySelectorAll(`[data-domain-count="${entry.domain}"]`).forEach((node) => {
      node.textContent = formatNumber(entry.item_count || 0);
    });
  });
}

function renderExportCards() {
  const grid = document.querySelector("[data-export-grid]");
  if (!grid) return;

  grid.innerHTML = (state.manifest.exports || [])
    .map((entry) => {
      const meta = domainMeta(entry.domain);
      const collectionMeta = collectionMetaForEntry(entry, state.manifest);
      return `
        <article class="export-card ${meta.className}" data-domain="${escapeAttribute(entry.domain)}">
          <span class="domain-chip">${escapeHtml(meta.label)}</span>
          <h3>${escapeHtml(meta.short)}</h3>
          <div class="export-count">
            <strong>${formatNumber(entry.item_count || 0)}</strong>
            <span>개 자료</span>
          </div>
          <p>${escapeHtml(entry.description || meta.summary)}</p>
          <p class="export-metadata">상품 자료 ${formatNumber(entry.product_count || 0)}개</p>
          <p class="export-metadata export-file-date">파일 갱신일 ${escapeHtml(dateOnly(state.manifest.built_at) || '미기록')}</p>
          ${entry.catalog_refresh
            ? `<p class="export-metadata">최근 자료 수집 ${escapeHtml(dateOnly(entry.catalog_refresh.latest))}<br>공식 자료 반영 ${formatNumber(entry.catalog_refresh.count)}개 · 일부 과거 자료 포함</p>`
            : '<p class="export-metadata">자료 갱신 필요 · 원문 재검증 미완료</p>'}
          <details class="export-metadata export-date-history"><summary>원자료 수집 이력</summary><p>${escapeHtml(collectionMeta.label)} ${escapeHtml(collectionMeta.value)}<br>파일 갱신일은 모든 원자료의 현행화를 뜻하지 않습니다.</p></details>
          ${renderApiCollectionLink(entry.domain)}
          <a class="export-open" href="explorer.html?domain=${escapeAttribute(entry.domain)}" aria-label="${escapeAttribute(meta.label)} 탐색기 열기"><svg class="export-open-icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M2.5 8V5a1.5 1.5 0 0 1 1.5-1.5h4l2 2h6A1.5 1.5 0 0 1 17.5 7v1M3.5 16.5h12a1.5 1.5 0 0 0 1.46-1.16l1.16-5A1.5 1.5 0 0 0 16.66 8.5H4a1.5 1.5 0 0 0-1.49 1.66L3 15.5a1.1 1.1 0 0 0 .5 1Z"/></svg><span>Explorer Open</span></a>
        </article>
      `;
    })
    .join("");
}

function financeCollectionLabel(manifest) {
  if (manifest.canonical_refresh?.collected_at) {
    return `${dateOnly(manifest.canonical_refresh.collected_at)} · API 갱신분 (분야별 수집일은 아래 카드)`;
  }
  const labels = {
    "card-products": "카드",
    "deposit-products": "예금",
    "saving-products": "적금",
    "loan-products": "대출",
    "insurance-products": "보험",
    "tax-advantaged-accounts": "세제혜택 계좌",
  };
  return (manifest.exports || [])
    .filter((entry) => Number(entry.product_count || 0) > 0)
    .map((entry) => {
      const dates = productCollectionDatesForEntry(entry);
      return dates ? `${labels[entry.domain] || entry.domain} ${dates}` : "";
    })
    .filter(Boolean)
    .join(" · ");
}

function uniqueDateValues(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.filter(Boolean).map((date) => String(date).slice(0, 10)))].filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date));
}

function productCollectionDatesForEntry(entry) {
  return uniqueDateValues(entry.product_collection_dates).join(", ");
}

function collectionDatesForEntry(entry) {
  return uniqueDateValues(entry.collection_dates || entry.product_collection_dates).join(", ");
}

function dateOnly(value) {
  const date = String(value || "").slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : "";
}

function collectionMetaForEntry(entry, manifest) {
  const dates = collectionDatesForEntry(entry);
  if (dates) return { label: "자료 수집일", value: dates };
  const reviewDate = dateOnly(entry.source_review_date || entry.basis_date);
  return { label: "원자료 기준일", value: reviewDate || "미기록" };
}

function renderLoadingTabs() {
  const tabs = document.querySelector("[data-domain-tabs]");
  if (tabs) {
    tabs.innerHTML = `<button type="button" class="active">분야를 불러오는 중</button>`;
  }
}

function renderDomainTabs() {
  const tabs = document.querySelector("[data-domain-tabs]");
  if (!tabs) return;

  const buttons = [
    `<button type="button" data-tab-domain="all">전체</button>`,
    ...(state.manifest.exports || []).map((entry) => {
      const meta = domainMeta(entry.domain);
      return `<button type="button" data-tab-domain="${escapeHtml(entry.domain)}">${escapeHtml(meta.label)}</button>`;
    }),
  ];
  tabs.innerHTML = buttons.join("");

  tabs.querySelectorAll("[data-tab-domain]").forEach((button) => {
    button.addEventListener("click", async () => {
      ++state.restoreToken;
      const domain = button.dataset.tabDomain;
      if (domain === "all") {
        await loadAllDomains();
      } else {
        await loadDomain(domain);
      }
    });
  });

  markActiveDomainTab();
}

async function loadDomain(domain, options = {}) {
  if (!domain) return;
  const { render = true, preserveCurrentDomain = false } = options;
  if (!preserveCurrentDomain) {
    state.currentDomain = domain;
    markActiveDomainTab();
  }
  if (render) setResultSummary(`${domainMeta(domain).label} 데이터를 로딩 중입니다.`);

  if (!state.loadedDomains.has(domain)) {
    const entry = findExport(domain);
    if (!entry) {
      setResultSummary(`${domain} export를 manifest에서 찾을 수 없습니다.`);
      return;
    }
    const payload = await fetchJson(DATA_BASE + fileNameFromEntry(entry));
    if(payload.storage_format==='openfin-sharded-export-v1') {
      const parts=[];
      for(let i=0;i<payload.shards.length;i+=3) parts.push(...await Promise.all(payload.shards.slice(i,i+3).map(shard=>fetchJson(DATA_BASE+fileNameFromEntry(shard)))));
      payload.items=parts.flatMap(part=>part.items||[]);
      payload.reference_items=parts.flatMap(part=>part.reference_items||[]);
    }
    const items = [...(payload.reference_items || []), ...(payload.items || [])].map((item) => ({
      ...item,
      __domain: domain,
      __exportId: entry.id,
    }));
    state.loadedDomains.set(domain, items);
    mergeItems(items);
  }

  if (render && state.currentDomain === domain) {
    updateTypeFilter();
    renderResults();
    selectFirstVisibleResult();
  }
}

async function loadSearchIndex() {
  if (state.searchIndexLoaded) return;
  const descriptor = state.manifest?.search_index;
  const fileName = descriptor && fileNameFromEntry(descriptor);
  if (!fileName) throw new Error("manifest에 compact search index가 없습니다.");
  const payload = await fetchJson(DATA_BASE + fileName);
  const items = (payload.items || []).map((item) => ({
    ...item,
    __compact: true,
    __domain: findExportById(item.export_id)?.domain || "finance-reference",
  }));
  mergeItems(items);
  state.searchIndexLoaded = true;
}

async function loadAllDomains() {
  state.currentDomain = "all";
  markActiveDomainTab();
  setResultSummary("전체 분야의 검색 자료를 로딩 중입니다.");
  if (state.isLoadingAll) return;
  state.isLoadingAll = true;

  try {
    await loadSearchIndex();
    // The user may have selected a domain while the index was loading.
    if (state.currentDomain !== "all") return;
    markActiveDomainTab();
    updateTypeFilter();
    renderResults();
  } finally {
    state.isLoadingAll = false;
  }
}

function mergeItems(items) {
  for (const item of items) {
    indexSearchItem(item);
    if (!state.itemIndex.has(item.id)) {
      state.items.push(item);
      state.itemIndex.set(item.id, item);
    }
  }
}

function indexSearchItem(item) {
  item.__searchTitle = normalize(item.title || "");
  item.__searchId = normalize(item.id || "");
  item.__searchType = normalize(item.search_type || item.product_kind || "");
  item.__searchAliases = (TAX_SEARCH_ALIASES[item.id] || []).map(normalize);
  item.__searchText = normalize([
    item.id,
    item.title,
    item.type,
    item.description,
    item.provider,
    item.financial_sector,
    item.product_kind,
    item.search_type,
    item.product_code,
    item.jurisdiction,
    item.status,
    item.status_reason,
    item.status_confidence,
    item.recommendation_status,
    ...(TAX_SEARCH_ALIASES[item.id] || []),
    structuredSearchText(item.criteria, 4),
    structuredSearchText(item.options, 3),
    structuredSearchText(item.benefits, 3),
    structuredSearchText(item.provenance, 4),
    ...(item.tags || []),
    ...(item.sources || []),
    ...(item.source_urls || []),
  ].filter(Boolean).join(" "));
  item.__searchTokens = item.__searchTitle.split(/\s+/).filter(Boolean);
}

async function renderSearchInput() {
  // init will pick up input entered before the manifest is available.
  if (!state.manifest) return;
  if (state.isLoadingAll) {
    if (state.currentDomain !== "all" && state.loadedDomains.has(state.currentDomain)) renderResults();
    return;
  }
  if (!state.searchIndexLoaded && state.loadedDomains.size === 0) {
    if (!normalize(document.querySelector("[data-search]")?.value || "")) {
      setResultSummary("분야를 선택하거나 검색어를 입력하세요.");
      return;
    }
    try {
      await loadAllDomains();
    } catch (error) {
      if (state.currentDomain === "all") {
        setResultSummary("검색 데이터를 불러오지 못했습니다. 검색어를 다시 입력하거나 전체를 선택해 재시도하세요.");
      }
      console.warn("OpenFin search index is unavailable.", error);
    }
    return;
  }
  renderResults();
}

function renderResults({ append = false } = {}) {
  const container = document.querySelector("[data-results]");
  if (!container) return;

  const query = normalize(document.querySelector("[data-search]")?.value || "");
  const type = document.querySelector("[data-type-filter]")?.value || "";
  const sourceItems = currentItems();
  const filtered = sourceItems
    .map((item, index) => ({ item, index, score: scoreItem(item, query) }))
    .filter(({ item, score }) => (!query || score > 0) && (!type || item.type === type) && isSearchVisible(item, query))
    .sort((a, b) => (query ? b.score - a.score : a.index - b.index) || a.item.title.localeCompare(b.item.title, "ko-KR"));
  const resultKey = JSON.stringify([state.currentDomain, query, type]);
  if (!append || resultKey !== state.resultKey) state.visibleLimit = MAX_RESULTS;
  state.resultKey = resultKey;
  if (state.selectedId && !filtered.some(({ item }) => item.id === state.selectedId)) clearSelectedItem();
  const visible = filtered.slice(0, state.visibleLimit);
  const previousCount = container.querySelectorAll("[data-select-id]").length;
  const previousScroll = container.scrollTop;
  const more = document.querySelector("[data-load-more]");
  if (more) {
    more.hidden = filtered.length <= visible.length;
    more.textContent = `더 보기 (${formatNumber(visible.length)} / ${formatNumber(filtered.length)})`;
  }

  setResultSummary(resultSummary(filtered.length, sourceItems.length, visible.length));
  container.innerHTML = visible.map(({ item }) => resultItemHtml(item)).join("") || `<p class="empty-state">검색 결과가 없습니다.</p>`;

  container.querySelectorAll("[data-select-id]").forEach((button) => {
    button.addEventListener("click", () => selectItem(button.dataset.selectId));
  });

  markActiveResult();
  syncExplorerUrl();
  if (append) {
    container.scrollTop = previousScroll;
    container.querySelectorAll("[data-select-id]")[previousCount]?.focus();
  }
}

function showMoreResults() {
  state.visibleLimit += MAX_RESULTS;
  renderResults({ append: true });
}

function clearSelectedItem() {
  state.selectedId = "";
  ++state.provenanceSelectionToken;
  const panel = document.querySelector("[data-detail-panel]");
  if (panel) panel.innerHTML = '<p class="empty-state">검색 결과를 선택하면 설명과 자료 기준일, 출처를 확인할 수 있습니다.</p>';
  if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
}

function resultSummary(filteredCount, sourceCount, visibleCount) {
  const scope = state.currentDomain === "all" ? "전체 분야" : domainMeta(state.currentDomain).label;
  if (!sourceCount) return `${scope}: 검색어를 입력하거나 분야를 선택하세요.`;
  if (filteredCount > visibleCount) {
    return `${scope}: ${formatNumber(filteredCount)}개 중 ${formatNumber(visibleCount)}개 표시`;
  }
  return `${scope}: ${formatNumber(filteredCount)}개 표시`;
}

function resultItemHtml(item) {
  const meta = domainMeta(item.__domain);
  const status = item.status || item.product_status || item.abolition_status || "";
  const freshness = freshnessStatusForItem(item);
  const freshnessWarning = ["stale", "degraded", "unreachable", "changed", "conflict", "retired"].includes(freshness);
  return `
    <button type="button" class="result-item" data-domain="${escapeAttribute(item.__domain || "")}" data-select-id="${escapeAttribute(item.id)}">
      <strong>${escapeHtml(item.title || item.id)}</strong>
      <div class="item-meta">
        <span class="domain-chip">${escapeHtml(meta.label)}</span>
        <span>${escapeHtml(typeLabel(item.type))}</span>
        ${status ? `<span class="status-chip ${escapeAttribute(statusClass(status))}">${escapeHtml(statusLabel(status))}</span>` : ""}
        <span class="status-chip freshness-${escapeAttribute(freshness)}${freshnessWarning ? ' freshness-warning' : ''}">${escapeHtml(freshnessLabel(freshness))}</span>
        ${item.provider ? `<span>${escapeHtml(item.provider)}</span>` : ""}
        ${item.source_listing_status === 'listed' && item.recommendation_scope === 'listing_only' ? '<span>공식 목록 수록 · 신청·가입 가능 여부 미확인</span>' : ''}
      </div>
      <p>${escapeHtml(item.description || "설명이 없습니다.")}</p>
    </button>
  `;
}

function freshnessStatusForSource(source, now = Date.now()) {
  if (!source) return "unknown";
  const failClosed = ["stale", "degraded", "unreachable", "changed", "conflict", "retired"];
  const explicitStatuses = [source.source_freshness_status, source.freshness_status, source.status].filter(Boolean);
  const failClosedStatus = explicitStatuses.find((status) => failClosed.includes(status));
  if (failClosedStatus) return failClosedStatus;
  const checkedAt = source.last_successful_checked_at || source.checked_at;
  const slaHours = Number(source.refresh?.sla_hours);
  if (checkedAt && Number.isFinite(slaHours) && slaHours >= 0) {
    const checkedMs = Date.parse(checkedAt);
    if (Number.isFinite(checkedMs) && now - checkedMs > slaHours * 60 * 60 * 1000) return "stale";
  }
  return explicitStatuses[0] || "unknown";
}

function sourceIdsForItem(item) {
  const refs = ["source_ids", "sources", "provenance", "provenances", "source_assertions"]
    .flatMap(key => Array.isArray(item?.[key]) ? item[key] : []);
  if (item?.type === "source") refs.push(item.id);
  return [...new Set(refs.map(ref => typeof ref === "string" ? ref : ref?.source_id || ref?.id).filter(Boolean))];
}

function freshnessStatusForItem(item) {
  const ids = sourceIdsForItem(item);
  const statuses = ids.map(id => freshnessStatusForSource(state.sourceStatus.get(id)));
  statuses.push(...[item?.source_freshness_status, item?.freshness_status].filter(Boolean));
  const warning = statuses.find(status => ["stale", "degraded", "unreachable", "changed", "conflict", "retired"].includes(status));
  if (warning) return warning;
  if (statuses.some(status => !["current", "ready"].includes(status))) return "unknown";
  return statuses[0] || "unknown";
}

function selectFirstVisibleResult() {
  const first = document.querySelector("[data-results] [data-select-id]");
  const visibleSelected = [...document.querySelectorAll("[data-results] [data-select-id]")]
    .some((button) => button.dataset.selectId === state.selectedId);
  if (first && !visibleSelected) {
    selectItem(first.dataset.selectId, { updateHash: false });
  } else if (state.selectedId) {
    const selected = state.itemIndex.get(state.selectedId);
    if (selected) {
      renderDetail(selected);
      void hydrateSelectedProvenance(selected, state.provenanceSelectionToken);
    }
  }
}

function selectItem(id, options = {}) {
  if (!id) return;
  const item = state.itemIndex.get(id);
  if (!item) {
    renderMissingItem(id);
    return;
  }

  state.selectedId = id;
  const selectionToken = ++state.provenanceSelectionToken;
  renderDetail(item);
  if (item.__compact) {
    void hydrateSelectedItem(item, selectionToken);
  } else {
    void hydrateSelectedProvenance(item, selectionToken);
  }
  markActiveResult();

  if (options.updateHash !== false) {
    history.replaceState(null, "", `#${encodeURIComponent(id)}`);
    const panel = document.querySelector("[data-detail-panel]");
    if (panel && window.matchMedia?.("(max-width: 1060px)").matches) {
      panel.focus({ preventScroll: true });
      panel.scrollIntoView({ block: "start" });
    }
  }
}

async function hydrateSelectedItem(item, selectionToken) {
  const domain = item.__domain;
  if (!domain) return;
  try {
    await loadDomain(domain, { render: false, preserveCurrentDomain: true });
  } catch {
    if (selectionToken === state.provenanceSelectionToken && state.selectedId === item.id) {
      const panel = document.querySelector("[data-detail-panel]");
      if (panel) panel.insertAdjacentHTML?.("beforeend", '<p class="evidence-warning" role="status">상세 자료를 불러오지 못했습니다. 자료를 다시 선택해 주세요.</p>');
    }
    return;
  }
  if (selectionToken !== state.provenanceSelectionToken || state.selectedId !== item.id) return;
  const detail = (state.loadedDomains.get(domain) || []).find((candidate) => candidate.id === item.id);
  if (!detail) return;
  state.itemIndex.set(detail.id, detail);
  const index = state.items.findIndex((candidate) => candidate.id === detail.id);
  if (index >= 0) state.items[index] = detail;
  renderDetail(detail);
  await hydrateSelectedProvenance(detail, selectionToken);
}

function provenanceShardDescriptorFor(item) {
  const descriptor = item?.provenance_shard;
  if (!descriptor) return null;
  const shards = Array.isArray(state.manifest?.provenance_index?.shards)
    ? state.manifest.provenance_index.shards
    : [];
  const requested = typeof descriptor === "string"
    ? descriptor
    : descriptor.shard_id || descriptor.id || descriptor.basename || descriptor.path || descriptor.url || "";
  const requestedBase = String(requested).split("/").pop();
  const match = shards.find((shard) => {
    const values = [shard?.id, shard?.shard_id, shard?.basename, shard?.path, shard?.url, shard?.web_url];
    return values.some((value) => value && (value === requested || String(value).split("/").pop() === requestedBase));
  });
  if (match) return typeof descriptor === "object" ? { ...match, ...descriptor } : match;
  return typeof descriptor === "object" ? descriptor : { basename: requestedBase };
}

async function loadProvenanceShard(descriptor) {
  if (!descriptor) return null;
  const fileName = descriptor.basename || fileNameFromEntry(descriptor);
  if (!fileName) return null;
  const cacheKey = descriptor.id || descriptor.shard_id || fileName;
  if (state.provenanceShards.has(cacheKey)) return state.provenanceShards.get(cacheKey);
  if (state.provenanceShardInflight.has(cacheKey)) return state.provenanceShardInflight.get(cacheKey);

  const request = (async () => {
    try {
      const payload = await fetchJson(DATA_BASE + fileName);
      const rawRecords = Array.isArray(payload)
        ? payload
        : payload?.items || payload?.records || payload?.provenance || payload?.data || [];
      const records = Array.isArray(rawRecords)
        ? rawRecords
        : rawRecords && typeof rawRecords === "object"
          ? Object.values(rawRecords)
          : [];
      const index = new Map();
      for (const record of records) {
        const id = record?.id || record?.item_id || record?.itemId;
        if (id) index.set(id, record);
      }
      state.provenanceShards.set(cacheKey, index);
      return index;
    } catch (error) {
      state.evidenceErrors.set(`provenance:${cacheKey}`, `근거 인덱스 ${fileName} 로드에 실패했습니다.`);
      renderOperationalSummary();
      console.warn(`OpenFin provenance shard unavailable: ${fileName}`, error);
      return null;
    }
  })();
  state.provenanceShardInflight.set(cacheKey, request);
  try {
    return await request;
  } finally {
    if (state.provenanceShardInflight.get(cacheKey) === request) {
      state.provenanceShardInflight.delete(cacheKey);
    }
  }
}

async function hydrateSelectedProvenance(item, selectionToken) {
  const descriptor = provenanceShardDescriptorFor(item);
  if (!descriptor) return;
  const shard = await loadProvenanceShard(descriptor);
  if (!shard || selectionToken !== state.provenanceSelectionToken || state.selectedId !== item.id) {
    if (!shard && selectionToken === state.provenanceSelectionToken && state.selectedId === item.id) renderDetail(item);
    return;
  }
  const record = shard.get(item.id);
  const rawProvenance = record?.provenance || record?.provenances || record?.source_assertions;
  const provenance = Array.isArray(rawProvenance) && rawProvenance === record?.source_assertions
    ? rawProvenance.map((entry) => ({
      ...entry,
      original_url: entry?.original_url || entry?.source_url,
    }))
    : rawProvenance;
  if (!Array.isArray(provenance) || !provenance.length) return;
  const existing = Array.isArray(item.provenance) ? item.provenance : [];
  const merged = [...existing, ...provenance].filter((entry, index, entries) => {
    const key = `${entry?.source_id || entry?.id || ""}|${entry?.original_url || entry?.source_url || ""}|${entry?.checksum || ""}`;
    return entries.findIndex((candidate) => `${candidate?.source_id || candidate?.id || ""}|${candidate?.original_url || candidate?.source_url || ""}|${candidate?.checksum || ""}` === key) === index;
  });
  item.provenance = merged;
  renderDetail(item);
}

function renderDetail(item) {
  const panel = document.querySelector("[data-detail-panel]");
  if (!panel) return;

  const meta = domainMeta(item.__domain);
  const kv = pickFields(item, [
    ["provider", "제공기관"],
    ["financial_sector", "금융권역"],
    ["product_kind", "상품 종류"],
    ["status", "자료 상태"],
    ["status_reason", "상태 설명"],
    ["product_status", "상품 상태"],
    ["sales_status", "판매 상태"],
    ["recommendation_status", "이용 범위"],
    ["effective_from", "적용 시작일"],
    ["effective_to", "적용 종료일"],
    ["application_open_from", "신청 시작일"],
    ["application_open_to", "신청 마감일"],
    ["disclosure_month", "공시월"],
    ["basis_year", "자료 기준연도"],
    ["reviewed_at", "자료 검토일"],
    ["rate_reviewed_at", "금리 검토일"],
    ["sales_status_reviewed_at", "판매 상태 검토일"],
    ["eligibility_reviewed_at", "가입 조건 검토일"],
    ["benefit_reviewed_at", "혜택 검토일"],
    ["coverage_reviewed_at", "보장 검토일"],
    ["last_verified_at", "마지막 확인일"],
    ["source_modified_at", "원자료 수정일"],
    ["jurisdiction", "적용 지역"],
    ["law_reference", "관련 법령"],
  ]);

  panel.innerHTML = `
    <button type="button" class="detail-back" data-back-results>← 검색 결과로 돌아가기</button>
    <span class="domain-chip" data-domain="${escapeAttribute(item.__domain || '')}">${escapeHtml(meta.label)}</span>
    <h3>${escapeHtml(item.title || item.id)}</h3>
    <p class="detail-description">${escapeHtml(item.description || "설명이 없습니다.")}</p>
    <p class="detail-freshness">${escapeHtml(freshnessLabel(freshnessStatusForItem(item)))}</p>
    ${kv.length ? renderKvGrid(kv.map(([label, value]) => [label, /상태|이용 범위/.test(label) ? statusLabel(value) : value])) : ""}
    ${renderSources(item)}
    ${renderCurrentApi(item)}
    ${item.refresh_generation ? `<section class="detail-section"><h4>공식 자료 반영 · ${escapeHtml(item.refresh_generation.slice(0,10))}</h4><p>공식 API·공시 자료를 본문과 검색 데이터에 반영했습니다. 제공기관의 관측·공시 기준일과 개인별 적합성 검증은 별도입니다.</p>${item.raw ? `<details><summary>반영된 원문 필드 보기</summary>${renderKvGrid(Object.entries(item.raw).map(([k,v])=>[k,typeof v==='object'?JSON.stringify(v):String(v??'미제공')]))}</details>`:''}</section>` : ''}
    ${renderEvidenceAvailability(item)}
    ${renderPopulationNotice(item)}
    ${renderStructuredFacts("상품 혜택·보장", item.benefits)}
    ${renderStructuredFacts("조건·유의사항", item.conditions)}
    ${renderCriteria(item.criteria)}
    ${renderOptions(item.options)}
    ${renderNeighbors(item)}
  `;
  panel.querySelector("[data-back-results]")?.addEventListener("click", () => {
    const selected = [...document.querySelectorAll("[data-select-id]")].find(button => button.dataset.selectId === state.selectedId);
    const target = selected || document.querySelector("[data-search]");
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: "center" });
  });
}

function renderApiCollectionLink(domain) {
  const source = {'deposit-products':['source.fss.finlife.api','deposit'], 'saving-products':['source.fss.finlife.api','saving'],
    'loan-products':['source.data.go.kr.kinfa-loan-products',''], 'insurance-products':['source.fsc.medical-reimbursement-insurance',''],
    'finance-reference':['source.bok.ecos',''], 'local-government-supports':['source.gov24.benefit-plus.local-supports','serviceList']}[domain];
  if (!source || !state.manifest.api_collection) return '';
  return `<p class="export-metadata"><a href="api-data.html?source=${encodeURIComponent(source[0])}&operation=${encodeURIComponent(source[1])}">관련 API 수집본 보기 · ${escapeHtml(state.manifest.api_collection.basis_date)}</a></p>`;
}

function renderCurrentApi(item) {
  if(item.refresh_generation) return '';
  const current = state.apiLinks?.[item.id];
  if (!current) return '';
  const value = current.extracted;
  const url = `./api-data.html?source=source.fss.finlife.api&operation=${encodeURIComponent(current.domain)}&q=${encodeURIComponent(current.source_record_id)}`;
  return `<section class="detail-section"><h4>최신 공식 API 공시 · ${escapeHtml(current.collected_at.slice(0, 10))} 수집</h4><p>금융회사·상품 식별자로 연결한 현재 수집본입니다. 아래 기존 온톨로지 조건과 검토일이 다를 수 있으며 추천 검증을 의미하지 않습니다.</p>${renderKvGrid([['상품명',value.product_name],['공시월',value.disclosure_month],['가입대상',value.join_member],['가입방법',value.join_way],['우대조건',value.preferential_conditions_text]])}<a href="${escapeAttribute(url)}">최신 금리·기간별 옵션 전체 보기 →</a></section>`;
}

// A category can be a real classification with no collected records yet. Say so
// on screen, otherwise an empty result list reads as a search failure.
function renderPopulationNotice(item) {
  if (item.population_status !== "planned") return "";
  const reason = item.population_reason || "해당 분류의 레코드를 아직 수집하지 않았습니다.";
  return `<div class="population-notice" role="status"><strong>수집 예정 분류</strong><span>${escapeHtml(reason)}</span></div>`;
}

function renderEvidenceAvailability(item) {
  const warnings = [];
  if (state.evidenceErrors.has("source-registry")) warnings.push(state.evidenceErrors.get("source-registry"));
  if (state.evidenceErrors.has("source-status")) warnings.push(state.evidenceErrors.get("source-status"));
  const descriptor = provenanceShardDescriptorFor(item);
  if (descriptor) {
    const fileName = descriptor.basename || fileNameFromEntry(descriptor);
    const cacheKey = descriptor.id || descriptor.shard_id || fileName;
    if (state.evidenceErrors.has(`provenance:${cacheKey}`)) warnings.push(state.evidenceErrors.get(`provenance:${cacheKey}`));
  }
  if (!warnings.length) return "";
  return `<div class="evidence-warning" role="status"><strong>출처 정보 확인 불가</strong><span>${warnings.map(escapeHtml).join(" ")}</span></div>`;
}

function renderMissingItem(id) {
  const panel = document.querySelector("[data-detail-panel]");
  if (!panel) return;
  panel.innerHTML = `
    <p class="empty-state">검색 인덱스에서 ${escapeHtml(id)} 항목을 찾지 못했습니다.</p>
  `;
}

function renderKvGrid(rows) {
  return `
    <dl class="detail-section kv-grid">
      ${rows
        .map(([label, value]) => `
          <div>
            <dt>${escapeHtml(label)}</dt>
            <dd>${escapeHtml(stringifyValue(value))}</dd>
          </div>
        `)
        .join("")}
    </dl>
  `;
}

function renderCriteria(criteria) {
  if (!Array.isArray(criteria) || !criteria.length) return "";
  const rows = criteria.slice(0, 6).map((criterion) => {
    const label = criterion.label || criterion.criteria_kind || criterion.basis_category || "기준";
    const body = criterion.condition || criterion.benefit || criterion.basis || criterion.basis_definition || stringifyValue(criterion);
    return `
      <article>
        <strong>${escapeHtml(label)}</strong>
        <p>${escapeHtml(body)}</p>
      </article>
    `;
  });
  const more = criteria.length > 6 ? `<p class="empty-state">외 ${formatNumber(criteria.length - 6)}개 기준은 원본 JSON에서 확인할 수 있습니다.</p>` : "";
  return `
    <section class="detail-section">
      <h4>적용 기준</h4>
      <div class="criteria-list">${rows.join("")}${more}</div>
    </section>
  `;
}

function renderOptions(options) {
  if (!Array.isArray(options) || !options.length) return "";
  const rows = options.slice(0, 3).map((option, index) => {
    const compact = Object.entries(option)
      .filter(([, value]) => value !== null && value !== undefined && value !== "")
      .slice(0, 8)
      .map(([key, value]) => `${key}: ${stringifyValue(value)}`)
      .join(" · ");
    return `
      <article>
        <strong>조건 ${index + 1}</strong>
        <p>${escapeHtml(compact)}</p>
      </article>
    `;
  });
  const more = options.length > 3 ? `<p class="empty-state">외 ${formatNumber(options.length - 3)}개 옵션은 원본 JSON에서 확인할 수 있습니다.</p>` : "";
  return `
    <section class="detail-section">
      <h4>상품 세부 조건</h4>
      <div class="criteria-list">${rows.join("")}${more}</div>
    </section>
  `;
}

function renderStructuredFacts(title, facts) {
  if (!Array.isArray(facts) || !facts.length) return "";
  const rows = facts.slice(0, 8).map((fact) => {
    const label = fact?.kind || fact?.label || fact?.criteria_kind || "항목";
    const body = fact?.text || fact?.condition || fact?.benefit || stringifyValue(fact);
    return `
      <article>
        <strong>${escapeHtml(label)}</strong>
        <p>${escapeHtml(body)}</p>
      </article>
    `;
  });
  const more = facts.length > 8 ? `<p class="empty-state">외 ${formatNumber(facts.length - 8)}개 항목은 원본 JSON에서 확인할 수 있습니다.</p>` : "";
  return `
    <section class="detail-section">
      <h4>${escapeHtml(title)}</h4>
      <div class="criteria-list">${rows.join("")}${more}</div>
    </section>
  `;
}

function renderPills(title, values) {
  if (!Array.isArray(values) || !values.length) return "";
  return `
    <section class="detail-section">
      <h4>${escapeHtml(title)}</h4>
      <ul class="pill-list">
        ${values.slice(0, 28).map((value) => `<li>${escapeHtml(state.itemIndex.get(value)?.title || state.sourceRegistry.get(value)?.title || value)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderNeighbors(item) {
  const groups = [
    ["상위 분류", item.parents],
    ["하위 분류", item.children],
    ["요건·서류", item.requires],
    ["중복 제한", item.conflicts_with],
    ["신청 창구", item.available_in],
    ["관련 정보", item.related],
    ["용어", item.terms],
    ["기한", item.deadlines],
    ["출처 자료", item.sources],
  ].filter(([, values]) => Array.isArray(values) && values.length);

  if (!groups.length) return "";

  return `
    <section class="detail-section">
      <h4>관련 정보</h4>
      ${groups
        .map(([title, values]) => `
          <p class="empty-state">${escapeHtml(title)}</p>
          <ul class="pill-list">
            ${values.slice(0, 18).map((value) => `<li>${escapeHtml(state.itemIndex.get(value)?.title || state.sourceRegistry.get(value)?.title || value)}</li>`).join("")}
          </ul>
        `)
        .join("")}
    </section>
  `;
}

function renderSources(item) {
  const sourceUrls = [
    ...(Array.isArray(item.source_urls) ? item.source_urls : []),
    item.original_url,
  ].filter(isValidSourceUrl);
  const sourceBasisDates = Array.isArray(item.source_basis_dates) ? item.source_basis_dates : [];
  const sourceRefs = Array.isArray(item.sources) ? item.sources : [];
  const provenance = [
    ...(Array.isArray(item.provenance) ? item.provenance : []),
    ...(Array.isArray(item.provenances) ? item.provenances : []),
    ...(Array.isArray(item.source_assertions) ? item.source_assertions.map((entry) => ({
      ...entry,
      original_url: entry?.original_url || entry?.source_url,
    })) : []),
  ].filter((entry) => entry && typeof entry === "object");
  const referencedIds = sourceRefs
    .map((source) => (typeof source === "string" ? source : source?.source_id || source?.id))
    .filter(Boolean);
  if (!sourceUrls.length && !sourceBasisDates.length && !provenance.length && !referencedIds.length) return "";

  const provenanceCards = provenance.slice(0, 12).map((entry) => {
    const sourceId = entry.source_id || entry.id || "출처 미상";
    const sourceMeta = sourceMetadataFor(sourceId);
    const sourceStatus = state.sourceStatus.get(sourceId);
    const sourceMetaUrl = sourceMeta?.urls?.canonical || sourceMeta?.canonical_url || sourceMeta?.source_urls?.[0];
    const sourceUrl = [entry.original_url, sourceMetaUrl].find(isValidSourceUrl) || "";
    const publisher = sourceMeta?.publisher || entry.publisher || entry.source_publisher || entry.source_title || "";
    const freshness = freshnessStatusForSource(sourceStatus);
    const verifiedAt = sourceStatus?.last_successful_checked_at || sourceStatus?.checked_at || entry.last_verified_at || entry.reviewed_at || entry.collected_at || "";
    const locator = entry.locator && (entry.locator.value || entry.locator.kind)
      ? `${entry.locator.kind ? `${entry.locator.kind}: ` : ""}${entry.locator.value || ""}`
      : "";
    const details = [
      publisher && `제공기관: ${publisher}`,
      freshness && freshnessLabel(freshness),
      verifiedAt && `출처 확인 기록: ${verifiedAt}`,
    ].filter(Boolean);
    return `
      <article class="source-card">
        <strong>${escapeHtml(publisher || sourceMeta?.title || "출처 자료")}</strong>
        ${sourceUrl ? `<a href="${escapeAttribute(sourceUrl)}" target="_blank" rel="noopener noreferrer">출처 원문 보기</a>` : ""}
        ${details.length ? `<small>${details.map((detail) => escapeHtml(detail)).join(" · ")}</small>` : ""}
      </article>
    `;
  }).join("");

  const legacyIds = referencedIds.filter((id) => !provenance.some((entry) => (entry.source_id || entry.id) === id));

  return `
    <section class="detail-section">
      <h4>출처 확인</h4>
      ${provenanceCards ? `<div class="source-cards">${provenanceCards}</div>` : ""}
      ${legacyIds.length ? `<ul class="pill-list source-ids">${legacyIds.slice(0, 24).map((id) => `<li>${escapeHtml(sourceMetadataFor(id)?.title || sourceMetadataFor(id)?.publisher || "출처 정보 미확인")}</li>`).join("")}</ul>` : ""}
      ${sourceBasisDates.length ? `<ul class="pill-list">${sourceBasisDates.slice(0, 12).map((value) => `<li>${escapeHtml(value)}</li>`).join("")}</ul>` : ""}
      ${sourceUrls.length ? `
        <div class="source-list">
          ${[...new Set(sourceUrls)].slice(0, 8).map((url) => `<a href="${escapeAttribute(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(sourceLinkLabel(url))}</a>`).join("")}
        </div>
      ` : ""}
    </section>
  `;
}

function sourceMetadataFor(sourceId) {
  return state.sourceRegistry.get(sourceId) || null;
}

function isValidSourceUrl(value) {
  if (!value || typeof value !== "string" || !/^https?:\/\//i.test(value.trim())) return false;
  try {
    const url = new URL(value.trim());
    return ["http:", "https:"].includes(url.protocol) && Boolean(url.hostname);
  } catch {
    return false;
  }
}

function updateTypeFilter() {
  const select = document.querySelector("[data-type-filter]");
  if (!select) return;
  const previous = state.pendingTypeFilter ?? select.value;
  state.pendingTypeFilter = null;
  const counts = new Map();
  for (const item of currentItems()) {
    if (item.type) counts.set(item.type, (counts.get(item.type) || 0) + 1);
  }
  const options = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ko-KR"));
  select.innerHTML = `<option value="">모든 자료 유형</option>${options
    .map(([type, count]) => `<option value="${escapeAttribute(type)}">${escapeHtml(typeLabel(type))} (${formatNumber(count)})</option>`)
    .join("")}`;
  select.value = options.some(([type]) => type === previous) ? previous : "";
}

function currentItems() {
  if (state.currentDomain === "all") {
    return state.items;
  }
  return state.loadedDomains.get(state.currentDomain) || [];
}

function scoreItem(item, query) {
  if (!query) return 1;
  if (!item.__searchText) indexSearchItem(item);
  const title = item.__searchTitle;
  const id = item.__searchId;
  const searchType = item.__searchType;
  const text = item.__searchText;
  const tokens = query.split(/\s+/).filter(Boolean);
  const titleTokens = item.__searchTokens;
  const aliases = item.__searchAliases;
  const rateIntent = RATE_QUERY_RE.test(query);
  if (searchType === "deposit-protection" && rateIntent && !PROTECTION_QUERY_RE.test(query)) return 0;

  let score = 0;
  if (aliases.includes(query)) score = 95;
  else if (id === query || title === query) score = 100;
  else if (id.includes(query)) score = 80;
  else if (query.includes(title)) {
    const base = GENERIC_SEARCH_TYPES.has(item.type) && titleTokens.length < tokens.length ? 35 : 75;
    score = base + titleTokens.length;
  }
  else if (title.includes(query)) score = 70;
  else if (text.includes(query)) score = 40;

  const matched = tokens.filter((token) => text.includes(token)).length;
  if (TAX_DECISION_TYPES.has(item.type) && matched >= Math.min(2, tokens.length)) score = Math.max(score, 60 + matched);
  if (!score && tokens.length > 1 && matched === tokens.length) score = 30 + matched;
  if (!score && matched) score = 10 + matched;
  if (rateIntent && ["deposit", "saving", "loan"].includes(searchType)) score += 20;
  return score;
}

function renderOperationalSummary() {
  const container = document.querySelector("[data-operational-summary]");
  if (!container) return;
  const collectedIds = new Set((state.collectionInventory?.datasets || []).map(row => row.source_id));
  const preferredIds = (state.manifest.api_required_sources || []).map(source => source.source_id);
  const apiSources = [...new Set([...preferredIds, ...collectedIds])].filter(id => collectedIds.has(id)).map(source_id => ({source_id}));
  const institutionCount = new Set(apiSources.map(source => sourceMetadataFor(source.source_id)?.publisher).filter(Boolean)).size;
  const webCandidates = state.manifest.public_web_collection_candidates || [];
  const readiness = state.manifest.domain_readiness || {};
  const qualityLines = Object.entries(readiness)
    .map(([domain, summary]) => `<span>${escapeHtml(domain)} 구조화 ${formatNumber(summary.structural_candidate_count || 0)} · 값 완결 ${formatNumber(summary.value_complete_candidate_count || 0)} · 필드 출처 검증 ${formatNumber(summary.field_verified_candidate_count || 0)} · runtime 비교 ${formatNumber(summary.runtime_eligible_candidate_count || 0)} · 공개 ${formatNumber(summary.public_candidate_count || 0)} (${escapeHtml(summary.status || "blocked")})</span>`)
    .filter((line) => line.trim())
    .join("");
  const sourceStatusCounts = [...state.sourceStatus.values()].reduce((counts, entry) => {
    const value = freshnessStatusForSource(entry);
    counts[value] = (counts[value] || 0) + 1;
    return counts;
  }, {});
  const statusLine = Object.entries(sourceStatusCounts)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key} ${formatNumber(value)}`)
    .join(" · ");
  const evidenceWarnings = [...new Set(state.evidenceErrors.values())];
  const liveEvidence = state.manifest.openfin_120_live_regression || {};
  const liveWarning = liveEvidence.validation_status && liveEvidence.validation_status !== "current"
    ? `<div class="evidence-warning operational-evidence-warning" role="alert"><strong>현재 배포 세대 live evidence 차단</strong><span>${escapeHtml(liveEvidence.validation_status)} · generation_id가 현재 manifest와 일치해야 추천 승격이 가능합니다.</span></div>`
    : "";
  container.innerHTML = `
    ${evidenceWarnings.length ? `<div class="evidence-warning operational-evidence-warning" role="status"><strong>출처 정보 확인 불가</strong><span>${evidenceWarnings.map(escapeHtml).join(" ")}</span></div>` : ""}
    ${liveWarning}
    <article>
      <h3>공식 API 출처${state.collectionInventory ? ` — ${institutionCount}개 기관 · ${apiSources.length}개 API` : ''}</h3>
      <div class="operational-source-group">
        <ul class="operational-source-list">
          ${apiSources.map((source, index) => sourceRequirementHtml(source, "api", index)).join("") || sourceEmptyHtml("API 수집 목록을 확인할 수 없습니다.")}
        </ul>
      </div>
      <div class="operational-source-group">
        <h4>공개 웹 수집 후보</h4>
        <ul class="operational-source-list">
          ${webCandidates.map((source) => sourceRequirementHtml(source, "web")).join("") || sourceEmptyHtml("공개 웹 수집 후보가 없습니다.")}
        </ul>
      </div>
    </article>
    <article>
      <h3>품질 요약</h3>
      <p class="source-status-summary">core/search: <strong>${escapeHtml(state.manifest.capabilities?.search || state.manifest.core_search_status || state.manifest.platform_release_status || "unknown")}</strong> · 비교: <strong>${escapeHtml(state.manifest.capabilities?.comparison || state.manifest.comparison_status || state.manifest.comparison_release_status || "unknown")}</strong> · 추천: <strong>${escapeHtml(state.manifest.capabilities?.recommendation || state.manifest.recommendation_status || state.manifest.recommendation_release_status || "blocked")}</strong></p>
      <p class="quality-summary-list">${qualityLines || "품질 요약 로딩 전입니다."}</p>
      <p class="source-status-summary">provenance 연결률은 필드 출처 검증률과 다릅니다. 위의 ‘필드 출처 검증’ 수치는 필수 필드 assertion까지 확인된 상품만 포함합니다.</p>
      <p class="source-status-summary">출처 상태: ${escapeHtml(statusLine || "확인 불가")}</p>
      <p class="source-status-summary">빌드: ${escapeHtml(state.manifest.built_at || "미기록")} · 출처 검토: ${escapeHtml(state.manifest.source_review_date || "미기록")} · live 확인: ${escapeHtml(liveEvidence.checked_at || "현재 세대 evidence 없음")}</p>
    </article>
  `;
}

function sourceRequirementHtml(source, kind, index = 0) {
  if (kind === "api") {
    const metadata = sourceMetadataFor(source.source_id) || {};
    const institution = source.source_id === 'source.gov24.benefit-plus.local-supports' ? '행정안전부·정부24' : metadata.publisher || metadata.title || "기관 미상";
    const apiTitle = source.source_id === "source.bok.ecos"
      ? "기준금리·시장금리·환율 등 경제통계 정보"
      : source.source_id === 'source.gov24.benefit-plus.local-supports' ? '공공서비스 혜택 정보'
      : String(metadata.title || source.needed_for || "API 정보")
          .replace(institution, "").replace(/^[\s_:·-]+/, "").trim();
    const number = String(index + 1).padStart(2, "0");
    const siteUrl = source.source_id === 'source.gov24.benefit-plus.local-supports' ? 'https://www.data.go.kr/data/15113968/openapi.do' : [metadata.urls?.api, metadata.urls?.canonical, metadata.canonical_url, metadata.url]
      .find(isValidSourceUrl) || "";
    return `
      <li>
        <strong>${number}. ${escapeHtml(institution)} : ${escapeHtml(apiTitle)}</strong>
        ${siteUrl ? `<a href="${escapeAttribute(siteUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(siteUrl)}</a>` : ""}
      </li>
    `;
  }

  const value = source.collection_mode;
  const detail = source.needed_for || source.status || "";
  return `
    <li>
      <strong>${escapeHtml(source.source_id || "출처 미상")}</strong>
      <span>${escapeHtml(value || "값 미기록")}</span>
      ${detail ? `<small>${escapeHtml(detail)}</small>` : ""}
    </li>
  `;
}

function sourceEmptyHtml(message) {
  return `<li class="source-empty">${escapeHtml(message)}</li>`;
}

function qualityLine(summary) {
  if (!summary) return "";
  const counts = summary.status_counts || {};
  const active = counts.active || 0;
  const closed = counts.closed || counts.ended || 0;
  const unknown = counts.unknown || 0;
  const referenceOnly = summary.reference_only_products || 0;
  return `active ${formatNumber(active)} · closed ${formatNumber(closed)} · unknown ${formatNumber(unknown)} · reference_only ${formatNumber(referenceOnly)}`;
}

function isSearchVisible(item, query) {
  if (item.recommendation_scope === "internal_verification_candidate") return false;
  // A public catalog listing is searchable without becoming a recommendation.
  if (item.source_listing_status === 'listed' && item.recommendation_scope === 'listing_only') return true;
  if (!isInactiveOrUnverified(item)) return true;
  return hasInactiveIntent(query);
}

function isInactiveOrUnverified(item) {
  const status = normalize(item.status || item.product_status || item.abolition_status || "");
  const recommendation = normalize(item.recommendation_status || "");
  return ["closed", "ended", "sunset", "unknown", "suspended"].includes(status) || recommendation === "reference_only";
}

function hasInactiveIntent(query) {
  return /(종료|판매중단|중단|만료|unknown|closed|ended|reference|보류|불확실)/i.test(query);
}

function statusClass(status) {
  const normalized = normalize(status);
  if (normalized === "active") return "status-active";
  if (["closed", "ended", "sunset"].includes(normalized)) return "status-closed";
  return "status-unknown";
}

function structuredSearchText(value, limit) {
  if (!Array.isArray(value) || !value.length) return "";
  return value
    .slice(0, limit)
    .map((entry) => stringifyValue(entry))
    .join(" ");
}

function markActiveDomainTab() {
  document.querySelectorAll("[data-tab-domain]").forEach((button) => {
    const selected = button.dataset.tabDomain === state.currentDomain;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
}

function markActiveResult() {
  document.querySelectorAll("[data-select-id]").forEach((button) => {
    const selected = button.dataset.selectId === state.selectedId;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
    button.setAttribute("aria-controls", "search-detail");
  });
}

function setResultSummary(text) {
  setText("[data-result-summary]", text);
}

function showFatalError(error) {
  const summary = document.querySelector("[data-result-summary]");
  if (summary) {
    summary.textContent = "OpenFin 데이터를 로드하지 못했습니다.";
  }
  const detail = document.querySelector("[data-detail-panel]");
  if (detail) {
    detail.innerHTML = `<p class="empty-state">${escapeHtml(error.message || String(error))}</p>`;
  }
  console.error(error);
}

function findExport(domain) {
  return (state.manifest.exports || []).find((entry) => entry.domain === domain);
}

function findExportById(id) {
  return (state.manifest?.exports || []).find((entry) => entry.id === id);
}

function fileNameFromEntry(entry) {
  if (entry.web_url) {
    return new URL(entry.web_url).pathname.split("/").pop();
  }
  return String(entry.basename || entry.path || entry.file || entry.url || "").split("/").pop();
}

function domainMeta(domain) {
  return DOMAIN_META[domain] || {
    label: domain || "unknown",
    short: domain || "unknown",
    className: "unknown",
    summary: "",
  };
}

function pickFields(item, fields) {
  return fields
    .map(([key, label]) => [label, item[key]])
    .filter(([, value]) => value !== undefined && value !== null && value !== "");
}

function stringifyValue(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object" && value !== null) return JSON.stringify(value);
  return String(value);
}

function normalize(value) {
  return decodeDisplayText(value).trim().toLocaleLowerCase("ko-KR").replace(/[·ㆍ/()]/g, " ").replace(/\s+/g, " ").trim();
}

function formatNumber(value) {
  return numberFormat.format(Number(value || 0));
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = value;
  });
}

function decodeDisplayText(value) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return String(value ?? "").replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, key) => {
    if (key[0] !== "#") return named[key.toLowerCase()];
    const hex = key[1].toLowerCase() === "x";
    const code = parseInt(key.slice(hex ? 2 : 1), hex ? 16 : 10);
    return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : entity;
  });
}

function escapeHtml(value) {
  return escapeRawHtml(decodeDisplayText(value));
}

function escapeRawHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttribute(value) {
  return escapeRawHtml(value).replace(/`/g, "&#96;");
}


function typeLabel(type) {
  return ({'financial-product':'금융상품','api-observation':'공식 수집 기록','support-program':'지원사업','bank-product':'은행 상품','insurance-product':'보험 상품','card-product':'카드 상품','financial-provider':'금융기관','source':'출처 자료','term':'용어','category':'분류','tax':'세금','corporate-tax-support':'기업 세제지원','deadline':'기한','scenario':'상황별 안내','deduction':'소득공제','tax-credit':'세액공제','eligibility-rule':'대상 조건','required-document':'필요 서류','filing':'신고','application-channel':'신청 창구','concept':'개념','domain':'분야','life-expense':'생활 지출','conflict-rule':'중복 제한','risk-signal':'주의사항','account-product':'계좌 상품','tax-reduction':'세금 감면','benchmark-rate':'기준금리','life-event':'생활 변화','life-income':'소득'})[type] || '기타 자료';
}

function freshnessLabel(value) {
  return ({stale:'최신 여부 재확인 필요',degraded:'일부 출처 확인 불가',unreachable:'출처 연결 불가',changed:'출처 변경 확인 필요',conflict:'출처 간 내용 확인 필요',retired:'종료된 출처',current:'출처 점검 완료',ready:'출처 점검 완료',unknown:'확인 기록 없음',not_revalidated:'최신 조건 미검증'})[value] || '출처 상태 확인 필요';
}

function statusLabel(value) {
  return ({active:'유효로 기록됨',closed:'종료로 기록됨',ended:'종료로 기록됨',sunset:'종료 예정',unknown:'상태 미확인',suspended:'중단으로 기록됨',reference_only:'참고 자료',listing_only:'목록 확인용',blocked:'이용 제한',planned:'수집 예정',open:'접수 중으로 기록됨',available:'이용 가능으로 기록됨',not_revalidated:'최신 조건 미검증'})[value] || value;
}

function sourceLinkLabel(url) {
  let host;
  try { host = new URL(url).hostname; } catch { return "출처 원문 보기 ↗"; }
  const names = {'nts.go.kr':'국세청','fss.or.kr':'금융감독원','data.go.kr':'공공데이터포털','gov.kr':'정부24','bok.or.kr':'한국은행','hf.go.kr':'한국주택금융공사','kdic.or.kr':'예금보험공사'};
  const match = Object.keys(names).find(domain => host === domain || host.endsWith('.' + domain));
  return `${match ? names[match] : host} 원문 보기 ↗`;
}
