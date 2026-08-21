"use client";

import { useCallback } from "react";
import { INTERACTIVE_DESTINATIONS, getPlanet } from "@/lib/universe/navigation";
import {
  universeInteraction,
  useUniverseInteraction,
} from "@/lib/universe/interaction";
import { navigationStore } from "@/lib/universe/navigation-store";
import type { UniverseDestination } from "@/lib/universe/types";
import { cn } from "@/lib/utils";

/**
 * Accessible HTML navigation layer that mirrors the four 3D planets.
 * Each button shares the same interaction store as the3D meshes — one source
 * of truth drives both the visual planet and the keyboard/touch control.
 *
 * Visually discreet: small uppercase letter-spaced text, muted by default,
 * brightens on hover/focus/selection. Positioned at the bottom-center of
 * the hero so it never competes with the core or identity text.
 */
export function PlanetNav() {
  const { selectedPlanet, hoveredPlanet } = useUniverseInteraction();

  return (
    <nav
      aria-label="Digital Universe"
      className="pointer-events-auto absolute inset-x-0 bottom-[8%] z-[6] flex justify-center"
    >
      <ul className="flex items-center gap-1 sm:gap-2">
        {INTERACTIVE_DESTINATIONS.map((dest) => {
          const planet = getPlanet(dest);
          if (!planet) return null;
          const isHovered = hoveredPlanet === planet.id;
          const isSelected = selectedPlanet === planet.id;

          return (
            <li key={planet.id}>
              <PlanetButton
                planetId={planet.id}
                destination={planet.destination}
                label={planet.label}
                isHovered={isHovered}
                isSelected={isSelected}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/*  Individual button — isolated to keep the parent clean.                    */
/* -------------------------------------------------------------------------- */

interface PlanetButtonProps {
  planetId: string;
  destination: UniverseDestination;
  label: string;
  isHovered: boolean;
  isSelected: boolean;
}

function PlanetButton({
  planetId,
  destination,
  label,
  isHovered,
  isSelected,
}: PlanetButtonProps) {
  const onPointerEnter = useCallback(() => {
    universeInteraction.setHovered(planetId as "experience" | "skills" | "projects" | "about");
  }, [planetId]);

  const onPointerLeave = useCallback(() => {
    universeInteraction.setHovered(null);
  }, []);

  const onClick = useCallback(() => {
    navigationStore.navigateTo(destination);
  }, [destination]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
    [onClick],
  );

  return (
    <button
      type="button"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-pressed={isSelected}
      className={cn(
        "planet-nav-btn",
        isHovered && "planet-nav-btn--hovered",
        isSelected && "planet-nav-btn--selected",
      )}
    >
      {label}
    </button>
  );
}
