"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SPACE_COLORS } from "@/lib/universe/constants";
import { STARFIELD } from "@/lib/universe/performance";
import type { Quality } from "@/lib/universe/types";

interface StarfieldProps {
  count: number;
  quality: Quality;
  reducedMotion: boolean;
}

const STAR_COLORS = [
  SPACE_COLORS.starWhite,
  SPACE_COLORS.starBlue,
  SPACE_COLORS.starViolet,
] as const;

/**
 * Efficient 3D starfield: a single `Points` draw call with a deterministic
 * random distribution in a spherical shell. Parallax comes for free from the
 * camera rig moving inside the shell; the whole field drifts very slowly.
 */
export function Starfield({ count, quality, reducedMotion }: StarfieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    // Pure deterministic pseudo-random from an index — stable layout across
    // quality switches, no closure state.
    const rand = (i: number) => {
      const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    };

    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // Uniform point in a spherical shell.
      const radius =
        STARFIELD.minRadius + rand(i) * (STARFIELD.maxRadius - STARFIELD.minRadius);
      const theta = rand(i + count) * Math.PI * 2;
      const phi = Math.acos(2 * rand(i + count * 2) - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const base =
        STAR_COLORS[Math.floor(rand(i + count * 3) * STAR_COLORS.length)] ??
        SPACE_COLORS.starWhite;
      color.set(base);
      // Slight brightness variation for depth.
      color.multiplyScalar(0.55 + rand(i + count * 4) * 0.45);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, [count]);

  const starSize = useMemo(() => {
    switch (quality) {
      case "high":
        return 0.035;
      case "medium":
        return 0.042;
      default:
        return 0.05;
    }
  }, [quality]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const points = pointsRef.current;
    if (!points) return;
    points.rotation.y += delta * STARFIELD.rotationSpeed;
    points.rotation.x += delta * STARFIELD.rotationSpeed * 0.25;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={starSize}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
