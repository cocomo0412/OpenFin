const result = document.querySelector('[data-collection-result]');
try {
  const response = await fetch('./opentax/kdic-companies-current.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('Snapshot unavailable');
  const data = await response.json();
  const date = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(new Date(data.collected_at));
  document.querySelector('[data-collection-short]').textContent = `${date} · 보호대상 금융회사 ${data.count}건 반영`;
  result.textContent = `${date} 수집 · 예금보험공사 금융회사 ${data.count.toLocaleString('ko-KR')}건. 전체 페이지와 건수·행번호·회사명을 확인했습니다. 금융회사 목록의 수집일이며, 개별 상품의 갱신일은 아닙니다.`;
  const list = document.querySelector('[data-company-list]');
  for (const row of data.companies) {
    const item = document.createElement('span');
    item.textContent = row.fncIstNm;
    list.append(item);
  }
} catch {
  result.textContent = '수집 결과를 불러오지 못했습니다. 갱신 완료 여부는 아래 JSON 자료를 확인해 주세요.';
}

const summary = document.querySelector('[data-api-collection-summary]');
try {
  const response = await fetch('./opentax/collection-inventory.json', { cache: 'no-store' });
  if (!response.ok) throw new Error('Inventory unavailable');
  const inventory = await response.json();
  const sources = new Set(inventory.datasets.map(row => row.source_id)).size;
  const total = inventory.datasets.reduce((sum, row) => sum + row.count, 0);
  const date = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul' }).format(new Date(Math.max(...inventory.datasets.map(row => Date.parse(row.collected_at)))));
  document.querySelectorAll('[data-snapshot-basis-date]').forEach(node => {
    node.textContent = inventory.snapshot_basis_date;
    node.title = inventory.basis_date_meaning;
  });
  document.querySelector('[data-collection-short]').textContent = `${date} · ${sources}개 API 출처 수집본 확인`;
  const kdic = inventory.datasets.find(row => row.operation === 'getProductList202607');
  const bank = inventory.datasets.find(row => row.source_id === 'source.fsc.domestic-bank-statistics');
  document.querySelector('[data-resolved-collections]').textContent = kdic && bank
    ? `예금자보호 상품 ${kdic.count.toLocaleString('ko-KR')}행, 국내은행 통계 ${bank.count.toLocaleString('ko-KR')}행. 수집일 ${date}. 행번호와 표별 총건수를 확인해 참고자료로 반영했습니다.`
    : '예금자보호 상품·국내은행 통계의 전체 수집 결과가 아직 확인되지 않았습니다.';
  summary.textContent = `${sources}개 출처 · ${inventory.datasets.length}개 수집본 · ${total.toLocaleString('ko-KR')}행. 원본 항목과 제공기관 기준일을 유지해 본문·검색에 반영했습니다. 행수는 상품 수와 다릅니다.`;
  const list = document.querySelector('[data-api-collection-list]');
  for (const row of inventory.datasets) {
    const paragraph = document.createElement('p');
    const basis = row.basis_end ? `${row.basis_start} ~ ${row.basis_end}` : '제공 기준일 없음';
    paragraph.textContent = `${row.title} (${row.operation}) · ${row.count.toLocaleString('ko-KR')}행 · 자료 기준 ${basis}`;
    list.append(paragraph);
  }
  for (const row of inventory.pending) {
    const paragraph = document.createElement('p');
    paragraph.textContent = `확인 필요: ${row.reason}`;
    list.append(paragraph);
  }
} catch {
  summary.textContent = '추가 수집 현황을 불러오지 못했습니다. 수집 현황 JSON을 확인해 주세요.';
  document.querySelectorAll('[data-snapshot-basis-date]').forEach(node => { node.textContent = '확인 필요'; });
}

try {
  const response=await fetch('./opentax/canonical-refresh-report.json',{cache:'no-store'});
  if(!response.ok) throw new Error('Refresh report unavailable');
  const report=await response.json();
  const paragraph=document.createElement('p');
  paragraph.textContent=`${report.canonical_refreshed.toLocaleString('ko-KR')}개 기록. 예금 ${report.domains.deposit.current_total}개·적금 ${report.domains.saving.current_total}개·예금자보호 ${report.domains.deposit_protection.current_entities.toLocaleString('ko-KR')}개. 이번 목록에서 빠진 과거 상품은 판매 종료로 단정하지 않고 재확인 대상으로 유지합니다.`;
  const entry=document.createElement('div'); entry.className='collection-entry';
  const label=document.createElement('strong'); label.textContent='데이터 반영·검증';
  entry.append(label,paragraph); summary.closest('.collection-entry').insertAdjacentElement('afterend',entry);

} catch {
  const note=document.createElement('p');note.textContent='온톨로지 갱신 검증 보고서를 불러오지 못했습니다.';summary?.insertAdjacentElement('afterend',note);
}
