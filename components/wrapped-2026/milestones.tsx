"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { MILESTONES, type Milestone } from "@/lib/wrapped-2026-data";
import { Eyebrow, useWrapped } from "./primitives";

function Card({ m, index }: { m: Milestone; index: number }) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.35), transparent 50%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 16);
    rx.set(-(py - 0.5) * 16);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const Wrapper = m.href ? "a" : "div";

  return (
    <div className="shrink-0 [perspective:1200px]">
      <motion.div
        className="group relative h-[62svh] max-h-[560px] w-[78vw] overflow-hidden rounded-[2rem] p-7 shadow-2xl md:w-[38vw] md:min-w-[440px] md:p-10"
        onPointerLeave={onLeave}
        onPointerMove={onMove}
        style={{
          rotateX: srx,
          rotateY: sry,
          background: `linear-gradient(140deg, ${m.from}, ${m.to})`,
        }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare }}
        />
        <div className="xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence baseFrequency=%220.9%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.18%22/></svg>')] pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg mix-blend-overlay" />

        <span
          aria-hidden
          className="pointer-events-none absolute -top-8 -right-3 font-black text-[11rem] text-transparent leading-none [-webkit-text-stroke:2px_rgba(255,255,255,0.3)] md:-top-12 md:text-[16rem]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <Wrapper
          className="relative flex h-full flex-col justify-between"
          {...(m.href
            ? { href: m.href, target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <span className="w-fit rounded-full bg-black/20 px-3 py-1 font-mono text-[11px] text-white uppercase tracking-[0.3em] backdrop-blur">
            {m.kicker}
          </span>
          <div className="max-w-[90%]">
            <h3 className="text-balance font-black text-4xl text-white leading-[0.95] tracking-tight md:text-6xl">
              {m.title}
            </h3>
            <p className="mt-4 max-w-md text-base text-white/85 md:text-lg">
              {m.body}
              {m.href ? " ↗" : ""}
            </p>
          </div>
        </Wrapper>
      </motion.div>
    </div>
  );
}

// Vertical scroll drives a horizontal track of cards while the section is pinned
export function Milestones() {
  const { scroller, reduced } = useWrapped();
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) {
        return;
      }
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress: p } = useScroll({
    container: scroller,
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(p, [0.05, 0.95], [0, -distance]);
  const smoothX = useSpring(x, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(p, [0.05, 0.95], ["0%", "100%"]);

  useMotionValueEvent(p, "change", (v) => {
    const i = Math.round(
      Math.min(1, Math.max(0, (v - 0.05) / 0.9)) * (MILESTONES.length - 1)
    );
    setActive(i);
  });

  if (reduced) {
    return (
      <section className="px-6 py-24">
        <Eyebrow className="mb-8">Chapter 2 · What actually happened</Eyebrow>
        <div className="flex flex-wrap gap-6">
          {MILESTONES.map((m, i) => (
            <Card index={i} key={m.id} m={m} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative"
      ref={ref}
      style={{ height: `${MILESTONES.length * 70 + 100}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mb-8 flex items-end justify-between px-6 md:px-16">
          <div>
            <Eyebrow>Chapter 2</Eyebrow>
            <h2 className="mt-3 font-black text-4xl text-white tracking-tight md:text-7xl">
              What actually happened
            </h2>
          </div>
          <p className="whitespace-nowrap font-mono text-sm text-white/60 tabular-nums md:text-lg">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(MILESTONES.length).padStart(2, "0")}
          </p>
        </div>

        <motion.div
          className="flex w-max gap-6 px-6 md:gap-10 md:px-16"
          ref={trackRef}
          style={{ x: smoothX }}
        >
          {MILESTONES.map((m, i) => (
            <Card index={i} key={m.id} m={m} />
          ))}
        </motion.div>

        <div className="mx-6 mt-10 h-px bg-white/10 md:mx-16">
          <motion.div
            className="h-px bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400"
            style={{ width: bar }}
          />
        </div>
      </div>
    </section>
  );
}
