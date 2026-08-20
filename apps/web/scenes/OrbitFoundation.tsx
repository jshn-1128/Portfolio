"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { ORBITS } from "@/lib/universe/constants";

interface OrbitFoundationProps {
  reducedMotion: boolean;
}

function circlePoints(radius: number, segments = 128): [number, number, number][] {
  const points: [number, number, number][] = [];
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
  }
  return points;
}

/**
 * A few extremely subtle orbital rings establishing the future planetary
 * language. Thin, low-opacity, gently tilted; nothing more.
 */
export function OrbitFoundation({ reducedMotion }: OrbitFoundationProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const group = groupRef.current;
    if (group) {
      group.rotation.y += delta * ORBITS.rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      {ORBITS.radii.map((radius, index) => {
        const tiltAxis =
          index % 2 === 0 ? [ORBITS.tilt, 0, 0] : [0, 0, ORBITS.tilt * 0.7];
        return (
          <group key={radius} rotation={tiltAxis as [number, number, number]}>
            <Line
              points={circlePoints(radius)}
              color={ORBITS.color}
              lineWidth={1}
              transparent
              opacity={ORBITS.opacity}
              depthWrite={false}
              toneMapped={false}
            />
          </group>
        );
      })}
    </group>
  );
}