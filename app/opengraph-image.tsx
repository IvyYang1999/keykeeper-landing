import { ImageResponse } from "next/og";

export const alt = "KeyKeeper — Give agents access. Keep the secret out of chat.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#edf3f6", color: "#0b1924", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700 }}>
        <div style={{ width: 54, height: 54, display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #0b1924", borderRadius: 14 }}>K</div>
        <span>KeyKeeper</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.02, letterSpacing: -4, fontWeight: 760 }}>
          <span>Give agents access.</span>
          <span style={{ color: "#0b61d6" }}>Keep the secret out of chat.</span>
        </div>
        <div style={{ width: 880, fontSize: 28, lineHeight: 1.4, color: "#475965" }}>Local, open-source credential access for AI coding workflows on macOS.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, borderTop: "2px solid #7f929e", fontSize: 20, color: "#475965" }}>
        <span>macOS Keychain · caller approval · runtime injection</span>
        <span style={{ color: "#0b61d6", fontWeight: 700 }}>keykeeper.dev</span>
      </div>
    </div>,
    size,
  );
}
