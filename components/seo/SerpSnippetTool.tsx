"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2, CircleAlert, Search } from "lucide-react";

const DEFAULT_TITLE = "How to Rank on Google in 2026 | Publishd";
const DEFAULT_DESCRIPTION =
  "Free SEO guide for founders: ranking systems, AI Overview tactics, topical authority, and the technical fixes that actually move results.";
const DEFAULT_PATH = "/blog/seo-guide";

const EXAMPLES = {
  guide: {
    label: "Guide post",
    title: "How to Rank on Google in 2026 | Publishd",
    description:
      "Free SEO guide for founders: ranking systems, AI Overview tactics, topical authority, and the technical fixes that actually move results.",
    path: "/blog/seo-guide",
  },
  service: {
    label: "Service page",
    title: "Website design for founders who need more leads",
    description:
      "Conversion-focused website design for founders and small businesses that need a clearer offer, stronger trust signals, and more real inquiries.",
    path: "/website-design",
  },
  chatbot: {
    label: "AI page",
    title: "AI chatbots for businesses that need more leads",
    description:
      "Custom AI chatbots trained on your real docs to answer questions, capture leads, and move conversations toward a real next step.",
    path: "/ai-chatbots",
  },
} as const;

function truncate(text: string, limit: number) {
  if (text.length <= limit) return text;
  return `${text.slice(0, Math.max(0, limit - 1)).trimEnd()}…`;
}

function getStatus(count: number, min: number, max: number) {
  if (count === 0) {
    return {
      tone: "muted" as const,
      label: "Empty",
      helper: `Aim for ${min}-${max} characters.`,
    };
  }

  if (count < min) {
    return {
      tone: "warn" as const,
      label: "A little short",
      helper: `You still have room before the usual ${min}-${max} character sweet spot.`,
    };
  }

  if (count > max) {
    return {
      tone: "warn" as const,
      label: "Likely truncated",
      helper: `Trim it back if you want the strongest part to stay visible in search.`,
    };
  }

  return {
    tone: "good" as const,
    label: "In range",
    helper: `This sits inside the usual ${min}-${max} character target.`,
  };
}

function StatusPill({ count, min, max }: { count: number; min: number; max: number }) {
  const status = getStatus(count, min, max);
  const isGood = status.tone === "good";
  const isWarn = status.tone === "warn";

  return (
    <div
      className="rounded-[var(--radius-sm)] border px-3 py-2"
      style={{
        borderColor: isGood
          ? "color-mix(in srgb, var(--color-accent) 30%, var(--color-border))"
          : isWarn
            ? "color-mix(in srgb, var(--color-signal) 30%, var(--color-border))"
            : "var(--color-border)",
        background: isGood
          ? "color-mix(in srgb, var(--color-accent) 8%, transparent)"
          : isWarn
            ? "color-mix(in srgb, var(--color-signal) 10%, transparent)"
            : "color-mix(in srgb, var(--color-bg) 72%, transparent)",
      }}
    >
      <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--color-fg)]">
        {isGood ? (
          <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)]" aria-hidden="true" />
        ) : isWarn ? (
          <CircleAlert className="h-4 w-4 text-[var(--color-signal)]" aria-hidden="true" />
        ) : (
          <Search className="h-4 w-4 text-[var(--color-muted)]" aria-hidden="true" />
        )}
        <span>{count} chars</span>
        <span className="text-[var(--color-muted)]">· {status.label}</span>
      </div>
      <p className="mt-1 text-[12px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_72%,transparent)]">
        {status.helper}
      </p>
    </div>
  );
}

export function SerpSnippetTool() {
  const [title, setTitle] = useState(DEFAULT_TITLE);
  const [description, setDescription] = useState(DEFAULT_DESCRIPTION);
  const [path, setPath] = useState(DEFAULT_PATH);

  const cleanPath = useMemo(() => {
    const trimmed = path.trim();
    if (!trimmed) return DEFAULT_PATH;
    return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  }, [path]);

  const previewTitle = useMemo(() => truncate(title.trim() || "Your page title appears here", 60), [title]);
  const previewDescription = useMemo(
    () => truncate(description.trim() || "Your meta description appears here so you can see how it is likely to read in search.", 155),
    [description],
  );

  const titleCount = title.trim().length;
  const descriptionCount = description.trim().length;
  const titleStatus = useMemo(() => getStatus(titleCount, 45, 60), [titleCount]);
  const descriptionStatus = useMemo(() => getStatus(descriptionCount, 140, 160), [descriptionCount]);

  const actionItems = useMemo(() => {
    const items: string[] = [];

    if (titleCount === 0) {
      items.push("Write the blue title first. Lead with the main query, outcome, or audience.");
    } else if (titleCount < 45) {
      items.push("Your title is a bit short. Add the payoff, audience, or year so the click feels more worth taking.");
    } else if (titleCount > 60) {
      items.push("Your title is probably too long. Front-load the useful words and trim the filler at the end.");
    } else {
      items.push("Your title length is fine. Next pass: make sure the strongest phrase is at the front, not buried at the end.");
    }

    if (descriptionCount === 0) {
      items.push("Add the gray description. Explain who the page is for and what the click gives them.");
    } else if (descriptionCount < 140) {
      items.push("Your description is short. Use the extra space to make the benefit or next step clearer.");
    } else if (descriptionCount > 160) {
      items.push("Your description is too long. Cut filler so the useful part survives truncation.");
    } else {
      items.push("Your description length is solid. Final pass: make it finish the sell instead of repeating the title.");
    }

    return items;
  }, [descriptionCount, titleCount]);

  function applyExample(example: (typeof EXAMPLES)[keyof typeof EXAMPLES]) {
    setTitle(example.title);
    setDescription(example.description);
    setPath(example.path);
  }

  function resetToDefault() {
    setTitle(DEFAULT_TITLE);
    setDescription(DEFAULT_DESCRIPTION);
    setPath(DEFAULT_PATH);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="glass-card rounded-[var(--radius-lg)] p-6 md:p-7">
        <div className="mono-label">[ inputs ]</div>
        <h2 className="mt-4 text-[clamp(1.35rem,3vw,2rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-[var(--color-fg)]">
          Write the title and description before Google writes a worse version for you.
        </h2>
        <p className="mt-3 max-w-[58ch] text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_76%,transparent)]">
          This is not pixel-perfect, but it is accurate enough to catch the two things that usually hurt CTR first: bloated titles and descriptions that bury the payoff.
        </p>

        <div className="mt-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_72%,transparent)] p-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
            Start faster
          </div>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_74%,transparent)]">
            Pick a sample, swap in your real copy, then use the fix list on the right to tighten what matters first.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.values(EXAMPLES).map((example) => (
              <button
                key={example.label}
                type="button"
                onClick={() => applyExample(example)}
                className="rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_78%,transparent)] px-3 py-1.5 text-[12px] font-medium text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                {example.label}
              </button>
            ))}
            <button
              type="button"
              onClick={resetToDefault}
              className="rounded-full border border-[var(--color-border)] px-3 py-1.5 text-[12px] font-medium text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-fg)]"
            >
              Reset sample
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <label className="block">
            <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
              Blue title in Google
            </span>
            <p className="mb-2 text-[12.5px] leading-relaxed text-[var(--color-muted)]">
              Usually your title tag. Lead with the part that makes the click make sense.
            </p>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Write the title you want people to click"
              className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_76%,transparent)] px-4 py-3 text-[15px] text-[var(--color-fg)] outline-none transition-colors focus:border-[var(--color-accent)]"
            />
          </label>

          <StatusPill count={titleCount} min={45} max={60} />

          <label className="block">
            <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
              Gray description under it
            </span>
            <p className="mb-2 text-[12.5px] leading-relaxed text-[var(--color-muted)]">
              This should finish the sell: who it is for, what they get, and why the page is worth the click.
            </p>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={5}
              placeholder="Tell the searcher what they get if they click"
              className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_76%,transparent)] px-4 py-3 text-[15px] leading-relaxed text-[var(--color-fg)] outline-none transition-colors focus:border-[var(--color-accent)]"
            />
          </label>

          <StatusPill count={descriptionCount} min={140} max={160} />

          <label className="block">
            <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
              Page path
            </span>
            <p className="mb-2 text-[12.5px] leading-relaxed text-[var(--color-muted)]">
              Only the part after <span className="font-medium text-[var(--color-fg)]">publishd.app</span>. This is optional, but it helps the preview feel real.
            </p>
            <input
              value={path}
              onChange={(event) => setPath(event.target.value)}
              placeholder="/services/website-design"
              className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_76%,transparent)] px-4 py-3 text-[15px] text-[var(--color-fg)] outline-none transition-colors focus:border-[var(--color-accent)]"
            />
          </label>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass-card rounded-[var(--radius-lg)] p-6 md:p-7">
          <div className="mono-label">[ preview ]</div>
          <div className="mt-5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-5 py-5 text-black shadow-[0_20px_60px_rgba(0,0,0,0.14)]">
            <div className="max-w-[620px] text-[14px] leading-relaxed text-[#1a0dab] md:text-[22px] md:leading-[1.2]">
              {previewTitle}
            </div>
            <div className="mt-1 text-[13px] text-[#188038] md:text-[14px]">
              publishd.app{cleanPath}
            </div>
            <p className="mt-2 max-w-[620px] text-[13px] leading-relaxed text-[#4d5156] md:text-[14px]">
              {previewDescription}
            </p>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-2 text-[12.5px] text-[var(--color-muted)]">
              <strong className="text-[var(--color-fg)]">Blue line</strong>: the headline people decide to click.
            </div>
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-2 text-[12.5px] text-[var(--color-muted)]">
              <strong className="text-[var(--color-fg)]">Green line</strong>: the URL path people skim for relevance.
            </div>
            <div className="rounded-[var(--radius-sm)] border border-[var(--color-border)] px-3 py-2 text-[12.5px] text-[var(--color-muted)]">
              <strong className="text-[var(--color-fg)]">Gray text</strong>: your one-shot explanation of why the click is worth it.
            </div>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-[var(--color-muted)]">
            Google can still rewrite snippets sometimes. The point here is to make your default version stronger before that happens.
          </p>
        </div>

        <div className="glass-card rounded-[var(--radius-lg)] p-6 md:p-7">
          <div className="mono-label">[ fix this first ]</div>
          <h2 className="mt-4 text-[1.15rem] font-semibold text-[var(--color-fg)]">
            What I would change next from this draft.
          </h2>
          <ol className="mt-4 space-y-3">
            {actionItems.map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_72%,transparent)] px-3 py-3 text-[13.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]"
              >
                <span className="num inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--color-accent)_30%,var(--color-border))] text-[11px] font-semibold text-[var(--color-accent)]">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 flex flex-wrap gap-2 text-[12px]">
            <span
              className="rounded-full border px-2.5 py-1"
              style={{
                borderColor:
                  titleStatus.tone === "good"
                    ? "color-mix(in srgb, var(--color-accent) 30%, var(--color-border))"
                    : "color-mix(in srgb, var(--color-signal) 30%, var(--color-border))",
                color: "var(--color-fg)",
              }}
            >
              Title: {titleStatus.label}
            </span>
            <span
              className="rounded-full border px-2.5 py-1"
              style={{
                borderColor:
                  descriptionStatus.tone === "good"
                    ? "color-mix(in srgb, var(--color-accent) 30%, var(--color-border))"
                    : "color-mix(in srgb, var(--color-signal) 30%, var(--color-border))",
                color: "var(--color-fg)",
              }}
            >
              Description: {descriptionStatus.label}
            </span>
          </div>
        </div>

        <div className="glass-card rounded-[var(--radius-lg)] p-6 md:p-7">
          <div className="mono-label">[ quick rules ]</div>
          <ul className="mt-4 space-y-3 text-[14px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]">
            <li><strong className="text-[var(--color-fg)]">Lead with the outcome.</strong> Put the payoff before the brand when the query is non-branded.</li>
            <li><strong className="text-[var(--color-fg)]">Earn the click, not just the keyword.</strong> Titles should read like useful headlines, not database labels.</li>
            <li><strong className="text-[var(--color-fg)]">Make the description finish the sell.</strong> It should clarify who the page is for and why it is worth the click.</li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-3 text-[13px]">
            <Link href="/seo-guide" className="text-[var(--color-accent)] underline underline-offset-4">
              Read the full SEO guide
            </Link>
            <Link href="/seo-guide/checklist" className="text-[var(--color-accent)] underline underline-offset-4">
              Grab the checklist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
