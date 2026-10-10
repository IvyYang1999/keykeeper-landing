import type { Language } from "@/app/i18n";
import download from "./download.json";

export function getInstallPrompt(language: Language): string {
  if (language === "zh") return `请在我的 Mac 上安装并配置 KeyKeeper，供当前 Agent 使用。只按下面的公开来源操作：

1. 阅读 https://keykeeper.dev/zh/docs/getting-started 和 https://keykeeper.dev/zh/docs/agents。先确认是 Apple Silicon、macOS 14 或更新，并检查是否已安装；保留已有凭据和配置。
2. 官网下载区：https://keykeeper.dev/#install。复制此 Prompt 时的公开 DMG 地址是 ${download.url}。执行前重新核对官网当前下载链接及其官方 GitHub Release，使用最新已发布稳定版的真实 DMG 链接；不要猜测版本号、文件名或下载地址。无法确认就停下来说明。
3. 下载并挂载 DMG，把 KeyKeeper.app 安装到「应用程序」后打开。按文档使用已签名、公证的应用，不绕过 macOS 安全检查；覆盖已有安装前先询问我。
4. 在 App 的「设置 → 命令行」安装 keykeeper CLI。需要界面操作、系统授权或你的工具无法完成时，只在该步骤让我接手，然后继续。
5. 按 Agent 文档读取并为当前 Agent 配置公开 skill：https://github.com/IvyYang1999/KeyKeeper/blob/main/skill/keykeeper.md。遵循当前 Agent 的 skill 安装方式，保留已有指令；之后 API key 使用 KeyKeeper。
6. 运行 command -v keykeeper、keykeeper --help 和 keykeeper status，验证 CLI 可用、App 已运行并报告结果；未完成的步骤要明确列出。

本次只安装和配置工具，不创建或导入任何凭据，不读取剪贴板或现有密钥，不把密码、API key、token 或 .env 内容写入聊天、命令、日志或文件。`;

  return `Install and configure KeyKeeper on my Mac for the current agent. Use only these public sources:

1. Read https://keykeeper.dev/docs/getting-started and https://keykeeper.dev/docs/agents. Confirm Apple Silicon and macOS 14 or later, and check for an existing installation; preserve existing credentials and settings.
2. Official download section: https://keykeeper.dev/#install. The public DMG URL when this prompt was copied is ${download.url}. Before downloading, recheck the website's current link and its official GitHub Release; use the actual DMG link for the latest published stable release. Never guess a version, filename or URL. Stop and explain if you cannot verify it.
3. Download and mount the DMG, install KeyKeeper.app in Applications, then open it. Follow the docs for the signed, notarized app without bypassing macOS security checks; ask me before replacing an existing installation.
4. Install the keykeeper CLI in the app under Settings → Command line. If a GUI step, system approval or tool limitation needs my help, pause only at that step, then continue.
5. Follow the agent docs to read and configure the public skill for the current agent: https://github.com/IvyYang1999/KeyKeeper/blob/main/skill/keykeeper.md. Use this agent's supported skill installation method and preserve existing instructions; use KeyKeeper for API keys from then on.
6. Run command -v keykeeper, keykeeper --help and keykeeper status to verify the CLI is available and the app is running. Report the results and explicitly list any unfinished steps.

This task only installs and configures the tool. Do not create or import credentials, read the clipboard or existing secrets, or put passwords, API keys, tokens or .env contents into chat, commands, logs or files.`;
}
