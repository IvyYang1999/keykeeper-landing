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
      preview: "Free · open source · macOS 14+",
      titleLines: ["Your agent should see", "the key's name."], emphasisLines: ["Never its value."],
      lede: "KeyKeeper keeps API keys in the macOS Keychain and injects them only into approved commands. No .env file. No master password.",
      boundaryNote: "Plaintext stays out of chat and project files. A child process you approve still receives it.",
      build: "Build from source", boundary: "Read the security boundary",
      facts: ["No master password", "No cloud account, no Docker", "MIT licensed"],
    },
    release: {
      label: "Release status", title: "Source install available now",
      copy: "Signed binaries and Homebrew are not published yet. You can build from source today.",
      link: "Open repository quick start",
    },
    handoff: {
      label: "How it works", title: "Name it. Approve it. Run it.",
      copy: "The AI works with a credential name. KeyKeeper handles the value.",
      steps: [
        { command: "keykeeper list", title: "Find the name", copy: "List credential IDs and field names — never values." },
        { command: "Approve in KeyKeeper", title: "Check the caller", copy: "See which local process is asking and choose a duration." },
        { command: "keykeeper run", title: "Inject at runtime", copy: "The approved child process receives the value." },
      ],
    },
    security: {
      label: "The boundary", title: "Trust is a boundary, not a slogan.",
      copy: "What KeyKeeper protects — and what it cannot.",
      identityPrinciple: "Instead of giving an agent a reusable token, KeyKeeper authorizes the local calling process itself.",
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
      copy: "The build script creates the macOS app and DMG locally.",
      terminalAria: "Build KeyKeeper from source", commands: "5 commands", copyCommands: "Copy", copied: "Copied",
      prereq: "Needs the Xcode command line tools (xcode-select --install). A self-built app is not notarized, so the first launch is right-click → Open.",
      steps: [
        { title: "Build and open the app", copy: "The repository script creates the app bundle and a local DMG." },
        { title: "Add a key", copy: "Use the menu bar app. Values are stored in macOS Keychain." },
        { title: "Run an approved process", copy: "keykeeper run -c openai -- your-command" },
      ],
      source: "View source on GitHub",
    },
    faq: {
      label: "Straight answers", title: "Before you trust it with a key.",
      items: [
        { q: "Can't the agent just print the key?", a: "Any process you approve receives the value and can misuse it. KeyKeeper controls which local caller is approved; it is not a sandbox." },
        { q: "Why not 1Password op run?", a: "The trust unit is different. Token-based unattended access gives an agent a reusable credential; KeyKeeper authorizes each local calling process instead." },
        { q: "Is there a master password?", a: "No. Values live in the macOS Keychain and unlock with your normal Mac login." },
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
      preview: "免费 · 开源 · macOS 14+",
      titleLines: ["让 Agent 看见", "key 的名字。"], emphasisLines: ["永远看不见", "它的值。"],
      lede: "KeyKeeper 把 API key 存进 macOS 钥匙串，只在你批准的命令运行时注入。不用 .env，也没有主密码。",
      boundaryNote: "明文不会进入聊天或项目文件；但你批准的子进程仍会收到它。",
      build: "从源码构建", boundary: "了解安全边界",
      facts: ["没有主密码", "不需要云账号，不需要 Docker", "MIT 开源许可"],
    },
    release: {
      label: "发布状态", title: "目前可从源码安装",
      copy: "签名安装包和 Homebrew 尚未发布；现在可以从源码构建。",
      link: "打开仓库快速开始",
    },
    handoff: {
      label: "工作原理", title: "说出名称，确认调用方，运行命令。",
      copy: "AI 使用凭据名称，KeyKeeper 负责密钥值。",
      steps: [
        { command: "keykeeper list", title: "找到名称", copy: "列出凭据 ID 和字段名，不包含密钥值。" },
        { command: "在 KeyKeeper 中批准", title: "确认调用方", copy: "查看请求进程，并选择授权时长。" },
        { command: "keykeeper run", title: "运行时注入", copy: "获批的子进程会收到密钥值。" },
      ],
    },
    security: {
      label: "安全边界", title: "信任是一条边界，不是一句口号。",
      copy: "KeyKeeper 能保护什么，又无法保护什么。",
      identityPrinciple: "KeyKeeper 不给 Agent 可复用的 token，而是直接授权本机调用进程。",
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
      copy: "构建脚本会在本机生成 macOS 应用和 DMG。",
      terminalAria: "从源码构建 KeyKeeper", commands: "5 条命令", copyCommands: "复制", copied: "已复制",
      prereq: "需要 Xcode 命令行工具（xcode-select --install）。自行构建的应用未经公证，首次打开请右键 → 打开。",
      steps: [
        { title: "构建并打开应用", copy: "仓库脚本会生成应用包和本地 DMG。" },
        { title: "添加一个 key", copy: "在菜单栏应用中操作，密钥值会保存到 macOS 钥匙串。" },
        { title: "运行获批进程", copy: "keykeeper run -c openai -- your-command" },
      ],
      source: "在 GitHub 查看源码",
    },
    faq: {
      label: "直接回答", title: "在把密钥交给它之前。",
      items: [
        { q: "Agent 能把 key 打出来吗？", a: "你批准的进程会收到密钥值，也可能滥用它。KeyKeeper 控制谁能获批，但它不是沙箱。" },
        { q: "为什么不用 1Password op run？", a: "信任单元不同。Token 模式把可复用凭据交给 Agent；KeyKeeper 改为逐个授权本机调用进程。" },
        { q: "需要记主密码吗？", a: "不需要。密钥存放在 macOS 钥匙串中，随正常的 Mac 登录解锁。" },
      ],
    },
    final: {
      label: "开源 · 本地优先 · 诚实的安全边界", title: "让工具使用密钥。", subtitle: "把交接权留在自己手里。",
      build: "从源码构建", review: "查看安全模型",
    },
    footer: { copy: "面向本地 AI 工作流的开源凭据访问工具。", license: "MIT 许可", security: "安全模型" },
  },
} as const;
