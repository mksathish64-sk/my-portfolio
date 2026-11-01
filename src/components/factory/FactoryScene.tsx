import type { CSSProperties, ReactElement } from "react";
import { cn } from "../../utils/cn";

/* Props */
type StationSlot = { Comp: (props: { p: string }) => ReactElement; short: string };

const STATION_X = [50, 273, 496, 719, 942, 1165];
const CENTER_X = STATION_X.map((x) => x + 100);

export default function FactoryScene({
  stations,
  active,
  paused,
  onSelect,
}: {
  stations: StationSlot[];
  active: number;
  paused: boolean;
  onSelect: (i: number) => void;
}) {
  return (
    <svg
      viewBox="0 0 1440 620"
      className={cn("factory scene h-auto w-full select-none", paused && "is-paused", "is-idle")}
      role="group"
      aria-label="Interactive skills factory — six workstations"
    >
      <defs>
        <linearGradient id="dSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050c1d" />
          <stop offset="58%" stopColor="#071227" />
          <stop offset="100%" stopColor="#040a16" />
        </linearGradient>
        <linearGradient id="dBelt" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#152c52" />
          <stop offset="100%" stopColor="#080f20" />
        </linearGradient>
        <linearGradient id="dFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#030812" stopOpacity="0" />
          <stop offset="100%" stopColor="#030812" />
        </linearGradient>
        <linearGradient id="dPkg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#164e63" />
          <stop offset="100%" stopColor="#0b2438" />
        </linearGradient>
        <linearGradient id="dFloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1c34" />
          <stop offset="100%" stopColor="#020711" />
        </linearGradient>
        <linearGradient id="dGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.18" />
          <stop offset="45%" stopColor="#0e7490" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0.35" />
        </linearGradient>
        <filter id="dGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="dBeltClip">
          <rect x="0" y="546" width="1440" height="40" rx="20" />
        </clipPath>
      </defs>

      {/* backdrop */}
      <rect x="0" y="0" width="1440" height="620" fill="url(#dSky)" rx="24" />
      <ellipse cx="330" cy="180" rx="260" ry="140" fill="#0ea5e9" opacity="0.07" style={{ filter: "blur(70px)" }} />
      <ellipse cx="1150" cy="150" rx="240" ry="130" fill="#22d3ee" opacity="0.06" style={{ filter: "blur(70px)" }} />
      <ellipse cx="740" cy="430" rx="420" ry="120" fill="#fbbf24" opacity="0.03" style={{ filter: "blur(80px)" }} />

      {/* factory shell */}
      <path d="M0 450 L1440 450 L1440 620 L0 620 Z" fill="url(#dFloor)" />
      <g className="factory-grid" opacity="0.45">
        {Array.from({ length: 15 }, (_, i) => (
          <path key={`h-${i}`} d={`M0 ${465 + i * 11} H1440`} />
        ))}
        {Array.from({ length: 13 }, (_, i) => (
          <path key={`v-${i}`} d={`M${i * 120} 450 L${i * 120 + 160} 620`} />
        ))}
      </g>
      <g className="factory-architecture" fill="none" strokeLinecap="round">
        <path d="M24 104 H1416" stroke="#1b3d68" strokeWidth="10" />
        <path d="M24 104 H1416" stroke="#7dd3fc" strokeOpacity="0.18" strokeWidth="1" />
        {[35, 285, 535, 785, 1035, 1285].map((x) => (
          <path key={x} d={`M${x} 104 V450`} stroke="#173457" strokeWidth="8" />
        ))}
        {[35, 285, 535, 785, 1035, 1285].map((x) => (
          <path key={x} d={`M${x + 4} 114 V445`} stroke="#7dd3fc" strokeOpacity="0.12" strokeWidth="1" />
        ))}
      </g>

      {/* rear pillars */}
      {[210, 730, 1250].map((x, pi) => (
        <g key={x} opacity="0.55">
          <rect x={x} y="110" width="64" height="440" fill="rgba(13,27,51,0.55)" stroke="rgba(125,211,252,0.07)" />
          {[0, 1, 2, 3, 4].map((r) => (
            <rect
              key={r}
              x={x + 12}
              y={140 + r * 78}
              width="40"
              height="26"
              rx="3"
              fill="rgba(56,189,248,0.1)"
              className="flicker"
              style={{ animationDelay: `${pi * 1.3 + r * 0.9}s` }}
            />
          ))}
        </g>
      ))}

      {/* overhead bus pipe with glowing amber flow */}
      <path d="M40 64 H1400" stroke="#0e2242" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M40 64 H1400" stroke="#fbbf24" strokeWidth="2.4" fill="none" strokeLinecap="round" className="flow" opacity="0.85" />
      {CENTER_X.map((cx, i) => (
        <g key={cx}>
          <path d={`M${cx} 70 V292`} stroke="rgba(251,191,36,0.25)" strokeWidth="3" fill="none" />
          <path d={`M${cx} 70 V292`} stroke={active === i ? "#fde68a" : "#fbbf24"} strokeWidth="1.6" fill="none" className="flow-slow" opacity={active === i ? 1 : 0.5} />
          <circle cx={cx} cy="70" r="5" fill="#0b1526" stroke="#fbbf24" strokeWidth="1.4" opacity="0.9" />
        </g>
      ))}

      {/* overhead service rail and moving inspection drone */}
      <g className="inspection-rail">
        <path d="M80 166 H1360" stroke="#020617" strokeWidth="18" strokeLinecap="round" />
        <path d="M80 166 H1360" stroke="#38bdf8" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="3 12" />
        <g className="inspection-drone" filter="url(#dGlow)">
          <rect x="-32" y="151" width="64" height="22" rx="6" fill="url(#dGlass)" stroke="#67e8f9" strokeOpacity="0.75" />
          <circle cx="-18" cy="178" r="4" fill="#fbbf24" className="beacon" />
          <circle cx="18" cy="178" r="4" fill="#34d399" className="beacon" style={{ animationDelay: "0.8s" }} />
          <path d="M-20 174 V190 M20 174 V190" stroke="#7dd3fc" strokeOpacity="0.55" />
        </g>
      </g>

      {/* machine status boards */}
      {[170, 622, 1074].map((x, i) => (
        <g key={x} className="status-board" transform={`translate(${x} 205)`}>
          <rect width="146" height="48" rx="6" fill="#020817" stroke="#2b567e" strokeWidth="1.2" />
          <rect x="8" y="8" width="7" height="7" rx="2" fill={i === 1 ? "#fbbf24" : "#34d399"} className="beacon" />
          <text x="24" y="15" fontFamily="JetBrains Mono, monospace" fontSize="7" letterSpacing="1.3" fill="#7dd3fc">LINE 0{i + 1} / LIVE</text>
          <path d="M9 29 H137" stroke="#123153" />
          <path d="M10 38 H56 M64 38 H92 M100 38 H132" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" className="status-bars" style={{ animationDelay: `${i * 0.6}s` }} />
        </g>
      ))}

      {/* floor shadows */}
      {CENTER_X.map((cx) => (
        <ellipse key={cx} cx={cx} cy={560} rx="118" ry="12" fill="#22d3ee" opacity="0.05" />
      ))}

      {/* stations */}
      {stations.map(({ Comp, short }, i) => (
        <g
          key={short}
          transform={`translate(${STATION_X[i]} 292)`}
          className={cn("station", active === i && "is-active")}
          onClick={() => onSelect(i)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onSelect(i);
          }}
          tabIndex={0}
          role="button"
          aria-label={`Activate station ${short}`}
        >
          <title>{short}</title>
          <Comp p="d" />
        </g>
      ))}

      {/* conveyor belt */}
      <g>
        {CENTER_X.map((cx) => (
          <rect key={cx} x={cx - 5} y="586" width="10" height="18" fill="#0a1730" />
        ))}
        <rect x="0" y="546" width="1440" height="40" rx="20" fill="url(#dBelt)" stroke="rgba(125,211,252,0.16)" />
        <path d="M22 548 H1418" stroke="#67e8f9" strokeOpacity="0.2" strokeWidth="2" strokeDasharray="2 18" className="belt-edge-flow" />
        <g clipPath="url(#dBeltClip)">
          <g className="belt-slats">
            {Array.from({ length: 30 }, (_, i) => (
              <rect key={i} x={-52 + i * 52} y="552" width="15" height="28" rx="4" fill="rgba(125,211,252,0.13)" />
            ))}
          </g>
        </g>
        <rect x="0" y="546" width="1440" height="40" rx="20" fill="none" stroke="rgba(125,211,252,0.25)" strokeWidth="1" />

        {/* travelling product boxes */}
        {["-1s", "-6s", "-11s", "-15.5s"].map((d, i) => (
          <g key={i} transform="translate(0 548)" className="pkg" style={{ animationDelay: d, ["--pkg-dur" as string]: "21s" } as CSSProperties}>
            <rect x="-15" y="-2" width="30" height="24" rx="4" fill="url(#dPkg)" stroke="#22d3ee" strokeWidth="1" opacity="0.95" />
            <rect x="-15" y="4" width="30" height="4" fill="#22d3ee" opacity="0.45" />
            <rect x="-4" y="-2" width="8" height="24" fill="#fbbf24" opacity="0.28" />
          </g>
        ))}
      </g>

      {/* rising sparks */}
      {[180, 420, 640, 880, 1120, 1330].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={540}
          r={1.8 + (i % 3)}
          fill={i % 2 ? "#fde68a" : "#7dd3fc"}
          className="rise"
          style={{ animationDelay: `${i * 1.7}s`, ["--rise-dur" as string]: `${6 + (i % 3) * 1.6}s` } as CSSProperties}
        />
      ))}

      {/* foreground fade */}
      <rect x="0" y="560" width="1440" height="60" fill="url(#dFade)" />
    </svg>
  );
}
