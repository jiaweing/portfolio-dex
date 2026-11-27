"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type Vars = CSSProperties & Record<`--${string}`, string | number>;

/** True once the element has scrolled into view; it never goes back */
export function useSeen<T extends Element>(amount = 0.25) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) {
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: amount }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount, seen]);
  return [ref, seen] as const;
}

/** Rises in once when it scrolls into view */
export function Rise({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const [ref, seen] = useSeen<HTMLDivElement>(0.15);
  const vars: Vars = { ...style, "--delay": `${delay}ms` };
  return (
    <div
      className={`u26-rise ${className}`}
      data-in={seen}
      ref={ref}
      style={vars}
    >
      {children}
    </div>
  );
}

/**
 * Leans toward the pointer. Sets --rx and --ry (degrees) for the lean, and
 * --mx and --my (0 to 1) so foil inside can move its sheen.
 */
export function Tilt({
  children,
  className = "",
  max = 9,
  style,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") {
      return;
    }
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", ((x - 0.5) * 2 * max).toFixed(2));
    el.style.setProperty("--ry", ((0.5 - y) * 2 * max).toFixed(2));
    el.style.setProperty("--mx", x.toFixed(3));
    el.style.setProperty("--my", y.toFixed(3));
  };
  const leave = () => {
    const el = ref.current;
    if (!el) {
      return;
    }
    for (const name of ["--rx", "--ry", "--mx", "--my"]) {
      el.style.removeProperty(name);
    }
  };
  return (
    <div
      className={`u26-tilt ${className}`}
      onPointerLeave={leave}
      onPointerMove={move}
      ref={ref}
      style={style}
    >
      {children}
    </div>
  );
}

const nf = new Intl.NumberFormat("en-US");

/** Counts up from zero the first time it scrolls into view */
export function CountUp({
  to,
  className,
  duration = 1600,
  suffix = "",
}: {
  to: number;
  className?: string;
  duration?: number;
  suffix?: string;
}) {
  const [ref, seen] = useSeen<HTMLSpanElement>(0.4);
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!seen) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Fast at first, then it settles
      const eased = 1 - (1 - t) ** 4;
      setValue(Math.round(to * eased));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen, to, duration]);
  return (
    <span className={className} ref={ref}>
      <span className="sr-only">
        {nf.format(to)}
        {suffix}
      </span>
      <span aria-hidden="true">
        {nf.format(value)}
        {suffix}
      </span>
    </span>
  );
}

/** A strip of words sliding sideways for ever */
export function Ticker({
  words,
  tape,
  duration = 38,
  className = "",
}: {
  words: string[];
  tape?: string;
  duration?: number;
  className?: string;
}) {
  const vars: Vars = { "--dur": `${duration}s` };
  if (tape) {
    vars["--tape"] = tape;
  }
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="u26-ticker-row">
      {words.map((word, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: fixed list
        <span className="contents" key={i}>
          <span>{word}</span>
          <i />
        </span>
      ))}
    </div>
  );
  return (
    <div className={`u26-ticker ${className}`} style={vars}>
      {row(false)}
      {row(true)}
      {row(true)}
    </div>
  );
}

/** The heading every chapter opens with */
export function ChapterHead({
  day,
  title,
  children,
  center = false,
  id,
}: {
  day: string;
  title: ReactNode;
  children?: ReactNode;
  center?: boolean;
  id: string;
}) {
  return (
    <Rise
      className={`u26-chapter-head ${center ? "u26-chapter-head--center" : ""}`}
    >
      <span className="u26-tag">{day}</span>
      <h2 className="u26-display u26-chapter-title" id={id}>
        {title}
      </h2>
      {children ? <p className="u26-chapter-lede">{children}</p> : null}
    </Rise>
  );
}

export type { Vars };
