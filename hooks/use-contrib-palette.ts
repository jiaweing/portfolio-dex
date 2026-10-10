"use client";

import {
  type SeasonalEffect,
  useSeasonalEffect,
} from "@/hooks/use-seasonal-effect";

// Four steps from least to most contributions, per seasonal effect
const PALETTES: Record<
  NonNullable<SeasonalEffect>,
  [string, string, string, string]
> = {
  embers: ["#fdba74", "#f97316", "#a855f7", "#84cc16"],
  snow: ["#86efac", "#22c55e", "#ef4444", "#b91c1c"],
  confetti: ["#fde68a", "#facc15", "#f472b6", "#db2777"],
  blossoms: ["#fde68a", "#f59e0b", "#ef4444", "#b91c1c"],
  hearts: ["#fbcfe8", "#f9a8d4", "#f43f5e", "#be123c"],
  eggs: ["#bbf7d0", "#a5f3fc", "#c4b5fd", "#f9a8d4"],
};

const GREEN = "#22c55e";

const withAlpha = (hex: string, alpha: number) => {
  const n = Number.parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

const BANNER_ALPHA = [0.04, 0.18, 0.35, 0.52, 0.7];

/** Seasonal colours for contribution graphs, falling back to GitHub green */
export function useContribPalette() {
  const effect = useSeasonalEffect();
  const steps = effect ? PALETTES[effect] : null;

  // Solid fills for the compact graph's levels 1 to 4 (level 0 stays muted)
  const solid = steps ?? null;

  // Translucent fills for the big wallpaper banner, levels 0 to 4
  const banner: Record<number, string> = Object.fromEntries(
    BANNER_ALPHA.map((alpha, level) => [
      level,
      withAlpha(steps ? steps[Math.max(level - 1, 0)] : GREEN, alpha),
    ])
  );

  const highlight = withAlpha(steps ? steps[3] : GREEN, 0.9);

  return { effect, solid, banner, highlight };
}
