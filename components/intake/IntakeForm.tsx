"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, AlertCircle, ChevronDown } from "lucide-react";
import { ReviewLink } from "@/components/reviews/ReviewLink";
import { ShipButton } from "@/components/ui/ShipButton";

const Fireworks5 = dynamic(
  () => import("@/components/shaders/presets/Fireworks5").then((m) => m.Fireworks5),
  { ssr: false }
);

type State = "idle" | "sending" | "ok" | "error";

type FieldSpec =
  | { as: "input"; name: string; label: string; required?: boolean; type?: string; placeholder?: string; autoComplete?: string; full?: boolean }
  | { as: "select"; name: string; label: string; required?: boolean; options: string[]; full?: boolean }
  | { as: "textarea"; name: string; label: string; required?: boolean; placeholder?: string; rows?: number; full?: boolean };

type Group = {
  id: string;
  index: string;
  title: string;
  hint: string;
  fields: FieldSpec[];
};

const GROUPS: Group[] = [
  {
    id: "who",
    index: "01",
    title: "Who you are",
    hint: "So I can reach you within 6 business hours.",
    fields: [
      { as: "input", name: "name", label: "Your name", required: true, autoComplete: "name" },
      { as: "input", name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
      { as: "input", name: "phone", label: "Phone (optional)", type: "tel", autoComplete: "tel" },
      {
        as: "select",
        name: "tier",
        label: "Tier you're eyeing",
        options: [
          "Rejection Rescue — $199",
          "Single platform — $200",
          "Coaching — $299",
          "Both platforms — $399",
          "Done For You Premium — $699",
          "Publishd Studio — from $2,999",
          "Not sure yet",
        ],
      },
    ],
  },
  {
    id: "app",
    index: "02",
    title: "Your app",
    hint: "The one we're shipping.",
    fields: [
      { as: "input", name: "appName", label: "App name", required: true, full: true },
      {
        as: "input",
        name: "appDescription",
        label: "One-line description",
        required: true,
        full: true,
        placeholder: "e.g. Social confession app with anonymous posting and 48-hour expiry",
      },
      {
        as: "select",
        name: "deliveryMethod",
        label: "How will you send it?",
        required: true,
        full: true,
        options: ["Live URL", "GitHub repo", "Direct files (zip/export)", "I'll decide on the call"],
      },
      {
        as: "input",
        name: "appSource",
        label: "URL, repo, or file link (if ready)",
        full: true,
        placeholder: "https://your-app.com  OR  github.com/you/repo",
      },
    ],
  },
  {
    id: "platforms",
    index: "03",
    title: "Platforms & stack",
    hint: "What stores, what tools.",
    fields: [
      {
        as: "select",
        name: "platforms",
        label: "Which platforms?",
        required: true,
        options: ["iOS + Android (both)", "iOS only", "Android only", "Not sure"],
      },
      {
        as: "input",
        name: "stack",
        label: "Built with",
        placeholder: "Lovable, Bolt, v0, Cursor, React Native, Next.js, hand-coded…",
      },
    ],
  },
  {
    id: "accounts",
    index: "04",
    title: "Developer accounts",
    hint: "You own them. I never do.",
    fields: [
      {
        as: "select",
        name: "appleAccount",
        label: "Apple Developer account",
        options: ["Yes, have one", "No, need help setting up", "Not applicable"],
      },
      {
        as: "select",
        name: "googleAccount",
        label: "Google Play account",
        options: ["Yes, have one", "No, need help setting up", "Not applicable"],
      },
    ],
  },
  {
    id: "anything",
    index: "05",
    title: "Anything else",
    hint: "Deadlines, features, backend details, investor demos…",
    fields: [
      {
        as: "textarea",
        name: "notes",
        label: "Notes (optional)",
        full: true,
        rows: 4,
        placeholder: "Anything I should know before the kickoff call.",
      },
    ],
  },
];

export function IntakeForm() {
  const [state, setState] = useState<State>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [filled, setFilled] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement | null>(null);

  /** Recompute which groups have at least one filled field. */
  function handleInput(e: React.FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, boolean> = {};
    for (const g of GROUPS) {
      next[g.id] = g.fields.some((f) => {
        const v = data.get(f.name);
        return typeof v === "string" && v.trim().length > 0;
      });
    }
    setFilled(next);
  }

  const completedCount = useMemo(
    () => Object.values(filled).filter(Boolean).length,
    [filled]
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (typeof data.website === "string" && data.website.length > 0) {
      setState("ok");
      return;
    }

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ source: "kickoff-form", ...data }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      setState("ok");
      form.reset();
      setFilled({});
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "ok") {
    return <IntakeSuccess />;
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onInput={handleInput}
      onChange={handleInput}
      className="intake-form relative overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-accent)_18%,var(--color-border))] bg-[color-mix(in_srgb,#050810_80%,transparent)] p-5 backdrop-blur-sm md:p-7"
    >
      {/* Honeypot */}
      <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Header row — mono title + N/5 progress */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[color-mix(in_srgb,var(--color-accent)_15%,var(--color-border))] pb-4">
        <span className="mono-label !m-0 !p-0 before:hidden">[ intake · v1 ]</span>
        <IntakeProgress count={completedCount} total={GROUPS.length} />
      </div>

      <div className="space-y-8">
        {GROUPS.map((g) => {
          const complete = filled[g.id];
          return (
            <section key={g.id} className="intake-group">
              <header className="mb-4 flex items-baseline gap-3 border-b border-[color-mix(in_srgb,var(--color-accent)_12%,var(--color-border))] pb-2">
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.24em]"
                  style={{
                    color: complete
                      ? "color-mix(in srgb, var(--color-accent) 95%, white)"
                      : "color-mix(in srgb, var(--color-accent) 55%, transparent)",
                    textShadow: complete
                      ? "0 0 8px color-mix(in srgb, var(--color-accent) 55%, transparent)"
                      : "none",
                  }}
                >
                  [ {g.index} · {g.title.toLowerCase()} ]
                </span>
                {complete && (
                  <span
                    aria-hidden
                    className="h-[6px] w-[6px] rounded-full"
                    style={{
                      background: "var(--color-accent)",
                      boxShadow: "0 0 8px var(--color-accent)",
                      animation: "status-dot-pulse 3s ease-in-out infinite",
                    }}
                  />
                )}
                <span className="ml-auto text-[11.5px] text-[var(--color-muted)]">{g.hint}</span>
              </header>

              <div className={`grid gap-5 ${g.fields.some((f) => !f.full) ? "md:grid-cols-2" : "md:grid-cols-1"}`}>
                {g.fields.map((f) => (
                  <div key={f.name} className={f.full ? "md:col-span-2" : ""}>
                    <IntakeField field={f} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[color-mix(in_srgb,var(--color-accent)_12%,var(--color-border))] pt-6">
        <ShipButton
          href="#submit"
          size="large"
          onClick={(e) => {
            e.preventDefault();
            formRef.current?.requestSubmit();
          }}
        >
          {state === "sending" ? (
            <>
              <Loader2 className="icon animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>Send it over</>
          )}
        </ShipButton>
        <span className="text-[12px] text-[var(--color-muted)]">
          Confidential per our <a className="underline underline-offset-2" href="/terms">Terms</a> and{" "}
          <a className="underline underline-offset-2" href="/privacy">Privacy Policy</a>.
        </span>
        {/* Hidden submit for form-native enter handling + programmatic requestSubmit */}
        <button type="submit" aria-hidden tabIndex={-1} className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" />
      </div>

      {state === "error" && (
        <p className="mt-4 flex items-start gap-2 text-[13px] text-[var(--color-danger)]">
          <AlertCircle className="icon mt-0.5 shrink-0" aria-hidden />
          Couldn&rsquo;t send — {errorMsg}. Email daniel@publishd.app directly.
        </p>
      )}
    </form>
  );
}

/* ============================================================
   Progress meter
   ============================================================ */

function IntakeProgress({ count, total }: { count: number; total: number }) {
  const pct = Math.min(100, (count / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <div
        aria-hidden
        className="relative h-[4px] w-[140px] overflow-hidden rounded-full border"
        style={{ borderColor: "color-mix(in srgb, var(--color-border) 92%, transparent)" }}
      >
        <span
          className="block h-full rounded-full transition-[width] duration-500 ease-out"
          style={{
            width: `${pct}%`,
            background:
              "linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent-mint) 90%, white))",
            boxShadow: "0 0 10px color-mix(in srgb, var(--color-accent) 70%, transparent)",
          }}
        />
      </div>
      <span
        className="num text-[11.5px] uppercase tracking-[0.18em]"
        style={{ color: "color-mix(in srgb, var(--color-accent) 88%, white)" }}
      >
        {count} / {total} complete
      </span>
    </div>
  );
}

/* ============================================================
   Field
   ============================================================ */

function IntakeField({ field }: { field: FieldSpec }) {
  return (
    <div>
      <label
        htmlFor={field.name}
        className="mb-2 block font-mono text-[10.5px] font-medium uppercase tracking-[0.2em] text-[var(--color-muted)]"
      >
        {field.label}
        {"required" in field && field.required && (
          <span
            className="ml-1 text-[var(--color-accent)]"
            style={{ textShadow: "0 0 6px color-mix(in srgb, var(--color-accent) 60%, transparent)" }}
          >
            *
          </span>
        )}
      </label>

      {field.as === "select" ? (
        <div className="intake-field-wrap relative">
          <select
            id={field.name}
            name={field.name}
            required={field.required}
            defaultValue=""
            className="intake-field w-full appearance-none rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_srgb,#030610_86%,transparent)] px-3 py-3 pr-9 font-mono text-[13.5px] text-[var(--color-fg)] outline-none transition-[border-color,box-shadow] duration-200"
          >
            <option value="" disabled>
              Pick one…
            </option>
            {field.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: "color-mix(in srgb, var(--color-accent) 80%, transparent)" }}
          />
        </div>
      ) : field.as === "textarea" ? (
        <textarea
          id={field.name}
          name={field.name}
          required={field.required}
          placeholder={field.placeholder}
          rows={field.rows ?? 4}
          className="intake-field w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_srgb,#030610_86%,transparent)] px-3 py-3 font-mono text-[13.5px] leading-relaxed text-[var(--color-fg)] outline-none transition-[border-color,box-shadow] duration-200"
        />
      ) : (
        <input
          id={field.name}
          name={field.name}
          type={field.type ?? "text"}
          required={field.required}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          className="intake-field w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[color-mix(in_srgb,#030610_86%,transparent)] px-3 py-3 font-mono text-[13.5px] text-[var(--color-fg)] outline-none transition-[border-color,box-shadow] duration-200"
        />
      )}
    </div>
  );
}

/* ============================================================
   Success state — Fireworks burst + typewriter readout
   ============================================================ */

function IntakeSuccess() {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      setElapsed(performance.now() - start);
    }, 200);
    return () => clearInterval(id);
  }, []);

  const hh = String(Math.floor(elapsed / 3_600_000)).padStart(2, "0");
  const mm = String(Math.floor((elapsed / 60_000) % 60)).padStart(2, "0");
  const ss = String(Math.floor((elapsed / 1_000) % 60)).padStart(2, "0");

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-accent)_35%,var(--color-border))] bg-[#050810] p-6 md:p-10">
      {/* Fireworks burst behind the text */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen">
        <Fireworks5 className="h-full w-full" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 40%, transparent 0%, color-mix(in srgb, #050810 55%, transparent) 55%, #050810 100%)",
        }}
      />

      <div className="relative">
        <div className="mono-label" style={{ color: "var(--color-accent)" }}>
          [ request queued ]
        </div>
        <div className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.28em]" style={{ color: "color-mix(in srgb, var(--color-accent) 90%, white)" }}>
          &gt; T+{hh}:{mm}:{ss}
          <span className="chat-caret ml-0.5 inline-block align-[-2px]">_</span>
        </div>

        <h2 className="mt-5 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          Got it. I&rsquo;ll reply shortly.
        </h2>
        <p className="mt-4 max-w-[58ch] text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_86%,transparent)]">
          Your intake is in. You&rsquo;ll get a reply within 6 business hours with a 15-minute
          kickoff call link and a checklist of what to prep. If it&rsquo;s urgent, text{" "}
          <span className="num">(203) 818-6630</span>.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <ShipButton href="/" size="default">
            Back to the site
          </ShipButton>
          <a
            href="mailto:daniel@publishd.app"
            className="btn btn--ghost btn--tiny min-h-[44px]"
          >
            Email Daniel
          </a>
          <div>
            <ReviewLink variant="cta" />
          </div>
        </div>
      </div>
    </div>
  );
}
