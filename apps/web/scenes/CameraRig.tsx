"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { CAMERA_TARGETS } from "@/lib/universe/constants";
import type { CameraPlacement, Vector3Tuple } from "@/lib/universe/types";

interface CameraRigProps {
  /** Only `home` is implemented in this phase. */
  placement?: CameraPlacement;
  reducedMotion: boolean;
}

const parallaxOffset = new Vector3();
const targetPosition = new Vector3();

/**
 * Cinematic camera. Holds the `home` placement (elevated, comfortable
 * distance) and reacts to the pointer with very subtle parallax. Prepared
 * for future placed camera targets; reduced-motion users get a static frame.
 */
export function CameraRig({
  placement = "home",
  reducedMotion,
}: CameraRigProps) {
  const placementData = CAMERA_TARGETS[placement] ?? CAMERA_TARGETS.home;
  const basePosition = useRef<Vector3Tuple>(
    placementData.position as Vector3Tuple,
  );
  const lookTarget = useRef(new Vector3(...placementData.target));

  useFrame((state, delta) => {
    const { camera, pointer } = state;

    if (reducedMotion) {
      parallaxOffset.set(0, 0, 0);
    } else {
      // Parallax: at most ~0.32 world units — visible, never "follows the cursor".
      parallaxOffset.set(pointer.x * 0.32, pointer.y * 0.12, 0);
    }

    targetPosition
      .set(
        basePosition.current[0],
        basePosition.current[1],
        basePosition.current[2],
      )
      .add(parallaxOffset);

    // Frame-rate-independent smoothing.
    const t = 1 - Math.exp(-4 * delta);
    camera.position.lerp(targetPosition, t);
    camera.lookAt(lookTarget.current);
  });

  return null;
}