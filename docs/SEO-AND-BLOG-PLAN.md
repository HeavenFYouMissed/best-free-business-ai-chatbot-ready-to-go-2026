# Publishd — SEO + Blog Implementation Plan

> Plan for handing off to a follow-up Claude session (Sonnet or Haiku).
> Site: https://publishd.app · Next.js 15 (App Router) · Cloudflare Workers via OpenNext.

This document is **a checklist plus exact code locations**. Read top-to-bottom and execute. Each phase is self-contained — a fresh agent can pick up at any phase.

---

## Phase 0 — Context the next agent must read first

Before writing anything, open these files so you understand the existing patterns:

- `app/layout.tsx` — root metadata, verification env vars
- `app/sitemap.ts` — sitemap entries (must add blog routes here)
- `app/robots.ts` — robots rules
- `components/seo/StructuredData.tsx` — JSON-LD setup; reuse `organizationId` for Article schema
- `app/(full)/ship-web-app-to-app-store/page.tsx` — exact pattern for a content/SEO page on this site (use as template for blog post layout)
- `app/(full)/layout.tsx` and `app/(cover)/layout.tsx` — route-group layouts; the blog will live in `(full)`
- `IDEAS.md` — voice and brand positioning (read this; do not let blog copy contradict it)
- `AGENTS.md` — shaders.com MCP usage and brand tokens (`--color-accent`, `--color-signal`, `--color-ink`)

**Brand voice rule (non-negotiable):** Direct. Tactical. Signed. Reads like Daniel wrote it after shipping his 11th app, not like a marketing intern. No hype. Specifics over adjectives. Numbers in mono font where natural.

---

## Phase 1 — Get the site verified and submitted to Google (do this FIRST, today)

**Why first:** Google won't rank pages it hasn't crawled. Submitting the sitemap is the single biggest unlock. Until this is done, every other thing in this doc is theoretical.

### 1.1 Google Search Console verification

1. Go to https://search.google.com/search-console
2. Add property → "URL prefix" → `https://publishd.app`
3. Choose verification method **"HTML tag"** → copy the `content="..."` value (e.g. `google-site-verification=AbCdEf...`)
4. On the deployed Cloudflare Worker, set the secret:
   ```bash
   echo -n "AbCdEf..." | npx wrangler secret put NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
   ```
   (The verification meta tag is already wired in `app/layout.tsx` lines 102–107 — just needs the env var.)
5. Run `npm run deploy`. Wait 2 minutes, click **Verify** in Search Console.
6. Once verified: in Search Console → **Sitemaps** → submit `https://publishd.app/sitemap.xml`
7. Search Console → **URL Inspection** → paste `https://publishd.app/` → click **Request indexing**. Repeat for `/pricing`, `/site`, `/kickoff`, `/built-for-you`, `/ship-web-app-to-app-store`.

### 1.2 Bing Webmaster Tools (free, takes 5 min, not optional)

1. https://www.bing.com/webmasters → Add site → `https://publishd.app`
2. Verify via meta tag: copy the `content="..."` value
3. `npx wrangler secret put NEXT_PUBLIC_BING_SITE_VERIFICATION` → paste value → redeploy
4. Submit sitemap `https://publishd.app/sitemap.xml`
5. (Bing's Webmaster Tools also imports from Google Search Console if you want to skip the manual sitemap step.)

### 1.3 IndexNow

Already implemented (`scripts/indexnow.mjs`). After every deploy that adds new URLs, run:
```bash
npm run seo:indexnow
```
Add the blog post URL to the `URLS` array in that script when you publish a new post.

### 1.4 Google Business Profile (because this is a *Connecticut* freelance service)

`StructuredData.tsx` already advertises `addressRegion: "CT"` and a phone number. Pair it with a real Google Business Profile so Daniel shows up in local "freelance app developer Connecticut" searches:

1. https://business.google.com → claim "Publishd"
2. Service-area business (no walk-in address). Service area = Connecticut + remote/USA.
3. Categories: **Software Company** (primary), **Website Designer**, **Computer Consultant** (secondary).
4. Add the publishd.app URL, hours, phone, services list (use the `serviceType` array from `StructuredData.tsx` as a starting list).

### 1.5 Acceptance criteria for Phase 1

- [ ] Search Console shows site **Verified**
- [ ] Sitemap submitted, status **Success**, discovered URLs ≥ 8
- [ ] Bing Webmaster Tools verified + sitemap submitted
- [ ] At least the homepage shows up when you site-search `site:publishd.app` on Google (allow 24–72h)
- [ ] Google Business Profile created (verification by postcard can take a week — start it now)

---

## Phase 2 — Site audit fixes (small, ship before the blog)

These are quick wins on the existing site. Do them in one PR.

### 2.1 Sitemap is missing pages that exist

`app/sitemap.ts` lists 8 URLs. Verify and add any missing ones:
- Confirm `/site`, `/built-for-you`, `/kickoff`, `/success` actually exist as routes
- Add `/blog` and `/blog/[slug]` once Phase 3 ships (covered there)
- Remove any that 404

### 2.2 OG image fallback

`app/opengraph-image.tsx` is a dynamic OG (good). Verify it renders by visiting `https://publishd.app/opengraph-image` after deploy. If the dynamic OG ever fails on Cloudflare's edge runtime, add a static fallback `public/og-fallback.png` and reference it in the `images` array in `app/layout.tsx`.

### 2.3 Image alt text audit

Run:
```bash
grep -rn '<Image' app components | grep -v 'alt='
grep -rn 'alt=""' app components
```
- Empty `alt=""` is fine *only* for decorative images (the wordmark background in `CoverHero.tsx` already does this correctly — keep `alt=""` + `aria-hidden`).
- Any *content* image with empty alt: write a real description.

### 2.4 Internal linking pass

Internal links from high-traffic pages to deeper pages help indexing. Verify:
- Homepage links to `/pricing`, `/built-for-you`, `/ship-web-app-to-app-store`, `/blog` (once it exists)
- Footer (`components/cover/CoverFooter.tsx` — confirm filename) links to all primary routes
- The existing landing page `/ship-web-app-to-app-store` links to `/pricing` and `/kickoff`

### 2.5 Canonical sanity check

Each page sets its own `alternates.canonical`. Confirm none of them are wrong relative paths. Search:
```bash
grep -rn 'canonical:' app
```
Every value should be either `"/"` or `${SITE_URL}/something` — never a path with a trailing slash mismatch.

### 2.6 `keywords` meta is bloated

`app/layout.tsx` lines 32–61 have ~30 keywords. Google ignores `keywords` meta entirely — Bing weakly weights it. Trim to ~10 of the most important and *most unique* phrases. Long lists look spammy. Move long-tail keywords into actual blog post content (Phase 3) where they'll do real work.

### 2.7 404 page

`app/not-found.tsx` exists — open it and confirm it has a CTA back to `/` and links to `/pricing`. Don't let dead-end 404s leak link equity.

---

## Phase 3 — Blog implementation

### 3.1 Decision: MDX vs. CMS

**Recommendation: MDX files in the repo.** Reasons:
- Site already deploys via OpenNext to Cloudflare Workers — adding a CMS (Sanity, Contentful, etc.) means another runtime dependency, another auth surface, and money. None of that is needed for a founder-written blog at the volume Daniel will realistically publish (4–8 posts/month, max).
- MDX gives you full React component access inside posts — embed the existing pricing card, FAQ accordion, etc.
- Ships at the edge with zero extra requests.
- Migrating to a CMS later is a one-day job if traffic ever justifies it.

**Stack:**
- `next-mdx-remote-client` or `@next/mdx` — pick `@next/mdx` (officially supported, simpler, App Router native)
- Posts live in `content/blog/*.mdx`
- Frontmatter parsed with `gray-matter`
- Reading time with `reading-time`

### 3.2 File and route structure

```
content/
  blog/
    ship-lovable-app-to-app-store.mdx
    apple-4-2-rejection-survival-guide.mdx
    ...
app/
  (full)/
    blog/
      page.tsx              ← /blog index (lists all posts)
      [slug]/
        page.tsx            ← /blog/<slug> renders one MDX file
        opengraph-image.tsx ← per-post OG image (dynamic, reuses brand)
lib/
  blog.ts                   ← getAllPosts(), getPostBySlug(), readingTime()
components/
  blog/
    PostCard.tsx
    PostHeader.tsx          ← title, date, reading time, author, tags
    PostFooter.tsx          ← related posts, CTA back to /pricing or /kickoff
    Prose.tsx               ← typography wrapper for MDX body
```

### 3.3 Frontmatter schema (lock this; don't drift)

Every `.mdx` file MUST start with:

```mdx
---
title: "Ship a Lovable app to the App Store in 7 days"
description: "Step-by-step playbook for taking a Lovable-built web app and turning it into a real iOS submission, with cert generation, asset prep, and the 4.2 appeal template."
slug: "ship-lovable-app-to-app-store"
date: "2026-04-30"
updated: "2026-04-30"
author: "Daniel Castellani"
tags: ["lovable", "app store", "ios", "playbook"]
cover: "/blog/covers/lovable-app-store.png"  # optional
draft: false
---
```

`lib/blog.ts` should:
- Reject posts where `draft: true` from public lists (still allow direct URL access in dev only)
- Sort by `date` descending
- Compute `readingTime` from MDX body, expose as `string` ("6 min read")

### 3.4 Per-post SEO contract

Every blog post page (`app/(full)/blog/[slug]/page.tsx`) must export `generateMetadata` that produces:

```ts
{
  title: post.title,                           // template "%s · Publishd" applies
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    type: "article",
    title: post.title,
    description: post.description,
    url: `${SITE_URL}/blog/${post.slug}`,
    publishedTime: post.date,
    modifiedTime: post.updated,
    authors: [post.author],
    tags: post.tags,
    images: [{ url: `/blog/${post.slug}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: post.title,
    description: post.description,
    images: [`/blog/${post.slug}/opengraph-image`],
  },
}
```

Plus inline `Article` JSON-LD on each post page (model after the existing one in `app/(full)/ship-web-app-to-app-store/page.tsx` lines 41–51, but extend with `datePublished`, `dateModified`, `image`, and `author` as a Person with URL).

### 3.5 Sitemap integration

Update `app/sitemap.ts` to dynamically include all non-draft posts:

```ts
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
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
}
```

### 3.6 RSS feed

Output `/feed.xml` via a route handler at `app/feed.xml/route.ts`. Atom or RSS 2.0 — either is fine. Reuses `getAllPosts()`. Helps:
- Folks who follow technical blogs in Reeder/Feedly
- Aggregator sites that pick up RSS and provide backlinks (small but real SEO benefit)

### 3.7 Edge runtime compatibility

`@next/mdx` reads files at build time, which is fine on OpenNext/Workers. **Do not use Node-only file APIs at request time.** Use `import` or build-time `fs` reads only inside `generateStaticParams` and `generateMetadata`. Test with `npm run preview` (which uses `opennextjs-cloudflare preview`) before deploying.

### 3.8 Acceptance criteria for Phase 3

- [ ] `/blog` lists posts (newest first), each shows title, date, reading time, tags, summary
- [ ] `/blog/[slug]` renders post with proper metadata, JSON-LD, canonical
- [ ] Each post has a unique OG image (or falls back to a brand default — pick one)
- [ ] Sitemap includes `/blog` + every post URL
- [ ] `/feed.xml` validates at https://validator.w3.org/feed/
- [ ] At least **3 launch posts** are published (see Phase 4)
- [ ] `npm run preview` succeeds and posts render in the Cloudflare preview environment

---

## Phase 4 — The first 3 launch posts (write these specifically; do NOT generate generic content)

These are chosen because they target searches Daniel can actually rank for given the existing keyword profile in `app/layout.tsx`.

### Post 1 — "How to ship a Lovable app to the App Store (the no-bullshit walkthrough)"
- **Slug:** `ship-lovable-app-to-app-store`
- **Target query:** "lovable to app store", "ship lovable app", "lovable app store submission"
- **Length:** 1,800–2,400 words
- **Outline:**
  1. Why "just wrap it in a webview" gets you Apple-rejected under Guideline 4.2
  2. The actual stack: Capacitor vs. Expo — when to use which
  3. Asset checklist (icon sizes, screenshot sizes, privacy manifest)
  4. App Store Connect walkthrough with screenshots
  5. The 4.2 appeal template (steal this — the same template Daniel uses)
  6. What it costs to do yourself vs. flat-fee with Publishd
- **Internal links:** `/pricing`, `/ship-web-app-to-app-store`, `/kickoff`
- **External links:** Apple's actual 4.2 documentation, Expo EAS docs, Capacitor docs

### Post 2 — "Apple Guideline 4.2 rejection: the appeal letter that actually works"
- **Slug:** `apple-4-2-rejection-appeal-template`
- **Target query:** "apple guideline 4.2 rejection", "apple 4.2 appeal", "minimum functionality rejection"
- **Length:** 1,200–1,600 words
- **Outline:**
  1. What 4.2 actually means (in plain English, with a screenshot of the rejection email)
  2. The 4 things Apple is *really* checking for
  3. Copy-paste appeal template (annotated with what to change)
  4. Real example: an app rejected, the appeal sent, and the approval that came back
  5. When to give up and add real native features instead of appealing
- **Internal links:** `/pricing` (specifically the Rejection Rescue $199 tier)

### Post 3 — "I shipped 10 apps to both stores. Here's what actually breaks."
- **Slug:** `ten-apps-shipped-lessons`
- **Target query:** "app store submission tips", "common app store rejections", "google play vs app store"
- **Length:** 2,000–3,000 words, narrative-driven
- **Outline:** Numbered list of the 10 most common things that broke, what fixed each, a screenshot of the rejection email or console error for each (Daniel must supply or recreate these — do not fabricate).
- **Internal links:** `/pricing`, `/ship-web-app-to-app-store`, `/kickoff`

**Voice guardrails for the writing agent:**
- Daniel speaks in first person. "I" and "you" — never "we" or "the team."
- No marketing fluff. Numbers in monospace where natural ("$99/yr", "20+ icon sizes", "7–14 days").
- Code blocks where helpful (CLI commands, JSON, plist snippets).
- No invented stats. If a claim isn't backed by Daniel's actual experience or a citable source, cut it.
- End every post with a single tight CTA — not a wall of buttons.

---

## Phase 5 — Ongoing SEO operations (recurring, after launch)

### 5.1 Cadence

- **2 posts/month minimum** — anything less and Google deprioritizes the blog as inactive.
- Always update `updated:` frontmatter when revising a post; resubmit via IndexNow.

### 5.2 Search Console hygiene (weekly, 5 min)

- **Performance** tab → look at Queries with impressions but no clicks. These are the long-tail keywords your content is *almost* ranking for. Write a post specifically targeting whichever ones overlap with what Daniel sells.
- **Coverage** tab → fix any crawl errors immediately. A single 500 on a sitemap URL can stall indexing for days.

### 5.3 Backlinks (the real ranking lever)

Search Console's foundation is solid; structured data is excellent. The next 6 months of growth depends almost entirely on backlinks. Practical sources for Daniel:
- Show HN posts when shipping notable customer apps (link to a case study post on the blog)
- Indie Hackers posts about pricing experiments and Apple rejections
- Replies on r/iOSProgramming, r/reactnative when someone asks "how do I submit?" — link to a *specific* blog post that answers (not a generic homepage drop, which gets removed as spam)
- Guest posts on AI builder tooling blogs (Lovable, Bolt) — they have audiences who hit the publishing wall and need exactly this service

### 5.4 Track what works

- Add UTM tags to outbound links you place yourself (`?utm_source=hn&utm_medium=comment&utm_campaign=4.2-post`) so Segment analytics actually attributes signups.
- Monthly check: which post brought in the most `Order Completed` events? Write more like that one.

---

## Phase 6 — Things to explicitly NOT do

- **Do not** add a comment system (Disqus, etc.). It's a privacy/perf liability for ~zero value at this traffic.
- **Do not** add AdSense or any third-party ad script. The site converts visitors to $399 customers; ads cannibalize that for pennies.
- **Do not** install heavy SEO plugins (`next-seo` is unnecessary — Next 15's native metadata API is doing everything those plugins wrap).
- **Do not** generate AI-written posts wholesale. Google's helpful content update penalizes obviously templated content. Use the agent to draft from Daniel's outline and edits, not to invent content from scratch.
- **Do not** target high-volume generic queries like "build an app." You will not rank against Apple, Google, and Squarespace. Win the long tail (`"lovable app store rejection"` has lower volume but converts).
- **Do not** rename existing slugs once published. Every rename = a 301 redirect and lost link equity.

---

## Quick reference — env vars to set on Cloudflare

```bash
npx wrangler secret put NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
npx wrangler secret put NEXT_PUBLIC_BING_SITE_VERIFICATION
# Existing (already wired):
# STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, GROQ_API_KEY, INTAKE_WEBHOOK_URL
```

---

## Order of operations summary

1. **Today:** Phase 1 (verify with Google + Bing, submit sitemap, claim Google Business Profile). 30 minutes of manual work; massive payoff.
2. **This week:** Phase 2 (audit fixes). One PR, ~2 hours.
3. **Next week:** Phase 3 (blog scaffolding). One PR, ~1 day.
4. **Week after:** Phase 4 (write and ship the 3 launch posts). Daniel writes, agent formats and SEO-optimizes.
5. **Forever:** Phase 5 (2 posts/month, weekly Search Console check, backlink hustle).

If you're the next Claude session picking this up: start at the topmost unchecked acceptance criterion in Phase 1 and work down. Don't skip ahead. Phases build on each other.
