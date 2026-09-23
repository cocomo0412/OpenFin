import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

// The free Worker embeds only the bounded tax catalog. Full-edition immutable
// release-pointer checks do not apply to this deployment.
const catalog=JSON.parse(readFileSync(new URL('../src/free-catalog.json',import.meta.url),'utf8'));
const localTax=readFileSync(new URL('../../docs/opentax/korea-tax-ontology-2026.json',import.meta.url));
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
assert.equal(sha(localTax),catalog.source_sha256,'Rebuild the free catalog before deployment');
const cacheBust=`?parity=${Date.now()}`;
const [taxResponse,healthResponse]=await Promise.all([
 fetch('https://cocomo0412.github.io/OpenFin/opentax/korea-tax-ontology-2026.json'+cacheBust,{signal:AbortSignal.timeout(30000)}),
 fetch('https://openfin.cocomo0412.workers.dev/health'+cacheBust,{signal:AbortSignal.timeout(30000)}),
]);
assert.ok(taxResponse.ok,'Published tax export unavailable');
assert.ok(healthResponse.ok,'Free Worker health unavailable');
const publicTax=Buffer.from(await taxResponse.arrayBuffer()),health=await healthResponse.json();
assert.equal(sha(publicTax),catalog.source_sha256,'Pages has a different tax export');
assert.equal(health.edition,'free-tax-pilot');
assert.equal(health.source_sha256,catalog.source_sha256,'Worker has a different tax export');
assert.equal(health.item_count,catalog.items.length);
assert.equal(health.recommendation_enabled,false);
console.log(JSON.stringify({ok:true,edition:health.edition,records:health.item_count,source_sha256:health.source_sha256}));
