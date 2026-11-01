import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BOOT_LINES = [
  "> initializing sathish.exe ...",
  "> loading skill modules [6/6]",
  "> mounting production line ... OK",
  "> rendering interface ...",
];

export default function Loader({ onDone }: { onDone: () => void }) {
  const [line, setLine] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const t = setTimeout(onDone, 350);
      return () => clearTimeout(t);
    }
    const lineTimer = setInterval(() => setLine((l) => Math.min(l + 1, BOOT_LINES.length)), 420);
    const progTimer = setInterval(
      () => setProgress((p) => Math.min(100, p + 4 + Math.random() * 6)),
      55
    );
    const done = setTimeout(onDone, 2250);
    return () => {
      clearInterval(lineTimer);
      clearInterval(progTimer);
      clearTimeout(done);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative w-[min(460px,86vw)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-bright rounded-2xl p-6 shadow-[0_0_80px_-20px_rgba(34,211,238,0.35)]"
        >
          <div className="mb-5 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amberx/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-3 font-mono text-[10px] tracking-[0.3em] text-slate-500">
              BOOT_SEQUENCE
            </span>
          </div>
          <div className="min-h-24 font-mono text-xs leading-6 text-cyanx/90">
            {BOOT_LINES.slice(0, line + 1).map((l) => (
              <motion.p
                key={l}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {l}
              </motion.p>
            ))}
            <span className="anim-blink text-amberx">▌</span>
          </div>
          <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-volt-500 via-cyanx to-amberx transition-[width] duration-150 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between font-mono text-[10px] text-slate-500">
            <span>SATHISH KUMAR M</span>
            <span className="text-cyanx">{Math.min(Math.round(progress), 100)}%</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
