import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Reveal from "./Reveal";
import { useContent } from "../lib/content";

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
    ry.set(px * 6);
    rx.set(-py * 6);
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
      className={`group relative overflow-hidden rounded-[32px] card ${
        i % 3 === 0 ? "lg:col-span-7" : "lg:col-span-5"
      }`}
      data-testid={`project-card-${i}`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={p.cover}
          alt={p.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className={`absolute inset-0 bg-gradient-to-br ${p.accent} mix-blend-screen`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Featured · 0{i + 1}
        </div>

        <motion.div
          initial={false}
          animate={{ opacity: hover ? 1 : 0, y: hover ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          className="absolute right-5 top-5 flex gap-2"
        >
          <a
            href={p.live}
            target="_blank"
            rel="noreferrer"
            aria-label="Live preview"
            data-testid={`project-live-${i}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white shadow-[0_8px_24px_-6px_rgba(99,102,241,0.8)]"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            data-testid={`project-repo-${i}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm"
          >
            <FaGithub className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      <div className="relative p-6 md:p-8">
        <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-strong sm:text-3xl">
          {p.title}
        </h3>
        <p className="mt-3 max-w-lg text-sm text-muted sm:text-base">{p.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full card-2 px-3 py-1 text-xs text-muted"
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
  const { PROJECTS } = useContent();
  return (
    <section id="projects" className="cv-auto relative py-24 md:py-32" data-testid="projects-section">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,var(--accent-soft),transparent_55%)]" />
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Selected Work</p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight text-strong sm:text-5xl lg:text-6xl">
                Projects that ship
                <br />
                <span className="text-gradient-accent">and feel cinematic.</span>
              </h2>
            </div>
            <p className="max-w-md text-muted">
              A curated set of recent builds — interactions are designed first, then engineered to
              perform smoothly across devices.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12" style={{ perspective: 1200 }}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
