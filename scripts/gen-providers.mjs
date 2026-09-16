// Generates content/docs/providers/<id>.mdx (+ .zh.mdx), the two index pages and meta.json
// from content/providers/<id>.json. The JSON is `keykeeper providers show <id>` from the
// KeyKeeper CLI; content/providers/_catalog.json carries the app's categories and brand
// families. Re-export when a template changes, then run `node scripts/gen-providers.mjs`.
import { readdirSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { join } from "node:path";

const src = "content/providers";
const out = "content/docs/providers";
const catalog = JSON.parse(readFileSync(join(src, "_catalog.json"), "utf8"));
const files = readdirSync(src).filter((f) => f.endsWith(".json") && !f.startsWith("_"));
const byId = Object.fromEntries(files.map((f) => JSON.parse(readFileSync(join(src, f), "utf8"))).map((t) => [t.id, t]));

const categoryOrder = ["models", "gateways", "cloud", "development", "apple", "analytics", "messaging", "payments"];
const categoryName = {
  en: { models: "AI models", gateways: "AI gateways", cloud: "Cloud & databases", development: "Development & publishing",
    apple: "Apple services", analytics: "Analytics & monitoring", messaging: "Email & messaging", payments: "Payments" },
  zh: { models: "AI 模型", gateways: "AI 聚合与网关", cloud: "云平台与数据库", development: "开发与发布",
    apple: "Apple 服务", analytics: "分析与监控", messaging: "邮件与消息", payments: "支付" },
};
const familyOf = {};
for (const fam of catalog.families) for (const id of fam.members) familyOf[id] = fam;
const familyName = (t) => familyOf[t.id]?.name ?? t.name;
const variantLabel = (t) => {
  const fam = familyOf[t.id];
  if (!fam) return null;
  let label = t.name;
  for (const p of [...fam.strip, fam.name].sort((a, b) => b.length - a.length)) {
    if (p && label.toLowerCase().startsWith(p.toLowerCase())) { label = label.slice(p.length); break; }
  }
  label = label.replace(/^[\s·:-]+/, "").trim();
  return label || t.name;
};
const collator = new Intl.Collator("en");
// Category → brand groups in name order, variants in the family's own order.
const grouped = categoryOrder.map((cat) => {
  const ids = catalog.categories[cat] ?? [];
  const groups = new Map();
  for (const id of ids) {
    const t = byId[id];
    if (!t) continue;
    const key = familyOf[id]?.id ?? id;
    if (!groups.has(key)) groups.set(key, { name: familyName(t), members: [] });
    groups.get(key).members.push(t);
  }
  for (const g of groups.values()) {
    const order = familyOf[g.members[0].id]?.members ?? [];
    g.members.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
  }
  return { cat, groups: [...groups.values()].sort((a, b) => collator.compare(a.name, b.name)) };
});
const ordered = grouped.flatMap((g) => g.groups.flatMap((x) => x.members));
const missing = Object.keys(byId).filter((id) => !ordered.some((t) => t.id === id));
if (missing.length) throw new Error("templates without a category: " + missing.join(", "));

const esc = (s) => String(s).replace(/</g, "&lt;").replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");
const env = (name) => name.toUpperCase().replace(/[^A-Z0-9]/g, "_");
const host = (u) => { try { return new URL(u).host; } catch { return u; } };
const kindWord = {
  en: { secretText: "secret", secretFile: "credential file", publicText: "plain, confirmed by you", localIdentity: "signing identity in the macOS Keychain" },
  zh: { secretText: "密钥", secretFile: "凭据文件", publicText: "明文，需你确认", localIdentity: "macOS 钥匙串里的签名身份" },
};

// Stale pages from a previous run are removed so a renamed template does not leave a ghost.
for (const f of readdirSync(out)) if (f.endsWith(".mdx") && !f.startsWith("index")) unlinkSync(join(out, f));

for (const t of ordered) {
  const primary = t.fields.find((f) => f.isPrimary) ?? t.fields[0];
  const isIdentity = t.fields.some((f) => f.kind === "localIdentity");
  const fileField = t.fields.find((f) => f.kind === "secretFile");
  const shape = [
    t.prefixes?.length ? `starts with \`${t.prefixes.join("\` or \`")}\`` : null,
    t.minChars ? `at least ${t.minChars} characters` : null,
    t.shownOnce ? "shown once when created" : "can be viewed again in the console",
  ].filter(Boolean).join(", ");
  const v = t.validation;
  const fieldRows = t.fields.map((f) => `| ${f.isPrimary ? "Field" : "Also"} | \`${f.name}\`${f.kind === "localIdentity" ? "" : ` → \`${env(f.name)}\``}${(f.aliases ?? []).map((a) => ` / \`${env(a)}\``).join("")} · ${kindWord.en[f.kind]}${f.required === false ? ", optional" : ""} |`).join("\n");
  const save = fileField
    ? `keykeeper save --provider ${t.id} --from-file /path/to/${fileField.name}.${fileField.fileFormat === "applePrivateKeyP8" ? "p8" : "json"} --create --purpose "what this task does"`
    : `keykeeper save --provider ${t.id} --from-clipboard --create --purpose "what this task does"`;
  const endpoints = t.endpoints?.length ? `

## Endpoints

The key is a bearer token for these endpoints. \`keykeeper run\` sets only the variables above;
point your client at the base URL yourself.

${t.endpoints.map((e) => `- **${esc(e.protocolName)}** — \`${e.baseURL}\`${e.region ? ` (${esc(e.region)})` : ""}`).join("\n")}` : "";
  const body = `---
title: ${t.name}
description: How an agent gets a ${t.name} key through KeyKeeper, what to choose on ${host(t.createURL)}, and how KeyKeeper verifies it.
---

import { Step, Steps } from "fumadocs-ui/components/steps";
import { Callout } from "fumadocs-ui/components/callout";

| Template id | \`${t.id}\`${t.aliases?.length ? ` (also \`${t.aliases.join("`, `")}\`)` : ""} |
|---|---|
${fieldRows}
| Key looks like | ${esc(shape)} |
| Created at | [${host(t.createURL)}](${t.createURL}) |
| Verified by KeyKeeper | ${v ? `\`${v.method} ${v.url}\` — ${esc(v.description)}` : "not verified"} |
| Template checked | ${t.verified} |
${isIdentity ? `
<Callout type="warn">
This is a signing identity that stays in the macOS Keychain. KeyKeeper stores no private key
material for it; the template only records where Apple manages it.
</Callout>
` : `
## What the agent does

\`\`\`bash
keykeeper providers show ${t.id}
${save}
keykeeper run -c ${t.id} -- <your command>
\`\`\`

\`--provider ${t.id}\` fills in the credential id and the field${t.fields.length > 1 ? "s" : ""}. The environment
variable${t.fields.length > 1 ? "s are" : " is"} the one${t.fields.length > 1 ? "s" : ""} ${familyName(t)}'s own tools read, so nothing has to be mapped.
`}
## What only you can do

<Steps>
${t.gates.map((g) => `<Step>${esc(g)}</Step>`).join("\n")}
${isIdentity ? "" : "<Step>Copy the key, then approve the save in KeyKeeper's window.</Step>"}
</Steps>

## What to choose

${esc(t.minimalPermission)}

<Callout type="info">
The agent is told the same thing. It opens the page for you and says what to pick; it never
logs in, passes 2FA or pays on your behalf.
</Callout>
${isIdentity ? "" : `
## What KeyKeeper checks

- **Before writing:** the value must look like a ${t.name} key (${esc(shape.split(", ").slice(0, 2).join(", ") || "no shape rule")}). A wrong paste is refused before anything is stored, and the agent is told why — without the value.
${v ? `- **After saving:** KeyKeeper itself sends \`${v.method} ${v.url}\` with the key in the \`${v.header}\` header (${esc(v.description)}). ${v.validIfBodyContains?.length ? "A restricted key that answers with `" + v.validIfBodyContains.join("`/`") + "` counts as valid. " : ""}The agent receives *accepted*, *rejected* or *could not reach* — never the value.` : `- **After saving:** ${t.name} offers no read-only endpoint KeyKeeper can use, so the first real call is the test.`}
`}${endpoints}

## Rotation and expiry

${esc(t.expiryNote ?? "")}${t.rotateURL ? ` Rotate or revoke at [${host(t.rotateURL)}](${t.rotateURL}).` : ""}
`;
  writeFileSync(join(out, `${t.id}.mdx`), body);
}

// Chinese pages: the same facts, with content/providers/zh/<id>.json overriding the free-text
// fields (gates, minimalPermission, expiryNote, validation description) where a translation exists.
const zhDir = join(src, "zh");
for (const t of ordered) {
  let zh = {};
  try { zh = JSON.parse(readFileSync(join(zhDir, `${t.id}.json`), "utf8")); } catch {}
  const isIdentity = t.fields.some((f) => f.kind === "localIdentity");
  const fileField = t.fields.find((f) => f.kind === "secretFile");
  const shapeParts = [
    t.prefixes?.length ? `以 \`${t.prefixes.join("\` 或 \`")}\` 开头` : null,
    t.minChars ? `至少 ${t.minChars} 个字符` : null,
  ].filter(Boolean);
  const shape = [...shapeParts, t.shownOnce ? "创建时只显示一次" : "可在控制台再次查看"].join("，");
  const v = t.validation;
  const gates = zh.gates ?? t.gates;
  const fieldRows = t.fields.map((f) => `| ${f.isPrimary ? "字段" : "还有"} | \`${f.name}\`${f.kind === "localIdentity" ? "" : ` → \`${env(f.name)}\``}${(f.aliases ?? []).map((a) => ` / \`${env(a)}\``).join("")} · ${kindWord.zh[f.kind]}${f.required === false ? "，可选" : ""} |`).join("\n");
  const save = fileField
    ? `keykeeper save --provider ${t.id} --from-file /路径/${fileField.name}.${fileField.fileFormat === "applePrivateKeyP8" ? "p8" : "json"} --create --purpose "这个任务是做什么的"`
    : `keykeeper save --provider ${t.id} --from-clipboard --create --purpose "这个任务是做什么的"`;
  const endpoints = t.endpoints?.length ? `

## 接入地址

这把 key 是下面这些地址的 bearer token。\`keykeeper run\` 只设置上面的环境变量，base URL 要你自己在客户端里指。

${t.endpoints.map((e) => `- **${esc(e.protocolName)}**——\`${e.baseURL}\`${e.region ? `（${esc(e.region)}）` : ""}`).join("\n")}` : "";
  const body = `---
title: ${t.name}
description: Agent 怎样通过 KeyKeeper 拿到 ${t.name} 的 key，在 ${host(t.createURL)} 该选什么，KeyKeeper 怎么验证。
---

import { Step, Steps } from "fumadocs-ui/components/steps";
import { Callout } from "fumadocs-ui/components/callout";

| 模板 id | \`${t.id}\`${t.aliases?.length ? `（别名 \`${t.aliases.join("`、`")}\`）` : ""} |
|---|---|
${fieldRows}
| key 长什么样 | ${esc(shape)} |
| 创建页面 | [${host(t.createURL)}](${t.createURL}) |
| KeyKeeper 的验证 | ${v ? `\`${v.method} ${v.url}\`——${esc(zh.validation ?? v.description)}` : "不验证"} |
| 模板核实日期 | ${t.verified} |
${isIdentity ? `
<Callout type="warn">
这是留在 macOS 钥匙串里的签名身份。KeyKeeper 不保存它的私钥；模板只记录 Apple 在哪里管理它。
</Callout>
` : `
## Agent 做什么

\`\`\`bash
keykeeper providers show ${t.id}
${save}
keykeeper run -c ${t.id} -- <你的命令>
\`\`\`

\`--provider ${t.id}\` 会补上凭据 ID 和字段名。这些环境变量就是 ${familyName(t)} 自家工具读的那个，不需要任何映射。
`}
## 只有你能做的

<Steps>
${gates.map((g) => `<Step>${esc(g)}</Step>`).join("\n")}
${isIdentity ? "" : "<Step>复制 key，然后在 KeyKeeper 的窗口里确认保存。</Step>"}
</Steps>

## 该选什么

${esc(zh.minimalPermission ?? t.minimalPermission)}

<Callout type="info">
Agent 被告知的是同一件事。它替你打开页面、说明该选什么；它从不替你登录、过 2FA 或付费。
</Callout>
${isIdentity ? "" : `
## KeyKeeper 检查什么

- **写入前：** 值必须像一把 ${t.name} 的 key（${esc(shapeParts.join("，") || "没有形状规则")}）。贴错了会在存入之前被拒绝，并告诉 Agent 原因——不含值。
${v ? `- **保存后：** KeyKeeper 自己发送 \`${v.method} ${v.url}\`，key 放在 \`${v.header}\` 请求头里（${esc(zh.validation ?? v.description)}）。${v.validIfBodyContains?.length ? "回应里带 `" + v.validIfBodyContains.join("`/`") + "` 的受限 key 也算有效。" : ""}Agent 收到的是「接受」「拒绝」或「联系不上」——从不是值。` : `- **保存后：** ${t.name} 没有 KeyKeeper 可用的只读接口，第一次真实调用就是测试。`}
`}${endpoints}

## 轮换与过期

${esc(zh.expiryNote ?? t.expiryNote ?? "")}${t.rotateURL ? ` 在 [${host(t.rotateURL)}](${t.rotateURL}) 轮换或撤销。` : ""}
`;
  writeFileSync(join(out, `${t.id}.zh.mdx`), body);
}

// Index pages: every brand under its category, variants inline. Written after the intro kept
// in content/providers/_index.<lang>.md so the prose stays hand-written.
for (const lang of ["en", "zh"]) {
  const intro = readFileSync(join(src, `_index.${lang}.md`), "utf8");
  const total = ordered.length;
  const brands = new Set(ordered.map((t) => familyOf[t.id]?.id ?? t.id)).size;
  const base = lang === "en" ? "/docs/providers/" : "/zh/docs/providers/";
  const list = grouped.map(({ cat, groups }) => `## ${categoryName[lang][cat]}\n\n` + groups.map((g) => {
    if (g.members.length === 1) return `- [${g.name}](${base}${g.members[0].id})`;
    return `- **${g.name}** — ` + g.members.map((t) => `[${variantLabel(t)}](${base}${t.id})`).join(lang === "en" ? ", " : "、");
  }).join("\n")).join("\n\n");
  const counts = lang === "en"
    ? `${total} templates across ${brands} providers.`
    : `${brands} 家服务商，${total} 个模板。`;
  writeFileSync(join(out, lang === "en" ? "index.mdx" : "index.zh.mdx"),
    intro.replace("{{COUNTS}}", counts).trimEnd() + "\n\n" + list + "\n");
}

const pages = ["index", ...grouped.flatMap(({ cat, groups }) => [`---${categoryName.en[cat]}---`, ...groups.flatMap((g) => g.members.map((t) => t.id))])];
const pagesZh = ["index", ...grouped.flatMap(({ cat, groups }) => [`---${categoryName.zh[cat]}---`, ...groups.flatMap((g) => g.members.map((t) => t.id))])];
writeFileSync(join(out, "meta.json"), JSON.stringify({ title: "Providers", pages }, null, 2) + "\n");
writeFileSync(join(out, "meta.zh.json"), JSON.stringify({ title: "服务商", pages: pagesZh }, null, 2) + "\n");
writeFileSync(join(src, "_summary.json"), JSON.stringify({
  total: ordered.length,
  brands: new Set(ordered.map((t) => familyOf[t.id]?.id ?? t.id)).size,
  categories: Object.fromEntries(grouped.map(({ cat, groups }) => [cat, groups.reduce((n, g) => n + g.members.length, 0)])),
}, null, 2) + "\n");
console.log(`generated ${ordered.length} provider pages (en + zh)`);
