import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Check, Mail, Send, Radio, Lock } from "lucide-react";
import { Reveal, SectionHeading } from "./ui";
import { GithubIcon, LinkedinIcon } from "./icons";

const EMAIL = "mksathish64@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/sathishkumar-m-708000329";

function ConnectionLines() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40" aria-hidden>
      <defs>
        <linearGradient id="lnGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
          <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[
        "M-40 120 C 300 60, 700 220, 1500 120",
        "M-40 340 C 400 280, 900 420, 1500 300",
        "M-40 520 C 500 460, 800 620, 1500 500",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="url(#lnGrad)"
          strokeWidth="1"
          strokeDasharray="6 14"
          style={{ animation: `ff-dashflow ${2.4 + i * 0.9}s linear infinite` }}
        />
      ))}
    </svg>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const from = String(data.get("email") || "");
    const msg = String(data.get("message") || "");
    setStatus("sending");
    const body = encodeURIComponent(`${msg}\n\n— ${name} (${from})`);
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Portfolio contact — ${name}`)}&body=${body}`;
    setTimeout(() => setStatus("done"), 900);
    setTimeout(() => setStatus("idle"), 4200);
    e.currentTarget.reset();
  };

  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-36">
      <ConnectionLines />
      <div className="absolute left-1/2 top-1/2 h-96 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt-500/[0.06] blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          index="06"
          kicker="COMM LINK"
          title="Open a"
          accent="Channel."
          align="center"
          blurb="Interested in collaborating, internship opportunities, or talking tech? The fastest route to me is below."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ------- direct channels ------- */}
          <div className="flex flex-col gap-4">
            <Reveal>
              <div className="glass group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:border-cyan-400/35 hover:shadow-[0_20px_60px_-20px_rgba(34,211,238,0.4)]">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-cyan-400/25 bg-cyan-400/10 text-cyanx">
                  <Mail size={19} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500">Email Uplink</p>
                  <a href={`mailto:${EMAIL}`} className="block truncate text-[15px] font-semibold text-slate-100 transition-colors hover:text-cyanx">
                    {EMAIL}
                  </a>
                </div>
                <button
                  onClick={copyEmail}
                  aria-label="Copy email"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-400 transition-all hover:border-cyan-400/40 hover:text-cyanx"
                >
                  {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex items-center gap-4 rounded-2xl p-5 transition-all duration-300 hover:border-volt-400/40 hover:shadow-[0_20px_60px_-20px_rgba(14,165,233,0.45)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-volt-400/30 bg-volt-500/10 text-volt-300">
                  <LinkedinIcon size={19} />
                </span>
                <div className="flex-1">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500">LinkedIn</p>
                  <p className="text-[15px] font-semibold text-slate-100 transition-colors group-hover:text-volt-300">
                    Sathish Kumar M
                  </p>
                </div>
                <span className="font-mono text-[10px] tracking-widest text-slate-500 transition-colors group-hover:text-cyanx">CONNECT →</span>
              </a>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="glass relative flex items-center gap-4 rounded-2xl border-dashed p-5 opacity-80">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/[0.04] text-slate-400">
                  <GithubIcon size={19} />
                </span>
                <div className="flex-1">
                  <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500">GitHub</p>
                  <p className="text-[15px] font-semibold text-slate-300">Profile link coming soon</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[9px] tracking-widest text-slate-500">
                  <Lock size={10} /> PLACEHOLDER
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-auto flex items-center gap-2.5 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] px-5 py-4">
                <span className="anim-pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
                <p className="font-mono text-[10.5px] tracking-wider text-emerald-300/90">
                  RESPONSE LATENCY: LOW — I REPLY PROMPTLY
                </p>
              </div>
            </Reveal>
          </div>

          {/* ------- transmission console ------- */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="glass-bright relative overflow-hidden rounded-3xl p-7 shadow-[0_40px_120px_-40px_rgba(14,165,233,0.4)] md:p-9"
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.3em] text-slate-400">
                  <Radio size={13} className="text-cyanx" />
                  TRANSMISSION CONSOLE
                </p>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-400/60" />
                  <span className="h-2 w-2 rounded-full bg-amberx/70" />
                  <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">Your Name</span>
                  <input
                    required
                    name="name"
                    type="text"
                    placeholder="Jane Recruiter"
                    className="w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)]"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">Your Email</span>
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)]"
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">Message Payload</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Hi Sathish — we came across your portfolio and…"
                  className="w-full resize-none rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-600 focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(34,211,238,0.12)]"
                />
              </label>

              <button
                type="submit"
                disabled={status !== "idle"}
                className="group relative mt-6 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-volt-500 to-cyanx px-7 py-3.5 text-sm font-semibold text-ink-950 transition-transform duration-300 hover:scale-[1.015] active:scale-[0.98] disabled:opacity-80 sm:w-auto"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-[length:200%_100%] opacity-0 transition-opacity duration-300 group-hover:animate-[kf-shimmer_1.4s_linear_infinite] group-hover:opacity-100" />
                <Send size={15} className="relative transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="relative">
                  {status === "idle" ? "Transmit Message" : status === "sending" ? "Opening mail channel…" : "Channel opened"}
                </span>
              </button>

              <AnimatePresence>
                {status === "done" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 font-mono text-[10.5px] tracking-wider text-emerald-300"
                  >
                    ▸ EMAIL CLIENT LAUNCHED WITH YOUR MESSAGE — HIT SEND TO COMPLETE TRANSMISSION
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
