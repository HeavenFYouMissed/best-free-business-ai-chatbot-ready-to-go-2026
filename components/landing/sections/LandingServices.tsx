import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { landingConfig } from "@/components/landing/config";
import { SectionHeader } from "@/components/landing/SectionHeader";

export function LandingServices() {
  const { services } = landingConfig;

  return (
    <section
      id="services"
      className="border-b border-[var(--color-border)] py-20 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-6 md:px-10">
        <SectionHeader
          eyebrow={services.eyebrow}
          title={services.title}
        />

        <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.items.map((s) => (
            <Link
              key={s.n}
              href={s.href}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_72%,transparent)] p-6 transition-all duration-300 hover:-translate-y-[2px] hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))] hover:bg-[color-mix(in_srgb,var(--color-ink)_85%,transparent)]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[clamp(1.4rem,2vw,1.7rem)] font-semibold tracking-[-0.02em] text-[var(--color-accent)]">
                  {s.n}
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]" />
              </div>
              <h3 className="text-[1.15rem] font-semibold leading-[1.2] tracking-tight text-[var(--color-fg)]">
                {s.title}
              </h3>
              <p className="text-[13.5px] leading-[1.65] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
                {s.body}
              </p>
              <div className="mt-auto pt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
                {s.meta}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
