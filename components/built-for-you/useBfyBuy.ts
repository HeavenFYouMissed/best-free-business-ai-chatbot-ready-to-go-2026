"use client";

import { useCallback, useState } from "react";
import type { TierId } from "@/data/tiers";

/**
 * Shared checkout handler for all BFY cards. Mirrors the homepage
 * `PricingGrid` pattern but supports the addon line-items (used by Polish
 * + Resubmit). Loading state is tracked per-tier so the tier card can
 * show a spinner without affecting siblings.
 */
export function useBfyBuy() {
  const [loadingTier, setLoadingTier] = useState<TierId | null>(null);

  const buy = useCallback(async (id: TierId, addons?: TierId[]) => {
    setLoadingTier(id);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tier: id, addons }),
      });
      if (!res.ok) {
        const t = await res.text();
        console.error("Checkout failed:", t);
        return;
      }
      const { url } = (await res.json()) as { url: string };
      if (url) window.location.href = url;
    } finally {
      setLoadingTier(null);
    }
  }, []);

  return { buy, loadingTier };
}
