"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Command, ArrowRight, ExternalLink, Mail } from "lucide-react";

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  keywords: string[];
  action: () => void;
  icon?: "arrow" | "ext" | "mail";
};

/**
 * Cmd+K command palette — fuzzy nav across the site plus core actions.
 * Press Cmd/Ctrl+K anywhere on the page to open; Esc or backdrop-click closes.
 * Arrow-key navigable. Keyboard-first.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      } else if (e.key === "?" && !open && (e.target as HTMLElement).tagName !== "INPUT") {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
      setQuery("");
      setActive(0);
    }
  }, [open]);

  const commands: Cmd[] = [
    {
      id: "ship",
      label: "Ship my app — $399",
      hint: "Checkout",
      keywords: ["ship", "buy", "checkout", "pricing", "399", "both", "platforms"],
      action: () => {
        window.location.hash = "#pricing";
        setOpen(false);
      },
      icon: "arrow",
    },
    {
      id: "kickoff",
      label: "Start the kickoff form",
      hint: "/kickoff",
      keywords: ["kickoff", "form", "start", "intake"],
      action: () => {
        window.location.href = "/kickoff";
        setOpen(false);
      },
      icon: "arrow",
    },
    {
      id: "work",
      label: "See apps I've shipped",
      hint: "#studio-work",
      keywords: ["work", "apps", "portfolio", "shipped", "examples"],
      action: () => {
        window.location.hash = "#studio-work";
        setOpen(false);
      },
      icon: "arrow",
    },
    {
      id: "included",
      label: "What's included",
      hint: "#included",
      keywords: ["included", "features", "what you get", "scope"],
      action: () => {
        window.location.hash = "#included";
        setOpen(false);
      },
      icon: "arrow",
    },
    {
      id: "how",
      label: "How it works",
      hint: "#how-it-works",
      keywords: ["how", "process", "steps"],
      action: () => {
        window.location.hash = "#how-it-works";
        setOpen(false);
      },
      icon: "arrow",
    },
    {
      id: "faq",
      label: "FAQ",
      hint: "#faq",
      keywords: ["faq", "questions", "answers", "help"],
      action: () => {
        window.location.hash = "#faq";
        setOpen(false);
      },
      icon: "arrow",
    },
    {
      id: "email",
      label: "Email Daniel",
      hint: "daniel@publishd.app",
      keywords: ["email", "contact", "daniel", "reach", "mail"],
      action: () => {
        window.location.href = "mailto:daniel@publishd.app";
        setOpen(false);
      },
      icon: "mail",
    },
    {
      id: "trustpilot",
      label: "Leave a review on Trustpilot",
      hint: "External",
      keywords: ["trustpilot", "review", "rating"],
      action: () => {
        window.open("https://www.trustpilot.com/evaluate/publishd.app", "_blank");
        setOpen(false);
      },
      icon: "ext",
    },
    {
      id: "github",
      label: "Daniel on GitHub",
      hint: "github.com/HeavenFYouMissed",
      keywords: ["github", "code", "open source"],
      action: () => {
        window.open("https://github.com/HeavenFYouMissed", "_blank");
        setOpen(false);
      },
      icon: "ext",
    },
  ];

  const q = query.trim().toLowerCase();
  const filtered = q
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(q) ||
          c.keywords.some((k) => k.includes(q))
      )
    : commands;

  useEffect(() => {
    if (active >= filtered.length) setActive(Math.max(0, filtered.length - 1));
  }, [filtered.length, active]);

  function onKeyNav(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(filtered.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.action();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close command palette"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[120] bg-[color-mix(in_srgb,#05070d_72%,transparent)] backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-[14vh] z-[130] w-[min(640px,92vw)] -translate-x-1/2 overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-accent)_22%,var(--color-border))] bg-[color-mix(in_srgb,#06080f_94%,transparent)] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.85),0_0_0_1px_color-mix(in_srgb,var(--color-accent)_18%,transparent)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
              <Command className="icon h-4 w-4 opacity-60" aria-hidden />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyNav}
                placeholder="Type a command — ship, kickoff, faq, email…"
                className="flex-1 bg-transparent text-[14.5px] text-[var(--color-fg)] placeholder:text-[var(--color-subtle)] focus:outline-none"
              />
              <kbd className="hidden md:inline-flex items-center gap-1 rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-surface)] px-1.5 py-0.5 text-[10.5px] font-medium text-[var(--color-muted)]">
                ESC
              </kbd>
            </div>
            <ul
              className="max-h-[48vh] overflow-y-auto py-1"
              role="listbox"
              aria-activedescendant={filtered[active]?.id}
            >
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-[13px] text-[var(--color-muted)]">
                  No matches. Try <span className="num text-[var(--color-accent)]">ship</span>.
                </li>
              )}
              {filtered.map((c, i) => (
                <li key={c.id}>
                  <button
                    id={c.id}
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={c.action}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[14px] transition-colors ${
                      i === active
                        ? "bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] text-[var(--color-fg)]"
                        : "text-[color-mix(in_srgb,var(--color-fg)_82%,transparent)]"
                    }`}
                  >
                    {c.icon === "ext" ? (
                      <ExternalLink className="icon h-3.5 w-3.5 opacity-70" aria-hidden />
                    ) : c.icon === "mail" ? (
                      <Mail className="icon h-3.5 w-3.5 opacity-70" aria-hidden />
                    ) : (
                      <ArrowRight className="icon h-3.5 w-3.5 opacity-70" aria-hidden />
                    )}
                    <span className="flex-1 truncate">{c.label}</span>
                    {c.hint && (
                      <span className="num text-[11px] text-[var(--color-subtle)]">
                        {c.hint}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-[var(--color-border)] px-4 py-2 text-[11px] text-[var(--color-subtle)]">
              <span className="inline-flex items-center gap-2">
                <kbd className="rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-surface)] px-1 py-0.5 font-mono text-[10.5px]">
                  ↑↓
                </kbd>
                navigate
              </span>
              <span className="inline-flex items-center gap-2">
                <kbd className="rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-surface)] px-1 py-0.5 font-mono text-[10.5px]">
                  ↵
                </kbd>
                run
              </span>
              <span className="inline-flex items-center gap-2">
                <kbd className="rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-surface)] px-1 py-0.5 font-mono text-[10.5px]">
                  ⌘K
                </kbd>
                toggle
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;
