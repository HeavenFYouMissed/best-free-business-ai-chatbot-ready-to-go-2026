import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { CoverChat } from "@/components/cover/CoverChat";
import { landingConfig } from "@/components/landing/config";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { IphoneFrame } from "@/components/ui/IphoneFrame";

export function LandingAI() {
  const { ai } = landingConfig;

  return (
    <section
      id="ai"
      className="border-b border-[var(--color-border)] py-20 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-6 md:px-10">
        <SectionHeader
          eyebrow={ai.eyebrow}
          title={ai.title}
          accentWord="AI Tools, Agents, and Automations"
          description={ai.description}
        />

        {/* 2-col split: live chat in iPhone frame on the left, capability
            bullets + CTA on the right. Stacks on mobile (chat first so the
            phone is the visual hook). */}
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-16">
          {/* Live chat phone */}
          <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-none">
            {/* Soft cyan halo behind the device — sells the "live" feel */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 blur-[60px]"
              style={{
                background:
                  "radial-gradient(60% 50% at 50% 50%, color-mix(in srgb, var(--color-accent) 35%, transparent), transparent 70%)",
              }}
            />
            <IphoneFrame alt="Publishd AI assistant — live demo">
              {/* Phone screen content. Padded slightly to give the chat
                  breathing room inside the bezel. The chat itself uses
                  CSS variables, so it inherits the page theme. */}
              <div className="flex h-full w-full flex-col bg-[var(--color-bg)] px-3 pb-3 pt-7">
                {/* Status bar imitation — purely decorative. Sells the
                    "this is a real phone" vibe without being kitsch. */}
                <div className="mb-2 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
                  <span>9:41</span>
                  <span className="flex items-center gap-1">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    Publishd AI
                  </span>
                </div>
                <div className="min-h-0 flex-1 overflow-hidden">
                  <CoverChat />
                </div>
              </div>
            </IphoneFrame>
          </div>

          {/* Copy + capability list + CTA */}
          <div className="flex flex-col items-start gap-6">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
              Try it — that&rsquo;s a real chat
            </p>
            <h3 className="text-[24px] font-semibold leading-tight tracking-tight text-[var(--color-fg)] md:text-[28px]">
              Streaming, on-brand, deployed to your domain.
            </h3>
            <p className="max-w-[52ch] text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
              Bring-your-own-key (OpenAI, Anthropic, Groq, or local) — same shape
              as the assistant on your left. I wire it into your existing site,
              your data, your tone of voice. No subscription, you own the code.
            </p>

            <ul className="grid w-full gap-2 sm:grid-cols-2">
              {ai.bullets.map((b) => (
                <li
                  key={b}
                  className="group flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_70%,transparent)] px-3.5 py-2.5 transition-colors duration-200 hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))]"
                >
                  <Sparkles
                    className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]"
                    strokeWidth={1.8}
                  />
                  <span className="text-[13px] font-medium tracking-tight text-[var(--color-fg)]">
                    {b}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href={ai.cta.href}
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_55%,transparent)] px-5 text-[13.5px] font-semibold tracking-tight text-[var(--color-fg)] backdrop-blur-md transition-all duration-200 hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))] active:scale-[0.98]"
            >
              {ai.cta.text}
              <ArrowRight className="h-4 w-4 text-[var(--color-accent)] transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
