"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { HOOK } from "@/lib/wrapped-2026-data";
import { RollingNumber } from "./primitives";

const BIG =
  "font-semibold text-[clamp(6rem,24vw,15rem)] leading-none tracking-tighter";
const LINE = "text-2xl text-muted-foreground md:text-4xl";

function Company({ sweep }: { sweep: boolean }) {
  return (
    <>
      <p className="text-2xl text-background/60 md:text-4xl">So I started</p>
      <p
        className={cn(
          "mt-2 font-semibold text-[clamp(3rem,11vw,9rem)] leading-[0.95] tracking-tighter lg:text-[6vw]",
          sweep ? "chroma-text-out chroma-text-out-animate" : "text-background"
        )}
        // The sweep ends on the panel's text colour, which is the inverse of the theme
        style={{ "--chroma-base": "var(--background)" } as React.CSSProperties}
      >
        my own company.
      </p>
      <a
        className="mt-10 inline-flex items-center gap-1.5 border-background/40 border-b border-dashed text-background/70 text-sm transition-colors hover:border-background hover:text-background"
        href={HOOK.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        pinned on Threads, {HOOK.likes} likes ↗
      </a>
    </>
  );
}

// Pinned while you scroll through it: the count runs to 3,800, a zero grows
// until you fall through it, and the screen flips to the inverse colours
export function PlotTwist() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const [count, setCount] = useState(0);
  const [sweep, setSweep] = useState(false);
  useMotionValueEvent(p, "change", (v) => {
    setCount(Math.min(1, Math.max(0, (v - 0.02) / 0.2)) * HOOK.applied);
    if (v > 0.72) {
      setSweep(true);
    } else if (v < 0.6) {
      setSweep(false);
    }
  });

  // Beat 1 is already showing as the section scrolls in, so there's no blank screen
  const b1Opacity = useTransform(p, [0.26, 0.32], [1, 0]);
  const b1Y = useTransform(p, [0.26, 0.32], [0, -40]);

  // Beat 2: the zero rushes at you
  const b2Opacity = useTransform(p, [0.3, 0.35], [0, 1]);
  const b2Words = useTransform(p, [0.34, 0.38, 0.44, 0.48], [0, 1, 1, 0]);
  const zeroScale = useTransform(p, [0.46, 0.62], [1, 16]);
  const zeroOpacity = useTransform(p, [0.56, 0.62], [1, 0]);

  // Beat 3: an inverted card blooms out of the middle
  const panelScale = useTransform(p, [0.56, 0.68], [0.2, 1]);
  const panelOpacity = useTransform(p, [0.56, 0.6], [0, 1]);
  const b3Opacity = useTransform(p, [0.66, 0.72], [0, 1]);
  const b3Y = useTransform(p, [0.66, 0.76], [30, 0]);

  if (reduced) {
    return (
      <section className="space-y-16 py-10">
        <div>
          <p className={LINE}>I applied to</p>
          <RollingNumber className={BIG} value={HOOK.applied} />
          <p className={LINE}>jobs, and got 0 interviews.</p>
        </div>
        <div className="rounded-3xl bg-foreground p-8">
          <Company sweep={false} />
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative left-1/2 h-[320vh] w-screen -translate-x-1/2"
      ref={ref}
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
          style={{ opacity: b1Opacity, y: b1Y }}
        >
          <p className={LINE}>I applied to</p>
          <RollingNumber className={BIG} value={count} />
          <p className={LINE}>jobs.</p>
        </motion.div>

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ opacity: b2Opacity }}
        >
          <motion.p
            className={cn(LINE, "absolute top-[22%]")}
            style={{ opacity: b2Words }}
          >
            and got
          </motion.p>
          <motion.span
            className={cn(BIG, "block will-change-transform")}
            style={{ scale: zeroScale, opacity: zeroOpacity }}
          >
            0
          </motion.span>
          <motion.p
            className={cn(LINE, "absolute bottom-[22%]")}
            style={{ opacity: b2Words }}
          >
            interviews.
          </motion.p>
        </motion.div>

        <motion.div
          className="absolute inset-x-3 top-20 bottom-28 rounded-[2.5rem] bg-foreground md:inset-x-8 lg:inset-x-[236px] lg:bottom-20"
          style={{ scale: panelScale, opacity: panelOpacity }}
        />

        <motion.div
          className="absolute inset-x-3 top-20 bottom-28 flex flex-col items-center justify-center px-6 text-center md:inset-x-8 lg:inset-x-[236px] lg:bottom-20"
          style={{ opacity: b3Opacity, y: b3Y }}
        >
          <Company sweep={sweep} />
        </motion.div>
      </div>
    </section>
  );
}
