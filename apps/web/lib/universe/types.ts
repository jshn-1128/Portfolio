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
