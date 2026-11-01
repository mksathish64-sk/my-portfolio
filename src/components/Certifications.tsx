import { Award, Coffee, Code2, Smartphone, AppWindow, Globe, type LucideIcon } from "lucide-react";
import { Reveal, SectionHeading, Tag } from "./ui";

type Cert = {
  title: string;
  issuer: string;
  kind: "Academy" | "Hands-on Build";
  icon: LucideIcon;
  note: string;
};

const CERTS: Cert[] = [
  {
    title: "Java Programming",
    issuer: "Oracle Academy",
    kind: "Academy",
    icon: Coffee,
    note: "Core Java language fundamentals through Oracle Academy coursework.",
  },
  {
    title: "Python Programming",
    issuer: "Cisco Academy",
    kind: "Academy",
    icon: Code2,
    note: "Python foundations covering syntax, control flow and problem solving.",
  },
  {
    title: "Android Development",
    issuer: "Student Alarm & Reminder App",
    kind: "Hands-on Build",
    icon: Smartphone,
    note: "Applied Android development through a working alarm & reminder application.",
  },
  {
    title: "JavaFX Application Development",
    issuer: "Desktop GUI Project",
    kind: "Hands-on Build",
    icon: AppWindow,
    note: "UI components and event handling through a JavaFX desktop application.",
  },
  {
    title: "Web Dev & API Testing",
    issuer: "To-Do API · Python + Postman",
    kind: "Hands-on Build",
    icon: Globe,
    note: "RESTful CRUD design and endpoint testing through a practical API build.",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          index="04"
          kicker="LEARNING PROTOCOL"
          title="Certifications &"
          accent="Learning."
          blurb="Academy coursework paired with hands-on builds — every module below maps to something I have actually practiced."
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {CERTS.map((c, i) => (
            <Reveal key={c.title} delay={0.08 * i}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-ink-800/70 to-ink-900/60 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-amber-400/30 hover:shadow-[0_25px_70px_-25px_rgba(251,191,36,0.35)]">
                <span className="pointer-events-none absolute right-3 top-2 font-display text-5xl font-bold text-white/[0.05] transition-colors group-hover:text-amber-400/10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-amber-400/25 bg-amber-400/[0.08] text-amberx transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <c.icon size={19} />
                  </span>
                  <Tag tone={c.kind === "Academy" ? "cool" : "dim"}>{c.kind}</Tag>
                </div>
                <h3 className="font-display text-[15px] font-bold leading-snug text-slate-100">{c.title}</h3>
                <p className="mt-1.5 font-mono text-[10px] tracking-wider text-cyanx/80">{c.issuer}</p>
                <p className="mt-3 flex-1 text-xs leading-relaxed text-slate-500">{c.note}</p>
                <div className="mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4 font-mono text-[9px] tracking-[0.25em] text-slate-600">
                  <Award size={11} className="text-amberx/70" />
                  MODULE COMPLETE
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
