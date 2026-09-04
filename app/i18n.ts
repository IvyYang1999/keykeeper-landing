export type Language = "en" | "zh";

export const siteCopy = {
  en: {
    nav: { github: "GitHub", language: "Language" },
    hero: {
      title: ["Your AI sees the key's name.", "Never the value."],
      lede: "KeyKeeper keeps API keys in the macOS Keychain and hands them only to the command you approve. No .env file. No master password.",
      primary: "Build from source",
      secondary: "View on GitHub",
      facts: "Free · Open source · macOS 14+",
    },
    window: {
      aria: "Illustration of the KeyKeeper menu bar window approving a request",
      title: "KeyKeeper",
      rows: [
        { id: "openai", field: "OPENAI_API_KEY" },
        { id: "anthropic", field: "ANTHROPIC_API_KEY" },
        { id: "stripe", field: "STRIPE_SECRET_KEY" },
      ],
      askTitle: "Let claude use openai?",
      askBody: "claude · started from Terminal",
      deny: "Don't Allow",
      allow: "Allow",
    },
    cards: [
      {
        title: "Keychain, not .env",
        copy: "Keys live in the macOS Keychain. Your Mac login is the unlock, so there is nothing new to remember and nothing lying in a project folder.",
      },
      {
        title: "Approve who's asking",
        copy: "KeyKeeper looks at who is asking and lets you say yes once. Nobody gets a long-lived token to copy around.",
      },
      {
        title: "One command",
        copy: "Run any tool with the key injected into that process only. Values never appear in the chat.",
        command: "keykeeper run -c openai -- claude",
      },
    ],
    install: {
      title: "Build it in a minute",
      copy: "Signed binaries are coming. Until then, the build script makes the app locally. Needs the Xcode command line tools.",
      copyButton: "Copy",
      copied: "Copied",
    },
    footer: { license: "MIT license", security: "Security model", tagline: "A small macOS app that keeps API keys out of your prompts." },
  },
  zh: {
    nav: { github: "GitHub", language: "语言" },
    hero: {
      title: ["AI 只看到 key 的名字，", "看不到值。"],
      lede: "KeyKeeper 把 API key 存进 macOS 钥匙串，只交给你批准的那条命令。不用 .env，也没有主密码。",
      primary: "从源码构建",
      secondary: "查看 GitHub",
      facts: "免费 · 开源 · macOS 14+",
    },
    window: {
      aria: "KeyKeeper 菜单栏窗口批准请求的示意图",
      title: "KeyKeeper",
      rows: [
        { id: "openai", field: "OPENAI_API_KEY" },
        { id: "anthropic", field: "ANTHROPIC_API_KEY" },
        { id: "stripe", field: "STRIPE_SECRET_KEY" },
      ],
      askTitle: "允许 claude 使用 openai？",
      askBody: "claude · 从终端启动",
      deny: "不允许",
      allow: "允许",
    },
    cards: [
      {
        title: "钥匙串，不是 .env",
        copy: "key 存在 macOS 钥匙串里，登录 Mac 就是解锁。不用多记一个密码，项目目录里也不会躺着明文。",
      },
      {
        title: "批准谁在请求",
        copy: "KeyKeeper 看的是谁在请求，你点一次允许就好。没有人拿到一个可以到处复制的长期 token。",
      },
      {
        title: "一条命令",
        copy: "用任何工具运行，key 只注入到那个进程里。值不会出现在对话中。",
        command: "keykeeper run -c openai -- claude",
      },
    ],
    install: {
      title: "一分钟装好",
      copy: "签名安装包还在路上。现在用构建脚本在本地生成 app，需要 Xcode 命令行工具。",
      copyButton: "复制",
      copied: "已复制",
    },
    footer: { license: "MIT 许可", security: "安全模型", tagline: "一个小小的 macOS 应用，让 API key 远离你的提示词。" },
  },
} as const;
