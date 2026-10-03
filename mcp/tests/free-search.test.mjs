import assert from "node:assert/strict";
import test from "node:test";
import { searchFree } from "../src/free-catalog.ts";

test("every search word is required, including words after the eighth", () => {
  const prefix = Array(8).fill("월세").join(" ");
  assert.ok(searchFree(`${prefix} 무주택`).total_matches > 0);
  assert.equal(searchFree(`${prefix} 존재하지않는검색조건`).total_matches, 0);
  assert.equal(searchFree(`${prefix} 월세 월세 존재하지않는검색조건`).total_matches, 0);
});

test("titles can be searched without spaces and exact titles rank first", () => {
  for (const query of ["월세액세액공제", "월세액 세액공제"]) {
    assert.equal(searchFree(query).results[0].id, "credit.monthly-rent");
  }
  for (const query of ["보험료세액공제", "보험료 세액공제", " 보험료\t세액공제 "]) {
    const result = searchFree(query);
    assert.equal(result.results[0].id, "credit.insurance-premium");
    assert.ok(result.results.some(item => item.id === "corporate.support.social-insurance-credit"));
  }
});

test("compact title matches still require all additional conditions", () => {
  assert.ok(searchFree("월세액세액공제 무주택").results.some(item => item.id === "credit.monthly-rent"));
  assert.equal(searchFree("월세액세액공제 존재하지않는검색조건").total_matches, 0);
  assert.equal(searchFree("보험료세액공제 존재하지않는검색조건").total_matches, 0);
});

test("spacing tolerance does not join description words or title-description boundaries", () => {
  assert.equal(searchFree("세액공제무주택").total_matches, 0);
  assert.equal(searchFree("월세액에대한").total_matches, 0);
  assert.ok(searchFree("월세액에 대한").results.some(item => item.id === "credit.monthly-rent"));
});

test("normalization, query length and result limits remain bounded", () => {
  assert.equal(searchFree("ＣＲＥＤＩＴ．ＭＯＮＴＨＬＹ－ＲＥＮＴ").results[0].id, "credit.monthly-rent");
  assert.ok(searchFree("월세 ".repeat(40)).total_matches > 0);
  assert.throws(() => searchFree("월세 ".repeat(40) + "월"), /1~120/);
  assert.throws(() => searchFree(" \t\n"), /1~120/);
  const result = searchFree("공제", 100);
  assert.ok(result.total_matches > 10);
  assert.equal(result.results.length, 10);
  assert.equal(searchFree("공제", 3).results.length, 3);
});
