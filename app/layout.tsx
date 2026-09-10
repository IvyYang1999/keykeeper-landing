import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://keykeeper.dev"),
  applicationName: "KeyKeeper",
  title: "KeyKeeper — Your AI sees the key's name. Never the value.",
  description: "Stop pasting sk-… into Cursor and Claude Code. KeyKeeper keeps API keys in the macOS Keychain and injects them into the command that needs them. Free, open source, no master password.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "KeyKeeper",
    title: "Your AI sees the key's name. Never the value.",
    description: "Free and open source. Keys live in the macOS Keychain, no .env, no master password.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KeyKeeper — the key's name, never the value",
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
  return <html lang="en"><body>{children}<Script src="/dc-analytics.js" strategy="afterInteractive" data-ga-id="G-D3CN3CW2WT" data-site="keykeeper" data-hosts="keykeeper.dev,www.keykeeper.dev" /></body></html>;
}
