(() => {
  const root = document.documentElement;
  // This is a public Web Analytics site identifier, not a Cloudflare API key.
  const token = '506ffe638ea34d46b350793750e228e8';
  const production = location.protocol === 'https:'
    && location.hostname === 'cocomo0412.github.io'
    && /^\/OpenFin(?:\/|$)/.test(location.pathname);

  if (!production) {
    root.dataset.analyticsStatus = 'excluded';
    return;
  }
  if (document.querySelector('script[data-cf-beacon]')) return;

  root.dataset.analyticsStatus = 'loading';
  const script = document.createElement('script');
  script.type = 'module';
  script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  script.dataset.cfBeacon = JSON.stringify({ token });
  script.addEventListener('load', () => { root.dataset.analyticsStatus = 'loaded'; });
  script.addEventListener('error', () => { root.dataset.analyticsStatus = 'error'; });
  document.body.append(script);
})();
