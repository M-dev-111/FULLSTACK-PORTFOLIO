import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Code2, Server, Wrench } from "lucide-react";
import Reveal from "./Reveal";
import { useContent } from "../lib/content";

const ICONS = [Code2, Server, Wrench];

function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 14 });
  const sry = useSpring(ry, { stiffness: 120, damping: 14 });
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 9);
    rx.set(-py * 9);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full"
        style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
      />
    </div>
  );
}

export default function Skills() {
  const { SKILLS } = useContent();
  return (
    <section id="skills" className="cv-auto relative py-24 md:py-32" data-testid="skills-section">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Skills</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-strong sm:text-5xl lg:text-6xl">
                A toolkit for crafting
                <br />
                <span className="text-gradient-accent">premium experiences.</span>
              </h2>
            </div>
            <p className="max-w-md text-muted">
              Carefully chosen, daily-driven tools. Deep on the frontend, strong on the backend,
              opinionated on the workflow.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1000 }}>
          {SKILLS.map((g, idx) => {
            const Icon = ICONS[idx] || Code2;
            return (
              <Reveal key={g.group} delay={idx * 80}>
                <TiltCard className="group relative h-full">
                  <div className="relative h-full overflow-hidden rounded-[28px] card p-7 transition-colors duration-300 hover:border-accent">
                    <div className="flex items-center justify-between">
                      <div
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white"
                        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-[0.25em] text-faint">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-strong">
                      {g.group}
                    </h3>
                    <ul className="mt-6 space-y-4">
                      {g.items.map((s) => (
                        <li key={s.name} data-testid={`skill-${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-strong">{s.name}</span>
                            <span className="font-mono text-xs text-faint">{s.level}%</span>
                          </div>
                          <div className="mt-2">
                            <ProgressBar value={s.level} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
