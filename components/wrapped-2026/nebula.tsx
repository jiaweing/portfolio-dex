"use client";

import { Mesh, Program, Renderer, Triangle } from "ogl";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Domain warped fbm, tinted with a four colour palette. uPulse flashes the
// whole field brighter and pushes the warp outwards when something explodes.
const fragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uPulse;
varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = r * p * 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 m = (uMouse - 0.5) * vec2(uRes.x / uRes.y, 1.0);
  float t = uTime * 0.06;

  // Pull the field towards the pointer and blow it outwards on a pulse
  vec2 toMouse = uv - m;
  uv += normalize(toMouse + 1e-4) * (0.06 / (length(toMouse) + 0.35)) * 0.4;
  uv *= 1.0 - uPulse * 0.25;

  vec2 q = vec2(fbm(uv * 1.6 + t), fbm(uv * 1.6 - t + 4.3));
  vec2 r = vec2(
    fbm(uv * 1.4 + 3.0 * q + vec2(1.7, 9.2) + t * 1.3),
    fbm(uv * 1.4 + 3.0 * q + vec2(8.3, 2.8) - t * 1.1)
  );
  float f = fbm(uv * 1.2 + 3.5 * r);

  vec3 violet = vec3(0.49, 0.23, 0.93);
  vec3 pink = vec3(0.93, 0.28, 0.6);
  vec3 orange = vec3(0.98, 0.45, 0.09);
  vec3 cyan = vec3(0.13, 0.83, 0.93);

  vec3 col = mix(vec3(0.02, 0.0, 0.06), violet, smoothstep(0.15, 0.75, f));
  col = mix(col, pink, smoothstep(0.35, 0.95, length(q)) * 0.75);
  col = mix(col, orange, smoothstep(0.55, 1.1, r.x) * 0.6);
  col = mix(col, cyan, smoothstep(0.7, 1.2, r.y) * 0.45);

  // Bright ridges where the warp folds over itself
  col += pow(f, 3.0) * 0.6;
  col *= 0.55 + uPulse * 0.9;

  // Vignette and film grain
  float v = smoothstep(1.25, 0.2, length((vUv - 0.5) * vec2(uRes.x / uRes.y, 1.0)));
  col *= v;
  col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.04;

  gl_FragColor = vec4(col, 1.0);
}
`;

export interface NebulaHandle {
  pulse: (amount?: number) => void;
}

export const Nebula = forwardRef<
  NebulaHandle,
  { className?: string; animate?: boolean }
>(function Nebula({ className, animate = true }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef(0);

  useImperativeHandle(ref, () => ({
    pulse: (amount = 1) => {
      pulseRef.current = Math.min(1.4, pulseRef.current + amount);
    },
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 1.5),
      alpha: false,
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: [1, 1] },
        uMouse: { value: [0.5, 0.5] },
        uPulse: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      program.uniforms.uRes.value = [
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
      ];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const target = [0.5, 0.5];
    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      target[0] = (e.clientX - rect.left) / rect.width;
      target[1] = 1 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("pointermove", onMove);

    // Only burn GPU while the canvas is on screen
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(container);

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible) {
        return;
      }
      const mouse = program.uniforms.uMouse.value as number[];
      mouse[0] += (target[0] - mouse[0]) * 0.05;
      mouse[1] += (target[1] - mouse[1]) * 0.05;
      pulseRef.current *= 0.94;
      program.uniforms.uPulse.value = pulseRef.current;
      program.uniforms.uTime.value = animate ? (now - start) / 1000 : 12;
      renderer.render({ scene: mesh });
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      gl.canvas.remove();
    };
  }, [animate]);

  return <div className={className} ref={containerRef} />;
});
