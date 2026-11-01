import type { CSSProperties, ReactElement } from "react";

/* ============================================================
   Six miniature animated workstations for the Skills Factory.
   Coordinates are local: 200 wide × 250 tall, floor at y≈224.
   `p` prefixes gradient IDs so stations can render twice
   (desktop scene + mobile viewer) without ID collisions.
   ============================================================ */

type SP = { p: string };

const MONO = "JetBrains Mono, monospace";

function Gear({ x, y, r, cls, tone = "#7dd3fc" }: { x: number; y: number; r: number; cls: string; tone?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={cls}>
        <circle r={r} fill="none" stroke={tone} strokeWidth={r * 0.3} opacity={0.4} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <rect
            key={a}
            x={-r * 0.14}
            y={-r * 1.28}
            width={r * 0.28}
            height={r * 0.48}
            rx={r * 0.12}
            fill={tone}
            opacity={0.6}
            transform={`rotate(${a})`}
          />
        ))}
        <circle r={r * 0.3} fill={tone} opacity={0.75} />
      </g>
    </g>
  );
}

function Platform({ p, label }: { p: string; label: string }) {
  return (
    <g>
      <ellipse className="station-ring" cx="100" cy="238" rx="96" ry="11" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="5 7" />
      <rect x="4" y="222" width="192" height="22" rx="7" fill={`url(#${p}-plat)`} stroke="rgba(125,211,252,0.2)" strokeWidth="1" />
      <rect x="10" y="225" width="180" height="2" rx="1" fill="rgba(125,211,252,0.35)" />
      <text x="100" y="238" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="2" className="plate-text">
        {label}
      </text>
    </g>
  );
}

function Beacon() {
  return (
    <g>
      <circle cx="184" cy="16" r="7" fill="none" stroke="rgba(251,191,36,0.25)" strokeWidth="1" className="station-ring" style={{ stroke: "#34d399" }} />
      <circle cx="184" cy="16" r="3.4" fill="currentColor" className="beacon st-beacon" />
    </g>
  );
}

function PlatformDefs({ p }: { p: string }) {
  return (
    <linearGradient id={`${p}-plat`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#12294e" />
      <stop offset="100%" stopColor="#070f22" />
    </linearGradient>
  );
}

/* ---------------- ST-01 · JAVA — robotic assembly ---------------- */
export function JavaStation({ p }: SP): ReactElement {
  return (
    <g>
      <defs>
        <PlatformDefs p={p} />
        <linearGradient id={`${p}-jh`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10345f" />
          <stop offset="100%" stopColor="#081426" />
        </linearGradient>
        <radialGradient id={`${p}-core`} cx="0.5" cy="0.5" r="0.6">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="55%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* OOP class-node diagram */}
      <g stroke="rgba(125,211,252,0.4)" strokeWidth="1">
        <line x1="30" y1="46" x2="52" y2="30" />
        <line x1="52" y1="30" x2="74" y2="46" />
        <line x1="30" y1="46" x2="74" y2="46" opacity="0.35" />
      </g>
      {[
        [30, 46], [52, 30], [74, 46],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="4.2" fill="#0e7490" stroke="#22d3ee" strokeWidth="1.2" className="vnode" style={{ animationDelay: `${i * 0.9}s` }} />
      ))}
      <text x="52" y="18" textAnchor="middle" fontFamily={MONO} fontSize="7" letterSpacing="1.5" fill="#5b7a9d">OOP.LINK</text>

      {/* rear gears */}
      <Gear x={112} y={92} r={15} cls="spin-cw" />
      <Gear x={140} y={72} r={10} cls="spin-ccw" tone="#fbbf24" />

      {/* housing with energy core */}
      <rect x="112" y="104" width="58" height="66" rx="12" fill={`url(#${p}-jh)`} stroke="rgba(125,211,252,0.25)" />
      <circle cx="141" cy="137" r="12" fill={`url(#${p}-core)`} className="core" />
      <circle cx="141" cy="137" r="17" fill="none" stroke="rgba(251,191,36,0.35)" strokeDasharray="3 5" className="spin-cw spin-fast" />

      {/* assembly stack */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x="34" y={196 - i * 11} width="30" height="9" rx="2.5" fill="#123153" stroke="#38bdf8" strokeWidth="1" opacity={0.9 - i * 0.18} />
      ))}
      {/* dropping unit */}
      <rect x="34" y="174" width="30" height="9" rx="2.5" fill="#22d3ee" opacity="0.9" className="drop-unit" />
      <rect x="34" y="174" width="30" height="9" rx="2.5" fill="#fbbf24" className="drop-unit d2" />

      {/* robotic arm */}
      <rect x="72" y="202" width="34" height="18" rx="4" fill="#0c1c38" stroke="rgba(125,211,252,0.3)" />
      <g transform="translate(89 200)">
        <g className="shoulder">
          <rect x="-4.5" y="-58" width="9" height="58" rx="4.5" fill="#164e63" stroke="#38bdf8" strokeWidth="1.2" />
          <circle r="5" fill="#0b1526" stroke="#22d3ee" strokeWidth="1.5" />
          <g transform="translate(0 -52)">
            <g className="elbow">
              <rect x="-3.5" y="-40" width="7" height="40" rx="3.5" fill="#155e75" stroke="#38bdf8" strokeWidth="1" />
              <circle r="4" fill="#0b1526" stroke="#22d3ee" strokeWidth="1.4" />
              <g transform="translate(0 -40)">
                <line x1="0" y1="0" x2="-7" y2="9" stroke="#7dd3fc" strokeWidth="2.4" strokeLinecap="round" className="grip-l" />
                <line x1="0" y1="0" x2="7" y2="9" stroke="#7dd3fc" strokeWidth="2.4" strokeLinecap="round" className="grip-r" />
              </g>
            </g>
          </g>
        </g>
      </g>

      <Beacon />
      <Platform p={p} label="ST-01 · JAVA" />
    </g>
  );
}

/* ---------------- ST-02 · PYTHON — automation lab ---------------- */
export function PythonStation({ p }: SP): ReactElement {
  return (
    <g>
      <defs>
        <PlatformDefs p={p} />
        <linearGradient id={`${p}-liq`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
        <clipPath id={`${p}-flask`}>
          <path d="M44 96 h18 v18 l16 34 a6 6 0 0 1 -5 9 H33 a6 6 0 0 1 -5 -9 l16 -34 Z" />
        </clipPath>
      </defs>

      {/* bench */}
      <rect x="18" y="186" width="164" height="10" rx="3" fill="#0c1c38" stroke="rgba(125,211,252,0.3)" />
      <rect x="26" y="196" width="6" height="26" fill="#081226" />
      <rect x="168" y="196" width="6" height="26" fill="#081226" />

      {/* flask */}
      <path d="M44 96 h18 v18 l16 34 a6 6 0 0 1 -5 9 H33 a6 6 0 0 1 -5 -9 l16 -34 Z"
        fill="rgba(56,189,248,0.07)" stroke="rgba(165,243,252,0.55)" strokeWidth="1.4" />
      <g clipPath={`url(#${p}-flask)`}>
        <path className="liquid" d="M20 132 q10 -5 26 0 t26 0 v40 H20 Z" fill={`url(#${p}-liq)`} opacity="0.85" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={38 + i * 12} cy={150} r={2.4 - i * 0.3} fill="#e0f2fe"
            className="bubble"
            style={{ animationDelay: `${i * 1.05}s`, ["--bub-dur" as string]: `${3 + i * 0.7}s` } as CSSProperties}
          />
        ))}
      </g>

      {/* data tube out of flask */}
      <path d="M62 108 C 92 108, 92 140, 116 140 S 148 118, 148 118" fill="none" stroke="rgba(34,211,238,0.18)" strokeWidth="7" strokeLinecap="round" />
      <path d="M62 108 C 92 108, 92 140, 116 140 S 148 118, 148 118" fill="none" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round" className="flow" />
      <circle cx="148" cy="118" r="5" fill="#0b1526" stroke="#fbbf24" strokeWidth="1.5" />
      <text x="148" y="121" textAnchor="middle" fontFamily={MONO} fontSize="6.5" fill="#fde68a">λ</text>

      {/* robot arm on bench */}
      <rect x="128" y="176" width="26" height="11" rx="3" fill="#0c1c38" stroke="rgba(125,211,252,0.35)" />
      <g transform="translate(141 176)">
        <g className="mini-arm">
          <rect x="-3.5" y="-34" width="7" height="34" rx="3.5" fill="#155e75" stroke="#38bdf8" strokeWidth="1" />
          <circle cx="0" cy="-34" r="4.4" fill="#fbbf24" className="beacon" />
        </g>
      </g>

      {/* LED strip */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={34 + i * 12} cy="218" r="2.4" fill={i % 2 ? "#22d3ee" : "#fbbf24"} className="led" style={{ animationDelay: `${i * 0.36}s` }} />
      ))}

      <text x="100" y="60" textAnchor="middle" fontFamily={MONO} fontSize="7" letterSpacing="1.5" fill="#5b7a9d">AUTOMATE.PY</text>
      <Beacon />
      <Platform p={p} label="ST-02 · PYTHON" />
    </g>
  );
}

/* ---------------- ST-03 · HTML/CSS — interface workshop ---------------- */
export function WebStation({ p }: SP): ReactElement {
  return (
    <g>
      <defs>
        <PlatformDefs p={p} />
        <linearGradient id={`${p}-win`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1f3d" />
          <stop offset="100%" stopColor="#070f22" />
        </linearGradient>
      </defs>

      {/* drafting arm light */}
      <g stroke="rgba(125,211,252,0.4)" strokeWidth="3" strokeLinecap="round">
        <path d="M100 22 L100 44" />
      </g>
      <polygon points="78,44 122,44 132,108 68,108" fill="rgba(251,191,36,0.07)" className="light-cone" />
      <circle cx="100" cy="24" r="6" fill="#fbbf24" opacity="0.9" className="beacon" />

      {/* browser window */}
      <rect x="32" y="86" width="136" height="104" rx="10" fill={`url(#${p}-win)`} stroke="rgba(125,211,252,0.35)" strokeWidth="1.2" />
      <path d="M32 96 a10 10 0 0 1 10 -10 h116 a10 10 0 0 1 10 10 v6 H32 Z" fill="#0a1932" stroke="rgba(125,211,252,0.2)" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={43 + i * 9} cy="94" r="2.2" fill={["#f87171", "#fbbf24", "#34d399"][i]} opacity="0.85" />
      ))}
      <rect x="66" y="90.5" width="70" height="7" rx="3.5" fill="rgba(125,211,252,0.12)" />

      {/* assembling UI blocks */}
      <rect x="42" y="112" width="116" height="13" rx="3" fill="#0e7490" className="ui-block" stroke="#22d3ee" strokeWidth="0.8" />
      <rect x="32" y="110" width="0" height="0" fill="none" />
      <rect x="42" y="133" width="88" height="5.5" rx="2.7" fill="#7dd3fc" opacity="0.75" className="ui-block" style={{ animationDelay: "0.7s" }} />
      <rect x="42" y="143" width="62" height="5.5" rx="2.7" fill="#7dd3fc" opacity="0.5" className="ui-block" style={{ animationDelay: "1.15s" }} />
      <rect x="118" y="131" width="40" height="26" rx="5" fill="rgba(167,139,250,0.28)" stroke="#a78bfa" strokeWidth="0.9" className="ui-block" style={{ animationDelay: "1.6s" }} />
      <rect x="42" y="164" width="36" height="13" rx="6.5" fill="#fbbf24" className="ui-block" style={{ animationDelay: "2.1s" }} />
      <rect x="83" y="168" width="14" height="5" rx="2.5" fill="#78350f" className="ui-block" style={{ animationDelay: "2.25s" }} />

      {/* colour swatch + paint drop */}
      <circle cx="176" cy="64" r="7" className="swatch" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <circle cx="176" cy="50" r="3" fill="#22d3ee" className="paint-drop" />
      <text x="176" y="86" textAnchor="middle" fontFamily={MONO} fontSize="6.5" fill="#5b7a9d">CSS</text>

      {/* code caret */}
      <rect x="32" y="202" width="70" height="12" rx="4" fill="rgba(10,25,50,0.9)" stroke="rgba(125,211,252,0.2)" />
      <text x="39" y="211" fontFamily={MONO} fontSize="7.5" fill="#7dd3fc">{"<div>"}</text>
      <rect x="68" y="205" width="5" height="6" fill="#fbbf24" className="caret" />

      <Beacon />
      <Platform p={p} label="ST-03 · HTML+CSS" />
    </g>
  );
}

/* ---------------- ST-04 · DATA STRUCTURES — sorting array ---------------- */
export function DataStation({ p }: SP): ReactElement {
  const bars = [34, 58, 26, 70, 44, 62, 38];
  return (
    <g>
      <defs>
        <PlatformDefs p={p} />
        <linearGradient id={`${p}-bar`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>
      </defs>

      {/* array cells with flipping bits */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <g key={i}>
          <rect x={28 + i * 21} y="46" width="17" height="17" rx="4" fill="#0a1932" stroke="rgba(125,211,252,0.35)" />
          <rect x={32.5 + i * 21} y="50.5" width="8" height="8" rx="2" fill={i % 2 ? "#fbbf24" : "#22d3ee"} className="bit"
            style={{ ["--bit-dur" as string]: `${1.1 + i * 0.22}s`, animationDelay: `${i * 0.3}s` } as CSSProperties} />
        </g>
      ))}
      <text x="100" y="38" textAnchor="middle" fontFamily={MONO} fontSize="7" letterSpacing="1.5" fill="#5b7a9d">ARRAY[7]</text>

      {/* scan line */}
      <rect x="20" y="80" width="2" height="118" fill="#fbbf24" opacity="0.55" className="sweepline" />

      {/* sorting bars */}
      {bars.map((h, i) => {
        const x = 28 + i * 21;
        const isSwapA = i === 1;
        const isSwapB = i === 4;
        return (
          <rect
            key={i}
            x={x}
            y={196 - h}
            width="14"
            height={h}
            rx="3"
            fill={isSwapA || isSwapB ? "#fbbf24" : `url(#${p}-bar)`}
            opacity={0.92}
            className={isSwapA ? "swap-a" : isSwapB ? "swap-b" : "bar"}
            style={isSwapA || isSwapB ? undefined : ({ animationDelay: `${i * 0.42}s` } as CSSProperties)}
          />
        );
      })}
      <rect x="18" y="197" width="166" height="5" rx="2.5" fill="#123153" stroke="rgba(125,211,252,0.35)" />
      <text x="100" y="216" textAnchor="middle" fontFamily={MONO} fontSize="7" letterSpacing="1" fill="#5b7a9d">sort.pass ▸ strings · arrays</text>

      <Beacon />
      <Platform p={p} label="ST-04 · DATA STRUCT" />
    </g>
  );
}

/* ---------------- ST-05 · GIT — version control ---------------- */
export function GitStation({ p }: SP): ReactElement {
  const main = "M76 42 L76 204";
  const branch = "M76 96 C 118 96, 118 132, 140 132 C 118 132, 118 168, 76 168";
  return (
    <g>
      <defs>
        <PlatformDefs p={p} />
      </defs>

      <text x="84" y="36" fontFamily={MONO} fontSize="7" letterSpacing="1.5" fill="#5b7a9d">main</text>
      <text x="128" y="122" fontFamily={MONO} fontSize="7" letterSpacing="1.5" fill="#d8873a">feature</text>

      {/* trunk + branch rails */}
      <path d={main} fill="none" stroke="rgba(56,189,248,0.3)" strokeWidth="4" strokeLinecap="round" />
      <path d={branch} fill="none" stroke="rgba(251,191,36,0.35)" strokeWidth="4" strokeLinecap="round" className="drawline" />

      {/* traveling commit dots */}
      <circle r="3.6" fill="#a5f3fc" className="traveler" style={{ offsetPath: `path("${main}")`, ["--tr-dur" as string]: "5s" } as CSSProperties} />
      <circle r="3" fill="#7dd3fc" className="traveler" style={{ offsetPath: `path("${main}")`, ["--tr-dur" as string]: "5s", animationDelay: "2.5s" } as CSSProperties} />
      <circle r="3.2" fill="#fde68a" className="traveler" style={{ offsetPath: `path("${branch}")`, ["--tr-dur" as string]: "4.5s", animationDelay: "1s" } as CSSProperties} />

      {/* commit nodes */}
      {[54, 96, 168, 198].map((y, i) => (
        <g key={y}>
          <circle cx="76" cy={y} r="7.5" fill="#0b1526" stroke="#38bdf8" strokeWidth="2" className="vnode" style={{ animationDelay: `${i * 0.7}s` }} />
          <circle cx="76" cy={y} r="2.4" fill="#7dd3fc" />
        </g>
      ))}
      <circle cx="140" cy="132" r="7" fill="#0b1526" stroke="#fbbf24" strokeWidth="2" className="vnode" style={{ animationDelay: "1.6s" }} />
      <circle cx="140" cy="132" r="2.4" fill="#fde68a" />
      {/* merge node */}
      <circle cx="76" cy="168" r="10" fill="none" stroke="#34d399" strokeWidth="1.4" strokeDasharray="3 4" className="spin-cw" />

      {/* terminal-ish log */}
      <rect x="104" y="42" width="66" height="52" rx="7" fill="#081226" stroke="rgba(125,211,252,0.3)" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={112} y={51 + i * 10} width={44 - i * 7} height="4.5" rx="2.2" fill={i === 0 ? "#34d399" : "#26507e"} className="bit" style={{ ["--bit-dur" as string]: `${1.6 + i * 0.4}s` } as CSSProperties} />
      ))}
      <text x="137" y="90" textAnchor="middle" fontFamily={MONO} fontSize="6.5" fill="#5b7a9d">git log</text>

      <Beacon />
      <Platform p={p} label="ST-05 · GIT/GITHUB" />
    </g>
  );
}

/* ---------------- ST-06 · LINUX — command center ---------------- */
export function LinuxStation({ p }: SP): ReactElement {
  const lines: [string, string, number][] = [
    ["$ whoami", "#7dd3fc", 0],
    ["sathish", "#e2e8f0", 1.7],
    ["$ ls ./skills", "#7dd3fc", 3.4],
    ["java py linux git", "#fbbf24", 5.1],
    ["$ uptime --dev", "#7dd3fc", 6.8],
  ];
  return (
    <g>
      <defs>
        <PlatformDefs p={p} />
        <linearGradient id={`${p}-term`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a162e" />
          <stop offset="100%" stopColor="#050b18" />
        </linearGradient>
        <clipPath id={`${p}-feedclip`}>
          <rect x="30" y="182" width="140" height="26" rx="6" />
        </clipPath>
      </defs>

      {/* antenna */}
      <line x1="100" y1="20" x2="100" y2="44" stroke="rgba(125,211,252,0.45)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="100" cy="18" r="4" fill="#fbbf24" className="beacon" />
      <circle cx="100" cy="18" r="9" fill="none" stroke="rgba(251,191,36,0.4)" strokeDasharray="2 4" className="spin-cw spin-fast" />

      {/* terminal */}
      <rect x="26" y="46" width="148" height="118" rx="10" fill={`url(#${p}-term)`} stroke="rgba(125,211,252,0.4)" strokeWidth="1.2" />
      <path d="M26 56 a10 10 0 0 1 10 -10 h128 a10 10 0 0 1 10 10 v5 H26 Z" fill="#0a1932" stroke="rgba(125,211,252,0.2)" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={37 + i * 8.5} cy="53.5" r="2.1" fill={["#f87171", "#fbbf24", "#34d399"][i]} opacity="0.85" />
      ))}
      <text x="100" y="56.5" textAnchor="middle" fontFamily={MONO} fontSize="6.5" fill="#5b7a9d">sathish@psna : ~</text>

      {lines.map(([t, fill, d], i) => (
        <text key={i} x="36" y={76 + i * 17} fontFamily={MONO} fontSize="8.5" fill={fill} className="term-line" style={{ animationDelay: `${d}s` }}>
          {t}
        </text>
      ))}
      <rect x="36" y="144" width="6.5" height="9" fill="#fbbf24" className="caret" />

      {/* scrolling process feed */}
      <rect x="30" y="182" width="140" height="26" rx="6" fill="#060d1f" stroke="rgba(125,211,252,0.22)" />
      <g clipPath={`url(#${p}-feedclip)`}>
        <g className="feed">
          {[0, 1].map((half) =>
            [0, 1, 2, 3, 4, 5].map((i) => (
              <rect key={`${half}-${i}`} x={38 + (i % 3) * 4} y={188 + i * 12 + half * 72} width={28 + ((i * 13) % 34)} height="4" rx="2" fill={i % 3 === 1 ? "#fbbf24" : "#1c5b8a"} opacity="0.8" />
            ))
          )}
        </g>
      </g>

      <Beacon />
      <Platform p={p} label="ST-06 · LINUX" />
    </g>
  );
}
