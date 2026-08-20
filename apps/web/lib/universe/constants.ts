import type {
  CameraPlacement,
  CameraPlacementData,
  Vector3Tuple,
} from "@/lib/universe/types";

/** Deep-space background color — the base of the entire universe. */
export const SPACE_BACKGROUND = "#03030A";

/**
 * HTML overlay colors. The universe backdrop is always dark space, so the
 * identity layer uses these fixed light-on-dark values instead of theme
 * tokens (which flip in light mode).
 */
export const SPACE_TEXT = {
  foreground: "#E9E9EE",
  muted: "#8F8F9B",
  accent: "#8B98FF",
} as const;

/**
 * Atmosphere palette. Restrained: electric blue, violet, small cyan accents.
 * Never used at neon saturation.
 */
export const SPACE_COLORS = {
  blue: "#6E7BFF",
  violet: "#8B6CF0",
  cyan: "#4FD1C5",
  starWhite: "#D6D9F0",
  starBlue: "#9FB4FF",
  starViolet: "#B9A6F5",
} as const;

/** Central core (represents Jashanpreet). */
export const CORE = {
  radius: 1,
  surfaceColor: "#0B0B16",
  surfaceEmissive: "#191A38",
  atmosphereColor: "#4A55C8",
  atmosphereOpacity: 0.35,
  haloOpacity: 0.5,
  energyRingCount: 160,
  energyRingRadius: 1.9,
  rotationSpeed: 0.06,
  energySpeed: 0.12,
} as const;

/** Thin orbital foundation rings around the core. */
export const ORBITS = {
  radii: [2.3, 3.2, 4.3] as const,
  color: "#8B98FF",
  opacity: 0.14,
  tilt: 0.14,
  rotationSpeed: 0.02,
} as const;

/**
 * Camera placements for future cinematic targets. Only `home` is
 * implemented in this phase; the type surface is ready for the rest.
 */
export const CAMERA_TARGETS: Record<CameraPlacement, CameraPlacementData> = {
  home: {
    key: "home",
    position: [0, 1.4, 7] satisfies Vector3Tuple,
    target: [0, 0, 0],
    fov: 45,
  },
  projects: {
    key: "projects",
    position: [0, 1.4, 7],
    target: [0, 0, 0],
    fov: 45,
  },
  skills: { key: "skills", position: [0, 1.4, 7], target: [0, 0, 0], fov: 45 },
  experience: {
    key: "experience",
    position: [0, 1.4, 7],
    target: [0, 0, 0],
    fov: 45,
  },
  about: { key: "about", position: [0, 1.4, 7], target: [0, 0, 0], fov: 45 },
  resume: { key: "resume", position: [0, 1.4, 7], target: [0, 0, 0], fov: 45 },
  contact: {
    key: "contact",
    position: [0, 1.4, 7],
    target: [0, 0, 0],
    fov: 45,
  },
} as const;
