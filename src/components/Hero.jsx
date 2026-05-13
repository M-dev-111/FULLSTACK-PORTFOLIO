import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import AnimatedOrb from "./AnimatedOrb";
import MagneticButton from "./MagneticButton";
import { PERSONAL } from "../lib/data";
import {FaGithub, FaTwitter,FaLinkedin} from "react-icons/fa";

const TECH_BADGES = ["React", "Node.js", "Tailwind", "MongoDB", "Express", "Figma", "TypeScript"];

export default function Hero() {
  const glowRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (!glowRef.current) return;
      const rect = glowRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.setProperty("--mx", `${x}px`);
      glowRef.current.style.setProperty("--my", `${y}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="home"
      ref={glowRef}
      className="relative isolate overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40 lg:pt-44"
      style={{
        backgroundImage:
          "radial-gradient(600px circle at var(--mx,50%) var(--my,30%), rgba(255,107,0,0.10), transparent 50%)",
      }}
      data-testid="hero-section"
    >
      {/* Grid + noise backdrop */}
      <div className="absolute inset-0 -z-10 grid-bg opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(255,107,0,0.18),transparent_60%)]" />

      {/* Floating orb behind text — large, centered, soft */}
      <div className="pointer-events-none absolute left-1/2 top-[58%] -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 md:h-[680px] md:w-[680px] lg:top-[55%] lg:h-[820px] lg:w-[820px]">
        <AnimatedOrb className="h-full w-full" />
      </div>

      <div className="relative mx-auto flex max-w-[1280px] flex-col items-center px-6 text-center md:px-10">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.25em] text-zinc-300"
          data-testid="hero-eyebrow"
        >
          <span className="inline-flex h-1.5 w-1.5 animate-pulse-glow rounded-full bg-flame shadow-[0_0_10px_rgba(255,107,0,0.7)]" />
          Full Stack Intern · Open to Work
        </motion.div>

        {/* Headline */}
        <h1
          className="font-display text-balance text-[42px] font-bold leading-[0.95] tracking-tighter sm:text-6xl md:text-7xl lg:text-[96px]"
          data-testid="hero-headline"
        >
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="block text-gradient-white"
          >
            Building Modern Web
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="block"
          >
            Experiences That{" "}
            <span className="relative inline-block text-gradient-flame">
              Feel Alive
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-flame via-flame-light to-transparent"
              />
            </span>
          </motion.span>
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-7 max-w-2xl text-balance text-base text-zinc-400 sm:text-lg"
          data-testid="hero-subheadline"
        >
          Hi, I'm <span className="text-white">{PERSONAL.name}</span> — a frontend developer crafting
          premium responsive web apps while evolving into full stack engineering with the MERN stack.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <MagneticButton
            data-testid="hero-cta-projects"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-flame to-flame-light px-7 py-4 text-sm font-medium text-white shadow-[0_8px_40px_rgba(255,107,0,0.35)] transition-shadow hover:shadow-[0_8px_60px_rgba(255,107,0,0.55)]"
          >
            View Projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>

          <MagneticButton
            data-testid="hero-cta-resume"
            onClick={() => window.open(PERSONAL.resumeUrl, "_blank")}
            className="group inline-flex items-center gap-2 rounded-full glass px-7 py-4 text-sm text-white transition-colors hover:border-flame/40"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </MagneticButton>

          <MagneticButton
            data-testid="hero-cta-contact"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-7 py-4 text-sm text-zinc-300 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            Contact Me
          </MagneticButton>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8 flex items-center gap-3"
        >
          {[
            { Icon: FaGithub, href: PERSONAL.socials.github, label: "GitHub" },
            { Icon: FaLinkedin, href: PERSONAL.socials.linkedin, label: "LinkedIn" },
            { Icon: FaTwitter, href: PERSONAL.socials.twitter, label: "Twitter" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              data-testid={`hero-social-${label.toLowerCase()}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full glass text-zinc-400 transition-all hover:border-flame/40 hover:text-flame"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </motion.div>

        {/* Floating tech badges marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="relative mt-16 w-full max-w-3xl overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]"
        >
          <div className="flex animate-marquee gap-3 whitespace-nowrap will-change-transform">
            {[...TECH_BADGES, ...TECH_BADGES].map((t, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300 backdrop-blur"
              >
                <span className="h-1 w-1 rounded-full bg-flame" />
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
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-14 inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-zinc-500 transition-colors hover:text-flame"
          data-testid="hero-scroll-indicator"
        >
          Scroll
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex h-8 w-5 items-start justify-center rounded-full border border-white/15 pt-1.5"
          >
            <ArrowDown className="h-3 w-3" />
          </motion.span>
        </motion.button>
      </div>
    </section>
  );
}