import "./u26.css";
import "./u26-chapters.css";
import { CODE_STATS } from "@/lib/wrapped-2026-data";
import { Broadcast } from "./broadcast";
import { Drops } from "./drops";
import { Finale } from "./finale";
import { body, display, hand } from "./fonts";
import { Founder } from "./founder";
import { Grind } from "./grind";
import { Hero } from "./hero";
import { Ticker } from "./parts";
import { PatchNotes } from "./patch-notes";
import { Queue } from "./queue";
import { Trail } from "./trail";
import type { WrappedData } from "./types";

/* 2026 Wrapped: the year laid out with the art direction of a game's big
   release page. Each chapter lives in its own file; this one puts them in
   order and works out the few numbers more than one chapter needs. */

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const SHORT = MONTH_NAMES.map((m) => m.slice(0, 3));

export function Wrapped2026({
  days,
  posts,
  postTotal,
  perMonth,
  social,
  socialSince,
}: WrappedData) {
  const total = days.reduce((sum, d) => sum + d.count, 0);
  const contributions = total || CODE_STATS.contributionsFallback;
  const best = days.reduce<(typeof days)[number] | undefined>(
    (top, d) => (!top || d.count > top.count ? d : top),
    undefined
  );
  const peak = Math.max(0, ...perMonth);
  const peakMonth = perMonth.indexOf(peak);

  return (
    <div
      className={`u26 ${display.variable} ${body.variable} ${hand.variable}`}
    >
      <Hero />
      <Trail />
      <main>
        <Ticker
          words={[
            "2026 Wrapped is here",
            "A Major year",
            "New class: Founder",
            "Ryu has dropped",
            "Job hunting removed",
          ]}
        />
        <Queue />
        <div className="u26-tape" />
        <Founder />
        <Grind days={days} />
        <Ticker
          duration={44}
          tape="var(--cyan)"
          words={[
            "Supply drop incoming",
            "72 apps",
            "400+ models",
            "250+ MCP tools",
            "Handle with care",
          ]}
        />
        <Drops />
        <Broadcast
          perMonth={perMonth}
          posts={posts}
          postTotal={postTotal}
          social={social}
          socialSince={socialSince}
        />
        <div className="u26-tape" />
        <PatchNotes
          bestDay={
            best
              ? {
                  count: best.count,
                  label: `${SHORT[Number(best.date.slice(5, 7)) - 1]} ${Number(best.date.slice(8, 10))}`,
                }
              : undefined
          }
          contributions={contributions}
          postPeak={
            peak > 0
              ? { count: peak, month: MONTH_NAMES[peakMonth] }
              : undefined
          }
          postTotal={postTotal}
        />
        <Finale />
      </main>
    </div>
  );
}
