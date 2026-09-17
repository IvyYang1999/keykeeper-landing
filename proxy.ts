import { NextRequest, NextResponse } from "next/server";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";
import { docsContentRoute, docsRoute } from "@/lib/shared";

const { rewrite: rewriteDocs } = rewritePath(`${docsRoute}{/*path}`, `${docsContentRoute}{/*path}/content.md`);
const { rewrite: rewriteSuffix } = rewritePath(`${docsRoute}{/*path}.md`, `${docsContentRoute}{/*path}/content.md`);

export default function proxy(request: NextRequest) {
  const result = rewriteSuffix(request.nextUrl.pathname);
  if (result) return NextResponse.rewrite(new URL(result, request.nextUrl));

  if (isMarkdownPreferred(request)) {
    const result = rewriteDocs(request.nextUrl.pathname);
    if (result) return NextResponse.rewrite(new URL(result, request.nextUrl), { headers: { Vary: "Accept" } });
  }

  // The generic i18n middleware redirects /docs back to /docs with the hidden-default
  // locale in this Next/Fumadocs combination. Explicitly rewrite the public English URL
  // to the internal route, without a client-visible redirect or another proxy pass.
  const path = request.nextUrl.pathname;
  if (path === "/docs" || path.startsWith("/docs/")) {
    return NextResponse.rewrite(new URL(`/en${path}`, request.url));
  }
  return NextResponse.next();
}

// Only the docs take part in locale routing; the landing page keeps its own language switch.
export const config = {
  matcher: ["/docs/:path*", "/en/docs/:path*", "/zh/docs/:path*", "/docs"],
};
