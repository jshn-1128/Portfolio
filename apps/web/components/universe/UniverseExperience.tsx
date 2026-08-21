"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { DebugPanel } from "@/components/universe/DebugPanel";
import { PlanetNav } from "@/components/universe/PlanetNav";
import { UniverseFallback } from "@/components/universe/UniverseFallback";
import { UniverseIdentity } from "@/components/universe/UniverseIdentity";
import { useDeviceQuality } from "@/hooks/use-device-quality";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useWebGL } from "@/hooks/use-webgl";
import { QUALITY_CONFIG } from "@/lib/universe/performance";
import { navigationStore } from "@/lib/universe/navigation-store";

/**
 * The WebGL canvas must never be server-rendered — it is mounted on the
 * client only, avoiding any hydration mismatch between the empty canvas
 * container and the actual three.js scene.
 */
const UniverseCanvas = dynamic(
  () => import("@/scenes/UniverseCanvas").then((m) => m.UniverseCanvas),
  {
    ssr: false,
    loading: () => null,
  },
);

/**
 * Orchestrates the full-viewport 3D experience: WebGL detection, device
 * quality tiering, reduced-motion awareness, the canvas itself, and the
 * accessible HTML identity layer stacked above it.
 */
export function UniverseExperience() {
  const webgl = useWebGL();
  const quality = useDeviceQuality();
  const reducedMotion = usePrefersReducedMotion();

  // Escape key returns to home when not already transitioning.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        navigationStore.goHome();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!webgl) {
    return <UniverseFallback />;
  }

  return (
    <div className="relative h-svh overflow-hidden" aria-label="Interactive 3D universe">
      <UniverseCanvas quality={quality} reducedMotion={reducedMotion} />
      {/* Cinematic vignette: keeps edges of the frame quiet and helps the
          header/footer read over the void. Purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 42%, transparent 46%, rgba(2, 2, 7, 0.42) 100%), " +
            "linear-gradient(to bottom, rgba(2, 2, 7, 0.55), transparent 22%, transparent 74%, rgba(2, 2, 7, 0.4))",
        }}
      />
      <UniverseIdentity />
      <PlanetNav />
      {process.env.NODE_ENV === "development" && (
        <DebugPanel
          quality={quality}
          particleCount={QUALITY_CONFIG[quality].particleCount}
          webgl
        />
      )}
    </div>
  );
}
