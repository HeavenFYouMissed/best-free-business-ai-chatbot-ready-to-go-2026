"use client";

/**
 * Deprecated. Previous ambient full-page shader has been removed —
 * the hero and Studio sections now carry atmosphere via shaders.com,
 * and a site-wide ambient shader layered on top was a perf tax for
 * minimal visual gain. Kept as a no-op to avoid orphaned imports.
 */
export function AmbientSmoke() {
  return null;
}
