This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Production download contract

The website uses `lib/download.json`, generated from the published application GitHub Release. Both download buttons and both languages' version labels consume this file. Do not edit its version or URL by hand. After an application release and its signed official appcast are published, run `npm run sync:downloads` and include the resulting metadata in a website PR. The command verifies everything before writing; it never chooses an older release to hide a failure.

`npm run check:downloads` checks the selected tag through GitHub's tag and Release APIs: a published, non-draft stable release; exactly one uploaded `KeyKeeper-<version>.dmg`; a nonzero integer size; the canonical versioned URL; and an official appcast entry with matching version, URL and length plus an `edSignature`. The feed is the application's existing `SUFeedURL`, `https://raw.githubusercontent.com/IvyYang1999/KeyKeeper/main/appcast.xml`. HTTP errors, invalid JSON/XML, missing fields and ambiguous results fail closed. Requests time out after 20 seconds and are never retried or replaced with a fallback.

The gate is called from `next.config.ts` during `PHASE_PRODUCTION_BUILD` when Vercel reports `VERCEL_ENV=production`. It also runs for self-hosted production builds using `KEYKEEPER_PRODUCTION_BUILD=1 npm run build`. A Vercel build with a missing or unknown environment fails closed. Local development and preview builds do not contact GitHub or the appcast. Direct `next build` on Vercel production still invokes the gate. Promoting a previously built preview or using `vercel deploy --prebuilt` without a production build bypasses build hooks; those are not authorized production release paths. Build with the production environment before deploying.

The `Download consistency` workflow runs fixed success/failure samples and existing checks on PRs. On a successful GitHub production `deployment_status` event, it checks out that deployment's exact SHA, revalidates the release, then runs headless Chromium against `https://keykeeper.dev/`. It switches from English to Chinese, verifies the visible top and bottom CTA URLs and version labels, clicks all four entries, and checks each actual download's filename and byte length. The smoke does not deploy or roll back anything. It uploads screenshots, not installers. To run it manually after publication:

```sh
npm ci
npx playwright install chromium
npm run check:downloads
npm run smoke:downloads -- https://keykeeper.dev/
```

On 2026-10-09, v0.3.5 and its 8,832,386-byte DMG exist and the website already links to them, but the official appcast still stops at 0.3.4. The initial metadata preserves the current v0.3.5 selection, derived from its real Release API response. Production builds intentionally fail until the application release owner publishes the corresponding signed appcast entry. This PR neither downgrades the website nor modifies/signs the application's feed. A real v0.3.4 Release/appcast pair is the passing test sample, not a fallback website version.

Signature presence is checked; this website gate does not cryptographically verify Sparkle signatures, build/sign/notarize apps, or guarantee availability after a Release asset is later removed. Deployment smoke reports such availability failures. New-code production smoke remains a post-merge/post-publication check; a smoke against the current live site does not prove this PR has been deployed.
