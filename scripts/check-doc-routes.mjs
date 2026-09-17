import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://127.0.0.1:3113";
for (const route of ["/docs", "/docs/providers/openai", "/docs/providers/zenmux-builder", "/zh/docs/providers/zenmux-builder"]) {
  const response = await fetch(new URL(route, base), {
    redirect: "manual",
    headers: { Accept: "text/html" },
  });
  assert.equal(response.status, 200, `${route} returned ${response.status} -> ${response.headers.get("location")}`);
  if (route.includes("zenmux-builder")) {
    assert.match(await response.text(), /ZenMux/, route);
  }
}
for (const route of ["/docs/providers/dmxapi-cn", "/zh/docs/providers/dmxapi-cn"]) {
  const response = await fetch(new URL(route, base), {
    redirect: "manual",
    headers: { Accept: "text/html" },
  });
  assert.equal(response.status, 404, `${route} should no longer be published`);
}
console.log("English and Chinese provider routes respond directly");
