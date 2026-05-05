import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Check, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { IntakeDrawer } from "@/components/built-for-you/IntakeDrawer";
import { Faq } from "@/components/sections/Faq";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceDiscoveryLinks } from "@/components/seo/ServiceDiscoveryLinks";
import { ServiceAuditPanel } from "@/components/intake/ServiceAuditPanel";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ShipButton } from "@/components/ui/ShipButton";
import { bfyTiers } from "@/data/builtForYou";
import type { FaqItem } from "@/data/faq";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";
const GOOGLE_REVIEW_URL = "https://g.page/r/CYvDUmgOyz4qEBM/review";

export const metadata: Metadata = {
  title: "Website design and development that turns traffic into leads",
  description:
    "Custom websites from $499. Over 100 websites built solo. Connecticut-based founder-run shop with direct support, SEO basics, and no agency handoff circus.",
  alternates: { canonical: "/website-design" },
  openGraph: {
    title: "Website design and development · Publishd",
    description:
      "Conversion-focused websites from $499. 100+ websites built solo, direct founder support, SEO basics included, and launch under your domain.",
    url: "/website-design",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Publishd website design service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website design and development · Publishd",
    description:
      "Custom websites from $499. 100+ websites built solo. Direct founder support, SEO basics included, no lock-in.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

function requireTier(id: "starterSite" | "proSite" | "customSite") {
  const tier = bfyTiers.find((item) => item.id === id);
  if (!tier) {
    throw new Error(`Missing built-for-you tier: ${id}`);
  }
  return tier;
}

const siteTiers = [requireTier("starterSite"), requireTier("proSite"), requireTier("customSite")];

const websiteFaq: FaqItem[] = [
  {
    q: "Who is this for?",
    a: "Service businesses, consultants, founders, and local teams that need a website to look credible, load cleanly, and turn attention into real inquiries. If you are about to run ads, this is the page-before-the-spend move.",
  },
  {
    q: "Can you redesign an existing website instead of starting from scratch?",
    a: "Yes. Most projects start with an existing site, homepage draft, Figma, or rough brief. I can tighten messaging, simplify the page structure, rebuild the front end, or replace the whole thing if the current site is fighting you.",
  },
  {
    q: "Do you handle SEO setup?",
    a: "Yes. The Pro Site tier includes the practical SEO basics that should ship with the build: metadata, sitemap, Open Graph, internal linking structure, and analytics. If you need a bigger content or local SEO push, we scope that separately.",
  },
  {
    q: "Can you build a landing page for Google Ads?",
    a: "Yes. If you are paying for clicks, I can build the page around one offer, one audience, one CTA, and the trust signals the ad traffic needs. Send the keyword or ad angle in the kickoff form so I can line the page up with the intent.",
  },
  {
    q: "How fast can this go live?",
    a: "Starter Site is typically 3 days. Pro Site usually lands in 7–10 days. Custom Site timelines depend on scope, but you get the timeline before work starts — not after you are already emotionally committed.",
  },
  {
    q: "Do I own the site when it is done?",
    a: "Yes. Domain, code, content, accounts, analytics, forms, and assets — all yours. No subscriptions, no vendor lock-in, no weird hostage phase where you have to keep paying just to touch your own website.",
  },
];

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/website-design#service`,
  name: "Website design and development",
  serviceType: "Business website design and development",
  url: `${SITE_URL}/website-design`,
  description:
    "Publishd designs and builds conversion-focused business websites for service businesses, founders, and local brands. Direct founder support, flat-fee pricing, SEO basics included, and no lock-in.",
  provider: { "@id": `${SITE_URL}/#professional-service` },
  areaServed: [
    { "@type": "AdministrativeArea", name: "Connecticut" },
    { "@type": "Country", name: "United States" },
    "Worldwide",
  ],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "499",
    highPrice: "1999",
    offerCount: "3",
    url: `${SITE_URL}/website-design#packages`,
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: websiteFaq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const breadcrumbsLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Website design", item: `${SITE_URL}/website-design` },
  ],
};

const proofCards = [
  {
    title: "100+ websites built solo",
    body: "Not mockups. Not team-project math. Over 100 websites personally built across service businesses, product marketing, launch pages, and client rebuilds.",
    href: "/careers",
    cta: "How Publishd works",
  },
  {
    title: "Direct founder support",
    body: "You work with Daniel Castellani directly — Connecticut-based, Amazon alumni, response target under 6 business hours.",
    href: "/about",
    cta: "About Daniel",
  },
  {
    title: "Public trust, not mystery trust",
    body: "Flat fee, launched under your domain, plus public review profiles and real shipped work instead of generic agency chest-beating.",
    href: GOOGLE_REVIEW_URL,
    cta: "Read Google reviews",
    external: true,
  },
] as const;

const benefitCards = [
  {
    title: "A sharper offer, not just nicer pixels",
    body: "We shape the page around one service, one audience, and one next step — so the design helps the sale instead of decorating confusion.",
    bullets: ["Clear headline + pricing anchor", "CTA placement that makes sense", "Copy structure built for skimming"],
    icon: Sparkles,
  },
  {
    title: "Conversion plumbing built in",
    body: "Forms, analytics, mobile polish, metadata, sitemap, Open Graph, and the practical things that should not be afterthoughts.",
    bullets: ["Contact flow that actually works", "SEO basics shipped from day one", "Analytics ready when traffic lands"],
    icon: ShieldCheck,
  },
  {
    title: "No agency maze",
    body: "No account manager, no designer-to-dev relay race, no mystery handoff. One senior engineer, start to finish.",
    bullets: ["Launch under your domain", "You own the stack", "Straight answers when scope changes"],
    icon: MapPin,
  },
] as const;

const steps = [
  {
    n: "01",
    title: "Send the site, brief, or ad angle",
    body: "Drop your current URL, rough copy, or the keyword you want to target. If you are running ads, I want the intent upfront.",
  },
  {
    n: "02",
    title: "Get scope and page direction",
    body: "I come back with the recommended tier, the page structure, and where the offer should tighten before build starts.",
  },
  {
    n: "03",
    title: "Design, build, refine",
    body: "I handle the build, polish the mobile view, wire the contact flow, and keep you posted instead of vanishing for a week.",
  },
  {
    n: "04",
    title: "Launch and handoff",
    body: "We ship it on your domain, connect analytics, and hand over the code, assets, and accounts with no lock-in nonsense.",
  },
] as const;

export default function WebsiteDesignPage() {
  return (
    <article className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Script id="ld-website-design-service" type="application/ld+json">
        {JSON.stringify(serviceLd)}
      </Script>
      <Script id="ld-website-design-faq" type="application/ld+json">
        {JSON.stringify(faqLd)}
      </Script>
      <Script id="ld-website-design-breadcrumbs" type="application/ld+json">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <section className="container-x">
        <div className="max-w-[72ch]">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Website design" }]}
            className="mb-6"
          />
          <SectionLabel index="WEB" label="Website design" />
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_72%,transparent)] px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
            <MapPin className="h-3.5 w-3.5 text-[var(--color-accent)]" aria-hidden="true" />
            Connecticut-based · serving businesses nationwide
          </div>

          <h1 className="mt-6 max-w-[13ch] text-balance text-[clamp(2.4rem,7vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
            Website design that turns traffic into leads.
          </h1>

          <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_80%,transparent)]">
            If you are about to pay for clicks, the page on the other end has to do more than look respectable. It needs a clear offer, proof that you are real, sensible pricing, and a contact path that does not feel like a trap. That is the kind of site I build — over 100 websites shipped solo, direct founder support, flat fee, and launch under your accounts.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ShipButton href="/kickoff" size="large">
              Get a scoped quote
              <ArrowRight className="icon h-4 w-4" aria-hidden="true" />
            </ShipButton>
            <Link href="/built-for-you#sites" className="btn btn--glass inline-flex items-center px-5 py-3 text-[14px]">
              See all build tiers
            </Link>
          </div>

          <p className="mt-4 text-[13px] leading-relaxed text-[var(--color-muted)]">
            Want the DIY version first? Read the free{' '}
            <Link href="/seo-guide" className="text-[var(--color-accent)] underline underline-offset-4">
              SEO guide
            </Link>{' '}
            , skim the{' '}
            <Link href="/seo-guide/checklist" className="text-[var(--color-accent)] underline underline-offset-4">
              checklist
            </Link>{' '}
            , or test the snippet in the{' '}
            <Link href="/seo-title-meta-checker" className="text-[var(--color-accent)] underline underline-offset-4">
              title + meta checker
            </Link>
            .
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Websites built", "100+ solo-shipped"],
              ["Reply target", "< 6 business hours"],
              ["Ownership", "100% yours"],
              ["Starting point", "From $499 flat"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_72%,transparent)] px-4 py-4"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">{label}</div>
                <div className="mt-2 text-[15px] font-medium text-[var(--color-fg)]">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x mt-16 md:mt-20">
        <div className="grid gap-4 lg:grid-cols-3">
          {proofCards.map((card) => (
            <ProofCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="container-x mt-20 md:mt-24">
        <div className="max-w-[70ch]">
          <SectionLabel index="01" label="Why this works" />
          <h2 className="mt-4 max-w-[18ch] text-balance text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Not just a prettier site. A better sales surface.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
            The good part of those ad-first landing pages is not the hype. It is the clarity: one service, one buyer, one CTA, and enough trust to make the click feel safe. That is the part worth stealing.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {benefitCards.map((card) => (
            <BenefitCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section id="packages" className="container-x mt-20 md:mt-24">
        <div className="max-w-[72ch]">
          <SectionLabel index="02" label="Packages" />
          <h2 className="mt-4 text-balance text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Website packages with real scope and visible pricing.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
            Good for organic traffic, even better for ads. Give people a believable starting point and a clear path forward instead of making them guess whether the project starts at $900 or $90,000.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {siteTiers.map((tier) => (
            <PackageCard key={tier.id} tier={tier} />
          ))}
        </div>
      </section>

      <section className="container-x mt-20 md:mt-24">
        <div className="max-w-[70ch]">
          <SectionLabel index="03" label="What happens next" />
          <h2 className="mt-4 max-w-[18ch] text-balance text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            The process stays simple on purpose.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
            No agency theatre. No wandering roadmap deck. Just enough structure to get the offer right, build the page, and launch it cleanly.
          </p>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <li key={step.n}>
              <StepCard {...step} />
            </li>
          ))}
        </ol>

        <p className="mt-6 text-[13.5px] leading-relaxed text-[var(--color-muted)]">
          Running ads? Put the keyword, campaign angle, or competitor you are reacting to in the kickoff form. I will line the page up with the intent so you are not paying to send people into a vague brochure.
        </p>
      </section>

      <section className="mt-20 md:mt-24">
        <Faq
          sectionId="website-design-faq"
          index="04"
          label="FAQ"
          heading="Website build questions people ask before they spend money."
          entries={websiteFaq}
        />
      </section>

      <section className="container-x mt-20 md:mt-24">
        <ServiceDiscoveryLinks current="website-design" />
      </section>

      <section className="mt-20 md:mt-24">
        <ServiceAuditPanel
          index="05"
          label="Free website audit"
          title="Want a free website audit before you buy the traffic?"
          description="Send your current site, rough landing page, or the keyword you want to bid on. I will tell you where the page is losing trust, where the offer is muddy, and what I would tighten before you spend on clicks."
          scope="website-audit"
          source="website-audit"
          note="Please audit my current website or landing page. URL: "
          buttonLabel="Get free website audit"
          emailSubject="Free website audit"
          footnote="Free review · reply within 6 business hours · email or form both work · no spam"
        />
      </section>

      <IntakeDrawer />
    </article>
  );
}

function ProofCard({
  title,
  body,
  href,
  cta,
  external,
}: {
  title: string;
  body: string;
  href: string;
  cta: string;
  external?: boolean;
}) {
  const classes =
    "group flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_74%,transparent)] p-6 transition-colors hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))]";

  const content = (
    <>
      <div className="mono-label">[ proof ]</div>
      <h3 className="mt-4 text-[20px] font-semibold leading-[1.15] text-[var(--color-fg)]">{title}</h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_74%,transparent)]">
        {body}
      </p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[12.5px] font-semibold text-[var(--color-accent)]">
        {cta}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

function BenefitCard({
  title,
  body,
  bullets,
  icon: Icon,
}: {
  title: string;
  body: string;
  bullets: readonly string[];
  icon: typeof Sparkles;
}) {
  return (
    <article className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_74%,transparent)] p-6">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--color-accent)_35%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] text-[var(--color-accent)]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-[20px] font-semibold leading-[1.15] text-[var(--color-fg)]">{title}</h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_74%,transparent)]">
        {body}
      </p>
      <ul className="mt-5 space-y-2">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-[var(--color-muted)]">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function PackageCard({ tier }: { tier: (typeof siteTiers)[number] }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-[var(--radius-lg)] border p-6 transition-colors ${
        tier.featured
          ? "border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_7%,var(--color-ink))]"
          : "border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_74%,transparent)]"
      }`}
    >
      {tier.featured && (
        <span className="absolute -top-2.5 left-4 rounded-full bg-[var(--color-accent)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#001018]">
          Most popular
        </span>
      )}

      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">[ package ]</div>
      <h3 className="mt-4 text-[22px] font-semibold leading-tight text-[var(--color-fg)]">{tier.name}</h3>
      <div className="mt-3 flex items-end gap-2">
        <span className="num text-[30px] font-semibold tracking-tight text-[var(--color-fg)]">${tier.price}</span>
        <span className="pb-1 text-[12px] uppercase tracking-[0.12em] text-[var(--color-muted)]">one-time</span>
      </div>
      <p className="mt-3 text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_74%,transparent)]">
        {tier.summary}
      </p>

      <ul className="mt-5 space-y-2">
        {tier.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-[var(--color-muted)]">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {tier.trustNote && (
        <p className="mt-5 rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--color-accent)_20%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent)_7%,transparent)] px-3.5 py-3 text-[12.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
          {tier.trustNote}
        </p>
      )}

      <Link
        href="/kickoff"
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-md px-4 py-3 text-[12.5px] font-semibold transition-colors ${
          tier.featured
            ? "border border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] text-[var(--color-accent)] hover:bg-[color-mix(in_srgb,var(--color-accent)_20%,transparent)]"
            : "border border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        }`}
      >
        {tier.cta ?? "Start my site"}
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </article>
  );
}

function StepCard({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <article className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_74%,transparent)] p-6">
      <span className="num inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--color-accent)_35%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] text-[15px] font-semibold text-[var(--color-accent)]">
        {n}
      </span>
      <h3 className="mt-5 text-[19px] font-semibold leading-[1.15] text-[var(--color-fg)]">{title}</h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_74%,transparent)]">
        {body}
      </p>
    </article>
  );
}