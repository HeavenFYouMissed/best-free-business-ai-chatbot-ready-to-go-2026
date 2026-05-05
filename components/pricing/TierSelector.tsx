"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Wand2 } from "lucide-react";
import type { TierId } from "@/data/tiers";

type Answers = {
  hasAccounts?: boolean;
  both?: boolean;
  rejected?: boolean;
  learn?: boolean;
};

type Props = {
  onRecommend: (tier: TierId | null) => void;
  recommended: TierId | null;
};

export function TierSelector({ onRecommend, recommended }: Props) {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});

  const questions: Array<{
    id: keyof Answers;
    label: string;
    options: Array<{ value: boolean; label: string }>;
  }> = [
    {
      id: "hasAccounts",
      label: "Have Apple + Google dev accounts?",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
      ],
    },
    {
      id: "both",
      label: "Both platforms, or just one?",
      options: [
        { value: true, label: "Both" },
        { value: false, label: "One" },
      ],
    },
    {
      id: "rejected",
      label: "Already been rejected?",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
      ],
    },
    {
      id: "learn",
      label: "Learn it, or have it done?",
      options: [
        { value: true, label: "Learn" },
        { value: false, label: "Done" },
      ],
    },
  ];

  const recommendation = useMemo<TierId | null>(() => {
    if (answers.rejected === true) return "rescue";
    if (answers.learn === true) return "coaching";
    if (answers.both === false && answers.hasAccounts === true) return "single";
    if (answers.both === true) return "both";
    return null;
  }, [answers]);

  useEffect(() => {
    onRecommend(recommendation);
  }, [recommendation, onRecommend]);

  return (
    <div className="glass-card rounded-[var(--radius-md)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--color-fg)_3%,transparent)]"
      >
        <span className="flex items-center gap-2.5">
          <Wand2 className="icon" aria-hidden style={{ color: "var(--color-accent)" }} />
          <span className="text-[13.5px]">
            <span className="font-medium text-[var(--color-fg)]">Not sure which tier?</span>{" "}
            <span className="text-[var(--color-muted)]">Answer 4 quick questions.</span>
          </span>
          {recommended && (
            <span
              className="num ml-1 rounded-[var(--radius-xs)] border border-[color-mix(in_srgb,var(--color-accent)_55%,var(--color-border-strong))] px-1.5 py-0.5 text-[10.5px] uppercase tracking-[0.14em]"
              style={{ color: "var(--color-accent)" }}
            >
              → {recommended}
            </span>
          )}
        </span>
        <ChevronDown
          className={`icon transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-2.5 border-t border-[var(--color-border)] p-4 sm:grid-cols-2 md:grid-cols-4">
              {questions.map((q) => (
                <div key={q.id} className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-bg)] p-3">
                  <div className="text-[12px] leading-snug text-[var(--color-muted)]">{q.label}</div>
                  <div className="mt-2 flex gap-2">
                    {q.options.map((o) => {
                      const active = answers[q.id] === o.value;
                      return (
                        <button
                          key={o.label}
                          type="button"
                          onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.value }))}
                          className={`flex-1 min-h-[44px] rounded-[var(--radius-sm)] border px-3 py-2.5 text-[13px] font-medium transition-colors ${
                            active
                              ? "border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] text-[var(--color-fg)]"
                              : "border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
                          }`}
                        >
                          {o.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
