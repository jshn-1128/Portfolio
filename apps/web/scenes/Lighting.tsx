"use client";

import { SPACE_COLORS } from "@/lib/universe/constants";

/**
 * Minimal lighting rig: one controlled key light for dimensionality, plus
 * two very subtle rim accents (violet behind, blue fill in front). Nothing
 * reads as a visible light source; the core is lit, not flooded.
 */
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.16} />
      <directionalLight
        position={[5, 7, 9]}
        intensity={1.1}
        color="#E9E9F5"
      />
      <pointLight
        position={[-6, 2, -5]}
        intensity={5}
        distance={30}
        color={SPACE_COLORS.violet}
      />
      <pointLight
        position={[2, -4, 5]}
        intensity={3}
        distance={24}
        color={SPACE_COLORS.blue}
      />
    </>
  );
}