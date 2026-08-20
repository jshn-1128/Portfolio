"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CORE, SPACE_COLORS } from "@/lib/universe/constants";
import type { Quality } from "@/lib/universe/types";

interface CentralCoreProps {
  energyCount: number;
  reducedMotion: boolean;
  quality: Quality;
}

const RIM_VERTEX_SHADER = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const RIM_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float rim = 1.0 - abs(dot(normalize(vNormal), normalize(vViewDir)));
    rim = pow(rim, uPower) * uIntensity;
    gl_FragColor = vec4(uColor, rim);
  }
`;

/**
 * A 64px canvas soft radial glow — no asset downloads, cheap to sample.
 * Used by the halo sprite; the core of the gradient is left relatively dark
 * so the halo reads as atmosphere rather than a bright disk.
 */
function createHaloTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 8, 32, 32, 32);
    gradient.addColorStop(0, "rgba(130, 140, 235, 0.7)");
    gradient.addColorStop(0.4, "rgba(100, 110, 210, 0.34)");
    gradient.addColorStop(0.75, "rgba(80, 80, 170, 0.12)");
    gradient.addColorStop(1, "rgba(60, 50, 130, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** A soft round point sprite so particles never read as squares. */
function createPointTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.5)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** Deterministic pseudo-random in [0, 1) — no allocations, stable layout. */
function rand(i: number): number {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * The central celestial object: a dark dimensional body with a fresnel rim,
 * one thin additive atmosphere shell and a soft halo. A loose cloud of soft
 * energy particles drifts around it. Deliberately restrained — the core is
 * the brightest thing in the scene, but it is an atmosphere, not a lamp.
 */
export function CentralCore({
  energyCount,
  reducedMotion,
  quality,
}: CentralCoreProps) {
  const coreRef = useRef<THREE.Group>(null);
  const energyRef = useRef<THREE.Points>(null);

  const haloTexture = useMemo(() => createHaloTexture(), []);
  const pointTexture = useMemo(() => createPointTexture(), []);

  /** Mobile (low) quality: a smaller, softer halo keeps the frame dark. */
  const haloScale = quality === "low" ? CORE.haloScale * 0.7 : CORE.haloScale;
  const haloOpacity =
    quality === "low" ? CORE.haloOpacity * 0.75 : CORE.haloOpacity;

  /** Fresnel rim material — created once, never re-allocated per frame. */
  const rimMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: RIM_VERTEX_SHADER,
        fragmentShader: RIM_FRAGMENT_SHADER,
        uniforms: {
          uColor: { value: new THREE.Color(CORE.rimColor) },
          uPower: { value: CORE.rimPower },
          uIntensity: { value: CORE.rimIntensity },
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [],
  );

  /** Soft energy dust: loose spherical shell with brightness variation. */
  const energyData = useMemo(() => {
    const positions = new Float32Array(energyCount * 3);
    const colors = new Float32Array(energyCount * 3);
    const color = new THREE.Color(SPACE_COLORS.electricBlue);
    for (let i = 0; i < energyCount; i++) {
      const theta = rand(i) * Math.PI * 2;
      const phi = Math.acos(2 * rand(i + energyCount) - 1);
      const radius =
        CORE.energyMinRadius +
        rand(i + energyCount * 2) * (CORE.energyMaxRadius - CORE.energyMinRadius);

      // Slightly flattened cloud so it associates with the orbital plane.
      const flat = Math.sin(phi) * 0.9;
      positions[i * 3] = radius * flat * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) * 0.85;
      positions[i * 3 + 2] = radius * flat * Math.sin(theta);

      // Per-particle brightness variation (vertex colors, additive blend).
      const brightness = 0.35 + rand(i + energyCount * 3) * 0.65;
      colors[i * 3] = color.r * brightness;
      colors[i * 3 + 1] = color.g * brightness;
      colors[i * 3 + 2] = color.b * brightness;
    }
    return { positions, colors };
  }, [energyCount]);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    const core = coreRef.current;
    const energy = energyRef.current;
    core?.rotateY(delta * CORE.rotationSpeed);
    if (energy) {
      energy.rotation.y += delta * CORE.energySpeed;
      energy.rotation.z = 0.06;
    }
  });

  return (
    <group>
      {/* Rotating body composite */}
      <group ref={coreRef}>
        {/* Dark dimensional surface */}
        <mesh>
          <sphereGeometry args={[CORE.radius, 40, 40]} />
          <meshStandardMaterial
            color={CORE.surfaceColor}
            emissive={CORE.surfaceEmissive}
            emissiveIntensity={CORE.emissiveIntensity}
            roughness={0.85}
            metalness={0.15}
          />
        </mesh>

        {/* Rim light — electric blue where the surface curves away */}
        <mesh material={rimMaterial}>
          <sphereGeometry args={[CORE.radius * 1.025, 40, 40]} />
        </mesh>

        {/* Thin atmospheric shell, visible mostly at the edges */}
        <mesh>
          <sphereGeometry args={[CORE.radius * 1.14, 28, 28]} />
          <meshBasicMaterial
            color={CORE.atmosphereColor}
            transparent
            opacity={CORE.atmosphereOpacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Billboard halo behind the body — soft atmospheric falloff */}
      <sprite scale={[haloScale, haloScale, 1]} position={[0, 0, -0.15]}>
        <spriteMaterial
          map={haloTexture}
          transparent
          opacity={haloOpacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </sprite>

      {/* Energy dust cloud around the core */}
      {energyCount > 0 && (
        <points ref={energyRef} frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[energyData.positions, 3]}
            />
            <bufferAttribute
              attach="attributes-color"
              args={[energyData.colors, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            map={pointTexture}
            size={CORE.energySize}
            sizeAttenuation
            vertexColors
            transparent
            opacity={CORE.energyOpacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  );
}