import { useEffect, useRef, useState } from "react";

/**
 * Custom orange dot + ring cursor.
 * Disabled automatically on touch / coarse pointers via CSS.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      const t = e.target;
      if (t.closest("a, button, [data-cursor='hover'], input, textarea, label")) {
        setIsHover(true);
      }
    };
    const onOut = (e) => {
      const t = e.target;
      if (t.closest("a, button, [data-cursor='hover'], input, textarea, label")) {
        setIsHover(false);
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div
        ref={ringRef}
        className={`cursor-ring ${isHover ? "is-hover" : ""}`}
        data-testid="custom-cursor"
      />
    </>
  );
}