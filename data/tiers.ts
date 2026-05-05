import stripePricesJson from "./stripe-prices.json";

export type TierId =
  | "coaching"
  | "single"
  | "both"
  | "premium"
  | "rescue"
  | "aiRemoval"
  | "retainer"
  | "update"
  | "starterSite"
  | "proSite"
  | "customSite"
  | "chatbotInstall"
  | "chatbotPro"
  | "appPolish"
  | "resubmitAddon";

export type Tier = {
  id: TierId;
  name: string;
  price: number;
  interval: "once" | "month";
  summary: string;
  bullets: string[];
  featured?: boolean;
  /** Stripe price id — set by scripts/setup-stripe.mjs */
  priceId?: string;
  cta?: string;
  /** Optional reassurance line rendered inside the card. */
  trustNote?: string;
};

type StripePrices = {
  prices: Record<string, { priceId?: string } | undefined>;
};

const stripePrices = (stripePricesJson as StripePrices).prices ?? {};

export const tiers: Tier[] = [
  {
    id: "coaching",
    name: "Coaching",
    price: 299,
    interval: "once",
    summary: "90 minutes. I show you the whole chain.",
    trustNote: "Live screenshare, your questions, no ticket queue. One builder to one builder.",
    bullets: [
      "Certs + provisioning walk-through",
      "App Store Connect guided tour",
      "Asset + metadata checklist",
    ],
  },
  {
    id: "single",
    name: "Single platform",
    price: 200,
    interval: "once",
    summary: "iOS or Android. Your accounts. I submit.",
    trustNote: "I work with you directly — your questions, my phone number.",
    bullets: [
      "Full submission on your store",
      "Icons + screenshots generated",
      "One rejection appeal included",
    ],
  },
  {
    id: "both",
    name: "Both platforms",
    price: 399,
    interval: "once",
    summary: "iOS + Android, under your accounts.",
    featured: true,
    cta: "Ship my app",
    trustNote: "Direct line to me for 30 days after launch. No handoff, no offshore team.",
    bullets: [
      "Full iOS + Android submission",
      "All assets + metadata + privacy",
      "Account setup guidance",
      "Rejection handling included",
      "30 days of support",
    ],
  },
  {
    id: "premium",
    name: "Done for you premium",
    price: 699,
    interval: "once",
    summary: "White-glove. Expedited. Full launch plan.",
    cta: "Go premium",
    trustNote: "Weekly calls with me. I stay on for 60 days after you go live.",
    bullets: [
      "Expedited dev-account setup",
      "Fallback: I submit under mine",
      "Weekly 30-min check-in calls",
      "Full asset design + ASO",
      "A/B-tested screenshots",
      "Launch consultation + audit",
      "60 days of support",
    ],
  },
  {
    id: "rescue",
    name: "Rejection rescue",
    price: 199,
    interval: "once",
    summary: "Bounced? I write the appeal and resubmit.",
    trustNote: "I read your rejection letter line by line, then we fix it together.",
    bullets: [
      "Apple 4.2 / 4.3 / metadata appeals",
      "Guideline cite + fix list",
      "Resubmission on your account",
    ],
  },
  {
    id: "aiRemoval",
    name: "AI Removal",
    price: 99,
    interval: "once",
    summary:
      "Vibe-coded site that screams Lovable / Bolt / v0? I refactor it to read like a human built it.",
    trustNote:
      "Built and audited 100+ sites. I know every AI fingerprint — generic copy, stock icons, lorem placeholders, gradient overload, template patterns.",
    bullets: [
      "Audit report — every AI tell, ranked by severity",
      "Rewrite generic copy in your real voice",
      "Strip emoji + stock-icon clichés",
      "Replace placeholder content (lorem, fake avatars)",
      "Tighten layout patterns that scream 'template'",
      "48–72 hour turnaround · diff handed back to you",
    ],
  },
];

/** Shown as a site-wide banner below the pricing grid — not inside a single card. */
export const pricingTrustNote =
  "All app revenue routes directly to your Apple and Google accounts. I never touch your payouts — keeps both of us aligned with platform ToS.";

export const addons: Tier[] = [
  {
    id: "retainer",
    name: "Retainer",
    price: 49,
    interval: "month",
    summary: "Ongoing support, version bumps, store-listing tweaks.",
    bullets: ["Priority response", "Minor asset + copy updates", "iOS / Android platform changes handled"],
  },
  {
    id: "update",
    name: "One-off update",
    price: 99,
    interval: "once",
    summary: "Single version bump or listing refresh. No commitment.",
    bullets: ["Build + submit a new version", "Or refresh screenshots / description", "Resolve one small issue"],
  },
];

import { bfyTiers } from "./builtForYou";

export const allTiers = [...tiers, ...addons, ...bfyTiers];

// Merge price ids discovered by setup-stripe.mjs (if present).
for (const t of allTiers) {
  const id = stripePrices[t.id]?.priceId;
  if (id) t.priceId = id;
}

// Flagship tier — consultation only, no Stripe.
export type StudioTier = {
  id: "studio";
  name: string;
  priceFrom: number;
  summary: string;
  pitch: string;
  capabilities: string[];
  who: string[];
  showcase: Array<{
    src: string;
    alt: string;
    kind: "phone" | "desktop";
    label: string;
    href?: string;
  }>;
  cta: { label: string; href: string };
};

export const studio: StudioTier = {
  id: "studio",
  name: "Publishd Studio",
  priceFrom: 2999,
  summary: "Custom native apps, production SaaS, or anything in between — designed, built, and shipped by one senior engineer.",
  pitch:
    "If you can describe it, I can build it. Real engineering, real design, real shipped — not a wrapper.",
  capabilities: [
    "Native iOS + Android from scratch (React Native or Flutter)",
    "Full-stack SaaS — dashboards, auth, payments, realtime",
    "Custom UI/UX designed for the actual device, not a cramped web page",
    "Backend, databases, websockets, offline mode — whatever the product needs",
    "Ship to both stores under your accounts",
    "90 days of post-launch support",
    "You own 100% of the source code",
  ],
  who: [
    "Funded startups who need a polished app to show investors",
    "Businesses whose web presence needs a proper mobile product",
    "Founders who have the idea and need a senior engineer to actually build it",
  ],
  showcase: [
    {
      src: "/work/public-secrets.png",
      alt: "Public Secrets — social confession mobile app",
      kind: "phone",
      label: "Mobile · native feel",
    },
    {
      src: "/work/superclawhub-dashboard.png",
      alt: "SuperClawHub — full production SaaS dashboard",
      kind: "desktop",
      label: "SaaS · production-grade",
      href: "https://superclawhub.com",
    },
  ],
  cta: { label: "Book a build consultation", href: "mailto:daniel@publishd.app?subject=Publishd%20Studio%20inquiry" },
};
