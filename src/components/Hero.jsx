import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Download, MapPin, Sparkles, Database, Code2 } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaReact, FaNodeJs } from "react-icons/fa";
import AnimatedOrb from "./AnimatedOrb";
import MagneticButton from "./MagneticButton";
import { Aurora } from "./ui";
import { useContent } from "../lib/content";
import heroImg from "../assets/hero.png";

const TECH_BADGES = ["React", "Node.js", "TypeScript", "Tailwind", "MongoDB", "Express", "Next.js", "Figma"];

const ease = [0.22, 1, 0.36, 1];
const rise = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.08 * i, ease } }),
};

/** A pointer-parallax layer — moves by `depth × pointer offset`. Transform only. */
function Float({ mx, my, depth = 1, className = "", style, children }) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y, ...style }} className={className}>
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const { PERSONAL, STATS } = useContent();
  const heroSrc = PERSONAL.heroImage || heroImg;

  // Pointer parallax for the visual column.
  const mvx = useMotionValue(0);
  const mvy = useMotionValue(0);
  const sx = useSpring(mvx, { stiffness: 90, damping: 18, mass: 0.4 });
  const sy = useSpring(mvy, { stiffness: 90, damping: 18, mass: 0.4 });
  const stageRef = useRef(null);

  const onStageMove = (e) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mvx.set(((e.clientX - r.left) / r.width - 0.5) * 36);
    mvy.set(((e.clientY - r.top) / r.height - 0.5) * 36);
  };
  const onStageLeave = () => {
    mvx.set(0);
    mvy.set(0);
  };

  return (
    <section
      id="home"
      className="relative isolate flex min-h-screen items-center overflow-hidden pb-16 pt-28 md:pt-32"
      data-testid="hero-section"
    >
      {/* Backdrop */}
      <Aurora className="[mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]" />
      <div className="absolute inset-0 -z-10 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_60%_40%,black_10%,transparent_70%)]" />

      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-14 px-6 md:px-10 lg:grid-cols-12 lg:gap-8">
        {/* ── Left: text ── */}
        <div className="lg:col-span-7">
          <motion.span
            variants={rise}
            initial="hidden"
            animate="show"
            custom={0}
            className="inline-flex items-center gap-2 rounded-full glass gradient-border px-4 py-2 text-xs font-medium text-muted"
            data-testid="hero-eyebrow"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {PERSONAL.availability || "Available for work"}
          </motion.span>

          <h1 className="mt-7" data-testid="hero-headline">
            <motion.span
              variants={rise}
              initial="hidden"
              animate="show"
              custom={1}
              className="block font-display text-lg font-medium tracking-tight text-muted sm:text-xl"
            >
              Hi, I&apos;m {PERSONAL.name} <span className="inline-block origin-bottom animate-pulse-soft">👋</span>
            </motion.span>
            <motion.span
              variants={rise}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-2 block font-display text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-strong"
            >
              Full-Stack
            </motion.span>
            <motion.span
              variants={rise}
              initial="hidden"
              animate="show"
              custom={3}
              className="block font-display text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight text-gradient-animated"
            >
              Developer
            </motion.span>
          </h1>

          <motion.p
            variants={rise}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-7 max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg"
            data-testid="hero-subheadline"
          >
            {PERSONAL.tagline ||
              "I design and engineer fast, accessible, production-grade web apps with React and the MERN stack."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4"
          >
            <MagneticButton
              data-testid="hero-cta-projects"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="sheen group inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium text-white transition-shadow hover:shadow-[0_14px_50px_-10px_rgba(124,58,237,0.85)]"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", boxShadow: "0 10px 36px -12px rgba(124,58,237,0.7)" }}
            >
              View Projects
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>

            <MagneticButton
              data-testid="hero-cta-resume"
              onClick={() => {
                const link = document.createElement("a");
                link.href = PERSONAL.resumeUrl;
                link.download = "Dibyendu_Nayak_Resume.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="group inline-flex items-center gap-2 rounded-full glass gradient-border px-7 py-4 text-sm text-strong"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </MagneticButton>
          </motion.div>

          {/* Socials + stat chips */}
          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={6}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <div className="flex items-center gap-3">
              {[
                { Icon: FaGithub, href: PERSONAL.socials.github, label: "GitHub" },
                { Icon: FaLinkedin, href: PERSONAL.socials.linkedin, label: "LinkedIn" },
                { Icon: FaInstagram, href: PERSONAL.socials.instagram, label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  data-testid={`hero-social-${label.toLowerCase()}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full glass text-muted transition-colors hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="h-8 w-px bg-[var(--border)]" aria-hidden />

            <div className="flex items-center gap-6">
              {STATS.slice(0, 3).map((s) => (
                <div key={s.label}>
                  <div className="font-display text-xl font-bold text-strong">{s.value}</div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-faint">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right: parallax visual ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease }}
          className="relative lg:col-span-5"
        >
          <div
            ref={stageRef}
            onMouseMove={onStageMove}
            onMouseLeave={onStageLeave}
            className="relative mx-auto aspect-[4/5] w-full max-w-[420px]"
          >
            {/* Orb halo behind */}
            <div className="pointer-events-none absolute inset-0 -z-10 scale-125 opacity-80">
              <AnimatedOrb className="h-full w-full" />
            </div>

            {/* Portrait card */}
            <Float mx={sx} my={sy} depth={0.4} className="absolute inset-0">
              <div className="glass gradient-border glow relative h-full w-full overflow-hidden rounded-[36px]">
                <img
                  src={heroSrc}
                  alt={PERSONAL.name}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                {/* Name plate */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl glass px-4 py-3">
                  <div>
                    <div className="font-display text-sm font-semibold text-white">{PERSONAL.name}</div>
                    <div className="text-[11px] text-white/70">{PERSONAL.role}</div>
                  </div>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}>
                    <Sparkles className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Float>

            {/* Floating tech chips */}
            <Float mx={sx} my={sy} depth={1.6} className="absolute -left-6 top-12 z-10">
              <span className="flex items-center gap-2 rounded-2xl glass gradient-border px-3 py-2 text-xs font-medium text-strong shadow-lg">
                <FaReact className="h-4 w-4 text-sky-400" /> React
              </span>
            </Float>
            <Float mx={sx} my={sy} depth={2.2} className="absolute -right-5 top-1/3 z-10">
              <span className="flex items-center gap-2 rounded-2xl glass gradient-border px-3 py-2 text-xs font-medium text-strong shadow-lg">
                <FaNodeJs className="h-4 w-4 text-emerald-400" /> Node.js
              </span>
            </Float>
            <Float mx={sx} my={sy} depth={1.9} className="absolute -left-4 bottom-28 z-10">
              <span className="flex items-center gap-2 rounded-2xl glass gradient-border px-3 py-2 text-xs font-medium text-strong shadow-lg">
                <Database className="h-4 w-4 text-green-400" /> MongoDB
              </span>
            </Float>

            {/* Floating "currently" card */}
            <Float mx={sx} my={sy} depth={1.2} className="absolute -right-4 -bottom-3 z-10">
              <div className="flex items-center gap-2.5 rounded-2xl glass gradient-border px-4 py-3 shadow-xl">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-accent">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-faint">Based in</div>
                  <div className="text-xs font-medium text-strong">{PERSONAL.location}</div>
                </div>
              </div>
            </Float>

            <Float mx={sx} my={sy} depth={2.4} className="absolute -left-3 -top-3 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs text-strong shadow-lg">
                <Code2 className="h-3.5 w-3.5 text-accent" /> Open to work
              </span>
            </Float>
          </div>
        </motion.div>
      </div>

      {/* Full-width tech marquee at the base of the hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute inset-x-0 bottom-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="flex animate-marquee gap-3 whitespace-nowrap will-change-transform">
          {[...TECH_BADGES, ...TECH_BADGES, ...TECH_BADGES].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs text-muted">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
