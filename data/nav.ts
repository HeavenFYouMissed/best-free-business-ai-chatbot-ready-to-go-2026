export type NavChild = {
  label: string;
  href: string;
  description?: string;
  tag?: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

export const navItems: NavItem[] = [
  {
    label: "Service",
    children: [
      {
        label: "How it works",
        href: "/site#how-it-works",
        description: "From web URL to both stores in 7–14 days.",
      },
      {
        label: "Website design",
        href: "/website-design",
        description: "Conversion-focused business websites from $499.",
      },
      {
        label: "AI chatbots",
        href: "/ai-chatbots",
        description: "Grounded chatbots from $399 that capture leads or take action.",
      },
      {
        label: "Web app → App Store & Play",
        href: "/ship-web-app-to-app-store",
        description: "Plain-language path from browser app to iOS and Android listings.",
      },
      {
        label: "What happens next",
        href: "/site#next",
        description: "Every step after you click Buy.",
      },
      {
        label: "What you provide",
        href: "/site#you-provide",
        description: "The short list of what I need.",
      },
      {
        label: "What's included",
        href: "/site#included",
        description: "Certs, assets, submissions, appeals. All of it.",
      },
      {
        label: "When Apple says no",
        href: "/site#rejections",
        description: "Built-in rejection handling — not an upcharge.",
      },
      {
        label: "Comparison",
        href: "/site#comparison",
        description: "Publishd vs MobiLoud vs Natively vs DIY.",
      },
    ],
  },
  {
    label: "Pricing",
    children: [
      { label: "Rejection rescue", href: "/site#tier-rescue", tag: "$199", description: "Bounced? I write the appeal." },
      { label: "Single platform", href: "/site#tier-single", tag: "$200", description: "iOS or Android." },
      { label: "Coaching", href: "/site#tier-coaching", tag: "$299", description: "I teach you; you ship." },
      { label: "Both platforms", href: "/site#tier-both", tag: "$399", description: "The popular one. iOS + Android." },
      { label: "Done for you premium", href: "/site#tier-premium", tag: "$699", description: "Expedited, full-service, 60-day support." },
      { label: "Studio — custom build", href: "/site#tier-studio", tag: "$2,999+", description: "Flagship. Custom from scratch." },
    ],
  },
  { label: "Built for You", href: "/built-for-you" },
  {
    label: "Learn",
    children: [
      {
        label: "Blog",
        href: "/blog",
        description: "Posts on app shipping, AI builds, trust, and conversion fixes.",
      },
      {
        label: "Free SEO guide",
        href: "/seo-guide",
        description: "The long-form ranking playbook built from the leak, patents, and 100+ sites shipped.",
        tag: "FREE",
      },
      {
        label: "SEO checklist",
        href: "/seo-guide/checklist",
        description: "Print-friendly skim version for audits, cleanups, and handoffs.",
        tag: "FREE",
      },
      {
        label: "SEO title checker",
        href: "/seo-title-meta-checker",
        description: "Quick live preview for title tags and descriptions before they go live.",
        tag: "FREE",
      },
    ],
  },
  { label: "Apps", href: "/site#shelf" },
  { label: "FAQ", href: "/site#faq" },
  { label: "Kickoff", href: "/kickoff" },
  { label: "Contact", href: "/site#contact" },
];
