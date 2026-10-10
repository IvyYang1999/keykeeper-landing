"use client";

import { useEffect, useState } from "react";
import { siteCopy, type Language } from "@/app/i18n";
import { getInstallPrompt } from "@/lib/install-prompt";

export function InstallPrompt({ language }: { language: Language }) {
  const [state, setState] = useState<"idle" | "copying" | "copied" | "error">("idle");
  const copy = siteCopy[language].install;
  const prompt = getInstallPrompt(language);

  useEffect(() => {
    if (state !== "copied") return;
    const timer = setTimeout(() => setState("idle"), 4000);
    return () => clearTimeout(timer);
  }, [state]);

  async function copyPrompt() {
    setState("copying");
    try {
      await navigator.clipboard.writeText(prompt);
      setState("copied");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="install-prompt">
      <button type="button" className="pill pill-light" onClick={copyPrompt} disabled={state === "copying"}>
        {state === "copying" ? copy.copying : copy.copyPrompt}
      </button>
      <p className="install-prompt-status" role="status">
        {state === "copied" ? copy.copied : state === "error" ? copy.copyError : copy.promptHint}
      </p>
      {state === "error" ? (
        <textarea className="install-prompt-text" aria-label={copy.copyPrompt} readOnly value={prompt} onFocus={(event) => event.currentTarget.select()} />
      ) : null}
    </div>
  );
}
