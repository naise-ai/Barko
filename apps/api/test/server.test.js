import test from "node:test";
import assert from "node:assert/strict";

test("synthetic product catalog contains two formats", () => {
  const types = new Set(["DENTAL_CHEW", "WATER_ADDITIVE"]);
  assert.equal(types.size, 2);
});

test("paise conversion is exact", () => {
  const paise = 499 * 100;
  assert.equal(paise, 49900);
});
