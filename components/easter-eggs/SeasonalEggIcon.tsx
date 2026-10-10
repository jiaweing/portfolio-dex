"use client";

import { Egg } from "lucide-react";
import {
  type SeasonalEffect,
  useSeasonalEffect,
} from "@/hooks/use-seasonal-effect";
import { cn } from "@/lib/utils";

// Spot positions sit inside lucide's Egg outline (24x24 viewBox)
const SPOTS = [
  { cx: 10, cy: 10.5, r: 1.4 },
  { cx: 14.6, cy: 13.4, r: 1.7 },
  { cx: 10.4, cy: 16.6, r: 1.15 },
  { cx: 13.8, cy: 7.6, r: 0.95 },
  { cx: 15.2, cy: 17.6, r: 0.8 },
];

const SPOT_COLORS: Record<NonNullable<SeasonalEffect>, string[]> = {
  embers: ["fill-orange-500", "fill-violet-500"],
  snow: ["fill-red-500", "fill-green-600"],
  confetti: ["fill-yellow-400", "fill-pink-500", "fill-sky-400"],
};

// The lucide egg, decorated with spots in the colours of the current season
export function SeasonalEggIcon({ className }: { className?: string }) {
  const effect = useSeasonalEffect();
  const colors = effect ? SPOT_COLORS[effect] : null;

  return (
    <span className={cn("relative inline-flex size-4", className)}>
      <Egg className="size-full" />
      {colors && (
        <svg
          aria-hidden
          className="absolute inset-0 size-full"
          viewBox="0 0 24 24"
        >
          {SPOTS.map((spot, i) => (
            <circle
              className={colors[i % colors.length]}
              cx={spot.cx}
              cy={spot.cy}
              key={`${spot.cx}-${spot.cy}`}
              r={spot.r}
            />
          ))}
        </svg>
      )}
    </span>
  );
}
