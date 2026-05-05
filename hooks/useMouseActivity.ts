"use client";

import { useEffect, useState } from "react";

/**
 * Returns `true` while the pointer has moved within the last `idleMs`.
 * Used to switch shader props between live mouse-tracking and static origin
 * so we don't pay for the mouse code path when the user isn't moving.
 */
export function useMouseActivity(idleMs = 400) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let t: number | undefined;

    const onMove = () => {
      setActive(true);
      if (t) window.clearTimeout(t);
      t = window.setTimeout(() => setActive(false), idleMs);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (t) window.clearTimeout(t);
    };
  }, [idleMs]);

  return active;
}
