"""Collect explicitly current insurer policy PDFs, separate from product summaries.

Run with a Python environment containing pypdfium2. Raw documents/text stay private;
only document URLs, version periods and verification receipts enter exports.
"""
import hashlib
import json
import re
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote
import pypdfium2 as pdfium

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / '.api-candidates/disclosures'


def collect(target):
    index, link = target
    url = quote(link['url'], safe=':/?=&%+#')
    key = hashlib.sha256(url.encode()).hexdigest()
    destination = OUT / ('policy-' + key + '.pdf')
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'OpenFin/1.0 disclosure review'}), timeout=60) as response:
            raw = response.read(80_000_001)
            if len(raw) > 80_000_000 or not raw.startswith(b'%PDF-'):
                raise ValueError('Not a supported PDF response')
            final_url, status = response.url, response.status
        reader = pdfium.PdfDocument(raw)
        pages = []
        for page in reader:
            textpage = page.get_textpage()
            pages.append(textpage.get_text_range())
            textpage.close(); page.close()
        reader.close()
        if not pages or '약관' not in ''.join(pages[:10]):
            raise ValueError('Policy identity not found in opening pages')
        if sum(len(text.strip()) for text in pages) < 1000:
            raise ValueError('Policy text requires OCR review')
        destination.write_bytes(raw)
        destination.with_suffix('.txt').write_text('\n\n'.join(pages), encoding='utf-8')
        period = re.search(r'(\d{4}\.\d{2}\.\d{2})\s*~\s*현재', link['context'])
        return {'index_url': index['url'], 'url': link['url'], 'document_type': 'policy-terms',
                'effective_from': period[1].replace('.', '-'), 'page_count': len(pages),
                'text_characters': sum(map(len, pages)),
                'scope': 'current policy document collected; individual clause review pending',
                'receipt': {'url': url, 'final_url': final_url, 'http_status': status,
                            'collected_at': datetime.now(timezone.utc).isoformat(),
                            'sha256': hashlib.sha256(raw).hexdigest()}}
    except Exception as error:
        return {'index_url': index['url'], 'url': link['url'], 'error': str(error)}


if __name__ == '__main__':
    indexes = json.loads((OUT / 'insurance-provider-indexes.json').read_text(encoding='utf-8'))['results']
    targets = [(index, link) for index in indexes for link in index.get('document_links', [])
               if link['label'].strip() == '약관' and re.search(r'\d{4}\.\d{2}\.\d{2}\s*~\s*현재', link['context'])
               and '.pdf' in link['url'].lower()]
    # PDFium is not thread-safe; keep document parsing sequential.
    results = []
    for target in targets:
        results.append(collect(target))
        print(json.dumps({'checked': len(results), 'collected': sum('receipt' in r for r in results)}), flush=True)
    (OUT / 'insurance-policy-documents.json').write_text(json.dumps({'results': results}, ensure_ascii=False, indent=2), encoding='utf-8')
