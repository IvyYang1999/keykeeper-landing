import { source } from "@/lib/source";
import { DocsBody, DocsDescription, DocsPage, DocsTitle, MarkdownCopyButton } from "fumadocs-ui/layouts/notebook/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getPageMarkdownUrl } from "@/lib/shared";

export default async function Page(props: PageProps<"/[lang]/docs/[[...slug]]">) {
  const { slug, lang } = await props.params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row gap-2 items-center border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
      </div>
      <DocsBody>
        <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams("slug", "lang");
}

export async function generateMetadata(props: PageProps<"/[lang]/docs/[[...slug]]">): Promise<Metadata> {
  const { slug, lang } = await props.params;
  const page = source.getPage(slug, lang);
  if (!page) notFound();
  const suffix = lang === "zh" ? "KeyKeeper 文档" : "KeyKeeper Docs";
  return {
    title: page.data.title === "KeyKeeper" ? suffix : `${page.data.title} — ${suffix}`,
    description: page.data.description,
    alternates: { canonical: page.url },
  };
}
