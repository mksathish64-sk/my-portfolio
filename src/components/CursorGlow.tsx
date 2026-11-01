import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Soft ambient glow that trails the pointer (desktop only). */
export default function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 120, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 220);
      y.set(e.clientY - 220);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[440px] w-[440px] rounded-full md:block"
      style={{
        x: sx,
        y: sy,
        background:
          "radial-gradient(circle, rgba(34,211,238,0.075) 0%, rgba(14,165,233,0.05) 35%, transparent 70%)",
      }}
    />
  );
}
