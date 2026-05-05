/**
 * Single source of truth for the new homepage copy.
 * Edit copy here, never inside section components.
 */

export const landingConfig = {
  hero: {
    eyebrow: "Senior Engineer for Hire",
    title: "I Build, Fix, and Ship Production Software",
    description:
      "Senior full-stack engineer based in Connecticut. Amazon alum. 100+ websites built, 50+ apps shipped to the App Store and Google Play. If it runs on code, I can build it, fix it, or ship it.",
    primaryCta: { text: "Start Your Project", href: "/kickoff" },
    secondaryCta: { text: "Bounced from the App Store?", href: "/site#tier-rescue" },
    portrait: { src: "/portrait/daniel.png", alt: "Daniel Castellani — senior engineer for hire" },
  },

  trust: {
    items: [
      { stat: "Amazon", suffix: "alumni", label: "Senior engineering background" },
      { stat: 100, suffix: "+ websites", label: "Shipped solo, end-to-end" },
      { stat: 50, suffix: "+ apps live", label: "App Store + Google Play" },
      { stat: 6, prefix: "<", suffix: " hr reply", label: "Every business day" },
    ],
  },

  recentWork: {
    eyebrow: "Recent Work",
    title: "Real apps, real shipping",
    description:
      "A few of the products built and shipped solo. Live on the App Store, Google Play, and the open web.",
    items: [
      {
        slug: "ai-builder",
        title: "AI App Builder · BYOK",
        body: "Phase-based AI builder on Vibesdk. Bring-your-own-key. Shipped in 12 days.",
        image: "/work/ai-builder.png",
        platforms: ["AI", "Vibesdk", "Web"],
      },
      {
        slug: "public-secrets",
        title: "Public Secrets",
        body: "Anonymous community feed. iOS + web. Live on the App Store in under 2 weeks.",
        image: "/work/public-secrets.png",
        platforms: ["iOS", "App Store"],
      },
      {
        slug: "support-bears",
        title: "Support Bears",
        body: "Send-a-bear gifting marketplace.",
        image: "/work/support-bears.png",
        platforms: ["iOS"],
      },
      {
        slug: "superclaw-home",
        title: "Superclaw — Marketing",
        body: "Brand site for an arcade chain.",
        image: "/work/superclaw-home.png",
        platforms: ["Web"],
      },
      {
        slug: "superclawhub-dashboard",
        title: "Superclaw Hub",
        body: "Operator dashboard. Real-time fleet status.",
        image: "/work/superclawhub-dashboard.png",
        platforms: ["Web", "SaaS"],
      },
      {
        slug: "superclaw-chat",
        title: "Superclaw Chat",
        body: "Customer support chat surface.",
        image: "/work/superclaw-chat.png",
        platforms: ["Web"],
      },
      {
        slug: "superclawhub-landing",
        title: "Superclaw Hub Landing",
        body: "B2B lead-gen homepage.",
        image: "/work/superclawhub-landing.png",
        platforms: ["Web"],
      },
      {
        slug: "model-surgery",
        title: "Model Surgery",
        body: "AI fine-tuning workbench.",
        image: "/work/model-surgery.png",
        platforms: ["AI", "Web"],
      },
      {
        slug: "public-secrets-icon",
        title: "Public Secrets — Brand",
        body: "Icon + identity system.",
        image: "/work/public-secrets-icon.png",
        platforms: ["Brand"],
      },
    ],
  },

  whatIDo: {
    eyebrow: "What I Do",
    title: "I Handle Everything End-to-End",
    description:
      "I'm Daniel Castellani, a senior full-stack engineer based in Connecticut. I ship production software solo — no agencies, no contractors, no offshore handoffs. Whether you need something built from scratch, rescued from a stuck project, fixed after another developer gave up, or published to the App Store, I handle the entire stack.",
    bullets: [
      { title: "Build", text: "Apps, websites, SaaS products, and AI tools" },
      { title: "Fix", text: "Broken apps, websites, APIs, and backend systems" },
      { title: "Rescue", text: "Stuck or abandoned projects, taken over and shipped" },
      { title: "Publish", text: "Apps to the App Store and Google Play, end-to-end" },
      { title: "AI", text: "Custom AI integrations into existing products" },
      { title: "Automate", text: "Workflows and business processes" },
    ],
  },

  services: {
    eyebrow: "Services",
    title: "Five Ways I Work With Founders",
    items: [
      {
        n: "01",
        title: "Build My App / Website / Software",
        body:
          "Full-stack development for mobile apps, web apps, SaaS, dashboards, and prototypes. I turn ideas into production-ready products.",
        meta: "From $1,499 flat · 14–21 days typical",
        href: "/built-for-you",
      },
      {
        n: "02",
        title: "Fix My App / Fix My Website",
        body:
          "Bug fixing, crash resolution, performance improvements, backend repairs, and emergency engineering support.",
        meta: "Diagnostic call $299 · Fix scoped per project",
        href: "/kickoff?intent=fix",
      },
      {
        n: "03",
        title: "App Publishing & App Store Submission",
        body:
          "I handle App Store and Google Play submissions, metadata, screenshots, compliance, and rejection fixes.",
        meta: "From $399 flat · 7–14 days · Includes Guideline 4.2 appeals",
        href: "/ship-web-app-to-app-store",
      },
      {
        n: "04",
        title: "AI App & Automation Development",
        body:
          "Custom AI tools, agents, workflows, and integrations for apps and businesses.",
        meta: "From $399 + hosting · Deployed in under two weeks",
        href: "/ai-chatbots",
      },
      {
        n: "05",
        title: "Project Rescue & Engineering Support",
        body:
          "If your developer disappeared, your project is stuck, or your app is broken, I step in and get it shipped.",
        meta: "Scoped after a 30-min audit call · No retainer",
        href: "/kickoff?intent=rescue",
      },
    ],
  },

  howItWorks: {
    eyebrow: "How It Works",
    title: "How Working With Me Works",
    description:
      "No discovery call. No agency handoffs. No retainers. You write a kickoff, I quote a flat fee, you ship.",
    steps: [
      {
        n: "01",
        title: "Tell me what you need built or fixed",
        body:
          "Three-minute kickoff form, or email me directly. No discovery call required.",
      },
      {
        n: "02",
        title: "I review and reply with a clear plan",
        body:
          "Reply within 6 business hours with scope, timeline, and a flat fee. No retainers.",
      },
      {
        n: "03",
        title: "I build, fix, or publish your product",
        body:
          "Days, not months. Ship target locked at the quote stage. You see progress as it happens.",
      },
      {
        n: "04",
        title: "You ship it — fast, clean, production-ready",
        body:
          "You own the code, accounts, and domain. I'm removed once the project is live.",
      },
    ],
  },

  whyHire: {
    eyebrow: "Why Hire Me",
    title: "Why Founders Hire Me",
    bullets: [
      {
        title: "8+ years shipping production software",
        body: "Amazon alumni, now solo since 2024",
      },
      {
        title: "Reply within 6 business hours",
        body: "Often under 4. You get my direct number day one.",
      },
      {
        title: "Apple Guideline 4.2 specialist",
        body: "Fixed apps other devs declared dead.",
      },
      {
        title: "Full-stack across mobile + web",
        body: "React, Swift, watchOS, iOS, Android, Node, Python, AI/LLM",
      },
      {
        title: "Connecticut-based, global clients",
        body: "Strong overlap with US, UK, EU business hours.",
      },
      {
        title: "One contact point",
        body: "Direct line to me, never a project manager or ticket queue.",
      },
    ],
  },

  testimonials: {
    eyebrow: "Testimonials",
    title: "What founders say after shipping with me",
    description:
      "Real reviews from real clients. Sourced from Google and Trustpilot — verified, not curated quotes.",
    averageRating: 4.8,
    totalReviews: 12,
    items: [
      {
        author: "Suzan Legman",
        role: "Organizing business owner",
        rating: 5,
        platform: "Google",
        quote:
          "Daniel led me through the process of creating a new site for my organizing business with incredible skill and patience. The aesthetic quality truly exceeded my expectations — a beautiful site, with great functionality, at an amazing price. I would hire him again in a heartbeat.",
      },
      {
        author: "Brickman Law Office",
        role: "Law firm",
        rating: 5,
        platform: "Google",
        quote:
          "Daniel has always been very responsive to my business needs. He provides excellent service and will spend the time to discuss options and ideas.",
      },
      {
        author: "Josi Underhill",
        role: "Web design client",
        rating: 5,
        platform: "Google",
        quote:
          "Working with Daniel is always a pleasure. He did a great job on my website — along with his creativity and professionalism I got the results I was looking for. Highly recommend.",
      },
      {
        author: "Jesse Finnick",
        role: "Product owner",
        rating: 4,
        platform: "Google",
        quote:
          "Worked out well — great designer. Built me a full licensing software for my product. Insane.",
      },
      {
        author: "Kimberly Wilson",
        role: "Local business",
        rating: 5,
        platform: "Trustpilot",
        quote:
          "Was great. I'm a local business and dealt with him in person. Thanks.",
      },
    ],
    cta: {
      text: "Read more reviews on Google",
      href: "https://g.page/r/CYvDUmgOyz4qEBM/review",
    },
  },

  pricing: {
    eyebrow: "Pricing",
    title: "Flat Fees. No Subscriptions. No Surprises.",
    description:
      "Every project is one flat fee, scoped before you pay. Apple Developer ($99/yr) and Google Play ($25 one-time) fees are paid directly to the platforms.",
    // Landing page only shows tiers under $1k. Studio + custom builds defer
    // to /pricing so the visible price never scares first-time visitors off.
    tiers: [
      {
        name: "AI Removal",
        price: "$99",
        cadence: "flat",
        body:
          "Vibe-coded site that screams Lovable / Bolt / v0? I refactor it to read like a human built it. Audit + rewrite + diff back to you.",
        meta: "48–72 hr · refactor + audit report",
        cta: { text: "De-AI my site", href: "/kickoff?intent=ai-removal" },
        featured: false,
      },
      {
        name: "Rejection Rescue",
        price: "$199",
        cadence: "flat",
        body:
          "Bounced from the App Store? I write the appeal, fix the cited issues, resubmit.",
        meta: "Apple Guideline 4.2 specialist",
        cta: { text: "Get me approved", href: "/site#tier-rescue" },
        featured: false,
      },
      {
        name: "Single Platform",
        price: "$200",
        cadence: "flat",
        body:
          "Existing app to iOS OR Android — submission, metadata, screenshots, store listing.",
        meta: "7–10 days",
        cta: { text: "Submit my app", href: "/site#tier-single" },
        featured: false,
      },
      {
        name: "Coaching",
        price: "$299",
        cadence: "/ 90 min",
        body:
          "Architecture review, rejection strategy, stack decisions. I teach you, you ship.",
        meta: "Live call · screen-shared",
        cta: { text: "Book a call", href: "/site#tier-coaching" },
        featured: false,
      },
      {
        name: "Both Platforms",
        price: "$399",
        cadence: "flat",
        body:
          "Existing app to App Store + Google Play. Icons, screenshots, metadata, rejection appeals.",
        meta: "Most popular · 7–14 days",
        cta: { text: "Ship to both stores", href: "/site#tier-both" },
        featured: true,
      },
      {
        name: "Done For You Premium",
        price: "$699",
        cadence: "flat",
        body:
          "Expedited end-to-end submission with priority support, rejection handling, and 60-day post-ship coverage.",
        meta: "Premium · expedited",
        cta: { text: "Get expedited", href: "/site#tier-premium" },
        featured: false,
      },
      {
        name: "Studio & Custom Builds",
        price: "See pricing",
        cadence: "",
        body:
          "Need a custom website, web app, SaaS, or full native build? Full tier table with timelines and add-ons.",
        meta: "Studio tier starts at $2,999",
        cta: { text: "View all pricing", href: "/pricing" },
        featured: false,
      },
    ],
  },

  appPublishing: {
    eyebrow: "App Publishing",
    title: "Ship Your Web App to the App Store and Google Play",
    body:
      "I handle App Store and Google Play submissions end-to-end — metadata, screenshots, policies, and rejection appeals. Apple rejects roughly 30% of first submissions, often citing Guideline 4.2 (\"insufficient native functionality\"). I've shipped apps from Lovable, Bolt, v0, Cursor, Replit, React Native, Flutter, and Capacitor. If your app keeps getting rejected, I can fix it and get it approved — rejection handling is included.",
    cta: { text: "Fix My App Store Rejection", href: "/ship-web-app-to-app-store" },
    bullets: [
      "App Store + Google Play submission",
      "Metadata, screenshots, policy review",
      "Guideline 4.2 appeal writing",
      "Rejection handling included",
    ],
  },

  ai: {
    eyebrow: "AI Development",
    title: "Build AI Tools, Agents, and Automations",
    description:
      "I build custom AI apps, integrate AI into existing products, and create automations that save time and money. Deployed on cost-efficient infra (Cloudflare Workers, Vercel, Railway) in under two weeks. Trained on your real business content, not generic models.",
    bullets: [
      "AI agents",
      "AI chat tools",
      "AI workflow automation",
      "AI-powered apps",
      "AI integrations for existing software",
    ],
    cta: { text: "Build my AI tool", href: "/ai-chatbots" },
  },

  faq: {
    eyebrow: "FAQ",
    title: "Frequently Asked Questions",
    items: [
      {
        q: "How do I hire a senior engineer to build my app?",
        a: "Send a 3-minute kickoff form or email me directly. I reply within 6 business hours with scope, timeline, and a flat fee. No discovery calls required, no retainers, no agency handoff.",
      },
      {
        q: "Can you fix a broken app or website that another developer abandoned?",
        a: "Yes — project rescue is one of my main service categories. I take over stuck or abandoned projects, audit what's salvageable, and ship them. Most rescues start with a $299 diagnostic call to scope the actual fix.",
      },
      {
        q: "How much does it cost to publish a web app to the App Store and Google Play?",
        a: "$399 flat for submission only — your existing web app to both stores under your accounts. Apple Developer ($99/yr) and Google Play ($25 one-time) fees are separate and paid by you directly. Rejection handling is included.",
      },
      {
        q: "Can you ship apps built with Lovable, Bolt, v0, or Cursor?",
        a: "Yes. If your app runs at a URL or in a GitHub repo, it can be wrapped natively and shipped to both stores. I've shipped apps from Lovable, Bolt, v0, Cursor, Replit, raw React Native, Flutter, and Capacitor.",
      },
      {
        q: "What if Apple rejects my app for Guideline 4.2?",
        a: "Apple cites Guideline 4.2 (\"insufficient native functionality\") on roughly 30% of first submissions. I write the appeal, fix the cited issues, and resubmit. I've handled dozens of these — most resolve in one or two cycles.",
      },
      {
        q: "How long does a typical project take?",
        a: "Store submissions: 7–14 days. Custom websites: 14–21 days. Full custom builds: scoped per project but most ship in 4–8 weeks. Ship target is locked at the quote stage so you know before you pay.",
      },
      {
        q: "Do I own the code, accounts, and domain?",
        a: "Yes — 100%. You create your own Apple Developer and Google Play accounts. You own the GitHub repo, the domain, and every asset. I'm added as a collaborator and removed when the project is live.",
      },
      {
        q: "Are you an agency or a solo engineer?",
        a: "Solo. One senior engineer, no contractors, no offshore team. You get my direct phone number on day one and you talk to me — not a project manager, not a chatbot, not a ticket queue.",
      },
      {
        q: "Where are you based and what time zones do you cover?",
        a: "Connecticut, USA. I work with founders globally — strong overlap with US, UK, and EU business hours.",
      },
    ],
  },

  cta: {
    eyebrow: "Start your project",
    title: "Real human reply in under 6 business hours.",
    body: "One builder, not a team. Tell me what you need.",
    primary: { text: "Start your project", href: "/kickoff" },
    secondary: { text: "Email Daniel", href: "mailto:daniel@publishd.app" },
  },
} as const;
