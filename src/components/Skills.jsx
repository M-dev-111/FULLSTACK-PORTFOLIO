import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Code2, Server, Wrench } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { SKILLS } from "../lib/data";

const ICONS = { Frontend: Code2, Backend: Server, Tools: Wrench };

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
    ry.set(px * 10);
    rx.set(-py * 10);
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
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full shadow-[0_0_18px_rgba(255,107,0,0.55)]"
        style={{ background: "linear-gradient(90deg, #ff6b00, #ff8533)" }}
      />
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32" data-testid="skills-section">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-flame">Skills</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                A toolkit for crafting<br />
                <span className="text-gradient-flame">premium experiences.</span>
              </h2>
            </div>
            <p className="max-w-md text-zinc-400">
              Carefully chosen, daily-driven tools. Deep on the frontend, growing on the backend,
              opinionated on the workflow.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((g, idx) => {
            const Icon = ICONS[g.group] || Code2;
            return (
              <ScrollReveal key={g.group} delay={idx * 0.08}>
                <TiltCard className="group relative h-full">
                  <div className="relative h-full overflow-hidden rounded-[28px] glass p-7 transition-colors duration-500 hover:border-flame/30">
                    {/* Glow on hover */}
                    <div
                      className="pointer-events-none absolute -inset-px -z-10 rounded-[28px] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.2), transparent)" }}
                    />
                    <div className="flex items-center justify-between">
                      <div
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-flame ring-1 ring-flame/30"
                        style={{ background: "linear-gradient(135deg, rgba(255,107,0,0.3), rgba(255,107,0,0.1))" }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                      {g.group}
                    </h3>
                    <ul className="mt-6 space-y-4">
                      {g.items.map((s) => (
                        <li key={s.name} data-testid={`skill-${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-zinc-200">{s.name}</span>
                            <span className="font-mono text-xs text-zinc-500">{s.level}%</span>
                          </div>
                          <div className="mt-2">
                            <ProgressBar value={s.level} />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}