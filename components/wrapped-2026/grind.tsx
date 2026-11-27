"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CODE_STATS } from "@/lib/wrapped-2026-data";
import { ChapterHead, CountUp, Rise, useSeen, type Vars } from "./parts";
import type { Day } from "./types";

/* Day 3: GitHub. The year's calendar is laid out like a tile map, the best
   day gets a flag, and the rest reads like the scoreboard at the end of a
   match. Streaks and active days are worked out from the calendar itself. */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const nf = new Intl.NumberFormat("en-US");

function formatDay(date: string) {
  const [, m, d] = date.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}`;
}

function summarise(days: Day[]) {
  let best = days[0];
  let streak = 0;
  let longest = 0;
  let active = 0;
  let total = 0;
  for (const d of days) {
    total += d.count;
    if (!best || d.count > best.count) {
      best = d;
    }
    if (d.count > 0) {
      active++;
      streak++;
      longest = Math.max(longest, streak);
    } else {
      streak = 0;
    }
  }
  return { best, longest, active, total };
}

function TileMap({ days, best }: { days: Day[]; best?: Day }) {
  const [ref, seen] = useSeen<HTMLDivElement>(0.3);
  const [hover, setHover] = useState<Day | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  // On a phone the map is wider than the screen: start at the recent end,
  // where the best day is
  useEffect(() => {
    const el = scroller.current;
    if (el && el.scrollWidth > el.clientWidth) {
      el.scrollLeft = el.scrollWidth;
    }
  }, []);

  const weeks = useMemo(() => {
    if (days.length === 0) {
      return [];
    }
    // Pad the front so Jan 1 sits on its weekday row
    const first = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
    const padded: (Day | null)[] = [...new Array(first).fill(null), ...days];
    const out: (Day | null)[][] = [];
    for (let i = 0; i < padded.length; i += 7) {
      out.push(padded.slice(i, i + 7));
    }
    return out;
  }, [days]);

  const shown = hover ?? best;
  const grid: Vars = { "--weeks": weeks.length };

  return (
    <div className="u26-map" data-in={seen} ref={ref}>
      <div className="u26-map-scroll" ref={scroller}>
        <div className="u26-map-inner">
          <div
            className="u26-map-grid"
            onPointerLeave={() => setHover(null)}
            style={grid}
          >
            {weeks.flatMap((week, wi) =>
              week.map((day, di) => {
                const cell: Vars = { "--i": wi + di };
                return (
                  <i
                    data-best={day !== null && day.date === best?.date}
                    data-l={day ? day.level : "x"}
                    // biome-ignore lint/suspicious/noArrayIndexKey: days are positional
                    key={`${wi}-${di}`}
                    onPointerEnter={() => day && setHover(day)}
                    style={cell}
                  />
                );
              })
            )}
          </div>
          <div aria-hidden="true" className="u26-map-months">
            {MONTHS.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="u26-map-foot">
        <p aria-live="polite" className="u26-map-read">
          {shown ? (
            <>
              <b className="u26-num">{nf.format(shown.count)}</b>
              <span>
                contribution{shown.count === 1 ? "" : "s"} on{" "}
                {formatDay(shown.date)}
                {shown.date === best?.date ? ", the best day of the year" : ""}
              </span>
            </>
          ) : null}
        </p>
        <p aria-hidden="true" className="u26-map-key">
          <span>quiet</span>
          <i data-l="0" />
          <i data-l="1" />
          <i data-l="2" />
          <i data-l="3" />
          <i data-l="4" />
          <span>on fire</span>
        </p>
      </div>
    </div>
  );
}

export function Grind({ days }: { days: Day[] }) {
  const { best, longest, active, total } = useMemo(
    () => summarise(days),
    [days]
  );
  const contributions = total || CODE_STATS.contributionsFallback;
  const last = CODE_STATS.contributions2025;
  const times = (contributions / last).toFixed(1);
  const lastBar: Vars = { "--w": `${(last / contributions) * 100}%` };

  const board = [
    { label: "Pull requests", value: nf.format(CODE_STATS.pullRequests) },
    { label: "Issues", value: nf.format(CODE_STATS.issues) },
    { label: "New repos at A Major", value: nf.format(CODE_STATS.amajorRepos) },
    ...(best
      ? [
          {
            label: `Best day, ${formatDay(best.date)}`,
            value: nf.format(best.count),
          },
        ]
      : []),
    ...(longest > 0
      ? [{ label: "Longest streak", value: `${longest} days` }]
      : []),
    ...(active > 0
      ? [{ label: "Days with a contribution", value: nf.format(active) }]
      : []),
  ];

  return (
    <section
      aria-labelledby="grind-title"
      className="u26-band u26-grind"
      id="grind"
    >
      <div className="u26-wrap">
        <ChapterHead day="Day 3" id="grind-title" title="The grind">
          Most of this update was written on GitHub, one contribution at a time.
          Hover or tap the map to walk the year.
        </ChapterHead>

        <div className="u26-grind-top">
          <Rise className="u26-xp">
            <p className="u26-kicker">Contributions in 2026</p>
            <p className="u26-num u26-xp-big">
              <CountUp to={contributions} />
            </p>
            <div className="u26-xp-bars">
              <div className="u26-xp-row">
                <span className="u26-kicker">2026</span>
                <span className="u26-xp-bar u26-xp-bar--now">
                  <i />
                </span>
                <b className="u26-num">{nf.format(contributions)}</b>
              </div>
              <div className="u26-xp-row">
                <span className="u26-kicker">2025</span>
                <span className="u26-xp-bar" style={lastBar}>
                  <i />
                </span>
                <b className="u26-num">{nf.format(last)}</b>
              </div>
            </div>
          </Rise>
          <Rise className="u26-times" delay={120}>
            <span className="u26-times-burst" />
            <p className="u26-num u26-times-big">{times}x</p>
            <p className="u26-hand u26-times-note">last year</p>
          </Rise>
        </div>

        <Rise className="u26-card u26-map-card">
          <TileMap best={best} days={days} />
        </Rise>

        <Rise className="u26-board">
          <p className="u26-display u26-board-title">Scoreboard</p>
          <dl>
            {board.map((row) => (
              <div className="u26-board-row" key={row.label}>
                <dt>{row.label}</dt>
                <i aria-hidden="true" />
                <dd className="u26-num">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Rise>
      </div>
    </section>
  );
}
