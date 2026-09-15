import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { uiTranslations } from "fumadocs-ui/i18n";
import { i18n } from "./i18n";
import { appName, gitConfig } from "./shared";

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    en: { displayName: "English" },
    zh: {
      displayName: "中文",
      "Choose a language(language switcher)": "选择语言",
      "Search(search dialog)": "搜索",
      "Search(search trigger)": "搜索",
      "Copy Markdown(page actions)": "复制 Markdown",
      "Edit on GitHub(edit page)": "在 GitHub 上编辑",
      "Last updated on(page footer)": "最后更新",
      "Next Page(pagination)": "下一页",
      "Previous Page(pagination)": "上一页",
      "No Headings(table of contents)": "本页没有标题",
      "No results found(search dialog)": "没有结果",
      "On this page(table of contents)": "本页目录",
      "Page Not Found(404 not found page)": "页面不存在",
      "Back to Home(404 not found page)": "回到首页",
    },
  });

export function baseOptions(locale: string): BaseLayoutProps {
  const zh = locale === "zh";
  return {
    nav: {
      title: (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
          <img src="/keykeeper-app-icon.png" alt="" width={22} height={22} style={{ borderRadius: 6 }} />
          {appName}
        </span>
      ),
      url: "/",
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [{ text: zh ? "下载" : "Download", url: "/#install" }],
  };
}
