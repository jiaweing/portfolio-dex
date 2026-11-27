import type { Vars } from "./parts";

/* The key art, printed in four depth layers: the sunburst and its sun, the
   sea of cloud, the mountain of 3,800 applications that rises out of it with
   a desk built on top, and the ground. HeroParallax moves each layer by its
   depth (--d). All of it is decoration, hidden from assistive technology. */

// A small seeded generator, so the server and the browser draw the same pile
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16_807) % 2_147_483_647;
    return s / 2_147_483_647;
  };
}

const ENV_KINDS = ["a", "b", "c", "a", "b", "d", "a", "s"] as const;

interface Envelope {
  x: number;
  y: number;
  r: number;
  k: (typeof ENV_KINDS)[number];
  s: number;
}

// The pile: rows of envelopes inside a hill, smaller toward the summit
function pile(): Envelope[] {
  const rand = seeded(2026);
  const out: Envelope[] = [];
  for (let y = 176; y <= 560; y += 23) {
    const t = (y - 150) / 410;
    const half = 64 + 330 * t ** 0.78;
    const step = 34 + t * 10;
    for (let x = 400 - half + 14; x <= 400 + half - 14; x += step) {
      out.push({
        x: x + (rand() - 0.5) * 16,
        y: y + (rand() - 0.5) * 12,
        r: (rand() - 0.5) * 58,
        k: ENV_KINDS[Math.floor(rand() * ENV_KINDS.length)],
        s: 0.82 + t * 0.34,
      });
    }
  }
  return out;
}

const PILE = pile();

function EnvelopeDefs() {
  return (
    <defs>
      {(["a", "b", "c", "d"] as const).map((k) => (
        <g id={`u26-env-${k}`} key={k}>
          <rect
            className={`u26-env u26-env-${k}`}
            height="32"
            rx="2"
            width="48"
            x="-24"
            y="-16"
          />
          <path className="u26-env-flap" d="M-24 -16 L0 4 L24 -16" />
        </g>
      ))}
      {/* The odd one with a stamp on it */}
      <g id="u26-env-s">
        <rect
          className="u26-env u26-env-a"
          height="32"
          rx="2"
          width="48"
          x="-24"
          y="-16"
        />
        <path className="u26-env-flap" d="M-24 -16 L0 4 L24 -16" />
        <rect className="u26-env-stamp" height="9" width="9" x="11" y="3" />
      </g>
      <linearGradient id="u26-flag-foil" x1="0" x2="1" y1="0" y2="0.3">
        <stop offset="0" stopColor="var(--amber)" />
        <stop offset="0.2" stopColor="var(--pink)" />
        <stop offset="0.4" stopColor="var(--magenta)" />
        <stop offset="0.55" stopColor="var(--indigo)" />
        <stop offset="0.7" stopColor="var(--cyan)" />
        <stop offset="0.85" stopColor="var(--green)" />
        <stop offset="1" stopColor="var(--lime)" />
      </linearGradient>
    </defs>
  );
}

// The desk on the summit: two screens, two towers that never sleep, the
// founder from behind, and the A Major flag
function Summit() {
  return (
    <g>
      {/* Flag */}
      <rect className="u26-ink" height="118" rx="2" width="5" x="304" y="34" />
      <circle className="u26-ink" cx="306.5" cy="32" r="5" />
      <g className="u26-flag">
        <path
          d="M304 40 C286 34 270 48 250 42 C240 39 232 41 226 44 L232 62 L224 82 C234 78 244 80 254 83 C272 88 288 76 304 82Z"
          fill="url(#u26-flag-foil)"
          stroke="var(--ink)"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />
        <image height="26" href="/logos/amajor.svg" width="26" x="255" y="48" />
      </g>

      {/* Towers */}
      <g>
        <rect
          className="u26-ink"
          height="50"
          rx="3"
          width="24"
          x="474"
          y="102"
        />
        <rect
          className="u26-ink"
          height="42"
          rx="3"
          width="22"
          x="502"
          y="110"
        />
        <circle
          className="u26-led"
          cx="486"
          cy="112"
          fill="var(--lime)"
          r="3"
        />
        <circle
          className="u26-led u26-led--b"
          cx="513"
          cy="120"
          fill="var(--pink)"
          r="3"
        />
        <path
          d="M480 124h12M480 131h12M480 138h12M508 131h10M508 138h10"
          stroke="var(--ink-3)"
          strokeLinecap="round"
          strokeWidth="2"
        />
      </g>

      {/* Screens */}
      <g>
        <rect
          fill="var(--cyan)"
          height="40"
          rx="4"
          stroke="var(--ink)"
          strokeWidth="3"
          width="58"
          x="340"
          y="80"
        />
        <rect
          fill="var(--lime)"
          height="40"
          rx="4"
          stroke="var(--ink)"
          strokeWidth="3"
          width="58"
          x="404"
          y="80"
        />
        <g fill="var(--ink)">
          <rect
            className="u26-screen-line"
            height="3"
            width="30"
            x="347"
            y="89"
          />
          <rect height="3" width="18" x="347" y="96" />
          <rect
            className="u26-screen-line"
            height="3"
            width="38"
            x="347"
            y="103"
          />
          <rect height="3" width="26" x="411" y="89" />
          <rect
            className="u26-screen-line"
            height="3"
            width="40"
            x="411"
            y="96"
          />
          <rect height="3" width="14" x="411" y="103" />
        </g>
        <rect className="u26-ink" height="12" width="6" x="366" y="120" />
        <rect className="u26-ink" height="12" width="6" x="430" y="120" />
      </g>

      {/* Desk */}
      <rect className="u26-ink" height="9" rx="2" width="150" x="326" y="131" />
      <rect className="u26-ink" height="26" width="7" x="334" y="138" />
      <rect className="u26-ink" height="26" width="7" x="461" y="138" />

      {/* The founder, from behind, in a chair */}
      <g>
        <rect
          fill="var(--ink-3)"
          height="52"
          rx="10"
          stroke="var(--ink)"
          strokeWidth="2.5"
          width="50"
          x="376"
          y="112"
        />
        <path
          className="u26-ink"
          d="M382 162 C382 132 388 122 401 122 C414 122 420 132 420 162Z"
        />
        <circle className="u26-ink" cx="401" cy="106" r="14" />
        {/* Headphones */}
        <path
          d="M386 106 C386 86 416 86 416 106"
          fill="none"
          stroke="var(--pink)"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <rect fill="var(--pink)" height="13" rx="3" width="7" x="382" y="101" />
        <rect fill="var(--pink)" height="13" rx="3" width="7" x="413" y="101" />
      </g>
    </g>
  );
}

function Mountain() {
  return (
    <svg aria-hidden="true" className="u26-mountain" viewBox="0 0 800 560">
      <EnvelopeDefs />
      <path
        className="base"
        d="M-10 562 C80 470 190 330 300 214 C330 180 356 162 400 162 C444 162 470 180 500 214 C610 330 720 470 810 562Z"
      />
      {PILE.map((e) => (
        <use
          href={`#u26-env-${e.k}`}
          key={`${e.x.toFixed(1)}-${e.y.toFixed(1)}`}
          transform={`translate(${e.x.toFixed(1)} ${e.y.toFixed(1)}) rotate(${e.r.toFixed(1)}) scale(${e.s.toFixed(2)})`}
        />
      ))}
      <Summit />
    </svg>
  );
}

// Clouds are a row of scallops on a flat base. Each scallop is an arc from one
// point of the outline to the next; "echo" is the short second line drawn
// inside some of them, the way a printed cloud gets its shading.
interface Outline {
  d: string;
  echo: string;
}

const n1 = (v: number) => v.toFixed(1);

function scallops(
  rand: () => number,
  points: [number, number][],
  every: number
): Outline {
  let [px, py] = points[0];
  let d = "";
  let echo = "";
  for (let i = 1; i < points.length; i++) {
    const [x, y] = points[i];
    const chord = Math.hypot(x - px, y - py);
    const r = chord * (0.56 + rand() * 0.1);
    d += `A${n1(r)} ${n1(r)} 0 0 1 ${n1(x)} ${n1(y)}`;
    if (i % every === 0 && chord > 44) {
      const drop = chord * 0.2;
      const ax = px + (x - px) * 0.3;
      const ay = py + (y - py) * 0.3 + drop;
      const bx = px + (x - px) * 0.86;
      const by = py + (y - py) * 0.86 + drop;
      const er = n1(r * 0.7);
      echo += `M${n1(ax)} ${n1(ay)}A${er} ${er} 0 0 1 ${n1(bx)} ${n1(by)}`;
    }
    px = x;
    py = y;
  }
  return { d, echo };
}

// One loose cloud, w wide and h tall: scallops over the top, and a flat
// base with its two ends rounded off
function cloud(seed: number, w: number, h: number, bumps: number): Outline {
  const rand = seeded(seed);
  const end = h * 0.24;
  const top = h - end;
  const points: [number, number][] = [[0, top]];
  for (let i = 1; i < bumps; i++) {
    const t = i / bumps + (rand() - 0.5) * (0.4 / bumps);
    const lift = Math.sin(Math.PI * t) ** 0.6 * (0.74 + rand() * 0.26);
    points.push([w * t, top - (top - 4) * lift]);
  }
  points.push([w, top]);
  const { d, echo } = scallops(rand, points, 2);
  const e = n1(end);
  const base = `A${e} ${e} 0 0 1 ${n1(w - end)} ${h}H${e}A${e} ${e} 0 0 1 0 ${n1(top)}`;
  return { d: `M0 ${n1(top)}${d}${base}Z`, echo };
}

// A bank of cloud, wide enough that no screen has to stretch it. It rolls
// between base and base - swell, and is filled down to the bottom of the
// drawing.
function bank(
  seed: number,
  base: number,
  swell: number,
  size: number
): Outline {
  const rand = seeded(seed);
  const points: [number, number][] = [[-70, base]];
  let x = -70;
  while (x < 2470) {
    x += size * (0.62 + rand() * 0.76);
    const roll = 0.5 + 0.5 * Math.sin(x / 150 + seed);
    points.push([x, base - swell * roll * (0.55 + rand() * 0.45)]);
  }
  const { d, echo } = scallops(rand, points, 3);
  return { d: `M-70 400V${base}${d}V400Z`, echo };
}

const BANK_FAR = bank(11, 146, 46, 120);
const BANK_MID = bank(23, 206, 44, 104);
const BANK_NEAR = bank(37, 258, 40, 92);

// The sea of cloud the mountain stands in: three banks, each one nearer,
// paler and more firmly outlined than the one behind it
function CloudSea() {
  return (
    <svg
      aria-hidden="true"
      className="u26-clouds"
      preserveAspectRatio="xMidYMax slice"
      viewBox="0 0 2400 400"
    >
      <defs>
        <pattern
          height="10"
          id="u26-cloud-dots"
          patternUnits="userSpaceOnUse"
          width="10"
        >
          <circle className="u26-cloud-dot" cx="2.5" cy="2.5" r="1.7" />
          <circle className="u26-cloud-dot" cx="7.5" cy="7.5" r="1.7" />
        </pattern>
        <linearGradient id="u26-cloud-fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask id="u26-cloud-shade" maskContentUnits="objectBoundingBox">
          <rect fill="url(#u26-cloud-fade)" height="1" width="1" />
        </mask>
      </defs>
      <path className="far" d={BANK_FAR.d} />
      <path className="mid" d={BANK_MID.d} />
      <path className="echo echo--mid" d={BANK_MID.echo} />
      <path className="near" d={BANK_NEAR.d} />
      <path className="dots" d={BANK_NEAR.d} mask="url(#u26-cloud-shade)" />
      <path className="echo" d={BANK_NEAR.echo} />
    </svg>
  );
}

// A loose cloud. The dots and their fade are defined once, in CloudSea.
function Cloud({
  seed,
  w,
  h,
  bumps,
  className,
}: {
  seed: number;
  w: number;
  h: number;
  bumps: number;
  className: string;
}) {
  const shape = cloud(seed, w, h, bumps);
  return (
    <svg
      aria-hidden="true"
      className={`u26-cloud ${className}`}
      viewBox={`0 0 ${w} ${h}`}
    >
      <path className="near" d={shape.d} />
      <path className="dots" d={shape.d} mask="url(#u26-cloud-shade)" />
      <path className="echo" d={shape.echo} />
    </svg>
  );
}

function Plane({
  top,
  delay,
  fly,
}: {
  top: string;
  delay: string;
  fly: string;
}) {
  const vars: Vars = { top, left: "-60px", "--delay": delay, "--fly": fly };
  return (
    <svg
      aria-hidden="true"
      className="u26-plane"
      style={vars}
      viewBox="0 0 46 30"
    >
      <path d="M1 13 L45 1 L27 29 L21 18Z" fill="var(--paper-3)" />
      <path d="M45 1 L21 18 L19 27 L27 29" fill="var(--paper-2)" />
    </svg>
  );
}

const depth = (d: number): Vars => ({ "--d": d });

export function HeroScene() {
  return (
    <div aria-hidden="true" className="u26-scene">
      <div className="u26-layer" style={depth(-5)}>
        <div className="u26-rays" />
        <div className="u26-sun" />
      </div>
      <div className="u26-layer" style={depth(-11)}>
        <CloudSea />
        <Cloud bumps={5} className="u26-cloud--a" h={74} seed={5} w={210} />
        <Cloud bumps={4} className="u26-cloud--b" h={60} seed={9} w={170} />
        <Plane delay="-3s" fly="31s" top="24%" />
        <Plane delay="-17s" fly="38s" top="38%" />
        <Plane delay="-26s" fly="27s" top="14%" />
      </div>
      <div className="u26-layer" style={depth(-19)}>
        <Mountain />
        <Cloud
          bumps={6}
          className="u26-cloud--front"
          h={96}
          seed={14}
          w={300}
        />
        <p className="u26-sign u26-hand">
          <b>3,800</b>
          applications
        </p>
      </div>
      <div className="u26-layer" style={depth(-27)}>
        <svg
          aria-hidden="true"
          className="u26-ground"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
        >
          <path d="M0 120 V58 C240 20 420 76 720 50 C1000 26 1220 70 1440 34 V120Z" />
        </svg>
      </div>
    </div>
  );
}
