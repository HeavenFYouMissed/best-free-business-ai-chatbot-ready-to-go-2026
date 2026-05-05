import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { landingConfig } from "@/components/landing/config";

export function LandingAppPublishing() {
  const { appPublishing } = landingConfig;

  return (
    <section
      id="app-publishing"
      className="border-b border-[var(--color-border)] py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_75%,transparent)] p-8 md:p-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 90% at 90% 0%, color-mix(in srgb, var(--color-accent) 22%, transparent) 0%, transparent 60%)",
            }}
          />
          <div className="relative grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                [ {appPublishing.eyebrow} ]
              </span>
              <h2 className="text-balance text-[clamp(1.85rem,3.6vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--color-fg)]">
                {appPublishing.title}
              </h2>
              <p className="max-w-[58ch] text-[15px] leading-[1.7] text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]">
                {appPublishing.body}
              </p>
              <Link
                href={appPublishing.cta.href}
                className="group inline-flex h-11 w-fit items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 text-[13.5px] font-semibold tracking-tight text-[#001018] transition-all duration-200 hover:translate-y-[-1px] hover:bg-[color-mix(in_srgb,var(--color-accent)_92%,white)] active:scale-[0.98]"
              >
                {appPublishing.cta.text}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <ul className="flex flex-col gap-3 self-center">
              {appPublishing.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_70%,transparent)] px-4 py-3"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent)_15%,transparent)] text-[var(--color-accent)]">
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  <span className="text-[14px] leading-[1.55] text-[var(--color-fg)]">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
