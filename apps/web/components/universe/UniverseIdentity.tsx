"use client";

import { SITE } from "@/lib/site";
import { SPACE_TEXT } from "@/lib/universe/constants";

const TAGLINE = "AI ENGINEER & FULL-STACK DEVELOPER";

/**
 * The accessible HTML identity layer floating above the WebGL scene.
 * Top-left: the name, small and letter-spaced — the universe stays the hero.
 * Center: a quiet cinematic title over the core. All text is real HTML.
 */
export function UniverseIdentity() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[5]">
      {/* Identity — top left */}
      <div className="absolute left-5 top-24 sm:left-10 sm:top-28 lg:left-14 lg:top-32">
        <h1
          className="text-[0.68rem] font-extralight uppercase sm:text-[0.75rem]"
          style={{
            color: SPACE_TEXT.foreground,
            letterSpacing: "0.38em",
            textShadow: "0 0 18px rgba(0, 0, 0, 0.9)",
          }}
        >
          {SITE.name}
        </h1>
        <p
          className="mt-3 text-[0.56rem] uppercase sm:text-[0.62rem]"
          style={{
            color: SPACE_TEXT.muted,
            letterSpacing: "0.3em",
            textShadow: "0 0 14px rgba(0, 0, 0, 0.9)",
          }}
        >
          {TAGLINE}
        </p>
      </div>

      {/* Cinematic title — floats above the core, negative space below */}
      <div className="absolute inset-x-0 top-[27%] flex flex-col items-center text-center sm:top-[28%]">
        <p
          className="text-[0.55rem] uppercase sm:text-[0.65rem] md:text-[0.7rem]"
          style={{
            color: SPACE_TEXT.muted,
            letterSpacing: "0.6em",
            paddingLeft: "0.6em",
            textShadow: "0 0 16px rgba(0, 0, 0, 0.9)",
          }}
        >
          Welcome to my
        </p>
        <h2
          className="mt-4 text-[1.55rem] font-extralight uppercase sm:text-[2.1rem] md:text-[2.7rem] lg:text-[3rem]"
          style={{
            color: SPACE_TEXT.foreground,
            letterSpacing: "0.3em",
            paddingLeft: "0.3em",
            textShadow: "0 0 28px rgba(83, 109, 255, 0.3)",
          }}
        >
          Digital Universe
        </h2>
      </div>

      {/* Subline — below the core, completes the vertical rhythm */}
      <div className="absolute inset-x-0 bottom-[24%] flex justify-center sm:bottom-[26%]">
        <p
          className="text-[0.55rem] uppercase sm:text-[0.65rem] md:text-[0.7rem]"
          style={{
            color: SPACE_TEXT.muted,
            letterSpacing: "0.5em",
            paddingLeft: "0.5em",
            textShadow: "0 0 16px rgba(0, 0, 0, 0.9)",
          }}
        >
          Explore. Discover. Connect.
        </p>
      </div>
    </div>
  );
}