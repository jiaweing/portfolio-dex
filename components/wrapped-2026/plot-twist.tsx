"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { HOOK } from "@/lib/wrapped-2026-data";
import { Eyebrow, useWrapped } from "./primitives";

const nf = new Intl.NumberFormat("en-US");

// Three beats pinned to the screen while you scroll through 320vh:
// 3,800 applications, a zero that swallows the screen, then the company
export function PlotTwist() {
  const { scroller, burst, reduced } = useWrapped();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({
    container: scroller,
    target: ref,
    offset: ["start start", "end end"],
  });

  const [count, setCount] = useState(reduced ? HOOK.applied : 0);
  const fired = useRef(false);
  useMotionValueEvent(p, "change", (v) => {
    setCount(Math.round(Math.min(1, v / 0.26) * HOOK.applied));
    if (v > 0.7 && !fired.current) {
      fired.current = true;
      const w = window.innerWidth;
      const h = window.innerHeight;
      burst.current?.burst(w * 0.25, h * 0.5, 260, 18);
      burst.current?.burst(w * 0.75, h * 0.5, 260, 18);
    }
    if (v < 0.6) {
      fired.current = false;
    }
  });

  // Beat 1: applications
  const b1Opacity = useTransform(p, [0, 0.04, 0.3, 0.36], [0, 1, 1, 0]);
  const b1Y = useTransform(p, [0.3, 0.36], ["0%", "-20%"]);

  // Beat 2: the zero grows until it fills the screen and you fall through it
  const b2Opacity = useTransform(p, [0.34, 0.4, 0.62, 0.68], [0, 1, 1, 0]);
  const zeroScale = useTransform(p, [0.4, 0.66], [1, 26]);
  const b2TextOpacity = useTransform(p, [0.4, 0.46, 0.5], [0, 1, 0]);
  const flash = useTransform(p, [0.58, 0.64, 0.7], [0, 0.85, 0]);

  // Beat 3: the company
  const b3Opacity = useTransform(p, [0.66, 0.72], [0, 1]);
  const b3Scale = useTransform(p, [0.66, 0.8], [0.7, 1]);

  return (
    <section className="relative h-[320vh]" ref={ref}>
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(124,58,237,0.25),transparent_60%)]" />

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: b1Opacity, y: b1Y }}
        >
          <Eyebrow>Chapter 1 · The plot twist</Eyebrow>
          <p className="mt-6 text-2xl text-white/70 md:text-4xl">
            I applied to
          </p>
          <p className="font-black text-[clamp(5rem,22vw,18rem)] text-white tabular-nums leading-none tracking-tighter">
            {nf.format(count)}
          </p>
          <p className="text-2xl text-white/70 md:text-4xl">jobs.</p>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ opacity: b2Opacity }}
        >
          <motion.p
            className="absolute top-[18%] text-2xl text-white/70 md:text-4xl"
            style={{ opacity: b2TextOpacity }}
          >
            and got
          </motion.p>
          <motion.span
            className="block bg-gradient-to-br from-rose-400 via-fuchsia-500 to-violet-600 bg-clip-text font-black text-[clamp(10rem,40vw,30rem)] text-transparent leading-none"
            style={{ scale: reduced ? 1 : zeroScale }}
          >
            0
          </motion.span>
          <motion.p
            className="absolute bottom-[18%] text-2xl text-white/70 md:text-4xl"
            style={{ opacity: b2TextOpacity }}
          >
            interviews.
          </motion.p>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 bg-white"
          style={{ opacity: flash }}
        />

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: b3Opacity, scale: b3Scale }}
        >
          <p className="text-2xl text-white/70 md:text-4xl">So I started</p>
          <p className="mt-2 bg-[linear-gradient(110deg,#facc15,#f97316,#ec4899,#a855f7,#22d3ee)] bg-clip-text font-black text-[clamp(3.5rem,13vw,11rem)] text-transparent leading-[0.9] tracking-tighter">
            my own company.
          </p>
          <a
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-white/70 text-xs backdrop-blur transition hover:border-white/40 hover:text-white"
            href={HOOK.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            Pinned on Threads · {HOOK.likes} likes ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
