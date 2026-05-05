import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";

import { landingConfig } from "@/components/landing/config";
import { SectionHeader } from "@/components/landing/SectionHeader";
import { cn } from "@/components/landing/utils";

function StarRow({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < rating
              ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
              : "fill-transparent text-[color-mix(in_srgb,var(--color-fg)_28%,transparent)]",
          )}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function PlatformBadge({ platform }: { platform: string }) {
  const isTrustpilot = platform === "Trustpilot";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.2em]",
        isTrustpilot
          ? "border-[color-mix(in_srgb,#00b67a_50%,var(--color-border))] bg-[color-mix(in_srgb,#00b67a_12%,transparent)] text-[#3aedb0]"
          : "border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_70%,transparent)] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isTrustpilot ? "bg-[#00b67a]" : "bg-[var(--color-accent)]",
        )}
      />
      {platform} verified
    </span>
  );
}

export function LandingTestimonials() {
  const { testimonials } = landingConfig;

  return (
    <section
      id="testimonials"
      className="border-b border-[var(--color-border)] py-20 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-12 px-6 md:px-10">
        <SectionHeader
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          accentWord="shipping with me"
          description={testimonials.description}
        />

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_72%,transparent)] px-4 py-2">
            <StarRow rating={5} />
            <span className="font-mono text-[13px] font-semibold tracking-tight text-[var(--color-fg)]">
              {testimonials.averageRating.toFixed(1)}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
              avg · {testimonials.totalReviews}+ reviews
            </span>
          </div>
        </div>

        <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((t, i) => (
            <figure
              key={i}
              className={cn(
                "relative flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_72%,transparent)] p-6 transition-colors duration-200 hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))]",
                i === 0 && "lg:col-span-2 lg:row-span-1",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <StarRow rating={t.rating} />
                <PlatformBadge platform={t.platform} />
              </div>
              <blockquote className="text-[14.5px] leading-[1.65] text-[color-mix(in_srgb,var(--color-fg)_88%,transparent)]">
                <span
                  aria-hidden="true"
                  className="mr-1 font-mono text-[var(--color-accent)]"
                >
                  &ldquo;
                </span>
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 pt-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] font-mono text-[12px] font-semibold tracking-tight text-[var(--color-accent)]">
                  {t.author
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()}
                </span>
                <div className="flex flex-col">
                  <span className="text-[13.5px] font-semibold tracking-tight text-[var(--color-fg)]">
                    {t.author}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
                    {t.role}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <Link
          href={testimonials.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex h-11 items-center gap-2 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_55%,transparent)] px-5 text-[13.5px] font-semibold tracking-tight text-[var(--color-fg)] backdrop-blur-md transition-all duration-200 hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))] active:scale-[0.98]"
        >
          {testimonials.cta.text}
          <ArrowUpRight className="h-4 w-4 text-[var(--color-accent)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
