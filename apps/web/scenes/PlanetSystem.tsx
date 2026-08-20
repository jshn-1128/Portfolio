"use client";

import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { PLANETS } from "@/lib/universe/constants";
import type { Quality } from "@/lib/universe/types";

interface PlanetSystemProps {
  quality: Quality;
}

/**
 * The fixed site header is 64px (h-16) + 1px border. The EXPERIENCE label is
 * clamped so its top edge never rises above this line (px from the top of the
 * canvas), keeping it clear of the navigation at every viewport size and
 * pointer-parallax extreme.
 */
const HEADER_SAFE_AREA = 72;
/** Must stay in sync with the distanceFactor on the Html labels. */
const LABEL_DISTANCE_FACTOR = 16;
/** Fallback label height until the label has been measured. */
const LABEL_HEIGHT_ESTIMATE = 28;

const projected = new THREE.Vector3();
const cameraPos = new THREE.Vector3();

/** drei's objectScale: world units per CSS px at the object's distance. */
function objectScale(el: THREE.Object3D, camera: THREE.Camera): number {
  if (!(camera instanceof THREE.PerspectiveCamera)) return 1;
  const dist = projected
    .setFromMatrixPosition(el.matrixWorld)
    .distanceTo(cameraPos.setFromMatrixPosition(camera.matrixWorld));
  return 1 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * dist);
}

/**
 * Screen anchor for the EXPERIENCE label. Mirrors drei's default projection
 * but clamps the vertical anchor below the header safe area (accounting for
 * the label's scaled half height) so the label can never slide behind the
 * fixed top navigation. Horizontal projection is untouched, and the label
 * keeps its planet-relative position whenever there is room.
 */
function experiencePosition(
  el: THREE.Object3D,
  camera: THREE.Camera,
  size: { width: number; height: number },
  labelHalfHeight: number,
): [number, number] {
  projected.setFromMatrixPosition(el.matrixWorld).project(camera);
  const widthHalf = size.width / 2;
  const heightHalf = size.height / 2;
  const x = projected.x * widthHalf + widthHalf;
  const y = -(projected.y * heightHalf) + heightHalf;
  return [x, Math.max(y, HEADER_SAFE_AREA + labelHalfHeight)];
}

/**
 * Temporary conceptual planets (EXPERIENCE · SKILLS · PROJECTS · ABOUT).
 * Dark small bodies with a whisper of atmosphere, tinted per category.
 * They map the future spatial portfolio without implementing it yet.
 * On narrow viewports the constellation contracts toward the axis so the
 * planets and their labels stay on screen.
 */
export function PlanetSystem({ quality }: PlanetSystemProps) {
  const showAtmosphere = quality !== "low";
  const viewport = useThree((state) => state.viewport);
  const experienceLabel = useRef<HTMLDivElement | null>(null);

  // Desktop viewport width at the core plane is ~5.8 world units; contract
  // the x/z spread on narrower viewports (never below 50%) and ease the
  // vertical spread the same way so top planets never clip the header.
  const spread = Math.max(0.5, Math.min(1, viewport.width / 7.4));
  const vSpread = 0.5 + 0.5 * spread;

  return (
    <group>
      {PLANETS.map((planet) => (
        <group
          key={planet.id}
          position={[
            planet.position[0] * spread,
            planet.position[1] * vSpread,
            planet.position[2] * spread,
          ]}
        > 
          <mesh>
            <sphereGeometry args={[planet.radius, 24, 24]} />
            <meshStandardMaterial
              color={planet.color}
              emissive={planet.emissive}
              emissiveIntensity={0.32}
              roughness={0.78}
              metalness={0.12}
            />
          </mesh>

          {showAtmosphere && (
            <mesh scale={1.24}>
              <sphereGeometry args={[planet.radius, 16, 16]} />
              <meshBasicMaterial
                color={planet.color}
                transparent
                opacity={0.1}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          )}

          <Html
            ref={planet.id === "experience" ? experienceLabel : undefined}
            center
            position={[0, planet.radius + 0.42, 0]}
            distanceFactor={LABEL_DISTANCE_FACTOR}
            zIndexRange={[40, 0]}
            wrapperClass="pointer-events-none select-none"
            calculatePosition={
              planet.id === "experience"
                ? (el, camera, size) => {
                    const height =
                      experienceLabel.current?.offsetHeight ||
                      LABEL_HEIGHT_ESTIMATE;
                    const halfHeight =
                      (height / 2) *
                      objectScale(el, camera) *
                      LABEL_DISTANCE_FACTOR;
                    return experiencePosition(el, camera, size, halfHeight);
                  }
                : undefined
            }
          >
            <span className="planet-label">{planet.label}</span>
          </Html>
        </group>
      ))}
    </group>
  );
}