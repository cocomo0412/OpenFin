// MCP catalog metadata is independent of the website manifest.
async function loadMcpCatalogStatus() {
  const target = document.querySelector('[data-mcp-catalog]');
  if (!target) return;
  try {
    const response = await fetch('https://openfin.cocomo0412.workers.dev/health', {
      credentials: 'omit', cache: 'no-store', signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error('MCP metadata unavailable');
    const data = await response.json();
    if (data.edition !== 'free-tax-pilot' || data.domain !== 'tax'
        || !Number.isSafeInteger(data.item_count) || data.item_count < 0
        || typeof data.basis_date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data.basis_date)) {
      throw new Error('Unexpected MCP catalog metadata');
    }
    target.textContent = `MCP 제공 항목: ${data.item_count.toLocaleString('ko-KR')}개 · MCP 자료 기준일: ${data.basis_date}`;
  } catch {
    target.textContent = 'MCP 항목 수와 자료 기준일을 불러오지 못했습니다. 연결 후 exports 도구로 확인할 수 있습니다.';
  }
}

loadMcpCatalogStatus();
