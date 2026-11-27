import Image from "next/image";
import Link from "next/link";
import { LINKEDIN } from "@/lib/wrapped-2026-data";
import { ChapterHead, CountUp, Rise, type Vars } from "./parts";
import type { PostTitle, SocialSeries } from "./types";

/* Day 5: going live. An old set shows the year's posts month by month, the
   channels line up on a leaderboard with their follower growth since the
   first stream, and the post titles run past underneath. */

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
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

const nf = new Intl.NumberFormat("en-US");

function TvSet({ perMonth, total }: { perMonth: number[]; total: number }) {
  const max = Math.max(1, ...perMonth);
  const peak = perMonth.indexOf(max);
  return (
    <Rise className="u26-tv">
      <div aria-hidden="true" className="u26-tv-aerial">
        <i />
        <i />
      </div>
      <div className="u26-tv-box">
        <div className="u26-tv-screen">
          <p className="u26-tv-live">
            <i aria-hidden="true" /> On air
          </p>
          <p className="u26-num u26-tv-big">
            <CountUp to={total} />
          </p>
          <p className="u26-tv-label">
            posts on the blog this year
            {max > 0 ? (
              <>
                , <b>{nf.format(max)}</b> of them in {MONTH_NAMES[peak]}
              </>
            ) : null}
          </p>
          <ol aria-label="Posts per month" className="u26-tv-bars">
            {perMonth.map((n, i) => {
              const vars: Vars = {
                "--h": `${Math.max(3, (n / max) * 100)}%`,
                "--i": i,
              };
              return (
                <li
                  aria-label={`${MONTH_NAMES[i]}: ${n}`}
                  data-peak={i === peak}
                  // biome-ignore lint/suspicious/noArrayIndexKey: months are positional
                  key={i}
                  style={vars}
                >
                  <i aria-hidden="true" />
                  <span aria-hidden="true">{MONTHS[i]}</span>
                </li>
              );
            })}
          </ol>
        </div>
        <div aria-hidden="true" className="u26-tv-side">
          <i className="u26-tv-knob" />
          <i className="u26-tv-knob" />
          <span className="u26-tv-grille" />
        </div>
      </div>
      <div aria-hidden="true" className="u26-tv-feet" />
    </Rise>
  );
}

function Spark({ values }: { values: number[] }) {
  const w = 120;
  const h = 34;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(1, max - min);
  const points = values.map((v, i) => {
    const x = (i / Math.max(1, values.length - 1)) * w;
    const y = h - 3 - ((v - min) / span) * (h - 8);
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  });
  return (
    <svg
      aria-hidden="true"
      className="u26-spark"
      preserveAspectRatio="none"
      viewBox={`0 0 ${w} ${h}`}
    >
      <path
        className="u26-spark-fill"
        d={`M0 ${h} L${points.join(" L")} L${w} ${h}Z`}
      />
      <path className="u26-spark-line" d={`M${points.join(" L")}`} />
    </svg>
  );
}

function Leaderboard({
  series,
  since,
}: {
  series: SocialSeries[];
  since: string;
}) {
  const rows = series
    .filter((s) => s.values.length > 0)
    .map((s) => {
      const first = s.values[0];
      const last = s.values.at(-1) ?? first;
      return { ...s, first, last, gain: last - first };
    })
    .sort((a, b) => b.last - a.last);
  return (
    <Rise className="u26-card u26-lead" delay={120}>
      <div className="u26-lead-head">
        <h3 className="u26-display">Channels</h3>
        <p className="u26-dim">followers, since {since}</p>
      </div>
      <ol>
        {rows.map((row, i) => (
          <li key={row.key}>
            <a href={row.href} rel="noopener noreferrer" target="_blank">
              <span className="u26-num u26-lead-rank">{i + 1}</span>
              <span className="u26-lead-icon">
                <Image
                  alt=""
                  className={row.invertDark ? "u26-invert" : undefined}
                  height={20}
                  src={row.icon}
                  width={20}
                />
              </span>
              <span className="u26-lead-name">{row.label}</span>
              <Spark values={row.values} />
              <span className="u26-lead-now">
                <b className="u26-num">{nf.format(row.last)}</b>
                {row.gain > 0 ? (
                  <span className="u26-lead-gain">+{nf.format(row.gain)}</span>
                ) : null}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </Rise>
  );
}

function Feed({ posts, reverse }: { posts: PostTitle[]; reverse?: boolean }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="u26-feed-row" data-reverse={reverse}>
      {posts.map((p) => (
        <li key={p.slug}>
          <Link href={`/blog/${p.slug}`} tabIndex={hidden ? -1 : undefined}>
            {p.title}
          </Link>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="u26-feed">
      {row(false)}
      {row(true)}
    </div>
  );
}

export function Broadcast({
  perMonth,
  postTotal,
  posts,
  social,
  socialSince,
}: {
  perMonth: number[];
  postTotal: number;
  posts: PostTitle[];
  social: SocialSeries[];
  socialSince: string;
}) {
  const half = Math.ceil(posts.length / 2);
  return (
    <section
      aria-labelledby="broadcast-title"
      className="u26-band u26-broadcast"
      id="broadcast"
    >
      <div className="u26-wrap">
        <ChapterHead day="Day 5" id="broadcast-title" title="Now live">
          On May 4 I went live with zero followers, and started streaming and
          posting every single day.
        </ChapterHead>
        <div className="u26-broadcast-grid">
          <TvSet perMonth={perMonth} total={postTotal} />
          <div className="u26-broadcast-side">
            <Leaderboard series={social} since={socialSince} />
            <Rise className="u26-linkedin" delay={200}>
              <a href={LINKEDIN.href} rel="noopener noreferrer" target="_blank">
                <span className="u26-lead-icon">
                  <Image
                    alt=""
                    height={22}
                    src="/logos/linkedin.svg"
                    width={22}
                  />
                </span>
                <span>
                  <b className="u26-num">{nf.format(LINKEDIN.impressions)}</b>{" "}
                  impressions on LinkedIn, and{" "}
                  <b className="u26-num">{nf.format(LINKEDIN.reached)}</b>{" "}
                  people reached
                </span>
              </a>
            </Rise>
          </div>
        </div>
      </div>
      {posts.length > 0 ? (
        <div className="u26-feeds">
          <p className="u26-wrap u26-hand u26-feeds-label">
            some of what went out
          </p>
          <Feed posts={posts.slice(0, half)} />
          <Feed posts={posts.slice(half)} reverse />
        </div>
      ) : null}
    </section>
  );
}
