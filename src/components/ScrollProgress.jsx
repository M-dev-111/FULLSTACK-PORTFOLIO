import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });
  return (
    <motion.div
      style={{ scaleX, background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
      data-testid="scroll-progress"
    />
  );
}
