import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizePensionGroup} from '../../scripts/knowledge/disclosure-normalizers.mjs';
const row = {provider:'은행',title:'연금',basis_period:'2026-Q2',receipt:{url:'https://example.com'},cells:['은행','연금','채권형','2004/06/01','중단','100','1','2','3','4','5','6','0.4']};
test('pension rates align with physical columns, not multi-row heading order',()=>{
 const result=normalizePensionGroup({group:'1',products:[row]})[0];
 assert.equal(result.observations[0].fields['1년 연평균수익률(%)'],'1');
 assert.equal(result.observations[0].fields['연평균수수료율(%)'],'0.4');
});
test('rate changes preserve product identity and same-name rows retain all observations',()=>{
 const updated={...row,cells:[...row.cells]};updated.cells[6]='7';
 const old=normalizePensionGroup({group:'1',products:[row]})[0];
 const next=normalizePensionGroup({group:'1',products:[updated]})[0];
 assert.equal(old.record,next.record);
 assert.equal(normalizePensionGroup({group:'1',products:[row,updated]})[0].observations.length,2);
});
test('unexpected schema and wrong identity stop integration',()=>{
 assert.throws(()=>normalizePensionGroup({group:'3',products:[row]}),/column count/);
 assert.throws(()=>normalizePensionGroup({group:'1',products:[{...row,title:'다른 상품'}]}),/identity/);
});
