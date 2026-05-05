import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Bot, Check, MessagesSquare, Route } from "lucide-react";
import { IntakeDrawer } from "@/components/built-for-you/IntakeDrawer";
import { Faq } from "@/components/sections/Faq";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceDiscoveryLinks } from "@/components/seo/ServiceDiscoveryLinks";
import { ServiceAuditPanel } from "@/components/intake/ServiceAuditPanel";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ShipButton } from "@/components/ui/ShipButton";
import { CHATBOT_TIERS, bfyTier } from "@/data/builtForYou";
import type { FaqItem } from "@/data/faq";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";

export const metadata: Metadata = {
  title: "AI chatbots for your business that actually do something",
  description:
    "Custom AI chatbots from $399. Trained on your real docs, grounded in your FAQs, and built to capture leads or take action — not just say hello into the void.",
  alternates: { canonical: "/ai-chatbots" },
  openGraph: {
    title: "AI chatbots for your business · Publishd",
    description:
      "Chatbots from $399 that answer real questions, capture leads, and integrate with your business.",
    url: "/ai-chatbots",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Publishd AI chatbot service" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI chatbots for your business · Publishd",
    description:
      "Chatbots from $399 that answer real questions, capture leads, and integrate with your business.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

const chatbotTiers = CHATBOT_TIERS.map((id) => bfyTier(id));

const chatbotFaq: FaqItem[] = [
  {
    q: "What makes this different from a generic chatbot widget?",
    a: "The bot is grounded in your real pricing, policies, FAQs, and docs. The goal is not novelty — it is answering useful questions, capturing intent, and handing serious conversations to a human when that is the smarter move.",
  },
  {
    q: "Can it do more than answer questions?",
    a: "Yes. The Pro tier can route leads, book appointments, connect to tools like calendars or CRMs, and move people toward a real next step instead of leaving them in a chat cul-de-sac.",
  },
  {
    q: "Which model do you use?",
    a: "Claude or GPT — your choice. I pick based on the tone, cost, and job to be done, then tune the prompt and grounding so it sounds like your business instead of a template demo.",
  },
  {
    q: "How long does it take?",
    a: "Most chatbot installs land in about 2 weeks. Pro builds vary based on the integrations and actions involved, but you get the scope and timeline before anything starts.",
  },
  {
    q: "Do I own the chatbot and prompts?",
    a: "Yes. You own the embed, the docs, the prompt logic, the accounts, and the handoff. No lock-in, no permanent dependency on me to keep the thing alive.",
  },
  {
    q: "What if I am not sure a chatbot is even worth adding?",
    a: "That is exactly what the free audit is for. I would rather tell you not to add one than bolt a fake AI trophy to your site and call it strategy.",
  },
];

const serviceLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/ai-chatbots#service`,
  name: "AI chatbots for business websites",
  serviceType: "AI chatbot development and integration",
  url: `${SITE_URL}/ai-chatbots`,
  description:
    "Publishd builds AI chatbots for business websites that answer real questions, capture leads, and integrate with calendars, CRMs, Stripe, and Shopify.",
  provider: { "@id": `${SITE_URL}/#professional-service` },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "399",
    highPrice: "799",
    offerCount: "2",
    url: `${SITE_URL}/ai-chatbots#packages`,
  },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: chatbotFaq.map((item) => ({
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
    { "@type": "ListItem", position: 2, name: "AI chatbots", item: `${SITE_URL}/ai-chatbots` },
  ],
};

const benefitCards = [
  {
    title: "Grounded in your real docs",
    body: "FAQs, pricing, policies, service details, and actual business context — not a generic model prompt with your logo taped on.",
    bullets: ["Claude or GPT", "Grounded responses", "Brand voice tuned on purpose"],
    icon: Bot,
  },
  {
    title: "Built to move conversations forward",
    body: "The useful version of AI on a site is the one that qualifies leads, routes people correctly, and gets them to the next step without killing intent.",
    bullets: ["Lead capture", "Appointment routing", "Human handoff when needed"],
    icon: Route,
  },
  {
    title: "Actually useful in production",
    body: "Transcript forwarding, prompt tuning, integration hooks, and post-launch cleanup — because bots get weird only after real humans start using them.",
    bullets: ["Inbox-ready transcripts", "60 days tuning on Pro", "No fake demo magic"],
    icon: MessagesSquare,
  },
] as const;

const steps = [
  {
    n: "01",
    title: "Send the site and docs",
    body: "Your site, FAQs, policies, pricing, and whatever the bot needs to know to stop sounding generic.",
  },
  {
    n: "02",
    title: "Map the job to be done",
    body: "We decide whether the bot should answer, qualify, book, route, sell, or escalate. That choice matters more than the model brand name.",
  },
  {
    n: "03",
    title: "Build, tune, and install",
    body: "I wire the prompt, grounding, UI, and integrations, then install it on your site without turning the whole thing into a science project.",
  },
  {
    n: "04",
    title: "Watch real conversations and refine",
    body: "We review transcripts, tighten weak answers, and make the handoff paths cleaner once real visitors start hitting it.",
  },
] as const;

export default function AiChatbotsPage() {
  return (
    <article className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Script id="ld-ai-chatbots-service" type="application/ld+json">
        {JSON.stringify(serviceLd)}
      </Script>
      <Script id="ld-ai-chatbots-faq" type="application/ld+json">
        {JSON.stringify(faqLd)}
      </Script>
      <Script id="ld-ai-chatbots-breadcrumbs" type="application/ld+json">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      <section className="container-x">
        <div className="max-w-[72ch]">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "AI chatbots" }]}
            className="mb-6"
          />
          <SectionLabel index="BOT" label="AI chatbots" />
          <h1 className="mt-6 max-w-[13ch] text-balance text-[clamp(2.4rem,7vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
            AI chatbots that actually help your business.
          </h1>
          <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_80%,transparent)]">
            Not the hollow little bubble that says hello and wastes your buyer&apos;s time. The useful kind — trained on your real docs, tuned to your voice, and built to answer questions, capture leads, or take action when the conversation matters.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ShipButton href="/built-for-you#chatbots" size="large">
              See chatbot packages
              <ArrowRight className="icon h-4 w-4" aria-hidden="true" />
            </ShipButton>
            <Link href="/website-design" className="btn btn--glass inline-flex items-center px-5 py-3 text-[14px]">
              Pair it with a landing page
            </Link>
          </div>

          <p className="mt-4 max-w-[58ch] text-[13px] leading-relaxed text-[var(--color-muted)]">
            Before you bolt AI onto a quiet site, tighten the traffic and click problem first with the{' '}
            <Link href="/seo-guide" className="text-[var(--color-accent)] underline underline-offset-4">
              free SEO guide
            </Link>{' '}
            or the{' '}
            <Link href="/seo-title-meta-checker" className="text-[var(--color-accent)] underline underline-offset-4">
              title + meta checker
            </Link>
            .
          </p>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Starting point", "From $399 flat"],
              ["Models", "Claude or GPT"],
              ["Delivery", "About 2 weeks"],
              ["Pro tier", "Actions + integrations"],
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
            The point is not to look AI. The point is to be useful.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
            The best versions of these pages frame AI like a business tool, not a shiny gimmick. That is the lane worth borrowing: practical, grounded, and tied to a clear next step.
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
            Two ways to add a chatbot without turning your site into a toy.
          </h2>
          <p className="mt-4 max-w-[60ch] text-[15.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
            Start with answers, then add actions when the business case is there. No need to pretend every company needs a full AI concierge on day one.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {chatbotTiers.map((tier) => (
            <PackageCard key={tier.id} tier={tier} />
          ))}
        </div>
      </section>

      <section className="container-x mt-20 md:mt-24">
        <div className="max-w-[70ch]">
          <SectionLabel index="03" label="What happens next" />
          <h2 className="mt-4 max-w-[18ch] text-balance text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            Simple process. Useful result. Less fake AI theatre.
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
          sectionId="ai-chatbots-faq"
          index="04"
          label="FAQ"
          heading="AI chatbot questions people ask before they let one touch the website."
          entries={chatbotFaq}
        />
      </section>

      <section className="container-x mt-20 md:mt-24">
        <ServiceDiscoveryLinks current="ai-chatbots" />
      </section>

      <section className="mt-20 md:mt-24">
        <ServiceAuditPanel
          index="05"
          label="Free chatbot audit"
          title="Not sure if a chatbot would help or just annoy people?"
          description="Send the site, your FAQs, or the customer questions you keep answering manually. I will tell you whether a chatbot is actually worth adding, what it should do, and whether the cheaper install or the action-oriented Pro version makes more sense."
          scope="chatbot-audit"
          source="chatbot-audit"
          note="Please audit whether a chatbot makes sense for my business. Site/docs: "
          buttonLabel="Get free chatbot audit"
          emailSubject="Free chatbot audit"
          footnote="Free review · reply within 6 business hours · if a chatbot is a bad fit, I will tell you"
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
  icon: typeof Bot;
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

function PackageCard({ tier }: { tier: (typeof chatbotTiers)[number] }) {
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
        href="/built-for-you#chatbots"
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