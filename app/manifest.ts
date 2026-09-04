import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KeyKeeper",
    short_name: "KeyKeeper",
    description: "Local credential access for AI coding tools on macOS.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f7f5",
    theme_color: "#f7f7f5",
    icons: [{ src: "/keykeeper-app-icon.png", sizes: "1024x1024", type: "image/png" }],
  };
}
