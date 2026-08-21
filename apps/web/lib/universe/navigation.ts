import { PLANETS, CAMERA_TARGETS } from "@/lib/universe/constants";
import type {
  CameraPlacementData,
  PlanetConfig,
  PlanetId,
  UniverseDestination,
} from "@/lib/universe/types";

/**
 * Safe lookup — returns `null` for unknown destinations so callers never
 * throw.  The home destination has no planet entry.
 */
export function getPlanet(destination: UniverseDestination): PlanetConfig | undefined {
  return PLANETS.find((p) => p.destination === destination);
}

/**
 * Safe lookup by planet id (the exact string used in PLANETS entries).
 */
export function getPlanetById(id: PlanetId): PlanetConfig | undefined {
  return PLANETS.find((p) => p.id === id);
}

/**
 * Returns the future camera placement for a destination.
 * Always returns a valid CameraPlacementData object — falls back to `home`
 * if the destination is unknown (the home placement is always safe).
 */
export function getCameraTarget(destination: UniverseDestination): CameraPlacementData {
  const planet = getPlanet(destination);
  const placementKey = planet?.cameraTarget ?? "home";
  return CAMERA_TARGETS[placementKey] ?? CAMERA_TARGETS.home;
}

/**
 * Ordered list of the four interactive destinations for rendering
 * accessible navigation controls.  Preserves the canonical display order.
 */
export const INTERACTIVE_DESTINATIONS: readonly UniverseDestination[] =
  PLANETS.filter((p) => p.interactive).map((p) => p.destination);
