import { motion } from "framer-motion";
import { Code2, Smartphone, Palette, Plug, Layers, ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { SERVICES } from "../lib/data";

const ICONS = { Code2, Smartphone, Palette, Plug, Layers };

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32" data-testid="services-section">
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-flame">Services</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                What I can help<br />
                <span className="text-gradient-flame">you build.</span>
              </h2>
            </div>
            <p className="max-w-md text-zinc-400">
              From a single landing page to full MERN apps — I bring design taste, engineering
              rigor, and the patience to polish until it feels effortless.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Code2;
            // bento spans
            const span =
              i === 0
                ? "lg:col-span-3 lg:row-span-2"
                : i === 4
                  ? "lg:col-span-3"
                  : "lg:col-span-3";
            return (
              <ScrollReveal key={s.title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className={`group relative h-full overflow-hidden rounded-[28px] glass p-6 md:p-8 ${span}`}
                  data-testid={`service-card-${i}`}
                >
                  {/* Bottom glow */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-[radial-gradient(ellipse_at_bottom,rgba(255,107,0,0.25),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="flex items-start justify-between">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] ring-1 ring-white/10 transition-colors group-hover:ring-flame/40">
                      <Icon className="h-5 w-5 text-flame" />
                    </div>
                    <span className="font-mono text-xs text-zinc-500">/0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm text-zinc-400">{s.desc}</p>

                  <div className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-300">
                    <span className="opacity-70 transition-colors group-hover:text-flame">
                      Learn more
                    </span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}