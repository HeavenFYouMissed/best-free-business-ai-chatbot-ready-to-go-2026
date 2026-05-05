import stripePricesJson from "./stripe-prices.json";
import type { Tier } from "./tiers";

export type BfyId =
  | "starterSite"
  | "proSite"
  | "customSite"
  | "chatbotInstall"
  | "chatbotPro"
  | "appPolish"
  | "resubmitAddon";

type StripePrices = {
  prices: Record<string, { priceId?: string } | undefined>;
};

const stripePrices = (stripePricesJson as StripePrices).prices ?? {};

/**
 * Built-For-You catalog — site builds, chatbots, app polish. Reuses the same
 * `Tier` shape as the core submission tiers so everything flows through the
 * existing `TierCard` + `/api/checkout` plumbing.
 *
 * `customSite` has no `priceId` on purpose — its CTA opens the intake drawer
 * for a scoped quote. `resubmitAddon` is rendered as an inline toggle inside
 * the Polish card, not a standalone card; when toggled on the checkout route
 * appends it as a second line item via the `addons` param.
 */
export const bfyTiers: Tier[] = [
  {
    id: "starterSite",
    name: "Starter Site",
    price: 499,
    interval: "once",
    summary: "A basic site that looks premium from simplicity. We work together start to finish.",
    cta: "Start my site",
    trustNote: "I'll generate or source anything you don't have. No 'bring your own illustrations.'",
    bullets: [
      "Premium look from simplicity — nothing filler",
      "We work together on copy, structure, assets",
      "I'll generate visuals if you don't have them",
      "Mobile responsive, deploy to your domain",
      "1 round of revisions",
    ],
  },
  {
    id: "proSite",
    name: "Pro Site",
    price: 999,
    interval: "once",
    featured: true,
    summary: "Multi-page site with real functionality. I stay on until you say it's done.",
    cta: "Build my site",
    trustNote: "Weekly updates. Direct line. No account manager between us.",
    bullets: [
      "Up to 5 pages, scaled to your content",
      "Custom domain + deploy under your account",
      "Contact form + email forwarding",
      "SEO setup (meta, sitemap, OG)",
      "Blog-ready if you want one",
      "Analytics integration",
      "2 rounds of revisions",
      "7–10 day turnaround",
    ],
  },
  {
    id: "customSite",
    name: "Custom Site",
    price: 1999,
    interval: "once",
    summary: "Whatever you need. We scope it together, quote before build.",
    cta: "Discuss scope",
    trustNote: "Scoped + quoted upfront. No surprise invoices, no nickel-and-dime.",
    bullets: [
      "Unlimited pages within scope",
      "Custom animations + interactions",
      "E-commerce / Stripe integration",
      "CMS integration (Sanity, Contentful, Notion)",
      "Chatbot integration option",
      "We build the scope together",
    ],
  },
  {
    id: "chatbotInstall",
    name: "Chatbot Install",
    price: 399,
    interval: "once",
    summary: "A trained chatbot on your site — tuned on your real docs.",
    cta: "Install chatbot",
    trustNote: "I tune it on your actual docs, not a template. You approve the voice.",
    bullets: [
      "Claude or GPT (your choice)",
      "Trained on your FAQs, pricing, policies",
      "Custom system prompt in your brand voice",
      "Email capture when conversations get serious",
      "Transcripts forwarded to your inbox",
      "Embed code, one tag to install",
      "2-week delivery",
      "BYO API key, or $50 credit included",
    ],
  },
  {
    id: "chatbotPro",
    name: "Chatbot Pro",
    price: 799,
    interval: "once",
    featured: true,
    summary: "A chatbot that takes action — books, routes, integrates.",
    cta: "Install pro chatbot",
    trustNote: "60 days of tuning because chatbots only get good in production.",
    bullets: [
      "Everything in Install",
      "Calendar · Stripe · Shopify · CRM",
      "Books appointments, routes leads, processes orders",
      "Custom knowledge base from your docs",
      "A/B-tested system prompts",
      "60 days of tuning included",
    ],
  },
  {
    id: "appPolish",
    name: "App Polish",
    price: 199,
    interval: "once",
    summary: "Icon, screenshots, store copy — all redone until you love it.",
    cta: "Polish my app",
    trustNote: "Icon, copy, shots — I iterate until you love it. Not until I'm bored.",
    bullets: [
      "Custom icon redesign",
      "6 marketing screenshots + copy",
      "App Store description rewrite",
      "Keyword research + ASO",
      "Category recommendation",
      "2–3 day turnaround",
    ],
  },
  {
    id: "resubmitAddon",
    name: "Resubmit add-on",
    price: 99,
    interval: "once",
    summary: "I resubmit the polished app to the store — under your account, one appeal included.",
    bullets: ["Submit under your account", "One rejection appeal included"],
  },
];

for (const t of bfyTiers) {
  const id = stripePrices[t.id]?.priceId;
  if (id) t.priceId = id;
}

export const SITE_TIERS: BfyId[] = ["starterSite", "proSite", "customSite"];
export const CHATBOT_TIERS: BfyId[] = ["chatbotInstall", "chatbotPro"];
export const POLISH_TIER: BfyId = "appPolish";
export const RESUBMIT_ADDON: BfyId = "resubmitAddon";

export function bfyTier(id: BfyId): Tier {
  const t = bfyTiers.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown BFY tier: ${id}`);
  return t;
}
