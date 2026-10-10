import type { MetadataRoute } from "next";
import { i18n } from "@/lib/i18n";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = "https://keykeeper.dev";
  const urls = new Set([
    origin,
    ...i18n.languages.flatMap((language) =>
      source.getPages(language).map((page) => new URL(page.url, origin).href),
    ),
  ]);
  // Use the same public URLs as the docs' canonical metadata, including the hidden
  // English locale. Do not advertise internal /en aliases or Markdown endpoints.
  return [...urls].map((url) => ({ url }));
}
