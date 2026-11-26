"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useRef } from "react";
import { CODE_STATS, RYU_APPS } from "@/lib/wrapped-2026-data";
import { Eyebrow, RevealWords, useWrapped } from "./primitives";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

// A row that drifts on its own and speeds up (or flips) with scroll velocity
function Row({
  items,
  baseVelocity,
  outline,
}: {
  items: string[];
  baseVelocity: number;
  outline?: boolean;
}) {
  const { scroller, reduced } = useWrapped();
  const base = useMotionValue(0);
  const { scrollY } = useScroll({ container: scroller });
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) {
      return;
    }
    let move = direction.current * baseVelocity * (delta / 1000);
    if (factor.get() < 0) {
      direction.current = -1;
    } else if (factor.get() > 0) {
      direction.current = 1;
    }
    move += direction.current * move * factor.get();
    base.set(base.get() + move);
  });

  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex gap-6 pr-6 md:gap-10 md:pr-10" style={{ x }}>
        {doubled.map((name, i) => (
          <span
            className={
              outline
                ? "font-black text-6xl text-transparent uppercase tracking-tight [-webkit-text-stroke:1.5px_rgba(255,255,255,0.45)] md:text-8xl"
                : "font-black text-6xl text-white uppercase tracking-tight md:text-8xl"
            }
            // biome-ignore lint/suspicious/noArrayIndexKey: list is doubled on purpose
            key={`${name}-${i}`}
          >
            {name}
            <span className="ml-6 text-fuchsia-400 md:ml-10">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function AppsSection() {
  const rows = 4;
  const per = Math.ceil(RYU_APPS.length / rows);
  const chunks = Array.from({ length: rows }, (_, i) =>
    RYU_APPS.slice(i * per, (i + 1) * per)
  );

  return (
    <section className="relative overflow-hidden py-32 md:py-48">
      <div className="mx-auto mb-16 max-w-6xl px-6 md:px-16">
        <Eyebrow>Chapter 4 · Ryu</Eyebrow>
        <h2 className="mt-4 font-black text-[clamp(3.5rem,11vw,9rem)] leading-[0.9] tracking-tighter">
          <span className="bg-gradient-to-r from-fuchsia-400 to-orange-300 bg-clip-text text-transparent">
            {CODE_STATS.ryuApps}
          </span>{" "}
          <RevealWords text="open source apps." />
        </h2>
        <p className="mt-6 max-w-xl text-white/70 text-xl md:text-2xl">
          <RevealWords text="Last year Ryu was a side project. This year it runs on all of these." />
        </p>
      </div>

      <div className="flex -rotate-6 scale-110 flex-col gap-4 md:gap-6">
        {chunks.map((chunk, i) => (
          <Row
            baseVelocity={i % 2 === 0 ? -2 : 2}
            items={chunk}
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed rows
            key={i}
            outline={i % 2 === 1}
          />
        ))}
      </div>

      <p className="mx-auto mt-24 max-w-6xl px-6 font-mono text-white/50 text-xs md:px-16">
        Scroll faster, they go faster.{" "}
        <a
          className="underline decoration-white/30 underline-offset-4 hover:text-white"
          href="https://github.com/amajorai"
          rel="noopener noreferrer"
          target="_blank"
        >
          github.com/amajorai ↗
        </a>
      </p>
    </section>
  );
}
