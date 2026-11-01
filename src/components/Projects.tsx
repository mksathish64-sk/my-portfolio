import type { ReactElement } from "react";
import { ArrowRight, BrainCircuit, Database, AppWindow, Braces, Smartphone, Sparkles, type LucideIcon } from "lucide-react";
import { Reveal, SectionHeading, Tag } from "./ui";
import "./projects.css";

const MONO = "JetBrains Mono, monospace";

/* ---------- miniature animated preview visuals ---------- */

function SmsVisual() {
  return (
    <svg viewBox="0 0 360 170" className="pj-visual h-full w-full">
      <rect x="20" y="18" width="320" height="134" rx="10" fill="#081226" stroke="rgba(125,211,252,0.25)" />
      <rect x="20" y="18" width="320" height="20" rx="10" fill="#0a1932" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={33 + i * 9} cy="28" r="2.4" fill={["#f87171", "#fbbf24", "#34d399"][i]} opacity="0.8" />
      ))}
      <text x="180" y="32" textAnchor="middle" fontFamily={MONO} fontSize="7" fill="#5b7a9d">StudentManager.java</text>
      <rect x="34" y="50" width="292" height="14" rx="3" fill="rgba(56,189,248,0.12)" />
      {["ID", "NAME", "DEPT", "CGPA"].map((h, i) => (
        <text key={h} x={48 + i * 76} y="60" fontFamily={MONO} fontSize="6.5" fill="#7dd3fc">{h}</text>
      ))}
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <rect x="34" y={70 + r * 20} width="292" height="14" rx="3" fill={r % 2 ? "rgba(125,211,252,0.04)" : "transparent"} stroke="rgba(125,211,252,0.07)" />
          {[0, 1, 2, 3].map((c) => (
            <rect key={c} x={44 + c * 76} y={74.5 + r * 20} width={46 - c * 6} height="5" rx="2.5" fill="#26507e" opacity="0.8" />
          ))}
        </g>
      ))}
      <rect x="34" y="70" width="292" height="14" rx="3" fill="none" stroke="#fbbf24" strokeWidth="1" className="pj-sweep" opacity="0.7" />
    </svg>
  );
}

function JavaFxVisual() {
  return (
    <svg viewBox="0 0 360 170" className="pj-visual h-full w-full">
      <rect x="45" y="16" width="270" height="138" rx="10" fill="#081226" stroke="rgba(125,211,252,0.25)" />
      <rect x="45" y="16" width="270" height="22" rx="10" fill="#0a1932" />
      <text x="180" y="30.5" textAnchor="middle" fontFamily={MONO} fontSize="7" fill="#5b7a9d">JavaFX Application</text>
      <circle cx="58" cy="27" r="2.4" fill="#f87171" opacity="0.8" />
      <rect x="60" y="52" width="72" height="22" rx="6" fill="#0e7490" stroke="#22d3ee" />
      <text x="96" y="66" textAnchor="middle" fontFamily={MONO} fontSize="7" fill="#e0f2fe">BUTTON</text>
      <rect x="142" y="52" width="72" height="22" rx="6" fill="transparent" stroke="rgba(125,211,252,0.4)" />
      <text x="178" y="66" textAnchor="middle" fontFamily={MONO} fontSize="7" fill="#7dd3fc">EVENT</text>
      {/* slider */}
      <line x1="60" y1="96" x2="300" y2="96" stroke="rgba(125,211,252,0.25)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="96" r="7" fill="#fbbf24" className="pj-slider" />
      {/* checkbox */}
      <rect x="60" y="114" width="14" height="14" rx="4" fill="none" stroke="rgba(125,211,252,0.5)" />
      <path d="M63 121 l3 3 l6 -7" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" className="pj-toggle" />
      <rect x="82" y="118" width="70" height="6" rx="3" fill="#26507e" />
      <rect x="220" y="112" width="80" height="30" rx="6" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.35)" />
      <text x="260" y="131" textAnchor="middle" fontFamily={MONO} fontSize="7" fill="#fde68a">UI CONTROLS</text>
    </svg>
  );
}

function ApiVisual() {
  const methods = ["GET", "POST", "PUT", "DELETE"];
  const colors = ["#34d399", "#fbbf24", "#38bdf8", "#f87171"];
  return (
    <svg viewBox="0 0 360 170" className="pj-visual h-full w-full">
      <text x="30" y="30" fontFamily={MONO} fontSize="7.5" fill="#5b7a9d">/api/tasks — REST</text>
      {methods.map((m, i) => (
        <g key={m} className="pj-method" style={{ animationDelay: `${i * 1.2}s` }}>
          <rect x="26" y={46 + i * 28} width={m.length > 3 ? 64 : 50} height="19" rx="5" fill="none" stroke={colors[i]} strokeWidth="1.2" />
          <text x={26 + (m.length > 3 ? 32 : 25)} y={59 + i * 28} textAnchor="middle" fontFamily={MONO} fontSize="7" fill={colors[i]}>{m}</text>
          <path d={`M${m.length > 3 ? 90 : 76} ${56 + i * 28} H 168`} stroke={colors[i]} strokeWidth="1" className="pj-flow" opacity="0.55" />
        </g>
      ))}
      {/* JSON block */}
      <rect x="172" y="44" width="162" height="108" rx="8" fill="#081226" stroke="rgba(125,211,252,0.3)" />
      <text x="184" y="62" fontFamily={MONO} fontSize="7.5" fill="#fbbf24">{"{"}</text>
      <text x="194" y="78" fontFamily={MONO} fontSize="7" fill="#7dd3fc">"task": "lab work",</text>
      <text x="194" y="94" fontFamily={MONO} fontSize="7" fill="#7dd3fc">"done": false,</text>
      <text x="194" y="110" fontFamily={MONO} fontSize="7" fill="#7dd3fc">"tested": "postman"</text>
      <text x="184" y="126" fontFamily={MONO} fontSize="7.5" fill="#fbbf24">{"}"}</text>
      <circle cx="318" cy="56" r="3.5" fill="#34d399" className="pj-node" />
      <text x="306" y="72" fontFamily={MONO} fontSize="6" fill="#34d399">200 OK</text>
    </svg>
  );
}

function AndroidVisual() {
  return (
    <svg viewBox="0 0 360 170" className="pj-visual h-full w-full">
      <rect x="128" y="10" width="104" height="152" rx="16" fill="#081226" stroke="rgba(125,211,252,0.35)" strokeWidth="1.5" />
      <rect x="156" y="18" width="48" height="5" rx="2.5" fill="rgba(125,211,252,0.3)" />
      <text x="180" y="66" textAnchor="middle" fontFamily={MONO} fontSize="16" fill="#e0f2fe" fontWeight="600">07:00</text>
      <text x="180" y="80" textAnchor="middle" fontFamily={MONO} fontSize="6.5" fill="#5b7a9d">STUDY REMINDER</text>
      {/* bell */}
      <g transform="translate(180 104)" className="pj-bell">
        <path d="M-9 8 a9 9 0 0 1 18 0 l-2 -4 a7 7 0 0 0 -14 0 Z" fill="#fbbf24" />
        <path d="M-11 8 h22" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
        <circle cx="0" cy="12" r="2.4" fill="#fde68a" />
        <line x1="0" y1="-10" x2="0" y2="-4" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
      </g>
      <rect x="146" y="134" width="68" height="14" rx="7" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.5)" />
      <circle cx="206" cy="141" r="4.5" fill="#34d399" className="pj-node" />
      <text x="162" y="144.5" fontFamily={MONO} fontSize="6" fill="#a7f3d0">ALARM ON</text>
      {/* side decor */}
      {[64, 82, 100].map((y, i) => (
        <rect key={i} x="62" y={y} width={34 - i * 8} height="5" rx="2.5" fill="#26507e" className="pj-node" style={{ animationDelay: `${i * 0.5}s` }} />
      ))}
      <text x="62" y="128" fontFamily={MONO} fontSize="6.5" fill="#5b7a9d">JAVA · ANDROID</text>
    </svg>
  );
}

/* ---------- data ---------- */

type Project = {
  idx: string;
  title: string;
  category: string;
  desc: string;
  stack: string[];
  icon: LucideIcon;
  Visual: () => ReactElement;
};

const GRID: Project[] = [
  {
    idx: "P-02",
    title: "Student Management System",
    category: "Java Application Development",
    desc: "A Java application to manage student details — built around object-oriented programming concepts like encapsulation, classes and clean data handling.",
    stack: ["Java", "OOP"],
    icon: Database,
    Visual: SmsVisual,
  },
  {
    idx: "P-03",
    title: "JavaFX Desktop Application",
    category: "Desktop Application Development",
    desc: "A GUI-based desktop application built to understand UI components, layouts and event-driven programming in Java.",
    stack: ["Java", "JavaFX", "Events"],
    icon: AppWindow,
    Visual: JavaFxVisual,
  },
  {
    idx: "P-04",
    title: "To-Do List API",
    category: "Backend Development",
    desc: "A RESTful API in Python performing CRUD operations on tasks — endpoints validated and tested using Postman.",
    stack: ["Python", "REST API", "Postman"],
    icon: Braces,
    Visual: ApiVisual,
  },
  {
    idx: "P-05",
    title: "Student Alarm & Reminder App",
    category: "Android Development",
    desc: "An Android alarm and reminder application for students built with Java — schedules, alerts and task reminders.",
    stack: ["Java", "Android"],
    icon: Smartphone,
    Visual: AndroidVisual,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-cyanx/[0.05] blur-[130px]" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="03"
          kicker="DEPLOYED BUILDS"
          title="Featured"
          accent="Projects."
          blurb="Practical builds from my learning journey — every project here started as a concept I wanted to understand, and shipped as working code."
        />

        {/* ------- featured : Fruit CNN ------- */}
        <Reveal>
          <article className="pj-card group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-ink-800/80 to-ink-900/60 transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_40px_120px_-40px_rgba(34,211,238,0.45)]">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              {/* preview */}
              <div className="relative overflow-hidden border-b border-white/[0.06] lg:border-b-0 lg:border-r">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                <img
                  src="/images/fruit-cnn.jpg"
                  alt="Fruit CNN Classifier interface preview"
                  className="pj-visual h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border border-cyan-400/30 bg-ink-950/80 px-3 py-1.5 font-mono text-[10px] tracking-widest text-cyanx backdrop-blur">
                  <BrainCircuit size={12} />
                  CNN · IMAGE CLASSIFIER
                </div>
                {/* HUD corners */}
                {["top-3 left-3 border-t-2 border-l-2", "bottom-3 right-3 border-b-2 border-r-2"].map((c) => (
                  <span key={c} className={`absolute z-20 h-5 w-5 border-cyanx/60 ${c}`} />
                ))}
              </div>

              {/* content */}
              <div className="relative p-8 md:p-10">
                <span className="pointer-events-none absolute -right-2 top-0 font-display text-[7rem] font-bold leading-none text-white/[0.04]">
                  01
                </span>
                <Tag tone="warm" className="mb-4">FEATURED · AI / DEEP LEARNING</Tag>
                <h3 className="font-display text-2xl font-bold text-slate-100 md:text-3xl">Fruit CNN Classifier</h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-[15px]">
                  A convolutional neural network application that classifies uploaded fruit images into
                  <span className="text-slate-200"> Apple, Mango and Orange</span> — pairing a TensorFlow model
                  with a simple, interactive web front-end.
                </p>

                {/* pipeline */}
                <div className="mt-7 flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-wider">
                  {["UPLOAD IMAGE", "CNN INFERENCE", "PREDICTION"].map((step, i) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-slate-300">{step}</span>
                      {i < 2 && <ArrowRight size={12} className="text-amberx" />}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-2">
                  {["Python", "TensorFlow", "CNN", "HTML", "CSS", "JavaScript"].map((t) => (
                    <Tag key={t} tone="cool">{t}</Tag>
                  ))}
                </div>

                <p className="mt-7 flex items-center gap-2 border-t border-white/[0.06] pt-5 font-mono text-[10px] tracking-widest text-slate-500">
                  <Sparkles size={11} className="text-amberx" />
                  LINKS SHARED ON REQUEST · SOURCE ON GITHUB (PROFILE LINK COMING SOON)
                </p>
              </div>
            </div>
          </article>
        </Reveal>

        {/* ------- grid ------- */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {GRID.map((pr, i) => (
            <Reveal key={pr.idx} delay={0.08 * (i % 2)}>
              <article className="pj-card group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-ink-800/60 to-ink-900/50 transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-400/30 hover:shadow-[0_30px_90px_-35px_rgba(34,211,238,0.4)]">
                <div className="bg-grid relative h-44 overflow-hidden border-b border-white/[0.06] [mask-image:linear-gradient(black_80%,transparent)]">
                  <pr.Visual />
                  <span className="absolute right-4 top-3 font-mono text-[10px] tracking-[0.3em] text-slate-600">{pr.idx}</span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-400/25 bg-cyan-400/[0.08] text-cyanx transition-transform duration-300 group-hover:scale-110">
                      <pr.icon size={16} />
                    </span>
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.28em] text-amber-300/80">{pr.category}</p>
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-100 transition-colors group-hover:text-cyan-100">
                    {pr.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{pr.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
                    {pr.stack.map((t) => (
                      <Tag key={t} tone="cool">{t}</Tag>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
