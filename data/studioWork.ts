/**
 * Daniel's own solo-shipped work. Safe to show in full — these are his products.
 */

export type StudioWork = {
  name: string;
  tagline: string;
  stack: string[];
  kind: "phone" | "desktop";
  screenshot: string;
  /** Optional second image, faded in on hover. */
  altScreenshot?: string;
  url?: string;
  weeks?: number;
};

export const studioWork: StudioWork[] = [
  {
    name: "Public Secrets",
    tagline: "Anonymous social confessions — ships to both stores.",
    stack: ["React Native", "Expo", "Realtime", "Push"],
    kind: "phone",
    screenshot: "/work/public-secrets.png",
  },
  {
    name: "Support Bears",
    tagline: "Send a bear, make someone's day. Delightful mobile app with a feed and store.",
    stack: ["React Native", "Stripe", "Push"],
    kind: "phone",
    screenshot: "/work/support-bears.png",
  },
  {
    name: "SuperClawHub",
    tagline: "Full production SaaS — AI toolbox with chat, website builder, agents, approvals.",
    stack: ["Next.js", "TypeScript", "Stripe", "Auth"],
    kind: "desktop",
    screenshot: "/work/superclawhub-dashboard.png",
    altScreenshot: "/work/superclawhub-landing.png",
    url: "https://superclawhub.com",
  },
  {
    name: "AI Model Surgery",
    tagline: "Extract capabilities from any model and transplant into another. Research product.",
    stack: ["Next.js", "PyTorch", "Edge"],
    kind: "phone",
    screenshot: "/work/model-surgery.png",
    url: "https://model-surgery.com",
  },
];
