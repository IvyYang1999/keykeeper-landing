import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KeyKeeper",
    short_name: "KeyKeeper",
    description: "Local credential access for AI coding tools on macOS.",
    start_url: "/",
    display: "standalone",
    background_color: "#edf3f6",
    theme_color: "#0b1924",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
