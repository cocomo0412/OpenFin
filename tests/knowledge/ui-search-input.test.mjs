import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const root = fileURLToPath(new URL('../../', import.meta.url));

function explorer() {
  let timer;
  const handlers = {};
  const summary = { textContent: '' };
  const results = { innerHTML: '', querySelectorAll: () => [] };
  const input = { value: '', addEventListener: (name, handler) => { handlers[name] = handler; } };
  const nodes = { '[data-search]': input, '[data-results]': results, '[data-result-summary]': summary };
  const calls = [];
  const context = vm.createContext({
    console: { ...console, warn() {} }, Intl, URL, URLSearchParams, Map, Set,
    document: {
      addEventListener() {}, querySelector: (selector) => nodes[selector] || null,
      querySelectorAll: (selector) => nodes[selector] ? [nodes[selector]] : [],
    },
    window: {
      location: { search: '', hash: '' },
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
    context, calls, summary, results,
    type(value) { input.value = value; handlers.input(); },
    flush() { const pending = timer; timer = null; return pending?.(); },
  };
}

test('typing a first query loads the compact index and displays matches', async () => {
  const page = explorer();
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
  assert.match(page.summary.textContent, /도메인을 선택하거나 검색어/);
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
