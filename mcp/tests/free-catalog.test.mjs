import assert from "node:assert/strict";
import test from "node:test";
import {readFileSync} from "node:fs";
import { freeInstructions, freeMetadata, searchFree, fetchFree } from "../src/free-catalog.ts";

// Check bounded meaning-bearing clauses, not a snapshot of the prose. Whitespace,
// quote style and unrelated wording can change without weakening the contract.
const instructions = freeInstructions.replace(/\s+/gu, " ");

test("free instructions distinguish official web documents from API evidence", () => {
  assert.match(instructions, /공식기관 웹 문서[^.!?]*정리한 참고자료/u,
    "The free catalog must identify its official web-document basis");
  assert.match(instructions, /공식 API 수집 근거[^.!?]*명시된 경우에만[^.!?]*공식기관 API 자료/u,
    "The API label must be conditional on explicit API collection evidence");
  assert.match(instructions, /웹 문서 자료를 API로 조회[^.!?]*말하지 마세요/u,
    "Web-document evidence must not be described as an API lookup");
});

test("free instructions forbid claiming follow-up verification without checking", () => {
  assert.match(instructions, /실제 확인한 경우에는[^.!?]*공식 자료를 바탕/u,
    "The example verification claim must be conditional on an actual check");
  assert.match(instructions, /현재 적용 조건은[^.!?]*최신 안내를 추가 확인/u,
    "The example must identify current conditions as the scope of the follow-up check");
  assert.match(instructions, /실제 확인 없이[^.!?]*추가 확인했다[^.!?]*말하지 마세요/u,
    "Instructions must explicitly forbid unsupported verification claims");
});

test("free instructions separate OpenFin evidence from current official verification", () => {
  assert.match(instructions, /OpenFin 자료를 설명의 바탕[^.!?]*추가 검색[^.!?]*현재 적용 조건[^.!?]*보완[^.!?]*확인/u,
    "OpenFin must remain the basis, with extra searches checking current conditions");
  assert.match(instructions, /근거와 추가 확인 결과를 연결해 설명/u,
    "Answers should connect the original evidence and verified follow-up findings");
  assert.match(instructions, /현재 금액[^.!?]*공제 한도[^.!?]*신청기한[^.!?]*자격[^.!?]*공식 출처를 확인/u,
    "Time-sensitive conditions require checking official sources");
  assert.match(instructions, /확인할 수 없으면[^.!?]*현재도 유효한지 확인이 필요/u,
    "Unverified current applicability must remain explicitly uncertain");
});

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
