export const PILLARS = {
  "app-shipping": {
    slug: "app-shipping",
    label: "App shipping",
    description: "Real walkthroughs for getting iOS and Android builds approved.",
    accent: "var(--color-accent)",
  },
  "web-apps": {
    slug: "web-apps",
    label: "Web apps",
    description: "Building shippable web apps with Lovable, Bolt, v0, Cursor.",
    accent: "var(--color-accent-mint)",
  },
  "ai-integration": {
    slug: "ai-integration",
    label: "AI integration",
    description: "Adding AI chat, agents, and automations to existing products.",
    accent: "var(--color-accent)",
  },
  "freelancer-trust": {
    slug: "freelancer-trust",
    label: "Hiring + trust",
    description: "Vetting freelancers, fixed-price vs hourly, and what reviews really mean.",
    accent: "var(--color-signal)",
  },
  "case-studies": {
    slug: "case-studies",
    label: "Case studies",
    description: "Real projects — what shipped, what almost didn't, what saved them.",
    accent: "var(--color-signal)",
  },
  "long-tail": {
    slug: "long-tail",
    label: "Field notes",
    description: "Sharper questions, smaller answers — the long-tail of shipping work.",
    accent: "var(--color-muted)",
  },
} as const;

export type PillarSlug = keyof typeof PILLARS;

export const PILLAR_ORDER: PillarSlug[] = [
  "app-shipping",
  "web-apps",
  "ai-integration",
  "freelancer-trust",
  "case-studies",
  "long-tail",
];

export function isPillarSlug(value: string): value is PillarSlug {
  return value in PILLARS;
}
