"use client";

import { clearConsent } from "@/components/consent/cookie-consent-storage";

/**
 * Clears the stored choice and reloads so the banner shows again.
 */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        clearConsent();
        window.location.reload();
      }}
    >
      Cookie settings
    </button>
  );
}
