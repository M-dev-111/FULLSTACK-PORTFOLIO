import { Code2, Server, Wrench } from "lucide-react";
import Reveal from "./Reveal";
import { Aurora, SectionHeading, useSpotlight } from "./ui";
import { useContent } from "../lib/content";

const ICONS = [Code2, Server, Wrench];

/** Five-segment proficiency meter — cleaner than a full progress bar. */
function Meter({ value }) {
  const filled = Math.round((value / 100) * 5);
  return (
    <span className="flex items-center gap-1" aria-label={`${value}%`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 w-4 rounded-full transition-colors"
          style={{
            background:
              i < filled
                ? "linear-gradient(90deg, var(--color-accent), var(--color-accent-2))"
                : "var(--surface-2)",
            boxShadow: i < filled ? "0 0 8px var(--accent-glow)" : "none",
          }}
        />
      ))}
    </span>
  );
}

export default function Skills() {
  const { SKILLS } = useContent();
  const spotlight = useSpotlight();
  return (
    <section id="skills" className="cv-auto relative isolate py-24 md:py-32" data-testid="skills-section">
      <Aurora className="opacity-50" />
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Skills"
          title="A toolkit for crafting"
          accent="premium experiences."
          intro="Carefully chosen, daily-driven tools. Deep on the frontend, strong on the backend, opinionated on the workflow."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((g, idx) => {
            const Icon = ICONS[idx] || Code2;
            return (
              <Reveal key={g.group} delay={idx * 80}>
                <div
                  onMouseMove={spotlight}
                  className="spotlight glass gradient-border glow-hover group relative h-full overflow-hidden rounded-[28px] p-7 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_10px_30px_-8px_var(--accent-glow)]"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
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
                  <ul className="mt-6 space-y-3.5">
                    {g.items.map((s) => (
                      <li
                        key={s.name}
                        className="flex items-center justify-between gap-3"
                        data-testid={`skill-${s.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      >
                        <span className="text-sm text-strong">{s.name}</span>
                        <Meter value={s.level ?? 80} />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
