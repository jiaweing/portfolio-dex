"use client";

import { motion, useInView } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { CODE_STATS } from "@/lib/wrapped-2026-data";
import { CountUp, Eyebrow, RevealWords, useWrapped } from "./primitives";

export interface Day {
  date: string;
  count: number;
  level: number;
}

const LEVEL_COLORS = [
  "rgba(255,255,255,0.06)",
  "#5b21b6",
  "#a21caf",
  "#ec4899",
  "#fb923c",
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function summarise(days: Day[]) {
  let best = days[0];
  let streak = 0;
  let longest = 0;
  let active = 0;
  for (const d of days) {
    if (!best || d.count > best.count) {
      best = d;
    }
    if (d.count > 0) {
      active++;
      streak++;
      longest = Math.max(longest, streak);
    } else {
      streak = 0;
    }
  }
  const total = days.reduce((sum, d) => sum + d.count, 0);
  return { best, longest, active, total };
}

function formatDay(date: string) {
  const [, m, d] = date.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

// The real 2026 contribution calendar, lighting up in a diagonal wave
function Heatmap({ days }: { days: Day[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { reduced } = useWrapped();
  const [hover, setHover] = useState<Day | null>(null);

  // Pad the front so Jan 1 sits on its weekday row, then cut into weeks
  const weeks = useMemo(() => {
    if (days.length === 0) {
      return [];
    }
    const first = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
    const padded: (Day | null)[] = [...new Array(first).fill(null), ...days];
    const out: (Day | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      out.push(padded.slice(i, i + 7));
    }
    return out;
  }, [days]);

  return (
    <div className="relative" ref={ref}>
      <div className="overflow-x-auto pb-2 [scrollbar-width:none]">
        <div className="flex w-max gap-[3px] md:gap-1">
          {weeks.map((week, wi) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: weeks are positional
            <div className="flex flex-col gap-[3px] md:gap-1" key={wi}>
              {week.map((day, di) => (
                <motion.div
                  animate={
                    inView || reduced
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0 }
                  }
                  className="size-[9px] rounded-[2px] md:size-[15px] md:rounded-[3px] lg:size-[17px]"
                  initial={reduced ? false : { opacity: 0, scale: 0 }}
                  // biome-ignore lint/suspicious/noArrayIndexKey: days are positional
                  key={di}
                  onPointerEnter={() => day && setHover(day)}
                  onPointerLeave={() => setHover(null)}
                  style={{
                    backgroundColor: day
                      ? LEVEL_COLORS[day.level]
                      : "transparent",
                    boxShadow:
                      day && day.level >= 3
                        ? `0 0 12px ${LEVEL_COLORS[day.level]}`
                        : undefined,
                  }}
                  transition={{
                    delay: (wi + di) * 0.012,
                    type: "spring",
                    stiffness: 400,
                    damping: 18,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 h-5 font-mono text-white/60 text-xs">
        {hover
          ? `${hover.count} contribution${hover.count === 1 ? "" : "s"} on ${formatDay(hover.date)}`
          : "Hover a square"}
      </p>
    </div>
  );
}

function Tile({
  children,
  label,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm ${className ?? ""}`}
      initial={{ opacity: 0, y: 40, rotateX: -25 }}
      transition={{ delay, type: "spring", stiffness: 120, damping: 16 }}
      viewport={{ once: true, amount: 0.4 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    >
      <div className="font-black text-5xl text-white tracking-tight md:text-6xl">
        {children}
      </div>
      <p className="mt-2 text-sm text-white/60">{label}</p>
    </motion.div>
  );
}

export function CodeSection({ days }: { days: Day[] }) {
  const stats = useMemo(() => summarise(days), [days]);
  const total = stats.total || CODE_STATS.contributionsFallback;
  const multiple = (total / CODE_STATS.contributions2025).toFixed(1);

  return (
    <section className="relative px-6 py-32 md:px-16 md:py-48">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(236,72,153,0.18),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.12),transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl">
        <Eyebrow>Chapter 3 · Shipped</Eyebrow>
        <h2 className="mt-4 font-black text-[clamp(5rem,20vw,16rem)] leading-[0.85] tracking-tighter">
          <CountUp
            className="bg-gradient-to-r from-violet-400 via-pink-400 to-orange-300 bg-clip-text text-transparent"
            explode
            to={total}
          />
        </h2>
        <p className="mt-4 max-w-2xl text-2xl text-white/80 md:text-4xl">
          <RevealWords
            text={`contributions on GitHub. That's ${multiple}× last year.`}
          />
        </p>

        <div className="mt-16">
          <Heatmap days={days} />
        </div>

        {stats.best && stats.total > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Tile
              label={`contributions in one day, ${formatDay(stats.best.date)}`}
            >
              <CountUp to={stats.best.count} />
            </Tile>
            <Tile delay={0.1} label="days with at least one contribution">
              <CountUp to={stats.active} />
            </Tile>
            <Tile delay={0.2} label="day streak, longest of the year">
              <CountUp to={stats.longest} />
            </Tile>
          </div>
        ) : null}

        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Tile className="col-span-2" label="new repos at A Major">
            <CountUp explode to={CODE_STATS.amajorRepos} />
          </Tile>
          <Tile delay={0.1} label="pull requests">
            <CountUp to={CODE_STATS.pullRequests} />
          </Tile>
          <Tile delay={0.2} label="issues opened">
            <CountUp to={CODE_STATS.issues} />
          </Tile>
          <Tile delay={0.1} label="AI models in Ryu">
            <CountUp suffix="+" to={CODE_STATS.models} />
          </Tile>
          <Tile delay={0.2} label="MCP tools in Ryu">
            <CountUp suffix="+" to={CODE_STATS.mcpTools} />
          </Tile>
          <Tile
            className="col-span-2"
            delay={0.3}
            label={`stars on DropDrawer, plus ${CODE_STATS.ryuStars} on Ryu`}
          >
            <CountUp suffix=" ★" to={CODE_STATS.dropDrawerStars} />
          </Tile>
        </div>
      </div>
    </section>
  );
}
