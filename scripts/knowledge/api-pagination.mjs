// Fail instead of silently publishing a partial collection.
export async function collectPages(load, { maxPages = 1000, identity } = {}) {
  const items = [];
  const seen = new Set();
  const identities = new Set();
  let expectedTotal;
  for (let page = 1; page <= maxPages; page++) {
    const result = await load(page);
    if (!Array.isArray(result.items) || !Number.isSafeInteger(result.total) || result.total < 0) throw new Error('Invalid pagination metadata');
    expectedTotal ??= result.total;
    if (result.total !== expectedTotal) throw new Error('API total changed during pagination');
    const signature = JSON.stringify(result.items);
    if (seen.has(signature) && result.items.length) throw new Error('API repeated a page');
    seen.add(signature);
    if (identity) for (const item of result.items) {
      const id = identity(item);
      if (id == null || id === '' || identities.has(id)) throw new Error('API missing or duplicate record identity');
      identities.add(id);
    }
    items.push(...result.items);
    if (items.length > expectedTotal) throw new Error('API exceeded declared total');
    if (items.length === expectedTotal) return items;
    if (!result.items.length) throw new Error('API ended before declared total');
  }
  throw new Error('Page limit exceeded; no complete result available');
}
