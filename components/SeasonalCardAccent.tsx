"use client";

import { useSeasonalEffect } from "@/hooks/use-seasonal-effect";
import { cn } from "@/lib/utils";

// Petal positions for a five petal plum blossom of radius 1
const PETALS = Array.from({ length: 5 }, (_, i) => {
  const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
  return { x: Math.cos(a), y: Math.sin(a) };
});

function Blossom({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g>
      {PETALS.map((p) => (
        <circle
          className="fill-pink-300"
          cx={x + p.x * r}
          cy={y + p.y * r}
          key={`${p.x}-${p.y}`}
          r={r * 0.75}
        />
      ))}
      <circle className="fill-yellow-400" cx={x} cy={y} r={r * 0.45} />
    </g>
  );
}

/**
 * A small seasonal decoration for cards. Drop it inside any `relative` card;
 * it never takes pointer events. `corner` picks where the corner pieces sit.
 */
export function SeasonalCardAccent({
  corner = "top-right",
  className,
}: {
  corner?: "top-right" | "bottom-right";
  className?: string;
}) {
  const effect = useSeasonalEffect();
  if (!effect) return null;

  const cornerClass =
    corner === "top-right" ? "top-0 right-0" : "right-0 bottom-0 rotate-90";

  if (effect === "snow") {
    // A snow cap resting on the top edge of the card
    return (
      <svg
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 z-10 h-3 w-full",
          className
        )}
        preserveAspectRatio="none"
        viewBox="0 0 100 10"
      >
        <path
          className="fill-white/90 dark:fill-zinc-100/90"
          d="M0 0 H100 V3 Q96 7 92 4 Q87 8 81 4.5 Q76 7.5 70 4 Q64 8 58 4.5 Q52 7 47 4 Q41 8.5 35 4.5 Q29 7 24 4 Q18 8 12 4.5 Q6 7.5 0 4 Z"
        />
      </svg>
    );
  }

  if (effect === "eggs") {
    // An egg peeking up from the bottom corner
    return (
      <svg
        aria-hidden
        className={cn(
          "pointer-events-none absolute right-4 bottom-0 z-10 h-7 w-6",
          className
        )}
        viewBox="0 0 24 28"
      >
        <path
          className="fill-sky-200"
          d="M12 4 C21 4 22 22 22 28 L2 28 C2 22 3 4 12 4 Z"
        />
        <path
          className="stroke-white"
          d="M3.5 17 L7 14 L10.5 17 L14 14 L17.5 17 L21 14"
          fill="none"
          strokeWidth="1.6"
        />
        <circle className="fill-pink-300" cx="9" cy="10" r="1.3" />
        <circle className="fill-yellow-300" cx="15" cy="23" r="1.3" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-10 size-12",
        cornerClass,
        className
      )}
      viewBox="0 0 48 48"
    >
      {effect === "embers" && (
        // A cobweb strung across the corner
        <g
          className="stroke-zinc-400/50 dark:stroke-zinc-500/60"
          fill="none"
          strokeWidth="0.7"
        >
          <path d="M48 0 L8 0 M48 0 L14 22 M48 0 L30 34 M48 0 L48 40" />
          {[10, 19, 28, 37].map((r) => (
            <path
              d={`M ${48 - r} 0 Q ${48 - r * 0.72} ${r * 0.28} ${48 - r * 0.75} ${r * 0.47} Q ${48 - r * 0.5} ${r * 0.62} ${48 - r * 0.38} ${r * 0.72} Q ${48 - r * 0.12} ${r * 0.8} 48 ${r}`}
              key={r}
            />
          ))}
        </g>
      )}
      {effect === "confetti" &&
        [
          [40, 6, "#facc15", 20],
          [33, 12, "#ec4899", -30],
          [43, 17, "#38bdf8", 45],
          [27, 5, "#a78bfa", 10],
          [36, 22, "#f97316", -15],
          [22, 14, "#22c55e", 60],
        ].map(([x, y, color, rot]) => (
          <rect
            fill={color as string}
            height="2.4"
            key={`${x}-${y}`}
            rx="0.6"
            transform={`rotate(${rot} ${x} ${y})`}
            width="5"
            x={(x as number) - 2.5}
            y={(y as number) - 1.2}
          />
        ))}
      {effect === "blossoms" && (
        <g>
          <path
            className="stroke-amber-900/70"
            d="M48 2 Q34 6 26 16 Q20 23 12 26 M34 7 Q36 14 33 20"
            fill="none"
            strokeLinecap="round"
            strokeWidth="1.4"
          />
          <Blossom r={2.6} x={27} y={15} />
          <Blossom r={2.2} x={14} y={25} />
          <Blossom r={2} x={34} y={20} />
          <Blossom r={1.8} x={40} y={5} />
        </g>
      )}
      {effect === "hearts" &&
        [
          [38, 9, 1, "#f43f5e"],
          [28, 7, 0.7, "#f9a8d4"],
          [41, 21, 0.6, "#fb7185"],
        ].map(([x, y, s, color]) => (
          <path
            d="M0 6 C-7 1 -5 -6 0 -2 C5 -6 7 1 0 6 Z"
            fill={color as string}
            key={`${x}-${y}`}
            transform={`translate(${x} ${y}) scale(${s})`}
          />
        ))}
    </svg>
  );
}
