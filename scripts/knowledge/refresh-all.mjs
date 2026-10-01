// One local command; no automatic Git push or deployment of unreviewed output.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { ROOT, json, writeJson } from './common.mjs';

export function stages(retry=false) {
  const node=(name,args=[])=>({runtime:'node',file:`scripts/knowledge/${name}.mjs`,args});
  const py=(name,args=[])=>({runtime:'python',file:`scripts/knowledge/${name}.py`,args});
  if(retry) return [
    {id:'public-api-retry',...py('refresh-public-apis',['--retry-failed']),allowFailure:true},
    {id:'finlife-retry',...node('collect-finlife-additional',['--retry-failed'])},
  ];
  return [
    {id:'public-api',...py('refresh-public-apis'),allowFailure:true},
    {id:'bank',...node('collect-finlife-candidates',['--catalog-only','--write'])},
    {id:'additional',...node('collect-finlife-additional')},
    {id:'gov24',...node('collect-gov24')},
    {id:'prepare',...py('build-collection-inventory')},
    {id:'link',...node('link-api-snapshots')},
    {id:'integrate',...node('integrate-current-data')},
    ...['build-decision-snapshots','review-decision-offers','validate-decision-receipts','promote-candidates','build','validate','validate-rule-facts'].map(id=>({id,...node(id)})),
    {id:'tests',runtime:'node',args:['--test','tests/knowledge/api-integration.test.mjs','tests/knowledge/refresh-ledger.test.mjs','tests/knowledge/refresh-pipeline.test.mjs']},
    {id:'python-tests',runtime:'python',args:['-m','unittest','discover','-s','tests','-p','test_public_apis.py']},
    {id:'free-catalog',runtime:'node',file:'mcp/scripts/build-free-catalog.mjs',args:[]},
    {id:'free-tests',runtime:'node',args:['--test','mcp/tests/free-catalog.test.mjs']},
  ];
}

export function assertCurrentInputs(root,basisDate,read=json) {
  const kst=value=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul'}).format(new Date(value));
  for(const name of ['finlife-catalog','gov24-current']) {
    if(kst(read(path.join(root,'.api-candidates',`${name}.json`)).collected_at)!==basisDate)
      throw new Error(`Collect ${name} again before preparing today's release`);
  }
  const plan=read(path.join(root,'scripts/knowledge/public-api-refresh-plan.json'));
  const attempts=read(path.join(root,'.api-candidates/api-refresh-run.json'));
  for(const job of plan.jobs) {
    const attempt=attempts.results.find(r=>r.source_id===job.source_id&&r.operation_index===job.operation_index);
    if(!attempt || kst(attempt.checked_at||attempts.checked_at)!==basisDate) throw new Error(`API check missing for today: ${job.source_id}/${job.operation_index}`);
    // Failed requests may retain a prior valid snapshot, never invent a new date.
    const snapshot=read(path.join(root,'.api-candidates',`${job.source_id}-${job.operation_index}.json`));
    if(attempt.status==='complete' && kst(snapshot.collected_at)!==basisDate) throw new Error('Successful attempt has stale snapshot');
  }
  const additional=read(path.join(root,'.api-candidates/finlife-additional.json'));
  for(const dataset of additional.datasets) {
    const failed=additional.failures.some(f=>f.endpoint===dataset.endpoint&&f.group===dataset.group);
    if(!failed && kst(dataset.collected_at||additional.collected_at)!==basisDate) throw new Error('Additional Finlife successful dataset is stale; run full collection');
  }
  for(const failure of additional.failures) if(kst(failure.checked_at||additional.collected_at)!==basisDate) throw new Error('Additional Finlife failure has not been checked today');
}

function main() {
  const args=process.argv.slice(2),retry=args.includes('--retry-failed'),dry=args.includes('--dry-run');
  const from=args.includes('--from')?args[args.indexOf('--from')+1]:null;
  const all=stages(retry),offset=from?all.findIndex(s=>s.id===from):0;
  if(offset<0)throw new Error('Unknown --from stage');
  if(args.some((a,i)=>!['--retry-failed','--dry-run','--from'].includes(a)&&args[i-1]!=='--from'))throw new Error('Unknown argument');
  if(dry){console.log(JSON.stringify(all.slice(offset),null,2));return;}
  if(fs.existsSync(path.join(ROOT,'.env')))process.loadEnvFile(path.join(ROOT,'.env'));
  const working=path.join(ROOT,'.api-candidates');fs.mkdirSync(working,{recursive:true});
  const lock=path.join(working,'refresh-all.lock');
  if(fs.existsSync(lock)) {
    const pid=Number(fs.readFileSync(lock,'utf8'));let live=false;
    try{process.kill(pid,0);live=true;}catch{}
    if(live)throw new Error('Another refresh pipeline is running');
    fs.unlinkSync(lock);
  }
  fs.writeFileSync(lock,String(process.pid),{flag:'wx'});
  const started=new Date().toISOString();
  const basisDate=new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul'}).format(new Date());
  const report={started_at:started,basis_date:basisDate,mode:retry?'retry-failed':'refresh',stages:[]};
  const reportFile=path.join(working,'refresh-pipeline-run.json');
  const secrets=Object.entries(process.env).filter(([k,v])=>/KEY|TOKEN|SECRET|PASSWORD/.test(k)&&v?.length>7).map(([,v])=>v);
  try {
    if(from && offset>=all.findIndex(s=>s.id==='prepare') && !retry)assertCurrentInputs(ROOT,basisDate);
    for(const stage of all.slice(offset)) {
      if(stage.id==='prepare')assertCurrentInputs(ROOT,basisDate);
      console.log(`START ${stage.id}`);
      const began=Date.now();
      const command=stage.runtime==='node'?process.execPath:(process.env.OPENFIN_PYTHON||'python');
      const result=spawnSync(command,[...(stage.file?[stage.file]:[]),...stage.args],{cwd:ROOT,env:{...process.env,PYTHONIOENCODING:'utf-8'},encoding:'utf8',maxBuffer:16*1024*1024});
      let output=(result.stdout||'')+(result.stderr||'');
      for(const secret of secrets)output=output.split(secret).join('[REDACTED]');
      fs.writeFileSync(path.join(working,`pipeline-${stage.id}.log`),output);
      const status=result.status===0?'passed':'failed';
      report.stages.push({id:stage.id,status,exit_code:result.status,duration_ms:Date.now()-began});
      writeJson(reportFile,report);console.log(`${status.toUpperCase()} ${stage.id}`);
      if(status==='failed'&&!stage.allowFailure)throw new Error(`Stage ${stage.id} failed; inspect .api-candidates/pipeline-${stage.id}.log`);
    }
    report.finished_at=new Date().toISOString();
    report.status='completed';writeJson(reportFile,report);
    if(retry)console.log('Retry evidence saved. Run the full pipeline or --from prepare after checking same-day inputs.');
    else {
      const pending=json(path.join(ROOT,'docs/opentax/collection-inventory.json')).pending;
      console.log(JSON.stringify({status:'validated',pending_requests:pending.length,ledger:'reports/refresh/README.md',deployment:'Not automatically pushed'}));
    }
  } catch(error) {report.status='failed';writeJson(reportFile,report);throw error;}
  finally {fs.unlinkSync(lock);}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) main();
