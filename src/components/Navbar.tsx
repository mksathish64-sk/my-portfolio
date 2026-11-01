import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, TerminalSquare } from "lucide-react";
import { cn } from "../utils/cn";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      spy.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-4xl items-center justify-between gap-2 rounded-2xl border px-3 py-2 transition-all duration-500",
            scrolled
              ? "glass-bright shadow-[0_10px_50px_-12px_rgba(14,165,233,0.35)]"
              : "border-transparent bg-transparent"
          )}
        >
          <a href="#home" className="group flex items-center gap-2.5 rounded-xl px-2.5 py-1.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 text-cyanx transition-all group-hover:shadow-[0_0_18px_rgba(34,211,238,0.45)]">
              <TerminalSquare size={15} />
            </span>
            <span className="font-mono text-xs font-semibold tracking-widest text-slate-200">
              SKM<span className="text-cyanx">.dev</span>
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={cn(
                    "relative rounded-lg px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300",
                    active === l.id ? "text-cyan-100" : "text-slate-400 hover:text-slate-100"
                  )}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg border border-cyan-400/25 bg-cyan-400/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="mailto:mksathish64@gmail.com"
            className="hidden rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 font-mono text-[11px] font-medium tracking-widest text-amber-200 transition-all hover:bg-amber-400/20 hover:shadow-[0_0_22px_rgba(251,191,36,0.3)] md:block"
          >
            HIRE_SIGNAL
          </a>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200 md:hidden"
          >
            <Menu size={17} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 pt-6">
              <span className="font-mono text-xs tracking-widest text-slate-400">NAVIGATION</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200"
              >
                <X size={18} />
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "group flex items-baseline gap-4 rounded-xl py-3",
                      active === l.id ? "text-cyanx" : "text-slate-200"
                    )}
                  >
                    <span className="font-mono text-xs text-slate-500">0{i + 1}</span>
                    <span className="font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-cyanx">
                      {l.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="px-8 pb-10 font-mono text-[10px] tracking-widest text-slate-600">
              SATHISH KUMAR M — © 2026
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
