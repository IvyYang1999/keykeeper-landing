import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

const base = process.argv[2] ?? 'http://127.0.0.1:3188';
const origin = 'https://keykeeper.dev';
const expected = new Set([origin]);
// Independent inventory: compare the served sitemap with every published MDX file.
for (const file of await readdir(new URL('../content/docs/', import.meta.url), { recursive: true })) {
  if (!file.endsWith('.mdx')) continue;
  const zh = file.endsWith('.zh.mdx');
  const slug = file.replace(/(?:\.zh)?\.mdx$/, '').replace(/(^|\/)index$/, '');
  expected.add(`${origin}${zh ? '/zh' : ''}/docs${slug ? `/${slug}` : ''}`);
}
const response = await fetch(`${base}/sitemap.xml`);
assert.equal(response.status, 200);
assert.match(response.headers.get('content-type'), /xml/);
const xml = await response.text();
assert.equal(XMLValidator.validate(xml), true);
const parsed = new XMLParser({ ignoreAttributes: false }).parse(xml);
assert.equal(parsed.urlset['@_xmlns'], 'http://www.sitemaps.org/schemas/sitemap/0.9');
const entries = [parsed.urlset.url].flat();
const urls = entries.map((entry) => entry.loc);
assert.equal(urls.length, new Set(urls).size, 'No duplicate URLs');
assert.deepEqual(new Set(urls), expected, 'Sitemap must cover the public MDX inventory in both languages');
for (const url of urls) {
  const route = new URL(url).pathname;
  const page = await fetch(new URL(route, base), { redirect: 'manual', headers: { Accept: 'text/html' } });
  assert.equal(page.status, 200, `${url} must respond directly`);
  const html = await page.text();
  assert.ok(html.includes(`rel="canonical" href="${url}"`), `${url} must be canonical`);
}
const robots = await fetch(`${base}/robots.txt`);
assert.equal(robots.status, 200);
assert.match(await robots.text(), /Sitemap: https:\/\/keykeeper\.dev\/sitemap\.xml/);
console.log(`PASS sitemap: ${urls.length} unique canonical URLs, all HTTP 200, XML valid, robots linked`);
