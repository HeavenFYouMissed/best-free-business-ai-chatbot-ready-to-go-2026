import type { Metadata } from "next";
import Script from "next/script";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ShipButton } from "@/components/ui/ShipButton";
import { PillarFilter } from "@/components/blog/PillarFilter";
import { getAllPosts } from "@/lib/blog";
import { PILLARS, PILLAR_ORDER } from "@/lib/blog-pillars";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";

export const metadata: Metadata = {
  title: "Blog — App shipping, AI integration, freelance know-how",
  description:
    "Tactical writing on shipping web apps to the App Store and Google Play, building with Lovable / Bolt / v0, adding AI to existing products, and hiring a freelancer who actually ships.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  openGraph: {
    title: "Publishd Blog — Ship apps, build smarter, add AI",
    description:
      "Direct, tactical writing from Daniel Castellani on shipping apps, building with AI tools, and hiring developers who ship.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publishd Blog",
    description: "Tactical writing on app shipping, AI integration, and freelance trust.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = posts[0];

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "Publishd Blog",
    url: `${SITE_URL}/blog`,
    description:
      "Tactical writing from Daniel Castellani on app shipping, web app development, AI integration, and hiring freelancers who actually ship.",
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    blogPost: posts.slice(0, 10).map((p) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${p.frontmatter.slug}#article`,
      headline: p.frontmatter.title,
      url: `${SITE_URL}/blog/${p.frontmatter.slug}`,
      datePublished: p.frontmatter.date,
      dateModified: p.frontmatter.updated ?? p.frontmatter.date,
      author: { "@type": "Person", name: p.frontmatter.author },
    })),
  };

  return (
    <article className="container-x py-14 md:py-20">
      <Script id="ld-blog" type="application/ld+json">
        {JSON.stringify(blogLd)}
      </Script>

      <header className="max-w-[60ch]">
        <SectionLabel index="LOG" label="Blog" />
        <h1 className="mt-5 text-balance text-[clamp(2.4rem,7vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
          Notes from shipping <span className="text-[var(--color-accent)]">11+ apps</span>.
        </h1>
        <p className="mt-5 text-[16.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]">
          No hype, no listicles. Just what I learned getting real apps through Apple and Google review, building with
          AI tools that ship, and running a freelance shop people actually trust.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <ShipButton href="/kickoff">Start a kickoff →</ShipButton>
          <Link
            href="/pricing"
            className="text-[13px] uppercase tracking-[0.16em] text-[var(--color-muted)] hover:text-[var(--color-fg)]"
          >
            See pricing
          </Link>
        </div>
      </header>

      {featured && (
        <section aria-label="Featured post" className="mt-14">
          <Link
            href={`/blog/${featured.frontmatter.slug}`}
            className="glass-card relative grid overflow-hidden rounded-[var(--radius-lg)] p-7 md:p-9 lg:grid-cols-[1.2fr_1fr] lg:gap-10"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                <span className="text-[var(--color-accent)]">Latest</span>
                <span aria-hidden>·</span>
                <span className="num text-[var(--color-subtle)]">{featured.readingTime}</span>
              </div>
              <h2 className="text-[clamp(1.6rem,3.6vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--color-fg)]">
                {featured.frontmatter.title}
              </h2>
              <p className="max-w-[58ch] text-[15.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_75%,transparent)]">
                {featured.frontmatter.description}
              </p>
              <span className="mt-2 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                Read the post →
              </span>
            </div>
            <div className="hidden lg:block">
              <div
                aria-hidden
                className="grid h-full place-items-center rounded-[var(--radius-md)] border border-[var(--color-border)]"
                style={{
                  background:
                    "radial-gradient(120% 100% at 30% 20%, color-mix(in srgb, var(--color-accent) 22%, transparent), transparent 60%), color-mix(in srgb, var(--color-ink) 80%, transparent)",
                }}
              >
                <span className="num text-[12px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
                  {PILLARS[featured.frontmatter.pillar].label}
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      <section aria-label="All posts" className="mt-16">
        <div className="mb-6">
          <h2 className="text-[clamp(1.05rem,1.8vw,1.2rem)] font-semibold uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_58%,var(--color-muted))]">
            All posts
          </h2>
        </div>
        <PillarFilter posts={posts} />
      </section>

      <section aria-label="Pillars" className="mt-20">
        <h2 className="text-[clamp(1.05rem,1.8vw,1.2rem)] font-semibold uppercase tracking-[0.18em] text-[color-mix(in_srgb,var(--color-fg)_58%,var(--color-muted))]">
          Pillars
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PILLAR_ORDER.map((slug) => {
            const meta = PILLARS[slug];
            return (
              <div
                key={slug}
                className="glass-card relative overflow-hidden rounded-[var(--radius-md)] p-5"
              >
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  <span
                    aria-hidden
                    className="block h-1.5 w-1.5 rounded-full"
                    style={{ background: meta.accent, boxShadow: `0 0 8px ${meta.accent}` }}
                  />
                  {meta.label}
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_75%,transparent)]">
                  {meta.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </article>
  );
}
