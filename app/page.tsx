"use client";

import { useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { siteCopy } from "./i18n";
import { providerPaths, providers } from "./providerMarks";
import providerSummary from "../content/providers/_summary.json";
import providerWall from "./providerWall.json";

type WallMark = { id: string; name: string; brand: string; template: boolean; viewBox: string; svg?: string; png?: string };

/** One brand tile: the provider's own artwork on a white app-icon square, in its own colour. */
function WallTile({ mark }: { mark: WallMark }) {
  return (
    <span className="wall-tile">
      {mark.png ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`data:image/png;base64,${mark.png}`} alt="" width={28} height={28} />
      ) : (
        <svg viewBox={mark.viewBox} width={26} height={26} aria-hidden="true"
          fill={mark.template ? `#${mark.brand}` : undefined}
          dangerouslySetInnerHTML={{ __html: mark.svg ?? "" }} />
      )}
    </span>
  );
}
import type { Language } from "./i18n";

const githubUrl = "https://github.com/IvyYang1999/KeyKeeper";
const downloadUrl = `${githubUrl}/releases/download/v0.3.5/KeyKeeper-0.3.5.dmg`;
const quickStartUrl = `${githubUrl}#quick-start`;

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

function ProviderMark({ id, letter, size = 22 }: { id: string; letter?: string; size?: number }) {
  const d = providerPaths[id];
  if (!d) {
    return <span className="mark mark-letter" style={{ width: size, height: size, fontSize: size * 0.55 }} aria-hidden="true">{letter ?? id[0].toUpperCase()}</span>;
  }
  return (
    <svg className="mark" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} fill="currentColor" />
    </svg>
  );
}

/// The approval window as it really looks: who wants what, what it says, KeyKeeper's own line,
/// three answers. The only frosted-glass element on the page.
function ApprovalWindow({ copy }: { copy: typeof siteCopy.en.prompt | typeof siteCopy.zh.prompt }) {
  return (
    <div className="window" role="img" aria-label={copy.aria}>
      <div className="win-head">
        <Image src="/keykeeper-app-icon.png" width={64} height={64} alt="" className="win-icon" />
        <div>
          <strong>{copy.title}</strong>
          <span>{copy.sub}</span>
        </div>
      </div>
      <div className="win-says" aria-hidden="true">
        <div className="win-says-label">
          <span>{copy.saysLabel}</span>
          <em>{copy.unverified}</em>
        </div>
        <p>{copy.says}</p>
        <code>{copy.command}</code>
      </div>
      <div className="win-verdict" aria-hidden="true">
        <b>{copy.verdictLabel}</b>
        <span>{copy.verdict}</span>
      </div>
      <div className="win-actions" aria-hidden="true">
        <span className="win-deny">{copy.deny}</span>
        <span className="win-spacer" />
        <span>{copy.once}</span>
        <span className="win-primary">{copy.run}</span>
        <span>{copy.always}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const language = useSyncExternalStore<Language>(subscribeToLanguage, currentLanguage, () => "en");
  const copy = siteCopy[language];
  const docsUrl = language === "zh" ? "/zh/docs" : "/docs";

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
          <a className="pill pill-light" href={docsUrl}>{copy.nav.docs}</a>
          <a className="pill pill-dark" href={githubUrl} target="_blank" rel="noreferrer">{copy.nav.github}</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <Image src="/keykeeper-app-icon.png" width={1024} height={1024} alt="" className="hero-icon" priority />
        <p className="eyebrow">{copy.hero.eyebrow}</p>
        <h1>
          <span>{copy.hero.title[0]}</span>
          <span>{copy.hero.title[1]}</span>
        </h1>
        <p className="lede">{copy.hero.lede}</p>
        <div className="actions">
          <a className="pill pill-dark" href={downloadUrl}>{copy.hero.primary}</a>
          <a className="pill pill-light" href={docsUrl}>{copy.hero.secondary}</a>
        </div>
        <p className="facts">{copy.hero.facts}</p>

        <div className="stage">
          <div className="stage-glow" aria-hidden="true" />
          <ApprovalWindow copy={copy.prompt} />
        </div>
      </section>

      <section className="story" aria-label={copy.story.title}>
        <h2 className="section-title">{copy.story.title}</h2>
        <div className="steps">
          {copy.story.steps.map((step) => (
            <article className="step" key={step.n}>
              <div className="step-visual" aria-hidden="true">
                {step.visual === "chat" && "chat" in step ? (
                  <div className="bubble">{step.chat}</div>
                ) : null}
                {step.visual === "save" && "save" in step ? (
                  <div className="mini-save">
                    <div className="mini-row"><span>{step.save.saveAs}</span><code>{step.save.target}</code></div>
                    <div className="mini-row"><span>{step.save.provider}</span><b className="mini-provider"><ProviderMark id="stripe" size={16} />{step.save.providerName}</b></div>
                    <div className="mini-note">{step.save.note}</div>
                    <div className="mini-button">{step.save.button}</div>
                  </div>
                ) : null}
                {step.visual === "terminal" && "terminal" in step ? (
                  <div className="mini-terminal">
                    {step.terminal.map((line, i) => <div key={line} className={i === 0 ? "" : "ok"}>{line}</div>)}
                  </div>
                ) : null}
              </div>
              <div className="step-num">{step.n}</div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
        <p className="story-aside"><code>{copy.story.asideCommand}</code><span>{copy.story.aside}</span></p>
      </section>

      <section className="providers" aria-label={copy.providers.title}>
        <h2 className="section-title">{copy.providers.title}</h2>
        <p className="section-copy">{copy.providers.copy.replace("{n}", String(providerSummary.total))}</p>
        <ul className="provider-cats" aria-label="Categories">
          {Object.entries(providerSummary.categories).map(([key, count]) => (
            <li key={key}><a href={`${docsUrl}/providers`}>{copy.providers.categories[key as keyof typeof copy.providers.categories]} <b>{count}</b></a></li>
          ))}
        </ul>
        <ul className="wall">
          {(providerWall as WallMark[]).map((mark) => (
            <li key={mark.id}>
              <a href={`${docsUrl}/providers/${mark.id}`} title={mark.name} aria-label={mark.name}>
                <WallTile mark={mark} />
              </a>
            </li>
          ))}
        </ul>
        <div className="wall-cmds" aria-hidden="true">
          {copy.providers.commands.map(([command, result]) => (
            <div key={command}><code>$ {command}</code><span>{result}</span></div>
          ))}
        </div>
        <a className="textlink" href={`${docsUrl}/providers`}>{copy.providers.more.replace("{n}", String(providerSummary.total))} →</a>
      </section>

      <section className="promises" aria-label={copy.promises.title}>
        <h2 className="section-title">{copy.promises.title}</h2>
        <ul>
          {copy.promises.items.map(([head, tail]) => (
            <li key={head}>
              <span className="check" aria-hidden="true">✓</span>
              <div><strong>{head}</strong> <span>{tail}</span></div>
            </li>
          ))}
        </ul>
      </section>

      <section className="install" id="install">
        <h2>{copy.install.title}</h2>
        <p>{copy.install.copy}</p>
        <div className="actions">
          <a className="pill pill-dark" href={downloadUrl}>{copy.hero.primary}</a>
        </div>
        <p className="facts">{copy.hero.facts}</p>
        <a href={quickStartUrl} target="_blank" rel="noreferrer" className="textlink">{copy.install.build} ↗</a>
      </section>

      <footer className="footer">
        <p className="footer-beta">{copy.footer.beta} <a href={`${docsUrl}/security`}>{copy.footer.security} →</a></p>
        <span>{copy.footer.tagline}</span>
        <div>
          <a href={docsUrl}>{copy.nav.docs}</a>
          <a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`${githubUrl}/blob/main/LICENSE`} target="_blank" rel="noreferrer">{copy.footer.license}</a>
          <a href={`${docsUrl}/security`}>{copy.footer.security}</a>
          <a href="mailto:support@keykeeper.dev">{copy.footer.support}</a>
        </div>
      </footer>
    </main>
  );
}
