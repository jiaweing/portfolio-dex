"use client";

import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  SEASONAL_EVENT,
  type SeasonalEffect,
} from "@/hooks/use-seasonal-effect";
import {
  currentSeason,
  type Season,
  seasonForEffect,
  seasonYear,
} from "@/lib/seasons";

// Bump these when a new Wrapped ships. For RECENT_DAYS after release the
// Wrapped announcement wins over any seasonal greeting.
const WRAPPED_YEAR = 2025;
const WRAPPED_RELEASED = new Date("2025-12-20");
const RECENT_DAYS = 45;

// One palette per announcement drives the text shimmer and the icon gradient
const WRAPPED_COLORS = [
  "rgb(59, 130, 246)",
  "rgb(168, 85, 247)",
  "rgb(239, 68, 68)",
  "rgb(249, 115, 22)",
];

// Repeats the first colour at the end so the 200% wide shimmer loops seamlessly
function toStops(colors: string[]) {
  const loop = [...colors, colors[0]];
  return loop.map((color, i) => ({ color, offset: i / (loop.length - 1) }));
}

function toGradient(colors: string[]) {
  const stops = toStops(colors)
    .map(({ color, offset }) => `${color} ${Math.round(offset * 100)}%`)
    .join(", ");
  return `linear-gradient(120deg, ${stops})`;
}

const GREETINGS: Record<
  Season,
  {
    before: string;
    highlight: (year: number) => string;
    after: TrailingText;
    colors: string[];
  }
> = {
  halloween: {
    before: "Happy",
    highlight: () => "Halloween",
    after: "from the void!",
    // Pumpkin, witch purple, slime green
    colors: ["rgb(249, 115, 22)", "rgb(147, 51, 234)", "rgb(132, 204, 22)"],
  },
  christmas: {
    before: "Merry",
    highlight: () => "Christmas",
    after: "and happy holidays!",
    // Santa red, tree green, tinsel gold
    colors: ["rgb(220, 38, 38)", "rgb(22, 163, 74)", "rgb(234, 179, 8)"],
  },
  newyear: {
    before: "Happy",
    highlight: (year) => `New Year ${year}`,
    after: "and cheers to more!",
    // Champagne gold, firework pink, midnight blue
    colors: ["rgb(250, 204, 21)", "rgb(236, 72, 153)", "rgb(59, 130, 246)"],
  },
  lunarnewyear: {
    before: "Happy",
    highlight: () => "Lunar New Year",
    after: "and huat ah!",
    // Lantern red, gold, mandarin orange
    colors: ["rgb(220, 38, 38)", "rgb(234, 179, 8)", "rgb(249, 115, 22)"],
  },
  valentines: {
    before: "Happy",
    highlight: () => "Valentine's Day",
    after: "and spread the love!",
    // Rose, pink, deep red
    colors: ["rgb(244, 63, 94)", "rgb(236, 72, 153)", "rgb(190, 18, 60)"],
  },
  easter: {
    before: "Happy",
    highlight: () => "Easter",
    after: "and happy egg hunting!",
    // Pastel pink, yellow, sky, lilac
    colors: [
      "rgb(244, 114, 182)",
      "rgb(250, 204, 21)",
      "rgb(56, 189, 248)",
      "rgb(167, 139, 250)",
    ],
  },
};

// Every greeting needs plain words after the gradient so it never ends on the
// highlight alone, which looks cut off
type TrailingText = `${string} ${string}`;

type Announcement = {
  // Each announcement has its own dismiss key, so a new season shows again
  key: string;
  href?: string;
  before: string;
  highlight: string;
  after: string;
  colors: string[];
  isWrapped: boolean;
};

// `season` comes from the active seasonal effect. A manual pick from the footer
// always shows its greeting, the date based one gives way to a fresh Wrapped.
function pickAnnouncement(
  season: Season | null,
  manual = false,
  now = new Date()
): Announcement {
  const wrapped: Announcement = {
    key: `wrapped-banner-dismissed-${WRAPPED_YEAR}`,
    href: "/wrapped",
    before: "My",
    highlight: `${WRAPPED_YEAR} Wrapped`,
    after: "is here!",
    colors: WRAPPED_COLORS,
    isWrapped: true,
  };
  const sinceRelease =
    (now.getTime() - WRAPPED_RELEASED.getTime()) / 86_400_000;
  const wrappedIsFresh = sinceRelease >= 0 && sinceRelease < RECENT_DAYS;
  if (!season || (wrappedIsFresh && !manual)) {
    return wrapped;
  }
  const year = seasonYear(season, now);
  const greeting = GREETINGS[season];
  return {
    key: `season-banner-dismissed-${season}-${year}`,
    before: greeting.before,
    highlight: greeting.highlight(year),
    after: greeting.after,
    colors: greeting.colors,
    isWrapped: false,
  };
}

export function WrappedBanner({
  onHoverChange,
}: {
  onHoverChange?: (isHovered: boolean) => void;
}) {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    const show = (next: Announcement, ignoreDismissed: boolean) => {
      try {
        if (!ignoreDismissed && localStorage.getItem(next.key)) {
          setAnnouncement(null);
          return;
        }
      } catch {
        // Storage blocked, just show it
      }
      setAnnouncement(next);
    };

    show(pickAnnouncement(currentSeason()), false);

    // Follow effects picked from the footer so the greeting matches what's on screen
    const onEffect = (e: Event) => {
      const { effect } = (e as CustomEvent<{ effect: SeasonalEffect }>).detail;
      const season = seasonForEffect(effect);
      show(pickAnnouncement(season, true), Boolean(season));
    };
    window.addEventListener(SEASONAL_EVENT, onEffect);
    return () => window.removeEventListener(SEASONAL_EVENT, onEffect);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!announcement) return;
    try {
      localStorage.setItem(announcement.key, "true");
    } catch {
      // Storage blocked, hide for this visit only
    }
    setAnnouncement(null);
  };

  if (!announcement) return null;

  // Only the Wrapped announcement drives the rainbow page border on hover
  const hover = announcement.isWrapped ? onHoverChange : undefined;
  const href = announcement.href;
  const wrap = (children: React.ReactNode) =>
    href ? (
      <Link className="group relative block w-fit rounded-xl" href={href}>
        {children}
      </Link>
    ) : (
      <div className="group relative block w-fit rounded-xl">{children}</div>
    );

  return (
    <AnimatePresence>
      <motion.div
        animate={{ height: "auto", opacity: 1 }}
        className="relative overflow-hidden"
        exit={{ height: 0, opacity: 0 }}
        initial={{ height: 0, opacity: 0 }}
      >
        {wrap(
          <>
            {/* Border Container */}
            <div className="relative overflow-hidden rounded-xl">
              <div
                className="relative flex w-fit items-center gap-2 rounded-xl px-4 py-3 pr-10 font-medium text-sm transition-colors"
                onMouseEnter={() => hover?.(true)}
                onMouseLeave={() => hover?.(false)}
              >
                {/* Icon Shimmer Gradient Definition */}
                <svg className="absolute h-0 w-0">
                  <defs>
                    <linearGradient
                      id="icon-shimmer"
                      spreadMethod="repeat"
                      x1="0"
                      x2="1"
                      y1="0"
                      y2="0"
                    >
                      {toStops(announcement.colors).map(({ color, offset }) => (
                        <stop key={offset} offset={offset} stopColor={color} />
                      ))}
                      <animateTransform
                        attributeName="gradientTransform"
                        dur="4s"
                        from="-1 0"
                        repeatCount="indefinite"
                        to="0 0"
                        type="translate"
                      />
                    </linearGradient>
                  </defs>
                </svg>

                <span className="text-zinc-600 dark:text-zinc-400">
                  {announcement.before}
                </span>
                <motion.div
                  animate={{
                    backgroundPosition: ["0% center", "200% center"],
                  }}
                  className="font-semibold"
                  style={{
                    backgroundImage: toGradient(announcement.colors),
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                  transition={{
                    duration: 4,
                    ease: "linear",
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <span>{announcement.highlight}</span>
                </motion.div>
                <span className="text-zinc-600 dark:text-zinc-400">
                  {announcement.after}
                </span>
              </div>

              {/* Dismiss Button */}
              <button
                aria-label="Dismiss banner"
                className="absolute top-1/2 right-3 z-20 -translate-y-1/2 rounded-full p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                onClick={handleDismiss}
                type="button"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
