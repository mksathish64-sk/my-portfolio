import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, Download, FolderGit2, ScanFace } from "lucide-react";

const ROLES = [
  "Computer Science Engineering Student",
  "Aspiring Software Developer",
  "AI & Full-Stack Enthusiast",
  "Problem Solver · PSNA College",
];

/* Typed role rotator */
function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(words[0]);
      return;
    }
    let word = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      const current = words[word];
      if (!deleting) {
        char++;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = setTimeout(step, 2100);
          return;
        }
        timer = setTimeout(step, 46);
      } else {
        char--;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          word = (word + 1) % words.length;
          timer = setTimeout(step, 380);
          return;
        }
        timer = setTimeout(step, 22);
      }
    };
    timer = setTimeout(step, 900);
    return () => clearTimeout(timer);
  }, [words]);
  return text;
}

const nameContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};
const letter = {
  hidden: { y: "110%", rotate: 6, opacity: 0 },
  show: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

function NameLine({ text, gradient = false, delayOffset = 0 }: { text: string; gradient?: boolean; delayOffset?: number }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className={`inline-flex flex-wrap ${gradient ? "text-gradient" : ""}`}
        variants={nameContainer}
        initial="hidden"
        animate="show"
        transition={{ delay: delayOffset }}
      >
        {text.split("").map((ch, i) => (
          <motion.span
            key={i}
            variants={letter}
            className={`inline-block ${ch === " " ? "w-[0.32em]" : ""} ${gradient ? "" : "text-slate-100"}`}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const typed = useTypewriter(ROLES);

  // subtle pointer parallax on the portrait module
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 18 });
  const py = useSpring(useTransform(my, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 18 });

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col overflow-hidden pt-28"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      {/* ambience */}
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_80%_65%_at_50%_35%,black,transparent)]" />
      <div className="absolute -left-40 top-24 h-[480px] w-[480px] rounded-full bg-volt-500/[0.09] blur-[130px]" />
      <div className="absolute -right-32 bottom-10 h-[420px] w-[420px] rounded-full bg-cyanx/[0.08] blur-[130px]" />
      <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-amberx/[0.045] blur-[110px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
        {/* ------- left : identity ------- */}
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.4em] text-cyanx/90"
          >
            <span className="anim-pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            SYSTEM ONLINE — WELCOME
          </motion.p>

          <h1 className="font-display text-[13.5vw] font-bold leading-[0.98] tracking-tight sm:text-6xl md:text-7xl xl:text-[5.4rem]">
            <NameLine text="SATHISH" />
            <NameLine text="KUMAR M" gradient delayOffset={0.5} />
          </h1>

          <div className="mt-7 flex h-7 items-center gap-3 font-mono text-sm text-volt-300 md:text-base">
            <span className="text-slate-500">$ role:</span>
            <span className="text-cyanx">{typed}</span>
            <span className="anim-blink -ml-2 text-amberx">▌</span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-400"
          >
            Third-year CSE student at <span className="text-slate-200">PSNA College of Engineering and Technology</span>,
            exploring software development, artificial intelligence and full-stack engineering — turning
            programming concepts into practical, working projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-volt-500 to-cyanx px-7 py-3.5 text-sm font-semibold text-ink-950 shadow-[0_10px_40px_-8px_rgba(34,211,238,0.55)] transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent bg-[length:200%_100%] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-[kf-shimmer_1.4s_linear_infinite]" />
              <FolderGit2 size={16} className="relative" />
              <span className="relative">Explore My Work</span>
            </a>
            <a
              href="/Sathish_Kumar_M_Resume.pdf"
              download="Sathish_Kumar_M_Resume.pdf"
              className="group inline-flex items-center gap-2.5 rounded-xl border border-amber-400/35 bg-amber-400/[0.06] px-7 py-3.5 text-sm font-semibold text-amber-200 backdrop-blur transition-all duration-300 hover:border-amber-400/60 hover:bg-amber-400/[0.14] hover:shadow-[0_0_30px_-6px_rgba(251,191,36,0.5)]"
            >
              <Download size={16} className="transition-transform group-hover:translate-y-0.5" />
              Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] tracking-wider text-slate-500"
          >
            {[
              ["CGPA", "9.0 / 10"],
              ["CLASS OF", "2028"],
              ["PROJECTS", "05"],
              ["MODE", "LEARNING"],
            ].map(([k, v]) => (
              <span key={k} className="flex items-center gap-2">
                <span className="text-slate-600">{k}</span>
                <span className={v === "LEARNING" ? "text-amberx" : "text-cyanx"}>{v}</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* ------- right : identity module ------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 mx-auto w-full max-w-[330px] lg:order-2 lg:max-w-[400px]"
          style={{ x: px, y: py }}
        >
          {/* rotating rings */}
          <div className="anim-spin-slow absolute -inset-7 rounded-[2.4rem] border border-dashed border-cyan-400/20" />
          <div className="anim-spin-rev absolute -inset-14 hidden rounded-full border border-volt-500/10 lg:block" />

          {/* floating chips */}
          <div className="anim-float absolute -left-7 top-8 z-20 rounded-xl border border-cyan-400/25 bg-ink-900/90 px-3.5 py-2 backdrop-blur-md shadow-[0_8px_30px_-8px_rgba(34,211,238,0.4)]">
            <p className="font-mono text-[9px] tracking-widest text-slate-500">CGPA</p>
            <p className="font-display text-lg font-bold text-gradient">9.0<span className="text-slate-500 text-xs">/10</span></p>
          </div>
          <div className="anim-float-soft absolute -right-5 bottom-16 z-20 rounded-xl border border-amber-400/25 bg-ink-900/90 px-3.5 py-2 backdrop-blur-md shadow-[0_8px_30px_-8px_rgba(251,191,36,0.35)]" style={{ animationDelay: "1.4s" }}>
            <p className="font-mono text-[9px] tracking-widest text-slate-500">STATUS</p>
            <p className="font-display text-sm font-bold text-amber-200">B.E. CSE ’28</p>
          </div>
          <div className="anim-float absolute -right-6 top-5 z-20 hidden rounded-full border border-volt-400/25 bg-ink-900/90 px-3 py-1.5 backdrop-blur-md sm:block" style={{ animationDelay: "2.2s" }}>
            <p className="font-mono text-[10px] text-volt-300">PSNA&nbsp;·&nbsp;CSE</p>
          </div>

          {/* portrait frame */}
          <div className="glass-bright relative overflow-hidden rounded-[1.8rem] p-2 shadow-[0_30px_90px_-25px_rgba(14,165,233,0.45)]">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="/images/portrait-placeholder.jpg"
                alt="Portrait of Sathish Kumar M"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-ink-950/25" />
              {/* scanline */}
              <div className="pointer-events-none absolute inset-x-0 h-[16%] animate-[kf-scan_4.5s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-cyanx/[0.13] to-transparent" />
              {/* HUD corners */}
              {["top-3 left-3 border-t-2 border-l-2", "top-3 right-3 border-t-2 border-r-2", "bottom-3 left-3 border-b-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((c) => (
                <span key={c} className={`absolute h-6 w-6 border-cyanx/70 ${c}`} />
              ))}
              {/* bottom identity bar */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 pb-4">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.3em] text-cyanx/80">ID.MODULE</p>
                  <p className="font-display text-lg font-semibold text-slate-100">Sathish Kumar M</p>
                </div>
                <ScanFace size={20} className="text-cyanx/70" />
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-3 font-mono text-[10px] tracking-widest text-slate-500">
              <span className="flex items-center gap-2">
                <span className="anim-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
                OPEN TO OPPORTUNITIES
              </span>
              <span className="text-cyanx/70">v2.028</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ------- tech ticker ------- */}
      <div className="relative z-10 mt-14 border-y border-white/[0.06] bg-ink-900/40 py-3.5 backdrop-blur-sm">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="flex shrink-0 animate-[kf-marquee_30s_linear_infinite] items-center gap-10 pr-10 font-mono text-[11px] tracking-[0.25em] text-slate-500">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-10">
                {["JAVA", "PYTHON", "C", "HTML", "CSS", "TENSORFLOW", "GIT", "GITHUB", "LINUX", "JAVA FX", "REST API", "OOP", "DATA STRUCTURES", "VS CODE"].map((s) => (
                  <span key={s} className="flex items-center gap-10 whitespace-nowrap">
                    <span className="transition-colors hover:text-cyanx">{s}</span>
                    <span className="h-1 w-1 rotate-45 bg-amberx/60" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-20 left-1/2 z-10 hidden -translate-x-1/2 text-slate-500 transition-colors hover:text-cyanx lg:block"
      >
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="block">
          <ArrowDown size={18} />
        </motion.span>
      </motion.a>
    </section>
  );
}
