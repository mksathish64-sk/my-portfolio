import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap, BookOpen, School } from "lucide-react";
import { Reveal, SectionHeading, Tag } from "./ui";

const ITEMS = [
  {
    period: "2024 — 2028",
    title: "B.E. Computer Science & Engineering",
    place: "PSNA College of Engineering and Technology",
    stat: "CGPA 9.0 / 10",
    icon: GraduationCap,
    current: true,
    note: "Currently in third year — deepening software development, AI and full-stack foundations.",
  },
  {
    period: "2024",
    title: "Higher Secondary Certificate (HSC)",
    place: "Sai Ram Matric Higher Secondary School",
    stat: "92%",
    icon: BookOpen,
    current: false,
    note: "Completed higher secondary education with a strong academic record.",
  },
  {
    period: "2022",
    title: "SSLC",
    place: "Sai Ram Matric Higher Secondary School",
    stat: "90%",
    icon: School,
    current: false,
    note: "Secondary schooling milestone with a consistent academic foundation.",
  },
];

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.82", "end 0.55"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="education" className="relative py-28 md:py-36">
      <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-amberx/[0.04] blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="05"
          kicker="ACADEMIC TIMELINE"
          title="Education"
          accent="Path."
        />

        <div ref={ref} className="relative mx-auto max-w-3xl">
          {/* rail */}
          <span className="absolute left-5 top-2 h-[calc(100%-16px)] w-px bg-white/[0.08] md:left-1/2" />
          <motion.span
            className="absolute left-5 top-2 w-px origin-top bg-gradient-to-b from-cyanx via-volt-500 to-amberx shadow-[0_0_12px_rgba(34,211,238,0.7)] md:left-1/2"
            style={{ scaleY: fill, height: "calc(100% - 16px)" }}
          />

          <div className="space-y-14">
            {ITEMS.map((it, i) => (
              <div key={it.period} className={`relative md:grid md:grid-cols-2 md:gap-14 ${i % 2 ? "" : ""}`}>
                {/* node */}
                <span className="absolute left-5 top-8 z-10 grid h-5 w-5 -translate-x-1/2 place-items-center md:left-1/2">
                  <span className={`h-2.5 w-2.5 rounded-full ${it.current ? "bg-amberx anim-pulse-dot" : "bg-cyanx"}`} />
                  <span className="absolute h-5 w-5 rounded-full border border-white/15" />
                </span>

                <Reveal
                  className={`pl-12 md:pl-0 ${i % 2 ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}
                  delay={0.05 * i}
                >
                  <div
                    className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-ink-800/70 to-ink-900/50 p-6 text-left transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_25px_70px_-25px_rgba(34,211,238,0.35)] ${
                      it.current ? "border-amber-400/20" : ""
                    }`}
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] tracking-[0.25em] text-cyanx">{it.period}</span>
                      <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition-transform duration-300 group-hover:scale-110">
                        <it.icon size={16} />
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold leading-snug text-slate-100">{it.title}</h3>
                    <p className="mt-1 text-[13px] text-slate-400">{it.place}</p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-500">{it.note}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Tag tone={it.current ? "warm" : "cool"}>{it.stat}</Tag>
                      {it.current && <Tag tone="dim">IN PROGRESS</Tag>}
                    </div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
