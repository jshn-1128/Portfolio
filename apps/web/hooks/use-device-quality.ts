"use client";

import { useEffect, useState } from "react";
import { qualityFromDevice } from "@/lib/universe/performance";
import type { Quality } from "@/lib/universe/types";

/**
 * Device-quality tier hook. Re-evaluates on resize (debounced) so phone
 * rotation and window resizing pick the right particle budget.
 */
export function useDeviceQuality(): Quality {
  const [quality, setQuality] = useState<Quality>("high");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    const evaluate = () => {
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      setQuality(qualityFromDevice(window.innerWidth, coarse));
    };

    evaluate();

    const onResize = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(evaluate, 200);
    };

    window.addEventListener("resize", onResize);
    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return quality;
}