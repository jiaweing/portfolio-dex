"use client";

import { useEffect, useRef } from "react";
import { type EggId, findSeasonalEgg } from "@/lib/easter-eggs";
import type { Season } from "@/lib/seasons";

type Shape = "dot" | "ghost" | "egg" | "heart" | "petal" | "packet";
type Range = [number, number];

type Kind = {
  shape: Shape;
  weight: number;
  colors: (isDark: boolean) => string[];
  size: Range;
  speed: Range;
  sway: Range;
  /** Seconds a particle lives before respawning */
  life: Range;
  /** Clicking one of these unlocks a seasonal egg */
  catchable?: { egg: EggId; season: Season };
};

type Config = { direction: "up" | "down"; count: number; kinds: Kind[] };

export type ParticleEffect = "embers" | "eggs" | "hearts" | "blossoms";

const fixed = (colors: string[]) => () => colors;

const CONFIGS: Record<ParticleEffect, Config> = {
  // Sparks and the odd ghost drifting up, snow in reverse
  embers: {
    direction: "up",
    count: 60,
    kinds: [
      {
        shape: "dot",
        weight: 0.92,
        colors: fixed([
          "hsl(15, 95%, 55%)",
          "hsl(28, 95%, 55%)",
          "hsl(40, 95%, 55%)",
        ]),
        size: [1, 3],
        speed: [25, 85],
        sway: [10, 35],
        life: [4, 9],
      },
      {
        shape: "ghost",
        weight: 0.08,
        colors: (dark) =>
          dark ? ["rgba(255, 255, 255, 0.85)"] : ["rgba(113, 113, 122, 0.7)"],
        size: [10, 16],
        speed: [20, 40],
        sway: [20, 40],
        life: [8, 12],
        catchable: { egg: "ghostbuster", season: "halloween" },
      },
    ],
  },
  // Pastel eggs tumbling down, with a rare golden one
  eggs: {
    direction: "down",
    count: 35,
    kinds: [
      {
        shape: "egg",
        weight: 0.95,
        colors: fixed(["#f9a8d4", "#fde68a", "#a5f3fc", "#c4b5fd", "#bbf7d0"]),
        size: [6, 10],
        speed: [25, 55],
        sway: [10, 30],
        life: [40, 40],
      },
      {
        shape: "egg",
        weight: 0.05,
        colors: fixed(["#eab308"]),
        size: [9, 12],
        speed: [30, 45],
        sway: [10, 25],
        life: [40, 40],
        catchable: { egg: "goldenegg", season: "easter" },
      },
    ],
  },
  hearts: {
    direction: "up",
    count: 40,
    kinds: [
      {
        shape: "heart",
        weight: 1,
        colors: fixed(["#f43f5e", "#ec4899", "#fb7185", "#e11d48"]),
        size: [4, 9],
        speed: [20, 50],
        sway: [10, 30],
        life: [6, 12],
        catchable: { egg: "smitten", season: "valentines" },
      },
    ],
  },
  // Plum blossom petals and gold flecks, with the odd red packet
  blossoms: {
    direction: "down",
    count: 45,
    kinds: [
      {
        shape: "petal",
        weight: 0.8,
        colors: fixed(["#f9a8d4", "#fbcfe8", "#f472b6"]),
        size: [4, 7],
        speed: [20, 45],
        sway: [15, 40],
        life: [40, 40],
      },
      {
        shape: "dot",
        weight: 0.14,
        colors: fixed(["#facc15", "#eab308"]),
        size: [1, 2],
        speed: [20, 40],
        sway: [10, 25],
        life: [40, 40],
      },
      {
        shape: "packet",
        weight: 0.06,
        colors: fixed(["#dc2626"]),
        size: [9, 12],
        speed: [25, 40],
        sway: [10, 25],
        life: [40, 40],
        catchable: { egg: "huat", season: "lunarnewyear" },
      },
    ],
  },
};

type Particle = {
  kind: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  sway: number;
  phase: number;
  spin: number;
  rotation: number;
  life: number;
  maxLife: number;
  colorIndex: number;
  /** Last drawn x, used to hit test clicks */
  drawnX: number;
};

const between = ([min, max]: Range) => min + Math.random() * (max - min);

// Floaty sheet ghost: round head, sides that flare out and a hem that ripples
function drawGhost(ctx: CanvasRenderingContext2D, size: number, phase: number) {
  const w = size;
  const h = size * 1.4;
  const flare = w * 0.62;
  ctx.rotate(Math.cos(phase) * 0.22);
  ctx.beginPath();
  ctx.moveTo(-w / 2, 0);
  ctx.arc(0, 0, w / 2, Math.PI, 0);
  ctx.bezierCurveTo(w / 2, h * 0.35, flare, h * 0.55, flare, h * 0.8);
  const waves = 4;
  const step = (flare * 2) / waves;
  for (let i = 0; i < waves; i++) {
    const startX = flare - step * i;
    const ripple = Math.sin(phase * 3 + i * 1.7) * size * 0.08;
    const dip = i % 2 === 0 ? size * 0.22 : size * 0.12;
    ctx.quadraticCurveTo(
      startX - step / 2,
      h * 0.8 - dip + ripple,
      startX - step,
      h * 0.8 + ripple * 0.5
    );
  }
  ctx.bezierCurveTo(-flare, h * 0.55, -w / 2, h * 0.35, -w / 2, 0);
  ctx.closePath();
  ctx.fill();

  // Eyes and a little "oo" mouth punched out of the sheet
  ctx.globalCompositeOperation = "destination-out";
  for (const [ex, ey, rx, ry, rot] of [
    [-w * 0.17, -w * 0.02, w * 0.075, w * 0.11, -0.15],
    [w * 0.17, -w * 0.02, w * 0.075, w * 0.11, 0.15],
    [0, w * 0.22, w * 0.06, w * 0.08, 0],
  ]) {
    ctx.beginPath();
    ctx.ellipse(ex, ey, rx, ry, rot, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawEgg(
  ctx: CanvasRenderingContext2D,
  size: number,
  rotation: number
) {
  const w = size * 0.8;
  const h = size;
  ctx.rotate(rotation);
  ctx.beginPath();
  // Narrower on top, rounder at the bottom
  ctx.moveTo(0, -h);
  ctx.bezierCurveTo(w, -h, w, h, 0, h);
  ctx.bezierCurveTo(-w, h, -w, -h, 0, -h);
  ctx.fill();
  // A white zigzag band like a painted egg
  ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
  ctx.lineWidth = Math.max(1, size * 0.14);
  ctx.beginPath();
  const zig = 4;
  for (let i = 0; i <= zig; i++) {
    const x = -w * 0.68 + (w * 1.36 * i) / zig;
    const y = i % 2 === 0 ? -size * 0.08 : size * 0.12;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawHeart(ctx: CanvasRenderingContext2D, size: number, phase: number) {
  ctx.rotate(Math.sin(phase) * 0.25);
  const s = size;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.35);
  ctx.bezierCurveTo(-s * 1.1, -s * 0.35, -s * 0.45, -s * 1.05, 0, -s * 0.4);
  ctx.bezierCurveTo(s * 0.45, -s * 1.05, s * 1.1, -s * 0.35, 0, s * 0.35);
  ctx.fill();
}

function drawPetal(
  ctx: CanvasRenderingContext2D,
  size: number,
  rotation: number
) {
  ctx.rotate(rotation);
  ctx.beginPath();
  ctx.ellipse(0, 0, size * 0.5, size, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawPacket(
  ctx: CanvasRenderingContext2D,
  size: number,
  rotation: number
) {
  const w = size;
  const h = size * 1.35;
  ctx.rotate(rotation * 0.3);
  ctx.beginPath();
  ctx.roundRect(-w / 2, -h / 2, w, h, size * 0.15);
  ctx.fill();
  // Gold flap and coin
  ctx.fillStyle = "#facc15";
  ctx.beginPath();
  ctx.moveTo(-w / 2, -h / 2 + h * 0.18);
  ctx.quadraticCurveTo(0, -h / 2 + h * 0.42, w / 2, -h / 2 + h * 0.18);
  ctx.lineTo(w / 2, -h / 2 + h * 0.24);
  ctx.quadraticCurveTo(0, -h / 2 + h * 0.48, -w / 2, -h / 2 + h * 0.24);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(0, h * 0.08, size * 0.16, 0, Math.PI * 2);
  ctx.fill();
}

export function SeasonalParticles({ effect }: { effect: ParticleEffect }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!(canvas && ctx)) return;
    const config = CONFIGS[effect];
    const totalWeight = config.kinds.reduce((sum, k) => sum + k.weight, 0);
    const dir = config.direction === "up" ? -1 : 1;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const pickKind = () => {
      let roll = Math.random() * totalWeight;
      for (const [i, kind] of config.kinds.entries()) {
        roll -= kind.weight;
        if (roll <= 0) return i;
      }
      return 0;
    };

    const spawn = (scattered: boolean): Particle => {
      const kind = pickKind();
      const k = config.kinds[kind];
      const maxLife = between(k.life);
      const edge = dir === -1 ? height + 20 : -20;
      return {
        kind,
        x: Math.random() * width,
        y: scattered ? Math.random() * height : edge,
        size: between(k.size),
        speed: between(k.speed),
        sway: between(k.sway),
        phase: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 2,
        rotation: Math.random() * Math.PI * 2,
        life: scattered ? Math.random() * maxLife * 0.6 : 0,
        maxLife,
        colorIndex: Math.floor(Math.random() * 8),
        drawnX: 0,
      };
    };

    const particles = Array.from({ length: config.count }, () => spawn(true));
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const k = config.kinds[p.kind];
        p.life += dt;
        p.y += dir * p.speed * dt;
        p.phase += dt * 1.6;
        p.rotation += p.spin * dt;
        const x = p.x + Math.sin(p.phase) * p.sway;
        p.drawnX = x;

        const offscreen = p.y < -40 || p.y > height + 40;
        if (p.life >= p.maxLife || offscreen) {
          particles[i] = spawn(false);
          continue;
        }

        // Fade in quickly and out at the end of life
        const t = p.life / p.maxLife;
        const fade = Math.min(1, t * 6) * Math.min(1, (1 - t) * 4);
        const flicker = k.shape === "dot" ? 0.7 + Math.random() * 0.3 : 1;
        const colors = k.colors(isDark);

        ctx.save();
        ctx.globalAlpha = fade * flicker;
        ctx.fillStyle = colors[p.colorIndex % colors.length];
        ctx.translate(x, p.y);
        switch (k.shape) {
          case "ghost":
            drawGhost(ctx, p.size, p.phase);
            break;
          case "egg":
            drawEgg(ctx, p.size, Math.sin(p.phase) * 0.5);
            break;
          case "heart":
            drawHeart(ctx, p.size, p.phase);
            break;
          case "petal":
            drawPetal(ctx, p.size, p.rotation);
            break;
          case "packet":
            drawPacket(ctx, p.size, Math.sin(p.phase));
            break;
          default:
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
      }

      frame = requestAnimationFrame(tick);
    };

    // The canvas ignores pointer events, so catch particles from window clicks
    const onPointerDown = (event: PointerEvent) => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const catchable = config.kinds[p.kind].catchable;
        if (!catchable) continue;
        const centerY =
          config.kinds[p.kind].shape === "ghost" ? p.y + p.size * 0.3 : p.y;
        const dx = event.clientX - p.drawnX;
        const dy = event.clientY - centerY;
        if (dx * dx + dy * dy <= (p.size * 1.3) ** 2) {
          particles[i] = spawn(false);
          findSeasonalEgg(catchable.egg, catchable.season);
          return;
        }
      }
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [effect]);

  return (
    <canvas
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 h-screen w-screen"
      ref={canvasRef}
    />
  );
}
