import type {
  Quality,
  UniverseQualityConfig,
} from "@/lib/universe/types";
import { SPACE_BACKGROUND } from "@/lib/universe/constants";

/**
 * Central quality configuration. Chosen for performance on real hardware,
 * not for arbitrary huge numbers: a single `Points` draw call scales well
 * into the thousands, and ~800 particles on mobile keeps the 30–60 FPS
 * target on mid-range devices.
 */
export const QUALITY_CONFIG: Record<Quality, UniverseQualityConfig> = {
  high: {
    particleCount: 3500,
    starSize: 0.035,
    energyParticleCount: 160,
    showOrbits: true,
    dpr: [1, 2],
  },
  medium: {
    particleCount: 1800,
    starSize: 0.04,
    energyParticleCount: 110,
    showOrbits: true,
    dpr: [1, 1.75],
  },
  low: {
    particleCount: 800,
    starSize: 0.05,
    energyParticleCount: 70,
    showOrbits: true,
    dpr: [1, 1.5],
  },
};

/** Where the starfield shell lives; all stars fit inside the fog range. */
export const STARFIELD = {
  minRadius: 18,
  maxRadius: 75,
  /** Degrees per second — slow, cinematic drift. */
  rotationSpeed: 0.008,
} as const;

const CORE_COUNT = typeof navigator !== "undefined" ? navigator.hardwareConcurrency : 4;

/**
 * Pick a quality tier from device signals: viewport width, coarse pointer
 * (touch), and CPU core count. Called on the client only.
 */
export function qualityFromDevice(width: number, coarsePointer: boolean): Quality {
  if (width < 640 || (coarsePointer && width < 1440 && CORE_COUNT <= 8)) {
    return "low";
  }
  if (width < 1024 || (coarsePointer && width < 1920)) {
    return "medium";
  }
  return "high";
}

/** Space background used by both the 3D scene and the HTML fallback. */
export { SPACE_BACKGROUND };