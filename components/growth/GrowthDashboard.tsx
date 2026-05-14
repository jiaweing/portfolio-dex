"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  PLATFORM_CONFIG,
  PLATFORMS,
  socialGrowthData,
} from "@/data/social-growth";
import type { Project } from "@/lib/notion";

interface Props {
  projects: Project[];
}

export function GrowthDashboard({ projects }: Props) {
  const total = socialGrowthData.length;
  const [idx, setIdx] = useState(total - 1);
  const snap = socialGrowthData[idx];
  const prev = idx > 0 ? socialGrowthData[idx - 1] : null;

  return (
    <div className="space-y-6">
      {/* Day navigator */}
      <div className="flex items-center gap-3">
        <button
          className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          disabled={idx === 0}
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          type="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-medium text-sm tabular-nums">
          Day {snap.day}{" "}
          <span className="font-normal text-muted-foreground">of {total}</span>
        </span>
        <button
          className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          disabled={idx === total - 1}
          onClick={() => setIdx((i) => Math.min(total - 1, i + 1))}
          type="button"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <span className="text-muted-foreground text-xs">{snap.date}</span>
      </div>

      {/* Title + story */}
      <div className="space-y-2">
        <h1 className="font-bold text-3xl tracking-tight">Built in Public</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          The leverage in AI right now is knowing what&apos;s out there. So
          I&apos;m currently building{" "}
          <span className="font-medium text-foreground">Update Night</span>, the
          searchable home for every tool, framework, SDK and library worth
          knowing. Livestreaming every step, from zero, for one year.{" "}
          <Link
            className="underline underline-offset-2 transition-colors hover:text-foreground"
            href="https://amajor.link/schedule"
            rel="noopener noreferrer"
            target="_blank"
          >
            Watch live
          </Link>
          .
        </p>
      </div>

      {/* Current projects from Notion */}
      {projects.length > 0 && (
        <div className="space-y-3">
          <p className="font-medium text-sm">I&apos;m currently building</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            {projects.map((p) => {
              const inner = (
                <div className="flex items-center gap-3 rounded-xl bg-muted/40 px-3 py-2.5 transition-colors hover:bg-muted/60">
                  {p.logo ? (
                    <Image
                      alt={p.title}
                      className="rounded-lg"
                      height={36}
                      src={`/api/notion-image?pageId=${p.id}&prop=logo`}
                      width={36}
                    />
                  ) : (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted font-bold text-muted-foreground text-sm">
                      {p.title[0]}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-medium text-sm">{p.title}</p>
                    {p.description && (
                      <p className="truncate text-muted-foreground text-xs">
                        {p.description}
                      </p>
                    )}
                  </div>
                </div>
              );

              return p.url ? (
                <Link
                  className="flex-1"
                  href={p.url}
                  key={p.id}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {inner}
                </Link>
              ) : (
                <div className="flex-1 opacity-60" key={p.id}>
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
        {PLATFORMS.map((p) => {
          const { label, logo, url, invertOnDark } = PLATFORM_CONFIG[p];
          const count = snap[p];
          const d = prev ? count - prev[p] : null;
          return (
            <Link
              className="group block"
              href={url}
              key={p}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="space-y-2 rounded-xl bg-muted/40 p-4 transition-colors group-hover:bg-muted/60">
                <Image
                  alt={label}
                  className={
                    invertOnDark ? "opacity-70 dark:invert" : "opacity-70"
                  }
                  height={16}
                  src={logo}
                  width={16}
                />
                <p className="font-bold text-2xl tabular-nums tracking-tight">
                  {count.toLocaleString()}
                </p>
                <p
                  className="text-xs tabular-nums"
                  style={{
                    color:
                      d === null
                        ? "transparent"
                        : d > 0
                          ? "#22c55e"
                          : d < 0
                            ? "#ef4444"
                            : "transparent",
                  }}
                >
                  {d !== null && d !== 0
                    ? `${d > 0 ? "+" : ""}${d} from Day ${snap.day - 1}`
                    : "—"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
