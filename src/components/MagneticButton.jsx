import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Magnetic button — child element subtly follows cursor on hover.
 */
export default function MagneticButton({ children, strength = 22, className = "", ...rest }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.2 });
  const rotateX = useTransform(sy, [-strength, strength], [6, -6]);
  const rotateY = useTransform(sx, [-strength, strength], [-6, 6]);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set((dx / rect.width) * strength);
    y.set((dy / rect.height) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  );
}