"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// The same easing and rise the home page uses for its sections
export const EASE = [0.21, 0.47, 0.32, 0.98] as [
  number,
  number,
  number,
  number,
];

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

export const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      viewport={{ once: true, margin: "-10% 0px" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

// Section heading in the home page style: small, semibold, lowercase
export function SectionTitle({
  children,
  aside,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h2 className="flex items-center gap-2 font-semibold">{children}</h2>
      {aside ? (
        <div className="text-muted-foreground text-sm">{aside}</div>
      ) : null}
    </div>
  );
}

const STRIP = Array.from({ length: 10 }, (_, i) => i);

// One digit on a vertical strip of 0 to 9 that rolls to its value
function RollDigit({ digit }: { digit: number }) {
  return (
    <span className="relative inline-block h-[1em] overflow-hidden leading-none">
      <span className="invisible">0</span>
      <motion.span
        animate={{ y: `${-digit}em` }}
        className="absolute inset-x-0 top-0 flex flex-col items-center"
        initial={false}
        transition={{ type: "spring", stiffness: 280, damping: 18, mass: 0.3 }}
      >
        {STRIP.map((n) => (
          <span className="block h-[1em] leading-none" key={n}>
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

const nf = new Intl.NumberFormat("en-US");

// A number whose digits roll like the home page counters, with thousands
// commas unless `plain` (for years)
export function RollingNumber({
  value,
  className,
  plain = false,
}: {
  value: number;
  className?: string;
  plain?: boolean;
}) {
  const whole = Math.max(0, Math.round(value));
  const text = plain ? String(whole) : nf.format(whole);
  const chars = text.split("");
  return (
    <span
      aria-label={text}
      className={cn("inline-flex items-baseline tabular-nums", className)}
      role="img"
    >
      {chars.map((ch, i) => {
        // Key from the right so each place keeps its strip as the number grows
        const place = chars.length - i;
        return ch === "," ? (
          <span aria-hidden key={`c-${place}`}>
            ,
          </span>
        ) : (
          <RollDigit digit={Number(ch)} key={`d-${place}`} />
        );
      })}
    </span>
  );
}

// Springs from 0 up to `to` the first time it scrolls into view
export function Counter({
  to,
  className,
  stiffness = 20,
}: {
  to: number;
  className?: string;
  stiffness?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness, damping: 10, mass: 1.5 });
  const [display, setDisplay] = useState(reduced ? to : 0);

  useEffect(() => spring.on("change", (v) => setDisplay(v)), [spring]);
  useEffect(() => {
    if (inView) {
      mv.set(to);
    }
  }, [inView, mv, to]);

  return (
    <span ref={ref}>
      <RollingNumber className={className} value={reduced ? to : display} />
    </span>
  );
}
