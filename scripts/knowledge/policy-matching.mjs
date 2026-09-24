// A provider listing is not a product/version identity. Fail closed on ambiguity.
export function normalizePolicyTitle(value) {
  return value.normalize('NFKC').toLowerCase().replace(/무배당|\(무\)/g, '').replace(/[^a-z0-9가-힣+]/g, '');
}
function indexIdentity(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, '');
    // Official index migrations; product title and version remain mandatory.
    if (['dgbfnlife.com','imlifeins.co.kr'].includes(host) && url.pathname === '/BA/BA_A020.do') return 'imlife-policy-index';
    if (host === 'hanwhalife.com' && (url.pathname === '/index.jsp' && url.search.includes('DF_GDDN000_P10000') || url.pathname.endsWith('/goodslist/DF_GDGL000_P10000.do'))) return 'hanwha-policy-index';
    if (host === 'cardif.co.kr' && ['/ko/web/main/disclosure/product/onsale','/web/main/disclosure/product/onsale'].includes(url.pathname)) return 'cardif-policy-index';
    if (host === 'chubblife.co.kr' && url.pathname === '/front/official/sale/listSale.do') return 'chubb-policy-index';
    if (host === 'nhlife.co.kr' && ['/ho/on/HOON0004M00.nhl','/ho/ig/HOIG0001M00.nhl'].includes(url.pathname)) return 'nh-policy-index';
    if (host === 'shinhanlife.co.kr' && ['/hp/cdhi0010.do','/hp/cdhi0030.do'].includes(url.pathname)) return 'shinhan-policy-index';
    return host + url.pathname + url.search;
  }
  catch { return ''; }
}
export function matchingPolicy(row, document) {
  const identity = indexIdentity(document.index_url);
  if (!identity || !(row.provider_disclosure_urls || []).some(url => indexIdentity(url) === identity)) return false;
  const dates = (row.cells || []).filter(cell => /^\d{4}-\d{2}-\d{2}$/.test(cell));
  if (!dates.includes(document.effective_from)) return false;
  if (document.product_title) return normalizePolicyTitle(row.title) === normalizePolicyTitle(document.product_title);
  // Product-specific ABL indexes identify the family; require the matching start
  // date above, and the complete normalized product name in its PDF filename.
  const url = new URL(document.url);
  const file = decodeURIComponent(url.pathname.split('/').at(-1));
  const title = normalizePolicyTitle(row.title);
  return title.length >= 8 && normalizePolicyTitle(file).includes(title);
}
