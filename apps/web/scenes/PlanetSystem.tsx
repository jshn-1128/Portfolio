"use client";

import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import * as THREE from "three";
import { PLANETS } from "@/lib/universe/constants";
import {
  universeInteraction,
  useUniverseInteraction,
} from "@/lib/universe/interaction";
import type { PlanetConfig, Quality } from "@/lib/universe/types";

interface PlanetSystemProps {
  quality: Quality;
  reducedMotion: boolean;
}

/* -------------------------------------------------------------------------- */
/*  EXPERIENCE label header-safe clamp (Phase 4A, preserved).                 */
/* -------------------------------------------------------------------------- */

const HEADER_SAFE_AREA = 72;
const LABEL_DISTANCE_FACTOR = 16;
const LABEL_HEIGHT_ESTIMATE = 28;

const projected = new THREE.Vector3();
const cameraPos = new THREE.Vector3();

function objectScale(el: THREE.Object3D, camera: THREE.Camera): number {
  if (!(camera instanceof THREE.PerspectiveCamera)) return 1;
  const dist = projected
    .setFromMatrixPosition(el.matrixWorld)
    .distanceTo(cameraPos.setFromMatrixPosition(camera.matrixWorld));
  return 1 / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * dist);
}

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

/* -------------------------------------------------------------------------- */
/*  Quality-tier interaction parameters.  Values are deliberately subtle.     */
/* -------------------------------------------------------------------------- */

const INTERACTION = {
  high: {
    hoverScale: 1.05,
    selectedScale: 1.08,
    hoverAtmosphereOpacity: 0.18,
    selectedAtmosphereOpacity: 0.22,
    hoverEmissiveIntensity: 0.45,
    selectedEmissiveIntensity: 0.55,
  },
  medium: {
    hoverScale: 1.03,
    selectedScale: 1.05,
    hoverAtmosphereOpacity: 0.14,
    selectedAtmosphereOpacity: 0.17,
    hoverEmissiveIntensity: 0.38,
    selectedEmissiveIntensity: 0.45,
  },
  low: {
    hoverScale: 1.02,
    selectedScale: 1.03,
    hoverAtmosphereOpacity: 0.12,
    selectedAtmosphereOpacity: 0.14,
    hoverEmissiveIntensity: 0.35,
    selectedEmissiveIntensity: 0.4,
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  Individual planet — owns its animation refs + useFrame.                   */
/* -------------------------------------------------------------------------- */

interface PlanetProps {
  planet: PlanetConfig;
  quality: Quality;
  reducedMotion: boolean;
  showAtmosphere: boolean;
  spread: number;
  vSpread: number;
  isHovered: boolean;
  isSelected: boolean;
}

function Planet({
  planet,
  quality,
  reducedMotion,
  showAtmosphere,
  spread,
  vSpread,
  isHovered,
  isSelected,
}: PlanetProps) {
  const cfg = INTERACTION[quality];
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const atmosphereRef = useRef<THREE.MeshBasicMaterial>(null);
  const experienceLabel = useRef<HTMLDivElement | null>(null);

  /* Current animated values — persisted across renders. */
  const scaleRef = useRef(1);
  const atmosOpacityRef = useRef(0.1);
  const emissiveRef = useRef(0.32);

  /* Targets derived from interaction state. */
  const targetScale = isSelected ? cfg.selectedScale : isHovered ? cfg.hoverScale : 1;
  const targetAtmos = isSelected ? cfg.selectedAtmosphereOpacity : isHovered ? cfg.hoverAtmosphereOpacity : 0.1;
  const targetEmissive = isSelected ? cfg.selectedEmissiveIntensity : isHovered ? cfg.hoverEmissiveIntensity : 0.32;

  useFrame((_, delta) => {
    const t = reducedMotion ? 1 : 1 - Math.exp(-8 * delta);

    scaleRef.current = THREE.MathUtils.lerp(scaleRef.current, targetScale, t);
    if (groupRef.current) groupRef.current.scale.setScalar(scaleRef.current);

    atmosOpacityRef.current = THREE.MathUtils.lerp(atmosOpacityRef.current, targetAtmos, t);
    if (atmosphereRef.current) atmosphereRef.current.opacity = atmosOpacityRef.current;

    emissiveRef.current = THREE.MathUtils.lerp(emissiveRef.current, targetEmissive, t);
    if (materialRef.current) materialRef.current.emissiveIntensity = emissiveRef.current;
  });

  /* Pointer handlers — write directly to the store, no React state per frame. */
  const onPointerEnter = useCallback(() => {
    universeInteraction.setHovered(planet.id);
    document.body.style.cursor = "pointer";
  }, [planet.id]);

  const onPointerLeave = useCallback(() => {
    universeInteraction.setHovered(null);
    document.body.style.cursor = "";
  }, []);

  const onClick = useCallback(() => {
    universeInteraction.select(planet.id);
  }, [planet.id]);

  const position: [number, number, number] = [
    planet.position[0] * spread,
    planet.position[1] * vSpread,
    planet.position[2] * spread,
  ];

  const labelClass = [
    "planet-label",
    isHovered && "planet-label--hovered",
    isSelected && "planet-label--selected",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
    >
      {/* Body */}
      <mesh>
        <sphereGeometry args={[planet.radius, 24, 24]} />
        <meshStandardMaterial
          ref={materialRef}
          color={planet.color}
          emissive={planet.emissive}
          emissiveIntensity={0.32}
          roughness={0.78}
          metalness={0.12}
        />
      </mesh>

      {/* Atmosphere shell (hidden on low-quality) */}
      {showAtmosphere && (
        <mesh scale={1.24}>
          <sphereGeometry args={[planet.radius, 16, 16]} />
          <meshBasicMaterial
            ref={atmosphereRef}
            color={planet.color}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      )}

      {/* Html label — header-safe clamp only on EXPERIENCE */}
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
                const h =
                  experienceLabel.current?.offsetHeight ||
                  LABEL_HEIGHT_ESTIMATE;
                const half =
                  (h / 2) * objectScale(el, camera) * LABEL_DISTANCE_FACTOR;
                return experiencePosition(el, camera, size, half);
              }
            : undefined
        }
      >
        <span className={labelClass}>{planet.label}</span>
      </Html>
    </group>
  );
}

/* -------------------------------------------------------------------------- */
/*  PlanetSystem — maps PLANETS to individual planet groups.                  */
/* -------------------------------------------------------------------------- */

export function PlanetSystem({ quality, reducedMotion }: PlanetSystemProps) {
  const showAtmosphere = quality !== "low";
  const viewport = useThree((state) => state.viewport);
  const interaction = useUniverseInteraction();

  /* Responsive contraction so planets never clip the header or overflow. */
  const spread = Math.max(0.5, Math.min(1, viewport.width / 7.4));
  const vSpread = 0.5 + 0.5 * spread;

  return (
    <group>
      {PLANETS.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          quality={quality}
          reducedMotion={reducedMotion}
          showAtmosphere={showAtmosphere}
          spread={spread}
          vSpread={vSpread}
          isHovered={interaction.hoveredPlanet === planet.id}
          isSelected={interaction.selectedPlanet === planet.id}
        />
      ))}
    </group>
  );
}
