import { ArrowUp, TerminalSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-900/40 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-400/25 bg-cyan-400/10 text-cyanx">
            <TerminalSquare size={14} />
          </span>
          <div>
            <p className="font-display text-sm font-semibold text-slate-200">Sathish Kumar M</p>
            <p className="font-mono text-[9.5px] tracking-[0.25em] text-slate-500">CSE · PSNA · CLASS OF 2028</p>
          </div>
        </div>

        <p className="text-center font-mono text-[10px] tracking-widest text-slate-600">
          DESIGNED & ENGINEERED IN A FUTURISTIC WORKSHOP · © 2026
        </p>

        <a
          href="#home"
          aria-label="Back to top"
          className="group grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-400 transition-all hover:border-cyan-400/40 hover:text-cyanx hover:shadow-[0_0_25px_-5px_rgba(34,211,238,0.5)]"
        >
          <ArrowUp size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  );
}
