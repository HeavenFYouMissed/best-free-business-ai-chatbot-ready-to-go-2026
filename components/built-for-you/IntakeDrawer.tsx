"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import {
  INTAKE_SCOPE_LABELS,
  subscribeIntake,
  type IntakeScope,
} from "./intakeBus";

const SCOPE_OPTIONS: Array<{ id: IntakeScope; label: string; hint: string }> = [
  { id: "starter-site", label: "Starter Site", hint: "$499 · 3 days" },
  { id: "pro-site", label: "Pro Site", hint: "$999 · 7–10 days" },
  { id: "custom-site", label: "Custom Site", hint: "From $1,999" },
  { id: "chatbot-install", label: "Chatbot Install", hint: "$399 · 2 weeks" },
  { id: "chatbot-pro", label: "Chatbot Pro", hint: "$799 · actions" },
  { id: "app-polish", label: "App Polish", hint: "$199 · 2–3 days" },
  { id: "website-audit", label: "Free Website Audit", hint: "Offer + CTA review" },
  { id: "chatbot-audit", label: "Free Chatbot Audit", hint: "Docs + flow review" },
  { id: "app-review", label: "Free App Review", hint: "Store-readiness check" },
  { id: "general", label: "Something else", hint: "I'll reply in 6 hours" },
];

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Shared slide-over drawer for service-specific audits and non-Stripe project
 * inquiries. Mirrors the frosted-glass look of the chat widget so it reads as
 * native to the site. Lives at the page root and listens for the
 * `publishd:open-intake` event fired by `openIntake()`.
 */
export function IntakeDrawer() {
  const [open, setOpen] = useState(false);
  const [scope, setScope] = useState<IntakeScope>("general");
  const [source, setSource] = useState("built-for-you");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return subscribeIntake((detail) => {
      if (detail.scope) setScope(detail.scope);
      setSource(detail.source ?? "built-for-you");
      setNotes(detail.note ?? "");
      setStatus("idle");
      setOpen(true);
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);

    /* Lock body scroll while drawer is open — prevents the underlying
       Lenis smooth-scroll from lurching when touch events bleed through
       to the page behind. Preserves position so close restores exactly. */
    const body = document.body;
    const scrollY = window.scrollY;
    const prev = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      window.removeEventListener("keydown", onKey);
      body.style.overflow = prev.overflow;
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const scopeLabel = useMemo(() => INTAKE_SCOPE_LABELS[scope], [scope]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) return;
    setStatus("sending");
    try {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          source,
          scope,
          scopeLabel,
          name: name.trim() || "anonymous",
          email: email.trim(),
          notes: notes.trim(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setTimeout(() => setOpen(false), 1800);
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close intake form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[110] bg-[color-mix(in_srgb,var(--color-bg)_70%,transparent)] backdrop-blur-[6px]"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Start a project"
            initial={{ x: "100%", opacity: 0.85 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 z-[112] flex w-full max-w-[min(460px,96vw)] flex-col overflow-hidden border-l border-[color-mix(in_srgb,var(--color-accent)_20%,var(--color-border))]"
          >
            <div
              aria-hidden
              className="absolute inset-0 -z-[1]"
              style={{
                background: "rgba(8,10,22,0.82)",
                backdropFilter: "blur(28px) saturate(180%)",
                WebkitBackdropFilter: "blur(28px) saturate(180%)",
              }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 60%, transparent), transparent)",
              }}
            />

            <header className="relative flex shrink-0 items-center justify-between border-b border-[color-mix(in_srgb,var(--color-accent)_18%,var(--color-border))] px-5 py-4">
              <div className="flex flex-col gap-1">
                <span className="mono-label !m-0 !p-0 before:hidden" style={{ color: "color-mix(in srgb, var(--color-accent) 85%, white)" }}>
                  [ start a project ]
                </span>
                <span className="text-[15px] font-medium text-[var(--color-fg)]">
                  {scopeLabel}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-10 w-10 place-items-center rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--color-accent)_20%,var(--color-border))] text-[var(--color-fg)] transition-colors hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))]"
              >
                <X className="icon" />
              </button>
            </header>

            <form
              onSubmit={submit}
              data-lenis-prevent
              data-lenis-prevent-touch
              data-lenis-prevent-wheel
              className="relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 py-5"
              style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
            >
              <fieldset className="flex flex-col gap-2">
                <legend className="mono-label !m-0 !p-0 before:hidden">[ what you need ]</legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {SCOPE_OPTIONS.map((opt) => {
                    const active = scope === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setScope(opt.id)}
                        aria-pressed={active}
                        className={`flex min-h-[54px] flex-col items-start gap-0.5 rounded-[var(--radius-md)] border px-3 py-2 text-left transition-colors ${
                          active
                            ? "border-[color-mix(in_srgb,var(--color-accent)_55%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] text-[var(--color-fg)]"
                            : "border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_60%,transparent)] text-[color-mix(in_srgb,var(--color-fg)_80%,transparent)] hover:border-[color-mix(in_srgb,var(--color-accent)_30%,var(--color-border))]"
                        }`}
                      >
                        <span className="text-[13px] font-medium leading-tight">{opt.label}</span>
                        <span className="num text-[10.5px] uppercase tracking-[0.1em] text-[var(--color-muted)]">
                          {opt.hint}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-5 grid gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className="mono-label !m-0 !p-0 before:hidden">[ name ]</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="Your name"
                    className="min-h-[44px] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_60%,transparent)] px-3.5 py-2.5 text-[14px] text-[var(--color-fg)] outline-none transition-colors focus:border-[color-mix(in_srgb,var(--color-accent)_55%,var(--color-border))]"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="mono-label !m-0 !p-0 before:hidden">[ email · required ]</span>
                  <input
                    type="email"
                    inputMode="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="you@domain.com"
                    className="min-h-[44px] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_60%,transparent)] px-3.5 py-2.5 text-[14px] text-[var(--color-fg)] outline-none transition-colors focus:border-[color-mix(in_srgb,var(--color-accent)_55%,var(--color-border))]"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="mono-label !m-0 !p-0 before:hidden">[ short brief · optional ]</span>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={5}
                    placeholder="What are you building? Any deadlines, integrations, references?"
                    className="min-h-[120px] resize-y rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_60%,transparent)] px-3.5 py-2.5 text-[14px] leading-relaxed text-[var(--color-fg)] outline-none transition-colors focus:border-[color-mix(in_srgb,var(--color-accent)_55%,var(--color-border))]"
                  />
                </label>

                {/* honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="sr-only"
                  onChange={() => undefined}
                />
              </div>

              <div className="mt-5 flex items-center justify-between gap-3">
                <p className="text-[12px] leading-relaxed text-[var(--color-muted)]">
                  I reply within 6 hours. No spam, no drip sequences.
                </p>
                <button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  className="btn btn--primary min-h-[44px] px-5 text-[13.5px]"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="icon animate-spin" aria-hidden />
                      Sending
                    </>
                  ) : status === "sent" ? (
                    <>
                      <Check className="icon" aria-hidden />
                      Sent
                    </>
                  ) : (
                    <>
                      Send it
                      <ArrowRight className="icon" aria-hidden />
                    </>
                  )}
                </button>
              </div>

              {status === "error" && (
                <p className="mt-3 text-[12.5px] text-[color-mix(in_srgb,var(--color-danger,#ff5572)_85%,white)]">
                  Send failed — try again, or email daniel@publishd.app directly.
                </p>
              )}
            </form>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default IntakeDrawer;
