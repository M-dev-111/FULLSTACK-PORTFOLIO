import { useCallback } from "react";
import Reveal from "./Reveal";

/**
 * Shared design primitives for the dark/glassy/high-motion language.
 * Everything here is GPU-cheap: static blurred blobs, pointer paint, no
 * per-frame layout. Real backdrop-filter stays reserved for the navbar.
 */

/** Animated aurora backdrop — a few static blurred blobs that slowly drift.
 *  Place inside a `relative isolate` section; it sits at -z-10. */
export function Aurora({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden>
      <div
        className="aurora-blob animate-aurora"
        style={{ top: "-10%", left: "-6%", width: "42vw", height: "42vw", background: "var(--aurora-1)" }}
      />
      <div
        className="aurora-blob animate-aurora"
        style={{ top: "20%", right: "-10%", width: "38vw", height: "38vw", background: "var(--aurora-3)", animationDelay: "-7s" }}
      />
      <div
        className="aurora-blob animate-aurora"
        style={{ bottom: "-14%", left: "30%", width: "34vw", height: "34vw", background: "var(--aurora-2)", animationDelay: "-13s" }}
      />
    </div>
  );
}

/** Wraps children and tracks the pointer to feed the `.spotlight` CSS vars.
 *  Add the `spotlight` class (and usually `glass`/`gradient-border`) yourself. */
export function useSpotlight() {
  return useCallback((e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }, []);
}

/** Consistent section heading with eyebrow + gradient accent line. */
export function SectionHeading({ eyebrow, title, accent, intro, align = "between" }) {
  return (
    <Reveal>
      <div
        className={
          align === "center"
            ? "mx-auto max-w-2xl text-center"
            : "flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        }
      >
        <div className={align === "center" ? "mx-auto" : ""}>
          <span className="eyebrow font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]" />
            {eyebrow}
          </span>
          <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-strong sm:text-5xl lg:text-[3.4rem]">
            {title}
            {accent && (
              <>
                <br />
                <span className="text-gradient-animated">{accent}</span>
              </>
            )}
          </h2>
        </div>
        {intro && (
          <p className={`max-w-md text-muted ${align === "center" ? "mx-auto mt-5" : ""}`}>{intro}</p>
        )}
      </div>
    </Reveal>
  );
}
