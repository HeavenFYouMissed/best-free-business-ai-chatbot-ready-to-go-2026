/**
 * Fires once the intro shell (preloader) has finished so heavy WebGL can init
 * without racing layout or the loading overlay.
 */
let ready = false;
const listeners = new Set<() => void>();

export function markPublishdBootstrapReady(): void {
  if (ready) return;
  ready = true;
  for (const cb of listeners) cb();
  listeners.clear();
}

export function isPublishdBootstrapReady(): boolean {
  return ready;
}

export function onPublishdBootstrapReady(cb: () => void): () => void {
  if (ready) {
    queueMicrotask(cb);
    return () => {};
  }
  listeners.add(cb);
  return () => listeners.delete(cb);
}
