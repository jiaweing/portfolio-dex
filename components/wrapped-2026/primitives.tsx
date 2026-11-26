"use client";

import { animate, motion, useInView } from "framer-motion";
import {
  createContext,
  type RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import type { BurstHandle } from "./burst-canvas";

interface WrappedContext {
  scroller: RefObject<HTMLDivElement | null>;
  burst: RefObject<BurstHandle | null>;
  reduced: boolean;
}

export const Wrapped2026Context = createContext<WrappedContext | null>(null);

export function useWrapped() {
  const ctx = useContext(Wrapped2026Context);
  if (!ctx) {
    throw new Error("useWrapped must be used inside Wrapped2026");
  }
  return ctx;
}

const nf = new Intl.NumberFormat("en-US");

// Counts up once the number scrolls into view, optionally firing a burst of
// sparks from the number itself when it lands
export function CountUp({
  to,
  from = 0,
  duration = 2.2,
  suffix = "",
  className,
  explode = false,
}: {
  to: number;
  from?: number;
  duration?: number;
  suffix?: string;
  className?: string;
  explode?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { burst, reduced } = useWrapped();
  const [value, setValue] = useState(reduced ? to : from);

  useEffect(() => {
    if (!inView || reduced) {
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
      onComplete: () => {
        if (!(explode && ref.current)) {
          return;
        }
        const r = ref.current.getBoundingClientRect();
        burst.current?.burst(
          r.left + r.width / 2,
          r.top + r.height / 2,
          180,
          13
        );
      },
    });
    return () => controls.stop();
  }, [inView, reduced, from, to, duration, explode, burst]);

  return (
    <span className={cn("tabular-nums", className)} ref={ref}>
      {nf.format(value)}
      {suffix}
    </span>
  );
}

const GLYPHS = "!<>-_\\/[]{}=+*^?#01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Letters cycle through random glyphs before settling, left to right
export function Scramble({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const { reduced } = useWrapped();
  const [out, setOut] = useState(reduced ? text : "");

  useEffect(() => {
    if (!inView || reduced) {
      return;
    }
    let frame = 0;
    let raf = 0;
    const startAt = performance.now() + delay * 1000;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now < startAt) {
        return;
      }
      frame++;
      const settled = Math.floor(frame / 2.2);
      setOut(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") {
              return " ";
            }
            if (i < settled) {
              return ch;
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      if (settled >= text.length) {
        cancelAnimationFrame(raf);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, text, delay]);

  return (
    <span className={className} ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>{out || " "}</span>
    </span>
  );
}

// Words rise in from a blur, one after another
export function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, y: "0.6em", filter: "blur(12px)" }}
          // biome-ignore lint/suspicious/noArrayIndexKey: words can repeat
          key={`${word}-${i}`}
          transition={{
            delay: delay + i * 0.06,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ once: true, amount: 0.8 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] text-white/50 uppercase tracking-[0.35em] md:text-xs",
        className
      )}
    >
      {children}
    </p>
  );
}
