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

// Chinese pages: the same facts, with content/providers/zh/<id>.json overriding the free-text
// fields (gates, minimalPermission, expiryNote, validation description).
const zhDir = join(src, "zh");
for (const t of templates) {
  let zh = {};
  try { zh = JSON.parse(readFileSync(join(zhDir, `${t.id}.json`), "utf8")); } catch {}
  const env = t.fieldName.toUpperCase().replace(/[^A-Z0-9]/g, "_");
  const host = new URL(t.createURL).host;
  const shapeParts = [
    t.prefixes?.length ? `以 \`${t.prefixes.join("\` 或 \`")}\` 开头` : null,
    t.minChars ? `至少 ${t.minChars} 个字符` : null,
  ].filter(Boolean);
  const shape = [...shapeParts, t.shownOnce ? "创建时只显示一次" : "可在控制台再次查看"].join("，");
  const v = t.validation;
  const gates = zh.gates ?? t.gates;
  const body = `---
title: ${t.name}
description: Agent 怎样通过 KeyKeeper 拿到 ${t.name} 的 key，在 ${host} 该选什么，KeyKeeper 怎么验证。
---

import { Step, Steps } from "fumadocs-ui/components/steps";
import { Callout } from "fumadocs-ui/components/callout";

| 模板 id | \`${t.id}\`${t.aliases?.length ? `（别名 \`${t.aliases.join("`、`")}\`）` : ""} |
|---|---|
| 字段 | \`${t.fieldName}\` → \`keykeeper run\` 里的 \`${env}\` |
| key 长什么样 | ${esc(shape)} |
| 创建页面 | [${host}](${t.createURL}) |
| KeyKeeper 的验证 | ${v ? `\`GET ${v.url}\`——${esc(zh.validation ?? v.description)}` : "不验证"} |
| 模板核实日期 | ${t.verified} |

## Agent 做什么

\`\`\`bash
keykeeper providers show ${t.id}
keykeeper save --provider ${t.id} --from-clipboard --create --purpose "这个任务是做什么的"
keykeeper run -c ${t.id} -- <你的命令>
\`\`\`

\`--provider ${t.id}\` 会补上凭据 ID 和字段名。这个字段的环境变量就是 ${t.name} 自家工具读的那个，不需要任何映射。

## 只有你能做的

<Steps>
${gates.map((g) => `<Step>${esc(g)}</Step>`).join("\n")}
<Step>复制 key，然后在 KeyKeeper 的窗口里确认保存。</Step>
</Steps>

## 该选什么

${esc(zh.minimalPermission ?? t.minimalPermission)}

<Callout type="info">
Agent 被告知的是同一件事。它替你打开页面、说明该选什么；它从不替你登录、过 2FA 或付费。
</Callout>

## KeyKeeper 检查什么

- **写入前：** 值必须像一把 ${t.name} 的 key（${esc(shapeParts.join("，") || "没有形状规则")}）。贴错了会在存入之前被拒绝，并告诉 Agent 原因——不含值。
${v ? `- **保存后：** KeyKeeper 自己发送 \`${v.method} ${v.url}\`，key 放在 \`${v.header}\` 请求头里（${esc(zh.validation ?? v.description)}）。${v.validIfBodyContains?.length ? "回应里带 `" + v.validIfBodyContains.join("`/`") + "` 的受限 key 也算有效。" : ""}Agent 收到的是「接受」「拒绝」或「联系不上」——从不是值。` : `- **保存后：** ${t.name} 没有 KeyKeeper 可用的只读接口，第一次真实调用就是测试。`}

## 轮换与过期

${esc(zh.expiryNote ?? t.expiryNote ?? "")}${t.rotateURL ? ` 在 [${new URL(t.rotateURL).host}](${t.rotateURL}) 轮换或撤销。` : ""}
`;
  writeFileSync(join(out, `${t.id}.zh.mdx`), body);
}
console.log(`generated ${templates.length} provider pages (en + zh)`);
