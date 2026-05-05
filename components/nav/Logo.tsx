"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "@/components/ui/LenisProvider";

/**
 * PUBLISHD wordmark — stainless steel text + cyan aurora glow.
 * Click on `/` scrolls to top via Lenis (or falls back to window.scrollTo).
 */
export function Logo() {
  const pathname = usePathname();
  const lenis = useLenis();

  return (
    <Link
      href="/"
      onClick={(e) => {
        if (pathname === "/") {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(0, { duration: 1.0 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }
      }}
      aria-label="Publishd — home"
      className="logo-link group relative inline-flex items-center gap-1 text-[15px] font-semibold tracking-[-0.02em]"
    >
      <span aria-hidden className="logo-glow" />
      <span className="relative inline-flex">
        <span className="logo-steel">PUBLISHD</span>
        <span
          aria-hidden
          className="logo-dot ml-[2px] inline-block h-[6px] w-[6px] translate-y-[10px] rounded-full bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)] transition-transform duration-300 group-hover:translate-y-[10px] group-hover:scale-125"
        />
      </span>
    </Link>
  );
}
