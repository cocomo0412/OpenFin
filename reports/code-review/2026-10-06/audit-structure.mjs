import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';

// Read-only repository scan; only this review directory receives output.
const files=execFileSync('git',['ls-files','-z'],{encoding:'utf8'}).split('\0').filter(Boolean);
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const output={date:'2026-10-06',baseline_commit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),tracked_count:files.length,text_scanned:0,json:{count:0,invalid:[]},config_files:[],secret_candidates:[],tracked_private_env_files:[],limits:['Pattern scan only; no secret values are emitted. Does not prove absence of unknown credentials.','Current tracked files only; no complete Git history, ignored local secrets, or remote secret values inspected.','JSON parsing verifies syntax, not financial meaning or provenance.']};
const textExt=new Set(['.md','.txt','.json','.jsonc','.js','.mjs','.cjs','.ts','.html','.css','.yml','.yaml','.py','.toml','.sh','.ps1','.csv','.xml','.svg','.example']);
const patterns=[
 ['private_key',/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
 ['github_token',/\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{40,})\b/g],
 ['cloud_access_id',/\bAKIA[A-Z0-9]{16}\b/g],
 ['openai_style_token',/\bsk-(?:proj-|svcacct-)?[A-Za-z0-9_-]{32,}\b/g],
 ['credential_url_query',/[?&](?:servicekey|authkey|apikey|api_key|access_token|token)=([^\s"'<>;&]+)/gi]
];
for(const p of files){
 const b=fs.readFileSync(p), ext=path.extname(p).toLowerCase();
 if(/(^|\/)\.(?:env(?:\..+)?|dev\.vars)$/.test(p)&&!p.endsWith('.example'))output.tracked_private_env_files.push(p);
 if(/(^|\/)(package(?:-lock)?\.json|tsconfig[^/]*\.json|wrangler[^/]*\.jsonc)$/.test(p)||p.startsWith('schemas/')||p.startsWith('contracts/')||['.gitignore','.gitattributes','.env.example'].includes(p))output.config_files.push({path:p,bytes:b.length,sha256:sha(b)});
 if(ext==='.json'){output.json.count++;try{JSON.parse(b.toString('utf8').replace(/^\uFEFF/,''));}catch{output.json.invalid.push(p);}}
 if(!textExt.has(ext)&&!['.gitignore','.gitattributes'].includes(p))continue;
 const s=b.toString('utf8');if(s.includes('\0'))continue;output.text_scanned++;
 for(const [kind,re] of patterns){re.lastIndex=0;let m;while((m=re.exec(s))!==null){
  if(kind==='credential_url_query'){
   const v=m[1];if(v.length<12||/^(?:YOUR|REPLACE|INSERT|EXAMPLE|TEST|DUMMY|\{|\$|%7B|%3C)/i.test(v)||/^(?:process\.env|encodeURIComponent|undefined|null)/i.test(v))continue;
  }
  output.secret_candidates.push({path:p,line:s.slice(0,m.index).split('\n').length,kind});
 }}
}
fs.writeFileSync('reports/code-review/2026-10-06/structure-scan.json',JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({tracked:output.tracked_count,text_scanned:output.text_scanned,json:output.json,config_files:output.config_files.length,secret_candidates:output.secret_candidates,tracked_private_env_files:output.tracked_private_env_files},null,2));
