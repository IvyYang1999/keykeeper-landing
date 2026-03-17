"use client";

import { useState, useEffect } from "react";

/* ─── Terminal Window Component ─── */
function TerminalWindow({
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
          <span className="ml-2 text-[#737373] text-xs font-mono">
            {title}
          </span>
        )}
      </div>
      <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
        {children}
      </div>
    </div>
  );
}

/* ─── Feature Card Component ─── */
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="card-hover bg-[#141414] border border-[#222] rounded-lg p-6">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-[#e5e5e5] font-bold text-base mb-2">{title}</h3>
      <p className="text-[#737373] text-sm leading-relaxed">{description}</p>
    </div>
  );
}

/* ─── Step Component ─── */
function Step({
  number,
  title,
  description,
  code,
}: {
  number: string;
  title: string;
  description: string;
  code?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full border-2 border-[#f59e0b] flex items-center justify-center mb-4">
        <span
          className="text-[#f59e0b] font-bold text-lg"
          style={{ fontFamily: "var(--font-pixel)" }}
        >
          {number}
        </span>
      </div>
      <h3
        className="text-[#e5e5e5] text-sm mb-2"
        style={{ fontFamily: "var(--font-pixel)" }}
      >
        {title}
      </h3>
      <p className="text-[#737373] text-sm leading-relaxed mb-3 max-w-xs">
        {description}
      </p>
      {code && (
        <code className="bg-[#0d0d0d] border border-[#222] rounded px-3 py-1.5 text-xs text-[#22c55e]">
          {code}
        </code>
      )}
    </div>
  );
}

/* ─── Typing animation hook ─── */
function useTypingEffect(text: string, speed: number = 50, delay: number = 0) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(text.slice(0, displayed.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [displayed, text, speed, started]);

  return displayed;
}

/* ─── Main Page ─── */
export default function Home() {
  const tagline = useTypingEffect(
    "Your API keys are safe. Even from AI.",
    45,
    800
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5]">
      {/* ───────────── HERO ───────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 grid-bg-animated overflow-hidden">
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.08)_0%,_transparent_70%)]" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Key icon */}
          <div className="text-6xl mb-8 opacity-80">🔑</div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#f59e0b] glow-amber mb-8 leading-tight"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            KeyKeeper
          </h1>

          <p className="font-mono text-lg sm:text-xl md:text-2xl text-[#e5e5e5] mb-4 h-[1.8em]">
            {tagline}
            <span className="cursor-blink text-[#f59e0b]">_</span>
          </p>

          <p className="text-[#737373] text-sm sm:text-base mt-6 max-w-lg mx-auto">
            AI knows key names, never touches key values.
          </p>

          {/* CTA */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/IvyYang1999/KeyKeeper"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f59e0b] hover:bg-[#fbbf24] text-[#0a0a0a] font-bold px-8 py-3 rounded-md transition-colors text-sm"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              View on GitHub
            </a>
            <a
              href="#install"
              className="border border-[#333] hover:border-[#f59e0b] text-[#e5e5e5] px-8 py-3 rounded-md transition-colors text-sm font-mono"
            >
              brew install keykeeper
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#737373] animate-bounce">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* ───────────── PROBLEM ───────────── */}
      <section className="py-24 sm:py-32 px-6 grid-bg">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-xl sm:text-2xl md:text-3xl text-[#f59e0b] mb-8"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            The Problem
          </h2>

          <p className="text-lg sm:text-xl text-[#e5e5e5] leading-relaxed mb-6">
            AI coding tools need your API keys.
          </p>
          <p className="text-lg sm:text-xl text-[#e5e5e5] leading-relaxed mb-8">
            But pasting them in chat?{" "}
            <span className="text-[#ef4444] font-bold">Dangerous.</span>
          </p>

          <div className="max-w-xl mx-auto">
            <TerminalWindow title="bad-idea.sh">
              <div className="space-y-2">
                <p>
                  <span className="text-[#737373]"># Don&apos;t do this</span>
                </p>
                <p>
                  <span className="text-[#22c55e]">you:</span>{" "}
                  <span className="text-[#e5e5e5]">
                    Here&apos;s my Stripe key:{" "}
                  </span>
                  <span className="text-[#ef4444]">
                    sk_live_51H7...a3xF
                  </span>
                </p>
                <p>
                  <span className="text-[#22c55e]">ai:</span>{" "}
                  <span className="text-[#e5e5e5]">
                    Got it! Let me use that in your code...
                  </span>
                </p>
                <p className="pt-2">
                  <span className="text-[#737373]">
                    # Now your key is in chat logs, model context,
                  </span>
                </p>
                <p>
                  <span className="text-[#737373]">
                    # training data, and whoever has access to your session
                  </span>
                </p>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </section>

      {/* ───────────── HOW IT WORKS ───────────── */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-xl sm:text-2xl md:text-3xl text-[#f59e0b] text-center mb-16"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <Step
              number="1"
              title="Store"
              description="Save your API keys in the macOS Keychain. Encrypted at rest, protected by the OS."
              code="keykeeper set stripe"
            />
            <Step
              number="2"
              title="Authorize"
              description="Touch ID or password prompt. One auth per session — not every command."
              code="Touch ID ✓"
            />
            <Step
              number="3"
              title="Inject"
              description="Keys are injected as environment variables into your process. Never written to disk."
              code="keykeeper run -c stripe"
            />
          </div>

          {/* Connector line (desktop only) */}
          <div className="hidden md:block max-w-2xl mx-auto mb-16 relative">
            <div className="absolute top-1/2 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-[#f59e0b]/20 via-[#f59e0b]/40 to-[#f59e0b]/20" />
          </div>

          {/* Full command example */}
          <div className="max-w-2xl mx-auto">
            <TerminalWindow title="terminal">
              <div className="space-y-2">
                <p>
                  <span className="text-[#22c55e]">$</span>{" "}
                  <span className="text-[#e5e5e5]">
                    keykeeper run -c stripe -- python app.py
                  </span>
                </p>
                <p>
                  <span className="text-[#737373]">
                    # STRIPE_API_KEY is now in app.py&apos;s environment
                  </span>
                </p>
                <p>
                  <span className="text-[#737373]">
                    # Your code reads it with os.environ[&quot;STRIPE_API_KEY&quot;]
                  </span>
                </p>
                <p>
                  <span className="text-[#737373]">
                    # The key never appears in your terminal, chat, or logs
                  </span>
                </p>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </section>

      {/* ───────────── FEATURES ───────────── */}
      <section className="py-24 sm:py-32 px-6 grid-bg">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-xl sm:text-2xl md:text-3xl text-[#f59e0b] text-center mb-16"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="🔐"
              title="macOS Keychain Storage"
              description="Your keys live in the macOS Keychain — the same vault that protects your passwords, certificates, and secure notes. Hardware-backed encryption."
            />
            <FeatureCard
              icon="🛡️"
              title="Stdout Redaction"
              description="If a secret accidentally appears in process output, KeyKeeper auto-replaces it with [REDACTED]. Defense in depth."
            />
            <FeatureCard
              icon="🔑"
              title="Session-Based Auth"
              description="Authenticate once with Touch ID or your password. One prompt per session, not every single command. Secure and frictionless."
            />
            <FeatureCard
              icon="📦"
              title="Process-Level Injection"
              description="Keys are injected as environment variables into child processes via keykeeper run. They never touch disk, never leak into shell history."
            />
            <FeatureCard
              icon="🤖"
              title="Claude Code Integration"
              description="Works as a Claude Code skill. AI can request keys by name, KeyKeeper handles the rest. The AI never sees the actual values."
            />
            <FeatureCard
              icon="🧹"
              title="Menu Bar App"
              description="Lightweight, always accessible from your menu bar. Manage keys, view sessions, revoke access — all without leaving your workflow."
            />
          </div>
        </div>
      </section>

      {/* ───────────── TERMINAL DEMO ───────────── */}
      <section className="py-24 sm:py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-xl sm:text-2xl md:text-3xl text-[#f59e0b] text-center mb-16"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            See It In Action
          </h2>

          <TerminalWindow title="~ — zsh — 80x24">
            <div className="space-y-3 text-[13px]">
              {/* Store a key */}
              <div>
                <p>
                  <span className="text-[#22c55e]">$</span>{" "}
                  <span className="text-[#e5e5e5]">keykeeper set stripe</span>
                </p>
                <p className="text-[#737373]">
                  Enter value for &quot;stripe&quot;:{" "}
                  <span className="text-[#f59e0b]">••••••••••••••••</span>
                </p>
                <p className="text-[#22c55e]">
                  ✓ Key &quot;stripe&quot; saved to Keychain
                </p>
              </div>

              {/* List keys */}
              <div className="pt-1">
                <p>
                  <span className="text-[#22c55e]">$</span>{" "}
                  <span className="text-[#e5e5e5]">keykeeper list</span>
                </p>
                <p className="text-[#e5e5e5]">
                  <span className="text-[#f59e0b]">stripe</span>
                  {"       "}STRIPE_API_KEY{"      "}
                  <span className="text-[#737373]">added 2 min ago</span>
                </p>
                <p className="text-[#e5e5e5]">
                  <span className="text-[#f59e0b]">openai</span>
                  {"       "}OPENAI_API_KEY{"     "}
                  <span className="text-[#737373]">added 1 day ago</span>
                </p>
                <p className="text-[#e5e5e5]">
                  <span className="text-[#f59e0b]">anthropic</span>
                  {"    "}ANTHROPIC_API_KEY{"  "}
                  <span className="text-[#737373]">added 3 days ago</span>
                </p>
              </div>

              {/* Run with key */}
              <div className="pt-1">
                <p>
                  <span className="text-[#22c55e]">$</span>{" "}
                  <span className="text-[#e5e5e5]">
                    keykeeper run -c stripe -- python app.py
                  </span>
                </p>
                <p className="text-[#737373]">
                  🔐 Touch ID authorized for session
                </p>
                <p className="text-[#737373]">
                  → Injecting STRIPE_API_KEY into process env
                </p>
                <p className="text-[#e5e5e5]">
                  Server running on http://localhost:3000
                </p>
                <p className="text-[#e5e5e5]">
                  Connected to Stripe API ✓
                </p>
              </div>

              {/* Redaction demo */}
              <div className="pt-1">
                <p>
                  <span className="text-[#22c55e]">$</span>{" "}
                  <span className="text-[#e5e5e5]">
                    keykeeper run -c stripe -- env | grep STRIPE
                  </span>
                </p>
                <p className="text-[#e5e5e5]">
                  STRIPE_API_KEY=
                  <span className="text-[#f59e0b] font-bold">[REDACTED]</span>
                </p>
              </div>

              {/* Cursor */}
              <div className="pt-1">
                <p>
                  <span className="text-[#22c55e]">$</span>{" "}
                  <span className="cursor-blink text-[#e5e5e5]">▋</span>
                </p>
              </div>
            </div>
          </TerminalWindow>
        </div>
      </section>

      {/* ───────────── INSTALL ───────────── */}
      <section id="install" className="py-24 sm:py-32 px-6 grid-bg">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-xl sm:text-2xl md:text-3xl text-[#f59e0b] mb-8"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            Install
          </h2>

          <p className="text-[#737373] mb-8 text-sm">
            Get started in seconds.
          </p>

          {/* Brew install */}
          <div className="max-w-lg mx-auto mb-8">
            <TerminalWindow title="terminal">
              <p>
                <span className="text-[#22c55e]">$</span>{" "}
                <span className="text-[#e5e5e5]">brew install keykeeper</span>
              </p>
            </TerminalWindow>
          </div>

          <p className="text-[#737373] text-xs mb-6">
            Or clone and build from source:
          </p>

          <div className="max-w-lg mx-auto mb-12">
            <TerminalWindow title="terminal">
              <div className="space-y-1">
                <p>
                  <span className="text-[#22c55e]">$</span>{" "}
                  <span className="text-[#e5e5e5]">
                    git clone https://github.com/IvyYang1999/KeyKeeper.git
                  </span>
                </p>
                <p>
                  <span className="text-[#22c55e]">$</span>{" "}
                  <span className="text-[#e5e5e5]">cd KeyKeeper</span>
                </p>
                <p>
                  <span className="text-[#22c55e]">$</span>{" "}
                  <span className="text-[#e5e5e5]">swift build</span>
                </p>
              </div>
            </TerminalWindow>
          </div>

          <a
            href="https://github.com/IvyYang1999/KeyKeeper"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#141414] hover:bg-[#1a1a1a] border border-[#222] hover:border-[#f59e0b] text-[#e5e5e5] px-8 py-4 rounded-lg transition-all text-sm"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span className="font-mono">IvyYang1999/KeyKeeper</span>
          </a>
        </div>
      </section>

      {/* ───────────── FOOTER ───────────── */}
      <footer className="py-16 px-6 border-t border-[#222]">
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-[#737373] text-xs mb-6"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            Built with obsessive security in mind.
          </p>

          <div className="flex items-center justify-center gap-2 text-[#737373] text-sm">
            <span className="text-lg">🔑</span>
            <a
              href="https://github.com/IvyYang1999/KeyKeeper"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#f59e0b] transition-colors font-mono"
            >
              KeyKeeper
            </a>
            <span className="text-[#333]">|</span>
            <span className="text-xs">
              AI knows key names, never touches key values.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
