import test from 'node:test';
import assert from 'node:assert/strict';
import {matchingPolicy} from './policy-matching.mjs';
const row = {title:'(무)우리건강보험',cells:['2026-04-01'],provider_disclosure_urls:['https://www.example.com/products']};
const doc = {product_title:'무배당 우리건강보험',effective_from:'2026-04-01',index_url:'https://example.com/products',url:'https://example.com/terms.pdf'};
test('requires product and version, not merely same company index', () => {
 assert.equal(matchingPolicy(row,doc),true);
 assert.equal(matchingPolicy(row,{...doc,product_title:'무배당 우리연금보험'}),false);
 assert.equal(matchingPolicy(row,{...doc,effective_from:'2026-07-01'}),false);
 assert.equal(matchingPolicy({...row,cells:[]},doc),false);
 assert.equal(matchingPolicy(row,{...doc,index_url:'https://another.example/products'}),false);
});
