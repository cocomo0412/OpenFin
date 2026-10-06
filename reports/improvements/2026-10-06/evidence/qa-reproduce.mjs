// Read-only UI audit, authored against OpenFin HEAD 79903eee on 2026-10-06.
// This records defect observations, NOT successful normal-behavior tests.
// After a fix, defect_reproduced may become false; retain the new observations.
// All responses are in-memory fixtures. No network, credentials or source writes.
import fs from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

const root = fileURLToPath(new URL('../../../../', import.meta.url));
const appSource = fs.readFileSync(new URL('../../../../docs/app.js', import.meta.url), 'utf8');
const apiSource = fs.readFileSync(new URL('../../../../docs/api-data.js', import.meta.url), 'utf8');
const hash = source => createHash('sha256').update(source).digest('hex');
const observations = [];

function explorer() {
  let timer;
  const handlers = {};
  const summary = { textContent: '' };
  const results = { innerHTML: '', scrollTop: 0, querySelectorAll: () => [] };
  const detail = { innerHTML: '', querySelector: () => null, querySelectorAll: () => [], focus() {}, scrollIntoView() {}, setAttribute() {} };
  const input = { value: '', addEventListener: (name, handler) => { handlers[name] = handler; } };
  const typeFilter = { value: '', innerHTML: '', addEventListener() {} };
  const more = { hidden: true, textContent: '', addEventListener() {} };
  const location = { pathname: '/explorer.html', search: '', hash: '' };
  const history = { replaceState(_state, _title, url) {
    const parsed = new URL(url, `https://example.test${location.pathname}${location.search}${location.hash}`);
    location.pathname = parsed.pathname; location.search = parsed.search; location.hash = parsed.hash;
  } };
  const nodes = { '[data-search]': input, '[data-results]': results, '[data-result-summary]': summary,
    '[data-detail-panel]': detail, '[data-type-filter]': typeFilter, '[data-load-more]': more };
  const context = vm.createContext({
    console, Intl, URL, URLSearchParams, Map, Set, history,
    document: { addEventListener() {}, querySelector: selector => nodes[selector] || null,
      querySelectorAll: selector => nodes[selector] ? [nodes[selector]] : [] },
    window: { location, history, setTimeout: callback => { timer = callback; return 1; }, clearTimeout: () => { timer = null; } },
  });
  vm.runInContext(appSource, context, { filename: 'docs/app.js' });
  context.fixtureFetch = async () => ({ items: [
    { id: 'item.rent', title: '월세 공제', type: 'deduction', export_id: 'tax' },
    { id: 'item.medical', title: '의료비 공제', type: 'deduction', export_id: 'tax' },
  ] });
  vm.runInContext(`
    state.manifest = { search_index: { path: 'search.json' }, exports: [{ id: 'tax', domain: 'tax', path: 'tax.json' }] };
    fetchJson = url => fixtureFetch(url);
    bindStaticControls();
  `, context);
  return { context, results, detail, location,
    type(value) { input.value = value; handlers.input(); },
    flush() { const pending = timer; timer = null; return pending?.(); } };
}

async function delayedDomainObservation() {
  const page = explorer();
  let finish;
  page.context.fixtureFetch = () => new Promise(resolve => { finish = resolve; });
  vm.runInContext(`
    state.manifest.exports.push({ id: 'card', domain: 'card-products', path: 'card.json' });
    mergeItems([{ id: 'tax.a', title: '공제 A', type: 'deduction', __domain: 'tax', __compact: true }]);
    state.loadedDomains.set('card-products', [{ id: 'card.b', title: '카드 B', type: 'card-product', __domain: 'card-products' }]);
    state.searchIndexLoaded = true;
    state.currentDomain = 'all';
    const originalHydrate = hydrateSelectedItem;
    hydrateSelectedItem = (...args) => (globalThis.pendingHydration = originalHydrate(...args));
    selectItem('tax.a');
  `, page.context);
  await vm.runInContext("loadDomain('card-products')", page.context);
  const before = vm.runInContext('state.currentDomain', page.context);
  finish({ items: [{ id: 'tax.a', title: '공제 A', type: 'deduction' }] });
  await page.context.pendingHydration;
  const after = vm.runInContext('state.currentDomain', page.context);
  return { id: 'late-detail-restores-old-domain', scenario: 'all > select tax item (pending) > card-products > resolve tax response',
    expected_domain: 'card-products', before_old_response: before, after_old_response: after,
    defect_reproduced: before === 'card-products' && after !== 'card-products' };
}

async function urlObservation() {
  const page = explorer();
  page.location.search = '?q=' + encodeURIComponent('월세');
  page.type('의료비');
  await page.flush();
  const urlQuery = new URLSearchParams(page.location.search).get('q');
  const medicalVisible = page.results.innerHTML.includes('의료비 공제');
  const rentVisible = page.results.innerHTML.includes('월세 공제');
  return { id: 'search-url-keeps-old-query', scenario: 'URL q=월세 > enter 의료비 through input handler',
    input_query: '의료비', url_query: urlQuery, medical_visible: medicalVisible, rent_visible: rentVisible,
    defect_reproduced: medicalVisible && !rentVisible && urlQuery !== '의료비' };
}

async function invalidDatasetObservation() {
  const nodes = {};
  const node = () => ({ value: '', textContent: '', hidden: false, disabled: false, children: [],
    addEventListener() {}, append(...items) { this.children.push(...items); }, replaceChildren() { this.children = []; } });
  for (const id of ['dataset', 'query', 'meta', 'results', 'page', 'prev', 'next', 'json-link']) nodes['#' + id] = node();
  nodes['#dataset'].value = '0'; // Native select defaults to its first option.
  const calls = [];
  const datasets = [
    { source_id: 'first.source', operation: 'deposit', title: '다른 출처 예금', path: 'first.json', count: 1, collected_at: '2026-10-06T00:00:00Z', reference_published: true },
    { source_id: 'wanted.source', operation: 'support', title: '요청 출처 지원사업', path: 'wanted.json', count: 1, collected_at: '2026-10-06T00:00:00Z', reference_published: true },
  ];
  const context = vm.createContext({
    document: { querySelector: selector => nodes[selector], createElement: node },
    location: { search: '?source=wanted.source&operation=wrong' }, URLSearchParams,
    fetch: async url => {
      calls.push(url);
      if (url === './opentax/collection-inventory.json') return { ok: true, json: async () => ({ datasets }) };
      if (url === './first.json') return { ok: true, json: async () => ({ items: [{ product_name: '다른 출처 상품' }] }) };
      if (url === './wanted.json') return { ok: true, json: async () => ({ items: [{ product_name: '요청 출처 상품' }] }) };
      throw new Error('Unexpected fixture request');
    },
  });
  await vm.runInContext('(async () => {\n' + apiSource + '\n})()', context, { filename: 'docs/api-data.js' });
  const shownTitle = nodes['#results'].children[0]?.children[0]?.textContent ?? null;
  return { id: 'invalid-dataset-url-falls-back-to-unrelated-source', requested_source: 'wanted.source', requested_operation: 'wrong',
    fixture_requests: calls, selected_index: nodes['#dataset'].value, displayed_title: shownTitle,
    displayed_meta: nodes['#meta'].textContent,
    defect_reproduced: calls.includes('./first.json') && shownTitle === '다른 출처 상품' };
}

for (const run of [delayedDomainObservation, urlObservation, invalidDatasetObservation]) observations.push(await run());
console.log('DEFECT OBSERVATION AUDIT — not a normal-behavior test pass report');
console.log(JSON.stringify({
  authored_against_head: '79903eee',
  observed_head: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
  observed_at_utc: new Date().toISOString(),
  source_sha256: { 'docs/app.js': hash(appSource), 'docs/api-data.js': hash(apiSource) },
  method: 'real application JavaScript in VM; synthetic DOM and in-memory responses',
  external_network_requests: 0,
  credential_access: false,
  observations,
  normal_behavior_regression_suite: 'not run by this audit',
  limitation: 'Confirms fixture behavior only; does not measure live occurrence, browser layout, or user impact frequency.',
}, null, 2));
