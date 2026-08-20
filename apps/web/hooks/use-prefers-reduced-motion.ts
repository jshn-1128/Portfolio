"use client";

import { useSyncExternalStore } from "react";

const mediaQuery = () => window.matchMedia("(prefers-reduced-motion: reduce)");

function subscribe(callback: () => void) {
  const mq = mediaQuery();
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

/**
 * Live `prefers-reduced-motion` detection via useSyncExternalStore — no
 * effects, no SSR surprises, updates when the OS setting changes at runtime.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => mediaQuery().matches,
    () => false,
  );
}