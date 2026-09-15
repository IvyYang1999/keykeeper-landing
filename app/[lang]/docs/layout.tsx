import { source } from "@/lib/source";
import { DocsLayout } from "fumadocs-ui/layouts/notebook";
import { baseOptions } from "@/lib/layout.shared";
import "./docs.css";

// The notebook layout: a top bar with the links, theme and language switches at the right,
// the page tree on the left. yyt 2026-09-15: "这仨按钮一般会在右上角，语言切换也是".
export default async function Layout({ params, children }: LayoutProps<"/[lang]/docs">) {
  const { lang } = await params;
  return (
    <div data-docs="">
      <DocsLayout tree={source.getPageTree(lang)} {...baseOptions(lang)} nav={{ ...baseOptions(lang).nav, mode: "top" }}>
        {children}
      </DocsLayout>
    </div>
  );
}
