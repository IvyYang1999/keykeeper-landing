import { RootProvider } from "fumadocs-ui/provider/next";
import { i18nProvider } from "fumadocs-ui/i18n";
import { translations } from "@/lib/layout.shared";

export default async function LangLayout({ params, children }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  return <RootProvider i18n={i18nProvider(translations, lang)}>{children}</RootProvider>;
}
