"use client";

import Image from "next/image";
import { useSeasonalEffect } from "@/hooks/use-seasonal-effect";
import { SEASONAL_EMOJI } from "@/lib/seasonal-assets";
import { cn } from "@/lib/utils";

// A small seasonal emoji to sit next to page headings; renders nothing off season
export function SeasonalEmoji({
  size = 18,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const effect = useSeasonalEffect();
  if (!effect) return null;
  const { icon, label } = SEASONAL_EMOJI[effect];
  return (
    <Image
      alt={label}
      className={cn(
        "inline-block shrink-0 align-text-bottom transition-transform duration-300 hover:-rotate-12 hover:scale-125",
        className
      )}
      height={size}
      src={icon}
      unoptimized
      width={size}
    />
  );
}
