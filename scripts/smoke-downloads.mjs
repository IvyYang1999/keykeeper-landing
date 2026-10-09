import { chromium } from '@playwright/test';
import { readFile, mkdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const base = process.argv[2];
if (!base || !['https:', 'http:'].includes(new URL(base).protocol)) throw new Error('Usage: smoke-downloads.mjs <site-url>');
const expected = JSON.parse(await readFile(new URL('../lib/download.json', import.meta.url), 'utf8'));
const artifacts = process.env.SMOKE_ARTIFACT_DIR || join(process.cwd(), 'test-results/download-smoke');
await mkdir(artifacts, { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ acceptDownloads: true, viewport: { width: 1440, height: 1000 }, locale: 'en-US' });
  // Synthetic smoke does not report visits to the existing analytics provider.
  await context.route('**/dc-analytics.js', (route) => route.abort());
  const page = await context.newPage();
  page.setDefaultTimeout(30_000);
  const response = await page.goto(base, { waitUntil: 'networkidle', timeout: 30_000 });
  if (response.status() !== 200) throw new Error(`Page HTTP ${response.status()}`);
  for (const lang of ['en', 'zh']) {
    const button = page.getByRole('button', { name: lang === 'en' ? 'EN' : '中文', exact: true });
    if (lang === 'zh' && await button.getAttribute('aria-pressed') !== 'false') throw new Error('Language transition must start from English');
    await button.click();
    await page.waitForFunction((language) => document.documentElement.lang === language, lang === 'en' ? 'en' : 'zh-CN');
    if (await button.getAttribute('aria-pressed') !== 'true') throw new Error('Language selection did not update');
    const stored = await page.evaluate(() => localStorage.getItem('keykeeper-language'));
    if (stored !== lang) throw new Error('Language selection did not persist');
    for (const section of ['hero', 'install']) {
      const link = page.locator(`.${section} .actions a.pill-dark`);
      if (await link.count() !== 1 || await link.getAttribute('href') !== expected.url) throw new Error(`${lang}/${section}: asset mismatch`);
      const label = lang === 'en' ? 'Download for macOS' : '下载 macOS 版';
      if (await link.innerText() !== label) throw new Error(`${lang}/${section}: untranslated CTA`);
      if (!(await page.locator(`.${section} .facts`).innerText()).startsWith(expected.tag + ' ·')) throw new Error('Displayed release version mismatch');
      await link.scrollIntoViewIfNeeded();
      await link.hover();
      await page.screenshot({ path: join(artifacts, `${lang}-${section}.png`) });
      const downloadPromise = page.waitForEvent('download');
      await link.click();
      const download = await downloadPromise;
      if (download.suggestedFilename() !== expected.filename) throw new Error('Downloaded filename mismatch');
      const target = join(artifacts, `${lang}-${section}-${expected.filename}`);
      await download.saveAs(target);
      if (await download.failure()) throw new Error('Download failed');
      if ((await stat(target)).size !== expected.length) throw new Error('Downloaded byte length mismatch');
      console.log(`PASS ${lang}/${section}: ${expected.filename}, ${expected.length} bytes`);
    }
  }
} finally {
  await browser.close();
}
