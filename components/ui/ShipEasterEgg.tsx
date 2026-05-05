"use client";

import { useEffect, useState } from "react";

/**
 * Hidden easter egg — typing "ship" anywhere on the page (not in an input)
 * triggers a small cyan confetti burst + a signed console.log from Daniel.
 */
export function ShipEasterEgg() {
  const [bursting, setBursting] = useState(false);

  useEffect(() => {
    let typed = "";
    let timeout: ReturnType<typeof setTimeout>;
    let fired = false;

    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) return;
      }
      if (!/^[a-zA-Z]$/.test(e.key)) return;
      typed = (typed + e.key.toLowerCase()).slice(-4);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        typed = "";
      }, 1400);
      if (typed === "ship" && !fired) {
        fired = true;
        setBursting(true);
        console.log(
          "%c ◼ ship it. %c\n// built by Daniel — want to ship yours? daniel@publishd.app",
          "background:#00d4ff;color:#041424;padding:4px 10px;border-radius:4px;font-weight:700;letter-spacing:0.08em;",
          "color:#9ea6b3;font-family:monospace;"
        );
        setTimeout(() => {
          setBursting(false);
          fired = false;
        }, 1800);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(timeout);
    };
  }, []);

  if (!bursting) return null;

  /* 36 square glyph particles flung from center — pure CSS positions + delay */
  const particles = Array.from({ length: 36 });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[140] overflow-hidden"
    >
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = 220 + Math.random() * 180;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        const delay = Math.random() * 120;
        const size = 10 + Math.random() * 8;
        const rot = Math.random() * 360;
        return (
          <span
            key={i}
            className="ship-confetti"
            style={{
              left: "50%",
              top: "50%",
              width: size,
              height: size,
              ["--dx" as string]: `${dx}px`,
              ["--dy" as string]: `${dy}px`,
              ["--rot" as string]: `${rot}deg`,
              animationDelay: `${delay}ms`,
            }}
          />
        );
      })}
    </div>
  );
}

export default ShipEasterEgg;
