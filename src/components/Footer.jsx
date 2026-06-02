import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { NAV_LINKS, PERSONAL } from "../lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-subtle bg-app-2 pb-10 pt-20" data-testid="footer">
      <div className="absolute inset-x-0 top-0 -translate-y-1/2 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--accent-glow), transparent)" }} />

      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <div className="relative overflow-hidden">
          <h2
            className="select-none font-display text-[18vw] font-bold tracking-tight text-strong opacity-90 sm:text-[14vw] lg:text-[180px]"
            aria-hidden
          >
            Dibyendu<span className="text-accent">.</span>
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 border-t border-subtle pt-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="max-w-sm text-sm text-muted">
              Full stack developer building production-grade web apps. Available for work and
              freelance product work across US and India time zones.
            </p>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="mt-5 inline-flex items-center gap-2 font-display text-xl tracking-tight text-strong hover:text-accent"
              data-testid="footer-email-link"
            >
              {PERSONAL.email}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div className="md:col-span-4">
            <p className="text-[11px] uppercase tracking-[0.25em] text-faint">Navigate</p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex items-center gap-1 text-muted transition-colors hover:text-accent"
                    data-testid={`footer-nav-${l.label.toLowerCase()}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-faint">Socials</p>
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full card-2 text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-subtle pt-6 text-xs text-faint md:flex-row">
          <p>© {new Date().getFullYear()} {PERSONAL.name}. Crafted with care.</p>
          <p className="font-mono">React · Tailwind · Framer Motion · Node · MongoDB</p>
        </div>
      </div>
    </footer>
  );
}
