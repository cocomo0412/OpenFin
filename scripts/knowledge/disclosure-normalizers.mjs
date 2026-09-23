import {sha256} from './common.mjs';

// Multi-row HTML headings are not in data-column order. Explicitly map the
// two official table layouts, and fail closed if the layout changes.
export function normalizePensionGroup(group) {
  const fund = group.group === '3';
  const labels = ['금융회사', '상품명', '상품유형', ...(fund ? ['위험등급'] : []),
    fund ? '설정일' : '최초판매일', '판매여부', fund ? '순자산총액' : '적립금총액',
    ...['1년','3년','5년','7년','10년'].map(year => `${year} 연평균수익률(%)`),
    '누적연평균수익률(%)', '연평균수수료율(%)', ...(fund ? ['상품 판매사'] : [])];
  const products = new Map();
  for (const row of group.products) {
    if (row.cells.length !== labels.length) throw new Error(`Pension ${group.group}: unexpected column count ${row.cells.length}`);
    if (!/^\d{4}-Q[1-4]$/.test(row.basis_period)) throw new Error('Invalid disclosure quarter');
    if (row.provider !== row.cells[0] || row.title !== row.cells[1]) throw new Error('Pension identity mismatch');
    const identity = [group.group, row.provider, row.title, row.cells[2], row.cells[fund ? 4 : 3]];
    const record = `pension:${group.group}:${sha256(identity).slice(7,31)}`;
    const product = products.get(record) || {record, ...row, observations: []};
    product.observations.push({fields:Object.fromEntries(labels.map((label,i)=>[label,row.cells[i]])),receipt:row.receipt});
    products.set(record, product);
  }
  return [...products.values()];
}
