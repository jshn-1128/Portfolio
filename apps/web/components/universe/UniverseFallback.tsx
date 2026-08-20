import { SITE } from "@/lib/site";
import { SPACE_BACKGROUND, SPACE_TEXT } from "@/lib/universe/constants";

const TAGLINE = "AI ENGINEER · FULL-STACK DEVELOPER";

/**
 * HTML fallback shown when WebGL is unavailable. Visually consistent with
 * the universe: same deep-space background, same typography, no blank page.
 */
export function UniverseFallback() {
  return (
    <section
      aria-label="Universe unavailable — HTML fallback"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: SPACE_BACKGROUND }}
    >
      <div className="flex max-w-2xl flex-col items-center gap-5 px-6 text-center">
        <p className="text-code" style={{ color: SPACE_TEXT.accent }}>
          <span aria-hidden="true">{"// "}</span>digital universe
        </p>
        <h1
          className="text-h1"
          style={{ color: SPACE_TEXT.foreground }}
        >
          {SITE.name.toUpperCase()}
        </h1>
        <p
          className="text-code tracking-wide"
          style={{ color: SPACE_TEXT.muted }}
        >
          {TAGLINE}
        </p>
        <p
          className="text-small mt-4 max-w-sm"
          style={{ color: SPACE_TEXT.muted }}
        >
          WebGL isn&apos;t available on this device, so the 3D universe
          can&apos;t be rendered. A 2D experience will be available here.
        </p>
      </div>
    </section>
  );
}