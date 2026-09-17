import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const wall = JSON.parse(readFileSync("app/providerWall.json", "utf8"));
const order = JSON.parse(readFileSync("content/providers/_display-order.json", "utf8"));
const popular = JSON.parse(readFileSync("app/providerWallPopular.json", "utf8"));

test("every homepage brand appears exactly once in its category order", () => {
  const categories = new Set(wall.map((brand) => brand.category));
  assert.deepEqual(new Set(Object.keys(order)), categories);
  for (const category of categories) {
    const expected = wall.filter((brand) => brand.category === category).map((brand) => brand.id).sort();
    assert.deepEqual([...order[category]].sort(), expected, category);
  }
});

test("model-maker editorial order keeps the requested priority", () => {
  const rank = (id) => order.models.indexOf(id);
  assert.ok(rank("openai") < rank("gemini"));
  assert.ok(rank("anthropic") < rank("gemini"));
  for (const id of ["zhipu-cn", "kimi"]) {
    assert.ok(rank(id) < rank("minimax"));
    assert.ok(rank(id) < rank("stepfun-api"));
  }
  for (const id of ["longcat", "xiaomi-mimo-payg"]) {
    assert.ok(rank(id) > rank("stepfun-api"));
  }
});

test("popular brands retain the same relative order as their categories", () => {
  assert.equal(new Set(popular).size, popular.length);
  const categoryById = new Map(wall.map((brand) => [brand.id, brand.category]));
  for (const category of Object.keys(order)) {
    const popularInCategory = popular.filter((id) => categoryById.get(id) === category);
    assert.deepEqual(popularInCategory, order[category].filter((id) => popular.includes(id)), category);
  }
});
