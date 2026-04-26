"use client";

import {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  formatISO,
  getDay,
  getYear,
  nextDay,
  parseISO,
  subWeeks,
} from "date-fns";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Suspense,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
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

const REVEAL_DURATION = 1.0;
const SWEEP_EDGE_PCT = 8;

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
  date: string;
  ti: number;
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

function sweepDelay(wi: number, centerWi: number, halfWeeks: number) {
  const dist = Math.abs(wi - centerWi) / halfWeeks;
  return REVEAL_DURATION * (1 - Math.sqrt(1 - Math.min(1, dist)));
}

const cellPopStyle = {
  transformBox: "fill-box" as const,
  transformOrigin: "center",
} as const;

function YearBand({
  band,
  ti,
  centerWi,
  maxWeeks,
  hovered,
  onHoverChange,
  reduced,
}: {
  band: ReturnType<typeof buildWeeks>;
  ti: number;
  centerWi: number;
  maxWeeks: number;
  hovered: HoverState;
  onHoverChange: (state: HoverState) => void;
  reduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "300px 0px" });

  const jitter = useMemo(() => {
    const map = new Map<string, number>();
    band.forEach((week, wi) =>
      week.forEach((_, di) => map.set(`${wi}-${di}`, Math.random() * 0.18))
    );
    return map;
  }, [band]);

  const bandH = ROWS * CELL - GAP;
  const vw = band.length * CELL - GAP;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      const svgX = (e.clientX - rect.left) * (vw / rect.width);
      const svgY = (e.clientY - rect.top) * (bandH / rect.height);
      const wi = Math.floor(svgX / CELL);
      const di = Math.floor(svgY / CELL);
      const activity = band[wi]?.[di];
      if (!activity) {
        onHoverChange(null);
        return;
      }
      onHoverChange({
        activity,
        x: rect.left + ((wi * CELL + BLOCK / 2) / vw) * rect.width,
        y: rect.top + ((di * CELL) / bandH) * rect.height,
        date: activity.date,
        ti,
        wi,
        di,
      });
    },
    [band, bandH, vw, ti, onHoverChange]
  );

  return (
    <div ref={ref} style={{ width: "100%", aspectRatio: `${vw} / ${bandH}` }}>
      {inView && (
        <svg
          className="cursor-crosshair"
          onMouseLeave={() => onHoverChange(null)}
          onMouseMove={handleMouseMove}
          overflow="visible"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: "block", width: "100%" }}
          viewBox={`0 0 ${vw} ${bandH}`}
        >
          {band.map((week, wi) => {
            const base = reduced ? 0 : sweepDelay(wi, centerWi, maxWeeks / 2);
            return week.map((activity, di) => {
              if (!activity) return null;
              const isHovered =
                hovered?.ti === ti && hovered?.wi === wi && hovered?.di === di;
              const delay = base + (jitter.get(`${wi}-${di}`) ?? 0);
              return (
                <g
                  key={`${wi}-${di}`}
                  style={
                    reduced
                      ? undefined
                      : {
                          ...cellPopStyle,
                          animation: `cellPop 0.35s cubic-bezier(0.34,1.56,0.64,1) ${delay.toFixed(3)}s both`,
                        }
                  }
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
            });
          })}
        </svg>
      )}
    </div>
  );
}

function Wallpaper({
  data,
  hovered,
  onHoverChange,
  fullPage = false,
  reduced = false,
}: {
  data: Activity[];
  hovered: HoverState;
  onHoverChange: (state: HoverState) => void;
  fullPage?: boolean;
  reduced?: boolean;
}) {
  const weeks = useMemo(() => buildWeeks(data), [data]);
  if (!weeks.length) return null;

  const yearBands = useMemo(() => {
    if (!fullPage) return null;
    const byYear = new Map<number, Activity[]>();
    for (const a of data) {
      const y = getYear(parseISO(a.date));
      if (!byYear.has(y)) byYear.set(y, []);
      byYear.get(y)!.push(a);
    }
    return [...byYear.entries()]
      .sort(([a], [b]) => b - a)
      .map(([, acts]) => buildWeeks(acts));
  }, [data, fullPage]);

  // Only used for home banner (fullPage uses per-YearBand jitter)
  const jitter = useMemo(() => {
    if (fullPage) return new Map<string, number>();
    const map = new Map<string, number>();
    weeks.forEach((week, wi) =>
      week.forEach((_, di) => map.set(`${wi}-${di}`, Math.random() * 0.18))
    );
    return map;
  }, [weeks, fullPage]);

  const bandH = ROWS * CELL - GAP;

  if (fullPage && yearBands && yearBands.length > 0) {
    const maxWeeks = Math.max(...yearBands.map((b) => b.length));
    const centerWi = (maxWeeks - 1) / 2;

    return (
      <div
        className="cursor-crosshair"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: BLOCK,
          width: "100%",
        }}
      >
        {yearBands.map((band, ti) => (
          <YearBand
            band={band}
            centerWi={centerWi}
            hovered={hovered}
            key={ti}
            maxWeeks={maxWeeks}
            onHoverChange={onHoverChange}
            reduced={reduced}
            ti={ti}
          />
        ))}
      </div>
    );
  }

  // Home banner: single band
  const vw = weeks.length * CELL - GAP;
  const vh = bandH;
  const centerWi = (weeks.length - 1) / 2;

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const svgX = (e.clientX - rect.left) * (vw / rect.width);
    const svgY = (e.clientY - rect.top) * (vh / rect.height);
    const wi = Math.floor(svgX / CELL);
    const di = Math.floor(svgY / CELL);
    const activity = weeks[wi]?.[di];
    if (!activity) {
      onHoverChange(null);
      return;
    }
    onHoverChange({
      activity,
      x: rect.left + ((wi * CELL + BLOCK / 2) / vw) * rect.width,
      y: rect.top + ((di * CELL) / vh) * rect.height,
      date: activity.date,
      ti: 0,
      wi,
      di,
    });
  };

  return (
    <svg
      className="cursor-crosshair"
      onMouseLeave={() => onHoverChange(null)}
      onMouseMove={handleMouseMove}
      overflow="visible"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", width: "100%", height: "auto" }}
      viewBox={`0 0 ${vw} ${vh}`}
    >
      {weeks.map((week, wi) => {
        const base = reduced ? 0 : sweepDelay(wi, centerWi, weeks.length / 2);
        return week.map((activity, di) => {
          if (!activity) return null;
          const isHovered =
            hovered?.ti === 0 && hovered?.wi === wi && hovered?.di === di;
          const delay = base + (jitter.get(`${wi}-${di}`) ?? 0);
          return (
            <g
              key={`${wi}-${di}`}
              style={
                reduced
                  ? undefined
                  : {
                      ...cellPopStyle,
                      animation: `cellPop 0.35s cubic-bezier(0.34,1.56,0.64,1) ${delay.toFixed(3)}s both`,
                    }
              }
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
        });
      })}
    </svg>
  );
}

function BannerContent({
  contributions,
  hovered,
  onHoverChange,
  fullPage,
  reduced,
}: {
  contributions: Promise<Activity[]>;
  hovered: HoverState;
  onHoverChange: (state: HoverState) => void;
  fullPage?: boolean;
  reduced?: boolean;
}) {
  const data = use(contributions);
  return (
    <Wallpaper
      data={data}
      fullPage={fullPage}
      hovered={hovered}
      onHoverChange={onHoverChange}
      reduced={reduced}
    />
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
            <SlidingNumber
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 0.8,
              }}
              value={Number(format(parseISO(hovered.activity.date), "d"))}
            />
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
  fullPage = false,
}: {
  contributions: Promise<Activity[]>;
  fullPage?: boolean;
}) {
  const reduced = useReducedMotion();
  const router = useRouter();
  const [hovered, setHovered] = useState<HoverState>(null);
  const onHoverChange = useCallback(
    (state: HoverState) => setHovered(state),
    []
  );

  const progress = useMotionValue(reduced ? 1 : 0);

  useEffect(() => {
    if (reduced) return;
    const controls = animate(progress, 1, {
      duration: REVEAL_DURATION,
      ease: "easeOut",
    });
    return controls.stop;
  }, [progress, reduced]);

  const sweepMask = useTransform(progress, (p) => {
    const leftEdge = 50 - p * 50;
    const rightEdge = 50 + p * 50;
    const leftFade = Math.max(0, leftEdge - SWEEP_EDGE_PCT);
    const rightFade = Math.min(100, rightEdge + SWEEP_EDGE_PCT);
    return `linear-gradient(to right, transparent ${leftFade.toFixed(1)}%, black ${leftEdge.toFixed(1)}%, black ${rightEdge.toFixed(1)}%, transparent ${rightFade.toFixed(1)}%)`;
  });

  if (fullPage) {
    return (
      <>
        <motion.div
          style={{
            position: "relative",
            width: "100vw",
            marginLeft: "calc(-50vw + 50%)",
            marginTop: "-6.5rem",
            marginBottom: "-4.5rem",
            zIndex: 0,
            maskImage: sweepMask,
            WebkitMaskImage: sweepMask,
          }}
        >
          <div
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
                fullPage
                hovered={hovered}
                onHoverChange={onHoverChange}
                reduced={reduced ?? false}
              />
            </Suspense>
          </div>
        </motion.div>
        <HoverTooltip hovered={hovered} />
      </>
    );
  }

  return (
    <>
      <motion.div
        onClick={() => router.push("/contributions")}
        style={{
          position: "absolute",
          top: "-6.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100vw",
          height: "22rem",
          overflow: "hidden",
          zIndex: 0,
          cursor: "pointer",
          maskImage: sweepMask,
          WebkitMaskImage: sweepMask,
        }}
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
              reduced={reduced ?? false}
            />
          </Suspense>
        </div>
        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: "90%",
            background:
              "linear-gradient(to bottom, transparent 0%, var(--background) 65%)",
          }}
        />
        {/* Click-blocker covers faded area */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{ height: "45%" }}
        />
      </motion.div>

      <HoverTooltip hovered={hovered} />
    </>
  );
}
