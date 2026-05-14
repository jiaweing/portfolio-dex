"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import {
  PLATFORM_CONFIG,
  PLATFORMS,
  type Platform,
  type SocialSnapshot,
} from "@/data/social-growth";

interface Props {
  data: SocialSnapshot[];
}

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}) {
  if (!(active && payload?.length)) return null;
  return (
    <div className="rounded-xl border border-border bg-background/95 p-3 shadow-lg backdrop-blur-sm">
      <p className="mb-2 font-medium text-foreground text-sm">{label}</p>
      <div className="space-y-1">
        {[...payload]
          .sort((a, b) => b.value - a.value)
          .map((entry) => (
            <div
              className="flex items-center justify-between gap-4 text-xs"
              key={entry.name}
            >
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-muted-foreground">{entry.name}</span>
              </span>
              <span className="font-medium text-foreground tabular-nums">
                {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

export function GrowthChart({ data }: Props) {
  const [hidden, setHidden] = useState<Set<Platform>>(new Set());
  const { resolvedTheme } = useTheme();

  const axisColor =
    resolvedTheme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  const gridColor =
    resolvedTheme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  function toggle(p: Platform) {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });
  }

  const chartData = data.map((snap) => ({
    label: `Day ${snap.day}`,
    ...PLATFORMS.reduce(
      (acc, p) => ({ ...acc, [PLATFORM_CONFIG[p].label]: snap[p] }),
      {} as Record<string, number>
    ),
  }));

  const visible = PLATFORMS.filter((p) => !hidden.has(p));

  return (
    <div className="space-y-3">
      {/* Platform toggles — logo only, centered */}
      <div className="flex items-center justify-center gap-1.5">
        {PLATFORMS.map((p) => {
          const { label, color, logo, invertOnDark } = PLATFORM_CONFIG[p];
          const isHidden = hidden.has(p);
          return (
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-150"
              key={p}
              onClick={() => toggle(p)}
              style={{
                borderColor: isHidden ? "hsl(var(--border))" : color,
                backgroundColor: isHidden ? undefined : `${color}18`,
                opacity: isHidden ? 0.3 : 1,
              }}
              title={label}
              type="button"
            >
              <Image
                alt={label}
                className={invertOnDark ? "dark:invert" : ""}
                height={12}
                src={logo}
                width={12}
              />
            </button>
          );
        })}
      </div>

      <ResponsiveContainer height="100%" minHeight={400} width="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
          style={{ height: "min(calc(100vh - 420px), 480px)", minHeight: 280 }}
        >
          <defs>
            {PLATFORMS.map((p) => (
              <linearGradient
                id={`fill-${p}`}
                key={p}
                x1="0"
                x2="0"
                y1="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={PLATFORM_CONFIG[p].color}
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor={PLATFORM_CONFIG[p].color}
                  stopOpacity={0}
                />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid
            stroke={gridColor}
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            axisLine={false}
            dataKey="label"
            padding={{ left: 24, right: 0 }}
            tick={{ fontSize: 11, fill: axisColor }}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          {visible.map((p) => (
            <Area
              activeDot={{ r: 4, strokeWidth: 0 }}
              dataKey={PLATFORM_CONFIG[p].label}
              dot={false}
              fill={`url(#fill-${p})`}
              key={p}
              stroke={PLATFORM_CONFIG[p].color}
              strokeWidth={2}
              type="monotone"
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
