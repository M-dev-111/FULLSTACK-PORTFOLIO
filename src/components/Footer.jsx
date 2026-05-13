import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { NAV_LINKS, PERSONAL } from "../lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black pb-10 pt-20" data-testid="footer">
      <div className="absolute inset-x-0 top-0 -translate-y-1/2 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,0,0.4), transparent)" }} />

      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        {/* Big brand mark */}
        <div className="relative overflow-hidden">
          <h2
            className="select-none font-display text-[18vw] font-bold tracking-tighter text-gradient-white opacity-90 sm:text-[14vw] lg:text-[180px]"
            aria-hidden
          >
            Dibyendu<span className="text-flame">.</span>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-white/5 pt-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-sm text-sm text-zinc-400">
              Frontend developer evolving into full stack. Available for work and
              freelance product work.
            </p>
            <a
              href={`mailto:${PERSONAL.email || "dipnayak99@gmail.com"}`}
              className="mt-5 inline-flex items-center gap-2 font-display text-xl tracking-tight text-white hover:text-flame"
              data-testid="footer-email-link"
            >
              {PERSONAL.email}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">Navigate</p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex items-center gap-1 text-zinc-300 transition-colors hover:text-flame"
                    data-testid={`footer-nav-${l.label.toLowerCase()}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-500">Socials</p>
            <div className="mt-4 flex items-center gap-3">
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
                  data-testid={`footer-social-${label.toLowerCase()}`}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full glass text-zinc-300 transition-colors hover:border-flame/40 hover:text-flame"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-xs text-zinc-500 md:flex-row">
          <p>© {new Date().getFullYear()} {PERSONAL.name}. Crafted with care.</p>
          <p className="font-mono">React · Tailwind · Framer Motion · Node · MongoDB</p>
        </div>
      </div>
    </footer>
  );
}
