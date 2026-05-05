# Prompt for Opus 4.7/4.6: Build Publishd Blog Infrastructure & Content Strategy

Copy and paste everything below into a fresh Opus session.

---

You're building a multi-angle blog for **publishd.app** — a freelance app shipping service. The blog needs to be a destination people visit, not just SEO filler. It covers three main verticals but should branch into 5-7 content pillars that serve different audiences and search intents.

## Context

**The site:** https://publishd.app
- Foundry: Daniel Castellani, an app developer who ships 11+ apps. Direct, tactical voice. No hype.
- Three core services: (1) website building, (2) ship web/AI apps to app stores, (3) add AI to existing sites
- Existing pages show high trust signals (Trustpilot, real customer work)
- SEO goal: become the go-to resource for indie builders, AI tool makers, and frustrated developers who need a shipping partner

**What the blog must do:**
1. Rank for long-tail, high-intent searches across all three verticals
2. Build authority by helping people solve real problems (not selling, helping first)
3. Drive traffic to /pricing, /kickoff, /ship-web-app-to-app-store, /built-for-you
4. Be comprehensive enough that Google and people bookmark it as a reference

**Brand voice (non-negotiable):**
- Direct. Tactical. First-person ("I", "you"). 
- Reads like Daniel after shipping 11 apps, not a marketing intern.
- Numbers in monospace where natural (`$99/yr`, `7–14 days`, `20+ icon sizes`).
- Specifics over adjectives. Code snippets where helpful.
- No invented stats—only Daniel's real experience or citable sources.

---

## What to Build (Phase 3 + Content Skeleton)

### 1. Blog Infrastructure (Phase 3 from SEO-AND-BLOG-PLAN.md)

**Files & routes:**
```
content/
  blog/
    (posts will go here as .mdx files)

app/(full)/blog/
  page.tsx              ← /blog index (lists all posts, filterable by pillar/tag)
  [slug]/
    page.tsx            ← /blog/<slug> (renders post + metadata + related posts)
    opengraph-image.tsx ← dynamic OG image (branded, per-post)

lib/
  blog.ts               ← getAllPosts(), getPostBySlug(), readingTime(), getRelatedPosts()

components/blog/
  PostCard.tsx          ← title, date, reading time, tags, excerpt, pillar icon
  PostHeader.tsx        ← title, date, reading time, author (Daniel), tags, cover image
  PostFooter.tsx        ← related posts (by pillar), CTA to /pricing or /kickoff
  Prose.tsx             ← typography + code block styling for MDX body
  PillarFilter.tsx      ← optional: filter posts by content pillar
```

**Frontmatter schema (strict):**
```mdx
---
title: "How to Ship a Lovable App to the App Store (the no-bullshit walkthrough)"
description: "Step-by-step playbook for taking a Lovable-built web app and shipping it to iOS with cert generation, asset prep, and the 4.2 appeal template."
slug: "ship-lovable-app-to-app-store"
date: "2026-04-28"
updated: "2026-04-28"
author: "Daniel Castellani"
pillar: "app-shipping"  # NEW: for filtering and related posts
tags: ["lovable", "app store", "ios", "playbook"]
cover: "/blog/covers/ship-lovable-app-store.png"  # optional
draft: false
---
```

**Key functions in `lib/blog.ts`:**
- `getAllPosts()` → sorted by date (newest first), excludes draft posts
- `getPostBySlug(slug)` → single post with full content
- `getRelatedPosts(slug, limit=3)` → posts with same pillar tag
- `readingTime(mdxContent)` → returns "6 min read" string
- `getPostsByPillar(pillar)` → filter for sidebar/discovery

**Metadata per post (in `app/(full)/blog/[slug]/page.tsx`):**
Must export `generateMetadata()` that produces:
- OpenGraph article type (publishedTime, modifiedTime, authors, tags, images)
- Twitter card (summary_large_image)
- Canonical URL
- Plus inline `Article` JSON-LD with datePublished, dateModified, author as Person

---

### 2. Content Pillars (5 main angles; expand as you ship posts)

Posts should target these pillars. Each pillar has 2-4 example post ideas:

#### **Pillar 1: App Shipping (Core Service)**
*For:* Web app builders, Lovable/Bolt/v0 users, AI tool makers shipping to app stores
*Why:* Direct tie to your $399 service; high purchase intent

- "Ship a Lovable app to the App Store (the no-bullshit walkthrough)"
- "Apple Guideline 4.2 rejection: the appeal letter that actually works"
- "I shipped 10 apps to both stores. Here's what actually breaks."
- "Expo vs. Capacitor: which one for your web app?" (comparison, SEO magnet)
- "The hidden cost of shipping to App Store + Google Play (spoiler: not what you think)"

#### **Pillar 2: Building Web Apps Smart (Enabler)**
*For:* Solo founders, indie hackers, anyone using Lovable/Cursor/Bolt
*Why:* Helps them before they need you; positions you as builder-first

- "Lovable vs. Bolt vs. v0: which AI builder is actually shipping-ready?" (comparisons rank)
- "Building an app in 48 hours: realistic checklist for Lovable users"
- "The architecture trap: why your Lovable app won't scale (and how to fix it)"
- "Turn your Cursor project into a shippable app in 3 days"
- "Database choices for Lovable apps: Supabase vs. Firebase vs. custom"

#### **Pillar 3: AI Integration (Growth Service)**
*For:* Existing business owners, SaaS makers, content creators
*Why:* Secondary service; huge volume of searches; builds trust

- "Add AI chat to your website in one afternoon (Lovable + Supabase walkthrough)"
- "Custom AI agents for your SaaS: build vs. buy (with pricing math)"
- "Stripe + AI: automating your billing and support chat in parallel"
- "Why your AI chatbot is useless (and how to fix it with real data)"

#### **Pillar 4: Freelancer Hiring & Trust (Authority)**
*For:* Founders who tried freelance platforms, got burned, need someone vetted
*Why:* Builds trust; differentiates from bouncing between 99designs/Upwork

- "Why you shouldn't hire a random freelancer for app shipping (and why you should hire someone like me)"
- "The Trustpilot difference: what 50+ 5-star reviews actually means" (link to your profile)
- "How to vet an app developer: 5 questions that separate signal from noise"
- "Fixed-price vs. hourly for app shipping: when each makes sense"

#### **Pillar 5: Real Case Studies & Shipping Stories (Social Proof)**
*For:* Skeptical founders who want proof before paying $399
*Why:* Builds confidence; every post is an implicit endorsement

- "From Lovable prototype to App Store in 14 days: the X story" (real example, with permission)
- "How we turned a rejected app (4.2 violation) into an approved one: the appeal that worked"
- "5 app shipping projects that almost failed (and what saved them)" (anonymized or real, your call)

#### **Pillar 6: Long-Tail SEO (Niche Dominance)**
*For:* Very specific searches; low volume, high conversion
*Why:* You can dominate these—competitors ignore them

- "Connecticut freelance app developer: shipping apps from the Northeast"
- "Can you wrap a web app in a native shell? (Yes, but here's why)"
- "Replit to App Store: is it really possible?" (specific tool tie-in)
- "Building with Lovable when you're a non-technical founder"

---

### 3. Skeleton Content (Create These First)

Create a `/content/blog/` folder with **3-5 seed posts** that work as templates. Each should be:
- 1,500–2,500 words
- Real code examples, actual screenshots, actual rejection emails (Daniel provides or recreates)
- One clear CTA at the end (to /pricing or /kickoff, not a wall of buttons)
- Inline code blocks with syntax highlighting (Markdown triple-backticks work in MDX)

**Seed posts to scaffold:**
1. `ship-lovable-app-to-app-store.mdx` (Pillar 1)
2. `lovable-vs-bolt-vs-v0.mdx` (Pillar 2)
3. `why-hire-freelancer-app-shipping.mdx` (Pillar 4)
4. `apple-4-2-rejection-appeal-template.mdx` (Pillar 1)
5. `add-ai-chat-to-website.mdx` (Pillar 3)

For each, include:
- Full frontmatter (title, description, slug, date, author, pillar, tags)
- An H2 outline (so you can expand section by section)
- Placeholder text like `[SECTION TO EXPAND: Daniel—what was the biggest surprise when shipping your first Lovable app?]`
- Real code snippets or commands where applicable
- At least one screenshot placeholder: `![Alt text](placeholder)`

---

### 4. Dynamic Sitemap Integration

Update `app/sitemap.ts` to include:
```ts
import { getAllPosts } from "@/lib/blog";

// Inside the sitemap function:
const posts = getAllPosts().map((p) => ({
  url: `${SITE_URL}/blog/${p.slug}`,
  lastModified: new Date(p.updated),
  changeFrequency: "monthly" as const,
  priority: 0.7,
}));

return [
  // ...existing entries...,
  { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
  ...posts,
];
```

---

### 5. Blog Index Page (`/blog`)

The `/blog` page should:
- Show all posts (newest first) in a grid or list
- Display: title, date, reading time, pillar tag, excerpt, cover image (if any)
- Optional: filter by pillar (e.g., "Showing 8 posts in App Shipping")
- Sticky CTA above the fold: "Learn how to ship your app → read the shipping guide"
- Link to `/kickoff` or `/pricing` below the fold

---

### 6. Post Footer (Related Content)

Every post should end with:
- **3 related posts** (same pillar, or fallback to newest posts)
- **Single CTA button** at very bottom (e.g., "Ready to ship? → /kickoff" or "Explore pricing → /pricing")
- No wall of CTAs; one clear next step

---

## Acceptance Criteria (Before Returning to the Main Session)

- [ ] `/blog` route works and lists all posts (newest first)
- [ ] `/blog/[slug]` renders a post with proper metadata, JSON-LD, canonical URL
- [ ] Each post has frontmatter with pillar + tags
- [ ] `lib/blog.ts` exports getAllPosts, getPostBySlug, readingTime, getRelatedPosts
- [ ] Post components exist (PostCard, PostHeader, PostFooter, Prose)
- [ ] 5 seed posts are scaffolded (outline + placeholders, ready for Daniel to expand)
- [ ] `/blog` sitemap entries are added dynamically in `app/sitemap.ts`
- [ ] Blog index (`/blog` page) displays posts with pillar tags + simple filter
- [ ] OG image route exists (can be a placeholder that says "Publishd Blog")
- [ ] `npm run preview` succeeds and posts render in the Cloudflare preview environment
- [ ] Optional: RSS feed at `/feed.xml` (if time; low priority)

---

## Notes for You (Opus)

1. **Don't write the full posts yet.** Scaffold them with outlines and placeholders. Daniel will expand them based on his real experience.
2. **Voice matters.** Even placeholders should use first-person, tactical language. Avoid "Publishd offers…"; use "I've found…"
3. **Assume Daniel will provide real content.** If a section needs a screenshot or code example, add a placeholder comment rather than inventing one.
4. **Edge runtime compatibility:** Use build-time file reads only (`fs` inside `generateStaticParams` or `generateMetadata`). No Node-only APIs at request time.
5. **Reuse components.** The existing `Prose.tsx` pattern should wrap the MDX body. Reuse brand colors and typography from the site.
6. **Make it fast.** MDX is parsed at build time, so performance should be excellent.

---

## After You're Done

Return to the main Claude Code session with Daniel. He'll:
1. Review the scaffolded posts
2. Expand them with real content, screenshots, and examples
3. Come back to Phase 1 (verification) after 2–3 posts are live
4. Launch Phase 5 (ongoing blog cadence)

Good luck. Make it clean, fast, and built for Daniel's voice.
