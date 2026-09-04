import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://keykeeper.dev"),
  applicationName: "KeyKeeper",
  title: "KeyKeeper — Your agent should see the key's name, never its value",
  description: "Stop pasting sk-… into Cursor and Claude Code. KeyKeeper keeps API keys in the macOS Keychain and injects them into the command that needs them. Free, open source, no master password.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "KeyKeeper",
    title: "Your agent should see the key's name. Never its value.",
    description: "Free and open source. No master password — your Mac login is the unlock.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KeyKeeper — the key's name, never its value",
    description: "Let local processes use API keys without pasting plaintext secrets into AI chat.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#edf3f6" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1620" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${archivo.variable} ${plexMono.variable}`}>{children}</body></html>;
}
