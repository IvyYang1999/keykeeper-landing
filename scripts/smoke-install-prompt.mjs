import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { readFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const base = process.argv[2];
if (!base) throw new Error('Usage: smoke-install-prompt.mjs <local-site-url>');
const origin = new URL(base).origin;
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw new Error('Install prompt smoke requires an isolated local build');
const artifacts = process.env.SMOKE_ARTIFACT_DIR || join(process.cwd(), 'test-results/install-prompt');
await mkdir(artifacts, { recursive: true });
const download = JSON.parse(await readFile(new URL('../lib/download.json', import.meta.url), 'utf8'));
const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, locale: 'en-US' });
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin });
  await context.route('**/dc-analytics.js', (route) => route.abort());
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(base);
  const prompts = {};
  for (const language of ['en', 'zh']) {
    const switcher = page.getByRole('button', { name: language === 'en' ? 'EN' : '中文', exact: true });
    if (language === 'zh') assert.equal(await switcher.getAttribute('aria-pressed'), 'false');
    await switcher.click();
    await page.waitForFunction((lang) => document.documentElement.lang === lang, language === 'en' ? 'en' : 'zh-CN');
    assert.equal(await page.evaluate(() => localStorage.getItem('keykeeper-language')), language);
    const install = page.locator('#install');
    const button = install.getByRole('button', { name: language === 'en' ? 'Copy install prompt' : '复制安装 Prompt', exact: true });
    await button.scrollIntoViewIfNeeded();
    await page.evaluate(() => navigator.clipboard.writeText('before-install-prompt'));
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), 'before-install-prompt');
    await button.focus();
    await button.press('Enter');
    await page.waitForFunction(() => document.querySelector('#install [role="status"]').textContent.includes('Copied') || document.querySelector('#install [role="status"]').textContent.includes('已复制'));
    const prompt = await page.evaluate(() => navigator.clipboard.readText());
    assert.notEqual(prompt, 'before-install-prompt');
    assert.match(prompt, new RegExp(language === 'en' ? '^Install and configure' : '^请在我的 Mac'));
    assert.ok(prompt.includes(download.url));
    for (const command of ['command -v keykeeper', 'keykeeper --help', 'keykeeper status']) assert.ok(prompt.includes(command));
    assert.ok(prompt.includes(`https://keykeeper.dev/${language === 'zh' ? 'zh/' : ''}docs/getting-started`));
    assert.ok(prompt.includes('https://github.com/IvyYang1999/KeyKeeper/blob/main/skill/keykeeper.md'));
    prompts[language] = prompt;
    await button.hover();
    await install.screenshot({ path: join(artifacts, `${language}-desktop.png`) });
    await page.waitForFunction(() => !document.querySelector('#install [role="status"]').textContent.match(/Copied|已复制/));
    for (const width of [375, 320]) {
      await page.setViewportSize({ width, height: 812 });
      await button.scrollIntoViewIfNeeded();
      if (width === 375) await install.screenshot({ path: join(artifacts, `${language}-mobile.png`) });
      const overflow = await page.evaluate(() => {
        const added = document.querySelector('.install-prompt');
        const parent = added.parentNode;
        const next = added.nextSibling;
        const current = document.documentElement.scrollWidth;
        // Reconstruct the unchanged landing-page DOM to distinguish an existing
        // overflow elsewhere from overflow introduced by the install controls.
        added.remove();
        const baseline = document.documentElement.scrollWidth;
        parent.insertBefore(added, next);
        return { current, baseline, viewport: innerWidth };
      });
      console.log(`${language}/${width} overflow comparison: ${JSON.stringify(overflow)}`);
      assert.ok(overflow.current <= Math.max(overflow.viewport, overflow.baseline), `${language}/${width}: install controls add horizontal overflow`);
      const bounds = await button.boundingBox();
      assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width, 'Button stays in viewport');
      await page.mouse.wheel(0, 300);
      await page.mouse.wheel(0, -300);
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    // Explicit rejection must expose the same prompt, without claiming success.
    await page.evaluate(() => Object.defineProperty(navigator.clipboard, 'writeText', { configurable: true, value: async () => { throw new DOMException('Denied', 'NotAllowedError'); } }));
    await button.click();
    const fallback = install.getByRole('textbox');
    await fallback.waitFor();
    assert.equal(await fallback.inputValue(), prompt);
    assert.match(await install.getByRole('status').innerText(), /Could not copy|复制失败/);
    await fallback.focus();
    assert.equal(await fallback.evaluate((el) => el.selectionEnd - el.selectionStart), prompt.length);
    if (language === 'zh') {
      await install.screenshot({ path: join(artifacts, 'zh-fallback.png') });
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.reload();
      await page.locator('#install').scrollIntoViewIfNeeded();
      await page.locator('#install').screenshot({ path: join(artifacts, 'zh-dark.png') });
    } else {
      await page.reload();
    }
    console.log(`PASS ${language}: real clipboard, keyboard, feedback reset, denial fallback, 375/320px layout`);
  }
  assert.notEqual(prompts.en, prompts.zh);
  assert.deepEqual(errors, [], 'No browser runtime errors');
} finally {
  await browser.close();
}
