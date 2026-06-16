import { Quote, Star } from "lucide-react";
import Reveal from "./Reveal";
import { Aurora, SectionHeading, useSpotlight } from "./ui";
import { useContent } from "../lib/content";

function initials(name = "") {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Card({ t, onMove }) {
  return (
    <figure
      onMouseMove={onMove}
      className="spotlight glass gradient-border glow-hover relative flex h-full flex-col rounded-[28px] p-7 md:p-8"
    >
      <Quote className="h-7 w-7 text-accent opacity-70" />
      <div className="mt-4 flex gap-0.5">
        {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current text-accent" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-balance text-[15px] leading-relaxed text-strong">
        "{t.quote}"
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        {t.avatar ? (
          <img
            src={t.avatar}
            alt={t.name}
            loading="lazy"
            decoding="async"
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <span
            className="inline-flex h-11 w-11 items-center justify-center rounded-full font-display text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
          >
            {initials(t.name)}
          </span>
        )}
        <span>
          <span className="block text-sm font-medium text-strong">{t.name}</span>
          <span className="block text-xs text-faint">{t.title}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const { TESTIMONIALS } = useContent();
  const spotlight = useSpotlight();
  if (!TESTIMONIALS?.length) return null;

  return (
    <section id="testimonials" className="cv-auto relative isolate py-24 md:py-32" data-testid="testimonials-section">
      <Aurora className="opacity-50" />
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Testimonials"
          title="Trusted by the people"
          accent="I build with."
          intro="A few words from teammates, mentors, and clients I've shipped real work with."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.id || `${t.name}-${i}`} delay={i * 70} data-testid={`testimonial-${i}`}>
              <Card t={t} onMove={spotlight} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
