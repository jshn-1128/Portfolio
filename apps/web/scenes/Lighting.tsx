"use client";

import { SPACE_COLORS } from "@/lib/universe/constants";

/**
 * Minimal lighting rig. One neutral key, plus cool blue and violet accents
 * that read as atmosphere rather than neon. No shadows (expensive, and the
 * scene doesn't need them).
 */
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[4, 6, 8]}
        intensity={1.15}
        color="#E8E9FF"
      />
      <pointLight
        position={[-4, -2, 3]}
        intensity={14}
        distance={25}
        color={SPACE_COLORS.blue}
      />
      <pointLight
        position={[4, -3, -4]}
        intensity={10}
        distance={22}
        color={SPACE_COLORS.violet}
      />
      <pointLight
        position={[0, 3, -6]}
        intensity={6}
        distance={18}
        color={SPACE_COLORS.cyan}
      />
    </>
  );
}