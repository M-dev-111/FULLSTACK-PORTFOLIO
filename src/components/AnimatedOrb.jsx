import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated cinematic orb — built entirely with CSS radial gradients + framer-motion.
 * No external assets required.
 */
export default function AnimatedOrb({ className = "" }) {
  const reduce = useReducedMotion();
  return (
    <div className={`pointer-events-none relative ${className}`} aria-hidden>
      {/* Outer halo */}
      <motion.div
        animate={reduce ? {} : { scale: [1, 1.06, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,107,0,0.55), rgba(255,107,0,0.10) 55%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />
      {/* Core orb */}
      <motion.div
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[14%] rounded-full"
        style={{
          background:
            "conic-gradient(from 120deg, #ff6b00, #ff8533, #ffb380, #ff6b00 80%)",
          filter: "blur(2px)",
          boxShadow:
            "0 0 80px 10px rgba(255,107,0,0.45), inset 0 0 80px rgba(255,255,255,0.25)",
        }}
      />
      {/* Inner highlight */}
      <div
        className="absolute inset-[26%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.85), rgba(255,180,128,0.4) 30%, rgba(255,107,0,0.0) 65%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Specular */}
      <motion.div
        animate={reduce ? {} : { x: ["-10%", "10%", "-10%"], y: ["10%", "-10%", "10%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[34%] rounded-full bg-white/40 blur-2xl"
      />
      {/* Orbiting dot */}
      <motion.div
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-flame-light shadow-[0_0_24px_6px_rgba(255,133,51,0.7)]" />
      </motion.div>
    </div>
  );
}