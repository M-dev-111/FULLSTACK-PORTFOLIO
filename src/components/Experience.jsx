import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { JOURNEY } from "../lib/data";

export default function Experience() {
  return (
    <section id="journey" className="cv-auto relative py-24 md:py-32" data-testid="experience-section">
      <div className="mx-auto max-w-[1100px] px-6 md:px-10">
        <Reveal>
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Journey</p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-strong sm:text-5xl lg:text-6xl">
              From pixels to <span className="text-gradient-accent">production code.</span>
            </h2>
          </div>
        </Reveal>

        <div className="relative mt-16">
          <div
            className="absolute left-5 top-0 bottom-0 w-px md:left-1/2"
            style={{ background: "linear-gradient(to bottom, transparent, var(--accent-glow), transparent)" }}
            aria-hidden
          />

          <ul className="space-y-10">
            {JOURNEY.map((j, i) => {
              const left = i % 2 === 0;
              return (
                <li key={j.year} data-testid={`journey-item-${i}`} className="relative">
                  <div className="absolute left-5 top-6 -translate-x-1/2 md:left-1/2">
                    <span className="relative inline-flex h-4 w-4 items-center justify-center">
                      <span className="absolute inset-0 rounded-full blur-md" style={{ background: "var(--accent-glow)" }} />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-accent shadow-[0_0_16px_var(--accent-glow)]" />
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-6 pl-12 md:grid-cols-2 md:gap-12 md:pl-0">
                    <motion.div
                      initial={{ opacity: 0, x: left ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className={`${left ? "md:text-right md:pr-12" : "md:order-2 md:pl-12 md:col-start-2"}`}
                    >
                      <div
                        className="inline-block rounded-full px-3 py-1 font-mono text-xs text-accent"
                        style={{ border: "1px solid var(--accent-glow)", background: "var(--accent-soft)" }}
                      >
                        {j.year}
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-strong">
                        {j.title}
                      </h3>
                      <p className="mt-2 max-w-md text-sm text-muted md:ml-auto md:max-w-sm">
                        {j.body}
                      </p>
                    </motion.div>
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
