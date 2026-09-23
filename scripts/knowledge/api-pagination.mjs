// Fail instead of silently publishing a partial collection.
export async function collectPages(load, { maxPages = 1000 } = {}) {
  const items = [];
  const seen = new Set();
  for (let page = 1; page <= maxPages; page++) {
    const result = await load(page);
    if (!Array.isArray(result.items) || !Number.isSafeInteger(result.total) || result.total < 0) throw new Error('Invalid pagination metadata');
    const signature = JSON.stringify(result.items);
    if (seen.has(signature) && result.items.length) throw new Error('API repeated a page');
    seen.add(signature);
    items.push(...result.items);
    if (items.length >= result.total) return items;
    if (!result.items.length) throw new Error('API ended before declared total');
  }
  throw new Error('Page limit exceeded; no complete result available');
}
