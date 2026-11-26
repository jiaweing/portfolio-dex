"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Eyebrow, useWrapped } from "./primitives";

// The year ticks over from 2026 to 2027 while fireworks run
export function Finale() {
  const { burst, scroller, reduced } = useWrapped();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const [year, setYear] = useState(2026);

  useEffect(() => {
    burst.current?.setFireworks(inView && !reduced);
    if (!inView) {
      return;
    }
    const id = window.setTimeout(() => setYear(2027), 1600);
    return () => {
      window.clearTimeout(id);
      burst.current?.setFireworks(false);
    };
  }, [inView, reduced, burst]);

  const replay = () => {
    scroller.current?.scrollTo({
      top: 0,
      behavior: reduced ? "auto" : "smooth",
    });
    setYear(2026);
  };

  return (
    <section
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-32 text-center"
      ref={ref}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(236,72,153,0.35),transparent_60%)]" />
      <Eyebrow className="relative">That's a wrap</Eyebrow>
      <p className="relative mt-6 max-w-3xl text-balance text-2xl text-white/80 md:text-4xl">
        Graduated, started a company, built Ryu, went live every day.
      </p>

      <div className="relative mt-10 h-[clamp(7rem,24vw,20rem)] overflow-hidden">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.p
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            className="bg-gradient-to-b from-white to-fuchsia-300/60 bg-clip-text font-black text-[clamp(7rem,24vw,20rem)] text-transparent leading-none tracking-[-0.07em]"
            exit={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
            initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
            key={year}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
          >
            {year}
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="relative mt-4 text-white/60 text-xl">
        {year === 2027 ? "See you next year." : " "}
      </p>

      <div className="relative mt-14 flex flex-wrap items-center justify-center gap-3">
        <a
          className="rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-105"
          href="https://ryuhq.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Check out Ryu
        </a>
        <button
          className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white/60"
          onClick={replay}
          type="button"
        >
          Replay
        </button>
        <Link
          className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-white/60"
          href="/2025"
        >
          See 2025
        </Link>
      </div>
    </section>
  );
}
