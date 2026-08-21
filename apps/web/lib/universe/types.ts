export type Vector3Tuple = [number, number, number];

/** Device capability tiers driving every quality-sensitive setting. */
export type Quality = "low" | "medium" | "high";

/**
 * Camera preset key. Future phases implement `projects`, `skills`, etc.
 * This phase only implements `home`.
 */
export type CameraPlacement =
  | "home"
  | "projects"
  | "skills"
  | "experience"
  | "about"
  | "resume"
  | "contact";

export interface CameraPlacementData {
  key: CameraPlacement;
  position: Vector3Tuple;
  target: Vector3Tuple;
  fov: number;
}

/** A planet's identity — the same key used by PLANETS and CAMERA_TARGETS. */
export type PlanetId = "experience" | "skills" | "projects" | "about";

/** Typed navigation destination — maps a planet to a real portfolio section. */
export type UniverseDestination = "home" | PlanetId;

/**
 * A planet orbiting the core. Each entry in PLANETS is one of these.
 * `destination` ties the 3D object to a typed navigation target;
 * `cameraTarget` references the future cinematic camera placement
 * (data-only in this phase — camera travel is Phase 5).
 */
export interface PlanetConfig {
  id: PlanetId;
  label: string;
  /** The portfolio section this planet navigates to. */
  destination: UniverseDestination;
  /** Whether the planet responds to pointer events (always true for the four). */
  interactive: boolean;
  /**
   * References a key in CAMERA_TARGETS for the future cinematic camera move.
   * Data-only; the rig never reads this yet.
   */
  cameraTarget: CameraPlacement;
  /** Body tint — each planet reads slightly differently. */
  color: string;
  /** Deep emissive variant of the tint. */
  emissive: string;
  radius: number;
  position: Vector3Tuple;
}

/** Settings that vary by device quality tier. */
export interface UniverseQualityConfig {
  /** Total star particles. */
  particleCount: number;
  /** Star point size. */
  starSize: number;
  /** Particles orbiting the core. */
  energyParticleCount: number;
  /** Orbital rings are hidden on very weak devices. */
  showOrbits: boolean;
  /** Canvas pixel ratio clamped to [min, max]. */
  dpr: [number, number];
}
