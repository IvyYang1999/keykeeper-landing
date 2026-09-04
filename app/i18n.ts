export type Language = "en" | "zh";

export const siteCopy = {
  en: {
    nav: { how: "How it works", security: "Security", quick: "Quick start", language: "Language" },
    receipt: {
      aria: "Illustration of a KeyKeeper access approval", bar: "KeyKeeper · access request", waiting: "Waiting",
      eyebrow: "Credential request", title: "Let this process use Stripe?", withheld: "VALUE WITHHELD",
      credential: "Credential", key: "Key", requestedBy: "Requested by", scope: "Scope", session: "This terminal session",
      routeAria: "The AI sees a name, KeyKeeper handles approval, and the process receives the value",
      aiTool: "AI tool", nameOnly: "name only", approval: "approval", process: "process", injected: "value injected",
      deny: "Deny", authorize: "Authorize", caption: "Synthetic example based on the current authorization model.",
    },
    hero: {
      preview: "Public preview · macOS 14+", kicker: "A local trust layer for AI coding tools",
      title: "Give agents access.", emphasis: "Keep the secret out of chat.",
      lede: "KeyKeeper stores API keys in macOS Keychain and injects them into approved local processes. Your AI tool works with credential names, without needing the plaintext value.",
      build: "Build from source", boundary: "Read the security boundary",
      facts: ["MIT licensed", "Local-only storage", "Swift + macOS Keychain"],
    },
    release: {
      label: "Release status", title: "Source install available now",
      copy: "Signed binaries and Homebrew distribution are not published yet. No dead download button, no pretend install command.",
      link: "Open repository quick start",
    },
    handoff: {
      label: "The handoff", title: "The agent asks for a name. KeyKeeper handles the value.",
      copy: "KeyKeeper separates discovery from use. That gives an AI coding tool enough information to run your work without putting the credential itself into the conversation.",
      steps: [
        { command: "keykeeper list", title: "Discover by name", copy: "Agents can list credential IDs and field names. Secret values are not included." },
        { command: "Approve in KeyKeeper", title: "Authorize the caller", copy: "See which local process is asking, choose a duration, and revoke access later." },
        { command: "keykeeper run", title: "Inject at runtime", copy: "The approved child process receives environment variables. Default output is filtered for exact secret values." },
      ],
      conversation: "What the AI conversation needs", receives: "What the approved process receives",
      footnote: "The value crosses into the child process. It does not need to appear in the command, project file, or chat.",
    },
    security: {
      label: "The boundary", title: "Trust is a boundary, not a slogan.",
      copy: "KeyKeeper reduces accidental exposure in local development. It is deliberately explicit about what sits outside that promise.",
      protectsLabel: "Designed to protect", limitsLabel: "Does not protect",
      protections: [
        "Keeping secret values out of project .env files in the recommended workflow.",
        "Avoiding the need to paste plaintext keys into AI conversations.",
        "Redacting exact secret values from stdout and stderr in the default run mode.",
      ],
      limits: [
        "A child process receives the secret and can misuse, transform, save, or transmit it.",
        "TTY mode disables output redaction so interactive programs work correctly.",
        "KeyKeeper is a local access layer, not a sandbox or a cloud secrets manager.",
      ],
      warningLead: "Output redaction is a safety net, not a sandbox.",
      warningTail: "Only run software you trust with production credentials.", link: "Read the full security model",
    },
    quick: {
      label: "Try it", title: "Build the current preview from source.",
      copy: "KeyKeeper is open source and currently distributed as source. The build script produces the macOS app and DMG locally.",
      terminalAria: "Build KeyKeeper from source", commands: "5 commands",
      steps: [
        { title: "Build and open the app", copy: "The repository script creates the app bundle and a local DMG." },
        { title: "Add a credential", copy: "Use the menu bar app. Values are stored in macOS Keychain." },
        { title: "Run an approved process", copy: "keykeeper run -c openai -- your-command" },
      ],
      source: "View source on GitHub",
    },
    faq: {
      label: "Straight answers", title: "Before you trust it with a key.",
      items: [
        { q: "Does the AI ever need my plaintext key?", a: "Not in the recommended KeyKeeper workflow. The AI names a credential and KeyKeeper injects its fields into an approved child process. That process does receive the value, so KeyKeeper cannot protect against malicious code or deliberate exfiltration." },
        { q: "How is this different from a .env file?", a: "KeyKeeper keeps values in macOS Keychain instead of your project directory, and injects them only when a command runs. This reduces accidental exposure through chat, screenshots, shell history, and Git." },
        { q: "What happens without Touch ID?", a: "KeyKeeper can use your Mac login authentication when biometrics are unavailable. The authorization button reflects the method your Mac can actually use." },
        { q: "Why is there no download button yet?", a: "No signed public release has been published. Until that distribution path exists, this page points to the source build that is available today." },
      ],
    },
    final: {
      label: "Open source · Local first · Honest boundaries", title: "Let your tools use the key.", subtitle: "Keep control of the handoff.",
      build: "Build from source", review: "Review the security model",
    },
    footer: { copy: "Open-source credential access for local AI workflows.", license: "MIT license", security: "Security model" },
  },
  zh: {
    nav: { how: "工作原理", security: "安全边界", quick: "快速开始", language: "语言" },
    receipt: {
      aria: "KeyKeeper 访问授权示意图", bar: "KeyKeeper · 访问请求", waiting: "等待授权",
      eyebrow: "凭据请求", title: "允许此进程使用 Stripe？", withheld: "密钥值已隐藏",
      credential: "凭据", key: "密钥", requestedBy: "请求方", scope: "范围", session: "当前终端会话",
      routeAria: "AI 只看到名称，KeyKeeper 处理授权，进程获得密钥值",
      aiTool: "AI 工具", nameOnly: "只见名称", approval: "负责授权", process: "进程", injected: "注入密钥值",
      deny: "拒绝", authorize: "授权", caption: "基于当前授权模型制作的示意图。",
    },
    hero: {
      preview: "公开预览 · macOS 14+", kicker: "面向 AI 编程工具的本地信任层",
      title: "让 Agent 使用密钥。", emphasis: "不让密钥进入对话。",
      lede: "KeyKeeper 将 API 密钥存入 macOS 钥匙串，并只注入已获授权的本地进程。AI 工具只需使用凭据名称，无需看到明文密钥。",
      build: "从源码构建", boundary: "了解安全边界",
      facts: ["MIT 开源许可", "仅本地存储", "Swift + macOS 钥匙串"],
    },
    release: {
      label: "发布状态", title: "目前可从源码安装",
      copy: "签名安装包和 Homebrew 分发尚未发布。这里不会放失效的下载按钮，也不会假装已有安装命令。",
      link: "打开仓库快速开始",
    },
    handoff: {
      label: "交接过程", title: "Agent 只提出凭据名称，KeyKeeper 负责交付密钥值。",
      copy: "KeyKeeper 将“发现凭据”和“使用密钥”分开。AI 编程工具能获得完成任务所需的信息，但凭据值本身不必进入对话。",
      steps: [
        { command: "keykeeper list", title: "按名称发现", copy: "Agent 可以列出凭据 ID 和字段名，其中不包含密钥值。" },
        { command: "在 KeyKeeper 中批准", title: "确认调用方", copy: "查看哪个本地进程正在请求，选择授权时长，之后也可以撤销。" },
        { command: "keykeeper run", title: "运行时注入", copy: "获批的子进程会收到环境变量；默认模式会过滤输出中的完整密钥值。" },
      ],
      conversation: "AI 对话需要看到的内容", receives: "获批进程收到的内容",
      footnote: "密钥值会进入子进程，但无需出现在命令、项目文件或聊天记录中。",
    },
    security: {
      label: "安全边界", title: "信任是一条边界，不是一句口号。",
      copy: "KeyKeeper 用于降低本地开发中的意外泄露风险，也明确说明它无法承诺什么。",
      protectsLabel: "设计上可以防止", limitsLabel: "无法防止",
      protections: [
        "在推荐工作流中，避免把密钥值写入项目的 .env 文件。",
        "无需将明文密钥粘贴进 AI 对话。",
        "默认运行模式会从 stdout 和 stderr 中过滤完整密钥值。",
      ],
      limits: [
        "子进程会收到密钥，因此仍可能滥用、转换、保存或传出密钥。",
        "为保证交互式程序正常工作，TTY 模式会关闭输出过滤。",
        "KeyKeeper 是本地访问层，不是沙箱，也不是云端密钥管理器。",
      ],
      warningLead: "输出过滤是安全网，不是沙箱。", warningTail: "生产密钥只应交给你信任的软件。", link: "阅读完整安全模型",
    },
    quick: {
      label: "开始体验", title: "从源码构建当前预览版。",
      copy: "KeyKeeper 是开源项目，目前以源码形式分发。构建脚本会在本机生成 macOS 应用和 DMG。",
      terminalAria: "从源码构建 KeyKeeper", commands: "5 条命令",
      steps: [
        { title: "构建并打开应用", copy: "仓库脚本会生成应用包和本地 DMG。" },
        { title: "添加凭据", copy: "在菜单栏应用中操作，密钥值会保存到 macOS 钥匙串。" },
        { title: "运行获批进程", copy: "keykeeper run -c openai -- your-command" },
      ],
      source: "在 GitHub 查看源码",
    },
    faq: {
      label: "直接回答", title: "在把密钥交给它之前。",
      items: [
        { q: "AI 是否需要看到我的明文密钥？", a: "在推荐的 KeyKeeper 工作流中不需要。AI 只指定凭据名称，KeyKeeper 把字段注入获批的子进程。子进程确实会收到密钥，因此 KeyKeeper 无法防止恶意代码或主动外传。" },
        { q: "它和 .env 文件有什么区别？", a: "KeyKeeper 将密钥值保存在 macOS 钥匙串而非项目目录中，只在命令运行时注入。这能减少密钥通过聊天、截图、Shell 历史和 Git 意外泄露的风险。" },
        { q: "没有 Touch ID 怎么办？", a: "生物识别不可用时，KeyKeeper 可以使用 Mac 登录认证。授权按钮会反映当前 Mac 实际可用的认证方式。" },
        { q: "为什么现在没有下载按钮？", a: "目前还没有发布签名的公开版本。在正式分发就绪前，本页只指向今天确实可用的源码构建方式。" },
      ],
    },
    final: {
      label: "开源 · 本地优先 · 诚实的安全边界", title: "让工具使用密钥。", subtitle: "把交接权留在自己手里。",
      build: "从源码构建", review: "查看安全模型",
    },
    footer: { copy: "面向本地 AI 工作流的开源凭据访问工具。", license: "MIT 许可", security: "安全模型" },
  },
} as const;
