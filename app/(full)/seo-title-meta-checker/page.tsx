import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight } from "lucide-react";
import { SerpSnippetTool } from "@/components/seo/SerpSnippetTool";
import { SectionLabel } from "@/components/ui/SectionLabel";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";
const PAGE_URL = `${SITE_URL}/seo-title-meta-checker`;

export const metadata: Metadata = {
  title: "SEO title and meta checker — free SERP snippet preview",
  description:
    "Free SEO title and meta description checker with a live SERP-style preview. Use it to tighten CTR before you publish.",
  alternates: { canonical: "/seo-title-meta-checker" },
  openGraph: {
    title: "SEO title and meta checker — free SERP snippet preview · Publishd",
    description:
      "Preview your title tag and meta description before publishing. Free tool for founders and small business sites.",
    url: PAGE_URL,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO title and meta checker · Publishd",
    description: "Free SERP snippet preview tool for titles and meta descriptions.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function SeoTitleMetaCheckerPage() {
  const softwareLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Publishd SEO title and meta checker",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    url: PAGE_URL,
    description:
      "Free web app that previews an SEO title tag and meta description in a search-result style layout.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "SEO title and meta checker", item: PAGE_URL },
    ],
  };

  return (
    <article className="container-x py-14 md:py-20">
      <Script id="ld-seo-title-meta-checker" type="application/ld+json">
        {JSON.stringify(softwareLd)}
      </Script>
      <Script id="ld-seo-title-meta-checker-breadcrumbs" type="application/ld+json">
        {JSON.stringify(breadcrumbLd)}
      </Script>

      <header className="max-w-[64ch]">
        <SectionLabel index="SEO" label="Checker" />
        <h1 className="mt-5 text-balance text-[clamp(2.2rem,6vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
          SEO title and meta checker with a live preview.
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]">
          A fast way to catch the easy CTR mistakes before they go live: title tags that run too long, descriptions that hide the payoff, and snippets that read like placeholders instead of reasons to click.
        </p>
        <p className="mt-3 max-w-[56ch] text-[14px] leading-relaxed text-[var(--color-muted)]">
          Paste a draft, watch the preview update, then use the fix list to decide what to tighten first. This works best for blog posts, service pages, and landing pages.
        </p>
        <div className="mt-7 flex flex-wrap gap-3 text-[13px]">
          <Link href="/seo-guide" className="btn btn--primary">
            Read the free SEO guide
            <ArrowRight className="icon" aria-hidden="true" />
          </Link>
          <Link href="/seo-guide/checklist" className="btn btn--glass">
            Open the checklist
          </Link>
        </div>
      </header>

      <section className="mt-12">
        <SerpSnippetTool />
      </section>

      <section className="glass-card mt-12 rounded-[var(--radius-lg)] p-6 md:p-7">
        <div className="mono-label">[ when to use it ]</div>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div>
            <h2 className="text-[1.05rem] font-semibold text-[var(--color-fg)]">Before publishing a post</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
              Tighten the title, make the description specific, and avoid pushing the actual benefit out of view.
            </p>
          </div>
          <div>
            <h2 className="text-[1.05rem] font-semibold text-[var(--color-fg)]">When pages get impressions but not clicks</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
              Usually the ranking is not the first problem. The snippet is. Rewrite the headline before you rewrite the whole page.
            </p>
          </div>
          <div>
            <h2 className="text-[1.05rem] font-semibold text-[var(--color-fg)]">When you are cleaning up service pages</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
              Service pages tend to drift into vague language. This makes the message sharp enough to win the click.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
