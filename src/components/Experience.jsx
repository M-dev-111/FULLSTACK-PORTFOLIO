import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import { JOURNEY } from "../lib/data";

export default function Experience() {
  return (
    <section id="journey" className="relative py-24 md:py-32" data-testid="experience-section">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <ScrollReveal>
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-flame">Journey</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
              From pixels to{" "}
              <span className="text-gradient-flame">production code.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative mt-16">
          {/* Vertical line */}
          <div
            className="absolute left-5 top-0 bottom-0 w-px md:left-1/2"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(255,107,0,0.4), transparent)" }}
            aria-hidden
          />

          <ul className="space-y-10">
            {JOURNEY.map((j, i) => {
              const left = i % 2 === 0;
              return (
                <li key={j.year} data-testid={`journey-item-${i}`} className="relative">
                  {/* Dot */}
                  <div className="absolute left-5 top-6 -translate-x-1/2 md:left-1/2">
                    <span className="relative inline-flex h-4 w-4 items-center justify-center">
                      <span className="absolute inset-0 rounded-full blur-md" style={{ background: "rgba(255,107,0,0.3)" }} />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-flame shadow-[0_0_16px_rgba(255,107,0,0.7)]" />
                    </span>
                  </div>

                  <div
                    className={`grid grid-cols-1 gap-6 pl-12 md:grid-cols-2 md:gap-12 md:pl-0`}
                  >
                    {/* Content */}
                    <motion.div
                      initial={{ opacity: 0, x: left ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className={`${left ? "md:text-right md:pr-12" : "md:order-2 md:pl-12"} ${left ? "" : "md:col-start-2"}`}
                    >
                      <div className="inline-block rounded-full px-3 py-1 font-mono text-xs text-flame" style={{ border: "1px solid rgba(255,107,0,0.3)", background: "rgba(255,107,0,0.05)" }}>
                        {j.year}
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
                        {j.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm text-zinc-400 md:ml-auto md:max-w-sm">
                        {j.body}
                      </p>
                    </motion.div>
                    {/* Spacer */}
                    <div className="hidden md:block" />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}