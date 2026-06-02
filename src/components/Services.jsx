import { Code2, Smartphone, Palette, Plug, Layers, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { SERVICES } from "../lib/data";

const ICONS = { Code2, Smartphone, Palette, Plug, Layers };

export default function Services() {
  return (
    <section id="services" className="cv-auto relative py-24 md:py-32" data-testid="services-section">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Services</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-strong sm:text-5xl lg:text-6xl">
                What I can help
                <br />
                <span className="text-gradient-accent">you build.</span>
              </h2>
            </div>
            <p className="max-w-md text-muted">
              From a single landing page to full MERN apps — I bring design taste, engineering
              rigor, and the patience to polish until it feels effortless.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Code2;
            return (
              <Reveal key={s.title} delay={i * 60}>
                <div
                  className="group relative h-full overflow-hidden rounded-[28px] card p-6 transition-transform duration-300 hover:-translate-y-1.5 md:p-8"
                  data-testid={`service-card-${i}`}
                >
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-[radial-gradient(ellipse_at_bottom,var(--accent-soft),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl card-2 transition-colors group-hover:border-accent">
                      <Icon className="h-5 w-5 text-accent" />
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
