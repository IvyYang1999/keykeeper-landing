import { ImageResponse } from "next/og";

export const alt = "KeyKeeper — Your agent should see the key's name. Never its value.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#edf3f6", color: "#0b1924", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700 }}>
        {/* Same shield mark as the nav and favicon: the OG card is the Show HN thumbnail,
            and a third, unrelated logo there made the brand look assembled from parts. */}
        <svg width="54" height="54" viewBox="0 0 32 32" fill="none" stroke="#0b1924" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 2.8 27 7v8.2c0 7-4.4 11.8-11 14-6.6-2.2-11-7-11-14V7l11-4.2Z" />
          <circle cx="13.2" cy="15" r="3.2" />
          <path d="M16.4 15H22m-2 0v2.5" />
        </svg>
        <span>KeyKeeper</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 66, lineHeight: 1.04, letterSpacing: -3, fontWeight: 760 }}>
          <span>Your agent should see</span>
          <span>the key&apos;s name.</span>
          <span style={{ color: "#0b61d6" }}>Never its value.</span>
        </div>
        <div style={{ width: 880, fontSize: 28, lineHeight: 1.4, color: "#475965" }}>Free and open source. No master password — your Mac login is the unlock.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, borderTop: "2px solid #7f929e", fontSize: 20, color: "#475965" }}>
        <span>macOS Keychain · per-caller approval · runtime injection</span>
        <span style={{ color: "#0b61d6", fontWeight: 700 }}>keykeeper.dev</span>
      </div>
    </div>,
    size,
  );
}
