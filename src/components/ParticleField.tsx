import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number; tw: number };

/** Ambient constellation: drifting particles + faint links + occasional light streaks. */
export default function ParticleField({ density = 1 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let particles: P[] = [];
    let streaks: { x: number; y: number; vx: number; vy: number; life: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = reduced ? 0 : Math.min(110, Math.floor(((w * h) / 26000) * density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: -0.08 - Math.random() * 0.22,
        r: 0.6 + Math.random() * 1.4,
        hue: Math.random() > 0.82 ? 36 : 194 + Math.random() * 16,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    let t = 0;
    const tick = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);

      // spawn a light streak occasionally
      if (Math.random() < 0.004 && streaks.length < 2) {
        streaks.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.6,
          vx: 2.2 + Math.random() * 2,
          vy: 0.3,
          life: 1,
        });
      }
      streaks = streaks.filter((s) => s.life > 0);
      for (const s of streaks) {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.012;
        const g = ctx.createLinearGradient(s.x - 90, s.y - 12, s.x, s.y);
        g.addColorStop(0, "rgba(56,189,248,0)");
        g.addColorStop(1, `rgba(125,211,252,${0.35 * Math.max(s.life, 0)})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(s.x - 90, s.y - 12);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        const twinkle = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.4 + p.tw));
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 95%, 72%, ${twinkle})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // faint constellation links
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 115 * 115) {
            const o = (1 - Math.sqrt(d2) / 115) * 0.14;
            ctx.strokeStyle = `rgba(56,189,248,${o})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduced) raf = requestAnimationFrame(tick);
    };

    resize();
    if (!reduced) raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [density]);

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70" aria-hidden />;
}
