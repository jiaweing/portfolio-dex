"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { HOOK, LINKEDIN, SOCIAL_LINKS } from "@/lib/wrapped-2026-data";
import { CountUp, Eyebrow, RevealWords, useWrapped } from "./primitives";

export interface SocialSeries {
  key: keyof typeof SOCIAL_LINKS;
  label: string;
  color: string;
  values: number[];
}

function Sparkline({ values, color }: { values: number[]; color: string }) {
  const w = 240;
  const h = 70;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);
  const pts = values.map((v, i) => [
    (i / Math.max(1, values.length - 1)) * w,
    h - ((v - min) / span) * (h - 8) - 4,
  ]);
  const d = pts
    .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  const id = `fill-${color.replace("#", "")}`;
  return (
    <svg
      aria-hidden="true"
      className="h-16 w-full overflow-visible"
      preserveAspectRatio="none"
      viewBox={`0 0 ${w} ${h}`}
    >
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${d} L${w} ${h} L0 ${h} Z`}
        fill={`url(#${id})`}
        initial={{ opacity: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1 }}
      />
      <motion.path
        d={d}
        fill="none"
        initial={{ pathLength: 0 }}
        stroke={color}
        strokeLinecap="round"
        strokeWidth="2.5"
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        viewport={{ once: true }}
        whileInView={{ pathLength: 1 }}
      />
    </svg>
  );
}

function ThreadsPost() {
  const { burst } = useWrapped();
  const ref = useRef<HTMLButtonElement>(null);
  const pop = () => {
    const r = ref.current?.getBoundingClientRect();
    if (r) {
      burst.current?.burst(r.left + r.width / 2, r.top + r.height / 2, 160, 11);
    }
  };
  return (
    <motion.div
      className="relative rounded-3xl border border-white/10 bg-[#101010] p-6 shadow-[0_0_80px_rgba(236,72,153,0.25)]"
      initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
      viewport={{ once: true, amount: 0.5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
    >
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
        <div>
          <p className="font-semibold text-sm text-white">jiaweihq</p>
          <p className="text-white/40 text-xs">Pinned · 26 Apr 2026</p>
        </div>
      </div>
      <p className="mt-4 text-lg text-white leading-snug md:text-xl">
        i applied 3,800 jobs and got 0 interviews
        <br />
        so i started my own company
      </p>
      <div className="mt-5 flex items-center gap-5 text-sm text-white/60">
        <button
          className="flex items-center gap-1.5 text-pink-400 transition hover:scale-110"
          onClick={pop}
          ref={ref}
          type="button"
        >
          <span className="text-lg">♥</span> {HOOK.likes}
        </button>
        <a
          className="ml-auto font-mono text-xs hover:text-white"
          href={HOOK.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          View on Threads ↗
        </a>
      </div>
    </motion.div>
  );
}

export function SocialsSection({
  series,
  since,
}: {
  series: SocialSeries[];
  since: string;
}) {
  return (
    <section className="relative px-6 py-32 md:px-16 md:py-48">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.2),transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl">
        <Eyebrow>Chapter 6 · Showed up</Eyebrow>
        <h2 className="mt-4 max-w-4xl font-black text-[clamp(3rem,9vw,7.5rem)] leading-[0.9] tracking-tighter">
          <RevealWords text="Went live every day. From zero." />
        </h2>
        <p className="mt-4 text-white/60 text-xl">Followers since {since}.</p>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {series.map((s, i) => {
            const first = s.values[0] ?? 0;
            const last = s.values.at(-1) ?? 0;
            return (
              <motion.a
                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/30"
                href={SOCIAL_LINKS[s.key]}
                initial={{ opacity: 0, y: 50 }}
                key={s.key}
                rel="noopener noreferrer"
                target="_blank"
                transition={{
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 110,
                  damping: 16,
                }}
                viewport={{ once: true, amount: 0.4 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-baseline justify-between">
                  <p className="font-mono text-white/60 text-xs uppercase tracking-[0.3em]">
                    {s.label}
                  </p>
                  <p className="font-mono text-white/40 text-xs">
                    {first} → {last}
                  </p>
                </div>
                <p className="mt-3 font-black text-5xl text-white">
                  <CountUp from={first} to={last} />
                </p>
                <div className="mt-4">
                  <Sparkline color={s.color} values={s.values} />
                </div>
              </motion.a>
            );
          })}

          <motion.a
            className="rounded-3xl border border-sky-400/20 bg-gradient-to-br from-sky-500/20 to-blue-700/10 p-6 transition hover:border-sky-300/50"
            href={LINKEDIN.href}
            initial={{ opacity: 0, y: 50 }}
            rel="noopener noreferrer"
            target="_blank"
            transition={{
              delay: 0.4,
              type: "spring",
              stiffness: 110,
              damping: 16,
            }}
            viewport={{ once: true, amount: 0.4 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="font-mono text-white/60 text-xs uppercase tracking-[0.3em]">
              LinkedIn
            </p>
            <p className="mt-3 font-black text-5xl text-white">
              <CountUp explode to={LINKEDIN.impressions} />
            </p>
            <p className="mt-1 text-sm text-white/60">impressions this year</p>
            <div className="mt-5 flex gap-6 text-sm text-white/80">
              <span>
                <CountUp
                  className="font-bold text-white"
                  to={LINKEDIN.reached}
                />{" "}
                people reached
              </span>
              <span>
                <CountUp
                  className="font-bold text-white"
                  to={LINKEDIN.followers}
                />{" "}
                followers
              </span>
            </div>
          </motion.a>
        </div>

        <div className="mt-24 grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="font-black text-4xl text-white leading-tight md:text-6xl">
              <RevealWords text="One post hit different." />
            </p>
            <p className="mt-4 max-w-md text-lg text-white/60">
              Tap the heart.
            </p>
          </div>
          <ThreadsPost />
        </div>
      </div>
    </section>
  );
}
