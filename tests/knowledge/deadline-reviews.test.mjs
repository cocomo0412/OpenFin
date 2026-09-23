import test from 'node:test';
import assert from 'node:assert/strict';
import {deadlineReviews} from '../../scripts/knowledge/deadline-reviews.mjs';
const patches=new Map(deadlineReviews.map(([id,,,patch])=>[id,patch]));
test('2026 filing dates include weekend extensions in both concrete dates and text',()=>{
 for(const id of ['deadline.vat.general.first-final','deadline.vat.simplified.preliminary']){
  const row=patches.get(id);
  assert.equal(row.end_date,'2026-07-27');
  assert.match(row.description,/7월 27일/);
  assert.equal(new Date(row.end_date+'T00:00:00Z').getUTCDay(),1);
  assert.equal(row.calendar_month,'07');
 }
 const monthly=patches.get('deadline.withholding.monthly');
 assert.match(monthly.recurrence.example,/5월 11일/);
 assert.doesNotMatch(monthly.recurrence.example,/5월 10일/);
 assert.equal(patches.get('deadline.local.income.final').end_date,'2026-06-01');
});
test('acquisition and corporate filing preserve statutory exceptions',()=>{
 const acquisition=patches.get('deadline.local.acquisition');
 assert.match(acquisition.recurrence.special_rule,/부담부증여.*3개월/);
 assert.match(acquisition.recurrence.special_rule,/9개월/);
 assert.match(patches.get('deadline.corporate-tax.return').recurrence.special_rule,/4개월/);
 assert.equal(new Set(deadlineReviews.map(r=>r[0])).size,deadlineReviews.length);
});
