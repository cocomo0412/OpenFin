const select = document.querySelector('#dataset');
const query = document.querySelector('#query');
const meta = document.querySelector('#meta');
const results = document.querySelector('#results');
let entries = [], rows = [], filtered = [], page = 0, generation = 0;
const size = 20;
const labels = {prdNm:'상품명',finPrdNm:'금융상품명',finprdnm:'금융상품명',fncIstNm:'금융회사',fncoNm:'금융회사',cmpyNm:'회사명',fndNm:'펀드명',basDt:'자료 기준일',basYm:'자료 기준월',TIME:'통계 기준일',DATA_VALUE:'통계값',UNIT_NAME:'단위',prdSalDscnDt:'상품 판매중단일',regDate:'등록일',_source_table:'통계표',insttNm:'기관명',prdDesc:'상품 설명'};
function render() {
  results.replaceChildren();
  for (const row of filtered.slice(page * size, (page + 1) * size)) {
    const article = document.createElement('article');
    const heading = document.createElement('h2');
    heading.textContent = row.product_name || row.prdNm || row.finPrdNm || row.finprdnm || row.fndNm || row.fncIstNm || row.fncoNm || row.insttNm || row.ITEM_NAME1 || entries[select.value].title;
    article.append(heading);
    const details = document.createElement('details');
    const summary = document.createElement('summary'); summary.textContent = '원자료 필드 보기'; details.append(summary);
    const dl = document.createElement('dl');
    for (const [key, value] of Object.entries(row)) {
      const dt = document.createElement('dt'); dt.textContent = labels[key] ? `${labels[key]} (${key})` : key;
      const dd = document.createElement('dd'); dd.textContent = value == null || value === '' ? '미제공' : typeof value === 'object' ? JSON.stringify(value) : String(value);
      dl.append(dt, dd);
    }
    details.append(dl); article.append(details); results.append(article);
  }
  document.querySelector('#page').textContent = `${filtered.length.toLocaleString('ko-KR')}행 · ${filtered.length ? page + 1 : 0} / ${Math.ceil(filtered.length / size)}페이지`;
  document.querySelector('#prev').disabled = page === 0;
  document.querySelector('#next').disabled = (page + 1) * size >= filtered.length;
}
function search() { const q = query.value.trim().toLocaleLowerCase(); filtered = rows.filter(row => !q || JSON.stringify(row).toLocaleLowerCase().includes(q)); page = 0; render(); }
async function load() {
  const token = ++generation; const entry = entries[select.value]; rows = []; search(); meta.textContent = '수집 자료를 불러오는 중입니다.';
  document.querySelector('#json-link').hidden = true;
  try {
    const response = await fetch('./' + entry.path); if (!response.ok) throw new Error();
    const data = await response.json(); if (token !== generation) return;
    if (data.items.length !== entry.count) throw new Error();
    rows = data.items;
    meta.textContent = `수집일 ${entry.collected_at.slice(0, 10)} · 원자료 기준 ${entry.basis_start || '미제공'}${entry.basis_end && entry.basis_end !== entry.basis_start ? ' ~ ' + entry.basis_end : ''} · ${entry.count.toLocaleString('ko-KR')}행 · 참고자료`;
    const link = document.querySelector('#json-link'); link.href = './' + entry.path; link.hidden = false; search();
  } catch { if (token === generation) meta.textContent = '자료를 불러오지 못했습니다. 다른 자료를 선택하거나 새로고침해 주세요.'; }
}
select.addEventListener('change', load); query.addEventListener('input', search);
document.querySelector('#prev').addEventListener('click', () => { if (page > 0) { page--; render(); } });
document.querySelector('#next').addEventListener('click', () => { if ((page + 1) * size < filtered.length) { page++; render(); } });
try {
  const response = await fetch('./opentax/collection-inventory.json'); if (!response.ok) throw new Error();
  entries = (await response.json()).datasets.filter(entry => entry.reference_published);
  for (const [index, entry] of entries.entries()) { const option = document.createElement('option'); option.value = index; option.textContent = `${entry.title} · ${entry.operation}`; select.append(option); }
  if (!entries.length) throw new Error();
  const params = new URLSearchParams(location.search);
  const selected = entries.findIndex(entry => entry.source_id === params.get('source') && (!params.get('operation') || entry.operation === params.get('operation')));
  if (selected >= 0) select.value = selected;
  query.value = params.get('q') || '';
  await load();
} catch { meta.textContent = '수집 자료 목록을 불러오지 못했습니다.'; }
