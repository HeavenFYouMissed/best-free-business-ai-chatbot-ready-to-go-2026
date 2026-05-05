import Link from "next/link";

import { landingConfig } from "@/components/landing/config";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { BorderBeam } from "@/components/landing/ui/BorderBeam";
import { cn } from "@/components/landing/utils";

export function LandingPricing() {
  const { pricing } = landingConfig;

  return (
    <section
      id="pricing"
      className="border-b border-[var(--color-border)] py-20 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-6 md:px-10">
        <SectionHeader
          eyebrow={pricing.eyebrow}
          title={pricing.title}
          accentWord="Flat Fees."
          description={pricing.description}
        />

        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pricing.tiers.map((tier) => {
            const isStudio = tier.cta.href === "/pricing";
            return (
              <div
                key={tier.name}
                className={cn(
                  "relative flex flex-col gap-5 rounded-2xl border bg-[color-mix(in_srgb,var(--color-ink)_72%,transparent)] p-6 transition-colors duration-200",
                  tier.featured
                    ? "border-[color-mix(in_srgb,var(--color-accent)_55%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-ink)_85%,transparent)] shadow-[0_30px_80px_-30px_color-mix(in_srgb,var(--color-accent)_45%,transparent)]"
                    : isStudio
                      ? "border-dashed border-[color-mix(in_srgb,var(--color-accent)_30%,var(--color-border))] hover:border-[color-mix(in_srgb,var(--color-accent)_55%,var(--color-border))]"
                      : "border-[var(--color-border)] hover:border-[color-mix(in_srgb,var(--color-accent)_35%,var(--color-border))]",
                )}
              >
                {tier.featured ? (
                  <>
                    <span className="absolute -top-3 left-6 z-10 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#001018]">
                      Most popular
                    </span>
                    <BorderBeam
                      size={70}
                      duration={7}
                      colorFrom="#00d4ff"
                      colorTo="#7cf0d4"
                    />
                    <BorderBeam
                      size={70}
                      duration={7}
                      delay={3.5}
                      colorFrom="#7cf0d4"
                      colorTo="#00d4ff"
                    />
                  </>
                ) : null}

                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[15px] font-semibold tracking-tight text-[var(--color-fg)]">
                    {tier.name}
                  </h3>
                  <p className="text-[12.5px] leading-[1.5] text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)]">
                    {tier.body}
                  </p>
                </div>

                <div className="flex items-baseline gap-2">
                  {(tier.cadence as string) === "from" ? (
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
                      from
                    </span>
                  ) : null}
                  <span
                    className={cn(
                      "font-mono font-semibold tracking-[-0.03em] text-[var(--color-fg)]",
                      isStudio
                        ? "text-[clamp(1.25rem,2vw,1.6rem)]"
                        : "text-[clamp(2rem,3.5vw,2.5rem)]",
                    )}
                  >
                    {tier.price}
                  </span>
                  {tier.cadence && (tier.cadence as string) !== "from" ? (
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
                      {tier.cadence}
                    </span>
                  ) : null}
                </div>

                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
                  {tier.meta}
                </div>

                <Link
                  href={tier.cta.href}
                  className={cn(
                    "mt-auto inline-flex h-11 items-center justify-center rounded-full px-4 text-[13.5px] font-semibold tracking-tight transition-all duration-200 active:scale-[0.98]",
                    tier.featured
                      ? "bg-[var(--color-accent)] text-[#001018] hover:bg-[color-mix(in_srgb,var(--color-accent)_92%,white)]"
                      : "border border-[var(--color-border)] bg-transparent text-[var(--color-fg)] hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))]",
                  )}
                >
                  {tier.cta.text}
                </Link>
              </div>
            );
          })}
        </div>

        <p className="max-w-[58ch] text-balance text-center font-mono text-[11px] uppercase leading-[1.7] tracking-[0.16em] text-[color-mix(in_srgb,var(--color-fg)_50%,transparent)]">
          Apple Developer $99/yr · Google Play $25 one-time · paid directly to platforms
        </p>

        {/* Follow-up link row: every important "next stop" the landing page hides */}
        <nav
          aria-label="More from the full site"
          className="grid w-full max-w-[920px] gap-3 sm:grid-cols-3"
        >
          <FollowUpLink
            href="/pricing"
            title="See every tier"
            body="Studio, custom builds, add-ons, expedited timelines."
          />
          <FollowUpLink
            href="/site"
            title="Full site experience"
            body="Process, comparisons, FAQ, full case studies."
          />
          <FollowUpLink
            href="/built-for-you"
            title="Built for you catalog"
            body="Sites, chatbots, polish — productized & priced."
          />
        </nav>
      </div>
    </section>
  );
}

function FollowUpLink({
  href,
  title,
  body,
}: {
  href: string;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-1 rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_60%,transparent)] p-4 transition-colors duration-200 hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))]"
    >
      <span className="flex items-center justify-between text-[13px] font-semibold tracking-tight text-[var(--color-fg)]">
        {title}
        <span
          aria-hidden
          className="text-[var(--color-accent)] transition-transform duration-200 group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
      <span className="text-[12px] leading-[1.5] text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)]">
        {body}
      </span>
    </Link>
  );
}
