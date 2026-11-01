import { GraduationCap, Cpu, BrainCircuit, Code2, Gauge, School, CalendarRange } from "lucide-react";
import { Reveal, SectionHeading, Counter, Tag } from "./ui";

const INTERESTS = [
  { icon: Code2, label: "Software Development" },
  { icon: BrainCircuit, label: "Artificial Intelligence" },
  { icon: Cpu, label: "Emerging Tech" },
  { icon: Gauge, label: "Logical Problem Solving" },
];

function CGPAGauge() {
  const pct = 0.9;
  const R = 54;
  const C = 2 * Math.PI * R;
  return (
    <div className="relative h-40 w-40">
      <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
        <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(148,197,255,0.08)" strokeWidth="9" />
        <circle
          cx="70" cy="70" r={R} fill="none"
          stroke="url(#gaugeGrad)" strokeWidth="9" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C * (1 - pct)}
          className="drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]"
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <Counter to={9.0} decimals={1} className="font-display text-4xl font-bold text-slate-100" />
          <p className="font-mono text-[10px] tracking-widest text-slate-500">/ 10 CGPA</p>
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between font-mono text-[11px]">
        <span className="tracking-widest text-slate-400">{label}</span>
        <span className="font-semibold text-cyanx">
          <Counter to={value} suffix="%" duration={1.6} />
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <Reveal delay={delay} y={0} className="h-full">
          <div
            className="h-full rounded-full bg-gradient-to-r from-volt-500 via-cyanx to-amberx shadow-[0_0_12px_rgba(34,211,238,0.5)]"
            style={{ width: `${value}%` }}
          />
        </Reveal>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-volt-500/[0.05] blur-[130px]" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="01"
          kicker="IDENTITY FILE"
          title="About"
          accent="Me."
        />

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* narrative */}
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-slate-300 md:text-xl md:leading-relaxed">
                I am a <span className="text-cyanx">Computer Science Engineering student</span> interested in
                software development and emerging technologies. I enjoy exploring programming concepts,
                developing applications, solving logical problems, and continuously improving my technical
                skills — <span className="text-slate-100">learning new technologies and applying them through practical projects.</span>
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-2">
              {INTERESTS.map((it, i) => (
                <Reveal key={it.label} delay={0.08 * i}>
                  <div className="group flex items-center gap-3.5 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 transition-all duration-300 hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:shadow-[0_0_25px_-8px_rgba(34,211,238,0.4)]">
                    <it.icon size={17} className="shrink-0 text-cyanx transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-[13px] font-medium text-slate-300">{it.label}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.35}>
              <div className="mt-10 flex flex-wrap gap-2">
                <Tag tone="warm">Current: 3rd Year</Tag>
                <Tag tone="cool">B.E. CSE · 2024–2028</Tag>
                <Tag tone="dim">PSNA College of Engineering & Technology</Tag>
              </div>
            </Reveal>
          </div>

          {/* academic dashboard */}
          <Reveal delay={0.15}>
            <div className="glass relative overflow-hidden rounded-3xl p-7 md:p-9">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyanx/[0.08] blur-3xl" />
              <div className="mb-7 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-cyanx">
                    <GraduationCap size={18} />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-slate-100">Academic Record</p>
                    <p className="font-mono text-[10px] tracking-widest text-slate-500">LIVE TRANSCRIPT</p>
                  </div>
                </div>
                <span className="anim-pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
              </div>

              <div className="flex flex-col items-center gap-8 sm:flex-row">
                <CGPAGauge />
                <div className="flex-1 space-y-5">
                  <div className="flex items-start gap-3">
                    <School size={15} className="mt-0.5 text-amberx" />
                    <div>
                      <p className="text-sm font-semibold text-slate-200">B.E. Computer Science & Engineering</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-slate-400">PSNA College of Engineering and Technology · Dindigul</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CalendarRange size={15} className="mt-0.5 text-amberx" />
                    <div>
                      <p className="text-sm font-semibold text-slate-200">2024 — 2028</p>
                      <p className="mt-0.5 text-xs text-slate-400">Currently in third year</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-5 border-t border-white/[0.06] pt-7">
                <ScoreBar label="HSC — SAI RAM MHSS" value={92} delay={0.25} />
                <ScoreBar label="SSLC — SAI RAM MHSS" value={90} delay={0.4} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
