"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export const PALETTE = [
  "#a855f7",
  "#ec4899",
  "#f97316",
  "#facc15",
  "#22d3ee",
  "#ffffff",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  color: string;
  // Rockets fly up and burst when they slow down
  rocket?: boolean;
}

export interface BurstHandle {
  burst: (x: number, y: number, count?: number, power?: number) => void;
  setFireworks: (on: boolean) => void;
}

const MAX_PARTICLES = 2200;

function spawn(
  list: Particle[],
  x: number,
  y: number,
  count: number,
  power: number
) {
  for (let i = 0; i < count && list.length < MAX_PARTICLES; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() ** 0.6 * power;
    list.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      decay: 0.008 + Math.random() * 0.018,
      size: 1 + Math.random() * 2.6,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    });
  }
}

function launchRocket(list: Particle[], w: number, h: number) {
  list.push({
    x: w * (0.15 + Math.random() * 0.7),
    y: h + 10,
    vx: (Math.random() - 0.5) * 2,
    vy: -(h / 48 + Math.random() * 6),
    life: 1,
    decay: 0,
    size: 2.5,
    color: "#ffffff",
    rocket: true,
  });
}

// Moves one particle a frame. Returns false once it should be removed.
function step(list: Particle[], p: Particle): boolean {
  if (p.rocket) {
    p.vy += 0.28;
    p.x += p.vx;
    p.y += p.vy;
    if (p.vy >= -1.5) {
      spawn(list, p.x, p.y, 140 + Math.random() * 120, 9 + Math.random() * 5);
      return false;
    }
    return true;
  }
  p.vx *= 0.955;
  p.vy = p.vy * 0.955 + 0.12;
  p.x += p.vx;
  p.y += p.vy;
  p.life -= p.decay;
  return p.life > 0;
}

// Streaks: a short line along the direction of travel
function draw(ctx: CanvasRenderingContext2D, p: Particle) {
  ctx.strokeStyle = p.color;
  ctx.globalAlpha = Math.max(0, p.life);
  ctx.lineWidth = p.size;
  ctx.beginPath();
  ctx.moveTo(p.x - p.vx * 2.5, p.y - p.vy * 2.5);
  ctx.lineTo(p.x, p.y);
  ctx.stroke();
}

// One screen sized canvas for every explosion on the page. Additive blending
// makes overlapping sparks glow instead of stacking as flat dots.
export const BurstCanvas = forwardRef<BurstHandle, { enabled?: boolean }>(
  function BurstCanvas({ enabled = true }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const fireworks = useRef(false);
    const enabledRef = useRef(enabled);
    enabledRef.current = enabled;

    useImperativeHandle(ref, () => ({
      burst: (x, y, count = 260, power = 16) => {
        if (enabledRef.current) {
          spawn(particles.current, x, y, count, power);
        }
      },
      setFireworks: (on) => {
        fireworks.current = on;
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!(canvas && ctx)) {
        return;
      }

      const dpr = Math.min(window.devicePixelRatio, 2);
      const resize = () => {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.lineCap = "round";
      };
      resize();
      window.addEventListener("resize", resize);

      let raf = 0;
      let nextRocket = 0;
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        const w = window.innerWidth;
        const h = window.innerHeight;
        const list = particles.current;

        if (fireworks.current && enabledRef.current && now > nextRocket) {
          nextRocket = now + 420 + Math.random() * 500;
          launchRocket(list, w, h);
        }

        ctx.clearRect(0, 0, w, h);
        if (list.length === 0) {
          return;
        }
        ctx.globalCompositeOperation = "lighter";
        for (let i = list.length - 1; i >= 0; i--) {
          const p = list[i];
          if (step(list, p)) {
            draw(ctx, p);
          } else {
            list.splice(i, 1);
          }
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";
      };
      raf = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", resize);
      };
    }, []);

    return (
      <canvas
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[15] h-full w-full"
        ref={canvasRef}
      />
    );
  }
);
