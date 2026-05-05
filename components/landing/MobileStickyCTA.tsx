"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * MobileStickyCTA — pinned to the bottom of the viewport on <md screens only.
 * Auto-hides when the in-page CTA section comes into view (so the user isn't
 * staring at two competing CTAs) and respects iOS safe-area insets.
 *
 * Mobile is ~90% of traffic; without a persistent CTA the user has to scroll
 * back to the hero or all the way to the footer to act on intent.
 */
export function MobileStickyCTA() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target =
      document.getElementById("cta") ?? document.getElementById("closing");
    if (!target) return;

    const io = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-2 transition-all duration-300 md:hidden ${
        hidden
          ? "pointer-events-none translate-y-2 opacity-0"
          : "pointer-events-auto translate-y-0 opacity-100"
      }`}
    >
      {/* Frosted backdrop so the bar reads on any photo / shader behind it */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-[var(--color-bg)] via-[color-mix(in_srgb,var(--color-bg)_75%,transparent)] to-transparent" />
      <div className="relative flex items-center gap-2 rounded-full border border-white/12 bg-[color-mix(in_srgb,var(--color-ink)_85%,transparent)] p-1.5 pl-4 shadow-[0_18px_50px_-18px_color-mix(in_srgb,var(--color-accent)_55%,transparent)] backdrop-blur-xl">
        <span className="flex flex-1 flex-col leading-tight">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Q1 booking
          </span>
          <span className="text-[12.5px] font-medium tracking-tight text-[var(--color-fg)]">
            Reply &lt; 6 hrs · flat fees
          </span>
        </span>
        <Link
          href="/kickoff"
          className="group inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 text-[13px] font-semibold tracking-tight text-[#001018] transition-transform duration-200 active:scale-[0.97]"
        >
          Start
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
