import { useSyncExternalStore } from "react";
import type { PlanetId } from "@/lib/universe/types";

/* -------------------------------------------------------------------------- */
/*  Pure interaction state — no React, no DOM, no rendering.                  */
/* -------------------------------------------------------------------------- */

export interface UniverseInteractionState {
  selectedPlanet: PlanetId | null;
  hoveredPlanet: PlanetId | null;
}

type Listener = () => void;

const listeners = new Set<Listener>();

let state: UniverseInteractionState = {
  selectedPlanet: null,
  hoveredPlanet: null,
};

function emit() {
  for (const l of listeners) l();
}

function update(patch: Partial<UniverseInteractionState>) {
  const next = { ...state, ...patch };
  if (next.selectedPlanet === state.selectedPlanet && next.hoveredPlanet === state.hoveredPlanet) return;
  state = next;
  emit();
}

/* -------------------------------------------------------------------------- */
/*  Public API — used by the3D planet meshes, the accessible nav, and the     */
/*  future camera rig.                                                        */
/* -------------------------------------------------------------------------- */

export const universeInteraction = {
  getState: (): UniverseInteractionState => state,

  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  /** Pointer enters a planet mesh (R3F) or an accessible nav button (HTML). */
  setHovered: (id: PlanetId | null) => update({ hoveredPlanet: id }),

  /** Click or tap on a planet mesh or an accessible nav button. */
  select: (id: PlanetId) => update({ selectedPlanet: id }),

  /** Deselect the current planet (e.g., click background). */
  clearSelection: () => update({ selectedPlanet: null }),
} as const;

/* -------------------------------------------------------------------------- */
/*  React hook — typed, subscribes exactly once per component.                */
/*  Returns a frozen snapshot; the3D code can read it in useFrame via          */
/*  `universeInteraction.getState()` to avoid re-renders entirely.            */
/* -------------------------------------------------------------------------- */

export function useUniverseInteraction(): UniverseInteractionState {
  return useSyncExternalStore(
    universeInteraction.subscribe,
    universeInteraction.getState,
    () => state, // SSR snapshot
  );
}
