"use client";

import { SPACE_BACKGROUND } from "@/lib/universe/constants";

/**
 * Deep space backdrop: opaque background + a soft fog that fades the
 * starfield into the void for cinematic depth. No HDR, no post-processing.
 */
export function SpaceEnvironment() {
  return (
    <>
      <color attach="background" args={[SPACE_BACKGROUND]} />
      <fog attach="fog" args={[SPACE_BACKGROUND, 38, 85]} />
    </>
  );
}