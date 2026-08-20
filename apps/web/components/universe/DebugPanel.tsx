"use client";

import { useEffect, useRef, useState } from "react";
import type { Quality } from "@/lib/universe/types";

interface DebugPanelProps {
  quality: Quality;
  particleCount: number;
  webgl: boolean;
}

/**
 * Development-only overlay: FPS, quality tier, particle count, WebGL status.
 * Rendered exclusively when `NODE_ENV === "development"` — it never ships
 * in production builds.
 */
export function DebugPanel({ quality, particleCount, webgl }: DebugPanelProps) {
  const [fps, setFps] = useState(0);
  const frames = useRef(0);
  const lastSample = useRef(0);

  useEffect(() => {
    let raf = 0;

    const loop = (time: number) => {
      frames.current += 1;
      if (time - lastSample.current >= 500) {
        setFps(Math.round((frames.current * 1000) / (time - lastSample.current)));
        frames.current = 0;
        lastSample.current = time;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pointer-events-none absolute bottom-2 right-2 z-10 rounded-md border border-white/10 bg-black/50 px-3 py-2 text-[10px] leading-relaxed text-neutral-300 backdrop-blur-sm">
      <p>fps: {fps}</p>
      <p>quality: {quality}</p>
      <p>particles: {particleCount}</p>
      <p>webgl: {webgl ? "ok" : "n/a"}</p>
    </div>
  );
}