import { landingConfig } from "@/components/landing/config";
import { SectionHeader } from "@/components/landing/SectionHeader";

export function LandingHowItWorks() {
  const { howItWorks } = landingConfig;

  return (
    <section
      id="how"
      className="border-b border-[var(--color-border)] py-20 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-6 md:px-10">
        <SectionHeader
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.title}
          accentWord="Working With Me"
          description={howItWorks.description}
        />

        <div className="relative grid w-full gap-px overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-border)] md:grid-cols-2 lg:grid-cols-4">
          {howItWorks.steps.map((step, i) => (
            <div
              key={step.n}
              className="relative flex flex-col gap-4 bg-[var(--color-bg)] p-6 md:p-7"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[28px] font-semibold leading-none tracking-[-0.02em] text-[var(--color-accent)]">
                  {step.n}
                </span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-gradient-to-r from-[color-mix(in_srgb,var(--color-accent)_55%,transparent)] to-transparent"
                />
              </div>
              <h3 className="text-[1.05rem] font-semibold leading-[1.2] tracking-tight text-[var(--color-fg)]">
                {step.title}
              </h3>
              <p className="text-[13.5px] leading-[1.65] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
                {step.body}
              </p>
              {i < howItWorks.steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rotate-45 border-r border-t border-[var(--color-border)] bg-[var(--color-bg)] lg:block"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
