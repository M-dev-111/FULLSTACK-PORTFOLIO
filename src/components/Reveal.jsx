import { useEffect, useRef } from "react";

/**
 * Lightweight scroll reveal driven by a SINGLE shared IntersectionObserver.
 * Far cheaper than per-element motion springs — adds `.in` once on enter.
 */
let observer = null;
const pending = new Set();

function ensureObserver() {
  if (observer || typeof window === "undefined") return;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
          pending.delete(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
  );
}

export default function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("in");
      return;
    }
    ensureObserver();
    pending.add(el);
    observer.observe(el);
    return () => {
      if (observer) observer.unobserve(el);
      pending.delete(el);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
