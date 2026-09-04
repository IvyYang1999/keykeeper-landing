"use client";

import { useEffect, useSyncExternalStore } from "react";
import { siteCopy } from "./i18n";
import type { Language } from "./i18n";

const githubUrl = "https://github.com/IvyYang1999/KeyKeeper";
const quickStartUrl = `${githubUrl}#quick-start`;
const securityUrl = `${githubUrl}#security-model`;

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

function LogoMark() {
  return <svg aria-hidden="true" viewBox="0 0 32 32" className="logo-mark"><path d="M16 2.8 27 7v8.2c0 7-4.4 11.8-11 14-6.6-2.2-11-7-11-14V7l11-4.2Z" /><circle cx="13.2" cy="15" r="3.2" /><path d="M16.4 15H22m-2 0v2.5" /></svg>;
}

function ArrowIcon() {
  return <svg aria-hidden="true" viewBox="0 0 16 16" className="arrow-icon"><path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" /></svg>;
}

function CheckIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20"><path d="m4 10.5 3.5 3.5L16 5.5" /></svg>;
}

function BoundaryIcon({ type }: { type: "check" | "limit" }) {
  return type === "check" ? <CheckIcon /> : <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M10 3v8m0 4.5v.5" /><circle cx="10" cy="10" r="8" /></svg>;
}

function AccessReceipt({ copy }: { copy: typeof siteCopy.en.receipt | typeof siteCopy.zh.receipt }) {
  return (
    <div className="receipt-wrap">
      <div className="receipt" aria-label={copy.aria}>
        <div className="receipt-bar"><div className="window-dots" aria-hidden="true"><i /><i /><i /></div><span>{copy.bar}</span><span className="receipt-status">{copy.waiting}</span></div>
        <div className="receipt-body">
          <div className="receipt-heading"><div><p className="eyebrow">{copy.eyebrow}</p><h2>{copy.title}</h2></div><span className="withheld-stamp">{copy.withheld}</span></div>
          <dl className="receipt-grid">
            <div><dt>{copy.credential}</dt><dd>stripe-production</dd></div><div><dt>{copy.key}</dt><dd>STRIPE_API_KEY</dd></div>
            <div><dt>{copy.requestedBy}</dt><dd>python · app.py</dd></div><div><dt>{copy.scope}</dt><dd>{copy.session}</dd></div>
          </dl>
          <div className="context-route" aria-label={copy.routeAria}>
            <div><span>{copy.aiTool}</span><strong>{copy.nameOnly}</strong></div><span className="route-arrow">→</span>
            <div className="route-active"><span>KeyKeeper</span><strong>{copy.approval}</strong></div><span className="route-arrow">→</span>
            <div><span>{copy.process}</span><strong>{copy.injected}</strong></div>
          </div>
          <div className="receipt-actions" aria-hidden="true"><span>{copy.deny}</span><strong>{copy.authorize}</strong></div>
        </div>
      </div>
      <p className="receipt-caption"><span>Fig. 01</span> {copy.caption}</p>
    </div>
  );
}

function SectionIntro({ index, label, title, copy }: { index: string; label: string; title: string; copy: string }) {
  return <header className="section-intro"><p className="section-index">{index} / {label}</p><h2>{title}</h2><p>{copy}</p></header>;
}

export default function Home() {
  const language = useSyncExternalStore<Language>(subscribeToLanguage, currentLanguage, () => "en");
  const copy = siteCopy[language];

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);

  function chooseLanguage(next: Language) {
    window.localStorage.setItem("keykeeper-language", next);
    window.dispatchEvent(new Event("keykeeper-language-change"));
  }

  return (
    <main className={`lang-${language}`}>
      <nav className="site-nav" aria-label={language === "zh" ? "主导航" : "Primary navigation"}>
        <div className="nav-inner">
          <a className="brand" href="#top" aria-label="KeyKeeper home"><LogoMark /><span>KeyKeeper</span></a>
          <div className="nav-links">
            <a href="#how-it-works">{copy.nav.how}</a><a href="#security">{copy.nav.security}</a><a href="#quick-start">{copy.nav.quick}</a>
            <div className="language-switch" role="group" aria-label={copy.nav.language}>
              <button className={language === "en" ? "active" : ""} onClick={() => chooseLanguage("en")} aria-pressed={language === "en"}>EN</button>
              <span aria-hidden="true">/</span>
              <button className={language === "zh" ? "active" : ""} onClick={() => chooseLanguage("zh")} aria-pressed={language === "zh"}>中文</button>
            </div>
            <a className="nav-github" href={githubUrl} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="preview-pill"><span /> {copy.hero.preview}</div><p className="kicker">{copy.hero.kicker}</p>
          <h1>{copy.hero.title}<br /><em>{copy.hero.emphasis}</em></h1><p className="hero-lede">{copy.hero.lede}</p>
          <div className="hero-actions"><a className="button button-primary" href="#quick-start">{copy.hero.build} <ArrowIcon /></a><a className="button button-secondary" href="#security">{copy.hero.boundary}</a></div>
          <ul className="trust-list" aria-label={language === "zh" ? "项目事实" : "Project facts"}>{copy.hero.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul>
        </div>
        <AccessReceipt copy={copy.receipt} />
      </section>

      <aside className="release-note" aria-label={copy.release.label}>
        <div><span>{copy.release.label}</span><strong>{copy.release.title}</strong></div><p>{copy.release.copy}</p>
        <a href={quickStartUrl} target="_blank" rel="noreferrer">{copy.release.link} <span aria-hidden="true">↗</span></a>
      </aside>

      <section className="content-section" id="how-it-works">
        <SectionIntro index="01" label={copy.handoff.label} title={copy.handoff.title} copy={copy.handoff.copy} />
        <div className="process-grid">{copy.handoff.steps.map((step, index) => <article className="process-card" key={step.title}><span className="process-number">0{index + 1}</span><code>{step.command}</code><h3>{step.title}</h3><p>{step.copy}</p></article>)}</div>
        <div className="visibility-demo">
          <div><p className="demo-label">{copy.handoff.conversation}</p><code><span>$</span> keykeeper run -c stripe -- python app.py</code></div>
          <div className="value-panel"><p className="demo-label">{copy.handoff.receives}</p><code>STRIPE_API_KEY=<strong>[injected]</strong></code></div>
          <p className="demo-footnote">{copy.handoff.footnote}</p>
        </div>
      </section>

      <section className="security-section" id="security"><div className="security-inner">
        <SectionIntro index="02" label={copy.security.label} title={copy.security.title} copy={copy.security.copy} />
        <div className="boundary-grid">
          <article className="boundary-card boundary-protects"><p className="boundary-label">{copy.security.protectsLabel}</p><ul>{copy.security.protections.map((item) => <li key={item}><BoundaryIcon type="check" /><span>{item}</span></li>)}</ul></article>
          <article className="boundary-card boundary-limits"><p className="boundary-label">{copy.security.limitsLabel}</p><ul>{copy.security.limits.map((item) => <li key={item}><BoundaryIcon type="limit" /><span>{item}</span></li>)}</ul></article>
        </div>
        <div className="security-callout"><div><span className="callout-mark">{"//"}</span><p><strong>{copy.security.warningLead}</strong> {copy.security.warningTail}</p></div><a href={securityUrl} target="_blank" rel="noreferrer">{copy.security.link} <span aria-hidden="true">↗</span></a></div>
      </div></section>

      <section className="content-section quick-start" id="quick-start">
        <SectionIntro index="03" label={copy.quick.label} title={copy.quick.title} copy={copy.quick.copy} />
        <div className="quick-start-grid">
          <div className="terminal" aria-label={copy.quick.terminalAria}><div className="terminal-bar"><span>Terminal</span><span>{copy.quick.commands}</span></div><pre><code><span className="prompt">$</span> git clone https://github.com/IvyYang1999/KeyKeeper.git{"\n"}<span className="prompt">$</span> cd KeyKeeper{"\n"}<span className="prompt">$</span> ./scripts/build-app.sh{"\n"}<span className="prompt">$</span> cp -R dist/dmg/KeyKeeper.app /Applications/{"\n"}<span className="prompt">$</span> open /Applications/KeyKeeper.app</code></pre></div>
          <div className="start-steps">
            {copy.quick.steps.map((step, index) => <div key={step.title}><span>{index + 1}</span><p><strong>{step.title}</strong>{index === 2 ? <code>{step.copy}</code> : step.copy}</p></div>)}
            <a className="button button-primary" href={githubUrl} target="_blank" rel="noreferrer">{copy.quick.source} <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-heading"><p className="section-index">04 / {copy.faq.label}</p><h2>{copy.faq.title}</h2></div>
        <div className="faq-list">{copy.faq.items.map((item) => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div>
      </section>

      <section className="final-cta"><p className="section-index">{copy.final.label}</p><h2>{copy.final.title}<br />{copy.final.subtitle}</h2><div className="hero-actions"><a className="button button-primary" href={quickStartUrl} target="_blank" rel="noreferrer">{copy.final.build} <ArrowIcon /></a><a className="button button-secondary" href={securityUrl} target="_blank" rel="noreferrer">{copy.final.review}</a></div></section>

      <footer className="site-footer"><a className="brand" href="#top"><LogoMark /><span>KeyKeeper</span></a><p>{copy.footer.copy}</p><div><a href={githubUrl} target="_blank" rel="noreferrer">GitHub</a><a href={`${githubUrl}/blob/main/LICENSE`} target="_blank" rel="noreferrer">{copy.footer.license}</a><a href={securityUrl} target="_blank" rel="noreferrer">{copy.footer.security}</a></div></footer>
    </main>
  );
}
