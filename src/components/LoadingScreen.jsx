import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 22 + 10;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => setDone(true), 280);
      }
      setProgress(Math.floor(p));
    }, 90);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-app"
          data-testid="loading-screen"
        >
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent-soft),transparent_60%)]" />
          <div className="relative z-10 w-[min(420px,80vw)]">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-xl tracking-tight text-strong">Dibyendu</span>
              <span className="font-mono text-sm text-accent">{progress}%</span>
            </div>
            <div className="mt-4 h-[2px] w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.2 }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
              />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-faint">
              Crafting the experience
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
