import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { verifyDownload, productionBuildGate } from './release-gate.mjs';

const release = JSON.parse(readFileSync(new URL('./fixtures/release.json', import.meta.url)));
const appcast = readFileSync(new URL('./fixtures/appcast.xml', import.meta.url), 'utf8');
const meta = JSON.parse(readFileSync(new URL('./fixtures/download.json', import.meta.url)));
const request = async (url) => url.includes('/git/ref/') ? { ref: `refs/tags/${meta.tag}`, object: { type: 'commit', sha: 'a'.repeat(40) } } : url.includes('/releases/tags/') ? release : appcast;

test('real published v0.3.4 metadata and signed appcast agree', async () => {
  assert.deepEqual(await verifyDownload(meta, request), meta);
});

for (const failure of ['release-missing', 'draft', 'dmg-missing', 'version', 'filename', 'length', 'api-unavailable', 'signature', 'zero-size', 'url', 'uncertain', 'malformed-xml', 'tag-missing', 'appcast-version', 'appcast-filename']) {
  test(`${failure} exits nonzero`, () => {
    const child = spawnSync(process.execPath, ['scripts/fixtures/reject.mjs', failure], { encoding: 'utf8' });
    assert.equal(child.status, 1, child.stderr);
    assert.match(child.stderr, /Download gate:/);
  });
}

test('development and preview do not request release data', async () => {
  for (const env of [{}, { VERCEL: '1', VERCEL_ENV: 'preview' }, { VERCEL_ENV: 'development' }]) {
    await productionBuildGate(env, () => { throw new Error('must not call'); });
  }
});

test('production verifies; an unknown Vercel environment fails closed', async () => {
  let calls = 0;
  await productionBuildGate({ VERCEL_ENV: 'production' }, async () => calls++);
  assert.equal(calls, 1);
  await assert.rejects(productionBuildGate({ VERCEL: '1' }), /environment/);
});

test('HTTP errors and malformed API responses never produce a result', async (t) => {
  const { request } = await import('./release-gate.mjs');
  for (const code of [404, 403, 429, 500, 503]) {
    t.mock.method(globalThis, 'fetch', async () => new Response('{}', { status: code }));
    await assert.rejects(request('https://api.github.com/repos/example/releases'), new RegExp(`HTTP ${code}`));
    t.mock.restoreAll();
  }
  t.mock.method(globalThis, 'fetch', async () => new Response('not json', { status: 200 }));
  await assert.rejects(request('https://api.github.com/repos/example/releases'));
});

test('a failed production verifier propagates without fallback', async () => {
  await assert.rejects(productionBuildGate({ VERCEL_ENV: 'production' }, async () => { throw new Error('API unavailable'); }), /API unavailable/);
});
