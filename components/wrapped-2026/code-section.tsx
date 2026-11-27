"use client";

import { useInView } from "framer-motion";
import {
  Bot,
  CalendarCheck,
  CircleDot,
  Flame,
  GitPullRequest,
  Star,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CODE_STATS } from "@/lib/wrapped-2026-data";
import { Counter, Reveal, SectionTitle } from "./primitives";
import { type Stat, StatGrid } from "./stat-tile";

export interface Day {
  date: string;
  count: number;
  level: number;
}

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

// The same grey steps as the contribution graph in the site footer
const LEVELS = [
  "bg-muted-foreground/10",
  "bg-muted-foreground/30",
  "bg-muted-foreground/50",
  "bg-foreground/70",
  "bg-foreground",
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

// The real 2026 calendar. Squares pop in as a diagonal wave.
function Heatmap({ days }: { days: Day[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [hover, setHover] = useState<Day | null>(null);

  const weeks = useMemo(() => {
    if (days.length === 0) {
      return [];
    }
    // Pad the front so Jan 1 sits on its weekday row
    const first = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
    const padded: (Day | null)[] = [...new Array(first).fill(null), ...days];
    const out: (Day | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      out.push(padded.slice(i, i + 7));
    }
    return out;
  }, [days]);

  return (
    <div ref={ref}>
      <div
        className="grid grid-flow-col grid-rows-7 gap-[2px] sm:gap-[3px]"
        onPointerLeave={() => setHover(null)}
        style={{
          gridTemplateColumns: `repeat(${weeks.length}, minmax(0, 1fr))`,
        }}
      >
        {weeks.flatMap((week, wi) =>
          week.map((day, di) => (
            <div
              className={cn(
                "aspect-square rounded-[2px] transition-transform duration-150",
                day ? LEVELS[day.level] : "bg-transparent",
                day && "hover:scale-150 hover:bg-foreground"
              )}
              // biome-ignore lint/suspicious/noArrayIndexKey: days are positional
              key={`${wi}-${di}`}
              onPointerEnter={() => day && setHover(day)}
              style={
                inView
                  ? {
                      animation: `cellPop 500ms cubic-bezier(0.21,0.47,0.32,0.98) ${(wi + di) * 14}ms both`,
                    }
                  : { opacity: 0 }
              }
            />
          ))
        )}
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-muted-foreground/70">
        {MONTHS.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
      <p className="mt-3 h-5 text-muted-foreground text-xs">
        {hover
          ? `${hover.count} contribution${hover.count === 1 ? "" : "s"} on ${formatDay(hover.date)}`
          : "hover a square"}
      </p>
    </div>
  );
}

export function CodeSection({ days }: { days: Day[] }) {
  const s = useMemo(() => summarise(days), [days]);
  const total = s.total || CODE_STATS.contributionsFallback;
  const multiple = (total / CODE_STATS.contributions2025).toFixed(1);

  const stats: Stat[] = [
    ...(s.best && s.total > 0
      ? [
          {
            value: s.best.count,
            label: "contributions in one day",
            sublabel: formatDay(s.best.date),
            icon: <Zap className="h-4 w-4" />,
          },
          {
            value: s.active,
            label: "days with a contribution",
            sublabel: "out of the year",
            icon: <CalendarCheck className="h-4 w-4" />,
          },
          {
            value: s.longest,
            label: "day streak",
            sublabel: "longest of the year",
            icon: <Flame className="h-4 w-4" />,
          },
        ]
      : []),
    {
      value: CODE_STATS.amajorRepos,
      label: "new repos at A Major",
      sublabel: "github.com/amajorai",
      icon: (
        <Image
          alt="A Major"
          className="h-4 w-4 dark:invert"
          height={16}
          src="/logos/amajor.svg"
          width={16}
        />
      ),
      wide: true,
      href: "https://github.com/amajorai",
    },
    {
      value: CODE_STATS.pullRequests,
      label: "pull requests",
      sublabel: "opened",
      icon: <GitPullRequest className="h-4 w-4" />,
    },
    {
      value: CODE_STATS.dropDrawerStars,
      label: "stars on DropDrawer",
      sublabel: `plus ${CODE_STATS.ryuStars} on Ryu`,
      icon: <Star className="h-4 w-4" />,
      wide: true,
      href: "https://github.com/jiaweing/DropDrawer",
    },
    {
      value: CODE_STATS.issues,
      label: "issues opened",
      sublabel: "on GitHub",
      icon: <CircleDot className="h-4 w-4" />,
    },
    {
      value: CODE_STATS.models,
      suffix: "+",
      label: "AI models",
      sublabel: "built into Ryu",
      icon: <Bot className="h-4 w-4" />,
    },
    {
      value: CODE_STATS.mcpTools,
      suffix: "+",
      label: "MCP tools",
      sublabel: "built into Ryu",
      wide: true,
      href: "https://ryuhq.com",
      icon: (
        <Image
          alt="Ryu"
          className="h-4 w-4"
          height={16}
          src="/logos/ryu.png"
          width={16}
        />
      ),
    },
  ];

  return (
    <section>
      <SectionTitle
        aside={
          <a
            className="transition-colors hover:text-foreground"
            href="https://github.com/jiaweing"
            rel="noopener noreferrer"
            target="_blank"
          >
            github ↗
          </a>
        }
      >
        shipped
      </SectionTitle>

      <Reveal>
        <p className="font-semibold text-7xl text-foreground leading-none tracking-tighter md:text-8xl">
          <Counter stiffness={12} to={total} />
        </p>
        <p className="mt-3 text-muted-foreground text-xl md:text-2xl">
          contributions on GitHub,{" "}
          <span className="text-foreground">{multiple}×</span> last year.
        </p>
      </Reveal>

      <div className="mt-10">
        <Heatmap days={days} />
      </div>

      <StatGrid className="mt-8" stats={stats} />
    </section>
  );
}
