"use client";

import { useState, useEffect } from "react";

/* ─── Terminal Window ─── */
function Terminal({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="terminal-window w-full">
      <div className="terminal-titlebar">
        <div className="terminal-dot bg-[#ff5f57]" />
        <div className="terminal-dot bg-[#febc2e]" />
        <div className="terminal-dot bg-[#28c840]" />
        {title && (
          <span className="ml-2 text-zinc-500 text-xs font-mono">{title}</span>
        )}
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

/* ─── Feature Card ─── */
function Feature({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="card-hover bg-white/[0.02] border border-white/[0.06] rounded-lg p-5">
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="text-white text-base font-semibold mb-1.5">{title}</h3>
      <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

/* ─── Typing Effect ─── */
function useTyping(text: string, speed = 40, delay = 600) {
  const [shown, setShown] = useState("");
  const [go, setGo] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
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
          <span
            className="text-[11px] tracking-[0.2em] text-zinc-400"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            KEYKEEPER
          </span>
          <a
            href="https://github.com/IvyYang1999/KeyKeeper"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </nav>

      {/* ── Hero (compact) ── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-2xl sm:text-3xl md:text-4xl text-white font-medium leading-tight mb-4">
            {tagline}
            <span className="cursor-blink text-emerald-400">_</span>
          </p>
          <p className="text-zinc-500 text-base sm:text-lg max-w-lg mx-auto mb-10">
            A macOS menu bar app that manages API keys for AI coding tools.
            AI knows key names, never touches key values.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/IvyYang1999/KeyKeeper/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-black font-medium px-8 py-3.5 rounded-lg hover:bg-zinc-200 transition-colors text-base"
            >
              Download for macOS
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
            <a
              href="https://github.com/IvyYang1999/KeyKeeper"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-white/20 hover:border-white/40 text-zinc-200 px-8 py-3.5 rounded-lg transition-colors text-base"
            >
              View on GitHub
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>

          {/* Trust signal */}
          <p className="mt-8 text-zinc-600 text-xs">
            Built on macOS Keychain · Secrets never leave Apple&apos;s encryption · Open source
          </p>
        </div>
      </section>

      {/* ── Problem — move it up so it's visible on first scroll ── */}
      <section className="pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <Terminal title="bad-idea.sh">
            <div className="space-y-2">
              <p className="text-zinc-600"># Don&apos;t do this</p>
              <p>
                <span className="text-emerald-400">you:</span>{" "}
                Here&apos;s my Stripe key:{" "}
                <span className="text-red-400">sk_live_51H7...a3xF</span>
              </p>
              <p>
                <span className="text-emerald-400">ai:</span>{" "}
                Got it! Let me use that in your code...
              </p>
              <p className="text-zinc-600 pt-2">
                # Your key is now in chat logs, model context, and whoever
              </p>
              <p className="text-zinc-600">
                # has access to your session
              </p>
            </div>
          </Terminal>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-6 dot-grid">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-sm tracking-[0.3em] text-zinc-400 text-center mb-12 uppercase"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {[
              {
                n: "01",
                title: "Store",
                desc: "Save API keys via the menu bar app. Values go into macOS Keychain — encrypted, hardware-backed.",
              },
              {
                n: "02",
                title: "Authorize",
                desc: "Touch ID or password. Once per session, not every command. You control the scope and duration.",
              },
              {
                n: "03",
                title: "Inject",
                desc: "Keys become environment variables in your subprocess. Never written to disk, never in shell history.",
              },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="text-zinc-600 font-mono text-xs mb-3">{step.n}</div>
                <h3 className="text-white font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <Terminal title="terminal">
              <p>
                <span className="text-emerald-400">$</span>{" "}
                keykeeper run -c stripe -- python app.py
              </p>
              <p className="text-zinc-600 mt-1">
                # STRIPE_API_KEY is in the process env
              </p>
              <p className="text-zinc-600">
                # Your code: os.environ[&quot;STRIPE_API_KEY&quot;]
              </p>
              <p className="text-zinc-600">
                # The key never appears in terminal, chat, or logs
              </p>
            </Terminal>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-sm tracking-[0.3em] text-zinc-400 text-center mb-12 uppercase"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Feature
              icon="🔐"
              title="macOS Keychain"
              desc="Same vault that protects your passwords and certificates. Hardware-backed encryption."
            />
            <Feature
              icon="🛡️"
              title="Stdout Redaction"
              desc="Secrets in process output are auto-replaced with [REDACTED]. Architectural safety net."
            />
            <Feature
              icon="🔑"
              title="Session Auth"
              desc="Touch ID once per session. Not every command. Secure without the friction."
            />
            <Feature
              icon="📦"
              title="Process Injection"
              desc="keykeeper run injects secrets as env vars. They never touch disk or shell history."
            />
            <Feature
              icon="🤖"
              title="Claude Code Skill"
              desc="AI requests keys by name. KeyKeeper handles the rest. AI never sees actual values."
            />
            <Feature
              icon="✨"
              title="Menu Bar App"
              desc="Always one click away. Manage keys, view sessions, revoke access."
            />
          </div>
        </div>
      </section>

      {/* ── Demo ── */}
      <section className="py-24 px-6 dot-grid">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-sm tracking-[0.3em] text-zinc-400 text-center mb-12 uppercase"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            See It In Action
          </h2>

          <Terminal title="~ — zsh">
            <div className="space-y-3 text-[13px]">
              <div>
                <p><span className="text-emerald-400">$</span> keykeeper list</p>
                <p className="text-zinc-300">
                  <span className="text-amber-400">stripe</span>{"      "}STRIPE_API_KEY{"     "}
                  <span className="text-zinc-600">2 keys</span>
                </p>
                <p className="text-zinc-300">
                  <span className="text-amber-400">openai</span>{"      "}OPENAI_API_KEY{"     "}
                  <span className="text-zinc-600">1 key</span>
                </p>
              </div>

              <div>
                <p><span className="text-emerald-400">$</span> keykeeper run -c stripe -- python app.py</p>
                <p className="text-zinc-500">🔐 Touch ID authorized for this session</p>
                <p className="text-zinc-300">Server running on http://localhost:3000</p>
                <p className="text-zinc-300">Connected to Stripe API ✓</p>
              </div>

              <div>
                <p><span className="text-emerald-400">$</span> keykeeper run -c stripe -- env | grep STRIPE</p>
                <p className="text-zinc-300">
                  STRIPE_API_KEY=<span className="text-amber-400 font-semibold">[REDACTED]</span>
                </p>
              </div>

              <div>
                <p>
                  <span className="text-emerald-400">$</span>{" "}
                  <span className="cursor-blink">▋</span>
                </p>
              </div>
            </div>
          </Terminal>
        </div>
      </section>

      {/* ── Install ── */}
      <section id="install" className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-sm tracking-[0.3em] text-zinc-400 text-center mb-8 uppercase"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            Install
          </h2>

          <div className="max-w-md mx-auto mb-6">
            <Terminal title="terminal">
              <p><span className="text-emerald-400">$</span> brew install keykeeper</p>
            </Terminal>
          </div>

          <p className="text-zinc-600 text-xs mb-4">Or build from source:</p>

          <div className="max-w-md mx-auto mb-10">
            <Terminal title="terminal">
              <p><span className="text-emerald-400">$</span> git clone https://github.com/IvyYang1999/KeyKeeper.git</p>
              <p><span className="text-emerald-400">$</span> cd KeyKeeper &amp;&amp; swift build</p>
            </Terminal>
          </div>

          <a
            href="https://github.com/IvyYang1999/KeyKeeper"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-mono"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            IvyYang1999/KeyKeeper
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 px-6 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-zinc-600 text-[9px] tracking-[0.2em] mb-3"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            BUILT WITH OBSESSIVE SECURITY IN MIND
          </p>
          <p className="text-zinc-600 text-xs">
            AI knows key names, never touches key values.
          </p>
        </div>
      </footer>
    </div>
  );
}
