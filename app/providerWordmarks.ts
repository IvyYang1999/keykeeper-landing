/** Provider-published wordmark files kept locally to avoid hotlinking. */
export const providerWordmarks: Record<string, { src: string; lockup?: boolean }> = {
  // https://cdn.openai.com/brand/openai-logos.zip — OAI_OpenAI_Wordmark_Black.svg
  openai: { src: "/provider-wordmarks/openai.svg" },
  // https://moonshotai.github.io/Branding-Guide/scenarios/02-kimi-without-icon/kimi-without-icon-light.svg
  kimi: { src: "/provider-wordmarks/kimi.svg" },
  // https://brand.github.com/GitHub_Logos.zip — GitHub_Lockup_Black.svg
  github: { src: "/provider-wordmarks/github.svg", lockup: true },
  // https://github.com/deepseek-ai/DeepSeek-V2/blob/main/figures/logo.svg
  deepseek: { src: "/provider-wordmarks/deepseek.svg", lockup: true },
};
