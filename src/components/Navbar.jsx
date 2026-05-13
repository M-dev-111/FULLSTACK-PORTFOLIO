import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!("IntersectionObserver" in window) || !els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleNavClick = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
        data-testid="navbar"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="group flex items-center gap-2"
            data-testid="logo-link"
          >
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-flame to-flame-light shadow-[0_0_20px_rgba(255,107,0,0.45)]">
              <span className="font-display text-base font-bold text-ink-950">DN</span>
            </span>
            <span className="font-display text-base font-medium tracking-tight">
              Dibyendu<span className="text-flame">.</span>
            </span>
          </a>

          {/* Desktop nav pill */}
          <nav className="hidden lg:block">
            <ul
              className={`relative flex items-center gap-1 rounded-full glass-strong px-2 py-2 transition-all`}
            >
              {NAV_LINKS.map((l) => {
                const isActive = active === l.href.slice(1);
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(l.href);
                      }}
                      className={`relative inline-flex rounded-full px-4 py-2 text-sm transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-zinc-400 hover:text-white"
                      }`}
                      data-testid={`nav-link-${l.label.toLowerCase()}`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-flame to-flame-light shadow-[0_0_24px_rgba(255,107,0,0.45)]"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      {l.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden lg:flex">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="group inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm transition-all hover:border-flame/40 hover:bg-white/[0.05]"
              data-testid="nav-cta-contact"
            >
              <span className="inline-flex h-2 w-2 animate-pulse-glow rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
              Available for internships
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full glass lg:hidden"
            data-testid="mobile-menu-trigger"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="absolute inset-0 bg-ink-950/90 backdrop-blur-xl" />
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex h-full flex-col px-6 pt-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-base">Dibyendu<span className="text-flame">.</span></span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full glass"
                  data-testid="mobile-menu-close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-12 flex flex-col gap-2">
                {NAV_LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(l.href);
                    }}
                    className="group flex items-baseline justify-between rounded-2xl px-2 py-4 font-display text-3xl text-white/90 hover:text-white"
                    data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                  >
                    <span>{l.label}</span>
                    <span className="font-mono text-xs text-flame opacity-0 transition-opacity group-hover:opacity-100">
                      0{NAV_LINKS.indexOf(l) + 1}
                    </span>
                  </motion.a>
                ))}
              </nav>
              <div className="mt-auto pb-10">
                <div className="rounded-2xl glass p-4">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <span className="inline-flex h-2 w-2 animate-pulse-glow rounded-full bg-emerald-400" />
                    Available for internships
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}