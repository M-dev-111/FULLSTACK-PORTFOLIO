/**
 * Performance-first decorative orb.
 * Blur is applied ONCE (static) — only transform/opacity animate, so it stays
 * on the GPU compositor and never triggers per-frame repaints.
 */
export default function AnimatedOrb({ className = "" }) {
  return (
    <div className={`pointer-events-none relative ${className}`} aria-hidden>
      {/* Static blurred halo, gentle float */}
      <div
        className="absolute inset-0 rounded-full animate-float-slow"
        style={{
          background:
            "radial-gradient(closest-side, var(--accent-glow), rgba(139,92,246,0.12) 55%, transparent 75%)",
          filter: "blur(36px)",
          willChange: "transform",
        }}
      />
      {/* Rotating conic core — rotate is compositor-cheap */}
      <div
        className="absolute inset-[16%] rounded-full animate-spin-slow"
        style={{
          background:
            "conic-gradient(from 120deg, #6366f1, #8b5cf6, #a855f7, #6366f1 80%)",
          opacity: 0.9,
          boxShadow: "0 0 70px 6px rgba(99,102,241,0.4)",
          willChange: "transform",
        }}
      />
      {/* Inner light (static) */}
      <div
        className="absolute inset-[30%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85), rgba(168,85,247,0.3) 38%, transparent 68%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
