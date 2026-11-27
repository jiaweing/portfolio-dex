import {
  CODE_STATS,
  HOOK,
  LINKEDIN,
  MILESTONES,
} from "@/lib/wrapped-2026-data";
import type { WrappedData } from "../types";

/* What there is to find in the room. Every card is built from the same facts
   as the page: the static ones in lib/wrapped-2026-data.ts and the live ones
   the page already loads. Nothing here is new information. */

export interface RoomStat {
  value: string;
  label: string;
}

export interface RoomItem {
  id: string;
  /** The thing in the room, as it is named on its tag */
  thing: string;
  kicker: string;
  title: string;
  body: string;
  stats: RoomStat[];
  href?: string;
  go?: string;
  /** Spot ink, a CSS variable of the page */
  ink: string;
  tier: "Common" | "Rare" | "Legendary";
}

const nf = new Intl.NumberFormat("en-US");

const MONTHS = [
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

function milestone(id: string) {
  const m = MILESTONES.find((x) => x.id === id);
  if (!m) {
    throw new Error(`No milestone called ${id}`);
  }
  return m;
}

export function summarise(days: WrappedData["days"]) {
  let best: WrappedData["days"][number] | undefined;
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

export function roomItems(data: WrappedData): RoomItem[] {
  const { best, longest, active, total } = summarise(data.days);
  const contributions = total || CODE_STATS.contributionsFallback;
  const times = (contributions / CODE_STATS.contributions2025).toFixed(1);
  const peak = Math.max(0, ...data.perMonth);
  const peakMonth = MONTHS[data.perMonth.indexOf(peak)];

  const graduated = milestone("graduated");
  const betterAge = milestone("better-age");
  const ceo = milestone("ceo");
  const live = milestone("live");
  const block71 = milestone("block71");
  const ryu = milestone("ryu");
  const anthropic = milestone("anthropic");
  const comebck = milestone("comebck");
  const grind = milestone("grind");

  const channels = data.social
    .filter((s) => s.values.length > 0)
    .map((s) => ({ label: s.label, last: s.values.at(-1) ?? 0 }))
    .sort((a, b) => b.last - a.last);

  const codeStats: RoomStat[] = [
    { value: `${times}x`, label: "last year" },
    { value: nf.format(CODE_STATS.pullRequests), label: "pull requests" },
    { value: nf.format(CODE_STATS.issues), label: "issues" },
  ];
  if (best) {
    const [, m, d] = best.date.split("-").map(Number);
    codeStats.push({
      value: nf.format(best.count),
      label: `best day, ${MONTHS[m - 1].slice(0, 3)} ${d}`,
    });
  }
  if (longest > 0) {
    codeStats.push({ value: `${longest} days`, label: "longest streak" });
  }
  if (active > 0) {
    codeStats.push({
      value: nf.format(active),
      label: "days with a contribution",
    });
  }

  return [
    {
      id: "mail",
      thing: "The pile of mail",
      kicker: "Matchmaking failed",
      title: `${nf.format(HOOK.applied)} applications`,
      body: `I applied to ${nf.format(HOOK.applied)} jobs and got ${HOOK.interviews} interviews. So I started my own company.`,
      stats: [
        { value: nf.format(HOOK.applied), label: "jobs applied to" },
        { value: String(HOOK.interviews), label: "interviews" },
        { value: String(HOOK.companies), label: "company started" },
      ],
      href: HOOK.href,
      go: `The post, ${HOOK.likes} likes`,
      ink: "var(--pink)",
      tier: "Legendary",
    },
    {
      id: "diploma",
      thing: "The frame on the wall",
      kicker: graduated.kicker,
      title: graduated.title,
      body: graduated.body,
      stats: [],
      ink: "var(--cyan)",
      tier: "Rare",
    },
    {
      id: "phone",
      thing: "The phone",
      kicker: betterAge.kicker,
      title: betterAge.title,
      body: betterAge.body,
      stats: [],
      ink: "var(--green)",
      tier: "Common",
    },
    {
      id: "chair",
      thing: "The boss chair",
      kicker: ceo.kicker,
      title: ceo.title,
      body: ceo.body,
      stats: [
        {
          value: nf.format(CODE_STATS.amajorRepos),
          label: "new repos at A Major",
        },
      ],
      href: ceo.href,
      go: "amajor.ai",
      ink: "var(--amber)",
      tier: "Legendary",
    },
    {
      id: "light",
      thing: "The stream light",
      kicker: live.kicker,
      title: live.title,
      body: live.body,
      stats: [],
      href: live.href,
      go: "The channel",
      ink: "var(--pink)",
      tier: "Rare",
    },
    {
      id: "cup",
      thing: "The cup on the shelf",
      kicker: block71.kicker,
      title: block71.title,
      body: block71.body,
      stats: [],
      ink: "var(--lime)",
      tier: "Rare",
    },
    {
      id: "plaque",
      thing: "The plaque on the shelf",
      kicker: anthropic.kicker,
      title: anthropic.title,
      body: anthropic.body,
      stats: [],
      href: anthropic.href,
      go: "amajor.ai",
      ink: "var(--amber)",
      tier: "Rare",
    },
    {
      id: "medal",
      thing: "The medal on the shelf",
      kicker: comebck.kicker,
      title: comebck.title,
      body: comebck.body,
      stats: [],
      ink: "var(--indigo)",
      tier: "Common",
    },
    {
      id: "bed",
      thing: "The bed",
      kicker: grind.kicker,
      title: grind.title,
      body: grind.body,
      stats: [],
      href: grind.href,
      go: "Follow along on X",
      ink: "var(--magenta)",
      tier: "Common",
    },
    {
      id: "crate",
      thing: "The supply crate",
      kicker: ryu.kicker,
      title: ryu.title,
      body: ryu.body,
      stats: [
        { value: String(CODE_STATS.ryuApps), label: "apps" },
        { value: `${CODE_STATS.models}+`, label: "models" },
        { value: `${CODE_STATS.mcpTools}+`, label: "MCP tools" },
        { value: String(CODE_STATS.ryuStars), label: "stars on GitHub" },
      ],
      href: ryu.href,
      go: "ryuhq.com",
      ink: "var(--cyan)",
      tier: "Legendary",
    },
    {
      id: "monitors",
      thing: "The monitors",
      kicker: "The grind",
      title: `${nf.format(contributions)} contributions`,
      body: `Most of this year was written on GitHub, one contribution at a time. Last year it was ${nf.format(CODE_STATS.contributions2025)}.`,
      stats: codeStats,
      href: "https://github.com/jiaweing",
      go: "GitHub",
      ink: "var(--lime)",
      tier: "Legendary",
    },
    {
      id: "drawers",
      thing: "The drawers",
      kicker: "Open source",
      title: "DropDrawer",
      body: "A responsive dropdown and drawer component for shadcn/ui. Still picking up stars.",
      stats: [
        {
          value: String(CODE_STATS.dropDrawerStars),
          label: "stars on GitHub",
        },
      ],
      href: "https://github.com/jiaweing/DropDrawer",
      go: "DropDrawer on GitHub",
      ink: "var(--cyan)",
      tier: "Rare",
    },
    {
      id: "posts",
      thing: "The second screen",
      kicker: "On air",
      title: `${nf.format(data.postTotal)} posts on the blog`,
      body:
        peak > 0
          ? `${nf.format(peak)} of them went out in ${peakMonth}.`
          : "Every one of them written this year.",
      stats: [],
      href: "/blog",
      go: "The blog",
      ink: "var(--amber)",
      tier: "Common",
    },
    {
      id: "tv",
      thing: "The TV",
      kicker: "Channels",
      title: `Followers, since ${data.socialSince}`,
      body: `${nf.format(LINKEDIN.impressions)} impressions on LinkedIn, and ${nf.format(LINKEDIN.reached)} people reached.`,
      stats: channels.map((c) => ({
        value: nf.format(c.last),
        label: c.label,
      })),
      ink: "var(--magenta)",
      tier: "Rare",
    },
  ];
}
