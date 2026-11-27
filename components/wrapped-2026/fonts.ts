import {
  Bricolage_Grotesque,
  Dela_Gothic_One,
  Gochi_Hand,
} from "next/font/google";

// The three voices of the 2026 page: a heavy display face for the logo and
// the big numbers, a grotesque with a width axis for everything you read,
// and a marker hand for notes in the margin

export const display = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-u26-display",
  display: "swap",
});

export const body = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-u26-body",
  display: "swap",
});

export const hand = Gochi_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-u26-hand",
  display: "swap",
});
