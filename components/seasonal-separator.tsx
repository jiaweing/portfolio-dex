"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  type SeasonalEffect,
  useSeasonalEffect,
} from "@/hooks/use-seasonal-effect";
import { cn } from "@/lib/utils";

// The SVG straddles the bottom edge of the page: things pile up above EDGE
// and hang below it, over the top of the revealed footer.
const HEIGHT = 72;
const EDGE = 26;

// Deterministic noise so shapes don't jump around between renders
const rand = (i: number, salt = 0) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43_758.5453;
  return x - Math.floor(x);
};

// A string that dips between pegs, returned as a path plus the low points
function sagString(width: number, spacing: number, sag: number, y = EDGE) {
  const pegs = Math.ceil(width / spacing) + 1;
  let d = `M 0 ${y}`;
  const lows: { x: number; y: number }[] = [];
  for (let i = 0; i < pegs; i++) {
    const x0 = i * spacing;
    const x1 = x0 + spacing;
    d += ` Q ${x0 + spacing / 2} ${y + sag * 2} ${x1} ${y}`;
    lows.push({ x: x0 + spacing / 2, y: y + sag });
  }
  return { d, lows };
}

// Points spread evenly along a sagging span, for bulbs and flags
function alongSag(
  width: number,
  spacing: number,
  sag: number,
  perSpan: number
) {
  const points: { x: number; y: number; angle: number }[] = [];
  const pegs = Math.ceil(width / spacing) + 1;
  for (let i = 0; i < pegs; i++) {
    for (let j = 1; j <= perSpan; j++) {
      const t = j / (perSpan + 1);
      const x = i * spacing + t * spacing;
      // Quadratic bezier from peg to peg with control point at 2x sag
      const y = EDGE + 2 * (1 - t) * t * sag * 2;
      const slope = 2 * (1 - 2 * t) * sag * 2;
      points.push({
        x,
        y,
        angle: (Math.atan2(slope, spacing) * 180) / Math.PI,
      });
    }
  }
  return points;
}

function Christmas({ width }: { width: number }) {
  // A low snowdrift: gentle rolling top smoothed through midpoints
  const step = 46;
  const tops: { x: number; y: number }[] = [];
  for (let x = -step; x <= width + step * 2; x += step) {
    tops.push({ x, y: EDGE - 3 - rand(x, 1) * 6 });
  }
  let snow = `M ${tops[0].x} ${EDGE + 3} L ${tops[0].x} ${tops[0].y}`;
  for (let i = 1; i < tops.length - 1; i++) {
    const midX = (tops[i].x + tops[i + 1].x) / 2;
    const midY = (tops[i].y + tops[i + 1].y) / 2;
    snow += ` Q ${tops[i].x} ${tops[i].y} ${midX} ${midY}`;
  }
  snow += ` L ${width + step * 2} ${EDGE + 3} Z`;

  // A few icicles hanging off the drift
  const icicles: string[] = [];
  for (let x = 20; x < width; x += 26) {
    if (rand(x, 11) < 0.55) continue;
    const len = 4 + rand(x, 12) * 9;
    const w = 2 + rand(x, 13) * 2;
    icicles.push(
      `M ${x - w} ${EDGE + 2} L ${x + w} ${EDGE + 2} L ${x} ${EDGE + 2 + len} Z`
    );
  }

  const spacing = 110;
  const wire = sagString(width, spacing, 9, EDGE + 3);
  const bulbs = alongSag(width, spacing, 9, 3);
  const colors = ["#ef4444", "#22c55e", "#facc15", "#3b82f6"];

  return (
    <>
      <path className="fill-white drop-shadow-sm dark:fill-zinc-100" d={snow} />
      <path
        className="fill-sky-100 dark:fill-sky-200/80"
        d={icicles.join(" ")}
      />
      <path
        className="stroke-zinc-500/60"
        d={wire.d}
        fill="none"
        strokeWidth="1.2"
      />
      {bulbs.map((b, i) => (
        <g
          key={`${b.x}`}
          transform={`translate(${b.x} ${b.y + 3}) rotate(${b.angle})`}
        >
          <rect
            className="fill-zinc-600"
            height="4"
            rx="1"
            width="4"
            x="-2"
            y="0"
          />
          <ellipse
            className="seasonal-twinkle"
            cx="0"
            cy="8"
            fill={colors[i % colors.length]}
            rx="3.2"
            ry="4.6"
            style={{ animationDelay: `${(i % 7) * 0.35}s` }}
          />
        </g>
      ))}
    </>
  );
}

function Halloween({ width }: { width: number }) {
  // One goo layer: a wavy top, drips of varying length, purple blending into lime
  const band = 4;
  let slime = `M 0 ${EDGE - 2}`;
  for (let x = 0; x <= width; x += 30) {
    slime += ` Q ${x + 15} ${EDGE - 4 - rand(x, 21) * 3} ${x + 30} ${EDGE - 2}`;
  }
  slime += ` L ${width} ${EDGE + band}`;
  const step = 24;
  for (let x = width; x > 0; x -= step) {
    const drip = rand(x, 2) > 0.45 ? 5 + rand(x, 3) * 20 : 0;
    const cx = x - step / 2 + (rand(x, 4) - 0.5) * 8;
    const w = 3 + rand(x, 5) * 2;
    if (drip) {
      slime += ` L ${cx + w + 2} ${EDGE + band} Q ${cx + w} ${EDGE + band + 2} ${cx + w - 0.5} ${EDGE + drip}`;
      slime += ` A ${w} ${w} 0 0 1 ${cx - w + 0.5} ${EDGE + drip} Q ${cx - w} ${EDGE + band + 2} ${cx - w - 2} ${EDGE + band}`;
    }
    slime += ` L ${x - step} ${EDGE + band}`;
  }
  slime += " Z";

  const bubbles = Array.from({ length: Math.ceil(width / 70) }, (_, i) => ({
    x: 20 + i * 70 + rand(i, 22) * 40,
    r: 0.8 + rand(i, 23) * 1.2,
  }));

  // Jack-o'-lanterns sitting on the ledge
  const pumpkins = Array.from({ length: Math.ceil(width / 190) }, (_, i) => ({
    x: 70 + i * 190 + rand(i, 14) * 50,
    scale: 0.8 + rand(i, 15) * 0.45,
  }));

  const spiders = Array.from({ length: Math.ceil(width / 260) }, (_, i) => ({
    x: 130 + i * 260 + rand(i, 4) * 60,
    len: 14 + rand(i, 5) * 18,
  }));

  return (
    <>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="seasonal-goo"
          spreadMethod="reflect"
          x1="0"
          x2="120"
          y1="0"
          y2="0"
        >
          {/* Short blend zone so the colours never mix into a muddy grey */}
          <stop offset="0" stopColor="#c084fc" />
          <stop offset="0.44" stopColor="#c084fc" />
          <stop offset="0.56" stopColor="#a3e635" />
          <stop offset="1" stopColor="#a3e635" />
        </linearGradient>
      </defs>
      <path d={slime} fill="url(#seasonal-goo)" />
      {bubbles.map((b) => (
        <circle
          className="fill-white/60"
          cx={b.x}
          cy={EDGE + 1}
          key={b.x}
          r={b.r}
        />
      ))}
      {pumpkins.map((p, i) => (
        <g
          key={p.x}
          transform={`translate(${p.x} ${EDGE - 3}) scale(${p.scale})`}
        >
          <path
            className="fill-green-700"
            d="M -1 -15 q 1 -5 4 -6 l 0.8 1.6 q -2 1 -2.4 4.4 Z"
          />
          <ellipse
            className="fill-orange-600"
            cx="-5"
            cy="-7.5"
            rx="6.5"
            ry="7.5"
          />
          <ellipse
            className="fill-orange-600"
            cx="5"
            cy="-7.5"
            rx="6.5"
            ry="7.5"
          />
          <ellipse
            className="fill-orange-500"
            cx="0"
            cy="-7.8"
            rx="5.5"
            ry="8"
          />
          <g
            className="seasonal-twinkle fill-yellow-300"
            style={{
              animationDelay: `${i * 0.45}s`,
              animationDuration: "1.1s",
            }}
          >
            <path d="M -6 -10 l 3 -3 l 1.5 3.5 Z" />
            <path d="M 6 -10 l -3 -3 l -1.5 3.5 Z" />
            <path d="M -6 -5.5 q 6 4.5 12 0 l -2 0.5 l -1 1.3 l -1.5 -1.3 l -1.5 1.3 l -1.5 -1.3 l -1.5 1.3 l -1 -1.3 Z" />
          </g>
        </g>
      ))}
      {spiders.map((s, i) => (
        <g
          className="seasonal-bob"
          key={s.x}
          style={{ animationDelay: `${i * 0.6}s` }}
        >
          <line
            className="stroke-zinc-400"
            strokeWidth="0.8"
            x1={s.x}
            x2={s.x}
            y1={EDGE + 3}
            y2={EDGE + s.len}
          />
          <g
            className="fill-zinc-800 stroke-zinc-800 dark:fill-zinc-200 dark:stroke-zinc-200"
            transform={`translate(${s.x} ${EDGE + s.len + 4})`}
          >
            <ellipse cx="0" cy="0" rx="3.4" ry="4" />
            <circle cx="0" cy="-4.5" r="2.4" />
            {[-1, 1].map((side) =>
              [-3, -1, 1, 3].map((y) => (
                <path
                  d={`M ${side * 2.5} ${y * 0.8} q ${side * 3} -3 ${side * 5.5} ${1 + y * 0.6}`}
                  fill="none"
                  key={`${side}${y}`}
                  strokeWidth="0.8"
                />
              ))
            )}
          </g>
        </g>
      ))}
    </>
  );
}

function NewYear({ width }: { width: number }) {
  const spacing = 150;
  const string = sagString(width, spacing, 8);
  const flags = alongSag(width, spacing, 8, 5);
  const colors = ["#facc15", "#ec4899", "#38bdf8", "#a78bfa", "#f97316"];
  return (
    <>
      <path
        className="stroke-zinc-400"
        d={string.d}
        fill="none"
        strokeWidth="1"
      />
      {flags.map((f, i) => (
        <path
          d="M -7 0 L 7 0 L 0 15 Z"
          fill={colors[i % colors.length]}
          key={`${f.x}`}
          transform={`translate(${f.x} ${f.y}) rotate(${f.angle})`}
        />
      ))}
    </>
  );
}

function LunarNewYear({ width }: { width: number }) {
  const spacing = 130;
  const string = sagString(width, spacing, 6);
  return (
    <>
      <path
        className="stroke-red-700/70"
        d={string.d}
        fill="none"
        strokeWidth="1.2"
      />
      {string.lows.map((l, i) => (
        <g
          className="seasonal-sway"
          key={`${l.x}`}
          style={{
            animationDelay: `${i * 0.4}s`,
            transformOrigin: `${l.x}px ${l.y}px`,
          }}
        >
          <line
            className="stroke-yellow-500"
            strokeWidth="1"
            x1={l.x}
            x2={l.x}
            y1={l.y}
            y2={l.y + 4}
          />
          <rect
            className="fill-yellow-500"
            height="2.4"
            rx="0.8"
            width="9"
            x={l.x - 4.5}
            y={l.y + 4}
          />
          <ellipse
            className="fill-red-600"
            cx={l.x}
            cy={l.y + 13.5}
            rx="9"
            ry="7.5"
          />
          <path
            className="stroke-red-800/80"
            d={`M ${l.x} ${l.y + 6.5} v 14 M ${l.x - 4.5} ${l.y + 7.5} c -2 3.5 -2 8.5 0 12 M ${l.x + 4.5} ${l.y + 7.5} c 2 3.5 2 8.5 0 12`}
            fill="none"
            strokeWidth="0.7"
          />
          <rect
            className="fill-yellow-500"
            height="2.4"
            rx="0.8"
            width="9"
            x={l.x - 4.5}
            y={l.y + 20.5}
          />
          <path
            className="stroke-red-600"
            d={`M ${l.x} ${l.y + 23} v 7 M ${l.x - 2} ${l.y + 23.5} v 5.5 M ${l.x + 2} ${l.y + 23.5} v 5.5`}
            strokeWidth="0.9"
          />
        </g>
      ))}
    </>
  );
}

function Valentines({ width }: { width: number }) {
  const spacing = 140;
  const string = sagString(width, spacing, 7);
  const hearts = alongSag(width, spacing, 7, 4);
  return (
    <>
      <path
        className="stroke-rose-300 dark:stroke-rose-400/60"
        d={string.d}
        fill="none"
        strokeWidth="1"
      />
      {hearts.map((h, i) => (
        <g
          className="seasonal-beat"
          key={`${h.x}`}
          style={{
            animationDelay: `${(i % 5) * 0.3}s`,
            transformOrigin: `${h.x}px ${h.y + 8}px`,
          }}
        >
          <path
            d={`M ${h.x} ${h.y + 14} c -9 -6 -9 -14 -3.5 -14 c 2 0 3 1 3.5 2.5 c 0.5 -1.5 1.5 -2.5 3.5 -2.5 c 5.5 0 5.5 8 -3.5 14 Z`}
            fill={i % 2 === 0 ? "#f43f5e" : "#f9a8d4"}
          />
        </g>
      ))}
    </>
  );
}

function Easter({ width }: { width: number }) {
  // Grass blades growing up from the edge
  const blades: string[] = [];
  for (let x = 0; x < width; x += 5) {
    const h = 6 + rand(x, 6) * 12;
    const lean = (rand(x, 7) - 0.5) * 6;
    blades.push(
      `M ${x - 2.5} ${EDGE + 2} Q ${x + lean * 0.4} ${EDGE - h * 0.5} ${x + lean} ${EDGE - h} Q ${x + lean * 0.2 + 1} ${EDGE - h * 0.5} ${x + 2.5} ${EDGE + 2} Z`
    );
  }
  const eggs = Array.from({ length: Math.ceil(width / 150) }, (_, i) => ({
    x: 60 + i * 150 + rand(i, 8) * 50,
    tilt: (rand(i, 9) - 0.5) * 30,
    color: ["#f9a8d4", "#fde68a", "#a5f3fc", "#c4b5fd", "#bbf7d0"][i % 5],
  }));
  return (
    <>
      <rect
        className="fill-green-500 dark:fill-green-600"
        height="4"
        width={width}
        x="0"
        y={EDGE - 1}
      />
      {eggs.map((e) => (
        <g
          key={e.x}
          transform={`translate(${e.x} ${EDGE - 7}) rotate(${e.tilt})`}
        >
          <path d="M 0 -9 C 7 -9 7 8 0 8 C -7 8 -7 -9 0 -9 Z" fill={e.color} />
          <path
            className="stroke-white/90"
            d="M -5 -1 L -2.5 1.5 L 0 -1 L 2.5 1.5 L 5 -1"
            fill="none"
            strokeWidth="1.3"
          />
        </g>
      ))}
      <path
        className="fill-green-500 dark:fill-green-600"
        d={blades.join(" ")}
      />
    </>
  );
}

const SCENES: Record<
  NonNullable<SeasonalEffect>,
  (p: { width: number }) => React.ReactNode
> = {
  snow: Christmas,
  embers: Halloween,
  confetti: NewYear,
  blossoms: LunarNewYear,
  hearts: Valentines,
  eggs: Easter,
};

/**
 * Seasonal trim straddling an edge of the nearest `relative` parent. By default
 * it sits on the bottom edge where the page meets the footer; `edge="top"`
 * hangs it from the top of a container instead, like a table header.
 */
export function SeasonalSeparator({
  edge = "bottom",
  className = "hidden lg:block",
}: {
  edge?: "top" | "bottom";
  className?: string;
}) {
  const effect = useSeasonalEffect();
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(Math.round(entry.contentRect.width))
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Scene = effect ? SCENES[effect] : null;
  const content = useMemo(
    () => (Scene && width > 0 ? <Scene width={width} /> : null),
    [Scene, width]
  );

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-x-0 z-20", className)}
      ref={ref}
      style={
        edge === "bottom"
          ? { bottom: -(HEIGHT - EDGE), height: HEIGHT }
          : { top: -EDGE, height: HEIGHT }
      }
    >
      {content && (
        <svg
          className="overflow-visible"
          height={HEIGHT}
          viewBox={`0 0 ${width} ${HEIGHT}`}
          width={width}
          xmlns="http://www.w3.org/2000/svg"
        >
          {content}
        </svg>
      )}
    </div>
  );
}
