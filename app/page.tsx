"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { siteCopy } from "./i18n";
import type { Language } from "./i18n";

const githubUrl = "https://github.com/IvyYang1999/KeyKeeper";
const quickStartUrl = `${githubUrl}#quick-start`;
const securityUrl = `${githubUrl}#security-model`;
const buildCommands = [
  "git clone https://github.com/IvyYang1999/KeyKeeper.git",
  "cd KeyKeeper && ./scripts/build-app.sh",
  "cp -R dist/dmg/KeyKeeper.app /Applications/",
];

function currentLanguage(): Language {
  const saved = window.localStorage.getItem("keykeeper-language");
  return saved === "en" || saved === "zh" ? saved : navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function subscribeToLanguage(change: () => void) {
  window.addEventListener("storage", change);
  window.addEventListener("keykeeper-language-change", change);
  return () => {
    window.removeEventListener("storage", change);
    window.removeEventListener("keykeeper-language-change", change);
  };
}

function setLanguage(next: Language) {
  window.localStorage.setItem("keykeeper-language", next);
  window.dispatchEvent(new Event("keykeeper-language-change"));
}

function CopyButton({ text, label, copiedLabel }: { text: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="copy"
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        });
      }}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}

/// A menu-bar-window sized mock of the app. It is the only frosted-glass element on the page,
/// so the blur reads as "this is a macOS window" instead of decoration.
function AppWindow({ copy }: { copy: typeof siteCopy.en.window | typeof siteCopy.zh.window }) {
  return (
    <div className="window" role="img" aria-label={copy.aria}>
      <div className="window-bar">
        <span className="window-title">{copy.title}</span>
        <span className="window-plus" aria-hidden="true">+</span>
      </div>
      <ul className="window-rows" aria-hidden="true">
        {copy.rows.map((row) => (
          <li key={row.id}>
            <span className="row-id">{row.id}</span>
            <span className="row-field">{row.field}</span>
            <span className="row-mask">••••••••</span>
          </li>
        ))}
      </ul>
      <div className="ask" aria-hidden="true">
        <Image src="/keykeeper-app-icon.png" width={64} height={64} alt="" className="ask-icon" />
        <div className="ask-text">
          <strong>{copy.askTitle}</strong>
          <span>{copy.askBody}</span>
        </div>
        <div className="ask-actions">
          <span>{copy.deny}</span>
          <span className="ask-allow">{copy.allow}</span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const language = useSyncExternalStore<Language>(subscribeToLanguage, currentLanguage, () => "en");
  const copy = siteCopy[language];

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  return (
    <main className={language === "zh" ? "lang-zh" : undefined}>
      <nav className="nav">
        <a className="brand" href="#top">
          <Image src="/keykeeper-app-icon.png" width={64} height={64} alt="" className="brand-icon" priority />
          <span>KeyKeeper</span>
        </a>
        <div className="nav-right">
          <div className="lang" role="group" aria-label={copy.nav.language}>
            <button type="button" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>EN</button>
            <button type="button" aria-pressed={language === "zh"} onClick={() => setLanguage("zh")}>中文</button>
          </div>
          <a className="pill pill-dark" href={githubUrl} target="_blank" rel="noreferrer">{copy.nav.github}</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <Image src="/keykeeper-app-icon.png" width={1024} height={1024} alt="" className="hero-icon" priority />
        <h1>
          <span>{copy.hero.title[0]}</span>
          <span>{copy.hero.title[1]}</span>
        </h1>
        <p className="lede">{copy.hero.lede}</p>
        <div className="actions">
          <a className="pill pill-dark" href="#install">{copy.hero.primary}</a>
          <a className="pill pill-light" href={githubUrl} target="_blank" rel="noreferrer">{copy.hero.secondary}</a>
        </div>
        <p className="facts">{copy.hero.facts}</p>

        <div className="stage">
          <div className="stage-glow" aria-hidden="true" />
          <AppWindow copy={copy.window} />
        </div>
      </section>

      <section className="cards" aria-label={language === "zh" ? "三个要点" : "Three points"}>
        {copy.cards.map((card) => (
          <article className="card" key={card.title}>
            {"command" in card && card.command ? (
              <code className="card-command">
                <span className="prompt">$</span> {card.command}
              </code>
            ) : null}
            <h2>{card.title}</h2>
            <p>{card.copy}</p>
          </article>
        ))}
      </section>

      <section className="install" id="install">
        <div className="install-text">
          <h2>{copy.install.title}</h2>
          <p>{copy.install.copy}</p>
          <a href={quickStartUrl} target="_blank" rel="noreferrer" className="textlink">README ↗</a>
        </div>
        <div className="terminal">
          <div className="terminal-bar">
            <span className="dots" aria-hidden="true"><i /><i /><i /></span>
            <CopyButton text={buildCommands.join("\n")} label={copy.install.copyButton} copiedLabel={copy.install.copied} />
          </div>
          <pre><code>{buildCommands.map((line) => <span key={line}><span className="prompt">$</span> {line}{"\n"}</span>)}</code></pre>
        </div>
      </section>

      <footer className="footer">
        <span>{copy.footer.tagline}</span>
        <div>
          <a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`${githubUrl}/blob/main/LICENSE`} target="_blank" rel="noreferrer">{copy.footer.license}</a>
          <a href={securityUrl} target="_blank" rel="noreferrer">{copy.footer.security}</a>
        </div>
      </footer>
    </main>
  );
}
