import { motion, useReducedMotion } from "framer-motion";

/**
 * Wraps children with a reusable scroll-into-view reveal animation.
 */
export default function ScrollReveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  as: Tag = "div",
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag] || motion.div;
  if (reduce) return <Tag className={className}>{children}</Tag>;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}