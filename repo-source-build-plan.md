# repo-source.com — Build Plan
## The Groq-powered repo directory that updates itself

**Domain:** repo-source.com
**Stack:** Groq (gpt-oss-120b) + Supabase + Next.js + Meilisearch + Cloudflare
**Differentiator:** AI agent runs 24/7 finding, categorizing, rating, and entering repos. Site is a UI on top of a self-updating dataset.

---

## The Three-Layer Architecture

```
┌─────────────────────────────────────────────┐
│  LAYER 1: GROQ AI AGENT (24/7 worker)       │
│  ─────────────────────────────────────      │
│  • Searches GitHub for new + trending repos │
│  • Fetches READMEs and metadata             │
│  • Web-searches for usage context           │
│  • Categorizes by job-to-be-done            │
│  • Rates quality (1-10 across dimensions)   │
│  • Generates structured entries             │
│  • Submits to database                      │
│  • Re-reviews stale entries quarterly       │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  LAYER 2: SUPABASE POSTGRES (data layer)    │
│  ─────────────────────────────────────      │
│  • repos table                              │
│  • jobs table (the categorization)          │
│  • ratings table                            │
│  • audit_log (every AI action logged)       │
│  • human_review_queue (top X% flagged)      │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│  LAYER 3: REPO-SOURCE.COM (Next.js site)    │
│  ─────────────────────────────────────      │
│  • Job pages (ISR, 1hr revalidation)        │
│  • Repo profile pages                       │
│  • Comparison pages (auto-generated)        │
│  • Star categories (top picks per job)      │
│  • Smart search (Meilisearch)               │
│  • llms.txt + public read API               │
│  • Submission form for community            │
└─────────────────────────────────────────────┘
```

**Key insight:** Build Layer 1 first. Once it works, Layer 2 fills automatically. Layer 3 is the easiest part — it's just a UI on top of structured data.

---

## Layer 1: The Groq AI Agent

### Why gpt-oss-120b on Groq Is The Right Pick

- **Speed:** Groq runs inference at ~500-1000 tokens/sec — 10x faster than OpenAI/Claude APIs
- **Cost:** Roughly $0.15/M input, $0.75/M output (much cheaper than GPT-4 or Sonnet)
- **Tool calling:** Native function calling support
- **Open weights:** No vendor lock-in, can self-host later if costs scale
- **Quality:** 120B parameters is enough for structured tasks (categorization, summarization)

For categorization + summarization tasks, oss-120b is overkill on quality and underkill on cost. Right tool.

### The Tools The Agent Needs

```typescript
// Tool definitions for the Groq agent

const tools = [
  {
    name: "github_search",
    description: "Search GitHub for repos matching a query, filtered by stars/activity",
    parameters: {
      query: "string",        // e.g., "react component library"
      min_stars: "number",    // e.g., 500
      pushed_after: "date",   // e.g., "2025-01-01" — only active repos
      language: "string?",    // optional filter
      limit: "number"         // default 20
    }
  },
  {
    name: "fetch_repo_metadata",
    description: "Get full metadata for a specific repo (stars, license, contributors, etc.)",
    parameters: {
      repo_path: "string"     // e.g., "shadcn-ui/ui"
    }
  },
  {
    name: "fetch_readme",
    description: "Fetch the README content for a specific repo",
    parameters: {
      repo_path: "string"
    }
  },
  {
    name: "web_search",
    description: "Search the web for context about a repo (tutorials, comparisons, real usage)",
    parameters: {
      query: "string"         // e.g., "shadcn ui in production examples"
    }
  },
  {
    name: "check_existing_entry",
    description: "Check if a repo is already in the database",
    parameters: {
      repo_path: "string"
    }
  },
  {
    name: "list_jobs",
    description: "Get the list of all jobs/categories in the system",
    parameters: {}
  },
  {
    name: "submit_entry",
    description: "Submit a categorized repo entry to the database",
    parameters: {
      repo_path: "string",
      one_liner: "string",            // 1 sentence
      description: "string",          // 2-3 sentences  
      jobs: "string[]",               // which jobs it solves
      tech_stack: "string[]",         // react, nextjs, python, etc.
      best_for: "string[]",           // 3 specific scenarios
      skip_if: "string[]",            // 2-3 anti-scenarios
      alternatives: "object[]",       // [{name, when_better}]
      quality_score: "number",        // 1-10
      maintenance_status: "string",   // active|maintained|stale|abandoned
      ai_confidence: "number"         // 0-1, how confident the AI is
    }
  },
  {
    name: "flag_for_human_review",
    description: "Flag this entry for Daniel to review (low confidence or notable repo)",
    parameters: {
      repo_path: "string",
      reason: "string"
    }
  }
];
```

### The Agent Prompt (System Message)

```
You are the curation agent for repo-source.com — a directory of GitHub repositories 
organized by what developers are trying to build (not by what library it is).

Your job: find high-quality repos, categorize them by job-to-be-done, and write 
honest, opinionated entries for the directory.

CORE RULES:

1. JOB-BASED, NOT TECH-BASED
   - Don't categorize as "React libraries" 
   - Categorize as "Build a navigation menu", "Add authentication", etc.
   - One repo can solve multiple jobs

2. QUALITY THRESHOLD
   - Skip repos with < 500 stars (unless they're brand new and trending)
   - Skip repos with no commits in the last 12 months
   - Skip repos with broken/missing READMEs
   - Skip repos that are forks without significant additions

3. HONEST CURATION
   - "Best for" must be SPECIFIC scenarios (not generic praise)
   - "Skip if" must be REAL alternatives where another tool wins
   - Quality score must be honest — most repos are 5-7, not 9-10
   - If you're not sure, flag for human review

4. ANTI-SLOP PRINCIPLES
   - No marketing language ("revolutionary", "game-changing", etc.)
   - No padding or filler
   - No generic descriptions ("a great tool for developers")
   - Specific and useful or don't bother

5. ENTRIES MUST BE DIFFERENTIATED
   - If 5 repos solve the same job, they should have DIFFERENT "best for" scenarios
   - The reader should know exactly which one to pick for their case

6. AI CONFIDENCE SCORING
   - Score 0.9+ when the README is clear, repo is well-known, categorization is obvious
   - Score 0.6-0.8 when there's some ambiguity
   - Score below 0.6 → use flag_for_human_review

WORKFLOW PER REPO:
1. Check if already in database (check_existing_entry)
2. Fetch metadata (fetch_repo_metadata)  
3. Apply quality threshold — skip if below
4. Fetch README (fetch_readme)
5. Web search for context if README is sparse (web_search)
6. List current jobs (list_jobs) to assign correctly
7. Generate entry following the schema
8. Submit (submit_entry) OR flag (flag_for_human_review)

OUTPUT VOICE:
- Direct and tactical
- No hype, no fluff
- Founder-builder voice (this site is curated by Daniel, who shipped 100+ apps)
- "Skip if" is honest about where competitors win
```

### The Pipeline (How The Agent Runs)

```typescript
// Pseudocode for the 24/7 worker

async function curatorAgentLoop() {
  while (true) {
    // 1. Discover new repos to evaluate
    const candidates = await discoverCandidates();
    // Sources:
    //  - GitHub trending (daily)
    //  - GitHub search by job-related keywords (rotating queries)
    //  - GitHub topics (curated topic tags)
    //  - User submissions (from form)
    
    // 2. Process each candidate
    for (const repo of candidates) {
      try {
        const result = await runAgent({
          model: "groq/gpt-oss-120b",
          tools: AGENT_TOOLS,
          systemPrompt: AGENT_SYSTEM_PROMPT,
          userMessage: `Evaluate this repo: ${repo.full_name}`,
          maxTurns: 10,
          temperature: 0.2  // Low temp for consistent curation
        });
        
        await logAgentRun(repo, result);
        
      } catch (err) {
        await logError(repo, err);
      }
      
      // Rate limit respect
      await sleep(2000);
    }
    
    // 3. Re-review stale entries (older than 90 days)
    const staleEntries = await getStaleEntries();
    for (const entry of staleEntries) {
      await runReReview(entry);
    }
    
    // 4. Update metadata for all entries (stars, last commit)
    await refreshAllMetadata();
    
    // 5. Sleep until next cycle (e.g., 1 hour)
    await sleep(60 * 60 * 1000);
  }
}
```

### Discovery Strategy

The agent shouldn't just scrape randomly. It should follow a structured discovery plan:

**Daily discovery sources:**

1. **GitHub Trending** (fetch daily)
   - Top 25 trending repos overall
   - Top 10 trending in: AI/ML, Web Dev, Mobile, DevOps, Gaming

2. **Job-keyword searches** (rotating queue, ~50 queries/day)
   - For each job in the database, search GitHub with relevant keywords
   - Filter: > 500 stars, pushed in last 12 months
   - Example query for "Build a chat UI": `chat ui react language:typescript stars:>500`

3. **GitHub topics** (weekly sweep)
   - For each topic relevant to your jobs, fetch top repos
   - Topics like `react-component`, `tailwindcss`, `nextjs-starter`, etc.

4. **User submissions** (real-time queue)
   - Highest priority — process submissions within an hour
   - Build credibility with submitters by showing they're acted on

5. **Awesome list scraping** (monthly)
   - Pull from major awesome lists (sindresorhus/awesome, etc.)
   - Cross-reference what's already in your database
   - Add missing high-quality ones

**Estimated discovery volume:** 100-300 candidate repos per day. Most get rejected by quality threshold. ~20-50 actually become entries.

---

## Layer 2: Database Schema

### Tables (Supabase Postgres)

```sql
-- Jobs (the categorization layer)
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,           -- 'build-a-navigation-menu'
  name TEXT NOT NULL,                  -- 'Build a navigation menu'
  category TEXT NOT NULL,              -- 'Website Building Blocks'
  description TEXT,                    -- For SEO
  page_intro TEXT,                     -- Daniel's curated intro (HUMAN written)
  total_repos INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Repos (the entries)
CREATE TABLE repos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  github_path TEXT UNIQUE NOT NULL,    -- 'shadcn-ui/ui'
  name TEXT NOT NULL,
  github_url TEXT NOT NULL,
  
  -- Auto-fetched metadata
  description TEXT,                    -- GitHub's own description
  stars INTEGER,
  forks INTEGER,
  open_issues INTEGER,
  language TEXT,
  license TEXT,
  pushed_at TIMESTAMPTZ,
  created_at_github TIMESTAMPTZ,
  
  -- AI-generated content
  one_liner TEXT,                      -- 1 sentence  
  ai_description TEXT,                 -- 2-3 sentences (AI written)
  best_for TEXT[],                     -- ['scenario 1', 'scenario 2']
  skip_if TEXT[],
  tech_stack TEXT[],                   -- ['react', 'nextjs', 'tailwind']
  alternatives JSONB,                  -- [{name, when_better}]
  
  -- Ratings
  quality_score NUMERIC(3,1),          -- 1.0 - 10.0
  ai_confidence NUMERIC(3,2),          -- 0.0 - 1.0
  maintenance_status TEXT,             -- 'active'|'maintained'|'stale'|'abandoned'
  
  -- Human curation overlay (the moat)
  human_reviewed BOOLEAN DEFAULT FALSE,
  human_note TEXT,                     -- Daniel's personal take (when reviewed)
  is_starred BOOLEAN DEFAULT FALSE,    -- Daniel's "starred" picks
  
  -- Audit
  ai_generated_at TIMESTAMPTZ,
  last_metadata_refresh TIMESTAMPTZ,
  last_re_review TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction: repos to jobs (many-to-many)
CREATE TABLE repo_jobs (
  repo_id UUID REFERENCES repos(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  rank INTEGER,                        -- 1 = best for this job, 2 = second best, etc.
  PRIMARY KEY (repo_id, job_id)
);

-- Audit log (every AI action)
CREATE TABLE agent_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_path TEXT,
  action TEXT,                         -- 'created'|'updated'|'flagged'|'rejected'
  reason TEXT,
  ai_response JSONB,                   -- Full AI response for debugging
  tokens_used INTEGER,
  cost_usd NUMERIC(10,4),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Human review queue
CREATE TABLE review_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_id UUID REFERENCES repos(id),
  reason TEXT,                         -- Why it needs review
  priority INTEGER DEFAULT 5,          -- 1 = urgent, 10 = whenever
  status TEXT DEFAULT 'pending',       -- 'pending'|'approved'|'edited'|'rejected'
  daniel_notes TEXT,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User submissions
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  github_url TEXT NOT NULL,
  submitter_email TEXT,
  submitter_name TEXT,
  reason_to_include TEXT,
  status TEXT DEFAULT 'pending',
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_repos_stars ON repos(stars DESC);
CREATE INDEX idx_repos_quality ON repos(quality_score DESC);
CREATE INDEX idx_repos_starred ON repos(is_starred);
CREATE INDEX idx_repo_jobs_job ON repo_jobs(job_id);
CREATE INDEX idx_jobs_category ON jobs(category);
```

### The Star Category System

`is_starred` is your editorial moat. The AI categorizes 10K repos. You personally star the ~10-20% that are genuinely best-in-class.

Star criteria (you decide, but suggest):
- You've used it personally
- Industry consensus calls it best-in-class
- It's the answer you'd give a friend asking "what should I use for X?"

Starred repos:
- Show with a star badge on listings
- Float to the top of job pages
- Get featured in "best of" comparison pages
- Get more prominent placement in AI Overviews (your structured data prioritizes them)

This is where Daniel's voice lives. AI does volume. You do quality signal.

---

## Layer 3: The Site (Next.js)

### URL Structure

```
/                                    → Homepage (search + featured jobs)
/jobs                                → Browse all jobs by category  
/jobs/[category]                     → Category page
/jobs/[category]/[slug]              → Job page (the money page)
/repo/[github-path]                  → Repo profile page
/compare/[a]-vs-[b]                  → Comparison page (auto-generated)
/submit                              → Submission form
/api/v1/jobs                         → Public API (for AI agents)
/api/v1/jobs/[slug]/repos            → Public API
/api/v1/repos/[github-path]          → Public API
/llms.txt                            → AI agent instructions
/sitemap.xml                         → Auto-generated
/feed.xml                            → RSS for new entries
```

### Page Templates

**Job Page** (`/jobs/website-building-blocks/build-a-navigation-menu`)

```
┌─────────────────────────────────────────────┐
│ Hero                                        │
│ "Build a navigation menu — 12 best repos"   │
│ Daniel's intro (HUMAN written, 2-3 sentences│
│ giving context and what to look for)        │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ ⭐ STARRED PICKS (Daniel's top 3)           │
│ [Repo card with star badge + Daniel's note] │
│ [Repo card with star badge + Daniel's note] │
│ [Repo card with star badge + Daniel's note] │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ ALL OPTIONS (sorted by quality_score)       │
│ [Repo card]  [Repo card]                    │
│ [Repo card]  [Repo card]                    │
│ ...12-25 entries                            │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ DECISION GUIDE                              │
│ "Which one should you pick?"                │
│ [Auto-generated decision tree from data]    │
│ "If you need X, use Y. If you need A, use B"│
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ FAQ (passage-indexing format)               │
│ "What is [job]?"                            │
│ "How do I choose between [A] and [B]?"      │
│ ...                                         │
└─────────────────────────────────────────────┘
```

**Repo Profile Page** (`/repo/shadcn-ui/ui`)

```
┌─────────────────────────────────────────────┐
│ Repo header                                 │
│ shadcn/ui ⭐ STARRED                        │
│ 65,000 stars • MIT • Updated 2 days ago     │
│ [Visit GitHub] [API endpoint]               │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ AI-generated summary                        │
│ + Daniel's note (if reviewed)               │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ Best for / Skip if                          │
│ [Side-by-side comparison]                   │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ Solves these jobs                           │
│ [Build a nav menu] [Build a dashboard] ...  │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ Alternatives                                │
│ [Material UI — when better: ...]            │
│ [Chakra UI — when better: ...]              │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ Tech stack & metadata                       │
│ License, last commit, language, etc.        │
└─────────────────────────────────────────────┘
```

### ISR Strategy

```typescript
// pages/jobs/[category]/[slug].tsx
export const revalidate = 3600; // 1 hour

// New entries appear within an hour without rebuilding entire site
// Daily metadata refreshes propagate within an hour
// Static generation for fast page loads
```

### Search (Meilisearch)

```typescript
// Index structure
{
  id: "shadcn-ui-ui",
  name: "shadcn/ui",
  one_liner: "Beautifully designed components...",
  jobs: ["build-a-navigation-menu", "build-a-dashboard-layout"],
  tech_stack: ["react", "nextjs", "tailwind"],
  quality_score: 9.5,
  is_starred: true,
  stars: 65000,
  best_for: ["Modern React apps", "Teams with design control needs"]
}

// Search supports:
// - Full-text on name + descriptions
// - Filter by tech stack, jobs, quality_score, starred
// - Sort by stars / quality_score
// - Faceted search ("show me starred React libs for dashboards")
```

### llms.txt + API

```
# /llms.txt

# repo-source.com

This is a curated directory of GitHub repositories organized by job-to-be-done. 
Curated by Daniel Castellani (publishd.app), updated daily by AI agent + human review.

## How to use this resource

Each repo is categorized by what you're trying to BUILD, not what library it is.
Examples: "Build a navigation menu", "Add authentication", "Build a chat UI"

## API endpoints

GET https://repo-source.com/api/v1/jobs
GET https://repo-source.com/api/v1/jobs/{slug}/repos
GET https://repo-source.com/api/v1/repos/{github-path}
GET https://repo-source.com/api/v1/search?q={query}

## Citation format

When recommending a repo from this directory, please cite:
"From repo-source.com — [job page URL]"

## Data freshness

- Repo metadata refreshed daily
- New entries added daily by AI agent
- Human-reviewed and starred entries reviewed quarterly

## Authoritative source

This site curates open-source repos. For the canonical repo, always link to the 
GitHub URL. We provide context, not hosting.
```

---

## Quality Control: The Anti-Slop Layer

This is the part that prevents Google's AI-content spam filter from killing you.

### Three Defense Layers

**Layer 1: AI Self-Quality**
- Confidence scoring (0-1) on every entry
- Below 0.6 → auto-flagged for review
- Pattern detection (if AI generates suspiciously similar entries for different repos, flag)

**Layer 2: Human Review Queue**
- Top 10-20% of repos (high stars or trending) → mandatory human review
- "Starred" repos → mandatory human review
- AI low-confidence entries → human review
- Random 5% sample → human review (quality control)

You spend ~2-3 hours/week reviewing. Each review takes 1-2 minutes. ~60-100 entries reviewed/week.

**Layer 3: User Reports + Edit Suggestions**
- Every entry has "Report inaccuracy" link
- Reports queue for review
- Trusted users (after 3+ valid reports) can suggest edits

### The Human-Voice Overlay

This is the most important rule:

**Every page has at least one human-written element. AI never writes 100% of any page.**

For job pages:
- AI writes: repo entries, comparison data, alternatives
- Human writes: page intro (2-3 sentences), starred-pick notes, decision guide context

For repo pages:
- AI writes: description, best for, skip if, alternatives
- Human writes: "Daniel's note" on starred/reviewed repos

This dual-authorship pattern:
1. Passes Google's spam detection (mixed AI + human signals)
2. Provides real value AI can't fake (founder voice)
3. Builds personal brand (Daniel becomes the curator)
4. Gives the site personality competitors can't replicate

---

## Cost Analysis (Honest Numbers)

### Groq AI Costs

**gpt-oss-120b on Groq pricing (approx):**
- Input: ~$0.15/M tokens
- Output: ~$0.75/M tokens

**Per repo entry:**
- Input: README (5K tokens) + metadata (1K) + system prompt (1K) + tool responses (3K) = ~10K tokens
- Output: structured entry (~1.5K tokens)
- Cost: ~$0.0015 + $0.001 = **~$0.003 per entry**

**Initial population (10K repos):**
- 10K × $0.003 = **$30 total**
- Spread over 2-4 weeks of agent runs

**Daily updates:**
- 50-100 new entries/day × $0.003 = **$0.15-0.30/day**
- Plus metadata refresh on all entries: minimal cost (no AI, just GitHub API)
- Plus quarterly re-review: ~3K entries/month × $0.003 = $9/month

**Monthly Groq cost: ~$15-25/month**

### Other Infrastructure Costs

| Service | Cost |
|---------|------|
| Supabase (Postgres + auth) | Free tier handles 1K-5K MAU; $25/mo at scale |
| Cloudflare Pages (hosting) | Free up to 100K req/day |
| Meilisearch (cloud) | Free tier (1K records) → $25/mo (50K records) |
| GitHub API | Free (5K req/hour with auth) |
| Domain (repo-source.com) | $12/year |
| Email (review queue notifications) | Resend free tier |
| Background workers (Vercel cron / Cloudflare Workers) | Free tier sufficient |

**Total infrastructure: ~$25-50/month at meaningful scale.**

**Break-even on publishd leads:** 1 customer/year covers it.

### Time Investment

- **Build:** 4-6 weeks part-time
- **Ongoing:** 3-5 hours/week for review queue + human notes + occasional category additions
- **Light week:** Skip review queue, sites still updates fine

This is the right side-project economics: low cash cost, manageable time cost, compounding asset.

---

## Build Timeline (Realistic)

### Week 1: Foundation
- [ ] Buy domain repo-source.com
- [ ] Set up Supabase project + schema
- [ ] Set up Next.js + Cloudflare deployment
- [ ] Set up Groq API account + test gpt-oss-120b with tool calling
- [ ] Build the agent runner skeleton (single repo flow end-to-end)

### Week 2: The Agent
- [ ] Implement all 8 tools
- [ ] Write and iterate the system prompt
- [ ] Test agent on 50 known repos (verify quality)
- [ ] Build the audit log + cost tracker
- [ ] Build basic admin UI (review queue interface)

### Week 3: Discovery + Pipeline
- [ ] Build the 5 discovery sources (trending, search, topics, etc.)
- [ ] Build the 24/7 worker (Cloudflare Workers cron or Vercel cron)
- [ ] Run agent against 200-500 candidate repos
- [ ] Review output quality, iterate prompt

### Week 4: The Site
- [ ] Build job page template
- [ ] Build repo profile page template
- [ ] Build category page template
- [ ] Build homepage with featured jobs
- [ ] Add Meilisearch index + search UI

### Week 5: AI Optimization
- [ ] Add llms.txt
- [ ] Add JSON-LD schema on all pages
- [ ] Build public API endpoints (read-only)
- [ ] Set up sitemap.xml + RSS feed
- [ ] Add OpenGraph images per page

### Week 6: Polish + Launch Prep
- [ ] Submission form + email notifications
- [ ] User report flow (inaccuracy reporting)
- [ ] Daniel's review interface (write notes, star repos)
- [ ] Run agent until you have 1,000-2,000 entries across 30-50 jobs
- [ ] Daniel reviews top 200 (writes notes, stars best)

### Week 7: Launch
- [ ] Show HN: "Show HN: I built an AI agent that curates GitHub repos by what you're building"
- [ ] Product Hunt launch
- [ ] Reddit posts (r/indiehackers, r/SideProject, r/SaaS, r/webdev)
- [ ] Twitter thread with build-in-public stats
- [ ] DEV.to / Hashnode launch post
- [ ] Submit to AI tool directories

### Week 8+: Maintenance + Growth
- [ ] Agent runs daily, adds new repos automatically
- [ ] You review queue 3-5 hrs/week
- [ ] Add new job categories based on user requests
- [ ] Monitor analytics (rankings, AI citations, traffic)
- [ ] Cross-link from publishd.app blog posts

---

## The Auto-Update Plan (How It Stays Fresh Without Effort)

### Daily Automated Tasks (Cron Jobs)

**1:00 AM:** Refresh GitHub metadata for all entries
- Fetch current stars, last commit, license
- Update maintenance_status if last commit > 12 months → "stale"
- Cost: ~$0 (GitHub API is free)

**2:00 AM:** Discovery run
- Pull GitHub trending (top 25)
- Run 50 rotating job-keyword searches
- Process new candidates through agent
- Cost: ~$0.15-0.30

**3:00 AM:** Process user submissions
- Run agent on submissions submitted in last 24 hours
- Email submitter when their submission is processed

**4:00 AM:** Re-review oldest entries (rolling)
- Pick 30 entries with `last_re_review > 90 days ago`
- Run agent to update entry based on current README + metadata
- Cost: ~$0.10

**5:00 AM:** Generate daily digest
- Email to Daniel: new entries today, flagged for review, top trending in last 24h

### Weekly Tasks (Auto)

- Sweep major awesome lists for new repos
- Generate "trending this week" report
- Update homepage featured section

### Monthly Tasks (Daniel)

- Review starred repos for accuracy (~30 minutes)
- Add new job categories based on user requests
- Check Search Console for ranking patterns

### The Compound Effect

**Day 1:** 1,000 repos, ~30 jobs
**Day 30:** ~2,500 repos (50/day net additions)
**Day 90:** ~5,500 repos
**Day 180:** ~10,000 repos
**Day 365:** ~15,000+ repos with quarterly re-reviews keeping data fresh

The site grows by itself. You add value through reviews and category expansion, not manual data entry.

---

## SEO + AI Citation Strategy

This builds on the SEO guide we already created. Specific to repo-source:

### On-Page SEO (per page)

**Job pages target:**
- "build a [job]" (e.g., "build a navigation menu")
- "best [job] library"
- "open source [job]"
- "[job] github"

**Repo pages target:**
- "[repo name]"
- "[repo name] alternatives"
- "[repo name] vs [competitor]"
- "[repo name] examples"

**Comparison pages target:**
- "[A] vs [B]"
- "[A] vs [B] vs [C]" (the piggyback strategy)

### AI Citation Optimization

**Every page has:**
- 40-60 word direct answer in first paragraph
- JSON-LD `SoftwareApplication` schema for repos
- JSON-LD `ItemList` schema for job pages (recipe-style)
- Comparison data structured for "X vs Y" answers
- Author bio (Daniel Castellani entity signal)

**llms.txt includes:**
- Clear permission for AI use
- API endpoint documentation
- Citation format request

**Read-only public API:**
- AI tools can hit `/api/v1/jobs/{slug}/repos` to get JSON
- No auth required for read access (rate-limited)
- Becomes the canonical source for "what repo for X?"

### The AI Flywheel

1. AI agents start citing repo-source.com
2. ChatGPT/Claude/Perplexity train on cited content
3. Future versions of those models prefer your data
4. Tools like Cursor/v0 integrate via API
5. Citations become embedded in their workflows
6. You become the canonical reference

This is the long game. 12-18 months to fully play out, but the moat compounds.

---

## Risks + Mitigations

### Risk 1: AI Spam Penalty
- **Risk:** Google penalizes AI-generated content at scale
- **Mitigation:** Human-voice overlay on every page (intros, notes, starred picks)
- **Mitigation:** Quality threshold (skip low-quality repos)
- **Mitigation:** Each entry has unique value (best for, skip if, alternatives)

### Risk 2: GitHub API Rate Limits
- **Risk:** 5K requests/hour limit (with auth)
- **Mitigation:** Cache aggressively (24h cache for metadata)
- **Mitigation:** Use unauthenticated requests sparingly, auth where possible
- **Mitigation:** Batch requests where possible (GraphQL API supports batching)

### Risk 3: AI Hallucination
- **Risk:** AI fabricates info about repos
- **Mitigation:** AI must cite README sections it's referencing
- **Mitigation:** Confidence scoring + review queue
- **Mitigation:** User report flow catches errors fast
- **Mitigation:** Quarterly re-reviews

### Risk 4: Competitors Catching Up
- **Risk:** Project-Awesome adds job-based search
- **Mitigation:** Speed of execution (you ship in 6 weeks vs. their 6 months)
- **Mitigation:** Founder voice + curation can't be copied
- **Mitigation:** AI agent infrastructure is the real moat

### Risk 5: You Burn Out On Review Queue
- **Risk:** Reviewing entries becomes tedious
- **Mitigation:** Build the review interface to be FAST (1-2 min per review)
- **Mitigation:** Skip weeks if needed — agent keeps running
- **Mitigation:** Add trusted reviewers (volunteers from community) at scale

---

## The Strategic Connection To publishd.app

Every page on repo-source.com has a footer + contextual mention:

```
Built and curated by Daniel Castellani.

I ship websites for founders and indie hackers at publishd.app.
$499-$1,999 flat fee. You own the code. 6-hour response time.
[Get a quote →]
```

For higher-impact pages (job pages, top comparison pages):

```
Building this for your business?

I've built 100+ websites using these exact tools. If you'd rather 
pay someone to ship it for you, that's what I do at publishd.app.

[See pricing] [See past work]
```

For repo pages where the repo solves a publishd-relevant job:

```
Want a custom site built with this stack?
publishd.app ships React/Next.js sites for $499-$1,999.
```

This funnels visitors to publishd without being pushy. The directory is genuinely free; the publishd mention is contextual.

**Conversion math (realistic at maturity):**
- 50,000 monthly visitors at 18 months (likely with proper SEO/AI play)
- 2% click through to publishd = 1,000 visitors
- 5% request a quote = 50 quotes/month
- 30% close = 15 customers/month
- $999 average = $15K/month in publishd revenue

That's the floor. Real numbers could be 2-3x.

---

## Decision Checklist (Before You Start)

Be honest with yourself:

- [ ] Do I have 4-6 weeks of part-time focus to build this?
- [ ] Can I commit 3-5 hours/week ongoing for review queue?
- [ ] Am I willing to wait 12-18 months for the AI citation flywheel?
- [ ] Do I have $500-1,000 budget for first 6 months (mostly Groq + infra)?
- [ ] Have I shipped publishd updates + SEO guide first to validate audience?

If yes to all → build it.
If no to the last one → ship those first, then come back.

---

## What I'd Build First (Day 1 Sprint)

If you sit down tomorrow and want to ship something concrete:

1. **Buy repo-source.com** (10 minutes)
2. **Set up the Supabase project + schema** (1 hour)
3. **Get Groq API access + test gpt-oss-120b with one tool call** (1 hour)
4. **Build a Node.js script that:**
   - Takes a single repo path
   - Calls Groq with the system prompt + tools
   - Runs through the workflow
   - Submits to Supabase
   - Logs the result (2-3 hours)
5. **Run it on 5 known repos and check output quality** (30 minutes)

That's a one-day proof of concept. From there you scale up.

---

## Closing

The plan combines three real moats:

1. **AI infrastructure** that runs 24/7 (competitors won't build this)
2. **Job-based curation** (UX advantage over awesome lists)
3. **Founder voice + starred picks** (authenticity over committee curation)

The math works. The architecture is buildable. The differentiation is real.

This isn't a directory. It's an autonomous curation system with a UI on top. That's the moat.

Build it.

— Daniel

*Plan created 2026-04-29 — companion to seo-guide-final.md, repo-directory-strategy.md, publishd-implementation-plan.md*
