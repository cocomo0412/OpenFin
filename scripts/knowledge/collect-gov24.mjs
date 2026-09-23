import path from 'node:path';
import {ROOT,sha256,writeJson} from './common.mjs';
const key=process.env.DATA_GO_KR_SERVICE_KEY?.trim();if(!key)throw new Error('Key required');
const rows=[],ids=new Set();let total;
for(let page=1;;page++) {
  const u=new URL('https://api.odcloud.kr/api/gov24/v3/serviceList');
  u.search=new URLSearchParams({serviceKey:key,page:String(page),perPage:'1000'});
  const r=await fetch(u,{signal:AbortSignal.timeout(30000)});
  if(!r.ok)throw new Error(`Gov24 HTTP ${r.status}`);
  const a=await r.json();
  if(!Array.isArray(a.data)||!Number.isInteger(a.totalCount))throw new Error('Invalid Gov24 schema');
  if(total!==undefined&&total!==a.totalCount)throw new Error('Changed Gov24 total');total=a.totalCount;
  for(const row of a.data){const id=row['서비스ID'];if(!id||ids.has(id))throw new Error('Missing/duplicate Gov24 ID');ids.add(id);rows.push(row);}
  if(rows.length===total)break;
  if(!a.data.length||rows.length>total)throw new Error('Incomplete Gov24 pages');
}
const payload={source_id:'source.gov24.benefit-plus.local-supports',source_url:'https://www.data.go.kr/data/15113968/openapi.do',collected_at:new Date().toISOString(),count:rows.length,items:rows,checksum:sha256(rows)};
writeJson(path.join(ROOT,'.api-candidates/gov24-current.json'),payload);
console.log(JSON.stringify({count:rows.length,agency_types:[...new Set(rows.map(r=>r['소관기관유형']))]}));
