import { readFileSync } from 'node:fs';
import { verifyDownload } from '../release-gate.mjs';
const release = JSON.parse(readFileSync(new URL('./release.json', import.meta.url)));
let xml = readFileSync(new URL('./appcast.xml', import.meta.url), 'utf8');
const meta = JSON.parse(readFileSync(new URL('./download.json', import.meta.url)));
const failure = process.argv[2];
if (failure === 'draft') release.draft = true;
if (failure === 'dmg-missing') release.assets = [];
if (failure === 'version') meta.version = '0.3.5';
if (failure === 'filename') release.assets[0].name = 'Wrong.dmg';
if (failure === 'length') xml = xml.replace('7597070', '7597071');
if (failure === 'signature') xml = xml.replace(/sparkle:edSignature="[^"]+"/, '');
if (failure === 'zero-size') release.assets[0].size = 0;
if (failure === 'url') xml = xml.replace('releases/download', 'releases/latest/download');
if (failure === 'uncertain') delete release.draft;
if (failure === 'malformed-xml') xml = '<rss><channel>';
if (failure === 'appcast-version') xml = xml.replace('<sparkle:version>0.3.4</sparkle:version>', '<sparkle:version>0.3.5</sparkle:version>');
if (failure === 'appcast-filename') xml = xml.replace('KeyKeeper-0.3.4.dmg', 'KeyKeeper-wrong.dmg');
try {
  await verifyDownload(meta, async (url) => {
    if (failure === 'api-unavailable' || (failure === 'release-missing' && url.includes('/releases/tags/'))) throw new Error('Download gate: HTTP ' + (failure === 'release-missing' ? '404' : '503'));
    if (url.includes('/git/ref/')) return failure === 'tag-missing' ? {} : { ref: `refs/tags/${meta.tag}`, object: { type: 'commit', sha: 'a'.repeat(40) } };
    return url.includes('/releases/tags/') ? release : xml;
  });
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
