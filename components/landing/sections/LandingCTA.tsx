"use client";

import { ArrowRight, Loader2, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";

import { landingConfig } from "@/components/landing/config";
import { AuroraText } from "@/components/landing/ui/AuroraText";
import { CornerPlus } from "@/components/landing/ui/CornerPlus";
import { Particles } from "@/components/landing/ui/Particles";
import { Ripple } from "@/components/landing/ui/Ripple";

// Full IntakeForm lazy-loaded — only mounted once a user expands it, so the
// landing bundle stays light. SSR off because it owns interactive state.
const IntakeForm = dynamic(
  () => import("@/components/intake/IntakeForm").then((m) => m.IntakeForm),
  { ssr: false, loading: () => <IntakeSkeleton /> },
);

type QuickAskState = "idle" | "sending" | "ok" | "error";

/**
 * LandingCTA — Codeforge dual-radial-glow + Particles + Ripple wrapped frame
 * extended with two on-page contact paths so visitors never have to leave:
 *
 * 1. Quick-ask: 1 email field. Fastest possible "hand-raise". Same /api/intake
 *    endpoint the kickoff form posts to, with source=quick-ask so I can route.
 * 2. Full intake: expand-on-click loads the canonical kickoff form inline.
 *    Lazy-loaded so first paint of the landing page isn't penalized by it.
 */
export function LandingCTA() {
  const { cta } = landingConfig;

  const [quickState, setQuickState] = useState<QuickAskState>("idle");
  const [quickError, setQuickError] = useState("");
  const [showFullIntake, setShowFullIntake] = useState(false);

  async function handleQuickAsk(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setQuickState("sending");
    setQuickError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (typeof data.website === "string" && data.website.length > 0) {
      // Honeypot — silent success.
      setQuickState("ok");
      return;
    }

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ source: "landing-quick-ask", ...data }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setQuickState("ok");
      form.reset();
    } catch (err) {
      setQuickState("error");
      setQuickError(err instanceof Error ? err.message : "Couldn't send.");
    }
  }

  return (
    <section
      id="cta"
      className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-24 md:py-32"
    >
      {/* Codeforge dual-layer radial glow stack — hard puddle + blurred haze */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,transparent,black_100%)]"
        style={{
          background:
            "radial-gradient(circle at 45% 85%, color-mix(in srgb, var(--color-accent) 40%, transparent) 0%, transparent 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 blur-[50px] [mask-image:linear-gradient(to_bottom,transparent,black_100%)]"
        style={{
          background:
            "radial-gradient(circle at 45% 68%, color-mix(in srgb, var(--color-accent) 68%, transparent) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[color-mix(in_srgb,var(--color-ink)_85%,transparent)] p-6 text-white/15 sm:p-10 md:p-20">
          <CornerPlus />
          <Particles
            className="pointer-events-none absolute inset-0"
            quantity={130}
            ease={70}
            color="#00d4ff"
            size={0.6}
          />
          <Ripple mainCircleSize={260} mainCircleOpacity={0.22} numCircles={9} />

          <div className="relative flex flex-col items-center gap-8 text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
              [ {cta.eyebrow} ]
            </span>
            <h2 className="max-w-[18ch] text-balance text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-[var(--color-fg)]">
              Real human reply in under <AuroraText>6 hours.</AuroraText>
            </h2>
            <p className="max-w-[52ch] text-balance text-[16.5px] leading-[1.7] text-[color-mix(in_srgb,var(--color-fg)_75%,transparent)]">
              {cta.body}
            </p>

            {/* === Quick-ask: 1-field email form ===
                Lowest-friction conversion path on the whole page. */}
            {quickState === "ok" ? (
              <div
                role="status"
                className="mt-2 flex w-full max-w-[520px] flex-col items-center gap-2 rounded-2xl border border-[color-mix(in_srgb,var(--color-accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] px-5 py-4"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  [ request received ]
                </span>
                <p className="text-[14px] text-[var(--color-fg)]">
                  Got it. I&rsquo;ll reply within 6 business hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleQuickAsk}
                className="mt-2 flex w-full max-w-[520px] flex-col gap-2 sm:flex-row"
                aria-label="Quick contact — drop your email and I'll reply"
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0"
                  aria-hidden="true"
                />
                <label htmlFor="quick-ask-email" className="sr-only">
                  Your email
                </label>
                <input
                  id="quick-ask-email"
                  type="email"
                  name="email"
                  required
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="h-14 flex-1 rounded-full border border-white/20 bg-white/8 px-6 font-mono text-[15px] text-white placeholder-white/55 outline-none backdrop-blur-md transition-colors duration-200 focus:border-[color-mix(in_srgb,var(--color-accent)_70%,transparent)] focus:bg-white/12"
                />
                <button
                  type="submit"
                  disabled={quickState === "sending"}
                  className="group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[color-mix(in_srgb,var(--color-accent)_92%,white)] to-[var(--color-accent-deep)] px-7 text-[15px] font-semibold tracking-tight text-[#001018] shadow-[0px_1px_2px_0px_#00000026,0px_2px_4px_0px_#00000010,inset_0px_0px_1.5px_#0084D1,inset_0px_2.5px_0px_#ffffff36,inset_0px_0px_2.5px_#ffffff10] ring-2 ring-[var(--color-accent-deep)] transition-all duration-200 hover:translate-y-[-1px] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {quickState === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      Sending
                    </>
                  ) : (
                    <>
                      <span className="font-mono text-[#001018]/80">&gt;_</span>
                      Get a reply
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {quickState === "error" ? (
              <p className="-mt-4 text-[12.5px] text-[color-mix(in_srgb,var(--color-danger,#ff7a8a)_90%,white)]">
                Couldn&rsquo;t send — {quickError}. Email{" "}
                <a className="underline underline-offset-2" href="mailto:daniel@publishd.app">
                  daniel@publishd.app
                </a>
                .
              </p>
            ) : null}

            {/* Big-ticket / project paths */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
              <Link
                href={cta.primary.href}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-[15px] font-semibold tracking-tight text-white backdrop-blur-md transition-all duration-200 hover:border-white/25 hover:bg-white/10 active:scale-[0.98]"
              >
                <span className="font-mono text-white/60">&gt;_</span>
                Full project intake
              </Link>
              <Link
                href={cta.secondary.href}
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-[15px] font-semibold tracking-tight text-white backdrop-blur-md transition-all duration-200 hover:border-white/25 hover:bg-white/10 active:scale-[0.98]"
              >
                <Mail className="h-4 w-4 text-[var(--color-accent)]" />
                {cta.secondary.text}
              </Link>
            </div>

            {/* Expand-on-click full intake */}
            <div className="mt-2 w-full max-w-[820px] text-left">
              {showFullIntake ? (
                <IntakeForm />
              ) : (
                <button
                  type="button"
                  onClick={() => setShowFullIntake(true)}
                  className="group mx-auto flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)] transition-colors duration-200 hover:text-[var(--color-accent)]"
                >
                  Or fill the full intake right here
                  <span aria-hidden className="transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IntakeSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[420px] overflow-hidden rounded-2xl border border-white/10 bg-[color-mix(in_srgb,var(--color-ink)_70%,transparent)]"
    >
      <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-white/5 to-transparent" />
    </div>
  );
}
