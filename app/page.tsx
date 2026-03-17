"use client";

import { useState, useEffect } from "react";

/* ─── Terminal ─── */
function Terminal({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="terminal-window w-full">
      <div className="terminal-titlebar">
        <div className="terminal-dot bg-[#ff5f57]" />
        <div className="terminal-dot bg-[#febc2e]" />
        <div className="terminal-dot bg-[#28c840]" />
        {title && <span className="ml-2 text-zinc-500 text-xs font-mono">{title}</span>}
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">{children}</div>
    </div>
  );
}

/* ─── Feature Card ─── */
function Feature({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="card-hover bg-white/[0.02] border border-white/[0.06] rounded-xl p-6">
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="text-white text-base font-semibold mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

/* ─── FAQ Item ─── */
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="text-white text-base font-medium pr-4">{q}</span>
        <span className="text-zinc-500 text-xl shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="text-zinc-400 text-sm leading-relaxed pb-5">{a}</p>}
    </div>
  );
}

/* ─── Typing ─── */
function useTyping(text: string, speed = 40, delay = 500) {
  const [shown, setShown] = useState("");
  const [go, setGo] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t); }, [delay]);
  useEffect(() => {
    if (!go || shown.length >= text.length) return;
    const t = setTimeout(() => setShown(text.slice(0, shown.length + 1)), speed);
    return () => clearTimeout(t);
  }, [shown, text, speed, go]);
  return shown;
}

/* ─── Page ─── */
export default function Home() {
  const tagline = useTyping("Your API keys are safe. Even from AI.");

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* ── Nav ── */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-zinc-300">
            <span className="text-lg">🔐</span> KeyKeeper
          </span>
          <div className="flex items-center gap-5">
            <a href="#features" className="text-zinc-500 hover:text-white transition-colors text-sm hidden sm:block">Features</a>
            <a href="#faq" className="text-zinc-500 hover:text-white transition-colors text-sm hidden sm:block">FAQ</a>
            <a href="https://github.com/IvyYang1999/KeyKeeper" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-[1.1] mb-6 tracking-tight">
            {tagline}
            <span className="cursor-blink text-emerald-400">_</span>
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A macOS menu bar app that manages API keys for AI coding tools.
            AI knows key names, never touches key values.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="https://github.com/IvyYang1999/KeyKeeper/releases"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-black font-semibold px-8 py-3.5 rounded-lg hover:bg-zinc-200 transition-colors text-base"
            >
              Download for macOS
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </a>
            <a
              href="https://github.com/IvyYang1999/KeyKeeper"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-white/20 hover:border-white/40 text-zinc-200 font-medium px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              View on GitHub
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>

          <p className="text-zinc-600 text-sm">
            Built on macOS Keychain &middot; Open source &middot; Works with Claude Code, Cursor, and any AI coding tool
          </p>
        </div>
      </section>

      {/* ── The Problem (visible on first scroll) ── */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-zinc-500 text-sm uppercase tracking-widest mb-8">The problem</p>
          <Terminal title="bad-idea.sh">
            <div className="space-y-2">
              <p className="text-zinc-600"># Don&apos;t do this</p>
              <p><span className="text-emerald-400">you:</span> Here&apos;s my Stripe key: <span className="text-red-400">sk_live_51H7...a3xF</span></p>
              <p><span className="text-emerald-400">ai:</span> Got it! Let me use that in your code...</p>
              <p className="text-zinc-600 pt-2"># Your key is now in chat logs, model context, and whoever</p>
              <p className="text-zinc-600"># has access to your session</p>
            </div>
          </Terminal>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-6 dot-grid">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">How It Works</h2>
          <p className="text-zinc-500 text-center mb-16 max-w-lg mx-auto">Three steps. No secrets in your chat. Ever.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {[
              { n: "01", title: "Store", desc: "Save API keys via the menu bar app. Values go into macOS Keychain — encrypted, hardware-backed." },
              { n: "02", title: "Authorize", desc: "Touch ID or password. Once per session, not every command. You control the scope and duration." },
              { n: "03", title: "Inject", desc: "Keys become environment variables in your subprocess. Never written to disk, never in shell history." },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-zinc-400 font-mono text-sm">{step.n}</span>
                </div>
                <h3 className="text-white font-semibold text-xl mb-3">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <Terminal title="terminal">
              <p><span className="text-emerald-400">$</span> keykeeper run -c stripe -- python app.py</p>
              <p className="text-zinc-600 mt-1"># STRIPE_API_KEY is in the process env</p>
              <p className="text-zinc-600"># Your code: os.environ[&quot;STRIPE_API_KEY&quot;]</p>
              <p className="text-zinc-600"># The key never appears in terminal, chat, or logs</p>
            </Terminal>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">Features</h2>
          <p className="text-zinc-500 text-center mb-16 max-w-lg mx-auto">Everything you need to keep secrets out of AI context.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Feature icon="🔐" title="macOS Keychain" desc="Same vault that protects your passwords and certificates. Hardware-backed encryption by Apple." />
            <Feature icon="🛡️" title="Stdout Redaction" desc="Secrets in process output are auto-replaced with [REDACTED]. Architectural safety net — not a rule for AI to follow." />
            <Feature icon="🔑" title="Session-Based Auth" desc="Touch ID once per session. Not every command. You see what you're authorizing and for how long." />
            <Feature icon="📦" title="Process-Level Injection" desc="keykeeper run injects secrets as env vars into a subprocess. They never touch disk or shell history." />
            <Feature icon="🤖" title="AI Tool Integration" desc="Works as a Claude Code skill. AI requests keys by name, KeyKeeper handles the rest. AI never sees values." />
            <Feature icon="✨" title="Menu Bar App" desc="Always one click away. Add keys, manage sessions, revoke access — without leaving your workflow." />
          </div>
        </div>
      </section>

      {/* ── Terminal Demo ── */}
      <section className="py-24 px-6 dot-grid">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">See It In Action</h2>
          <p className="text-zinc-500 text-center mb-12">Real commands, real output.</p>

          <Terminal title="~ — zsh">
            <div className="space-y-3 text-[13px]">
              <div>
                <p><span className="text-emerald-400">$</span> keykeeper list</p>
                <p className="text-zinc-300"><span className="text-amber-400">stripe</span>{"      "}STRIPE_API_KEY{"     "}<span className="text-zinc-600">2 keys</span></p>
                <p className="text-zinc-300"><span className="text-amber-400">openai</span>{"      "}OPENAI_API_KEY{"     "}<span className="text-zinc-600">1 key</span></p>
              </div>
              <div>
                <p><span className="text-emerald-400">$</span> keykeeper run -c stripe -- python app.py</p>
                <p className="text-zinc-500">🔐 Touch ID authorized for this session</p>
                <p className="text-zinc-300">Server running on http://localhost:3000</p>
                <p className="text-zinc-300">Connected to Stripe API ✓</p>
              </div>
              <div>
                <p><span className="text-emerald-400">$</span> keykeeper run -c stripe -- env | grep STRIPE</p>
                <p className="text-zinc-300">STRIPE_API_KEY=<span className="text-amber-400 font-semibold">[REDACTED]</span></p>
              </div>
              <div><p><span className="text-emerald-400">$</span> <span className="cursor-blink">▋</span></p></div>
            </div>
          </Terminal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">FAQ</h2>
          <FAQ q="How is this different from .env files?" a="Env files sit on disk in plaintext — anyone with file access can read them, and they often end up in git history. KeyKeeper stores secrets in macOS Keychain (hardware-encrypted) and injects them into processes at runtime. Nothing is written to disk." />
          <FAQ q="Does the AI ever see my actual key values?" a="No. KeyKeeper's architecture makes this impossible: stdout redaction automatically replaces any secret that appears in process output with [REDACTED]. Even if code prints the key, it's filtered before reaching the AI's context." />
          <FAQ q="What AI coding tools does it work with?" a="Any tool that runs commands in a terminal: Claude Code, Cursor, Windsurf, Copilot Workspace, etc. KeyKeeper also ships a Claude Code skill for deeper integration." />
          <FAQ q="Is it free?" a="Yes, fully open source under MIT license. Free forever." />
          <FAQ q="Does it work without Touch ID?" a="Yes. On Macs without Touch ID, it falls back to your login password for authentication." />
          <FAQ q="Can I use it for non-AI workflows?" a="Absolutely. keykeeper run works with any command — it's a general-purpose secret injector. Think of it as a lightweight alternative to 1Password CLI or Vault for local development." />
        </div>
      </section>

      {/* ── Install / CTA ── */}
      <section className="py-24 px-6 dot-grid">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get Started</h2>
          <p className="text-zinc-500 mb-10">Install in seconds. Free and open source.</p>

          <div className="max-w-md mx-auto mb-6">
            <Terminal title="terminal">
              <p><span className="text-emerald-400">$</span> brew install keykeeper</p>
            </Terminal>
          </div>

          <p className="text-zinc-600 text-xs mb-4">Or build from source:</p>

          <div className="max-w-md mx-auto mb-12">
            <Terminal title="terminal">
              <p><span className="text-emerald-400">$</span> git clone https://github.com/IvyYang1999/KeyKeeper.git</p>
              <p><span className="text-emerald-400">$</span> cd KeyKeeper &amp;&amp; swift build</p>
            </Terminal>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/IvyYang1999/KeyKeeper/releases"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-black font-semibold px-8 py-3.5 rounded-lg hover:bg-zinc-200 transition-colors text-base"
            >
              Download for macOS
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </a>
            <a
              href="https://github.com/IvyYang1999/KeyKeeper"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-white/20 hover:border-white/40 text-zinc-200 font-medium px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              View on GitHub
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-zinc-600 text-xs tracking-widest uppercase mb-3 font-medium">
            🔐 Built with obsessive security in mind
          </p>
          <p className="text-zinc-600 text-xs">
            AI knows key names, never touches key values.
          </p>
        </div>
      </footer>
    </div>
  );
}
