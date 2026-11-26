"use client";

import {
  motion,
  useAnimationControls,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { Nebula, type NebulaHandle } from "./nebula";
import { Scramble, useWrapped } from "./primitives";

const DIGITS = ["2", "0", "2", "6"];

// Where each digit flies in from before it slams into place
const ENTRY = [
  { x: "-60vw", y: "-40vh", rotate: -70 },
  { x: "-10vw", y: "70vh", rotate: 40 },
  { x: "20vw", y: "-80vh", rotate: -30 },
  { x: "70vw", y: "30vh", rotate: 80 },
];

const LAND_DELAY = 0.35;
const STAGGER = 0.14;
const LAND_AT = LAND_DELAY + STAGGER * (DIGITS.length - 1) + 0.55;

export function Hero() {
  const { burst, reduced, scroller } = useWrapped();
  const nebula = useRef<NebulaHandle>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const shake = useAnimationControls();
  const ring = useAnimationControls();

  const { scrollYProgress } = useScroll({
    container: scroller,
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 1.9]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const titleBlur = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["blur(0px)", "blur(18px)"]
  );

  // The moment the last digit lands: shake, shockwave, sparks, flash
  useEffect(() => {
    if (reduced) {
      return;
    }
    const id = window.setTimeout(() => {
      const r = titleRef.current?.getBoundingClientRect();
      const x = r ? r.left + r.width / 2 : window.innerWidth / 2;
      const y = r ? r.top + r.height / 2 : window.innerHeight / 2;
      burst.current?.burst(x, y, 520, 24);
      nebula.current?.pulse(1.3);
      shake.start({
        x: [0, -18, 16, -12, 9, -5, 0],
        y: [0, 10, -12, 8, -5, 2, 0],
        transition: { duration: 0.55 },
      });
      ring.start({
        scale: [0, 9],
        opacity: [0.9, 0],
        transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
      });
    }, LAND_AT * 1000);
    return () => window.clearTimeout(id);
  }, [reduced, burst, shake, ring]);

  // Clicking anywhere on the hero is purely decorative, so it's a plain
  // listener rather than a button
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) {
      return;
    }
    const onDown = (e: PointerEvent) => {
      burst.current?.burst(e.clientX, e.clientY, 220, 15);
      nebula.current?.pulse(0.6);
    };
    // A thin trail of sparks follows the pointer across the hero
    let last = 0;
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (e.pointerType !== "mouse" || now - last < 16) {
        return;
      }
      last = now;
      burst.current?.burst(e.clientX, e.clientY, 4, 2.5);
    };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
    };
  }, [burst]);

  return (
    <section
      className="relative h-[100svh] min-h-[560px] w-full cursor-crosshair overflow-hidden"
      ref={sectionRef}
    >
      <Nebula animate={!reduced} className="absolute inset-0" ref={nebula} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#05010d_95%)]" />

      <motion.div
        animate={shake}
        className="relative flex h-full flex-col items-center justify-center px-4"
      >
        <motion.div
          animate={ring}
          className="pointer-events-none absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80 opacity-0 shadow-[0_0_60px_10px_rgba(236,72,153,0.6)]"
        />

        <motion.div
          className="flex flex-col items-center"
          style={
            reduced
              ? undefined
              : { scale: titleScale, opacity: titleOpacity, filter: titleBlur }
          }
        >
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 font-mono text-[11px] text-white/60 uppercase tracking-[0.5em] md:text-sm"
            initial={reduced ? false : { opacity: 0, y: -20 }}
            transition={{ delay: LAND_AT + 0.2, duration: 0.8 }}
          >
            Jia Wei Ng presents
          </motion.p>

          <h1
            aria-label="2026"
            className="relative flex select-none font-black text-[36vw] leading-[0.8] tracking-[-0.07em] md:text-[min(30vw,28rem)]"
            ref={titleRef}
          >
            {DIGITS.map((d, i) => (
              <motion.span
                animate={{
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                aria-hidden
                className="relative inline-block bg-gradient-to-b from-white via-white to-fuchsia-300/70 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(236,72,153,0.55)]"
                initial={
                  reduced
                    ? false
                    : {
                        ...ENTRY[i],
                        scale: 3.5,
                        opacity: 0,
                        filter: "blur(30px)",
                      }
                }
                // biome-ignore lint/suspicious/noArrayIndexKey: fixed digits
                key={i}
                transition={{
                  delay: LAND_DELAY + i * STAGGER,
                  type: "spring",
                  stiffness: 140,
                  damping: 14,
                  mass: 1.1,
                }}
              >
                {d}
              </motion.span>
            ))}
          </h1>

          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 font-mono font-semibold text-lg text-white uppercase tracking-[0.6em] md:mt-6 md:text-3xl"
            initial={reduced ? false : { opacity: 0, scale: 0.6 }}
            transition={{
              delay: LAND_AT,
              type: "spring",
              stiffness: 260,
              damping: 18,
            }}
          >
            <Scramble delay={LAND_AT} text="WRAPPED" />
          </motion.div>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-md text-balance text-center text-base text-white/70 md:text-xl"
            initial={reduced ? false : { opacity: 0, y: 20 }}
            transition={{ delay: LAND_AT + 0.6, duration: 0.8 }}
          >
            The year I stopped waiting for permission.
          </motion.p>
        </motion.div>

        <motion.div
          animate={{ opacity: 1 }}
          className="absolute bottom-8 flex flex-col items-center gap-3 text-white/50"
          initial={reduced ? false : { opacity: 0 }}
          transition={{ delay: LAND_AT + 1.2, duration: 1 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em]">
            Click anywhere · scroll to begin
          </span>
          <motion.span
            animate={reduced ? undefined : { y: [0, 8, 0] }}
            className="block h-10 w-px bg-gradient-to-b from-white/70 to-transparent"
            transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
