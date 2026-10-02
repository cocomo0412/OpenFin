const messages = {
  'opted-out': ['이 브라우저의 방문 집계 제외 중', '저장된 설정에 따라 Cloudflare 수집 코드를 불러오지 않았습니다. 홈페이지와 탐색기를 이용해도 이 브라우저의 새 접속은 집계하지 않습니다.'],
  'storage-unavailable': ['방문 집계를 일시 중지했습니다', '브라우저 저장소에 접근할 수 없어 제외 설정을 확인하지 못했습니다. 설정을 확인할 수 있을 때까지 수집 코드를 불러오지 않습니다.'],
  loaded: ['방문 통계 코드 로딩 완료', 'Cloudflare의 수집 코드가 로드되었습니다. 실제 수신 여부와 방문 추이는 아래 대시보드에서 확인해 주세요.'],
  excluded: ['로컬·미리보기 접속은 집계 제외', '공개 OpenFin 주소에서 열어 주세요. 로컬 개발과 다른 호스트의 접속은 운영 통계에 포함하지 않습니다.'],
  error: ['방문 통계 코드를 불러오지 못했습니다', '광고 차단 기능 또는 네트워크 연결을 확인해 주세요. 홈페이지 기능은 계속 사용할 수 있습니다.'],
  loading: ['방문 통계 코드 연결 중', 'Cloudflare의 수집 코드를 불러오고 있습니다.'],
};
document.querySelector('#test-path').textContent = location.pathname;
function renderConnection() {
  const state = document.documentElement.dataset.analyticsStatus;
  const message = messages[state];
  if (!message) return;
  document.querySelector('#connection-panel').dataset.state = state;
  document.querySelector('#connection-title').textContent = message[0];
  document.querySelector('#connection-detail').textContent = message[1];
}
new MutationObserver(renderConnection).observe(document.documentElement, {
  attributes: true, attributeFilter: ['data-analytics-status'],
});
renderConnection();
