"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CORE, SPACE_COLORS } from "@/lib/universe/constants";

interface CentralCoreProps {
  energyCount: number;
  reducedMotion: boolean;
}

/**
 * Create a soft radial halo texture on a 64px canvas — no asset downloads,
 * cheap to sample, gives the core its "lit from within" glow.
 */
function createHaloTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 2, 32, 32, 32);
    gradient.addColorStop(0, "rgba(130, 140, 255, 0.9)");
    gradient.addColorStop(0.35, "rgba(96, 108, 235, 0.4)");
    gradient.addColorStop(1, "rgba(70, 60, 160, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * The central celestial object representing Jashanpreet. A dark sphere with
 * layered additive glow shells, a soft halo sprite, and a thin ring of
 * orbiting energy particles. Deliberately minimal — planets and typography
 * belong to later phases.
 */
export function CentralCore({ energyCount, reducedMotion }: CentralCoreProps) {
  const coreRef = useRef<THREE.Group>(null);
  const energyRef = useRef<THREE.Points>(null);

  const haloTexture = useMemo(() => createHaloTexture(), []);

  const energyPositions = useMemo(() => {
    const positions = new Float32Array(energyCount * 3);
    for (let i = 0; i < energyCount; i++) {
      const angle = (i / energyCount) * Math.PI * 2;
      const radius = CORE.energyRingRadius + (i % 5) * 0.06;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (i % 7) * 0.035 - 0.1;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return positions;
  }, [energyCount]);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const core = coreRef.current;
    const energy = energyRef.current;
    core?.rotateY(delta * CORE.rotationSpeed);
    if (energy) {
      energy.rotation.y += delta * CORE.energySpeed;
      energy.rotation.z = 0.12;
    }
  });

  return (
    <group>
      <group ref={coreRef}>
        {/* Solid dark surface */}
        <mesh>
          <sphereGeometry args={[CORE.radius, 48, 48]} />
          <meshStandardMaterial
            color={CORE.surfaceColor}
            emissive={CORE.surfaceEmissive}
            emissiveIntensity={0.35}
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>

        {/* Inner atmospheric shell */}
        <mesh>
          <sphereGeometry args={[CORE.radius * 1.06, 48, 48]} />
          <meshBasicMaterial
            color={CORE.atmosphereColor}
            transparent
            opacity={CORE.atmosphereOpacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Faint outer glow shell */}
        <mesh>
          <sphereGeometry args={[CORE.radius * 1.22, 32, 32]} />
          <meshBasicMaterial
            color={SPACE_COLORS.violet}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Billboard halo behind the core */}
      <sprite scale={[6.5, 6.5, 1]} position={[0, 0, -0.1]}>
        <spriteMaterial
          map={haloTexture}
          transparent
          opacity={CORE.haloOpacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      {/* Thin ring of energy particles around the core */}
      {energyCount > 0 && (
        <points ref={energyRef} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[energyPositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.055}
            sizeAttenuation
            color={SPACE_COLORS.blue}
            transparent
            opacity={0.6}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  );
}