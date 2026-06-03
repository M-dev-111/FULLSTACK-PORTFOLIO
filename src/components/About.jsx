import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "./Reveal";
import { useContent } from "../lib/content";

function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    const m = String(value).match(/^(\d+)(.*)$/);
    if (!m) {
      setDisplay(value);
      return;
    }
    const target = parseInt(m[1], 10);
    const suffix = m[2] || "";
    const dur = 1100;
    const t0 = performance.now();
    let raf = 0;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(target * eased) + suffix);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

export default function About() {
  const { PERSONAL, STATS } = useContent();
  return (
    <section id="about" className="cv-auto relative py-24 md:py-32 lg:py-40" data-testid="about-section">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,var(--accent-soft),transparent_55%)]" />
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        {/* Left sticky title */}
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">About me</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-strong sm:text-5xl lg:text-6xl">
              Designer-mind.
              <br />
              Engineer-hands.
              <br />
              <span className="text-gradient-accent">Builder at heart.</span>
            </h2>
          </Reveal>
        </div>

        {/* Right content */}
        <div className="space-y-10 lg:col-span-7">
          <Reveal>
            <div className="rounded-[28px] card p-8 md:p-10">
              <p className="text-balance text-lg leading-relaxed text-strong">
                I'm <span className="text-accent font-medium">{PERSONAL.name}</span>, a full stack developer
                who cares about both sides of the stack. I obsess over the details — the easing of a hover,
                the rhythm of typography, the weight of a shadow — then wire it all up to real backends,
                APIs and databases.
              </p>
              <p className="mt-5 text-muted">
                My toolkit centers on React, Tailwind, and the MERN stack, with a strong design sensibility
                shaped by Figma. I collaborate with teams across US and India time zones and build
                interfaces that don't just look premium — they feel premium under the cursor.
              </p>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="group relative overflow-hidden rounded-2xl card p-5 transition-transform duration-300 hover:-translate-y-1"
                  data-testid={`stat-${i}`}
                >
                  <div className="font-display text-3xl font-bold text-strong sm:text-4xl">
                    <Counter value={s.value} />
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-faint">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Pixel-precise responsive layouts",
                "Smooth, GPU-friendly animations",
                "Clean component architecture",
                "End-to-end MERN delivery",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 rounded-2xl card-2 p-4 text-sm text-strong"
                >
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
