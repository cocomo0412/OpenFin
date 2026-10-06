import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const root = fileURLToPath(new URL('../../', import.meta.url));

function appContext() {
  const context = vm.createContext({
    console,
    Intl,
    URL,
    URLSearchParams,
    Map,
    Set,
    structuredClone,
    setTimeout,
    clearTimeout,
    document: {
      addEventListener() {},
      querySelector() { return null; },
      querySelectorAll() { return []; },
    },
    window: { location: { search: '', hash: '' }, setTimeout, clearTimeout },
  });
  vm.runInContext(fs.readFileSync(`${root}/docs/app.js`, 'utf8').replace(/\r\n/g, '\n'), context, { filename: 'docs/app.js' });
  return context;
}

test('global explorer loads compact search first and hydrates only the selected domain', async () => {
  const context = appContext();
  const calls = [];
  vm.runInContext(`
    state.manifest = {
      search_index: { path: 'opentax/finance-search-index-2026.json' },
      exports: [{ id: 'deposit-products-ontology', domain: 'deposit-products', path: 'opentax/deposit.json' }]
    };
    state.items = [];
    state.loadedDomains = new Map();
    state.itemIndex = new Map();
    state.searchIndexLoaded = false;
    fetchJson = async (url) => {
      globalThis.fetchCalls.push(url);
      if (url.endsWith('finance-search-index-2026.json')) return { items: [{ id: 'item.deposit', title: '예금', export_id: 'deposit-products-ontology' }] };
      return { items: [{ id: 'item.deposit', title: '예금', description: '상세 export' }] };
    };
    globalThis.fetchCalls = [];
    globalThis.__state = state;
  `, context);

  await vm.runInContext('loadAllDomains()', context);
  assert.equal(context.fetchCalls.join('|'), './opentax/finance-search-index-2026.json');
  assert.equal(context.__state.items[0].__compact, true);
  assert.equal(context.__state.items[0].__domain, 'deposit-products');

  vm.runInContext('selectItem("item.deposit", { updateHash: false })', context);
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(context.fetchCalls.join('|'), './opentax/finance-search-index-2026.json|./opentax/deposit.json');
  assert.equal(context.__state.itemIndex.get('item.deposit').description, '상세 export');
});

test('compact result cards show source freshness and fail-closed warning', () => {
  const context = appContext();
  vm.runInContext(`
    state.sourceStatus = new Map([['source.test', { source_freshness_status: 'degraded', freshness_status: 'stale' }]]);
    globalThis.cardHtml = resultItemHtml({ id: 'item.deposit', title: '예금', type: 'bank-product', __domain: 'deposit-products', source_ids: ['source.test'] });
  `, context);
  assert.match(context.cardHtml, /freshness-degraded/);
  assert.equal((context.cardHtml.match(/일부 출처 확인 불가/g) || []).length, 1);
  assert.doesNotMatch(context.cardHtml, /freshness:|최신성 degraded/);
  const staleHtml = vm.runInContext(`resultItemHtml({ id: 'item.stale', title: '자료', freshness_status: 'stale' })`, context);
  assert.match(staleHtml, /freshness-stale/);
  assert.equal((staleHtml.match(/최신 여부 재확인 필요/g) || []).length, 1);
});

test('source freshness recomputes the SLA from the last successful check', () => {
  const context = appContext();
  const source = {
    freshness_status: 'ready',
    last_successful_checked_at: '2026-08-07T00:00:00.000Z',
    refresh: { sla_hours: 168 },
  };
  assert.equal(vm.runInContext(`freshnessStatusForSource(${JSON.stringify(source)}, Date.parse('2026-08-30T00:00:00.000Z'))`, context), 'stale');
  assert.equal(vm.runInContext("freshnessStatusForSource({ freshness_status: 'degraded', source_freshness_status: 'ready', last_successful_checked_at: '2026-08-29T00:00:00.000Z', refresh: { sla_hours: 168 } }, Date.parse('2026-08-30T00:00:00.000Z'))", context), 'degraded');
});

test('freshness follows every supported source reference including the source record itself', () => {
  const context = appContext();
  vm.runInContext(`state.sourceStatus.set('source.old', { freshness_status: 'stale' });`, context);
  const references = [
    { source_ids: ['source.old'] },
    { sources: ['source.old'] },
    { provenance: [{ source_id: 'source.old' }] },
    { id: 'source.old', type: 'source' },
  ];
  for (const reference of references) {
    const item = { id: 'item.test', title: '자료', freshness_status: 'current', ...reference };
    assert.equal(vm.runInContext(`freshnessStatusForItem(${JSON.stringify(item)})`, context), 'stale', JSON.stringify(reference));
    const html = vm.runInContext(`resultItemHtml(${JSON.stringify(item)})`, context);
    assert.match(html, /최신 여부 재확인 필요/);
    assert.doesNotMatch(html, /출처 점검 완료/);
  }
});

test('known source warnings and unknown references cannot be hidden by a current source', () => {
  const context = appContext();
  vm.runInContext(`
    state.sourceStatus.set('source.current', { freshness_status: 'current' });
    state.sourceStatus.set('source.failed', { freshness_status: 'degraded' });
    state.sourceStatus.set('source.unknown', { freshness_status: 'unknown' });
  `, context);
  const itemStatus = (item) => vm.runInContext(`freshnessStatusForItem(${JSON.stringify(item)})`, context);
  assert.equal(itemStatus({ source_ids: ['source.current'], sources: ['source.failed'], freshness_status: 'current' }), 'degraded');
  assert.equal(itemStatus({ source_ids: ['source.current', 'source.missing'], freshness_status: 'current' }), 'unknown');
  assert.equal(itemStatus({ source_ids: ['source.current', 'source.unknown'], freshness_status: 'current' }), 'unknown');
  assert.equal(itemStatus({ sources: ['source.missing'], provenance: [{ source_id: 'source.failed' }], freshness_status: 'current' }), 'degraded');
  assert.equal(itemStatus({ source_ids: ['source.current'], freshness_status: 'stale' }), 'stale', 'an item-level warning must also be preserved');
  assert.equal(itemStatus({ source_freshness_status: 'current', freshness_status: 'stale' }), 'stale',
    'a current source aggregate must not hide a conflicting item-level warning');
});

test('display entity decoding is one pass and cannot inject result markup or attributes', () => {
  const context = appContext();
  const item = {
    id: 'item.&#34; onmouseover=alert(1)',
    title: '상품&#x28;특례&#x29; &quot;선택&quot; &apos;표시&apos; &nbsp; &amp;lt;script&amp;gt;',
    description: '&#60;script&#62;alert(1)&#60;/script&#62; &#x110000; &#xD800;'
  };
  const html = vm.runInContext(`resultItemHtml(${JSON.stringify(item)})`, context);
  assert.match(html, /상품\(특례\) &quot;선택&quot; &#39;표시&#39;/);
  assert.match(html, /&amp;lt;script&amp;gt;/, 'nested encoding must not be decoded repeatedly');
  assert.doesNotMatch(html, /<script\b/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /data-select-id="item\.&amp;#34; onmouseover=alert\(1\)"/,
    'record identifiers remain raw attribute values rather than decoded text');
});
