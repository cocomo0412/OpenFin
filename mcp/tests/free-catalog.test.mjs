import assert from "node:assert/strict";
import test from "node:test";
import {readFileSync} from "node:fs";
import { freeMetadata, freeLookupMetadata, freeAnswerGuidance, searchFree, fetchFree } from "../src/free-catalog.ts";

test("free MCP exposes bounded tax data without recommendations", () => {
  const catalog=JSON.parse(readFileSync(new URL('../src/free-catalog.json',import.meta.url),'utf8'));
  assert.equal(freeMetadata.item_count, catalog.items.length);
  assert.ok(freeMetadata.item_count>0 && freeMetadata.item_count<=500);
  assert.equal(freeMetadata.recommendation_enabled, false);
  assert.equal(freeMetadata.freshness, "not_revalidated");
  const result = searchFree("월세", 3);
  assert.ok(result.total_matches > 3);
  assert.equal(result.results.length, 3);
  const item = fetchFree("credit.monthly-rent");
  assert.ok(item?.title.includes("월세"));
  assert.ok(item.source_urls.length > 0);
  assert.equal(fetchFree("not-a-tax-id"), undefined);
  assert.throws(() => searchFree(" "));
  assert.throws(() => searchFree("a".repeat(121)));
});

test("all tool payloads explain date scope without concealing evidence or claiming verification", () => {
  for (const payload of [freeMetadata, freeLookupMetadata, searchFree('월세', 1)]) {
    assert.deepEqual(payload.answer_guidance, freeAnswerGuidance);
    assert.match(payload.answer_guidance.date_scope, /모든 제도의 현재 적용일이나 유효기간이 아닙니다/);
    assert.match(payload.answer_guidance.official_follow_up, /확인하지 않았다면 확인했다고 말하지 않으며/);
  }
  assert.ok(freeMetadata.basis_date);
  assert.equal(freeMetadata.freshness, 'not_revalidated');
  assert.equal(fetchFree('credit.monthly-rent').freshness, 'not_revalidated');
});

test("lookup keeps item evidence without applying the whole catalog date to every result", () => {
  const catalog = JSON.parse(readFileSync(new URL('../src/free-catalog.json', import.meta.url), 'utf8'));
  const result = searchFree("월세", 3);
  assert.equal(Object.hasOwn(result, 'basis_date'), false);
  assert.equal(Object.hasOwn(result, 'limitations'), false);
  assert.equal(freeMetadata.basis_date, catalog.basis_date);
  for (const item of result.results) {
    const original = catalog.items.find(row => row.id === item.id);
    assert.deepEqual(item.source_basis_dates, original.source_basis_dates);
    assert.deepEqual(item.source_urls, original.source_urls);
    assert.equal(item.freshness, original.freshness);
    assert.equal(fetchFree(item.id).description, original.description);
  }
});
