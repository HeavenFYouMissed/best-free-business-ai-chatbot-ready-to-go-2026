"use client";

import { useEffect, useRef } from "react";

type Props = { text: string; className?: string; accentWord?: string };

export function HeadlineSplit({ text, className, accentWord }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function reveal() {
      const root = ref.current;
      if (!root) return;
      root.querySelectorAll<HTMLElement>(".split-char").forEach((c) => {
        c.dataset.in = "true";
      });
    }

    function inViewport(): boolean {
      const root = ref.current;
      if (!root) return false;
      const r = root.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight;
    }

    let cleared = false;
    let io: IntersectionObserver;

    function finish() {
      if (cleared) return;
      cleared = true;
      reveal();
      io.disconnect();
      window.clearTimeout(safety);
    }

    const safety = window.setTimeout(finish, 2600);

    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) finish();
        }
      },
      { threshold: 0.05, rootMargin: "12% 0px 12% 0px" },
    );
    io.observe(el);

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (inViewport()) finish();
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(safety);
      io.disconnect();
    };
  }, []);

  const words = text.split(/(\s+)/);
  let charIdx = 0;

  return (
    <span ref={ref} className={className}>
      {words.map((w, wi) => {
        if (/^\s+$/.test(w)) return <span key={`s-${wi}`}>{w}</span>;

        const isAccent =
          !!accentWord && w.toLowerCase().replace(/[.,!?]/g, "") === accentWord.toLowerCase();

        if (isAccent) {
          const i = charIdx;
          charIdx += w.length;
          return (
            <span key={`w-${wi}`} className="headline-accent-wrap relative inline-block whitespace-nowrap">
              <span
                className="split-char inline-block bg-gradient-to-br from-[#5eead4] via-[var(--color-accent)] to-[#ff8a5c] bg-clip-text text-transparent motion-safe:animate-[headline-accent-hue_8s_ease-in-out_infinite]"
                style={{ ["--i" as string]: i } as React.CSSProperties}
              >
                {w}
              </span>
              <span
                aria-hidden
                className="headline-accent-underline pointer-events-none absolute -bottom-1 left-0 h-px w-full origin-left bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent motion-safe:animate-[headline-underline-pulse_4s_ease-in-out_infinite]"
              />
            </span>
          );
        }

        return (
          <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
            {Array.from(w).map((ch, ci) => (
              <span
                key={`c-${wi}-${ci}`}
                className="split-char"
                style={{ ["--i" as string]: charIdx++ } as React.CSSProperties}
              >
                {ch}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}
