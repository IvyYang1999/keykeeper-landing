import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { appName, gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
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
    links: [{ text: "Download", url: "/#install" }],
  };
}
