import test from 'node:test';
import assert from 'node:assert/strict';
import {publicReceipt} from '../../scripts/knowledge/disclosure-receipts.mjs';

test('public receipts remove anonymous sessions but retain product identity and checksums', () => {
 const original={url:'https://example.com/card;jsessionid=private?cdPrdCd=123&session_id=private&lang=ko',final_url:'https://example.com/detail?cohsessionid=private&product=456',sha256:'abc',collected_at:'2026-09-23'};
 const clean=publicReceipt(original);
 assert.equal(clean.url,'https://example.com/card?cdPrdCd=123&lang=ko');
 assert.equal(clean.final_url,'https://example.com/detail?product=456');
 assert.equal(clean.sha256,original.sha256);
 assert.equal(clean.collected_at,original.collected_at);
 assert.match(original.url,/private/);
 assert.deepEqual(publicReceipt(clean),clean);
});
