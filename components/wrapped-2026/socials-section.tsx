"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HOOK, LINKEDIN, SOCIAL_LINKS } from "@/lib/wrapped-2026-data";
import { EASE, Reveal, SectionTitle } from "./primitives";
import { type Stat, StatGrid } from "./stat-tile";

export interface SocialSeries {
  key: keyof typeof SOCIAL_LINKS;
  label: string;
  icon: string;
  // Black logos that need flipping to white in dark mode
  invertDark?: boolean;
  values: number[];
}

function Sparkline({ values }: { values: number[] }) {
  const w = 240;
  const h = 40;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);
  const d = values
    .map((v, i) => {
      const x = (i / Math.max(1, values.length - 1)) * w;
      const y = h - ((v - min) / span) * (h - 4) - 2;
      return `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg
      aria-hidden="true"
      className="h-10 w-full overflow-visible text-foreground/50 transition-colors group-hover:text-foreground"
      preserveAspectRatio="none"
      viewBox={`0 0 ${w} ${h}`}
    >
      <motion.path
        d={d}
        fill="none"
        initial={{ pathLength: 0 }}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
        vectorEffect="non-scaling-stroke"
        viewport={{ once: true }}
        whileInView={{ pathLength: 1 }}
      />
    </svg>
  );
}

function ThreadsPost() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="rounded-2xl bg-muted/30 p-5">
      <div className="flex items-center gap-3">
        <Image
          alt="Jia Wei"
          className="size-9 rounded-full object-cover"
          height={36}
          src="/images/avatars/jiawei2.png"
          width={36}
        />
        <div className="leading-tight">
          <p className="font-semibold text-foreground text-sm">jiaweihq</p>
          <p className="text-muted-foreground text-xs">pinned</p>
        </div>
        <Image
          alt="Threads"
          className="ml-auto size-4 dark:invert"
          height={16}
          src="/logos/threads.svg"
          width={16}
        />
      </div>
      <p className="mt-4 text-foreground text-lg leading-snug">
        i applied 3,800 jobs and got 0 interviews
        <br />
        so i started my own company
      </p>
      <div className="mt-4 flex items-center gap-4 text-muted-foreground text-sm">
        <button
          aria-pressed={liked}
          className="flex items-center gap-1.5 transition-colors hover:text-foreground"
          onClick={() => setLiked((v) => !v)}
          type="button"
        >
          <motion.span
            animate={liked ? { scale: [1, 1.5, 1] } : { scale: 1 }}
            className="inline-flex"
            transition={{ duration: 0.35, ease: EASE }}
          >
            <Heart
              className={cn("size-4", liked && "fill-rose-500 text-rose-500")}
            />
          </motion.span>
          {HOOK.likes}
        </button>
        <a
          className="ml-auto transition-colors hover:text-foreground"
          href={HOOK.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          view on Threads ↗
        </a>
      </div>
    </div>
  );
}

export function SocialsSection({
  series,
  since,
}: {
  series: SocialSeries[];
  since: string;
}) {
  const stats: Stat[] = series.map((s) => {
    const first = s.values[0] ?? 0;
    const last = s.values.at(-1) ?? 0;
    return {
      value: last,
      label: `${s.label} followers`,
      sublabel: `up from ${first}`,
      href: SOCIAL_LINKS[s.key],
      icon: (
        <Image
          alt={s.label}
          className={cn("h-4 w-4", s.invertDark && "dark:invert")}
          height={16}
          src={s.icon}
          width={16}
        />
      ),
      children: <Sparkline values={s.values} />,
    };
  });

  stats.push({
    value: LINKEDIN.impressions,
    label: "LinkedIn impressions",
    sublabel: `${new Intl.NumberFormat("en-US").format(LINKEDIN.reached)} people reached`,
    href: LINKEDIN.href,
    icon: (
      <Image
        alt="LinkedIn"
        className="h-4 w-4"
        height={16}
        src="/logos/linkedin.svg"
        width={16}
      />
    ),
  });

  return (
    <section>
      <SectionTitle aside={`since ${since}`}>showed up</SectionTitle>

      <Reveal>
        <p className="max-w-lg text-muted-foreground text-xl leading-relaxed md:text-2xl">
          Went live and posted{" "}
          <span className="text-foreground">every single day</span>, starting
          from zero followers.
        </p>
      </Reveal>

      <StatGrid className="mt-8 auto-rows-[190px]" stats={stats} />

      <div className="mt-16 grid items-center gap-8 md:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <p className="font-semibold text-3xl text-foreground tracking-tight md:text-4xl">
            One post hit different.
          </p>
          <p className="mt-2 text-muted-foreground">Go on, tap the heart.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <ThreadsPost />
        </Reveal>
      </div>
    </section>
  );
}
