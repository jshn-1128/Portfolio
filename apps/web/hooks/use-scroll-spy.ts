"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which page section is currently in view using IntersectionObserver.
 * Falls back to "home" when no section is intersecting (e.g. at the top).
 */
export function useScrollSpy(
  sectionIds: string[],
  rootMargin = "-35% 0px -55% 0px",
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin },
    );

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return activeId;
}
