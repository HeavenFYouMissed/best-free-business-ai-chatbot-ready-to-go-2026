# repo-source.com — Lean Build
## What you actually need. No bloat.

The core insight: **we're not generating content. We're classifying GitHub repos and adding a voting layer.** GitHub already has human-written READMEs. AI's only job is sorting things into the right categories.

---

## What This Is

A site that takes GitHub repos passing a quality threshold, sorts them into job-based categories, lets users upvote, and lets Daniel star his picks.

That's it. Don't add features until launch.

---

## Data Model (Minimal)

```sql
-- Categories (the job buckets)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,        -- 'build-a-navigation-menu'
  name TEXT NOT NULL,               -- 'Build a navigation menu'
  parent TEXT,                      -- 'Website Building Blocks'
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Repos (mirrors GitHub data)
CREATE TABLE repos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  github_path TEXT UNIQUE NOT NULL,  -- 'shadcn-ui/ui'
  name TEXT NOT NULL,
  description TEXT,                  -- GitHub's own description (no AI rewrite)
  stars INTEGER,
  forks INTEGER,
  language TEXT,
  license TEXT,
  pushed_at TIMESTAMPTZ,
  homepage TEXT,
  topics TEXT[],                     -- GitHub topics
  
  -- Optional AI value-add (small, useful)
  ai_one_liner TEXT,                 -- 1 sentence "what it does for you"
  
  -- Daniel's editorial layer
  is_starred BOOLEAN DEFAULT FALSE,
  daniel_note TEXT,                  -- Optional, only on starred picks
  
  -- Auto-refresh tracking
  last_synced TIMESTAMPTZ DEFAULT NOW(),
  added_at TIMESTAMPTZ DEFAULT NOW()
);

-- Many-to-many
CREATE TABLE repo_categories (
  repo_id UUID REFERENCES repos(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (repo_id, category_id)
);

-- Voting
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  repo_id UUID REFERENCES repos(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  voter_id TEXT NOT NULL,            -- Cookie/IP hash, no auth required
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (repo_id, category_id, voter_id)
);

-- Computed score (cached)
CREATE TABLE category_rankings (
  category_id UUID REFERENCES categories(id),
  repo_id UUID REFERENCES repos(id),
  vote_count INTEGER DEFAULT 0,
  score NUMERIC,                     -- vote_count + log(stars) weighted
  rank INTEGER,
  PRIMARY KEY (category_id, repo_id)
);

CREATE INDEX idx_repos_stars ON repos(stars DESC);
CREATE INDEX idx_repos_starred ON repos(is_starred);
CREATE INDEX idx_votes_repo_cat ON votes(repo_id, category_id);
```

**That's it. No confidence scores, no review queues, no audit logs (for v1).**

---

## The Threshold (Quality Filter)

A repo gets ingested if it meets ALL of:

- Stars >= 500
- Pushed in last 12 months
- Has a README (not empty)
- License is permissive or stated (MIT, Apache, BSD, GPL — not "no license")
- Not a fork (unless fork has > 2x parent's recent activity)
- Description is not empty
- Not archived

That's the gate. Below threshold = ignored. Above threshold = goes through AI categorizer.

---

## The AI Job (Classification Only)

```typescript
// Simple, focused, fast.
async function categorizeRepo(repo: GitHubRepo, allCategories: Category[]) {
  const response = await groq.chat({
    model: "openai/gpt-oss-120b",
    messages: [
      {
        role: "system",
        content: `You classify GitHub repos into job-based categories.

You will be given:
- A repo's name, description, README, topics, and language
- A list of available categories (jobs developers are trying to do)

Your job: pick 1-3 categories that this repo SOLVES.

Rules:
- Categories are JOBS, not technologies. "Build a navigation menu" not "React libraries"
- Pick categories where this repo is GENUINELY a top option (not just tangentially related)
- If the repo doesn't clearly solve any listed category, return empty array
- Also write a 1-sentence "what it does for you" (max 15 words, plain English)

Return JSON only:
{
  "categories": ["slug-1", "slug-2"],
  "one_liner": "Copy-paste React components built with Tailwind. Customize freely.",
  "confidence": "high" | "medium" | "low"
}`
      },
      {
        role: "user",
        content: `REPO: ${repo.full_name}
DESCRIPTION: ${repo.description}
TOPICS: ${repo.topics.join(', ')}
LANGUAGE: ${repo.language}
STARS: ${repo.stars}

README (first 3000 chars):
${repo.readme.slice(0, 3000)}

AVAILABLE CATEGORIES:
${allCategories.map(c => `- ${c.slug}: ${c.name}`).join('\n')}`
      }
    ],
    response_format: { type: "json_object" },
    temperature: 0.1
  });
  
  return JSON.parse(response.choices[0].message.content);
}
```

That's the entire AI layer. ~50 lines. Costs ~$0.001 per repo.

No tool calls (overkill for this), no multi-turn agents, no confidence thresholds requiring review queues. Just classify and store.

---

## The Ingestion Worker

Runs daily via Cloudflare Cron / Vercel Cron / GitHub Actions:

```typescript
// pseudocode

async function dailyIngestion() {
  // 1. Get candidate repos (3 sources)
  const candidates = [
    ...await fetchGitHubTrending(),                    // ~25 repos/day
    ...await fetchTopicRepos(['react', 'nextjs', ...]), // ~100 repos
    ...await fetchSearchQueries(rotatingQueries()),    // ~100 repos
  ];
  
  // 2. Filter by threshold
  const passing = candidates.filter(passesThreshold);
  
  // 3. Skip ones we already have
  const newRepos = await filterNew(passing);
  
  // 4. Classify each
  const categories = await getAllCategories();
  
  for (const repo of newRepos) {
    const readme = await fetchReadme(repo.full_name);
    const classification = await categorizeRepo({...repo, readme}, categories);
    
    if (classification.categories.length === 0) continue; // Skip if no fit
    
    await db.repos.insert({
      github_path: repo.full_name,
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      // ... rest of metadata
      ai_one_liner: classification.one_liner
    });
    
    await db.repo_categories.insertMany(
      classification.categories.map(slug => ({
        repo_id: repo.id,
        category_slug: slug
      }))
    );
  }
  
  // 5. Refresh metadata for existing entries (stars, last commit)
  await refreshExistingMetadata();
}
```

**That's the whole worker. Probably 200-300 lines of actual code.**

Run it daily at 2am. Done.

---

## The Site (Pages You Need)

### Page 1: Homepage `/`
- Hero: "Find GitHub repos by what you're building"
- Search bar (Meilisearch)
- Featured categories (8-12 hand-picked starter categories)
- "Recently added" feed (auto-updates)

### Page 2: All Categories `/categories`
- Grid of all categories grouped by parent
- Click → category page

### Page 3: Category Page `/c/[slug]` (the money page)
```
┌─────────────────────────────────────────┐
│ Build a Navigation Menu                 │
│ "32 repos that solve this"              │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ ⭐ Daniel's Pick                        │
│ shadcn/ui — 65k ⭐                      │
│ "Copy-paste components, fully owned"    │
│ Daniel's note: "This is what I use      │
│ on every project in 2026."              │
│ [↑ 234 votes]  [GitHub →]               │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ All options (sorted by votes + stars)   │
│ ─────────────────────────────────────── │
│ #1  shadcn/ui          65k⭐  ↑234     │
│ #2  Headless UI        25k⭐  ↑189     │
│ #3  Radix UI           18k⭐  ↑156     │
│ #4  Mantine            27k⭐  ↑144     │
│ ...                                     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ Submit a repo for this category →       │
└─────────────────────────────────────────┘
```

### Page 4: Repo Page `/r/[github-path]` (e.g., `/r/shadcn-ui/ui`)
- Repo metadata (stars, last commit, license, language)
- AI one-liner
- Daniel's note (if starred)
- All categories it appears in
- Vote button per category
- Link to GitHub

### Page 5: Submit `/submit`
- Simple form: GitHub URL, optional reason
- Auto-validates URL
- Goes into queue, AI categorizes within an hour

That's 5 page templates. Maybe a week of work.

---

## The Voting System (Simple)

**No accounts required.** Cookie-based identity:

```typescript
// On first visit, generate cookie
const voterId = getCookie('rs_voter') || generateUUID();
setCookie('rs_voter', voterId, { maxAge: 365 * 24 * 60 * 60 });

// Vote endpoint
POST /api/vote
{
  "repo_id": "uuid",
  "category_id": "uuid"
}

// Logic:
// - One vote per voter_id per (repo, category) pair
// - Toggle: clicking again removes the vote
// - Cache vote counts on category_rankings table
```

**Anti-abuse (light touch):**
- Rate limit: 10 votes/minute per IP
- Cookie + IP combo for voter_id (prevents trivial duplicates)
- Daily recompute of category_rankings (smooths out spike abuse)

Don't overbuild. If gaming becomes a real problem, add Cloudflare Turnstile later.

---

## The Ranking Formula

How repos are sorted on category pages:

```
score = log10(stars + 1) * 10 + votes * 5
```

This means:
- A 100k-star repo with 0 votes: score = 50 + 0 = 50
- A 1k-star repo with 50 votes: score = 30 + 250 = 280
- A 10k-star repo with 20 votes: score = 40 + 100 = 140

**This rewards community votes more than raw stars** — which is the whole point. A small underrated repo can climb past a big bloated one if the community votes it up.

Daniel's `is_starred` repos always float to the top, regardless of score.

---

## Starting Categories (Launch Set)

Don't try to launch with 100 categories. Launch with **20-30 sharp ones** in 4 parent groups.

### Parent: Website Building Blocks
1. Build a navigation menu
2. Build a hero section
3. Build a pricing page
4. Build a footer
5. Build a testimonials section
6. Build a FAQ section
7. Build animations & transitions

### Parent: App Building Blocks  
8. Build a dashboard layout
9. Build a sidebar navigation
10. Build a data table
11. Build a chart / data viz
12. Build a chat UI
13. Build a command palette (cmd+k)
14. Build a settings page

### Parent: Auth & Backend
15. Add authentication
16. Add billing & subscriptions
17. Add file uploads
18. Add search to your app
19. Add real-time features

### Parent: Builder's Toolkit
20. SaaS boilerplate
21. AI app starter
22. Component library (general)
23. Form builder
24. Email templates
25. Markdown editor
26. Build a blog
27. Build documentation

That's 27 categories. Each will have 10-50 repos. Total: ~500-1,000 repos at launch.

**Expand based on user requests after launch.**

---

## Tech Stack (Stop Debating This)

- **Frontend:** Next.js 14+ (App Router) + Tailwind + shadcn/ui
- **DB:** Supabase (Postgres + auto API)
- **Search:** Meilisearch (self-hosted on Fly.io free tier, or Meilisearch Cloud free tier)
- **AI:** Groq + gpt-oss-120b
- **Hosting:** Cloudflare Pages (you already use this)
- **Cron:** Cloudflare Workers Cron Trigger or GitHub Actions schedule
- **GitHub API:** Use Octokit (`@octokit/rest`)

**Auth:** None for v1. Cookie-based voter ID. Add real auth only if you need user accounts later.

**Admin:** Supabase Studio. Don't build an admin UI. Daniel logs into Supabase, edits `is_starred` and `daniel_note` directly. Done.

---

## Build Sequence (Realistic)

### Day 1 (Saturday): Foundation
- [ ] Buy `repo-source.com`
- [ ] Set up Supabase project
- [ ] Run the SQL above to create tables
- [ ] Insert your 27 starter categories manually
- [ ] Get Groq API key

**End of day:** Empty database with categories defined.

### Day 2 (Sunday): The Ingestion Script
- [ ] Node.js script that:
  - Fetches GitHub trending
  - Filters by threshold
  - Calls Groq for classification
  - Inserts into Supabase
- [ ] Run it manually on ~50 repos
- [ ] Spot-check the categorizations
- [ ] Iterate the prompt if results are bad

**End of weekend:** Database has 50-100 categorized repos. You've validated the AI works.

### Day 3-5 (Mon-Wed evenings): The Site
- [ ] Next.js project set up on Cloudflare
- [ ] Homepage + category page + repo page templates
- [ ] Pull data from Supabase via SDK
- [ ] Basic styling (use shadcn/ui — meta lol)

### Day 6 (Thursday): Voting
- [ ] Vote API endpoint
- [ ] Cookie-based voter ID
- [ ] Vote button component
- [ ] Cached ranking computation

### Day 7 (Friday): Search + Submit
- [ ] Meilisearch setup
- [ ] Search bar with results
- [ ] Submit form

### Weekend 2: Run Ingestion At Scale
- [ ] Run the ingestion script on 1,000+ candidate repos
- [ ] Verify categorization quality
- [ ] Daniel reviews top repos in each category, stars 3-5 per category, adds notes

### Day 14: Launch Prep
- [ ] llms.txt
- [ ] JSON-LD schema
- [ ] Sitemap
- [ ] OpenGraph images
- [ ] Set up cron for daily ingestion

### Day 15: Launch
- [ ] Show HN
- [ ] Product Hunt
- [ ] Reddit
- [ ] Twitter

**Two weekends + 5 weeknight evenings = launched.**

---

## Code Skeleton (To Get You Started)

### `/scripts/ingest.ts` — The Daily Worker

```typescript
import { Octokit } from "@octokit/rest";
import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

const QUALITY_GATE = (repo: any) => 
  repo.stargazers_count >= 500 &&
  new Date(repo.pushed_at) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) &&
  repo.description &&
  repo.license &&
  !repo.archived &&
  !repo.fork;

async function fetchTrending() {
  // GitHub doesn't have a trending API. Use search with date filter.
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];
  
  const { data } = await octokit.search.repos({
    q: `created:>${since} stars:>500`,
    sort: 'stars',
    order: 'desc',
    per_page: 50
  });
  return data.items;
}

async function fetchByQuery(q: string) {
  const { data } = await octokit.search.repos({
    q: `${q} stars:>500 pushed:>2025-01-01`,
    sort: 'stars',
    order: 'desc',
    per_page: 30
  });
  return data.items;
}

async function fetchReadme(fullName: string) {
  try {
    const [owner, repo] = fullName.split('/');
    const { data } = await octokit.repos.getReadme({ owner, repo });
    return Buffer.from(data.content, 'base64').toString('utf-8');
  } catch {
    return '';
  }
}

async function categorize(repo: any, readme: string, categories: any[]) {
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    response_format: { type: "json_object" },
    temperature: 0.1,
    messages: [
      {
        role: "system",
        content: `You classify GitHub repos into job-based categories. Return JSON: { "categories": ["slug1", "slug2"], "one_liner": "...", "confidence": "high|medium|low" }. Pick 0-3 categories where this repo is genuinely a top option. Categories are JOBS not technologies. one_liner is max 15 words, plain English.`
      },
      {
        role: "user",
        content: `REPO: ${repo.full_name}\nDESCRIPTION: ${repo.description}\nTOPICS: ${(repo.topics || []).join(', ')}\nLANGUAGE: ${repo.language}\nSTARS: ${repo.stargazers_count}\n\nREADME:\n${readme.slice(0, 3000)}\n\nCATEGORIES:\n${categories.map(c => `- ${c.slug}: ${c.name}`).join('\n')}`
      }
    ]
  });
  
  return JSON.parse(completion.choices[0].message.content!);
}

async function ingest(repo: any, categories: any[]) {
  // Skip if exists
  const { data: existing } = await sb.from('repos')
    .select('id')
    .eq('github_path', repo.full_name)
    .single();
  if (existing) return;
  
  if (!QUALITY_GATE(repo)) return;
  
  const readme = await fetchReadme(repo.full_name);
  if (!readme) return;
  
  const classification = await categorize(repo, readme, categories);
  if (!classification.categories?.length) return;
  
  // Insert repo
  const { data: inserted } = await sb.from('repos').insert({
    github_path: repo.full_name,
    name: repo.name,
    description: repo.description,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    language: repo.language,
    license: repo.license?.spdx_id,
    pushed_at: repo.pushed_at,
    homepage: repo.homepage,
    topics: repo.topics,
    ai_one_liner: classification.one_liner
  }).select().single();
  
  // Link categories
  const catRows = await sb.from('categories')
    .select('id, slug')
    .in('slug', classification.categories);
  
  if (catRows.data) {
    await sb.from('repo_categories').insert(
      catRows.data.map(c => ({
        repo_id: inserted!.id,
        category_id: c.id
      }))
    );
  }
  
  console.log(`✓ Ingested ${repo.full_name} → ${classification.categories.join(', ')}`);
}

async function main() {
  const { data: categories } = await sb.from('categories').select('*');
  
  const candidates = [
    ...await fetchTrending(),
    ...await fetchByQuery('react component library'),
    ...await fetchByQuery('nextjs starter'),
    ...await fetchByQuery('dashboard ui'),
    // ... add more queries based on your categories
  ];
  
  // Dedupe
  const unique = Array.from(new Map(candidates.map(r => [r.full_name, r])).values());
  
  for (const repo of unique) {
    try {
      await ingest(repo, categories!);
      await new Promise(r => setTimeout(r, 1000)); // rate limit respect
    } catch (e) {
      console.error(`✗ ${repo.full_name}:`, e);
    }
  }
}

main();
```

That's your worker. ~150 lines. Run it: `node scripts/ingest.ts`. Done.

---

## What I Cut (And Why)

Things I had in the bigger plan that you don't need:

| Cut | Why |
|-----|-----|
| Confidence scoring + review queues | AI just classifies. README is human-written. Trust the classification. |
| Audit logs | Supabase has built-in row history. Don't build audit infra. |
| Anti-slop layers | Source content (READMEs) is human-written. AI doesn't generate, it sorts. |
| Multi-turn agent with 8 tools | One classification call is enough. No tool calls needed. |
| Quarterly re-reviews | Refresh metadata daily. Re-classify only on README change. |
| Complex admin UI | Supabase Studio works. Don't build UI for yourself. |
| Auth system | Cookie-based voting. No accounts needed v1. |
| Comparison pages | Auto-generate later from category data if there's demand. |
| API for AI agents | Just have the data publicly accessible. AI scrapes JSON-LD. |
| llms.txt + complex AI optimization | Add later. Get the basics shipped first. |

You can add any of these post-launch if there's a real reason. Don't add them upfront.

---

## What Makes This Win

The simple version still has the moat:

1. **Job-based organization** ← novel, no one does this
2. **Auto-updating** via daily ingestion ← competitors are static
3. **Community voting** ← community has a stake
4. **Daniel's starred picks** ← editorial voice
5. **Free + ad-free + clean** ← UX advantage over awesome-list garbage

That's the product. Build it.

---

## Action Items For Today

1. Buy `repo-source.com`
2. Create Supabase project
3. Run the SQL schema
4. Insert 27 starter categories
5. Get Groq API key
6. Write the 150-line ingestion script
7. Run it on 50 repos
8. Look at the output

If the AI categorizes well at step 8, you commit. If it doesn't, you iterate the prompt for a day, then commit.

That's it. Stop reading. Go build.

— Daniel
