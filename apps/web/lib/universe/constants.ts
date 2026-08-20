import type {
  CameraPlacement,
  CameraPlacementData,
  PlanetConfig,
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
 * Atmosphere palette. Very restrained: electric blue, violet, one faint cyan
 * accent. Never used at neon saturation — color is reserved for rims,
 * atmospheres and tiny highlights, never for large lit surfaces.
 */
export const SPACE_COLORS = {
  blue: "#6E7BFF",
  violet: "#8B6CF0",
  cyan: "#6FC7FF",
  deepViolet: "#6F4AA8",
  softViolet: "#9A7BFF",
  electricBlue: "#536DFF",
  starWhite: "#C9CCE4",
  starBlue: "#8FA6F0",
  starViolet: "#A795E8",
} as const;

/**
 * Central core (represents Jashanpreet). A dark celestial body: the visible
 * surface stays near-black, and all color lives on the rim, atmosphere and
 * halo so the object reads as dimensional rather than flat.
 */
export const CORE = {
  radius: 1,
  surfaceColor: "#0A0D1F",
  surfaceEmissive: "#23274F",
  emissiveIntensity: 0.2,
  /** Fresnel rim — electric blue at grazing angles only. */
  rimColor: "#8FA6F0",
  rimIntensity: 1.5,
  rimPower: 2.4,
  /** Thin additive atmosphere shell just outside the body. */
  atmosphereColor: "#536DFF",
  atmosphereOpacity: 0.22,
  /** Soft billboard glow behind the body. */
  haloOpacity: 0.55,
  haloScale: 8.5,
  /** Energy dust cloud parameters (points, not a rigid ring). */
  energyCount: 160,
  energyMinRadius: 1.45,
  energyMaxRadius: 2.55,
  energySize: 0.06,
  energyOpacity: 0.5,
  rotationSpeed: 0.06,
  energySpeed: 0.05,
} as const;

/**
 * Thin orbital foundation rings. Opacity is deliberately tiny — they should
 * read as faint gravitational paths, never as drawn circles.
 */
export const ORBITS = {
  radii: [2.5, 3.2, 3.85] as const,
  color: "#8FA6E8",
  opacity: 0.09,
  tilt: 0.2,
  rotationSpeed: 0.012,
} as const;

/**
 * Temporary conceptual planets. Their arrangement starts to map the future
 * spatial portfolio: Experience up, Skills up-right, Projects up-left,
 * About to the right. Blues and violets only, low saturation, always
 * visually secondary to the core.
 */
export const PLANETS: readonly PlanetConfig[] = [
  {
    id: "experience",
    label: "EXPERIENCE",
    color: "#43306B",
    emissive: "#2A1F47",
    radius: 0.34,
    position: [0, 2.15, -1.2] satisfies Vector3Tuple,
  },
  {
    id: "skills",
    label: "SKILLS",
    color: "#4A3A78",
    emissive: "#2E2350",
    radius: 0.3,
    position: [1.85, 1.5, -1.5] satisfies Vector3Tuple,
  },
  {
    id: "projects",
    label: "PROJECTS",
    color: "#33406F",
    emissive: "#1E2745",
    radius: 0.32,
    position: [-1.85, 1.5, -1.5] satisfies Vector3Tuple,
  },
  {
    id: "about",
    label: "ABOUT",
    color: "#2C445C",
    emissive: "#182C42",
    radius: 0.28,
    position: [2.7, -0.1, -0.5] satisfies Vector3Tuple,
  },
] as const;

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
