"use client";

import { useEffect, useState } from "react";

const CHIPS = [
  { id: "sites", index: "01", label: "Sites" },
  { id: "chatbots", index: "02", label: "Chatbots" },
  { id: "polish", index: "03", label: "Polish" },
] as const;

/**
 * Sticky sub-nav rail that appears under the main nav once you scroll past
 * the hero. Pure CSS+observer — no framer. Active chip is computed from the
 * section currently closest to the top of the viewport (IntersectionObserver
 * with a staircase root margin).
 *
 * On mobile the rail collapses to a horizontal snap-scroller so it never
 * crowds the hero CTA stack.
 */
export function BfySubNav() {
  const [active, setActive] = useState<string | null>("sites");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function onScroll() {
      setVisible(window.scrollY > 260);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        let topId: string | null = null;
        let topTop = Infinity;
        for (const e of entries) {
          if (e.isIntersecting) {
            const top = (e.target as HTMLElement).getBoundingClientRect().top;
            if (top < topTop) {
              topTop = top;
              topId = e.target.id;
            }
          }
        }
        if (topId) setActive(topId);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.6] }
    );
    CHIPS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  function jump(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      aria-label="Built for You section navigation"
      className={`sticky top-[56px] z-[40] mx-auto w-full transition-[opacity,transform] duration-300 ease-out ${
        visible ? "opacity-100 translate-y-0" : "-translate-y-2 opacity-0 pointer-events-none"
      } md:top-[62px]`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-1 h-8"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--color-bg) 95%, transparent) 0%, transparent 100%)",
        }}
      />
      <div className="container-x relative">
        <div
          role="tablist"
          aria-label="Catalog"
          className="mx-auto flex max-w-fit items-center justify-center gap-1 rounded-full border border-[color-mix(in_srgb,var(--color-accent)_18%,var(--color-border))] bg-[color-mix(in_srgb,var(--color-bg)_82%,transparent)] p-1.5 backdrop-blur-md shadow-[0_20px_60px_-30px_rgba(0,212,255,0.2)]"
        >
          {CHIPS.map((c) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => jump(c.id)}
                className={`group relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[12px] font-medium transition-colors sm:gap-2 sm:px-4 sm:py-2 sm:text-[13px] ${
                  isActive
                    ? "bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)] text-[var(--color-fg)]"
                    : "text-[color-mix(in_srgb,var(--color-fg)_78%,transparent)] hover:text-[var(--color-fg)]"
                }`}
              >
                <span
                  aria-hidden
                  className="num text-[10px] uppercase tracking-[0.18em]"
                  style={{
                    color: isActive
                      ? "var(--color-accent)"
                      : "color-mix(in srgb, var(--color-accent) 55%, transparent)",
                  }}
                >
                  [ {c.index} ]
                </span>
                <span>{c.label}</span>
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-[5px] h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 75%, transparent), transparent)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BfySubNav;
