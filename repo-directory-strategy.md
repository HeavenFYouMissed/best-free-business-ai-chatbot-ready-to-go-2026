# Repo Directory: Strategy & Build Plan
## "The job-based GitHub directory for humans and AI"

By Daniel Castellani — strategy doc for the next publishd asset.

---

## The Core Concept

A curated, structured directory of GitHub repositories organized by **job-to-be-done**, not by technology stack.

**Examples of "jobs":**
- "Build a navigation menu"
- "Build a pricing page"
- "Build a landing page hero"
- "Build a checkout flow"
- "Build a dashboard"
- "Build a settings page"
- "Build animations"
- "Build a blog"
- "Add authentication"
- "Add search"
- "Build forms"
- "Build a chat UI"

For each job, the directory shows:
- 5-15 best repos that solve that job
- What each repo actually does (plain English)
- When to use it / when NOT to use it
- Tech stack compatibility
- Star count, last commit, license, maintenance status
- Real examples of production sites using it
- Alternatives + comparisons

**The pitch:** Stop searching GitHub. Start shipping. The directory tells you exactly what to use for the thing you're building.

---

## Why This Wins

### The Problem It Solves

**For humans:**
- GitHub search is broken (it indexes by name, not by capability)
- `awesome-*` lists are uncurated (1,000 items, no opinion on which are best)
- Stack Overflow doesn't structure recommendations
- Reddit/Twitter recommendations are scattered and dated

**For AI agents:**
- LLMs hallucinate repos that don't exist or are outdated
- AI tools (Cursor, v0, Claude Code) need a reliable citation layer
- No structured source of "for job X, use repo Y" exists today

**Result:** Both humans and AI waste hours finding the right tool. Your directory makes it 30 seconds.

### Why It Compounds

This is a content moat that gets stronger over time:

1. **Programmatic SEO** — Each job-based page is a separate URL targeting separate queries. 50 jobs × 5 categories = 250+ rankable pages on day one.

2. **Long-tail keyword domination** — "best [thing] for [framework]" queries have low competition and high intent. Easy wins.

3. **AI citation flywheel** — Once Claude/ChatGPT cites your site once, it cites it forever (training data effect).

4. **Backlink magnet** — Curated lists are the most-linked content type on the web. Every "how to build X" tutorial will link to your X directory.

5. **Update advantage** — Repos go stale (last commit 3 years ago). Your directory flags this; competitors don't.

### What You're Actually Building

This isn't a "directory site." It's three things stacked:

1. **Reference layer for AI agents** (citation source)
2. **Discovery tool for developers** (replaces GitHub search)
3. **Lead magnet for publishd** (capture-then-convert funnel)

Each layer reinforces the others.

---

## Competitive Landscape (Who Does This Now)

### Current Options and Why They Fall Short

| Resource | What It Is | Where It Fails |
|----------|-----------|----------------|
| **GitHub `awesome-*` lists** | Community-curated lists by technology | Uncurated, no opinion, 1000s of items, often outdated |
| **GitHub Topics** | GitHub's own categorization | Auto-generated, no quality filter |
| **Awesome Lists Aggregators** (sotrending.com, awesomelists.top) | List of awesome lists | Just links to awesome lists, doesn't solve curation problem |
| **JS.org / npm** | Package registries | Not curated, no use-case grouping |
| **AlternativeTo** | Software alternatives | Apps/tools, not repos |
| **Product Hunt** | Product launches | Not GitHub-focused, not categorized by job |
| **DEV.to / Hashnode tutorials** | "Best React libraries" articles | Scattered, dated, single author opinions |
| **Reddit / r/webdev** | Developer recommendations | Not searchable, opinions vary, dated |

**The opening:** Nobody is doing job-based curation with consistent, opinionated quality scoring + AI-friendly structured data + freshness signals.

This is a category-of-one play if executed right.

---

## The Categories (Initial Map)

Below is a starting category map. Each item is a "job" that gets its own page.

### Category 1: WEBSITE BUILDING BLOCKS
- Build a navigation menu (header)
- Build a footer
- Build a hero section
- Build a pricing page
- Build a testimonials section
- Build a feature grid
- Build a CTA section
- Build a logo cloud / social proof
- Build a FAQ section
- Build a contact form

### Category 2: APP BUILDING BLOCKS
- Build a dashboard layout
- Build a sidebar navigation
- Build a settings page
- Build a notifications system
- Build a data table
- Build a chart / data viz
- Build a calendar / scheduler
- Build a kanban board
- Build a chat UI
- Build a command palette (cmd+k)

### Category 3: AUTH & USER
- Add authentication (email/pass)
- Add OAuth (Google, GitHub, etc.)
- Add magic link login
- Add 2FA / MFA
- Add user profile pages
- Add team / organizations
- Add roles & permissions
- Add billing & subscriptions

### Category 4: FORMS & INPUT
- Build a multi-step form
- Build a file upload
- Build a rich text editor
- Build a date picker
- Build search / autocomplete
- Build a code editor
- Build a markdown editor
- Build a drag-and-drop interface

### Category 5: CONTENT & MEDIA
- Build a blog
- Build documentation
- Build a portfolio / gallery
- Build a video player
- Build a podcast player
- Build image carousels
- Build a comments system

### Category 6: COMMERCE
- Build a product page
- Build a shopping cart
- Build a checkout flow
- Build subscription billing
- Build an inventory system
- Build customer portal
- Build invoicing

### Category 7: ANIMATIONS & EFFECTS
- Build scroll animations
- Build page transitions
- Build hover effects
- Build loading states
- Build particle / WebGL backgrounds
- Build cursor effects
- Build text animations

### Category 8: AI & ML
- Add a chatbot
- Add semantic search
- Add image generation
- Add transcription / speech-to-text
- Add document Q&A
- Add embeddings / vector search
- Add streaming responses

### Category 9: DEVOPS & DEPLOYMENT
- Set up CI/CD
- Add monitoring / analytics
- Add error tracking
- Add A/B testing
- Add feature flags
- Set up staging environments

### Category 10: INDIE / SOLO BUILDS
- Build a SaaS boilerplate
- Build a marketplace
- Build a job board
- Build a directory / listing site
- Build a newsletter
- Build a community / forum
- Build a course platform

---

## The Data Model

Every repo entry in the directory needs structured data. Here's the schema.

```yaml
repo:
  name: "shadcn/ui"
  github_url: "https://github.com/shadcn-ui/ui"
  
  # Identity
  one_liner: "Beautifully designed components built with Radix UI and Tailwind CSS"
  description: "Copy-paste component library — not installed via npm. Customize freely."
  
  # Metadata (auto-fetched from GitHub API)
  stars: 65000
  last_commit: "2026-04-15"
  license: "MIT"
  primary_language: "TypeScript"
  maintenance_status: "active"  # active, maintained, stale, abandoned
  
  # Categorization
  jobs:
    - "build-a-navigation-menu"
    - "build-a-dashboard-layout"
    - "build-a-pricing-page"
  
  tech_stack:
    - "react"
    - "nextjs"
    - "tailwind"
    - "typescript"
  
  # Curation (the value-add)
  best_for: 
    - "Modern React/Next.js apps"
    - "Teams that want full design control"
    - "Apps that need accessibility out of the box"
  
  not_for:
    - "Vue or Svelte projects"
    - "Teams that prefer pre-built theme systems (use Material UI instead)"
    - "Quick prototypes (steeper setup than alternatives)"
  
  # Comparison
  alternatives:
    - name: "Material UI"
      when_better: "When you want a more opinionated design system"
    - name: "Chakra UI"  
      when_better: "When you want CSS-in-JS instead of Tailwind"
    - name: "Radix UI (raw)"
      when_better: "When you want zero design assumptions"
  
  # Real-world proof
  used_by:
    - "vercel.com"
    - "linear.app dashboards"
    - "[real production sites]"
  
  # Curator notes (the human voice)
  notes: "This is the standard for new React projects in 2026. 
          The copy-paste approach is genuinely better than installing 
          a component library — you own the code and can modify freely. 
          Setup takes 15 minutes. Worth it."
  
  curator_rating: 9  # /10
  date_added: "2026-04-29"
  last_reviewed: "2026-04-29"
```

This structured data does triple duty:
1. **Renders beautifully on the page** (cards, tables, comparisons)
2. **Becomes JSON-LD schema markup** (Google understands what each entry is)
3. **AI-readable** (LLMs ingest it cleanly when crawling)

---

## SEO Strategy: Programmatic + Topical Authority

This is where the directory compounds into traffic.

### URL Structure

```
/repos/                                  # Main directory landing
/repos/jobs/                             # All jobs (browse by job)
/repos/jobs/build-a-navigation-menu/     # Job page (the money page)
/repos/jobs/build-a-pricing-page/        # Job page
/repos/categories/website-building-blocks/  # Category page (groups jobs)
/repos/tech/react/                       # Tech stack filter
/repos/tech/nextjs/                      # Tech stack filter
/repos/repo/shadcn-ui/                   # Individual repo profile
/repos/compare/shadcn-ui-vs-material-ui/ # Comparison page (high intent)
```

This URL structure gives you:
- **50 job pages** → 50 long-tail keyword targets
- **10 category pages** → 10 mid-tail keyword targets  
- **20 tech stack filter pages** → 20 framework-specific targets
- **500-1000 repo profile pages** → massive long-tail coverage
- **100 comparison pages** → high-intent commercial queries

**Total programmatic pages on day one: ~700-1,000**

### Keyword Targets

For each job page, you target:
- "build a [job]"  → e.g., "build a navigation menu"
- "[job] react"  → e.g., "navigation menu react"
- "best [job] library"  → e.g., "best navigation menu library"
- "[job] github"  → e.g., "navigation menu github"
- "open source [job]"  → e.g., "open source navigation menu"

Each query has 100-2,000 monthly searches. Low competition (most results are awesome-* lists). High intent (people are about to build something).

### The Topical Authority Play

(This applies the topical authority chapter from the SEO guide — see seo-guide-final.md.)

By covering every "build a X" job comprehensively, the site becomes the topical authority for "open source / GitHub repo discovery."

Ranking for the head term ("github repos", "open source libraries") follows naturally once topical authority compounds. Months 6-12, you start ranking for category-level queries. Year 2, head terms start moving.

---

## AI Optimization (The Citation Layer)

This is the hidden moat. Done right, AI agents will cite your site constantly.

### What Makes a Site AI-Citable

LLMs prefer:
1. **Structured data** (JSON-LD, clean HTML, predictable selectors)
2. **Factual statements** ("X has 65K stars, MIT license, last commit April 2026")
3. **Direct answers** (40-60 word leads on every page)
4. **Author/publisher entity** (clear who wrote it)
5. **Freshness signals** ("Last reviewed: April 2026")
6. **Comparison data** (when LLMs answer "X vs Y", they need this)

Every page in the directory hits all six.

### Specific AI Optimizations to Build In

**1. Direct-answer leads on every job page:**
```
Build a navigation menu using one of these top open-source libraries:
- shadcn/ui (React, 65K stars) — Best for modern Next.js apps
- Headless UI (React/Vue, 25K stars) — Best for Tailwind-first projects  
- Radix UI (React, 18K stars) — Best when you want unstyled primitives
- [continue list]
```

When ChatGPT/Claude/Perplexity answers "what's the best navigation menu library?", they pull this format directly.

**2. Comparison data on every repo page:**
```
shadcn/ui vs Material UI:
- Choose shadcn/ui if: [specific scenarios]
- Choose Material UI if: [specific scenarios]
- Key difference: [one-sentence summary]
```

LLMs love this format because users ask comparison questions constantly.

**3. JSON-LD structured data:**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "shadcn/ui",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Cross-platform",
  "softwareVersion": "0.8.0",
  "datePublished": "2023-01-15",
  "dateModified": "2026-04-15",
  "license": "https://opensource.org/licenses/MIT",
  "codeRepository": "https://github.com/shadcn-ui/ui",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "9",
    "bestRating": "10",
    "ratingCount": "1"
  }
}
```

**4. An llms.txt file at the root:**
```
/llms.txt
```

This is an emerging convention (similar to robots.txt) that explicitly tells LLMs how to use your content. Include it.

**5. Direct API for AI agents (later):**
Long-term: ship a public API endpoint. `GET /api/jobs/build-a-navigation-menu/repos` returns clean JSON. AI agents (Cursor, v0, Claude tools) can hit it directly.

This makes you the canonical source. Once a few AI tools integrate, you're embedded in the workflow.

---

## Tech Stack Recommendation

You're a publishd-style indie shipper. Build for speed and SEO.

**Recommended stack:**
- **Framework:** Next.js (SSG + SSR for SEO)
- **Hosting:** Cloudflare (your existing setup, fast globally)
- **Database:** Supabase Postgres (free tier handles 1,000s of repos)
- **CMS:** Custom admin (don't use a CMS — repos data is structured, build a simple admin)
- **Schema validation:** Zod (catches bad repo entries early)
- **GitHub data fetching:** GitHub API (auto-refresh stars, last commit, license)
- **Analytics:** Plausible or Cloudflare Analytics (lightweight)
- **Search:** Algolia free tier (1K-10K records) or Pagefind (static, free)

**Why this:**
- Static-first means fast pages (Core Web Vitals win)
- Cloudflare deploy you already know
- Postgres handles relational data (jobs ↔ repos ↔ tech stacks)
- GitHub API auto-updates metadata (no manual maintenance)

**Build complexity:** ~2-4 weeks for MVP if you've shipped Next.js + Postgres before.

---

## MVP Scope (Ship in 30 Days)

Don't try to launch with 1,000 pages. Ship a tight MVP, then expand.

### Phase 1 MVP (Weeks 1-4)

**Scope:**
- 1 category fully covered: "Website Building Blocks"
- 10 jobs in that category
- 8-12 repos per job (~100 total repos curated)
- Repo profile pages for each curated repo
- Search/filter by tech stack
- Tags + categories
- llms.txt + full schema markup

**What it ships with:**
- 10 job pages (each ranking for 5-10 keywords)
- 100 repo pages (each ranking for repo-specific queries)
- 1 category landing
- 1 main landing
- Total: ~115 pages

That's enough to validate:
- Does Google index it?
- Do users find value?
- Do AI agents start citing it?
- Does it convert to publishd leads?

### Phase 2 (Months 2-3)

If MVP shows traction, expand:
- Add 3 more categories (App Building Blocks, Forms & Input, Animations)
- 30 more jobs
- 300 more repos
- Add comparison pages
- Add user submissions (let people suggest repos)

### Phase 3 (Months 4-6)

If still working:
- All 10 categories live
- 100+ jobs
- 1,000+ repos
- AI agent API endpoint
- Newsletter (weekly "new repos" digest)
- Browser extension (find repos while on GitHub)

---

## Content Acquisition Strategy

You can't curate 1,000 repos manually. Here's how to populate it efficiently.

### Phase 1: Manual Seed (Weeks 1-3)

For each of the first 100 repos:
1. You personally add it (you've used 100+ in your work)
2. Write the curator notes from real experience
3. Rate it honestly

This is the trust foundation. Quality > quantity.

### Phase 2: AI-Assisted Bulk Add (Weeks 4-8)

Once you have a clean schema and ~100 manual entries as training:
1. Use Claude/GPT to draft entries from GitHub README + your prompts
2. AI fills in: one-liner, description, tech stack, comparison data
3. You review/edit each one before publishing
4. ~30 entries per hour with this workflow

### Phase 3: Community Submissions (Months 3+)

Once trust is established:
- Submission form: "Suggest a repo"
- You review submissions weekly
- High-quality submitters become contributors
- Eventually: trusted contributors can submit directly

### Phase 4: Auto-Detection (Long-term)

GitHub trending API + filtering:
- Monitor trending repos in dev categories
- AI screens for relevance to your jobs
- You approve or reject
- Keeps directory fresh without manual hunting

---

## Monetization (Multiple Layers)

The directory itself is free (drives traffic, builds authority).

### Layer 1: Lead Magnet for publishd

Every page has contextual CTAs:

```
Need a custom site that uses these tools? 
publishd ships conversion-focused websites for $499-$1,999 →
```

Conversion math (rough):
- 10,000 monthly visitors at maturity
- 2% click through to publishd
- 5% of those request a quote
- 30% close
- = 3 customers/month from directory alone
- = $3K-6K/month in publishd revenue

That's the floor. Realistic range is higher once it ranks.

### Layer 2: Newsletter Sponsorships

Once newsletter has 5K-10K subscribers (developers, indie hackers):
- Sponsor slots: $500-2,000 per send
- Open jobs section (companies hiring devs)
- Tool launches (sponsored repo features)

Realistic: $2K-10K/month at scale.

### Layer 3: Premium / Paid Tier (Optional)

Free tier: All public data. Limited search.
Paid tier ($9-19/month): 
- Advanced filters (license type, maintenance status, team size)
- "Repos like X" recommendations
- Email alerts when matching repos launch
- Personal saved lists / collections
- API access (rate-limited free, unlimited paid)

This tier only makes sense after 10K+ users. Don't build it day one.

### Layer 4: Affiliate / Sponsorship for Repos

Some repos have paid versions or hosted services (Supabase, Vercel, etc.). Affiliate links where appropriate. Disclosure-first, never compromises curation.

### Layer 5: API as a Product

Once AI agents are citing you regularly, the API itself becomes valuable:
- Free tier: 100 calls/day
- Paid tier: $29-99/month for unlimited calls
- Enterprise: custom pricing for tools building on your data

Realistic: $5K-50K/month if AI tools integrate.

---

## Domain & Branding

You have options. Pick based on long-term ambition.

### Option A: Subdomain of publishd
- `repos.publishd.app` or `directory.publishd.app`
- Easier to launch, inherits some publishd authority
- Tighter coupling with publishd brand
- Subdomain SEO is slightly weaker than separate domain

### Option B: Subfolder of publishd  
- `publishd.app/repos`
- Strongest SEO (full domain authority)
- Even tighter brand coupling
- Risk: directory dominates search and confuses publishd's positioning

### Option C: Standalone Domain
- `shipfast.repos`, `repofinder.io`, `bestrepos.dev`, etc.
- Independent brand, can be sold/spun off later
- Builds its own authority over time
- More work upfront, no inherited authority

**My recommendation:** Start as `publishd.app/repos` (Option B). You get SEO leverage from publishd's existing domain. If it grows huge, migrate to standalone domain later (with proper 301 redirects, you keep authority).

### Branding Direction

Match publishd's voice: tactical, no-hype, founder-built.

Tagline candidates:
- "GitHub repos, organized by what you're building"
- "Stop searching. Start shipping."
- "The job-based directory of open source"
- "Find repos by what you need, not what they're called"

Visual: clean, dark/light mode, readable code blocks, compact data tables. Think Linear meets DEV.to meets Notion.

---

## Launch Strategy

### Pre-Launch (Weeks 1-3)
- Build MVP
- Curate 100 repos across 10 jobs
- Set up email capture: "Get notified when we launch"
- Tweet build-in-public threads showing progress
- Post in indie hacker / dev communities about what you're building

### Launch Day (Week 4)
- Post on Hacker News: "Show HN: I curated 100 GitHub repos by job-to-be-done (free)"
- Post on Product Hunt
- Post on Reddit (r/webdev, r/SideProject, r/indiehackers, r/SaaS)
- Tweet announcement thread
- Email anyone who signed up for "notify me"
- Post in publishd's existing channels

### Post-Launch (Weeks 5-8)
- Daily Twitter threads: "Repo of the day" — drives ongoing traffic
- Weekly newsletter: New repos added, trends spotted
- Reach out to 20 dev newsletter operators with a tip about the directory
- Submit to relevant directories (Awesome Lists, Awesome Awesome)
- Guest posts on dev publications (DEV.to, Hashnode) about the curation process

### Months 3-6
- Monitor what gets cited (use Profound/Otterly to track AI mentions)
- Double down on jobs that rank fast
- Add categories the audience requests most
- Build the API layer if AI tools start integrating

---

## Risk & Reality Check

### What Could Kill This

**Risk 1: Manual curation doesn't scale**
- Mitigation: AI-assisted entry creation + community submissions

**Risk 2: Content scraping**
- Someone copies your data and outranks you
- Mitigation: schema-marked authorship, freshness updates, AI citation moat (once cited, hard to displace)

**Risk 3: GitHub API changes**
- Rate limits or pricing changes
- Mitigation: cache aggressively, fallback to scraping, GitHub is unlikely to break dev tools

**Risk 4: AI agents kill discovery**
- If LLMs get great at recommending repos directly, do humans need a directory?
- Counter: LLMs need source data — your directory becomes the source. You serve LLMs, not compete with them.

**Risk 5: You burn out before it compounds**
- Curating 1,000 repos is a real time sink
- Mitigation: start with 100, expand only if MVP shows traction. Don't overbuild before validating.

### What's Realistic

**Honest expectations:**

- Months 1-3: 50-500 monthly visitors. Mostly your network. No revenue.
- Months 3-6: 500-3,000 monthly visitors. Long-tail rankings start. First publishd leads.
- Months 6-12: 3,000-15,000 monthly visitors. Mid-tail rankings. AI citations start.
- Year 2: 15,000-100,000 monthly visitors. Topical authority compounds. Multiple revenue layers.

**Time investment:**
- MVP: 80-120 hours (~3-4 weeks if focused)
- Maintenance: 5-10 hours/week (curating new repos, updating stale entries, content)
- Promotion: 2-3 hours/week (Twitter, newsletter, community posts)

**Total:** A real side project. Not a weekend hack. Not a full-time job.

---

## How This Connects to publishd Strategy

This isn't a separate business — it's a strategic asset that strengthens publishd:

### 1. Authority Compounding
Both publishd and the directory build the same brand: "Daniel/publishd ships and curates the best of indie web."

### 2. Lead Generation
Directory traffic → publishd leads. Free → paid funnel.

### 3. Content Moat
Together with the SEO guide, you have three flagship assets:
- **publishd.app** (the service)
- **SEO guide** (the educational lead magnet)
- **Repo directory** (the reference / utility lead magnet)

Each ranks for different keywords. Each cross-links to the others. Each converts traffic differently.

### 4. AI Visibility
Both the SEO guide and the directory will be cited by AI agents. When ChatGPT mentions publishd, it's because of these two assets — not because of marketing copy on your service page.

### 5. Defensibility
A site with curated content + active updates + structured data + AI citations is hard to compete with. Anyone can copy your service page. Replicating two years of curation is much harder.

---

## Decision Framework

Before you commit to building this, answer:

1. **Time:** Do you have 80-120 hours over the next 4 weeks for an MVP?
2. **Maintenance:** Can you commit 5-10 hours/week ongoing?
3. **Patience:** Can you wait 6-12 months for meaningful traffic?
4. **Focus:** Will this distract from publishd's core service work?

If yes to 1-3 and "no, it complements publishd" to #4 — build it.

If you're slammed with publishd client work, **don't build this right now**. The SEO guide alone is enough new asset for one quarter. Ship that, see results, then come back to this.

---

## Next Concrete Steps

If you decide to build:

**Week 1:**
- [ ] Pick the URL structure (publishd.app/repos vs standalone)
- [ ] Set up Next.js + Postgres skeleton
- [ ] Define the data schema (use the YAML above as starting point)
- [ ] Build the admin (form to add repos)
- [ ] Build the GitHub API integration (auto-fetch metadata)

**Week 2:**
- [ ] Curate first 50 repos manually (jobs you personally know)
- [ ] Build job page template
- [ ] Build repo profile page template
- [ ] Add JSON-LD schema everywhere
- [ ] Add llms.txt

**Week 3:**
- [ ] Curate 50 more repos (round to 100)
- [ ] Build category landing pages
- [ ] Build search/filter UI
- [ ] Add internal linking between repos/jobs
- [ ] QA all pages, mobile testing

**Week 4:**
- [ ] Set up email capture
- [ ] Build out one comparison page as test
- [ ] Submit sitemap to Search Console
- [ ] Pre-launch on Twitter, build interest
- [ ] Launch publicly (HN, PH, Reddit, newsletter)

---

## Closing

This idea sits at the intersection of three trends:
1. AI agents need curated training/citation sources
2. Indie devs are tired of GitHub search broken-ness
3. Programmatic SEO + topical authority still works in 2026

You'd be one of the first to do this with quality curation + AI optimization + a clear monetization stack.

The first 100 repos will be the hardest. After that, you have momentum, structure, and signal.

If you build it: ship the MVP, validate, then expand. Don't try to be comprehensive on day one. Be useful on day one, comprehensive in a year.

— Daniel

*Strategy doc generated 2026-04-29 — companion to seo-guide-final.md and publishd-implementation-plan.md*
