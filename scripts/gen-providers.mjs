// Generates content/docs/providers/<id>.mdx from content/providers/<id>.json.
// The JSON is `keykeeper providers show <id>` from the KeyKeeper CLI; re-export it when a
// template changes, then run `node scripts/gen-providers.mjs`.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const src = "content/providers";
const out = "content/docs/providers";
const order = ["openai", "anthropic", "gemini", "supabase", "vercel", "github", "cloudflare", "stripe", "resend", "siliconflow"];
const files = readdirSync(src).filter((f) => f.endsWith(".json"));
const templates = files.map((f) => JSON.parse(readFileSync(join(src, f), "utf8")));
templates.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));

const esc = (s) => String(s).replace(/</g, "&lt;").replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");

for (const t of templates) {
  const env = t.fieldName.toUpperCase().replace(/[^A-Z0-9]/g, "_");
  const shape = [
    t.prefixes?.length ? `starts with \`${t.prefixes.join("\` or \`")}\`` : null,
    t.minChars ? `at least ${t.minChars} characters` : null,
    t.shownOnce ? "shown once when created" : "can be viewed again in the console",
  ].filter(Boolean).join(", ");
  const v = t.validation;
  const body = `---
title: ${t.name}
description: How an agent gets a ${t.name} key through KeyKeeper, what to choose on ${new URL(t.createURL).host}, and how KeyKeeper verifies it.
---

import { Step, Steps } from "fumadocs-ui/components/steps";
import { Callout } from "fumadocs-ui/components/callout";

| Template id | \`${t.id}\`${t.aliases?.length ? ` (also \`${t.aliases.join("`, `")}\`)` : ""} |
|---|---|
| Field | \`${t.fieldName}\` → \`${env}\` in \`keykeeper run\` |
| Key looks like | ${esc(shape)} |
| Created at | [${new URL(t.createURL).host}](${t.createURL}) |
| Verified by KeyKeeper | ${v ? `\`GET ${v.url}\` — ${esc(v.description)}` : "not verified"} |
| Template checked | ${t.verified} |

## What the agent does

\`\`\`bash
keykeeper providers show ${t.id}
keykeeper save --provider ${t.id} --from-clipboard --create --purpose "what this task does"
keykeeper run -c ${t.id} -- <your command>
\`\`\`

\`--provider ${t.id}\` fills in the credential id and the field. The field's environment
variable is the one ${t.name}'s own tools read, so nothing has to be mapped.

## What only you can do

<Steps>
${t.gates.map((g) => `<Step>${esc(g)}</Step>`).join("\n")}
<Step>Copy the key, then approve the save in KeyKeeper's window.</Step>
</Steps>

## What to choose

${esc(t.minimalPermission)}

<Callout type="info">
The agent is told the same thing. It opens the page for you and says what to pick; it never
logs in, passes 2FA or pays on your behalf.
</Callout>

## What KeyKeeper checks

- **Before writing:** the value must look like a ${t.name} key (${esc(shape.split(", ").slice(0, 2).join(", ") || "no shape rule")}). A wrong paste is refused before anything is stored, and the agent is told why — without the value.
${v ? `- **After saving:** KeyKeeper itself sends \`${v.method} ${v.url}\` with the key in the \`${v.header}\` header (${esc(v.description)}). ${v.validIfBodyContains?.length ? "A restricted key that answers with `" + v.validIfBodyContains.join("`/`") + "` counts as valid. " : ""}The agent receives *accepted*, *rejected* or *could not reach* — never the value.` : `- **After saving:** ${t.name} offers no read-only endpoint KeyKeeper can use, so the first real call is the test.`}

## Rotation and expiry

${esc(t.expiryNote ?? "")}${t.rotateURL ? ` Rotate or revoke at [${new URL(t.rotateURL).host}](${t.rotateURL}).` : ""}
`;
  writeFileSync(join(out, `${t.id}.mdx`), body);
}
writeFileSync(join(out, "meta.json"), JSON.stringify({ title: "Providers", pages: ["index", ...templates.map((t) => t.id)] }, null, 2) + "\n");
console.log(`generated ${templates.length} provider pages`);
