"use client";

import { SITE } from "@/lib/site";
import { SPACE_TEXT } from "@/lib/universe/constants";

const TAGLINE = "AI ENGINEER · FULL-STACK DEVELOPER";

/**
 * The accessible HTML identity layer floating above the WebGL scene.
 * All important text lives in HTML — never inside the 3D canvas.
 */
export function UniverseIdentity() {
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14">
      <p className="text-code mb-4" style={{ color: SPACE_TEXT.accent }}>
        <span aria-hidden="true">{"// "}</span>digital universe
      </p>
      <h1
        className="text-h1 sm:text-display"
        style={{ color: SPACE_TEXT.foreground }}
      >
        {SITE.name.toUpperCase()}
      </h1>
      <p
        className="text-code mt-3 max-w-md tracking-wide"
        style={{ color: SPACE_TEXT.muted }}
      >
        {TAGLINE}
      </p>
    </div>
  );
}