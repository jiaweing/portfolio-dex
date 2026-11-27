"use client";

import { useInView, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reveal, RollingNumber } from "./primitives";

// The year rolls over from 2026 to 2027 once you reach the end
export function Finale({ onReplay }: { onReplay: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reduced = useReducedMotion();
  const [year, setYear] = useState(2026);

  useEffect(() => {
    if (!inView) {
      return;
    }
    const id = window.setTimeout(() => setYear(2027), reduced ? 0 : 1200);
    return () => window.clearTimeout(id);
  }, [inView, reduced]);

  const replay = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    setYear(2026);
    onReplay();
  };

  return (
    <section
      className="flex min-h-[70svh] flex-col items-center justify-center text-center"
      ref={ref}
    >
      <Reveal>
        <p className="text-muted-foreground text-xl md:text-2xl">
          that&apos;s a wrap.
        </p>
      </Reveal>

      <p className="mt-2 font-semibold text-[clamp(6rem,26vw,10rem)] text-foreground leading-none tracking-tighter">
        <RollingNumber plain value={year} />
      </p>

      <p className="mt-3 h-8 text-xl md:text-2xl">
        {year === 2027 ? (
          <span className="chroma-text-out chroma-text-out-animate">
            See you next year.
          </span>
        ) : null}
      </p>

      <p className="mt-6 max-w-md text-balance text-muted-foreground">
        Graduated, started a company, built Ryu and went live every day.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        <a
          className={cn(buttonVariants({ size: "lg" }))}
          href="https://ryuhq.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          check out ryu
        </a>
        <button
          className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
          onClick={replay}
          type="button"
        >
          replay
        </button>
        <Link
          className={cn(buttonVariants({ size: "lg", variant: "ghost" }))}
          href="/2025"
        >
          see 2025 →
        </Link>
      </div>
    </section>
  );
}
