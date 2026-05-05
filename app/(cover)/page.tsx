import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, FileText, Search } from "lucide-react";
import { CoverHero } from "@/components/cover/CoverHero";
import { CoverProof } from "@/components/cover/CoverProof";
import { CoverShowcase } from "@/components/cover/CoverShowcase";
import { CoverAsk } from "@/components/cover/CoverAsk";
import { CoverServices } from "@/components/cover/CoverServices";
import { CoverProcess } from "@/components/cover/CoverProcess";
import { CoverContact } from "@/components/cover/CoverContact";
import { CoverHuman } from "@/components/cover/CoverHuman";
import { CoverFooter } from "@/components/cover/CoverFooter";
import { Faq } from "@/components/sections/Faq";
import { coverFaq } from "@/data/coverFaq";
import { getAllPosts } from "@/lib/blog";
import { PILLARS } from "@/lib/blog-pillars";

export const metadata: Metadata = {
  title: "Publishd — You need it. We ship it.",
  description:
    "Apps to the App Store and Google Play. Websites that convert. AI for your business. One senior engineer, flat fees, you own everything.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Publishd — You need it. We ship it.",
    description:
      "Apps to both stores. Websites that convert. AI for your business. One senior engineer, flat fees.",
    url: "/",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Publishd" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publishd — You need it. We ship it.",
    description:
      "Apps to both stores. Websites that convert. AI for your business.",
    images: ["/opengraph-image"],
  },
};

export default function CoverPage() {
  const featuredPosts = getAllPosts().slice(0, 3);
  const coverFaqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: coverFaq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <article className="cover-page relative min-w-0 overflow-hidden bg-[var(--color-bg)] text-[var(--color-fg)]">
      <Script id="ld-cover-faq" type="application/ld+json">
        {JSON.stringify(coverFaqLd)}
      </Script>
      <CoverHero />
      <CoverProof />
      <CoverShowcase />
      <div className="mx-auto w-full max-w-[1100px]">
        <CoverAsk />
        <CoverServices />
        <CoverProcess />
        <CoverContact />
        <CoverHuman />
        <section className="px-5 pb-4 pt-10 md:px-10 md:pt-14 lg:px-16" aria-labelledby="free-seo-assets-title">
          <div className="glass-card overflow-hidden rounded-[var(--radius-lg)] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-[62ch]">
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                  Free SEO assets
                </span>
                <h2
                  id="free-seo-assets-title"
                  className="mt-3 text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-fg)]"
                >
                  The guide, the checklist, and the checker that should already exist on most founder sites.
                </h2>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-[color-mix(in_srgb,var(--color-fg)_75%,transparent)]">
                  Built to earn links, help real people, and point the right kind of traffic back into the pages that actually make money.
                </p>
              </div>

              <Link
                href="/seo-guide"
                className="inline-flex items-center gap-2 self-start rounded-md border border-[var(--color-border)] px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-fg)]"
              >
                See the full guide
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <Link
                href="/seo-guide"
                className="group rounded-lg border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_65%,transparent)] p-5 transition-colors duration-200 hover:border-[var(--color-accent)]"
              >
                <FileText className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
                <h3 className="mt-4 text-[1.05rem] font-semibold leading-[1.2] text-[var(--color-fg)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                  Free SEO guide
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.65] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
                  The long-form playbook: ranking systems, AI Overview strategy, topical authority, and the 90-day plan.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-accent)]">
                  Read the guide
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>

              <Link
                href="/seo-guide/checklist"
                className="group rounded-lg border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_65%,transparent)] p-5 transition-colors duration-200 hover:border-[var(--color-accent)]"
              >
                <FileText className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
                <h3 className="mt-4 text-[1.05rem] font-semibold leading-[1.2] text-[var(--color-fg)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                  Printable checklist
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.65] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
                  The short version for audits, redesign prep, and quick handoffs when you do not need the whole essay.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-accent)]">
                  Open checklist
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>

              <Link
                href="/seo-title-meta-checker"
                className="group rounded-lg border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_65%,transparent)] p-5 transition-colors duration-200 hover:border-[var(--color-accent)]"
              >
                <Search className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
                <h3 className="mt-4 text-[1.05rem] font-semibold leading-[1.2] text-[var(--color-fg)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                  Title + meta checker
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.65] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
                  Quick live preview for title tags and descriptions so you can fix the click problem before it becomes a ranking problem.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-accent)]">
                  Use the checker
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </section>
        <div className="px-5 pb-2 pt-10 md:px-10 md:pt-14 lg:px-16">
          <Faq
            entries={coverFaq}
            index="FAQ"
            label="Questions"
            heading="Common questions before you hire one senior engineer for the whole thing."
            sectionId="cover-faq"
          />
        </div>
        {featuredPosts.length > 0 && (
          <section className="px-5 pb-4 pt-10 md:px-10 md:pt-14 lg:px-16" aria-labelledby="from-the-blog-title">
            <div className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_70%,transparent)] p-6 md:p-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="max-w-[62ch]">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[color-mix(in_srgb,var(--color-fg)_60%,transparent)]">
                    From the blog
                  </span>
                  <h2
                    id="from-the-blog-title"
                    className="mt-3 text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--color-fg)]"
                  >
                    Fresh writing that points Google straight at your money pages.
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-[color-mix(in_srgb,var(--color-fg)_75%,transparent)]">
                    App Store shipping, AI build-outs, freelance red flags, and the exact problems your buyers are already searching.
                  </p>
                </div>

                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 self-start rounded-md border border-[var(--color-border)] px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)] transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-fg)]"
                >
                  View all posts
                </Link>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {featuredPosts.map((post) => {
                  const fm = post.frontmatter;
                  return (
                    <Link
                      key={fm.slug}
                      href={`/blog/${fm.slug}`}
                      className="group rounded-lg border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_65%,transparent)] p-5 transition-colors duration-200 hover:border-[var(--color-accent)]"
                    >
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_55%,transparent)]">
                        {PILLARS[fm.pillar].label}
                      </div>
                      <h3 className="mt-3 text-[1.05rem] font-semibold leading-[1.2] text-[var(--color-fg)] transition-colors duration-200 group-hover:text-[var(--color-accent)]">
                        {fm.title}
                      </h3>
                      <p className="mt-3 text-[13.5px] leading-[1.65] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
                        {fm.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.14em] text-[color-mix(in_srgb,var(--color-fg)_52%,transparent)]">
                        <span>{post.readingTime}</span>
                        <span className="text-[var(--color-accent)]">Read →</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </div>
      <CoverFooter />
    </article>
  );
}
