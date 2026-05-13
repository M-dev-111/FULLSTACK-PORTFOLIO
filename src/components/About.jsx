import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { PERSONAL, STATS } from "../lib/data";

function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    // Extract a leading number if present
    const m = String(value).match(/^(\d+)(.*)$/);
    if (!m) {
      setDisplay(value);
      return;
    }
    const target = parseInt(m[1], 10);
    const suffix = m[2] || "";
    let start = 0;
    const dur = 1200;
    const t0 = performance.now();
    let raf = 0;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.floor(start + (target - start) * eased);
      setDisplay(cur + suffix);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return <span ref={ref}>{display}</span>;
}

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 lg:py-40" data-testid="about-section">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,107,0,0.10),transparent_55%)]" />
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        {/* Left sticky title */}
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-flame">About me</p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tighter sm:text-5xl lg:text-6xl">
              Designer-mind.
              <br />
              Engineer-hands.
              <br />
              <span className="text-gradient-flame">Builder at heart.</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Right content */}
        <div className="space-y-10 lg:col-span-7">
          <ScrollReveal>
            <div className="rounded-[28px] glass p-8 md:p-10">
              <p className="text-balance text-lg leading-relaxed text-zinc-300">
                I'm <span className="text-white">{PERSONAL.name}</span>, a frontend developer in
                transition to full stack engineering. I obsess over the details — the easing of a
                hover, the rhythm of typography, the weight of a shadow — but I love wiring it all
                up to real backends, APIs and databases.
              </p>
              <p className="mt-5 text-zinc-400">
                My toolkit centers on React, Tailwind, and the MERN stack, with a strong design
                sensibility shaped by Figma. I build interfaces that don't just look premium —
                they feel premium under the cursor.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-2xl glass p-5"
                  data-testid={`stat-${i}`}
                >
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-flame/0 to-flame/0 transition-all duration-500 group-hover:from-flame/15 group-hover:to-transparent" />
                  <div className="font-display text-3xl font-bold text-white sm:text-4xl">
                    <Counter value={s.value} />
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                "Pixel-precise responsive layouts",
                "Smooth, GPU-friendly animations",
                "Clean component architecture",
                "End-to-end MERN delivery",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-sm text-zinc-300"
                >
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-flame shadow-[0_0_10px_rgba(255,107,0,0.7)]" />
                  {t}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}