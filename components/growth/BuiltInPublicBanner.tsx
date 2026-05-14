"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { TextShimmer } from "@/components/motion-primitives/text-shimmer";
import {
  PLATFORM_CONFIG,
  PLATFORMS,
  socialGrowthData,
} from "@/data/social-growth";

const TOTAL_DAYS = 365;

export function BuiltInPublicBanner() {
  const latest = socialGrowthData[socialGrowthData.length - 1];
  const prev =
    socialGrowthData.length > 1
      ? socialGrowthData[socialGrowthData.length - 2]
      : null;
  const day = socialGrowthData.length;
  const pct = (day / TOTAL_DAYS) * 100;

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <Link className="group mb-6 block" href="/analytics">
      <motion.div
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        className="space-y-4 rounded-2xl border border-border/60 bg-muted/20 p-5 backdrop-blur-md transition-colors group-hover:border-border group-hover:bg-muted/30"
        initial={{ opacity: 0, y: 12 }}
        ref={ref}
        transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <TextShimmer className="font-semibold text-sm" duration={3}>
              Building in public
            </TextShimmer>
          </div>
          <span className="text-muted-foreground text-xs tabular-nums">
            Day {day} <span className="opacity-60">of {TOTAL_DAYS}</span>
          </span>
        </div>

        {/* Year progress bar */}
        <div className="space-y-1.5">
          <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              animate={inView ? { width: `${pct}%` } : { width: 0 }}
              className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
              initial={{ width: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            />
          </div>
          <p className="text-muted-foreground text-xs">
            {pct.toFixed(1)}% of a year — $0 → $1 MRR
          </p>
        </div>

        {/* Platform stats */}
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {PLATFORMS.map((p) => {
            const { label, logo, invertOnDark } = PLATFORM_CONFIG[p];
            const count = latest[p];
            const d = prev ? count - prev[p] : 0;
            return (
              <div
                className="flex flex-col gap-1 rounded-xl bg-muted/30 px-2.5 py-2"
                key={p}
              >
                <Image
                  alt={label}
                  className={
                    invertOnDark ? "opacity-60 dark:invert" : "opacity-60"
                  }
                  height={11}
                  src={logo}
                  width={11}
                />
                <div className="flex items-baseline gap-1">
                  <span className="font-semibold text-sm tabular-nums">
                    {count}
                  </span>
                  {d !== 0 && (
                    <span
                      className="font-medium text-[10px] tabular-nums leading-none"
                      style={{ color: d > 0 ? "#22c55e" : "#ef4444" }}
                    >
                      {d > 0 ? "+" : ""}
                      {d}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </Link>
  );
}
