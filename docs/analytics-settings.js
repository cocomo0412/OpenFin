(() => {
  const key = 'openfin.analytics.optOut';
  const toggle = document.querySelector('#analytics-opt-out');
  const status = document.querySelector('#preference-status');
  const panel = document.querySelector('#preference-panel');

  function render() {
    try {
      const excluded = localStorage.getItem(key) === '1';
      toggle.checked = excluded;
      toggle.disabled = false;
      panel.dataset.state = excluded ? 'excluded' : 'included';
      status.textContent = excluded
        ? '집계 제외 켜짐 · 이 브라우저의 새 접속은 통계에 포함되지 않습니다.'
        : '집계 제외 꺼짐 · 이 브라우저의 새 접속은 통계에 포함됩니다.';
    } catch {
      toggle.disabled = true;
      panel.dataset.state = 'error';
      status.textContent = '브라우저 저장소에 접근할 수 없습니다. 설정을 확인할 수 없는 동안은 방문 집계를 중지합니다.';
    }
  }

  toggle.addEventListener('change', () => {
    try {
      if (toggle.checked) localStorage.setItem(key, '1');
      else localStorage.removeItem(key);
      render();
    } catch {
      render();
      status.textContent = '설정을 저장하지 못했습니다. 브라우저의 사이트 데이터 저장 허용 여부를 확인해 주세요.';
    }
  });
  window.addEventListener('storage', (event) => {
    if (event.key === key || event.key === null) render();
  });
  render();
})();
