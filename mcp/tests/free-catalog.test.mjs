import assert from "node:assert/strict";
import test from "node:test";
import {readFileSync} from "node:fs";
import { freeMetadata, searchFree, fetchFree } from "../src/free-catalog.ts";

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
