import { ImageResponse } from "next/og";

export const alt = "KeyKeeper — Your AI sees the key's name. Never the value.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#ffffff", color: "#1d1d1f", fontFamily: "-apple-system, BlinkMacSystemFont, Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700 }}>
        <div style={{ width: 58, height: 58, position: "relative", display: "flex", borderRadius: 16, background: "rgba(255,255,255,.72)", boxShadow: "0 14px 35px rgba(45,35,0,.16)" }}>
          <div style={{ position: "absolute", top: 12, left: 13, width: 20, height: 20, border: "6px solid #f5b900", borderRadius: 20 }} />
          <div style={{ position: "absolute", top: 28, left: 19, width: 7, height: 20, borderRadius: 8, background: "#f5b900", transform: "rotate(15deg)" }} />
          <div style={{ position: "absolute", top: 13, right: 10, width: 18, height: 18, border: "5px solid #f5b900", borderRadius: 20 }} />
          <div style={{ position: "absolute", top: 27, right: 15, width: 6, height: 21, borderRadius: 8, background: "#f5b900", transform: "rotate(-14deg)" }} />
        </div>
        <span>KeyKeeper</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 66, lineHeight: 1.04, letterSpacing: -3, fontWeight: 760 }}>
          <span>Your AI sees the key&apos;s name.</span>
          <span>Never the value.</span>
        </div>
        <div style={{ width: 880, fontSize: 28, lineHeight: 1.4, color: "#6e6e73" }}>Keys live in the macOS Keychain and go only to the command you approve. No .env, no master password.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid rgba(23,23,22,.18)", fontSize: 20, color: "#86868b" }}>
        <span>macOS Keychain · per-caller approval · runtime injection</span>
        <span style={{ color: "#1d1d1f", fontWeight: 600 }}>keykeeper.dev</span>
      </div>
    </div>,
    size,
  );
}
