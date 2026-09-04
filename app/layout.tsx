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
  title: "KeyKeeper — Keep API keys out of AI conversations",
  description: "A macOS app and CLI that stores API keys in Keychain and injects them into approved local processes, without putting plaintext secrets in AI chat.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "KeyKeeper",
    title: "Give agents access. Keep the secret out of chat.",
    description: "Local, open-source credential access for AI coding workflows on macOS.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KeyKeeper — Credential access for AI coding tools",
    description: "Let local processes use API keys without pasting plaintext secrets into AI chat.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#edf3f6",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${archivo.variable} ${plexMono.variable}`}>{children}</body></html>;
}
