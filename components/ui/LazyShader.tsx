"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Keep the shader mounted once activated. Defaults true. */
  keepMounted?: boolean;
  /** Skip on small-viewport + coarse-pointer devices. Defaults false. */
  disableOnMobile?: boolean;
  /**
   * Mount immediately on page load instead of waiting for the viewport.
   * Use for hero / set-piece shaders that are always visible.
   */
  priority?: boolean;
  /** Fallback rendered while the shader is inactive. */
  fallback?: ReactNode;
  className?: string;
};

/**
 * Global WebGL context budget. Browsers cap simultaneous WebGL contexts —
 * Chrome/Firefox desktop is safe up to ~16, mobile Safari closer to 8.
 */
const CTX_BUDGET_DESKTOP = 16;
const CTX_BUDGET_MOBILE = 5;
let activeContexts = 0;
const waitingSetters = new Set<() => void>();

function notifyWaiters() {
  for (const wake of Array.from(waitingSetters)) {
    waitingSetters.delete(wake);
    wake();
  }
}

/**
 * Mount gate for WebGL shaders.
 * - `priority` mounts immediately (hero / set-piece shaders).
 * - Default mounts eagerly 1500px ahead of the viewport.
 * - Global context budget prevents browser "context lost" crashes.
 */
export function LazyShader({
  children,
  keepMounted = true,
  disableOnMobile = false,
  priority = false,
  fallback = null,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const claimedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = disableOnMobile && window.matchMedia("(max-width: 768px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || (narrow && coarse)) {
      setEnabled(false);
      return;
    }

    const isMobileClass =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 768px)").matches;
    const budget = isMobileClass ? CTX_BUDGET_MOBILE : CTX_BUDGET_DESKTOP;

    let disposed = false;

    const tryClaim = () => {
      if (disposed || claimedRef.current) return;
      if (activeContexts < budget) {
        activeContexts += 1;
        claimedRef.current = true;
        setActive(true);
      } else {
        const wake = () => {
          if (disposed || claimedRef.current) return;
          tryClaim();
        };
        waitingSetters.add(wake);
      }
    };

    // Priority shaders mount immediately.
    if (priority) {
      tryClaim();
      return () => {
        disposed = true;
        if (claimedRef.current) {
          activeContexts = Math.max(0, activeContexts - 1);
          claimedRef.current = false;
          notifyWaiters();
        }
      };
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            tryClaim();
            if (keepMounted && claimedRef.current) io.unobserve(entry.target);
          } else if (!keepMounted) {
            if (claimedRef.current) {
              activeContexts = Math.max(0, activeContexts - 1);
              claimedRef.current = false;
              notifyWaiters();
            }
            setActive(false);
          }
        }
      },
      { rootMargin: "1500px 0px", threshold: 0.01 }
    );
    io.observe(el);

    return () => {
      disposed = true;
      io.disconnect();
      if (claimedRef.current) {
        activeContexts = Math.max(0, activeContexts - 1);
        claimedRef.current = false;
        notifyWaiters();
      }
    };
  }, [keepMounted, disableOnMobile, priority]);

  return (
    <div ref={ref} className={className}>
      {enabled && active ? children : fallback}
    </div>
  );
}
