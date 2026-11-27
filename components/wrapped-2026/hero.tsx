"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TextShimmer } from "@/components/motion-primitives/text-shimmer";
import { EASE } from "./primitives";

const YEAR = [2, 0, 2, 6];
const LOOPS = 3;
const STRIP = Array.from({ length: 10 * LOOPS }, (_, i) => i % 10);
const LAND = 1.9;

// A slot machine reel: spins through the strip a few times, then lands
function Reel({
  digit,
  index,
  spin,
}: {
  digit: number;
  index: number;
  spin: number;
}) {
  const reduced = useReducedMotion();
  const target = 10 * (LOOPS - 1) + digit;
  return (
    <span className="relative inline-block h-[1em] overflow-hidden leading-none">
      <span className="invisible">0</span>
      <motion.span
        animate={{ y: `${-target}em` }}
        className="absolute inset-x-0 top-0 flex flex-col items-center"
        initial={reduced ? false : { y: "0em" }}
        key={spin}
        transition={{
          duration: 1.3 + index * 0.18,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.15,
        }}
      >
        {STRIP.map((n, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: the strip repeats digits
          <span className="block h-[1em] leading-none" key={i}>
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function Hero({ spin, onSpin }: { spin: number; onSpin: () => void }) {
  const reduced = useReducedMotion();
  const [hinted, setHinted] = useState(false);
  const after = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: EASE, delay: reduced ? 0 : delay },
  });

  return (
    <section className="relative flex min-h-[calc(100svh-11rem)] flex-col justify-center pt-4 lg:pt-16">
      <motion.p
        {...after(0)}
        className="text-muted-foreground text-xl md:text-2xl"
      >
        my year in review
      </motion.p>

      <h1 className="mt-2 -ml-[0.06em] font-semibold text-[clamp(7rem,31vw,12.5rem)] text-foreground leading-none tracking-tighter">
        <button
          aria-label="2026, tap to spin again"
          className="inline-flex cursor-pointer select-none"
          onClick={() => {
            onSpin();
            setHinted(true);
          }}
          type="button"
        >
          {YEAR.map((d, i) => (
            <Reel
              digit={d}
              index={i}
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed digits
              key={i}
              spin={spin}
            />
          ))}
        </button>
      </h1>

      <motion.div {...after(LAND)} className="mt-1">
        <TextShimmer
          className="font-semibold text-4xl tracking-tight md:text-5xl"
          duration={2.2}
        >
          wrapped
        </TextShimmer>
      </motion.div>

      <motion.p
        {...after(LAND + 0.25)}
        className="mt-8 max-w-md text-xl leading-relaxed md:text-2xl"
      >
        <span className="chroma-text chroma-text-animate">
          The year I stopped waiting for permission.
        </span>
      </motion.p>

      <motion.div
        {...after(LAND + 0.5)}
        className="mt-10 flex items-center gap-6 text-muted-foreground text-sm"
      >
        <span className="inline-flex items-center gap-1.5">
          <ArrowDown className="seasonal-bob size-4" />
          scroll
        </span>
        <span className="text-muted-foreground/60">
          {hinted ? "again?" : "or tap the year"}
        </span>
        <Link
          className="ml-auto border-muted-foreground/40 border-b border-dashed transition-colors hover:border-foreground hover:text-foreground"
          href="/2025"
        >
          2025 wrapped →
        </Link>
      </motion.div>
    </section>
  );
}
