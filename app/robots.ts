import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://keykeeper.dev/sitemap.xml",
    host: "https://keykeeper.dev",
  };
}
