"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { faq, type FaqItem } from "@/data/faq";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

type FaqProps = {
  /** Override entries (defaults to the homepage FAQ). */
  entries?: FaqItem[];
  /** Override the section-label index (default "14"). */
  index?: string;
  /** Override the section-label text (default "FAQ"). */
  label?: string;
  /** Override the headline (default "Everything people ask before buying."). */
  heading?: string;
  /** Override the DOM id on the <section> (default "faq"). */
  sectionId?: string;
};

export function Faq({
  entries,
  index = "14",
  label = "FAQ",
  heading = "Everything people ask before buying.",
  sectionId = "faq",
}: FaqProps = {}) {
  const [open, setOpen] = useState<number | null>(0);
  const items = entries ?? faq;

  return (
    <section id={sectionId}>
      <div className="container-tight">
        <Reveal>
          <SectionLabel index={index} label={label} />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 text-balance">{heading}</h2>
        </Reveal>

        <div className="glass-card mt-10 overflow-hidden rounded-[var(--radius-lg)]">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={i > 0 ? "border-t border-white/8" : ""}>
                <h3 className="m-0 text-[15.5px] font-medium leading-snug text-[var(--color-fg)]">
                  <button
                    id={`faq-q-${i}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex min-h-[56px] w-full items-start justify-between gap-6 px-5 py-5 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--color-fg)_4%,transparent)]"
                  >
                    <span>{item.q}</span>
                    <span
                      aria-hidden
                      className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-muted)] transition-transform duration-300 ${
                        isOpen ? "rotate-45 border-[color-mix(in_srgb,var(--color-accent)_50%,var(--color-border))] text-[var(--color-accent)]" : ""
                      }`}
                    >
                      <Plus className="icon h-3.5 w-3.5" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-0 text-[14.5px] leading-relaxed text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)]">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
