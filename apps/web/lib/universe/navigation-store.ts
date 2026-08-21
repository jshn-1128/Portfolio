import { useSyncExternalStore } from "react";
import type { UniverseDestination } from "@/lib/universe/types";
import { universeInteraction } from "@/lib/universe/interaction";

/* -------------------------------------------------------------------------- */
/*  Pure navigation state — no React, no DOM, no rendering.                   */
/* -------------------------------------------------------------------------- */

export interface NavigationState {
  currentDestination: UniverseDestination;
  targetDestination: UniverseDestination | null;
  isTransitioning: boolean;
}

type Listener = () => void;

const listeners = new Set<Listener>();

let state: NavigationState = {
  currentDestination: "home",
  targetDestination: null,
  isTransitioning: false,
};

function emit() {
  for (const l of listeners) l();
}

function update(patch: Partial<NavigationState>) {
  const next = { ...state, ...patch };
  if (
    next.currentDestination === state.currentDestination &&
    next.targetDestination === state.targetDestination &&
    next.isTransitioning === state.isTransitioning
  )
    return;
  state = next;
  emit();
}

/* -------------------------------------------------------------------------- */
/*  Public API — used by the camera rig, planets, nav, and Escape handler.    */
/* -------------------------------------------------------------------------- */

export const navigationStore = {
  getState: (): NavigationState => state,

  subscribe: (listener: Listener): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  /**
   * Start a camera transition to a destination.
   * Ignored if already transitioning or if already at the target.
   */
  navigateTo: (destination: UniverseDestination) => {
    if (state.isTransitioning) return;
    if (state.currentDestination === destination) return;

    if (destination === "home") {
      universeInteraction.clearSelection();
    } else {
      universeInteraction.select(destination);
    }
    update({
      targetDestination: destination,
      isTransitioning: true,
    });
  },

  /**
   * Return to home. Clears selection and triggers a transition.
   * Ignored if already transitioning or already home.
   */
  goHome: () => {
    if (state.isTransitioning) return;
    if (state.currentDestination === "home") return;

    universeInteraction.clearSelection();
    update({
      targetDestination: "home",
      isTransitioning: true,
    });
  },

  /**
   * Called by CameraRig when the lerp has converged.
   * Locks the current position and ends the transition.
   */
  completeTransition: () => {
    const target = state.targetDestination ?? "home";
    universeInteraction.clearSelection();
    update({
      currentDestination: target,
      targetDestination: null,
      isTransitioning: false,
    });
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  React hook — typed, subscribes exactly once per component.                */
/*  3D code can read via `navigationStore.getState()` to avoid re-renders.    */
/* -------------------------------------------------------------------------- */

export function useNavigationStore(): NavigationState {
  return useSyncExternalStore(
    navigationStore.subscribe,
    navigationStore.getState,
    () => state,
  );
}
