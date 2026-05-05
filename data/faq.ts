export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  {
    q: "How long does it take?",
    a: "Typically 7–14 days end-to-end. Done For You Premium is 3–7 days. Apple review itself is usually 24–72 hours once submitted.",
  },
  {
    q: "What if Apple rejects my app?",
    a: "Included. If Apple bounces the app, I write the appeal — guideline citation, plain-English fix list, and resubmission. Most rejections turn into approvals on the second pass.",
  },
  {
    q: "What if Apple permanently rejects my app?",
    a: "Hasn't happened yet. But if we can't get your app approved after 3 good-faith attempts, I refund 50% (the other 50% covers the real work done). Most 'permanent' rejections are actually fixable with the right approach.",
  },
  {
    q: "How do I actually send you my app?",
    a: "After checkout you get an intake form. You paste your web app URL, fill out app name and description, and answer a few questions about what your app does (for Apple's privacy labels). We hop on a 15-minute call to cover anything complex. That's it.",
  },
  {
    q: "Do I need to be technical to work with you?",
    a: "Not at all. Most of my customers are founders, designers, or marketers who built something on Lovable or Bolt and want it in the App Store. I handle all the technical stuff. You answer a few questions about your app. That's your job.",
  },
  {
    q: "Do I need a Mac?",
    a: "No. Full stop. I ship everything from my end using Expo EAS for cloud builds. You don't need Xcode, a Mac, or any local dev tooling.",
  },
  {
    q: "What tools do you support?",
    a: "All of them. Lovable, Bolt, v0, Cursor, Codex, Replit, React Native, Flutter, hand-coded — if it runs in a browser or as a native shell, I can ship it.",
  },
  {
    q: "Who owns my app?",
    a: "You. One hundred percent. Always. The app lives under your Apple Developer and Google Play accounts. When you want to remove my access, you do it with one click.",
  },
  {
    q: "What if I want to update my app later?",
    a: "Two options: $49/mo retainer covers unlimited updates plus iOS version bumps and policy changes. Or $99 one-off updates when you need them. No subscription required — you choose.",
  },
  {
    q: "Can you build features my app doesn't have yet?",
    a: "Yes — that's Publishd Studio (from $2,999). If you need a fully custom app built from scratch, or significant new features added to an existing app, that's a scoped project. Book a consultation and we'll talk.",
  },
  {
    q: "What happens after the 30 days of support?",
    a: "You keep the app. Most people never need more. If you do, retainer or one-off updates are there. No subscription, no lock-in, ever.",
  },
  {
    q: "Do you handle in-app purchases / Stripe / backends?",
    a: "Submission-side yes — IAP configuration in App Store Connect, Google Play billing setup, receipt validation guidance. For custom backends or Stripe integration, we scope that separately (usually Studio territory).",
  },
  {
    q: "What about complex apps with auth / databases?",
    a: "If it runs in a browser today, it can ship. Auth, databases, websockets, offline — all fine. If native features are required to pass review (push, biometric, offline), I add the minimum needed.",
  },
  {
    q: "Refund policy",
    a: "If I can't ship your app for reasons within my control, you get a full refund. If Apple rejects on content grounds that can't be resolved, you get a partial refund minus work completed.",
  },
];
