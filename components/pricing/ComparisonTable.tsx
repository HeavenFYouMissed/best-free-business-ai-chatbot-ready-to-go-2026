import { Check, Minus, X } from "lucide-react";
import { comparison, type Cell } from "@/data/comparison";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

function renderCell(c: Cell, highlight: boolean) {
  if (c === true) return <Check className={`icon mx-auto ${highlight ? "text-[var(--color-accent)]" : "text-[var(--color-fg)]"}`} aria-label="yes" />;
  if (c === false) return <X className="icon mx-auto text-[var(--color-muted)]" aria-label="no" />;
  if (c === "partial") return <Minus className="icon mx-auto text-[var(--color-warn)]" aria-label="partial" />;
  return <span className={`num text-[13px] ${highlight ? "text-[var(--color-accent)]" : "text-[color-mix(in_srgb,var(--color-fg)_82%,transparent)]"}`}>{c}</span>;
}

export function ComparisonTable() {
  return (
    <section id="comparison">
      <div className="container-x">
        <Reveal>
          <SectionLabel index="11" label="Comparison" />
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-[24ch] text-balance">
            You have options. Here&apos;s the honest comparison.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass-card mt-10 overflow-hidden rounded-[var(--radius-lg)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] border-collapse text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-surface)_70%,var(--color-bg))]">
                    <th className="px-4 py-4 font-medium text-[var(--color-muted)]">Feature</th>
                    <th className="px-4 py-4 text-center font-medium">
                      <span className="rounded-[var(--radius-xs)] border border-[color-mix(in_srgb,var(--color-accent)_50%,transparent)] px-2 py-0.5 text-[12px] tracking-[0.06em] text-[var(--color-accent)]">
                        PUBLISHD
                      </span>
                    </th>
                    <th className="px-4 py-4 text-center font-medium text-[var(--color-muted)]">MobiLoud</th>
                    <th className="px-4 py-4 text-center font-medium text-[var(--color-muted)]">Natively</th>
                    <th className="px-4 py-4 text-center font-medium text-[var(--color-muted)]">DIY</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-t border-[var(--color-border)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-fg)_3%,transparent)] ${
                        i % 2 ? "bg-[color-mix(in_srgb,var(--color-surface)_22%,transparent)]" : ""
                      }`}
                    >
                      <td className="px-4 py-3.5 text-[var(--color-fg)]">{row.feature}</td>
                      <td className="px-4 py-3.5 text-center">{renderCell(row.publishd, true)}</td>
                      <td className="px-4 py-3.5 text-center">{renderCell(row.mobiloud, false)}</td>
                      <td className="px-4 py-3.5 text-center">{renderCell(row.natively, false)}</td>
                      <td className="px-4 py-3.5 text-center">{renderCell(row.diy, false)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
