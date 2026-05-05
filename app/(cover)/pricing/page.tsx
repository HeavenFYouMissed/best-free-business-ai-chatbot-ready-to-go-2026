import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { tiers, addons, studio } from "@/data/tiers";
import { bfyTiers } from "@/data/builtForYou";

export const metadata: Metadata = {
  title: "Pricing — All tiers",
  description:
    "Flat fees. No subscriptions. App store submissions from $199, custom sites from $499, AI chatbots from $399, Studio builds from $2,999.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — All tiers · Publishd",
    description:
      "Flat fees. No subscriptions. App store submissions from $199, custom sites from $499, AI chatbots from $399.",
    url: "/pricing",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Publishd pricing — flat fees, no subscriptions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — All tiers · Publishd",
    description:
      "Flat fees. No subscriptions. App store submissions from $199, custom sites from $499, AI chatbots from $399.",
    images: ["/opengraph-image"],
  },
};

export default function PricingPage() {
  return (
    <article className="min-w-0 bg-[var(--color-bg)] px-5 py-12 text-[var(--color-fg)] md:px-10 md:py-20 lg:px-16">
      {/* Header */}
      <header className="mb-12 max-w-[640px] md:mb-16">
        <h1 className="text-[clamp(1.8rem,5vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          Pricing
        </h1>
        <p className="mt-3 max-w-[48ch] text-[15px] leading-[1.65] text-[var(--color-muted)]">
          Flat fees. No subscriptions. No lock-in. You own everything.
          One senior engineer, start to finish.
        </p>
      </header>

      {/* App Store Submissions */}
      <section className="mb-16" aria-label="App store submission tiers">
        <SectionHead label="ship" title="App store submissions" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((t) => (
            <TierCard
              key={t.id}
              name={t.name}
              price={t.price}
              interval={t.interval}
              summary={t.summary}
              bullets={t.bullets}
              featured={t.featured}
              cta={t.cta}
              href="/kickoff"
            />
          ))}
        </div>
        {/* Add-ons */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {addons.map((t) => (
            <TierCard
              key={t.id}
              name={t.name}
              price={t.price}
              interval={t.interval}
              summary={t.summary}
              bullets={t.bullets}
              href="/kickoff"
            />
          ))}
        </div>
      </section>

      {/* Built For You */}
      <section className="mb-16" aria-label="Built for you tiers">
        <SectionHead label="build" title="Sites, chatbots, polish" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bfyTiers.filter((t) => t.id !== "resubmitAddon").map((t) => (
            <TierCard
              key={t.id}
              name={t.name}
              price={t.price}
              interval={t.interval}
              summary={t.summary}
              bullets={t.bullets}
              cta={t.cta}
              href={t.id === "customSite" ? "mailto:daniel@publishd.app?subject=Custom%20site%20inquiry" : "/kickoff"}
            />
          ))}
        </div>
      </section>

      {/* Studio */}
      <section className="mb-16" aria-label="Publishd Studio">
        <SectionHead label="studio" title="Custom native apps and SaaS" />
        <div className="mt-6 rounded-lg border border-[var(--color-border)] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
            <div className="max-w-[520px]">
              <h3 className="text-[18px] font-medium text-[var(--color-fg)]">{studio.name}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-muted)]">{studio.summary}</p>
              <ul className="mt-4 space-y-1.5">
                {studio.capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-[13px] text-[var(--color-muted)]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0">
              <span className="block font-mono text-[24px] font-semibold tracking-tight text-[var(--color-fg)]">
                From ${studio.priceFrom.toLocaleString()}
              </span>
              <span className="block text-[12px] text-[var(--color-subtle)]">Consultation first</span>
              <a
                href={studio.cta.href}
                className="mt-4 inline-flex items-center gap-2 rounded-md border border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] px-4 py-2.5 text-[12px] font-medium text-[var(--color-accent)] transition-all duration-200 hover:bg-[color-mix(in_srgb,var(--color-accent)_20%,transparent)]"
              >
                {studio.cta.label}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] pt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-[var(--color-muted)]">
            All revenue routes directly to your Apple and Google accounts. We never touch your payouts.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/site#pricing"
              className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-subtle)] transition-colors hover:text-[var(--color-fg)]"
            >
              Full site pricing
              <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/"
              className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-subtle)] transition-colors hover:text-[var(--color-fg)]"
            >
              Back
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}

function SectionHead({ label, title }: { label: string; title: string }) {
  return (
    <div>
      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
        [ {label} ]
      </span>
      <h2 className="mt-2 text-[20px] font-medium tracking-[-0.02em] text-[var(--color-fg)] md:text-[22px]">
        {title}
      </h2>
    </div>
  );
}

function TierCard({
  name,
  price,
  interval,
  summary,
  bullets,
  featured,
  cta,
  href,
}: {
  name: string;
  price: number;
  interval: "once" | "month";
  summary: string;
  bullets: string[];
  featured?: boolean;
  cta?: string;
  href: string;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-lg border p-5 transition-colors duration-200 ${
        featured
          ? "border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_4%,var(--color-ink))]"
          : "border-[var(--color-border)] bg-[var(--color-ink)]"
      }`}
    >
      {featured && (
        <span className="absolute -top-2.5 left-4 rounded-full bg-[var(--color-accent)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-bg)]">
          Most popular
        </span>
      )}
      <h3 className="text-[15px] font-medium text-[var(--color-fg)]">{name}</h3>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-mono text-[22px] font-semibold tracking-tight text-[var(--color-fg)]">
          ${price}
        </span>
        <span className="text-[12px] text-[var(--color-subtle)]">
          {interval === "month" ? "/mo" : "one-time"}
        </span>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-muted)]">{summary}</p>
      <ul className="mt-3 flex-1 space-y-1.5">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-[12px] text-[var(--color-muted)]">
            <Check className="mt-0.5 h-3 w-3 shrink-0 text-[var(--color-accent)]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={`mt-4 inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-[12px] font-medium transition-all duration-200 ${
          featured
            ? "border border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] text-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_22%,transparent)]"
            : "border border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        }`}
      >
        {cta ?? "Get started"}
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
