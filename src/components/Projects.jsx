import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import ScrollReveal from "./ScrollReveal";
import { PROJECTS } from "../lib/data";

function ProjectCard({ p, i }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 140, damping: 16 });
  const sry = useSpring(ry, { stiffness: 140, damping: 16 });
  const [hover, setHover] = useState(false);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    setHover(false);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      className={`group relative overflow-hidden rounded-[32px] glass ${
        i % 3 === 0 ? "lg:col-span-7" : "lg:col-span-5"
      }`}
      data-testid={`project-card-${i}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={p.cover}
          alt={p.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
        />
        {/* Color gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} mix-blend-screen`} />
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
        {/* Top meta */}
        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full glass-strong px-3 py-1.5 text-[11px] uppercase tracking-[0.25em] text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-flame" />
          Featured · 0{i + 1}
        </div>

        {/* Hover action buttons */}
        <motion.div
          initial={false}
          animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 12 }}
          transition={{ duration: 0.35 }}
          className="absolute right-5 top-5 flex gap-2"
        >
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            aria-label="Live preview"
            data-testid={`project-live-${i}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white shadow-[0_0_24px_rgba(255,107,0,0.5)]"
            style={{ background: "linear-gradient(135deg, #ff6b00, #ff8533)" }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            data-testid={`project-repo-${i}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full glass-strong text-white"
          >
            <FaGithub className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      <div className="relative p-6 md:p-8">
        <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
          {p.title}
        </h3>
        <p className="mt-3 max-w-lg text-sm text-zinc-400 sm:text-base">{p.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32" data-testid="projects-section">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,107,0,0.10),transparent_55%)]" />
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-flame">Selected Work</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
                Projects that ship<br />
                <span className="text-gradient-flame">and feel cinematic.</span>
              </h2>
            </div>
            <p className="max-w-md text-zinc-400">
              A curated set of recent builds — interactions are designed first, then engineered to
              perform smoothly across devices.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
