import { Check } from "lucide-react";

import { landingConfig } from "@/components/landing/config";
import { SectionHeader } from "@/components/landing/SectionHeader";

export function LandingWhyHire() {
  const { whyHire } = landingConfig;

  return (
    <section
      id="why"
      className="border-b border-[var(--color-border)] py-20 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-6 md:px-10">
        <SectionHeader eyebrow={whyHire.eyebrow} title={whyHire.title} />

        <div className="grid w-full gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {whyHire.bullets.map((b, i) => (
            <div
              key={i}
              className="flex items-start gap-3 border-t border-[var(--color-border)] pt-5"
            >
              <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] text-[var(--color-accent)]">
                <Check className="h-3 w-3" strokeWidth={2.5} />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="text-[15px] font-semibold leading-[1.3] tracking-tight text-[var(--color-fg)]">
                  {b.title}
                </h3>
                <p className="text-[13.5px] leading-[1.6] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
                  {b.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
