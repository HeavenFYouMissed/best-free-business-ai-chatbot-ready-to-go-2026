import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, CheckSquare, Download } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PrintChecklistButton } from "@/components/seo/PrintChecklistButton";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";

const sections = [
  {
    title: "Technical SEO",
    intro: "The site has to be crawlable, stable, fast enough, and structurally sane before content helps.",
    items: [
      "HTTPS enabled",
      "Mobile-responsive on a real phone",
      "Core Web Vitals marked Good in Search Console",
      "XML sitemap submitted",
      "robots.txt not blocking JS/CSS",
      "Homepage schema markup in place",
      "Key page-type schema markup in place",
      "Canonical tags set correctly",
      "No broken internal links",
      "No orphan pages",
    ],
  },
  {
    title: "Content SEO",
    intro: "This is the publishing layer — topic clustering, internal links, and page structure that earns passage-level visibility.",
    items: [
      "Topical map documented",
      "Pillar page exists",
      "At least 8 cluster posts published",
      "Cluster posts link back to pillar and to each other",
      "Title tags written for clicks, not just keywords",
      "Meta descriptions written like ad copy",
      "Passage-indexing structure used throughout",
      "Author bios on every post",
    ],
  },
  {
    title: "Authority + Behavioral",
    intro: "These are the trust and demand signals that compound once the site basics are no longer fighting you.",
    items: [
      "Google Business Profile claimed if relevant",
      "Listed on Wikidata",
      "Consistent business info across directories",
      "At least 5 real backlinks",
      "People search your brand by name",
      "Direct traffic source exists (email, social, community, etc.)",
    ],
  },
] as const;

export const metadata: Metadata = {
  title: "SEO checklist — printable 24-point audit",
  description:
    "A printable 24-point SEO audit checklist for founders, indie hackers, and small business sites. Free companion to the full Publishd SEO guide.",
  alternates: { canonical: "/seo-guide/checklist" },
  openGraph: {
    title: "SEO checklist — printable 24-point audit · Publishd",
    description:
      "Free printable SEO audit checklist covering technical, content, and authority signals.",
    url: `${SITE_URL}/seo-guide/checklist`,
    type: "article",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SEO checklist — printable 24-point audit · Publishd",
    description:
      "Free printable SEO checklist for founders and small business sites.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function SeoGuideChecklistPage() {
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "SEO checklist — printable 24-point audit",
    url: `${SITE_URL}/seo-guide/checklist`,
    description:
      "Printable SEO audit checklist covering technical SEO, content SEO, and authority signals.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/blog/seo-guide#article` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "SEO guide", item: `${SITE_URL}/blog/seo-guide` },
      { "@type": "ListItem", position: 3, name: "Checklist", item: `${SITE_URL}/seo-guide/checklist` },
    ],
  };

  return (
    <article className="container-tight py-14 md:py-20">
      <Script id="ld-seo-guide-checklist" type="application/ld+json">
        {JSON.stringify(pageLd)}
      </Script>
      <Script id="ld-seo-guide-checklist-breadcrumbs" type="application/ld+json">
        {JSON.stringify(breadcrumbLd)}
      </Script>

      <nav aria-label="Breadcrumb" className="mb-8 text-[12px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
        <Link href="/seo-guide" className="hover:text-[var(--color-fg)]">
          ← Back to the full guide
        </Link>
      </nav>

      <header className="max-w-[60ch]">
        <SectionLabel index="CHK" label="SEO checklist" />
        <h1 className="mt-5 text-balance text-[clamp(2.1rem,5.5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
          Printable 24-point SEO audit checklist.
        </h1>
        <p className="mt-5 text-[16px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]">
          The short version of the full guide. Print it, save it, hand it to a teammate, or use it before you touch a redesign.
        </p>

        <div className="mt-7 flex flex-wrap gap-3 print:hidden">
          <a
            href="/downloads/publishd-seo-audit-checklist.md"
            download
            className="btn btn--primary"
          >
            <Download className="icon" aria-hidden="true" />
            Download Markdown copy
          </a>
          <PrintChecklistButton />
          <Link href="/kickoff" className="btn btn--ghost">
            Want me to do it instead?
            <ArrowRight className="icon" aria-hidden="true" />
          </Link>
        </div>
      </header>

      <section className="mt-12 space-y-6 print:mt-8">
        {sections.map((section) => (
          <section key={section.title} className="glass-card rounded-[var(--radius-lg)] p-6 md:p-7 print:border print:border-black/15 print:bg-white print:text-black print:shadow-none">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)] print:text-black/65">
              {section.title}
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_74%,transparent)] print:text-black/80">
              {section.intro}
            </p>
            <ul className="mt-5 space-y-3">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14.5px] leading-relaxed text-[var(--color-fg)] print:text-black">
                  <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent)] print:text-black" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>

      <section className="glass-card mt-12 rounded-[var(--radius-lg)] p-6 md:p-7 print:hidden">
        <div className="mono-label">[ next ]</div>
        <h2 className="mt-4 text-[clamp(1.35rem,3vw,2rem)] font-semibold leading-[1.06] tracking-[-0.025em]">
          Want the full playbook behind the checklist?
        </h2>
        <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
          Read the full guide if you want the why behind each item, the Google leak context, the AI Overview angle, and the 90-day execution plan.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/seo-guide" className="btn btn--primary">
            Read the full SEO guide
            <ArrowRight className="icon" aria-hidden="true" />
          </Link>
          <Link href="/website-design" className="btn btn--glass">
            See the website service
          </Link>
        </div>
      </section>
    </article>
  );
}
