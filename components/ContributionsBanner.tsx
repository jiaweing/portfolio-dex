"use client";

import {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  formatISO,
  getDay,
  nextDay,
  parseISO,
  subWeeks,
} from "date-fns";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Suspense,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";

import type { Activity } from "@/components/contribution-graph";
import { SlidingNumber } from "@/components/motion-primitives/sliding-number";

const BLOCK = 13;
const GAP = 4;
const CELL = BLOCK + GAP;
const ROWS = 7;
const RADIUS = 3;

const GREEN: Record<number, string> = {
  0: "rgba(34,197,94,0.04)",
  1: "rgba(34,197,94,0.18)",
  2: "rgba(34,197,94,0.35)",
  3: "rgba(34,197,94,0.52)",
  4: "rgba(34,197,94,0.70)",
};

type HoverState = {
  activity: Activity;
  x: number;
  y: number;
  wi: number;
  di: number;
} | null;

function buildWeeks(activities: Activity[]) {
  if (!activities.length) return [];
  const sorted = [...activities].sort((a, b) => a.date.localeCompare(b.date));
  const map = new Map(activities.map((a) => [a.date, a]));

  const filled: Activity[] = eachDayOfInterval({
    start: parseISO(sorted[0]!.date),
    end: parseISO(sorted[sorted.length - 1]!.date),
  }).map((day) => {
    const date = formatISO(day, { representation: "date" });
    return map.get(date) ?? { date, count: 0, level: 0 };
  });

  const firstDate = parseISO(filled[0]!.date);
  const calStart =
    getDay(firstDate) === 0 ? firstDate : subWeeks(nextDay(firstDate, 0), 1);
  const pad = differenceInCalendarDays(firstDate, calStart);
  const padded = [...Array(pad).fill(undefined), ...filled] as Array<
    Activity | undefined
  >;
  const n = Math.ceil(padded.length / 7);
  return Array.from({ length: n }, (_, i) => padded.slice(i * 7, i * 7 + 7));
}

function Wallpaper({
  data,
  hovered,
  onHoverChange,
}: {
  data: Activity[];
  hovered: HoverState;
  onHoverChange: (state: HoverState) => void;
}) {
  const weeks = useMemo(() => buildWeeks(data), [data]);
  if (!weeks.length) return null;

  const vw = weeks.length * CELL - GAP;
  const vh = ROWS * CELL - GAP;

  return (
    <svg
      className="cursor-crosshair"
      height="100%"
      onMouseLeave={() => onHoverChange(null)}
      preserveAspectRatio="xMidYMid slice"
      viewBox={`0 0 ${vw} ${vh}`}
      width="100%"
    >
      {weeks.map((week, wi) =>
        week.map((activity, di) => {
          if (!activity) return null;
          const isHovered = hovered?.wi === wi && hovered?.di === di;
          return (
            <g
              key={`${wi}-${di}`}
              onMouseEnter={(e) => {
                const bbox = (
                  e.currentTarget as SVGGElement
                ).getBoundingClientRect();
                onHoverChange({
                  activity,
                  x: bbox.left + bbox.width / 2,
                  y: bbox.top,
                  wi,
                  di,
                });
              }}
            >
              <rect
                fill={GREEN[Math.min(activity.level, 4)] ?? GREEN[0]}
                height={BLOCK}
                rx={RADIUS}
                ry={RADIUS}
                width={BLOCK}
                x={wi * CELL}
                y={di * CELL}
              />
              {isHovered && (
                <rect
                  fill="none"
                  height={BLOCK + 4}
                  pointerEvents="none"
                  rx={RADIUS + 2}
                  ry={RADIUS + 2}
                  stroke="rgba(34,197,94,0.9)"
                  strokeWidth={1.5}
                  width={BLOCK + 4}
                  x={wi * CELL - 2}
                  y={di * CELL - 2}
                />
              )}
            </g>
          );
        })
      )}
    </svg>
  );
}

function BannerContent({
  contributions,
  hovered,
  onHoverChange,
}: {
  contributions: Promise<Activity[]>;
  hovered: HoverState;
  onHoverChange: (state: HoverState) => void;
}) {
  const data = use(contributions);
  return (
    <Wallpaper data={data} hovered={hovered} onHoverChange={onHoverChange} />
  );
}

function HoverTooltip({ hovered }: { hovered: HoverState }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {hovered && (
        <motion.div
          // Stable key — stays mounted while hovering so SlidingNumber animates between values
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            left: hovered.x,
            top: hovered.y - 10,
          }}
          className="pointer-events-none rounded-md border border-border/50 bg-background/60 px-2.5 py-1.5 shadow-md backdrop-blur-md"
          exit={{ opacity: 0, y: 6, scale: 0.95 }}
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          key="contributions-tooltip"
          style={{
            position: "fixed",
            transform: "translate(-50%, -100%)",
            zIndex: 9999,
            fontSize: 12,
            lineHeight: 1.5,
            whiteSpace: "nowrap",
          }}
          transition={{ duration: 0.12 }}
        >
          <div className="flex items-center gap-1 text-muted-foreground">
            <SlidingNumber
              className="font-medium text-foreground"
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 0.8,
              }}
              value={hovered.activity.count}
            />
            <span>
              {hovered.activity.count !== 1 ? "contributions" : "contribution"}
            </span>
            <span>on</span>
            {/* Month — slides only when month changes */}
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-40%", opacity: 0 }}
                initial={{ y: "40%", opacity: 0 }}
                key={format(parseISO(hovered.activity.date), "MMM")}
                style={{ display: "inline-block" }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {format(parseISO(hovered.activity.date), "MMM")}
              </motion.span>
            </AnimatePresence>
            {/* Day — SlidingNumber rolls the day digit */}
            <SlidingNumber
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 0.8,
              }}
              value={Number(format(parseISO(hovered.activity.date), "d"))}
            />
            {/* Year — slides only when year changes */}
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-40%", opacity: 0 }}
                initial={{ y: "40%", opacity: 0 }}
                key={format(parseISO(hovered.activity.date), "yyyy")}
                style={{ display: "inline-block" }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {format(parseISO(hovered.activity.date), "yyyy")}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function ContributionsBanner({
  contributions,
}: {
  contributions: Promise<Activity[]>;
}) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState<HoverState>(null);
  const onHoverChange = useCallback(
    (state: HoverState) => setHovered(state),
    []
  );

  return (
    <>
      <motion.div
        animate={{ clipPath: "inset(0 0% 0 0%)" }}
        initial={{
          clipPath: reduced ? "inset(0 0% 0 0%)" : "inset(0 50% 0 50%)",
        }}
        style={{
          position: "absolute",
          // Cancel pt-20 (5rem) + py-6 (1.5rem) from layout to reach page top
          top: "-6.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          height: "22rem",
          overflow: "hidden",
          zIndex: 0,
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          }}
        >
          <Suspense fallback={null}>
            <BannerContent
              contributions={contributions}
              hovered={hovered}
              onHoverChange={onHoverChange}
            />
          </Suspense>
        </div>
        {/* Bottom fade — visual only */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: "90%",
            background:
              "linear-gradient(to bottom, transparent 0%, var(--background) 65%)",
          }}
        />
        {/* Invisible click-blocker covers the fully opaque / invisible bottom region */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ height: "45%" }}
        />
      </motion.div>

      {/* Portal outside clipPath so tooltip is never clipped */}
      <HoverTooltip hovered={hovered} />
    </>
  );
}
