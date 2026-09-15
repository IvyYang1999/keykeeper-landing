import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://keykeeper.dev"),
  applicationName: "KeyKeeper",
  title: "KeyKeeper — Trust agents to manage your API keys. Safely.",
  description: "Let Codex, Claude Code or any agent fetch, store, verify and use API keys on your Mac. You approve each use; the agent never sees the value. Free, open source, no account.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "KeyKeeper",
    title: "Trust agents to manage your API keys. Safely.",
    description: "Agents fetch, store, verify and use keys on your Mac. You approve; they never see the value.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KeyKeeper — trust agents with API keys, safely",
    description: "Let local processes use API keys without pasting plaintext secrets into AI chat.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({"@context":"https://schema.org","@type":"SoftwareApplication",name:"KeyKeeper",url:"https://keykeeper.dev/",operatingSystem:"macOS",applicationCategory:"DeveloperApplication"})}} /></head><body>{children}<Script src="/dc-analytics.js" strategy="afterInteractive" data-ga-id="G-D3CN3CW2WT" data-site="keykeeper" data-hosts="keykeeper.dev,www.keykeeper.dev" /></body></html>;
}
