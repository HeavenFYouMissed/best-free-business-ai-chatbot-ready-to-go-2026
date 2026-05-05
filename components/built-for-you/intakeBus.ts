"use client";

/**
 * Tiny event bus for opening the shared IntakeDrawer from anywhere on the
 * /built-for-you page. Lighter than a context provider for a single
 * global overlay — fire-and-forget CustomEvent.
 */

export type IntakeScope =
  | "starter-site"
  | "pro-site"
  | "custom-site"
  | "chatbot-install"
  | "chatbot-pro"
  | "app-polish"
  | "website-audit"
  | "chatbot-audit"
  | "app-review"
  | "general";

export type IntakeDetail = {
  scope?: IntakeScope;
  note?: string;
  source?: string;
};

const EVENT = "publishd:open-intake";

export function openIntake(detail: IntakeDetail = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<IntakeDetail>(EVENT, { detail }));
}

export function subscribeIntake(handler: (detail: IntakeDetail) => void) {
  if (typeof window === "undefined") return () => {};
  const listener = (e: Event) => handler((e as CustomEvent<IntakeDetail>).detail ?? {});
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}

export const INTAKE_SCOPE_LABELS: Record<IntakeScope, string> = {
  "starter-site": "Starter Site — $499",
  "pro-site": "Pro Site — $999",
  "custom-site": "Custom Site — from $1,999",
  "chatbot-install": "Chatbot Install — $399",
  "chatbot-pro": "Chatbot Pro — $799",
  "app-polish": "App Polish — $199",
  "website-audit": "Free Website Audit",
  "chatbot-audit": "Free Chatbot Audit",
  "app-review": "Free App Shipping Review",
  general: "Start a project",
};
