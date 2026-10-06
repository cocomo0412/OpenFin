import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const script = fs.readFileSync(new URL('../../docs/api-data.js', import.meta.url), 'utf8');
class Element {
  constructor(tag) { this.tagName = tag; this.children = []; this.value = ''; this.handlers = {}; this._text = ''; this.disabled = false; }
  set textContent(value) { this._text = String(value); this.children = []; }
  get textContent() { return this._text + this.children.map(child => child.textContent).join(' '); }
  append(...children) { this.children.push(...children); }
  replaceChildren(...children) { this._text = ''; this.children = children; }
  addEventListener(type, handler) { this.handlers[type] = handler; }
}
const published = {source_id:'source.rate',operation:'StatisticSearch',title:'한국은행 기준금리',reference_published:true,path:'rate.json',count:1,collected_at:'2026-10-01T07:00:00Z',basis_start:'20261001'};
const withheld = {source_id:'source.finlife',operation:'creditLoan-020000',title:'신용대출',path:'private.json',count:1};
async function page(search = '', datasets = [published, withheld], responseItems = [{ITEM_NAME1:'한국은행 기준금리',TIME:'20261001',DATA_VALUE:'2.75',UNIT_NAME:'연%'}]) {
  const nodes = Object.fromEntries(['dataset','query','meta','results','page','prev','next'].map(id => [`#${id}`,new Element(id)]));
  const calls = [];
  const location = {search,href:'https://example.test/OpenFin/api-data.html' + search};
  const history = {replaceState(_state,_title,url) { const next = new URL(url,location.href); location.href = next.href; location.search = next.search; }};
  const context = vm.createContext({URL, URLSearchParams, history, console, document: {querySelector: selector => nodes[selector] || null,createElement: tag => new Element(tag)},location, fetch:async url => { calls.push(url); return {ok:true,json:async () => url.endsWith('collection-inventory.json') ? {datasets} : {items:responseItems}}; }});
  vm.runInContext(script, context);
  await vm.runInContext('initPromise', context);
  return {nodes,calls,context,location,async select(value) { nodes['#dataset'].value = value; await nodes['#dataset'].handlers.change(); },type(value) { nodes['#query'].value = value; nodes['#query'].handlers.input(); }};
}

test('unpublished deep link does not fetch or display the first published dataset', async () => {
  const view = await page('?source=source.finlife&operation=creditLoan-020000');
  assert.deepEqual(view.calls,['./opentax/collection-inventory.json']);
  assert.match(view.nodes['#meta'].textContent,/공개 대상이 아닙니다/);
  assert.equal(view.nodes['#dataset'].value,'');
  assert.doesNotMatch(view.nodes['#results'].textContent,/한국은행 기준금리/);
  assert.equal(view.nodes['#query'].disabled,true);
  assert.ok(!view.nodes['#dataset'].children.some(option => option.textContent.includes('신용대출')));
});

test('unknown source or operation preserves an explicit missing target state', async () => {
  for (const search of ['?source=unknown','?source=source.rate&operation=unknown','?operation=unknown','?source=']) {
    const view = await page(search);
    assert.equal(view.calls.length,1);
    assert.match(view.nodes['#results'].textContent,/찾을 수 없습니다/);
    assert.equal(view.nodes['#dataset'].value,'');
  }
});

test('missing deep link recovers by explicitly selecting a public dataset', async () => {
  const view = await page('?source=unknown');
  await view.select('0');
  assert.deepEqual(view.calls,['./opentax/collection-inventory.json','./rate.json']);
  assert.equal(view.nodes['#query'].disabled,false);
  assert.match(view.nodes['#results'].textContent,/한국은행 기준금리/);
  assert.doesNotMatch(view.nodes['#meta'].textContent,/찾을 수 없습니다/);
});

test('matching operation-only link selects the requested public dataset', async () => {
  const other = {...published,source_id:'source.other',operation:'other',path:'other.json'};
  const view = await page('?operation=StatisticSearch',[other,published]);
  assert.equal(view.nodes['#dataset'].value,'1');
  assert.deepEqual(view.calls,['./opentax/collection-inventory.json','./rate.json']);
});

test('ECOS card exposes date, value and exact unit outside the collapsed original fields', async () => {
  const view = await page();
  const card = view.nodes['#results'].children[0];
  const summary = card.children.find(child => child.className === 'api-card-summary');
  assert.match(summary.textContent,/2026-10-01/);
  assert.match(summary.textContent,/2\.75 연%/);
  assert.equal(card.children.find(child => child.tagName === 'details').open,undefined);
});

test('summary preserves zero, currency and unknown units without inventing a rate or monetary unit', async () => {
  const view = await page();
  const fields = vm.runInContext(`summaryFields({basDt:'20260930',crtmAcitAmt:0,curCd:'KRW',nPptAmt:'1234'})`, view.context);
  assert.ok(fields.some(([label,value]) => label === '당기 금액' && value === '0 원'));
  const unknown = vm.runInContext(`summaryFields({basYm:'202609',nPptAmt:'1234'})`, view.context);
  assert.ok(unknown.some(([label,value]) => label === '순자산' && value === '1234 (단위 미제공)'));
});

test('deposit card exposes provider, disclosure month, terms and rate range', async () => {
  const view = await page();
  const fields = vm.runInContext(`summaryFields({provider:'우리은행',disclosure_month:'202609',options:[{term_months:12,base_rate_percent:2.4,maximum_rate_percent:3.8},{term_months:24,base_rate_percent:2.5,maximum_rate_percent:3.9}]})`,view.context);
  const text = fields.map(pair => pair.join(': ')).join('\n');
  assert.match(text,/2026-09/);
  assert.match(text,/우리은행/);
  assert.match(text,/2\.4 ~ 2\.5%/);
  assert.match(text,/12 · 24개월/);
});

test('insurance premium summary keeps age, applicant category and coverage context visible', async () => {
  const view = await page();
  const fields = vm.runInContext(`summaryFields({basDt:'20260901',cmpyNm:'KB손보',age:'50',ptrn:'유병력자',mog:'(유병력자)상해입원',mlInsRt:'3228',fmlInsRt:'3914'})`,view.context);
  const text = fields.map(pair => pair.join(': ')).join('\n');
  assert.match(text,/보험료 기준 나이: 50세/);
  assert.match(text,/가입대상 구분: 유병력자/);
  assert.match(text,/보장 항목: \(유병력자\)상해입원/);
  assert.match(text,/남성 보험료: 3228/);
  assert.match(text,/여성 보험료: 3914/);
  const textualAge = vm.runInContext(`summaryFields({age:'만 50세',mlInsRt:'3228'})`,view.context);
  assert.ok(textualAge.some(([label,value]) => label === '보험료 기준 나이' && value === '만 50세'));
});

test('dataset count mismatch leaves no rows and gives recovery guidance', async () => {
  const view = await page('',[{...published,count:2}]);
  assert.match(view.nodes['#results'].textContent,/불러오지 못했습니다/);
  assert.doesNotMatch(view.nodes['#results'].textContent,/2\.75/);
  assert.equal(view.nodes['#next'].disabled,true);
});

test('public page has no JSON download affordance and shares the search navigation', () => {
  const html = fs.readFileSync(new URL('../../docs/api-data.html',import.meta.url),'utf8');
  assert.doesNotMatch(html,/json-link|선택 자료 JSON/);
  assert.match(html,/정보 검색/);
  assert.match(html,/자료 현황/);
  assert.match(html,/api-data\.js\?v=2026\.10\.06\.4/);
});

test('recovery updates the deep link, query edits sync, and clearing selection removes target parameters', async () => {
  const original = '?source=source.finlife&operation=creditLoan-020000&q=기준&keep=1';
  const view = await page(original);
  assert.equal(view.location.search,original, 'failed initial target must keep the requested URL');
  await view.select('0');
  let params = new URLSearchParams(view.location.search);
  assert.equal(params.get('source'),published.source_id);
  assert.equal(params.get('operation'),published.operation);
  assert.equal(params.get('q'),'기준');
  assert.equal(params.get('keep'),'1');
  view.type('2.75');
  assert.equal(new URLSearchParams(view.location.search).get('q'),'2.75');
  const reloaded = await page(view.location.search);
  assert.match(reloaded.nodes['#results'].textContent,/2\.75/);
  view.type('');
  assert.equal(new URLSearchParams(view.location.search).has('q'),false);
  await view.select('');
  params = new URLSearchParams(view.location.search);
  assert.equal(params.has('source'),false);
  assert.equal(params.has('operation'),false);
  view.type('비활성 검색');
  assert.equal(new URLSearchParams(view.location.search).has('q'),false);
});

test('display and search decode entities once while original fields stay unchanged and markup stays text', async () => {
  const raw = {prdNm:'A &amp; B',prdDesc:'청년 &#47700;&#49464; &lt;img src=x onerror=alert(1)&gt; &amp;lt;'};
  const view = await page('',[published],[raw]);
  let card = view.nodes['#results'].children[0];
  assert.equal(card.children[0].textContent,'A & B');
  const summary = card.children.find(child => child.className === 'api-card-summary');
  assert.match(summary.textContent,/청년 메세 <img src=x onerror=alert\(1\)> &lt;/);
  assert.equal(summary.children.some(child => child.tagName === 'img'),false);
  const details = card.children.find(child => child.tagName === 'details');
  assert.match(details.textContent,/A &amp; B/);
  assert.match(details.textContent,/&#47700;/);
  view.type('A & B');
  assert.equal(view.nodes['#results'].children[0].tagName,'article');
  view.type('청년 메세');
  assert.equal(view.nodes['#results'].children[0].tagName,'article');
  assert.equal(vm.runInContext(`decodeDisplayText('&#x110000; &#xD800; &amp;lt;')`,view.context),'&#x110000; &#xD800; &lt;');
});
