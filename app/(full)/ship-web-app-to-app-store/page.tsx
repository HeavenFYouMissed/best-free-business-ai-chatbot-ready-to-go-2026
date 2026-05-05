import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Check, ShieldCheck, Smartphone, Store } from "lucide-react";
import { IntakeDrawer } from "@/components/built-for-you/IntakeDrawer";
import { Faq } from "@/components/sections/Faq";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceDiscoveryLinks } from "@/components/seo/ServiceDiscoveryLinks";
import { ServiceAuditPanel } from "@/components/intake/ServiceAuditPanel";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ShipButton } from "@/components/ui/ShipButton";
import type { FaqItem } from "@/data/faq";
import { tiers } from "@/data/tiers";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";

export const metadata: Metadata = {
  title: "Ship a web app to the App Store and Google Play",
  description:
    "Turn a live web URL, GitHub repo, or AI-built app into real iOS and Android store listings. Flat-fee publishing with rejection handling included.",
  keywords: [
    "ship web app to App Store",
    "web app to Google Play",
    "Lovable app App Store",
    "Bolt app Google Play",
    "wrap web app native",
    "Capacitor app submission",
    "Expo App Store submission",
    "AI app store publishing",
  ],
  alternates: { canonical: "/ship-web-app-to-app-store" },
  openGraph: {
    title: "Ship a web app to the App Store and Google Play · Publishd",
    description:
      "Flat-fee path from URL or repo to iOS and Android — with appeals and store-ready assets included.",
    url: "/ship-web-app-to-app-store",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ship a web app to the App Store and Google Play · Publishd",
    description:
      "Flat-fee publishing from URL or repo to both stores. Rejection handling included.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

function requireTier(id: "single" | "both" | "premium" | "rescue") {
  const tier = tiers.find((item) => item.id === id);
  if (!tier) {
    throw new Error(`Missing app-shipping tier: ${id}`);
  }
  return tier;
}

const shippingTiers = [requireTier("single"), requireTier("both"), requireTier("premium"), requireTier("rescue")];

const shippingFaq: FaqItem[] = [
  {
    q: "Can you work from just a live URL?",
    a: "Yes. A live URL is enough for a lot of web-to-app submissions. If I need repo access or a build export later, I will tell you early instead of halfway through pretending it is fine.",
  },
  {
    q: "Do I need a Mac?",
    a: "No. You do not need a Mac, Xcode, or local iOS tooling. I handle the build chain and submission workflow from my end.",
  },
  {
    q: "What if Apple rejects the app?",
    a: "That is part of the service. I handle reviewer feedback, appeals, and the plain-English fix list so you are not decoding policy language alone.",
  },
  {
    q: "Who owns the app and the store accounts?",
    a: "You do. The app ships under your Apple and Google accounts whenever possible, and the revenue goes directly to your accounts — not mine.",
  },
  {
    q: "What kinds of apps fit this service?",
    a: "Lovable, Bolt, v0, Cursor, Next.js, Vite, React Native, Flutter, hand-coded web apps — if it already works in the browser or is close to native-ready, I can usually ship it.",
  },
  {
    q: "What if I am not sure the app is ready to submit?",
    a: "That is what the free review is for. I can look at the live app or repo and tell you whether it is ready, what might trigger reviewer pushback, and which tier makes sense.",
  },
];

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/ship-web-app-to-app-store#service`,
  name: "Web app to App Store and Google Play submission",
  serviceType: ["App Store submission", "Google Play submission", "Mobile app wrapping"],
  url: `${SITE_URL}/ship-web-app-to-app-store`,
  description:
    "Publishd turns a live web app, GitHub repo, or AI-built app into real iOS and Android store listings with flat-fee pricing and rejection handling included.",
  provider: { "@id": `${SITE_URL}/#professional-service` },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "199",
    highPrice: "699",
    offerCount: "4",
    url: `${SITE_URL}/ship-web-app-to-app-store#packages`,
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: shippingFaq.map((item) => ({
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
    {
      "@type": "ListItem",
      position: 2,
      name: "Ship web app to App Store and Google Play",
      item: `${SITE_URL}/ship-web-app-to-app-store`,
    },
  ],
};

const benefitCards = [
  {
    title: "I handle the weird store stuff",
    body: "Certificates, provisioning, privacy forms, screenshots, metadata, review notes, and the rejection ping-pong that burns people out.",
    bullets: ["Assets included", "Privacy + listing setup", "Appeals when reviewers push back"],
    icon: Store,
  },
  {
    title: "Built for web apps and AI-built apps",
    body: "This is not just for traditional mobile teams. If the product already works in a browser or came out of Lovable, Bolt, v0, or Cursor, that is still fair game.",
    bullets: ["Live URL or repo", "Web-to-app packaging", "No fake shame about AI-built code"],
    icon: Smartphone,
  },
  {
    title: "You keep control of the launch",
    body: "Your accounts, your revenue, your ownership. The service is the shipping work, not permanent dependency on me.",
    bullets: ["Your Apple + Google accounts", "Revenue flows to you", "Clear handoff after launch"],
    icon: ShieldCheck,
  },
] as const;

const steps = [
  {
    n: "01",
    title: "Send the app, URL, or repo",
    body: "Live URL, GitHub repo, or export — whatever you have. I will tell you quickly if anything is missing before submission work starts.",
  },
  {
    n: "02",
    title: "Prep the store submission",
    body: "I package the app, generate the missing assets, handle the metadata, and line up the account-side requirements.",
  },
  {
    n: "03",
    title: "Submit and respond to review",
    body: "I send it to Apple and Google, then deal with reviewer notes or rejection language without tossing you into policy soup.",
  },
  {
    n: "04",
    title: "Go live under your accounts",
    body: "Once approved, the app is live under your accounts with the support window tied to the tier you picked.",
  },
] as const;

export default function ShipWebAppPage() {
  return (
    <article className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Script id="ld-ship-web-app-service" type="application/ld+json">
        {JSON.stringify(serviceLd)}
      </Script>
      <Script id="ld-ship-web-app-faq" type="application/ld+json">
        {JSON.stringify(faqLd)}
      </Script>
      <Script id="ld-ship-web-app-breadcrumbs" type="application/ld+json">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <section className="container-x">
        <div className="max-w-[72ch]">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "App shipping" }]}
            className="mb-6"
          />
          <SectionLabel index="APP" label="App shipping" />
          <h1 className="mt-6 max-w-[13ch] text-balance text-[clamp(2.4rem,7vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
            Ship your web app to the App Store and Google Play.
          </h1>
          <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_80%,transparent)]">
            If the product already works in a browser — or came out of Lovable, Bolt, v0, Cursor, React Native, or Flutter — the last mile is not just a button press. It is packaging, screenshots, privacy labels, review notes, certificates, and dealing with vague rejection language without losing your mind. That is the work I take off your plate.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ShipButton href="/kickoff" size="large">
              Start full kickoff
              <ArrowRight className="icon h-4 w-4" aria-hidden="true" />
            </ShipButton>
            <Link href="#packages" className="btn btn--glass inline-flex items-center px-5 py-3 text-[14px]">
              See app shipping tiers
            </Link>
          </div>

          <p className="mt-4 max-w-[58ch] text-[13px] leading-relaxed text-[var(--color-muted)]">
            Still tightening the pages that feed the launch? Use the{' '}
            <Link href="/seo-guide" className="text-[var(--color-accent)] underline underline-offset-4">
              free SEO guide
            </Link>{' '}
            , the{' '}
            <Link href="/seo-guide/checklist" className="text-[var(--color-accent)] underline underline-offset-4">
              audit checklist
            </Link>{' '}
            , or the{' '}
            <Link href="/seo-title-meta-checker" className="text-[var(--color-accent)] underline underline-offset-4">
              title + meta checker
            </Link>
            .
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Starting point", "From $199 flat"],
              ["Popular tier", "$399 both stores"],
              ["Timeline", "7–14 days typical"],
              ["Support", "Rejection handling included"],
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

      <section className="container-x mt-20 md:mt-24">
        <div className="max-w-[70ch]">
          <SectionLabel index="01" label="Why this works" />
          <h2 className="mt-4 max-w-[18ch] text-balance text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            The useful promise is simple: you built it, I get it through review.
          </h2>
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
            App shipping tiers with clear pricing and sane scope.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
            The strongest service pages show the starting point clearly. Same rule here: if you only need rescue, buy rescue. If you need both stores handled end to end, pick the tier built for that.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {shippingTiers.map((tier) => (
            <PackageCard key={tier.id} tier={tier} />
          ))}
        </div>
      </section>

      <section className="container-x mt-20 md:mt-24">
        <div className="max-w-[70ch]">
          <SectionLabel index="03" label="What happens next" />
          <h2 className="mt-4 max-w-[18ch] text-balance text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Simple process. Fewer surprises. Faster live date.
          </h2>
        </div>

        <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <li key={step.n}>
              <StepCard {...step} />
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 md:mt-24">
        <Faq
          sectionId="ship-web-app-faq"
          index="04"
          label="FAQ"
          heading="App shipping questions people ask before they trust someone with the last mile."
          entries={shippingFaq}
        />
      </section>

      <section className="container-x mt-20 md:mt-24">
        <ServiceDiscoveryLinks current="app-shipping" />
      </section>

      <section className="mt-20 md:mt-24">
        <ServiceAuditPanel
          index="05"
          label="Free app review"
          title="Not sure if your app is ready for store review yet?"
          description="Send the live app, repo, or even the rejection note if Apple already bounced it. I will tell you whether it is ready, what reviewers are likely to complain about, and which tier makes the most sense before you spend money."
          scope="app-review"
          source="app-review"
          note="Please review whether my app is ready for App Store and Google Play submission. URL or repo: "
          buttonLabel="Get free app shipping review"
          emailSubject="Free app shipping review"
          footnote="Free review · reply within 6 business hours · URL, repo, or rejection note all work"
        />
      </section>

      <IntakeDrawer />
    </article>
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
  icon: typeof Store;
}) {
  return (
    <article className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_74%,transparent)] p-6">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] border border-[color-mix(in_srgb,var(--color-accent)_35%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-accent)_10%,transparent)] text-[var(--color-accent)]">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-[20px] font-semibold leading-[1.15] text-[var(--color-fg)]">{title}</h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_74%,transparent)]">{body}</p>
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

function PackageCard({ tier }: { tier: (typeof shippingTiers)[number] }) {
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
        <span className="pb-1 text-[12px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
          {tier.interval === "month" ? "/mo" : "one-time"}
        </span>
      </div>
      <p className="mt-3 text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_74%,transparent)]">{tier.summary}</p>
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
        {tier.cta ?? "Start"}
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
      <p className="mt-3 text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_74%,transparent)]">{body}</p>
    </article>
  );
}
