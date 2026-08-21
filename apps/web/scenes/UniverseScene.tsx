"use client";

import { QUALITY_CONFIG } from "@/lib/universe/performance";
import type { Quality } from "@/lib/universe/types";
import { CentralCore } from "@/scenes/CentralCore";
import { CameraRig } from "@/scenes/CameraRig";
import { Lighting } from "@/scenes/Lighting";
import { OrbitFoundation } from "@/scenes/OrbitFoundation";
import { PlanetSystem } from "@/scenes/PlanetSystem";
import { SpaceEnvironment } from "@/scenes/SpaceEnvironment";
import { Starfield } from "@/scenes/Starfield";

interface UniverseSceneProps {
  quality: Quality;
  reducedMotion: boolean;
}

/**
 * Composition root for the 3D universe. All draw calls are owned here so the
 * rest of the application never touches WebGL directly.
 */
export function UniverseScene({ quality, reducedMotion }: UniverseSceneProps) {
  const config = QUALITY_CONFIG[quality];

  return (
    <>
      <SpaceEnvironment />
      <Lighting />
      <Starfield
        count={config.particleCount}
        quality={quality}
        reducedMotion={reducedMotion}
      />
      <CentralCore
        energyCount={config.energyParticleCount}
        reducedMotion={reducedMotion}
        quality={quality}
      />
      {config.showOrbits && <OrbitFoundation reducedMotion={reducedMotion} />}
      <PlanetSystem quality={quality} reducedMotion={reducedMotion} />
      <CameraRig reducedMotion={reducedMotion} />{/* reads destination from navigation store */}
    </>
  );
}
