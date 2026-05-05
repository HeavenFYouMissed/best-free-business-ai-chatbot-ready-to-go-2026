/** localStorage key for analytics consent (v1 — bump if semantics change). */
export const COOKIE_CONSENT_KEY = "publishd_consent_v1";

export type CookieConsentValue = "essential" | "analytics";

export function readStoredConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (v === "essential" || v === "analytics") return v;
  } catch {
    /* private mode / blocked storage */
  }
  return null;
}

export function writeConsent(value: CookieConsentValue) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
}

export function clearConsent() {
  try {
    window.localStorage.removeItem(COOKIE_CONSENT_KEY);
  } catch {
    /* ignore */
  }
}
