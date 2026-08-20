"use client";

import { useSyncExternalStore } from "react";

/** Returns true when a WebGL context can actually be created. */
function webglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    return gl !== null;
  } catch {
    return false;
  }
}

const emptySubscribe = () => () => {};

let cached: boolean | null = null;

/**
 * Client-only WebGL support detection. Drives the decision between the 3D
 * universe and the HTML fallback, so the page is never blank. Evaluated once
 * and cached — `getSnapshot` stays referentially stable.
 */
export function useWebGL(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => {
      if (cached === null) cached = webglAvailable();
      return cached;
    },
    () => false,
  );
}