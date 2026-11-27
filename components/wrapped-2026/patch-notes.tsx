import type { ReactNode } from "react";
import { CODE_STATS, HOOK, LINKEDIN } from "@/lib/wrapped-2026-data";
import { Rise, type Vars } from "./parts";

/* The recap: the whole year again as plain lines, sorted into what was
   removed, added and changed. Printed on a sheet of paper that stays paper
   in both themes. */

const nf = new Intl.NumberFormat("en-US");

interface Group {
  title: string;
  ink: string;
  notes: ReactNode[];
}

export function PatchNotes({
  contributions,
  bestDay,
  postTotal,
  postPeak,
}: {
  contributions: number;
  bestDay?: { count: number; label: string };
  postTotal: number;
  postPeak?: { count: number; month: string };
}) {
  const times = (contributions / CODE_STATS.contributions2025).toFixed(1);
  const groups: Group[] = [
    {
      title: "Removed",
      ink: "var(--pink)",
      notes: [
        <>
          Job hunting. {nf.format(HOOK.applied)} applications went in and{" "}
          {HOOK.interviews} interviews came out, so the feature was cut.
        </>,
        <>
          Lead Mobile Developer at Better Age Solutions. Closed after 3.5 years
          of shipping a medicine delivery app for Singapore&apos;s public
          hospitals.
        </>,
        <>
          Student status. Graduated with Distinction, BSc (Hons) Computing
          Science from SIT and the University of Glasgow.
        </>,
      ],
    },
    {
      title: "Added",
      ink: "var(--lime)",
      notes: [
        <>
          A Major, full time. My own software studio. Bootstrapped, no outside
          money.
        </>,
        <>
          Ryu, introduced to the world on Oct 29. Managed infrastructure for AI
          agents: bring your own agent, Ryu does everything else. Ships with{" "}
          {CODE_STATS.ryuApps} apps, {CODE_STATS.models}+ models and{" "}
          {CODE_STATS.mcpTools}+ MCP tools.
        </>,
        <>
          Streaming and posting every single day, from zero followers, starting
          May 4.
        </>,
        <>
          BLOCK71 Spring 2026 residency. Got in with no product, just an idea
          people already wanted.
        </>,
        <>Anthropic partnership. A Major joined the Claude Partner Network.</>,
        <>
          Mentoring the founding cohort of Comebck Pakistan, with A Major as the
          official AI learning partner.
        </>,
      ],
    },
    {
      title: "Changed",
      ink: "var(--cyan)",
      notes: [
        <>
          GitHub contributions raised from{" "}
          {nf.format(CODE_STATS.contributions2025)} to{" "}
          {nf.format(contributions)}, {times}x last year.
          {bestDay
            ? ` Best day: ${nf.format(bestDay.count)} on ${bestDay.label}.`
            : ""}
        </>,
        <>
          {nf.format(CODE_STATS.pullRequests)} pull requests,{" "}
          {nf.format(CODE_STATS.issues)} issues and {CODE_STATS.amajorRepos} new
          repos at A Major.
        </>,
        <>
          DropDrawer is up to {CODE_STATS.dropDrawerStars} stars. Ryu has its
          first {CODE_STATS.ryuStars}.
        </>,
        <>
          Writing output: {nf.format(postTotal)} posts
          {postPeak
            ? `, ${nf.format(postPeak.count)} of them in ${postPeak.month}`
            : ""}
          .
        </>,
        <>
          LinkedIn: {nf.format(LINKEDIN.impressions)} impressions,{" "}
          {nf.format(LINKEDIN.reached)} people reached.
        </>,
        <>Working hours raised to 15 a day, 7 days a week.</>,
      ],
    },
    {
      title: "Known issues",
      ink: "var(--amber)",
      notes: [
        <>Two dev machines running 24/7 crashed more times than I can count.</>,
      ],
    },
  ];

  return (
    <section
      aria-labelledby="patch-title"
      className="u26-band u26-band--alt u26-patch"
      id="recap"
    >
      <div className="u26-wrap">
        <Rise className="u26-sheet">
          <div aria-hidden="true" className="u26-sheet-holes" />
          <header className="u26-sheet-head">
            <p className="u26-kicker">Jia Wei Ng, 2026</p>
            <h2 className="u26-display u26-sheet-title" id="patch-title">
              The recap
            </h2>
            <p className="u26-hand u26-sheet-date">
              the whole year, line by line
            </p>
          </header>
          {groups.map((group) => {
            const vars: Vars = { "--accent": group.ink };
            return (
              <section
                className="u26-sheet-group"
                key={group.title}
                style={vars}
              >
                <h3>
                  <span className="u26-mark u26-head">{group.title}</span>
                </h3>
                <ul>
                  {group.notes.map((note, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: fixed list
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </section>
            );
          })}
          <p className="u26-hand u26-sheet-sign">
            That is the whole year. Thanks for reading it.
            <span>Jia Wei</span>
          </p>
        </Rise>
      </div>
    </section>
  );
}
