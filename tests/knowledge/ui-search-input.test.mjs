import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const root = fileURLToPath(new URL('../../', import.meta.url));

function explorer(search = '') {
  let timer;
  const handlers = {};
  const summary = { textContent: '' };
  const results = { innerHTML: '', querySelectorAll: () => [] };
  const detail = { innerHTML: '', querySelector: () => null, querySelectorAll: () => [], focus() {}, scrollIntoView() {}, setAttribute() {} };
  const input = { value: '', addEventListener: (name, handler) => { handlers[name] = handler; } };
  const typeFilter = { value: '', innerHTML: '', addEventListener: (name, handler) => { handlers[`type:${name}`] = handler; } };
  const moreButton = { hidden: true, textContent: '', addEventListener: (name, handler) => { handlers[`more:${name}`] = handler; } };
  const location = { pathname: '/explorer.html', search, hash: '' };
  const history = { replaceState(_state, _title, url) {
    const parsed = new URL(url, `https://example.test${location.pathname}${location.search}${location.hash}`);
    location.pathname = parsed.pathname;
    location.search = parsed.search;
    location.hash = parsed.hash;
  } };
  const nodes = { '[data-search]': input, '[data-results]': results, '[data-result-summary]': summary, '[data-detail-panel]': detail, '[data-type-filter]': typeFilter, '[data-load-more]': moreButton };
  const calls = [];
  const context = vm.createContext({
    console: { ...console, warn() {} }, Intl, URL, URLSearchParams, Map, Set, history,
    document: {
      addEventListener() {}, querySelector: (selector) => nodes[selector] || null,
      querySelectorAll: (selector) => nodes[selector] ? [nodes[selector]] : [],
    },
    window: {
      location, history,
      addEventListener: (name, handler) => { handlers[`window:${name}`] = handler; },
      setTimeout: (callback) => { timer = callback; return 1; },
      clearTimeout: () => { timer = null; },
    },
    fetchJson: undefined,
  });
  vm.runInContext(fs.readFileSync(`${root}/docs/app.js`, 'utf8'), context);
  context.testFetch = async (url) => {
    calls.push(url);
    return { items: [
      { id: 'item.rent', title: '월세 공제', type: 'deduction', export_id: 'tax' },
      { id: 'item.medical', title: '의료비 공제', type: 'deduction', export_id: 'tax' },
    ] };
  };
  vm.runInContext(`
    state.manifest = { search_index: { path: 'search.json' }, exports: [{ id: 'tax', domain: 'tax' }] };
    fetchJson = (url) => testFetch(url);
    bindStaticControls();
  `, context);
  return {
    context, calls, summary, results, detail, location, moreButton, input, typeFilter,
    type(value) { input.value = value; handlers.input(); },
    filter(value) { typeFilter.value = value; return handlers['type:change'](); },
    more() { return handlers['more:click'](); },
    popstate() { return handlers['window:popstate'](); },
    flush() { const pending = timer; timer = null; return pending?.(); },
  };
}

test('typing a first query loads the compact index and displays matches', async () => {
  const page = explorer();
  assert.equal(vm.runInContext('state.currentDomain', page.context), 'all');
  page.type('월세');
  await page.flush();
  assert.deepEqual(page.calls, ['./opentax/search.json']);
  assert.match(page.results.innerHTML, /월세 공제/);
  assert.doesNotMatch(page.results.innerHTML, /의료비 공제/);
  assert.match(page.summary.textContent, /1개 표시/);
});

test('blank first input does not fetch and preserves the start guidance', async () => {
  const page = explorer();
  page.type('   ');
  await page.flush();
  assert.equal(page.calls.length, 0);
  assert.match(page.summary.textContent, /분야를 선택하거나 검색어/);
});

test('rapid queries during initial loading share one fetch and use the latest input', async () => {
  const page = explorer();
  const originalFetch = page.context.testFetch;
  let finish;
  page.context.testFetch = (url) => new Promise((resolve) => { finish = async () => resolve(await originalFetch(url)); });
  page.type('월세');
  const pending = page.flush();
  page.type('의료비');
  await page.flush();
  assert.match(page.summary.textContent, /로딩 중/);
  await finish();
  await pending;
  assert.deepEqual(page.calls, ['./opentax/search.json']);
  assert.match(page.results.innerHTML, /의료비 공제/);
  assert.doesNotMatch(page.results.innerHTML, /월세 공제/);
});

test('failed first load shows recovery guidance and the next input retries', async () => {
  const page = explorer();
  const originalFetch = page.context.testFetch;
  page.context.testFetch = async () => { throw new Error('offline'); };
  page.type('월세');
  await page.flush();
  assert.match(page.summary.textContent, /불러오지 못했습니다.*재시도/);
  assert.equal(vm.runInContext('state.isLoadingAll', page.context), false);
  page.context.testFetch = originalFetch;
  page.type('월세 공제');
  await page.flush();
  assert.match(page.results.innerHTML, /월세 공제/);
});

test('queries keep an explicitly loaded domain and do not fetch the global index', async () => {
  const page = explorer();
  vm.runInContext(`
    state.currentDomain = 'tax';
    state.loadedDomains.set('tax', [{ id: 'item.rent', title: '월세 공제', type: 'deduction', __domain: 'tax' }]);
  `, page.context);
  page.type('월세');
  await page.flush();
  assert.equal(page.calls.length, 0);
  assert.equal(vm.runInContext('state.currentDomain', page.context), 'tax');
  assert.match(page.results.innerHTML, /월세 공제/);
});

test('init resumes a query typed before the manifest arrived', async () => {
  const page = explorer();
  vm.runInContext('state.manifest = null', page.context);
  page.type('월세');
  await page.flush();
  assert.equal(page.calls.length, 0);
  const originalFetch = page.context.testFetch;
  page.context.testFetch = async (url) => url.endsWith('finance-ontology-manifest.json')
    ? { search_index: { path: 'search.json' }, exports: [{ id: 'tax', domain: 'tax' }] }
    : originalFetch(url);
  // Startup metadata is unrelated to input; exercise the real init branch and loader.
  vm.runInContext(`
    loadSourceRegistry = loadSourceStatus = async () => {};
    updateManifestUI = renderOperationalSummary = renderExportCards = renderDomainTabs = () => {};
  `, page.context);
  await vm.runInContext('init()', page.context);
  assert.match(page.results.innerHTML, /월세 공제/);
  assert.ok(page.calls.includes('./opentax/search.json'));
});

function pauseInitialSearch(page) {
  let resolve;
  let reject;
  let requests = 0;
  page.context.testFetch = () => {
    requests++;
    return new Promise((done, fail) => { resolve = done; reject = fail; });
  };
  // Start through the real input handler with no domain loaded yet.
  page.type('공제');
  const pending = page.flush();
  vm.runInContext(`
    state.loadedDomains.set('tax', [{ id: 'item.rent', title: '월세 공제', type: 'deduction', __domain: 'tax' }]);
  `, page.context);
  return {
    pending, requests: () => requests,
    finish: () => resolve({ items: [{ id: 'item.other', title: '다른 도메인 공제', type: 'deduction', export_id: 'other' }] }),
    fail: () => reject(new Error('offline')),
  };
}

test('a domain selected during first search stays selected after the global index arrives', async () => {
  const page = explorer();
  const loading = pauseInitialSearch(page);
  await vm.runInContext('loadDomain("tax")', page.context);
  const domainSummary = page.summary.textContent;
  loading.finish();
  await loading.pending;
  assert.equal(vm.runInContext('state.currentDomain', page.context), 'tax');
  assert.equal(page.summary.textContent, domainSummary);
  assert.match(page.results.innerHTML, /월세 공제/);
  assert.doesNotMatch(page.results.innerHTML, /다른 도메인/);
});

test('a late failed first search does not replace the selected domain summary', async () => {
  const page = explorer();
  const loading = pauseInitialSearch(page);
  await vm.runInContext('loadDomain("tax")', page.context);
  const domainSummary = page.summary.textContent;
  loading.fail();
  await loading.pending;
  assert.equal(page.summary.textContent, domainSummary);
  assert.equal(vm.runInContext('state.currentDomain', page.context), 'tax');
  assert.equal(vm.runInContext('state.isLoadingAll', page.context), false);
});

test('selecting all again during first search honors the latest choice without another fetch', async () => {
  const page = explorer();
  const loading = pauseInitialSearch(page);
  await vm.runInContext('loadDomain("tax")', page.context);
  await vm.runInContext('loadAllDomains()', page.context);
  loading.finish();
  await loading.pending;
  assert.equal(loading.requests(), 1);
  assert.equal(vm.runInContext('state.currentDomain', page.context), 'all');
  assert.match(page.results.innerHTML, /다른 도메인 공제/);
});

test('a selected domain accepts new queries while the initial global index is pending', async () => {
  const page = explorer();
  const loading = pauseInitialSearch(page);
  await vm.runInContext('loadDomain("tax")', page.context);
  page.type('존재하지않는검색조건');
  await page.flush();
  assert.doesNotMatch(page.results.innerHTML, /월세 공제/);
  loading.finish();
  await loading.pending;
  assert.equal(vm.runInContext('state.currentDomain', page.context), 'tax');
  assert.doesNotMatch(page.results.innerHTML, /월세 공제|다른 도메인/);
});

const visibleResultCount = (page) => (page.results.innerHTML.match(/data-select-id=/g) || []).length;

test('show more reaches all 124 results and query, type and domain changes reset the page', async () => {
  const page = explorer();
  vm.runInContext(`
    const rows = Array.from({ length: 124 }, (_, index) => ({
      id: 'item.' + index, title: '공제 자료 ' + index, type: 'deduction', __domain: 'tax'
    }));
    mergeItems(rows);
    state.loadedDomains.set('tax', rows);
    state.searchIndexLoaded = true;
    state.currentDomain = 'all';
  `, page.context);
  page.type('공제');
  await page.flush();
  assert.equal(visibleResultCount(page), 120);
  assert.equal(page.moreButton.hidden, false);
  page.more();
  assert.equal(visibleResultCount(page), 124);
  assert.equal(page.moreButton.hidden, true);
  page.more();
  assert.equal(visibleResultCount(page), 124, 'repeated expansion must not duplicate records');

  page.type('자료');
  await page.flush();
  assert.equal(visibleResultCount(page), 120, 'a new query resets paging even when it matches the same records');
  assert.equal(page.moreButton.hidden, false);
  page.more();
  assert.equal(visibleResultCount(page), 124);
  page.filter('deduction');
  assert.equal(visibleResultCount(page), 120, 'type changes reset paging');
  page.more();
  assert.equal(visibleResultCount(page), 124);
  await vm.runInContext('loadDomain("tax")', page.context);
  assert.equal(visibleResultCount(page), 120, 'domain changes reset paging');
});

test('zero matches clears the previous detail, selection and hash before late detail arrives', async () => {
  const page = explorer();
  let finish;
  page.context.testFetch = () => new Promise((resolve) => { finish = resolve; });
  vm.runInContext(`
    state.manifest.exports[0].path = 'tax.json';
    mergeItems([{ id: 'item.rent', title: '월세 공제', description: '이전 선택 설명', type: 'deduction', __domain: 'tax', __compact: true }]);
    state.searchIndexLoaded = true;
    state.currentDomain = 'all';
    const originalHydrate = hydrateSelectedItem;
    hydrateSelectedItem = (...args) => (globalThis.pendingHydration = originalHydrate(...args));
    renderResults();
    selectItem('item.rent');
  `, page.context);
  assert.match(page.detail.innerHTML, /이전 선택 설명/);
  assert.equal(page.location.hash, '#item.rent');
  const selectionToken = vm.runInContext('state.provenanceSelectionToken', page.context);

  page.type('존재하지않는검색조건');
  await page.flush();
  assert.equal(visibleResultCount(page), 0);
  assert.equal(vm.runInContext('state.selectedId', page.context), '');
  assert.ok(vm.runInContext('state.provenanceSelectionToken', page.context) > selectionToken);
  assert.equal(page.location.hash, '');
  assert.doesNotMatch(page.detail.innerHTML, /이전 선택 설명/);
  const clearedDetail = page.detail.innerHTML;

  finish({ items: [{ id: 'item.rent', title: '월세 공제', description: '뒤늦게 도착한 상세', type: 'deduction' }] });
  await page.context.pendingHydration;
  assert.equal(page.detail.innerHTML, clearedDetail, 'late detail must not restore a cleared selection');
  assert.equal(vm.runInContext('state.selectedId', page.context), '');
  assert.equal(page.location.hash, '');
});

test('a late provenance response cannot replace the empty detail after the selected result disappears', async () => {
  const page = explorer();
  let finish;
  page.context.testFetch = () => new Promise((resolve) => { finish = resolve; });
  vm.runInContext(`
    const row = { id: 'item.rent', title: '월세 공제', type: 'deduction', __domain: 'tax', provenance_shard: { path: 'proof.json' } };
    mergeItems([row]);
    state.loadedDomains.set('tax', [row]);
    state.searchIndexLoaded = true;
    state.currentDomain = 'all';
    const originalProvenance = hydrateSelectedProvenance;
    hydrateSelectedProvenance = (...args) => (globalThis.pendingProvenance = originalProvenance(...args));
    renderResults();
    selectItem('item.rent');
  `, page.context);
  page.type('존재하지않는검색조건');
  await page.flush();
  const clearedDetail = page.detail.innerHTML;
  assert.equal(vm.runInContext('state.selectedId', page.context), '');
  finish({ items: [{ id: 'item.rent', provenance: [{ source_id: 'source.rent', original_url: 'https://example.test/evidence', checksum: 'evidence' }] }] });
  await page.context.pendingProvenance;
  assert.equal(page.detail.innerHTML, clearedDetail);
  assert.equal(vm.runInContext('state.itemIndex.get("item.rent").provenance', page.context), undefined,
    'an invalidated provenance request must not mutate the previous selection');
});

test('hydrating a compact result never changes the domain and cannot undo a later choice', async () => {
  const page = explorer();
  let finish;
  page.context.testFetch = () => new Promise((resolve) => { finish = resolve; });
  vm.runInContext(`
    state.manifest.exports[0].path = 'tax.json';
    mergeItems([{ id: 'tax.a', title: '공제 A', type: 'deduction', __domain: 'tax', __compact: true }]);
    state.loadedDomains.set('card-products', [{ id: 'card.b', title: '카드 B', type: 'card-product', __domain: 'card-products' }]);
    state.searchIndexLoaded = true;
    const originalHydrate = hydrateSelectedItem;
    hydrateSelectedItem = (...args) => (globalThis.pendingHydration = originalHydrate(...args));
    selectItem('tax.a');
  `, page.context);
  assert.equal(vm.runInContext('state.currentDomain', page.context), 'all', 'detail loading must not temporarily switch the selected domain');
  await vm.runInContext('loadDomain("card-products")', page.context);
  const cardResults = page.results.innerHTML;
  finish({ items: [{ id: 'tax.a', title: '공제 A', type: 'deduction' }] });
  await page.context.pendingHydration;
  assert.equal(vm.runInContext('state.currentDomain', page.context), 'card-products');
  assert.equal(page.results.innerHTML, cardResults);
  assert.match(page.results.innerHTML, /카드 B/);
});

test('an older domain response cannot replace the latest domain results', async () => {
  const page = explorer();
  let finish;
  page.context.testFetch = () => new Promise((resolve) => { finish = resolve; });
  vm.runInContext(`
    state.manifest.exports[0].path = 'tax.json';
    state.loadedDomains.set('card-products', [{ id: 'card.b', title: '카드 B', type: 'card-product', __domain: 'card-products' }]);
  `, page.context);
  const pending = vm.runInContext('loadDomain("tax")', page.context);
  await vm.runInContext('loadDomain("card-products")', page.context);
  const latestSummary = page.summary.textContent;
  finish({ items: [{ id: 'tax.a', title: '공제 A', type: 'deduction' }] });
  await pending;
  assert.equal(vm.runInContext('state.currentDomain', page.context), 'card-products');
  assert.equal(page.summary.textContent, latestSummary);
  assert.match(page.results.innerHTML, /카드 B/);
  assert.doesNotMatch(page.results.innerHTML, /공제 A/);
});

function prepareStartup(page) {
  const originalFetch = page.context.testFetch;
  page.context.testFetch = async (url) => url.endsWith('finance-ontology-manifest.json')
    ? { search_index: { path: 'search.json' }, exports: [{ id: 'tax', domain: 'tax', path: 'tax.json' }] }
    : originalFetch(url);
  vm.runInContext(`
    loadSourceRegistry = loadSourceStatus = async () => {};
    updateManifestUI = renderOperationalSummary = renderExportCards = renderDomainTabs = () => {};
  `, page.context);
}

test('query, domain and type survive URL sharing and startup including a selected hash', async () => {
  const page = explorer('?q=' + encodeURIComponent('공제') + '&domain=tax&type=deduction&campaign=fixture');
  page.location.hash = '#item.rent';
  prepareStartup(page);
  await vm.runInContext('init()', page.context);
  assert.equal(page.input.value, '공제');
  assert.equal(page.typeFilter.value, 'deduction');
  assert.equal(vm.runInContext('state.currentDomain', page.context), 'tax');
  assert.equal(vm.runInContext('state.selectedId', page.context), 'item.rent');
  assert.ok(page.calls.includes('./opentax/tax.json'));
  assert.ok(!page.calls.includes('./opentax/search.json'), 'a hash must not silently broaden a selected domain');

  page.type('의료비');
  await page.flush();
  let params = new URLSearchParams(page.location.search);
  assert.equal(params.get('q'), '의료비');
  assert.equal(params.get('domain'), 'tax');
  assert.equal(params.get('type'), 'deduction');
  assert.equal(params.get('campaign'), 'fixture');
  assert.equal(page.location.hash, '', 'changing to results that exclude the selection clears only that selection');
  page.filter('');
  page.type('');
  await page.flush();
  params = new URLSearchParams(page.location.search);
  assert.equal(params.has('q'), false);
  assert.equal(params.has('type'), false);
  assert.equal(params.get('domain'), 'tax');
});

test('a changed query replaces an old URL query and query-only startup searches all domains', async () => {
  const page = explorer('?q=' + encodeURIComponent('월세'));
  page.type('의료비');
  await page.flush();
  assert.equal(new URLSearchParams(page.location.search).get('q'), '의료비');
  const restored = explorer(page.location.search);
  prepareStartup(restored);
  await vm.runInContext('init()', restored.context);
  assert.equal(restored.input.value, '의료비');
  assert.equal(vm.runInContext('state.currentDomain', restored.context), 'all');
  assert.ok(restored.calls.includes('./opentax/search.json'));
  assert.ok(!restored.calls.includes('./opentax/tax.json'));
  assert.match(restored.results.innerHTML, /의료비 공제/);
  assert.doesNotMatch(restored.results.innerHTML, /월세 공제/);
});

test('popstate restores another URL and invalid types fall back to the available choices', async () => {
  const page = explorer();
  prepareStartup(page);
  await vm.runInContext('init()', page.context);
  vm.runInContext(`
    const originalRestore = restoreExplorerUrl;
    restoreExplorerUrl = (...args) => (globalThis.pendingRestore = originalRestore(...args));
  `, page.context);
  page.location.search = '?domain=tax&q=' + encodeURIComponent('의료비') + '&type=deduction';
  page.popstate();
  await page.context.pendingRestore;
  assert.equal(page.input.value, '의료비');
  assert.equal(page.typeFilter.value, 'deduction');
  assert.equal(vm.runInContext('state.currentDomain', page.context), 'tax');
  assert.match(page.results.innerHTML, /의료비 공제/);
  assert.doesNotMatch(page.results.innerHTML, /월세 공제/);
  page.location.search = '?scope=all&type=does-not-exist';
  page.popstate();
  await page.context.pendingRestore;
  assert.equal(page.input.value, '');
  assert.equal(page.typeFilter.value, '');
  assert.equal(vm.runInContext('state.currentDomain', page.context), 'all');
  assert.equal(visibleResultCount(page), 2);
  assert.equal(new URLSearchParams(page.location.search).has('type'), false);
  assert.equal(new URLSearchParams(page.location.search).get('scope'), 'all');
});

test('legacy scope all URLs still restore their query and type', async () => {
  const page = explorer('?scope=all&q=' + encodeURIComponent('월세') + '&type=deduction');
  prepareStartup(page);
  await vm.runInContext('init()', page.context);
  assert.equal(vm.runInContext('state.currentDomain', page.context), 'all');
  assert.equal(page.typeFilter.value, 'deduction');
  assert.match(page.results.innerHTML, /월세 공제/);
  assert.doesNotMatch(page.results.innerHTML, /의료비 공제/);
});

test('restoring a shared URL does not select a hash excluded by its search filters', async () => {
  const page = explorer('?domain=tax&q=' + encodeURIComponent('의료비') + '&type=deduction');
  page.location.hash = '#item.rent';
  prepareStartup(page);
  await vm.runInContext('init()', page.context);
  assert.match(page.results.innerHTML, /의료비 공제/);
  assert.doesNotMatch(page.results.innerHTML, /월세 공제/);
  assert.notEqual(vm.runInContext('state.selectedId', page.context), 'item.rent');
  assert.doesNotMatch(page.detail.innerHTML, /월세 공제/);
  assert.notEqual(page.location.hash, '#item.rent');
});

test('entity-encoded product labels match decoded searches and remain safe in results and details', async () => {
  const page = explorer();
  vm.runInContext(`
    mergeItems([{ id: 'product.safe', title: '보증&#40;특례&#41;',
      description: '&lt;img src=x onerror=alert(1)&gt; &amp; 안내',
      type: 'bank-product', __domain: 'loan-products' }]);
    state.searchIndexLoaded = true;
  `, page.context);
  page.type('보증(특례)');
  await page.flush();
  assert.equal(visibleResultCount(page), 1);
  assert.match(page.results.innerHTML, /보증\(특례\)/);
  assert.doesNotMatch(page.results.innerHTML, /&#40;|&amp;#40;|<img\b/);
  assert.match(page.results.innerHTML, /&lt;img src=x onerror=alert\(1\)&gt; &amp; 안내/);
  vm.runInContext('selectItem("product.safe")', page.context);
  assert.match(page.detail.innerHTML, /보증\(특례\)/);
  assert.doesNotMatch(page.detail.innerHTML, /<img\b/);
  page.type('img src=x');
  await page.flush();
  assert.equal(visibleResultCount(page), 1, 'decoded description participates in search without becoming executable HTML');
});
