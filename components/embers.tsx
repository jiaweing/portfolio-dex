"use client";

import { useEffect, useRef } from "react";
import { findSeasonalEgg } from "@/lib/easter-eggs";

type Ember = {
  x: number;
  y: number;
  r: number;
  vy: number;
  sway: number;
  phase: number;
  life: number;
  maxLife: number;
  hue: number;
  ghost: boolean;
  /** Last drawn x, used to hit test clicks on ghosts */
  drawnX: number;
};

const COUNT = 60;
const GHOST_CHANCE = 0.08;

// Floaty sheet ghost: round head, sides that flare out and a hem that ripples
function drawGhost(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  alpha: number,
  isDark: boolean,
  phase: number
) {
  const w = size;
  const h = size * 1.4;
  const flare = w * 0.62;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.cos(phase) * 0.22);
  ctx.fillStyle = isDark
    ? `rgba(255, 255, 255, ${alpha * 0.85})`
    : `rgba(113, 113, 122, ${alpha * 0.7})`;

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
  ctx.restore();
}

// Sparks and the odd ghost drifting up from the bottom, snow in reverse
export function Embers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!(canvas && ctx)) return;

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

    const spawn = (scattered: boolean): Ember => {
      const ghost = Math.random() < GHOST_CHANCE;
      const maxLife = ghost ? 8 + Math.random() * 4 : 4 + Math.random() * 5;
      return {
        drawnX: 0,
        ghost,
        x: Math.random() * width,
        y: scattered ? Math.random() * height : height + 10,
        r: ghost ? 10 + Math.random() * 6 : 1 + Math.random() * 2,
        vy: ghost ? 20 + Math.random() * 20 : 25 + Math.random() * 60,
        sway: ghost ? 20 + Math.random() * 20 : 10 + Math.random() * 25,
        phase: Math.random() * Math.PI * 2,
        life: scattered ? Math.random() * maxLife : 0,
        maxLife,
        hue: 15 + Math.random() * 30,
      };
    };

    const embers = Array.from({ length: COUNT }, () => spawn(true));
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life += dt;
        e.y -= e.vy * dt;
        e.phase += dt * 1.6;
        const x = e.x + Math.sin(e.phase) * e.sway;
        e.drawnX = x;

        if (e.life >= e.maxLife || e.y < -20) {
          embers[i] = spawn(false);
          continue;
        }

        // Fade in quickly, flicker, then burn out near the end of life
        const t = e.life / e.maxLife;
        const fade = Math.min(1, t * 6) * (1 - t);
        if (e.ghost) {
          drawGhost(ctx, x, e.y, e.r, fade, isDark, e.phase);
          continue;
        }
        const flicker = 0.7 + Math.random() * 0.3;
        const alpha = fade * flicker;

        ctx.fillStyle = `hsla(${e.hue}, 95%, 55%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(tick);
    };

    // The canvas ignores pointer events, so catch ghosts from window clicks
    const onPointerDown = (event: PointerEvent) => {
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        if (!e.ghost) continue;
        const dx = event.clientX - e.drawnX;
        const dy = event.clientY - (e.y + e.r * 0.3);
        if (dx * dx + dy * dy <= (e.r * 1.1) ** 2) {
          embers[i] = spawn(false);
          findSeasonalEgg("ghostbuster", "halloween");
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
  }, []);

  return (
    <canvas
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 h-screen w-screen"
      ref={canvasRef}
    />
  );
}
