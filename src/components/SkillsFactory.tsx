import { useRef, useState, type ReactElement } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Coffee, Bot, LayoutTemplate, ArrowDownUp, GitBranch, TerminalSquare,
  Puzzle, Users, Timer, RefreshCw, Flame, type LucideIcon,
} from "lucide-react";
import { Reveal, SectionHeading, Tag } from "./ui";
import {
  JavaStation, PythonStation, WebStation, DataStation, GitStation, LinuxStation,
} from "./factory/stations";
import { cn } from "../utils/cn";
import "./factory/factory.css";

type Station = {
  id: string;
  name: string;
  category: string;
  level: string;
  desc: string;
  tags: string[];
  icon: LucideIcon;
  Comp: (props: { p: string }) => ReactElement;
};

const STATIONS: Station[] = [
  {
    id: "java",
    name: "Java",
    category: "Programming Language",
    level: "Foundation",
    desc: "Robotic assembly line for object-oriented thinking — classes, objects and method-driven design. Applied in my Student Management System, JavaFX application and Android reminder app.",
    tags: ["OOP", "Classes", "Desktop Apps", "Android"],
    icon: Coffee,
    Comp: JavaStation,
  },
  {
    id: "python",
    name: "Python",
    category: "Programming Language",
    level: "Foundation",
    desc: "Automation laboratory where scripts and data pipelines flow. The engine behind my Fruit CNN Classifier (TensorFlow) and the To-Do List REST API tested with Postman.",
    tags: ["Scripting", "TensorFlow", "REST APIs"],
    icon: Bot,
    Comp: PythonStation,
  },
  {
    id: "web",
    name: "HTML + CSS",
    category: "Web Technologies",
    level: "Foundation",
    desc: "Interface construction workshop — semantic structure and styling assembled into real pages. Used for the web front-end of my image classification project.",
    tags: ["Markup", "Styling", "Layouts"],
    icon: LayoutTemplate,
    Comp: WebStation,
  },
  {
    id: "ds",
    name: "Data Structures",
    category: "Core Concept",
    level: "Arrays & Strings",
    desc: "Sorting and organization station — arrays scanned, compared and re-ordered. Practiced through programming exercises and logical problem solving.",
    tags: ["Arrays", "Strings", "Sorting Logic"],
    icon: ArrowDownUp,
    Comp: DataStation,
  },
  {
    id: "git",
    name: "Git & GitHub",
    category: "Tools & Platforms",
    level: "Version Control",
    desc: "Version control bay — commits travel the trunk, branches diverge and merge back safely. Used to manage and host project source code.",
    tags: ["Commits", "Branching", "Repos"],
    icon: GitBranch,
    Comp: GitStation,
  },
  {
    id: "linux",
    name: "Linux",
    category: "Tools & Platforms",
    level: "Command Line",
    desc: "Command center running on the shell — navigation, files and processes through the terminal. Comfortable working in a Linux environment.",
    tags: ["Terminal", "Shell", "Commands"],
    icon: TerminalSquare,
    Comp: LinuxStation,
  },
];

const MATRIX = [
  {
    title: "Programming Languages",
    items: [["C", ""], ["Java", ""], ["Python", ""]],
  },
  {
    title: "Web Technologies",
    items: [["HTML", ""], ["CSS", ""]],
  },
  {
    title: "Tools & Platforms",
    items: [["VS Code", "Editor"], ["Git & GitHub", ""], ["Linux", "Commands"]],
  },
  {
    title: "Core Concepts",
    items: [["OOP Concepts", ""], ["Data Structures", "Arrays & Strings"]],
  },
] as const;

const SOFT: { label: string; icon: LucideIcon }[] = [
  { label: "Problem Solving", icon: Puzzle },
  { label: "Teamwork & Collaboration", icon: Users },
  { label: "Time Management", icon: Timer },
  { label: "Adaptability", icon: RefreshCw },
  { label: "Self-Motivation", icon: Flame },
];

export default function SkillsFactory() {
  const pathRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const select = (i: number) => {
    setActive(i);
  };

  const { scrollYProgress: pathProgress } = useScroll({
    target: pathRef,
    offset: ["start 0.78", "end 0.58"],
  });
  const pathFill = useSpring(pathProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="skills" className="relative overflow-hidden py-28 md:py-36">
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-volt-500/[0.05] blur-[140px]" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="02"
          kicker="PRODUCTION FLOOR"
          title="The Skills"
          accent="Factory."
          blurb="A miniature manufacturing plant where every workstation forges a different technical skill. Click a station to power it up and inspect what it builds."
        />

        {/* ------- production path : sequential SVG station reveals ------- */}
        <div ref={pathRef} className="factory-path relative mx-auto mt-20 max-w-4xl">
          <div className="mb-10 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyanx/70">Assembly Sequence</p>
            <h3 className="mx-auto mt-2 max-w-xl font-display text-2xl font-bold leading-relaxed text-slate-100">
              Scroll through each workstation to bring its skill module online.
            </h3>
          </div>

          <span className="factory-path__rail absolute left-5 top-32 h-[calc(100%-8rem)] w-px bg-white/[0.08] md:left-1/2" />
          <motion.span
            className="factory-path__fill absolute left-5 top-32 w-px origin-top bg-gradient-to-b from-cyanx via-volt-500 to-amberx shadow-[0_0_14px_rgba(34,211,238,0.75)] md:left-1/2"
            style={{ scaleY: pathFill, height: "calc(100% - 8rem)" }}
          />

          <div className="space-y-12 md:space-y-16">
            {STATIONS.map(({ Comp, ...st }, i) => (
              <div key={st.id} className="relative md:grid md:grid-cols-2 md:gap-14">
                <span className="factory-path__node absolute left-5 top-8 z-10 grid h-5 w-5 -translate-x-1/2 place-items-center md:left-1/2">
                  <span className={cn("h-2.5 w-2.5 rounded-full", active === i ? "bg-emerald-300 anim-pulse-dot" : "bg-cyanx")} />
                  <span className="absolute h-5 w-5 rounded-full border border-cyan-300/30 bg-ink-950/80" />
                </span>

                <Reveal
                  delay={0.05 * i}
                  className={cn("pl-12 md:pl-0", i % 2 ? "md:col-start-2" : "md:col-start-1 md:text-right")}
                >
                  <div className={cn(
                    "factory-path__module group relative overflow-hidden rounded-2xl border p-4 transition-all duration-500",
                    active === i
                      ? "border-cyan-300/45 bg-cyan-400/[0.09] shadow-[0_25px_70px_-28px_rgba(34,211,238,0.65)]"
                      : "border-white/[0.08] bg-ink-900/65"
                  )}>
                    <svg viewBox="-6 -8 212 292" className="factory mx-auto h-auto w-full max-w-[280px] select-none" role="img" aria-label={`${st.name} skill station`}>
                      <g className={cn("station", active === i && "is-active")} onClick={() => select(i)}>
                        <Comp p={`path-${st.id}`} />
                      </g>
                    </svg>
                  </div>
                </Reveal>
                <Reveal delay={0.05 * i + 0.08} className={cn("pl-12 pt-4 md:pl-0 md:pt-8", i % 2 ? "md:col-start-1 md:row-start-1" : "md:col-start-2")}>
                  <div className="factory-path__details">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[10px] tracking-[0.28em] text-cyanx/80">STATION 0{i + 1}</span>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-emerald-300">{active === i ? "ONLINE" : "STANDBY"}</span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-slate-100">{st.name}</h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">{st.category} · {st.level}</p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-400">{st.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">{st.tags.map((tag) => <Tag key={tag} tone="cool">{tag}</Tag>)}</div>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>

        {/* ------- skill matrix : honest inventory ------- */}
        <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {MATRIX.map((cat, ci) => (
            <Reveal key={cat.title} delay={0.07 * ci}>
              <div className="group h-full rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/[0.04]">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-cyanx/70">{cat.title}</p>
                <ul className="space-y-2.5">
                  {cat.items.map(([name, lvl]) => (
                    <li key={name} className="flex items-center justify-between gap-3 border-b border-white/[0.05] pb-2.5 last:border-0 last:pb-0">
                      <span className="text-sm font-medium text-slate-200">{name}</span>
                      {lvl && <Tag tone={lvl === "Editor" ? "dim" : "warm"} className="shrink-0">{lvl}</Tag>}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* soft skills */}
        <Reveal delay={0.1}>
          <div className="mt-6 rounded-2xl border border-white/[0.07] bg-gradient-to-r from-white/[0.03] via-cyan-400/[0.04] to-white/[0.03] p-6">
            <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-amber-300/80">
              Human Subroutines — Soft Skills
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              {SOFT.map((sk) => (
                <span
                  key={sk.label}
                  className="group flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/60 px-4 py-2 text-[13px] font-medium text-slate-300 transition-all duration-300 hover:border-amber-400/40 hover:text-amber-100 hover:shadow-[0_0_22px_-6px_rgba(251,191,36,0.5)]"
                >
                  <sk.icon size={14} className="text-amberx transition-transform duration-300 group-hover:scale-110" />
                  {sk.label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
