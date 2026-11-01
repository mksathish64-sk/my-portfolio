import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../utils/cn";

/* Scroll-triggered reveal wrapper */
export function Reveal({
  children,
  delay = 0,
  y = 34,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Section header: mono kicker + display title + gradient rule */
export function SectionHeading({
  index,
  kicker,
  title,
  accent,
  align = "left",
  blurb,
}: {
  index: string;
  kicker: string;
  title: string;
  accent?: string;
  align?: "left" | "center";
  blurb?: string;
}) {
  return (
    <div className={cn("mb-14 md:mb-20", align === "center" && "text-center")}>
      <Reveal>
        <p className="font-mono text-[11px] md:text-xs tracking-[0.35em] text-volt-400/80 uppercase mb-4">
          <span className="text-slate-500">{"//"}</span> {index} — {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-100 leading-[1.05]">
          {title} {accent && <span className="text-gradient">{accent}</span>}
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <div
          className={cn(
            "mt-6 h-px w-28 bg-gradient-to-r from-cyanx via-volt-500 to-transparent",
            align === "center" && "mx-auto bg-gradient-to-r from-transparent via-cyanx to-transparent w-40"
          )}
        />
      </Reveal>
      {blurb && (
        <Reveal delay={0.22}>
          <p className={cn("mt-6 max-w-xl text-slate-400 text-sm md:text-base leading-relaxed", align === "center" && "mx-auto")}>
            {blurb}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* Animated number counter that fires when scrolled into view */
export function Counter({
  to,
  decimals = 0,
  duration = 1.6,
  className,
  prefix = "",
  suffix = "",
}: {
  to: number;
  decimals?: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = prefix + v.toFixed(decimals) + suffix;
    });
    return unsub;
  }, [spring, decimals, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix + to.toFixed(decimals) + suffix}
    </span>
  );
}

/* Small glowing tag chip */
export function Tag({ children, tone = "cool", className }: { children: ReactNode; tone?: "cool" | "warm" | "dim"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider",
        tone === "cool" && "border-cyan-400/25 bg-cyan-400/[0.07] text-cyan-200/90",
        tone === "warm" && "border-amber-400/25 bg-amber-400/[0.07] text-amber-200/90",
        tone === "dim" && "border-white/10 bg-white/[0.04] text-slate-400",
        className
      )}
    >
      {children}
    </span>
  );
}
