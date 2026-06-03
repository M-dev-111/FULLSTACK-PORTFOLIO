import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import AnimatedOrb from "./AnimatedOrb";
import MagneticButton from "./MagneticButton";
import { useContent } from "../lib/content";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const TECH_BADGES = ["React", "Node.js", "TypeScript", "Tailwind", "MongoDB", "Express", "Next.js", "Figma"];

export default function Hero() {
  const { PERSONAL } = useContent();
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40 lg:pt-44"
      data-testid="hero-section"
    >
      {/* Static backdrop — no per-frame repaints */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_72%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(ellipse_at_top,var(--accent-soft),transparent_60%)]" />

      {/* Floating orb — behind content */}
      <div className="pointer-events-none absolute right-[4%] top-1/2 -z-10 h-[360px] w-[360px] -translate-y-1/2 opacity-70 md:h-[460px] md:w-[460px] lg:right-[7%] lg:h-[540px] lg:w-[540px]">
        <AnimatedOrb className="h-full w-full" />
      </div>

      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center px-6 text-center md:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full card-2 px-4 py-2 text-xs uppercase tracking-[0.22em] text-muted"
          data-testid="hero-eyebrow"
        >
          <span className="inline-flex h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent shadow-[0_0_10px_var(--accent-glow)]" />
          Full Stack Software Developer
        </motion.div>

        {/* Headline */}
        <h1
          className="font-display text-balance text-[40px] font-bold leading-[0.98] tracking-tight text-strong sm:text-6xl md:text-7xl lg:text-[92px]"
          data-testid="hero-headline"
        >
          <motion.span
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="block"
          >
            Building Software That
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="block"
          >
            <span className="relative inline-block text-gradient-accent">
              Scales &amp; Delights
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full"
                style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, transparent)" }}
              />
            </span>
          </motion.span>
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-7 max-w-2xl text-balance text-base text-muted sm:text-lg"
          data-testid="hero-subheadline"
        >
          Hi, I'm <span className="text-strong font-medium">{PERSONAL.name}</span> — a full stack developer
          shipping fast, accessible, production-grade web apps with React and the MERN stack for teams.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <MagneticButton
            data-testid="hero-cta-projects"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-medium text-white transition-shadow hover:shadow-[0_14px_50px_-10px_rgba(99,102,241,0.85)]"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: "0 10px 36px -12px rgba(99,102,241,0.7)" }}
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
            className="group inline-flex items-center gap-2 rounded-full card-2 px-7 py-4 text-sm text-strong transition-colors hover:border-accent"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </MagneticButton>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-8 flex items-center gap-3"
        >
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full card-2 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>

        {/* Tech badges marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="relative mt-16 w-full max-w-3xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]"
        >
          <div className="flex animate-marquee gap-3 whitespace-nowrap will-change-transform">
            {[...TECH_BADGES, ...TECH_BADGES].map((t, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full card px-4 py-2 text-xs text-muted"
              >
                <span className="h-1 w-1 rounded-full bg-accent" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-14 inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.28em] text-faint transition-colors hover:text-accent"
          data-testid="hero-scroll-indicator"
        >
          Scroll
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex h-8 w-5 items-start justify-center rounded-full border border-subtle pt-1.5"
          >
            <ArrowDown className="h-3 w-3" />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}
