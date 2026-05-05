# Parallel Blog Writing: 10-12 Problem Posts (Use Multiple Agents)

**Strategy:** Spawn 3-4 Claude agents in parallel, each writing 3 posts. Deploy within 2-3 days. Iterate quality after launch.

---

## Posts to Write (Pick Your Fighters)

These 12 posts are **highest conversion + search volume**. Assign each post to a separate agent or batch 3 per agent.

### Batch 1: App Shipping Reality Checks (Core Service)
1. `why-lovable-apps-get-rejected-from-app-store`
2. `why-your-app-gets-rejected-for-guideline-4-2`
3. `why-wrapping-a-web-app-doesnt-work`

### Batch 2: AI Builder Limitations (Feed the Funnel)
4. `why-your-ai-generated-site-looks-ai-generated`
5. `why-cursor-cant-ship-to-app-store`
6. `why-v0-apps-dont-scale`

### Batch 3: Hiring Reality (Trust Builder)
7. `why-cheap-freelancers-cant-ship-apps`
8. `why-you-should-never-hire-for-app-shipping`
9. `why-offshore-developers-struggle-with-app-store`

### Batch 4: Integration / Infrastructure (Secondary)
10. `why-your-ai-chatbot-seems-dumb`
11. `why-your-firebase-bill-exploded`
12. `why-slapping-ai-on-your-site-doesnt-work`

---

## Writing Prompt Template (Copy for Each Agent)

Assign one post per agent. Replace `[POST_SLUG]` and `[CONTEXT]` with specifics.

---

### [Agent Name] — Write: `[POST_SLUG]`

You're writing a blog post for **publishd.app** — a freelance app shipping service by Daniel Castellani.

**Post title:** `[POST_SLUG]` (convert slug to title, e.g., "Why Lovable Apps Get Rejected From the App Store")

**Target reader:** [TARGET] (e.g., "AI builder who just finished a Lovable app and doesn't understand why App Store rejected it")

**Search intent:** [SEARCH_INTENT] (e.g., "I hit a wall and need to understand WHY before I spend more time")

**Post length:** 1,800–2,200 words

**Voice:** Direct. Tactical. First-person ("I" and "you"). Reads like Daniel after shipping 11 apps. No hype, no marketing fluff. Numbers in monospace where natural. Code snippets if they help. Real examples only—no made-up stats.

---

## Content Structure (Use This Framework)

### Hook (100 words)
Start with a relatable pain point or specific rejection email. Make the reader nod immediately. End with the "why" you're answering.

Example: "You spent 3 days building a beautiful AI chatbot in Lovable. You submitted it to the App Store. Two days later: rejection. 'Guideline 4.2 — Minimum Functionality.' You read the reason three times. It doesn't make sense. Your app works perfectly on web. Why is it rejected on iOS? Here's exactly why."

### The Real Reason (600 words)
Break down the actual, technical reason. Use:
- Real rejection email screenshot or quote
- Apple's actual wording (not your paraphrase)
- What reviewers are actually checking for
- Why the builder/tool/approach fails at this specific point

Be honest about the gap. If Lovable can't do something, say so. If the tool is fine but the approach is wrong, explain.

### Who This Affects (300 words)
- Specific personas: "indie hackers using Lovable," "AI-first founders," "non-technical makers"
- Why they hit this wall specifically
- Common misconceptions they have ("I thought wrapping it would work")

### What You Can Do About It (500 words)
- Short term: workarounds, what to try next
- Medium term: tools/approaches that work (mention competing services if honest)
- Long term: when you need a real solution (this is where `/pricing` or `/kickoff` fits naturally)

**Be honest.** If cheap tools can't solve it, say so. If you need to hire someone, link to hiring guide. Don't soft-sell; trust the reader to connect dots.

### CTA (1 paragraph)
Single, natural next step. Not a button wall. Example:

"If you've hit this wall and it's blocking your launch, you have two options: (1) add the native feature yourself (1-2 weeks of real dev time), or (2) talk to someone who's done this 20+ times. If (2) sounds better, [start here](/kickoff)."

---

## Real Data to Include (You Provide OR Research)

- Actual Apple rejection email text (Daniel provides or we recreate)
- Real timeline: "This rejection took 3 days to get; the appeal took 2 more"
- Pricing reality: "A contractor will quote $X; here's what it actually costs"
- Tool-specific failures: "Lovable can't output [X], so reviewers see [Y]"

**Don't invent stats.** If you don't have a number, skip it or say "most developers I know..." instead.

---

## Frontmatter (All Posts)

```mdx
---
title: "[Title Version]"
description: "[One-line summary for Google + social. 150 chars max]"
slug: "[same-as-filename]"
date: "2026-04-28"
updated: "2026-04-28"
author: "Daniel Castellani"
pillar: "[app-shipping OR web-apps OR ai-integration OR freelancer-trust]"
tags: ["[tag1]", "[tag2]", "[tag3]"]
draft: false
---
```

---

## Post Assignments (12 Posts → Suggested Split)

### Agent 1: App Shipping Reality (Posts 1–3)
- `why-lovable-apps-get-rejected-from-app-store` → Target: AI builder, doesn't understand rejection
- `why-your-app-gets-rejected-for-guideline-4-2` → Target: Any dev, wants to understand Apple's rule
- `why-wrapping-a-web-app-doesnt-work` → Target: Founder trying to save money on development

### Agent 2: AI Builder Gaps (Posts 4–6)
- `why-your-ai-generated-site-looks-ai-generated` → Target: Non-technical founder, wants to look professional
- `why-cursor-cant-ship-to-app-store` → Target: Dev using Cursor, realizes there's a gap
- `why-v0-apps-dont-scale` → Target: Startup using v0, hitting performance walls

### Agent 3: Hiring / Trust (Posts 7–9)
- `why-cheap-freelancers-cant-ship-apps` → Target: Budget-conscious founder, got burned
- `why-you-should-never-hire-for-app-shipping` (without vetting) → Target: Founder shopping Upwork/Fiverr
- `why-offshore-developers-struggle-with-app-store` → Target: Founder considering offshore option

### Agent 4: Integration / Infrastructure (Posts 10–12)
- `why-your-ai-chatbot-seems-dumb` → Target: Founder added AI, disappointed
- `why-your-firebase-bill-exploded` → Target: Indie developer, sticker shock on infrastructure
- `why-slapping-ai-on-your-site-doesnt-work` → Target: Agency/business owner, AI didn't help

---

## Acceptance Criteria (For Each Post)

- [ ] 1,800–2,200 words
- [ ] Hook lands in first 100 words
- [ ] Real example, screenshot, or quote (not made up)
- [ ] Clear structure: Hook → Why → Who → What to Do → CTA
- [ ] Frontmatter is complete (title, slug, pillar, tags, date)
- [ ] At least 2 internal links (to other posts or `/pricing`, `/kickoff`)
- [ ] CTA is single, natural next step (not multiple buttons)
- [ ] No marketing fluff; sounds like Daniel
- [ ] Spelling/grammar check done

---

## After All 12 Posts Are Done

Return to the main Claude Code session with:
1. All 12 .mdx files (in `content/blog/`)
2. Confirmation they're formatted correctly
3. Any Daniel-specific edits or additions needed

We'll then:
1. Test locally (`npm run preview`)
2. Deploy the blog
3. Start Phase 1 verification + indexing
4. Begin Phase 5 (ongoing cadence)

---

## Pro Tips

- **Don't overthink.** These are working drafts. Quality improves after launch.
- **Use specificity, not adjectives.** "Apple's review takes 3–7 days" beats "Apple reviews quickly."
- **Assume the reader Googled the problem and found your post.** They're 80% of the way to understanding; you just need to confirm what they suspected.
- **Link internally.** If you mention Lovable, link to the Lovable-specific post. If you mention hiring, link to the hiring guide.
- **End with hope.** These are problem posts, so end with "here's what to do next," not doom.

Good luck. Deploy and iterate.
