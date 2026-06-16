import { Code2, Smartphone, Palette, Plug, Layers, Server, Wrench, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { Aurora, SectionHeading, useSpotlight } from "./ui";
import { useContent } from "../lib/content";

const ICONS = { Code2, Smartphone, Palette, Plug, Layers, Server, Wrench };

export default function Services() {
  const { SERVICES } = useContent();
  const spotlight = useSpotlight();
  return (
    <section id="services" className="cv-auto relative isolate py-24 md:py-32" data-testid="services-section">
      <Aurora className="opacity-40" />
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Services"
          title="What I can help"
          accent="you build."
          intro="From a single landing page to full MERN apps — I bring design taste, engineering rigor, and the patience to polish until it feels effortless."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Code2;
            return (
              <Reveal key={s.title} delay={i * 60}>
                <div
                  onMouseMove={spotlight}
                  className="spotlight glass gradient-border glow-hover group relative h-full overflow-hidden rounded-[28px] p-6 transition-transform duration-300 hover:-translate-y-1.5 md:p-8"
                  data-testid={`service-card-${i}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-[0_10px_30px_-8px_var(--accent-glow)] transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-faint">/0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight text-strong sm:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-muted">{s.desc}</p>

                  <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted">
                    <span className="transition-colors group-hover:text-accent">Learn more</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
