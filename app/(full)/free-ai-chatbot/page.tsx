import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ArrowRight, Check, Download, ExternalLink, Github, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceDiscoveryLinks } from "@/components/seo/ServiceDiscoveryLinks";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ShipButton } from "@/components/ui/ShipButton";
import { Faq } from "@/components/sections/Faq";
import type { FaqItem } from "@/data/faq";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://publishd.app";
const VERSION = "1.0.0";
const ZIP_HREF = `/downloads/publishd-chatbot-v${VERSION}.zip`;
const REPO_URL = "https://github.com/HeavenFYouMissed/best-free-business-ai-chatbot-ready-to-go-2026";
const LIVE_DEMO = "/chat-demo.html";

export const metadata: Metadata = {
  title: "Free AI chatbot for business websites — drop-in widget (2026)",
  description:
    "Free, MIT-licensed AI chatbot you can drop on any business website. Single HTML file, streaming Groq replies, server-held key, iPhone-framed UI. Download the v1.0 kit or fork the repo.",
  keywords: [
    "free AI chatbot",
    "free chatbot for business website",
    "AI chatbot widget",
    "open source chatbot",
    "Groq chatbot",
    "embed AI chatbot",
    "chatbot HTML widget",
    "free business chatbot 2026",
  ],
  alternates: { canonical: "/free-ai-chatbot" },
  openGraph: {
    title: "Free AI chatbot for business websites · Publishd",
    description:
      "Drop-in MIT-licensed AI chatbot. Single HTML file, streaming Groq, server-held key. Download v1.0 or live demo.",
    url: `${SITE_URL}/free-ai-chatbot`,
    type: "website",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "Publishd free AI chatbot kit" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI chatbot for business websites · Publishd",
    description:
      "Drop-in MIT-licensed AI chatbot. Single HTML file, streaming Groq, server-held key.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

const faq: FaqItem[] = [
  {
    q: "Is it really free?",
    a: "Yes. MIT licensed, no usage cap, no branding, no telemetry. Inference uses your own free Groq API key. Hosting is your own (Cloudflare's free Worker tier handles a small business site easily).",
  },
  {
    q: "Where does the API key live?",
    a: "Server-side only. The HTML widget POSTs to /api/chat on your server, and the Groq key is read from process.env.GROQ_API_KEY there. Visitors never see or paste anything. The kit ships with a ready-made API route you drop into a Next.js project.",
  },
  {
    q: "Can I use it on a non-Next.js site?",
    a: "Yes. The widget is one .html file you can host on GitHub Pages, Netlify, S3, plain Apache, or even WordPress static. You only need a small server somewhere to run the /api/chat proxy — Cloudflare Workers, Vercel functions, Express, Hono, or anything that can stream a response.",
  },
  {
    q: "How do I add my own knowledge (RAG)?",
    a: "The default route uses a single system prompt — write your business facts in api/system-prompt.ts. For larger knowledge bases, embed your docs (pgvector, Cloudflare Vectorize, Pinecone), retrieve top-k chunks per request, and prepend them as a system message before the model call. Notes in docs/chat-widget-setup.md.",
  },
  {
    q: "What if I want the install + customization done for me?",
    a: "That is what /ai-chatbots is for — flat-fee $399 (Install) or $799 (Pro: integrations, RAG, CRM hand-off). Same engineer who maintains this kit installs it on your domain in about 2 weeks.",
  },
  {
    q: "Why Groq instead of OpenAI / Anthropic?",
    a: "Groq has a real free tier (no card required), is fast enough that streaming feels instant, and the API mirrors OpenAI's. Swap the client in the route file if you want a different provider — the rest of the widget does not care.",
  },
];

const benefits = [
  {
    icon: Download,
    title: "One HTML file",
    body: "Drop chat-demo.html on any host. No bundler, no React, no framework. The iPhone bezel is embedded as base64 — true single-file delivery.",
  },
  {
    icon: Sparkles,
    title: "Streaming, server-held key",
    body: "Tokens stream straight from Groq through your /api/chat proxy. The HTML file contains zero secrets — your API key never touches the browser.",
  },
  {
    icon: Github,
    title: "MIT, fork it, own it",
    body: "Public GitHub repo. No usage cap, no telemetry, no upsell modal. Fork, rename, restyle, ship under your brand.",
  },
] as const;

const steps = [
  {
    n: "01",
    title: "Download the v1.0 kit",
    body: "Grab the zip below. It contains the widget, a Next.js-ready API route, system-prompt template, .env.example, and the MIT license — about 70 KB total.",
  },
  {
    n: "02",
    title: "Drop it into your project",
    body: "Copy chat-demo.html into public/. Copy api/chat.ts → app/api/chat/route.ts and api/system-prompt.ts next to it. Edit the system prompt with your business facts (prices, hours, links).",
  },
  {
    n: "03",
    title: "Add a free Groq key",
    body: "Create one at console.groq.com and put it in .env.local as GROQ_API_KEY. Do not commit it. Same key works in production once you set it on your host.",
  },
  {
    n: "04",
    title: "Run npm run dev",
    body: "Open /chat-demo.html. Streaming replies, no key prompts. When you ship to production, the widget auto-uses same-origin /api/chat — no CORS wiring needed.",
  },
] as const;

const breadcrumbsLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Free AI chatbot", item: `${SITE_URL}/free-ai-chatbot` },
  ],
};

const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Publishd Chatbot Kit",
  alternateName: "Free AI chatbot for business websites",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Chatbot",
  operatingSystem: "Any (browser + Node.js server)",
  url: `${SITE_URL}/free-ai-chatbot`,
  downloadUrl: `${SITE_URL}${ZIP_HREF}`,
  softwareVersion: VERSION,
  fileFormat: "application/zip",
  license: "https://opensource.org/licenses/MIT",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  author: {
    "@type": "Person",
    name: "Daniel Castellani",
    url: `${SITE_URL}/about`,
  },
  publisher: { "@id": `${SITE_URL}/#professional-service` },
  description:
    "Drop-in AI chatbot widget for any business website. Single HTML file with streaming Groq replies, server-held API key, iPhone-framed UI. MIT licensed.",
  featureList: [
    "Single-file HTML widget (no build step)",
    "Streaming responses (Server-Sent Events compatible)",
    "Server-held API key (Groq, OpenAI, Anthropic compatible)",
    "iPhone-bezel framed UI",
    "Configurable CORS for cross-origin embeds",
    "MIT license",
  ],
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FreeAiChatbotPage() {
  return (
    <article className="pb-24 pt-14 md:pb-32 md:pt-20">
      <Script id="ld-free-chatbot-software" type="application/ld+json">
        {JSON.stringify(softwareLd)}
      </Script>
      <Script id="ld-free-chatbot-faq" type="application/ld+json">
        {JSON.stringify(faqLd)}
      </Script>
      <Script id="ld-free-chatbot-breadcrumbs" type="application/ld+json">
        {JSON.stringify(breadcrumbsLd)}
      </Script>

      {/* Hero */}
      <section className="container-x">
        <div className="max-w-[78ch]">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Free AI chatbot" }]}
            className="mb-6"
          />
          <SectionLabel index="OSS" label="Free chatbot kit · v1.0" />
          <h1 className="mt-6 max-w-[16ch] text-balance text-[clamp(2.4rem,6.6vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
            The free AI chatbot for business websites.
          </h1>
          <p className="mt-6 max-w-[64ch] text-[17px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_82%,transparent)]">
            One HTML file. Streaming replies. Server-held API key. MIT-licensed. Drop it on any
            site — WordPress, Webflow, Next.js, plain Apache — and customize the system prompt with
            your prices, hours, and policies. No SaaS subscription, no usage cap, no branding.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ShipButton href={ZIP_HREF} size="large" download>
              <Download className="icon h-4 w-4" aria-hidden="true" />
              Download v{VERSION} (zip · ~70 KB)
            </ShipButton>
            <Link
              href={LIVE_DEMO}
              className="btn btn--glass inline-flex items-center gap-2 px-5 py-3 text-[14px]"
            >
              Try the live demo
              <ArrowRight className="icon h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener"
              className="btn btn--glass inline-flex items-center gap-2 px-5 py-3 text-[14px]"
            >
              <Github className="icon h-4 w-4" aria-hidden="true" />
              View on GitHub
              <ExternalLink className="icon h-3.5 w-3.5 opacity-70" aria-hidden="true" />
            </a>
          </div>

          <p className="mt-4 max-w-[58ch] text-[13px] leading-relaxed text-[var(--color-muted)]">
            Want it installed and customized for you? See{' '}
            <Link
              href="/ai-chatbots"
              className="text-[var(--color-accent)] underline underline-offset-4"
            >
              chatbot install packages
            </Link>{' '}
            — flat fee, 2-week delivery.
          </p>
        </div>
      </section>

      {/* What you get */}
      <section className="container-x mt-20 md:mt-28">
        <SectionLabel index="01" label="What's in the box" />
        <h2 className="mt-6 max-w-[20ch] text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
          A real, production widget — not a teaser.
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_72%,transparent)] p-6 transition-colors duration-200 hover:border-[color-mix(in_srgb,var(--color-accent)_45%,var(--color-border))]"
            >
              <b.icon className="h-5 w-5 text-[var(--color-accent)]" aria-hidden="true" />
              <h3 className="mt-4 text-[18px] font-semibold tracking-tight text-[var(--color-fg)]">
                {b.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="container-x mt-20 md:mt-28">
        <SectionLabel index="02" label="Install in 4 steps" />
        <h2 className="mt-6 max-w-[22ch] text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
          From zip to live chat in five minutes.
        </h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-2">
          {steps.map((s) => (
            <li
              key={s.n}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_72%,transparent)] p-6"
            >
              <div className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                {s.n}
              </div>
              <h3 className="mt-2 text-[18px] font-semibold tracking-tight text-[var(--color-fg)]">
                {s.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Embed snippet */}
      <section className="container-x mt-20 md:mt-28">
        <SectionLabel index="03" label="Embed it anywhere" />
        <h2 className="mt-6 max-w-[22ch] text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
          Hosted? One iframe.
        </h2>
        <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_75%,transparent)]">
          Don&apos;t want to host the proxy yourself? Embed the publishd.app-hosted demo on your site.
          Inference still routes through this site&apos;s server-held key.
        </p>
        <pre className="mt-6 overflow-x-auto rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,#05070d_85%,transparent)] p-5 font-mono text-[12.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_92%,transparent)]">
{`<iframe
  src="https://publishd.app/chat-demo.html"
  style="border:0;width:100%;height:760px;max-width:420px"
  title="AI chat assistant"
></iframe>`}
        </pre>
      </section>

      {/* What's included list */}
      <section className="container-x mt-20 md:mt-28">
        <SectionLabel index="04" label="Zip contents" />
        <h2 className="mt-6 max-w-[22ch] text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
          Five files. That&apos;s it.
        </h2>
        <ul className="mt-8 space-y-2 text-[14.5px]">
          {[
            ["chat-demo.html", "The widget. Drop on any static host."],
            ["api/chat.ts", "Streaming proxy — drop into Next.js as app/api/chat/route.ts."],
            ["api/system-prompt.ts", "Edit this with your business facts."],
            [".env.example", "Documents GROQ_API_KEY + optional CORS origins."],
            ["LICENSE", "MIT — fork, rename, ship under your brand."],
          ].map(([file, body]) => (
            <li
              key={file}
              className="flex items-start gap-3 rounded-md border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_60%,transparent)] px-4 py-3"
            >
              <Check
                className="mt-1 h-4 w-4 shrink-0 text-[var(--color-accent)]"
                aria-hidden="true"
              />
              <div>
                <code className="font-mono text-[13px] text-[var(--color-accent)]">{file}</code>
                <p className="mt-1 text-[13.5px] text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
                  {body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <div className="mt-20 md:mt-28">
        <Faq
          entries={faq}
          index="05"
          label="FAQ"
          heading="Common questions about the free chatbot kit."
          sectionId="chatbot-kit-faq"
        />
      </div>

      {/* Final CTA */}
      <section className="container-x mt-20 md:mt-28">
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_70%,transparent)] p-8 md:p-12">
          <SectionLabel index="GO" label="Grab the kit" />
          <h2 className="mt-6 max-w-[22ch] text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
            Ship a chatbot today.
          </h2>
          <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_75%,transparent)]">
            70 KB. MIT. Yours forever. If you want it installed instead of installed-yourself,{' '}
            <Link
              href="/ai-chatbots"
              className="text-[var(--color-accent)] underline underline-offset-4"
            >
              the install service starts at $399
            </Link>
            .
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ShipButton href={ZIP_HREF} size="large" download>
              <Download className="icon h-4 w-4" aria-hidden="true" />
              Download v{VERSION}
            </ShipButton>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener"
              className="btn btn--glass inline-flex items-center gap-2 px-5 py-3 text-[14px]"
            >
              <Github className="icon h-4 w-4" aria-hidden="true" />
              Star the repo
            </a>
          </div>
        </div>
      </section>

      <section className="container-x mt-20 md:mt-28">
        <ServiceDiscoveryLinks current="ai-chatbots" />
      </section>
    </article>
  );
}
