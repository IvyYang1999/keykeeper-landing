import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

export const repository = 'IvyYang1999/KeyKeeper';
export const appcastUrl = `https://raw.githubusercontent.com/${repository}/main/appcast.xml`;
const metadataFile = new URL('../lib/download.json', import.meta.url);
const fail = (message) => { throw new Error(`Download gate: ${message}`); };
const requireFact = (condition, message) => { if (!condition) fail(message); };

// No retry, fallback, token, or uncertain HTTP result is treated as success.
export async function request(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(20_000), redirect: 'error', cache: 'no-store',
    headers: { Accept: url.includes('api.github.com') ? 'application/vnd.github+json' : 'application/xml' },
  });
  requireFact(response.status === 200, `HTTP ${response.status}`);
  return url.includes('api.github.com') ? response.json() : response.text();
}

export function releaseMetadata(release) {
  requireFact(release?.draft === false && release?.prerelease === false && Boolean(release.published_at), 'release must be published, non-draft and stable');
  requireFact(/^v\d+\.\d+\.\d+$/.test(release.tag_name), 'invalid release tag');
  const version = release.tag_name.slice(1);
  const filename = `KeyKeeper-${version}.dmg`;
  const url = `https://github.com/${repository}/releases/download/${release.tag_name}/${filename}`;
  requireFact(Array.isArray(release.assets), 'assets result is uncertain');
  const assets = release.assets.filter((asset) => asset.name === filename);
  requireFact(assets.length === 1, 'exactly one matching DMG required');
  const asset = assets[0];
  requireFact(asset.state === 'uploaded' && Number.isSafeInteger(asset.size) && asset.size > 0, 'DMG must be uploaded and nonempty');
  requireFact(asset.browser_download_url === url, 'DMG URL/filename mismatch');
  return { version, tag: release.tag_name, filename, url, length: asset.size };
}

export async function verifyDownload(metadata, read = request) {
  requireFact(/^v\d+\.\d+\.\d+$/.test(metadata?.tag), 'invalid selected tag');
  const tag = await read(`https://api.github.com/repos/${repository}/git/ref/tags/${metadata.tag}`);
  requireFact(tag?.ref === `refs/tags/${metadata.tag}` && ["commit", "tag"].includes(tag?.object?.type) && /^[a-f0-9]{40}$/.test(tag?.object?.sha), "tag missing or uncertain");
  const release = await read(`https://api.github.com/repos/${repository}/releases/tags/${metadata.tag}`);
  const expected = releaseMetadata(release);
  for (const key of Object.keys(expected)) requireFact(metadata[key] === expected[key], `selected ${key} disagrees with Release`);
  const xml = await read(appcastUrl);
  requireFact(typeof xml === 'string' && XMLValidator.validate(xml) === true && !/<!DOCTYPE|<!ENTITY/i.test(xml), 'invalid appcast XML');
  const parsed = new XMLParser({ ignoreAttributes: false, parseTagValue: false, parseAttributeValue: false }).parse(xml);
  requireFact(parsed.rss?.['@_xmlns:sparkle'] === 'http://www.andymatuschak.org/xml-namespaces/sparkle', 'invalid Sparkle namespace');
  const items = parsed.rss?.channel?.item;
  const matches = (Array.isArray(items) ? items : [items]).filter((item) => item?.['sparkle:shortVersionString'] === expected.version);
  requireFact(matches.length === 1, `appcast must contain exactly one ${expected.version} entry`);
  const enclosure = matches[0].enclosure;
  requireFact(matches[0]['sparkle:version'] === expected.version, 'appcast version mismatch');
  requireFact(enclosure?.['@_url'] === expected.url, 'appcast URL/filename mismatch');
  requireFact(enclosure?.['@_length'] === String(expected.length), 'appcast length mismatch');
  requireFact(typeof enclosure?.['@_sparkle:edSignature'] === 'string' && enclosure['@_sparkle:edSignature'].trim().length > 0, 'appcast signature missing');
  return expected;
}

export async function verifySelectedDownload() {
  return verifyDownload(JSON.parse(await readFile(metadataFile, 'utf8')));
}

export async function productionBuildGate(env = process.env, verify = verifySelectedDownload) {
  requireFact(env.VERCEL !== '1' || ['production', 'preview', 'development'].includes(env.VERCEL_ENV), 'unknown Vercel environment');
  if (env.VERCEL_ENV === 'production' || env.KEYKEEPER_PRODUCTION_BUILD === '1') {
    const result = await verify();
    console.log('Production download gate passed.');
    return result;
  }
}

async function main() {
  try {
    if (process.argv.length > 3 || (process.argv[2] && process.argv[2] !== '--refresh')) fail('usage: node scripts/release-gate.mjs [--refresh]');
    if (process.argv[2] === '--refresh') {
      // Selecting the latest published Release is explicit; download links never use /latest.
      const selected = releaseMetadata(await request(`https://api.github.com/repos/${repository}/releases/latest`));
      await verifyDownload(selected);
      await writeFile(metadataFile, `${JSON.stringify(selected, null, 2)}\n`);
      console.log(`Updated download metadata to ${selected.tag}.`);
    } else {
      const selected = await verifySelectedDownload();
      console.log(`Download gate passed: ${selected.tag}/${selected.filename} (${selected.length} bytes).`);
    }
  } catch (error) {
    console.error(`Download gate: ${error.message}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) void main();
