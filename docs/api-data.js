const select = document.querySelector('#dataset');
const query = document.querySelector('#query');
const meta = document.querySelector('#meta');
const results = document.querySelector('#results');
let entries = [], rows = [], filtered = [], page = 0, generation = 0;
let emptyMessage = '자료를 선택해 주세요.';
const size = 20;
const labels = {prdNm:'상품명',finPrdNm:'금융상품명',finprdnm:'금융상품명',fncIstNm:'금융회사',fncoNm:'금융회사',cmpyNm:'회사명',fndNm:'펀드명',basDt:'자료 기준일',basYm:'자료 기준월',TIME:'통계 기준일',DATA_VALUE:'통계값',UNIT_NAME:'단위',prdSalDscnDt:'상품 판매중단일',regDate:'등록일',_source_table:'통계표',insttNm:'기관명',prdDesc:'상품 설명'};
const operationLabels = {
  StatisticSearch:'기준금리', getLoanProductHandlingAgencyInfo:'상품 취급기관', getLoanProductSearchingInfo:'대출상품', getCenterMisoBranchInfo:'지원센터',
  getDomeBankGeneInfo:'은행 일반현황', getFnCoOutl:'회사 개요', getFnCoBs_V2:'재무상태표', getFnCoSummFinaStat_V2:'요약 재무제표', getFnCoIs_V2:'손익계산서',
  getTrustScaleInfo:'신탁 규모', getFundTotalNetEssetInfo:'펀드 순자산', getCMAStatus:'CMA 현황', getGrantingOfCreditBalanceInfo:'신용공여 잔고',
  getSecuritiesMarketTotalCapitalInfo:'증시 자금', getDLSAndDLBInfo:'DLS·DLB 현황', getELSAndELBInfo:'ELS·ELB 현황', getDerivationProductTradingInfo:'파생상품 거래',
  getStandardCodeInfo:'펀드 기본정보', getMicroCreditInfo:'미소금융 실적', getSunshineLoanInfo:'햇살론 실적', getOrdinaryFinanceInfo:'서민금융 상품',
  getInsuranceInfo:'실손보험', getFundInfo:'펀드 현황', 'uloan-info':'기간별 금리', getProductList202607:'보호대상 상품', getCompanyList202607:'금융회사', deposit:'정기예금', saving:'적금',
};
function hasValue(value) { return value !== null && value !== undefined && value !== '' && value !== '-'; }
function firstValue(row, keys) { return keys.map(key => row[key]).find(hasValue); }
function decodeDisplayText(value) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  return String(value ?? '').replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, key) => {
    if (key[0] !== '#') return named[key.toLowerCase()];
    const hex = key[1].toLowerCase() === 'x';
    const code = parseInt(key.slice(hex ? 2 : 1), hex ? 16 : 10);
    return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : entity;
  });
}
function dateText(value) {
  const text = String(value || '');
  if (/^\d{8}$/.test(text)) return `${text.slice(0,4)}-${text.slice(4,6)}-${text.slice(6,8)}`;
  if (/^\d{6}$/.test(text)) return `${text.slice(0,4)}-${text.slice(4,6)}`;
  return text || '미제공';
}
function rowTitle(row, entry) {
  return decodeDisplayText(firstValue(row, ['product_name','finPrdNm','finprdnm','prdNm','fndNm','brnNm','ITEM_NAME1','acitNm','grnPrdNm','fncIstNm','fncoNm','insttNm','cmpyNm']) || entry?.title || '수집 자료');
}
function summaryFields(row) {
  const fields = [];
  const add = (label, value) => { if (hasValue(value)) fields.push([label, decodeDisplayText(value)]); };
  add('자료 기준일', dateText(firstValue(row, ['basDt','basYm','TIME','disclosure_month','applyDy'])));
  add('제공·취급 기관', firstValue(row, ['provider','fncIstNm','fncoNm','cmpyNm','insttNm','ofrInstNm','ofrinstnm']));
  if (hasValue(row.mlInsRt) || hasValue(row.fmlInsRt)) {
    add('보험료 기준 나이', hasValue(row.age) && /^\d+$/.test(String(row.age)) ? `${row.age}세` : row.age);
    add('가입대상 구분', row.ptrn);
    add('보장 항목', row.mog);
  }
  if (hasValue(row.DATA_VALUE)) add('통계값', `${row.DATA_VALUE} ${row.UNIT_NAME || '(단위 미제공)'}`);
  const currency = row.curCd === 'KRW' ? '원' : row.curCd || '단위 미제공';
  if (hasValue(row.crtmAcitAmt)) add('당기 금액', `${row.crtmAcitAmt} ${currency}`);
  const metricLabels = {fncoTastAmt:'총자산',fncoTcptAmt:'총자본',fncoBzopPft:'영업이익',nPptAmt:'순자산',nPptTotAmt:'순자산 총액',basprc:'기준가격',val:'수치',xcsmCnt:'인원 수치',lnAmt:'대출 금액',lnCcnt:'대출 건수',grnAmt:'보증 금액',grnCcnt:'보증 건수',actBal:'계좌 잔액',actCnt:'계좌 수',amt:'금액',ccnt:'건수',crdTrFingWhl:'신용거래융자 전체',invrDpsgAmt:'투자자 예탁금',trqu:'거래 수량',trPrcUsd:'거래 가격',mlInsRt:'남성 보험료',fmlInsRt:'여성 보험료'};
  for (const [key, label] of Object.entries(metricLabels)) {
    if (hasValue(row[key])) add(label, `${row[key]} ${row.UNIT_NAME || row.unit || (row.curCd ? currency : '(단위 미제공)')}`);
  }
  add('구분', [row.iqBs,row.xcsmDcdNm,row.fndTp,row.mngInvTgt,row.tstMthdCtg,row.presCtg,row.ctgDlbDls,row.ctgElbEls].filter(hasValue).join(' · '));
  add('대출 한도', firstValue(row, ['lnLmt']) || (hasValue(row.lnlmt) ? `${row.lnlmt} (단위 미제공)` : ''));
  add('금리 안내', firstValue(row, ['irt']));
  for (const [key, label] of [['interest_10y','10년 금리'],['interest_15y','15년 금리'],['interest_20y','20년 금리'],['interest_30y','30년 금리']]) if (hasValue(row[key])) add(label, `${row[key]}%`);
  add('대상', firstValue(row, ['trgt','join_member']));
  add('가입 방법', row.join_way);
  add('주소', firstValue(row, ['adrs','fninstAdr','fncoAdr']));
  add('연락처', firstValue(row, ['telno','cnpl']));
  add('상품 유형', row.prdPttn);
  add('등록일', row.regDate ? dateText(row.regDate) : '');
  add('상품 설명', row.prdDesc);
  if (Array.isArray(row.options)) {
    for (const [key, label] of [['base_rate_percent','기본금리'],['maximum_rate_percent','최고우대금리']]) {
      const rates = row.options.map(option => option[key]).filter(hasValue).map(Number).filter(Number.isFinite);
      if (rates.length) add(label, `${Math.min(...rates)}${Math.min(...rates) !== Math.max(...rates) ? ' ~ ' + Math.max(...rates) : ''}% (기간·조건별 상이)`);
    }
    const terms = [...new Set(row.options.map(option => option.term_months).filter(hasValue))];
    if (terms.length) add('가입 기간', `${terms.join(' · ')}개월`);
  }
  return fields;
}
function appendFields(dl, fields) {
  for (const [label, value] of fields) {
    const dt = document.createElement('dt'); dt.textContent = label;
    const dd = document.createElement('dd'); dd.textContent = value;
    dl.append(dt, dd);
  }
}
function render() {
  results.replaceChildren();
  for (const row of filtered.slice(page * size, (page + 1) * size)) {
    const article = document.createElement('article');
    const heading = document.createElement('h2'); heading.textContent = rowTitle(row, entries[select.value]); article.append(heading);
    const cardSummary = document.createElement('dl'); cardSummary.className = 'api-card-summary'; appendFields(cardSummary, summaryFields(row)); article.append(cardSummary);
    const details = document.createElement('details');
    const summary = document.createElement('summary'); summary.textContent = '원자료 전체 항목 보기'; details.append(summary);
    const dl = document.createElement('dl');
    appendFields(dl, Object.entries(row).map(([key,value]) => [labels[key] ? `${labels[key]} (${key})` : key, value == null || value === '' ? '미제공' : typeof value === 'object' ? JSON.stringify(value) : String(value)]));
    details.append(dl); article.append(details); results.append(article);
  }
  if (!filtered.length) { const message = document.createElement('p'); message.className = 'api-empty'; message.textContent = rows.length ? '검색 결과가 없습니다. 검색어를 바꾸거나 지워 주세요.' : emptyMessage; results.append(message); }
  document.querySelector('#page').textContent = `${filtered.length.toLocaleString('ko-KR')}건 · ${filtered.length ? page + 1 : 0} / ${Math.ceil(filtered.length / size)}페이지`;
  document.querySelector('#prev').disabled = page === 0;
  document.querySelector('#next').disabled = (page + 1) * size >= filtered.length;
}
function search() { const q = decodeDisplayText(query.value).trim().toLocaleLowerCase(); filtered = rows.filter(row => !q || decodeDisplayText(JSON.stringify(row)).toLocaleLowerCase().includes(q)); page = 0; render(); }
function syncSelectionUrl() {
  const entry = select.value === '' ? null : entries[select.value];
  const url = new URL(location.href);
  if (entry) {
    url.searchParams.set('source', entry.source_id);
    url.searchParams.set('operation', entry.operation);
    if (query.value.trim()) url.searchParams.set('q', query.value.trim());
    else url.searchParams.delete('q');
  } else {
    for (const key of ['source','operation','q']) url.searchParams.delete(key);
  }
  history.replaceState(null, '', url.pathname + url.search + url.hash);
}
async function load() {
  const token = ++generation;
  const entry = select.value === '' ? null : entries[select.value];
  rows = []; query.disabled = !entry; emptyMessage = entry ? '수집 자료를 불러오는 중입니다.' : '위의 자료 선택 목록에서 공개 자료를 선택해 주세요.'; search();
  if (!entry) { meta.textContent = '자료를 선택해 주세요.'; return; }
  meta.textContent = '수집 자료를 불러오는 중입니다.';
  try {
    const response = await fetch('./' + entry.path); if (!response.ok) throw new Error();
    const data = await response.json(); if (token !== generation) return;
    if (!Array.isArray(data.items) || data.items.length !== entry.count) throw new Error();
    rows = data.items; emptyMessage = '이 수집본에는 자료가 없습니다.';
    meta.textContent = `${decodeDisplayText(entry.title)} · 수집일 ${entry.collected_at?.slice(0, 10) || '미기록'} · 원자료 기준 ${dateText(entry.basis_start)}${entry.basis_end && entry.basis_end !== entry.basis_start ? ' ~ ' + dateText(entry.basis_end) : ''} · ${entry.count.toLocaleString('ko-KR')}건 · 참고자료`;
    search();
  } catch { if (token === generation) { emptyMessage = '자료를 불러오지 못했습니다. 다른 자료를 선택하거나 새로고침해 주세요.'; meta.textContent = emptyMessage; search(); } }
}
select.addEventListener('change', () => { syncSelectionUrl(); return load(); });
query.addEventListener('input', () => { if (select.value !== '' && entries[select.value]) syncSelectionUrl(); search(); });
document.querySelector('#prev').addEventListener('click', () => { if (page > 0) { page--; render(); } });
document.querySelector('#next').addEventListener('click', () => { if ((page + 1) * size < filtered.length) { page++; render(); } });
async function init() {
  try {
    const response = await fetch('./opentax/collection-inventory.json'); if (!response.ok) throw new Error();
    const inventory = (await response.json()).datasets;
    entries = inventory.filter(entry => entry.reference_published);
    const placeholder = document.createElement('option'); placeholder.value = ''; placeholder.textContent = '자료를 선택해 주세요'; select.append(placeholder);
    for (const [index, entry] of entries.entries()) { const option = document.createElement('option'); option.value = String(index); option.textContent = `${decodeDisplayText(entry.title)} · ${operationLabels[entry.operation] || '수집 자료'}`; select.append(option); }
    const params = new URLSearchParams(location.search);
    query.value = params.get('q') || '';
    const targeted = params.has('source') || params.has('operation');
    const matches = entry => (!params.has('source') || entry.source_id === params.get('source')) && (!params.has('operation') || entry.operation === params.get('operation'));
    const selected = targeted ? entries.findIndex(matches) : 0;
    if (!entries.length || selected < 0) {
      select.value = ''; query.disabled = true;
      const known = targeted && inventory.some(matches);
      emptyMessage = known ? '요청한 자료는 현재 공개 대상이 아닙니다. 위 목록에서 다른 공개 자료를 선택해 주세요.' : targeted ? '요청한 자료를 찾을 수 없습니다. 위 목록에서 공개 자료를 선택해 주세요.' : '현재 공개된 수집 자료가 없습니다.';
      meta.textContent = emptyMessage; render(); return;
    }
    select.value = String(selected); await load();
  } catch { emptyMessage = '수집 자료 목록을 불러오지 못했습니다. 새로고침해 주세요.'; meta.textContent = emptyMessage; query.disabled = true; render(); }
}
const initPromise = init();
