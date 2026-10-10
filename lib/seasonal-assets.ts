import type { SeasonalEffect } from "@/hooks/use-seasonal-effect";

// Fluent 3D emoji and words for each seasonal effect, shared by the bio and page headings
export const SEASONAL_EMOJI: Record<
  NonNullable<SeasonalEffect>,
  { icon: string; label: string; adjectives: string[] }
> = {
  embers: {
    icon: "/images/icons/Jack-O-Lantern.png",
    label: "Jack-o'-lantern",
    adjectives: ["spooky"],
  },
  snow: {
    icon: "/images/icons/Snowman.png",
    label: "Snowman",
    adjectives: ["snowy", "festive"],
  },
  confetti: {
    icon: "/images/icons/Fireworks.png",
    label: "Fireworks",
    adjectives: ["sparkly"],
  },
  blossoms: {
    icon: "/images/icons/Red Paper Lantern.png",
    label: "Red lantern",
    adjectives: ["prosperous", "huat"],
  },
  hearts: {
    icon: "/images/icons/Heart with Ribbon.png",
    label: "Heart with ribbon",
    adjectives: ["lovely"],
  },
  eggs: {
    icon: "/images/icons/Rabbit Face.png",
    label: "Rabbit",
    adjectives: ["hoppy"],
  },
};
