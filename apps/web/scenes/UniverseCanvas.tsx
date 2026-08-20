"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { QUALITY_CONFIG } from "@/lib/universe/performance";
import type { Quality } from "@/lib/universe/types";
import { UniverseScene } from "@/scenes/UniverseScene";

interface UniverseCanvasProps {
  quality: Quality;
  reducedMotion: boolean;
}

/**
 * The WebGL entry point. Kept completely isolated from the app: it owns the
 * renderer, camera, pixel ratio and render loop. Loaded client-side only
 * (never SSR'd) via dynamic import in UniverseExperience.
 */
export function UniverseCanvas({ quality, reducedMotion }: UniverseCanvasProps) {
  const config = QUALITY_CONFIG[quality];

  return (
    <div
      className="absolute inset-0"
      aria-hidden="true"
      role="presentation"
    >
      <Canvas
        dpr={config.dpr}
      camera={{
        position: [0, 1.4, 7],
        fov: 45,
        near: 0.1,
        far: 200,
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      }}
      frameloop={reducedMotion ? "demand" : "always"}
      onCreated={(state) => {
        state.gl.domElement.setAttribute("aria-hidden", "true");
        state.gl.domElement.setAttribute("role", "presentation");
        state.camera.lookAt(0, 0, 0);
        if (process.env.NODE_ENV === "development") {
          // Dev-only instrumentation: counts WebGL frames and exposes
          // renderer stats so the debug tooling can verify the scene.
          const renderer = state.gl;
          const originalRender = renderer.render.bind(renderer);
          renderer.render = (...args: Parameters<typeof renderer.render>) => {
            const win = window as unknown as {
              __universeRenderCount?: number;
              __universePointer?: number[];
              __universeCamera?: number[];
              __universeStats?: {
                calls: number;
                points: number;
                triangles: number;
                geometries: number;
              };
            };
            win.__universeRenderCount = (win.__universeRenderCount ?? 0) + 1;
            win.__universeStats = {
              calls: renderer.info.render.calls,
              points: renderer.info.render.points,
              triangles: renderer.info.render.triangles,
              geometries: renderer.info.memory.geometries,
            };
            win.__universePointer = [
              state.pointer.x,
              state.pointer.y,
            ];
            win.__universeCamera = state.camera.position.toArray();
            return originalRender(...args);
          };
        }
      }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <UniverseScene quality={quality} reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
    </div>
  );
}