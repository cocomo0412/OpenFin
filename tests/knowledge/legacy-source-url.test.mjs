import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

// Exercise the maintained renderer without loading its generated financial data.
const app = fs.readFileSync(new URL('../../docs/opentax/app.js', import.meta.url), 'utf8');
const renderer = app.slice(app.indexOf('\n') + 1).replace(/\}\)\(\);\s*$/, `
  globalThis.testLinks = { sourceBlock, freshnessBlock };
})();`);

function render(url, title = '공식 출처') {
  const nodes = new Map();
  const context = vm.createContext({
    console, URL, Map, Set,
    ONTOLOGY_DATA: {
      items: [{ id: 'source.fixture', type: 'source', title, url }],
      type_labels: { source: '출처' }, type_roles: {}, summary: { type_counts: { source: 1 } },
    },
    document: {
      addEventListener() {},
      querySelector(selector) {
        if (!nodes.has(selector)) nodes.set(selector, { innerHTML: '', textContent: '', addEventListener() {} });
        return nodes.get(selector);
      },
    },
  });
  vm.runInContext(renderer, context, { filename: 'docs/opentax/app.js' });
  return {
    source: context.testLinks.sourceBlock(['source.fixture']),
    metadata: context.testLinks.freshnessBlock({ source_urls: [url], status_check_url: url, legal_basis: [{ title, url }] }),
    cards: nodes.get('[data-source-list]').innerHTML,
  };
}

test('all legacy source link sinks reject executable, ambiguous and credential URLs', () => {
  for (const url of [
    'javascript:void(0)', 'JaVaScRiPt:void(0)', 'data:text/html,<script>void(0)</script>',
    'vbscript:msgbox(1)', 'java\nscript:void(0)', '//example.com/path', '/relative',
    'https://', 'https://user:password@example.com/', 'https://example.com/\npath',
  ]) {
    for (const [sink, html] of Object.entries(render(url))) {
      assert.doesNotMatch(html, /<a\b[^>]*\bhref=/i, `${sink}: unsafe URL became clickable`);
      assert.doesNotMatch(html, /<script>/i, `${sink}: URL was emitted as markup`);
    }
  }
});

test('all legacy source link sinks preserve HTTP(S) and escape URL/title markup', () => {
  for (const url of ['https://example.com/source?a=1&b=2', 'http://example.com/source', 'HTTPS://example.com/source']) {
    const output = render(url, '<img src=x onerror=void(0)>');
    for (const [sink, html] of Object.entries(output)) {
      assert.match(html, /<a\b[^>]*\bhref="https?:\/\//i, sink);
      assert.match(html, /rel="noopener noreferrer"/, sink);
      assert.doesNotMatch(html, /<img\b/, sink);
    }
    assert.match(output.source, /&lt;img/);
  }
  const output = render('https://example.com/?q="onclick="void(0)');
  assert.match(output.source, /q=&quot;onclick=&quot;/);
  assert.doesNotMatch(output.source, /"onclick="/);
});
