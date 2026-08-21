"use client";

import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import { CAMERA_TARGETS } from "@/lib/universe/constants";
import { navigationStore, useNavigationStore } from "@/lib/universe/navigation-store";

interface CameraRigProps {
  reducedMotion: boolean;
}

const parallaxOffset = new Vector3();
const targetPosition = new Vector3();
const targetLook = new Vector3();
const completionCheck = new Vector3();

/**
 * Cinematic camera. Holds the current destination's placement and reacts to
 * the pointer with subtle parallax (only at home, not during transitions).
 * When a planet is clicked, the camera lerps to the destination's placement;
 * reduced-motion users get an instant snap. Escape returns to home.
 */
export function CameraRig({ reducedMotion }: CameraRigProps) {
  useNavigationStore();

  useFrame((state, delta) => {
    const nav = navigationStore.getState();
    const { camera, pointer } = state;

    if (nav.isTransitioning && nav.targetDestination) {
      const target =
        CAMERA_TARGETS[nav.targetDestination] ?? CAMERA_TARGETS.home;
      targetPosition.set(...target.position);
      targetLook.set(...target.target);

      const t = reducedMotion ? 1 : 1 - Math.exp(-2.5 * delta);
      camera.position.lerp(targetPosition, t);
      camera.lookAt(targetLook);

      completionCheck.copy(targetPosition);
      if (camera.position.distanceTo(completionCheck) < 0.05) {
        camera.position.copy(targetPosition);
        camera.lookAt(targetLook);
        navigationStore.completeTransition();
      }
    } else {
      const current =
        CAMERA_TARGETS[nav.currentDestination] ?? CAMERA_TARGETS.home;

      if (reducedMotion || nav.currentDestination !== "home") {
        parallaxOffset.set(0, 0, 0);
      } else {
        parallaxOffset.set(pointer.x * 0.32, pointer.y * 0.12, 0);
      }

      targetPosition
        .set(current.position[0], current.position[1], current.position[2])
        .add(parallaxOffset);

      const t = 1 - Math.exp(-4 * delta);
      camera.position.lerp(targetPosition, t);
      camera.lookAt(current.target[0], current.target[1], current.target[2]);
    }
  });

  return null;
}
