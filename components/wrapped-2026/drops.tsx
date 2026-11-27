"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { CODE_STATS, MILESTONES, RYU_APPS } from "@/lib/wrapped-2026-data";
import { ChapterHead, Rise, Tilt, useSeen, type Vars } from "./parts";

/* Day 4: what shipped. A supply crate that opens into three item cards
   sorted by rarity (Ryu is the foil one), and under it the inventory: every
   app that ships inside Ryu, one slot each. */

const RYU = MILESTONES.find((m) => m.id === "ryu");

const INKS = [
  "var(--amber)",
  "var(--pink)",
  "var(--cyan)",
  "var(--lime)",
  "var(--magenta)",
  "var(--green)",
  "var(--indigo)",
];

function Crate({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="u26-crate"
      data-open={open}
      viewBox="0 0 240 220"
    >
      <g className="u26-crate-glow">
        <path d="M120 120 L20 0 H70Z" fill="var(--amber)" />
        <path d="M120 120 L96 0 H144Z" fill="var(--pink)" />
        <path d="M120 120 L170 0 H220Z" fill="var(--cyan)" />
        <path d="M120 120 L-20 40 V86Z" fill="var(--lime)" />
        <path d="M120 120 L260 40 V86Z" fill="var(--magenta)" />
      </g>
      <g stroke="var(--ink)" strokeLinejoin="round" strokeWidth="4">
        <rect
          fill="var(--amber)"
          height="100"
          rx="6"
          width="180"
          x="30"
          y="110"
        />
        <path d="M30 144 H210 M30 178 H210" fill="none" />
        <rect fill="var(--paper-3)" height="100" width="26" x="56" y="110" />
        <rect fill="var(--paper-3)" height="100" width="26" x="158" y="110" />
        <rect fill="var(--ink)" height="34" rx="5" width="44" x="98" y="128" />
        <circle cx="120" cy="141" fill="var(--lime)" r="6" strokeWidth="3" />
        <path d="M120 147 V156" strokeLinecap="round" strokeWidth="5" />
      </g>
      <g className="u26-crate-lid">
        <rect
          fill="var(--amber)"
          height="32"
          rx="6"
          stroke="var(--ink)"
          strokeWidth="4"
          width="200"
          x="20"
          y="82"
        />
        <rect
          fill="var(--paper-3)"
          height="32"
          stroke="var(--ink)"
          strokeWidth="4"
          width="26"
          x="56"
          y="82"
        />
        <rect
          fill="var(--paper-3)"
          height="32"
          stroke="var(--ink)"
          strokeWidth="4"
          width="26"
          x="158"
          y="82"
        />
      </g>
    </svg>
  );
}

function Card({
  tier,
  name,
  ink,
  art,
  children,
  stats,
  href,
  go,
  foil = false,
  index,
  open,
}: {
  tier: string;
  name: string;
  ink: string;
  art: ReactNode;
  children: ReactNode;
  stats: { value: string; label: string }[];
  href?: string;
  go?: string;
  foil?: boolean;
  index: number;
  open: boolean;
}) {
  const vars: Vars = { "--tier": ink, "--deal": `${index * 140}ms` };
  return (
    <Tilt className={`u26-item ${foil ? "u26-item--foil" : ""}`} style={vars}>
      <div className="u26-item-flip">
        <div
          className={`u26-item-frame ${foil ? "u26-foil" : ""}`}
          inert={!open}
        >
          <div className="u26-item-face">
            <p className="u26-item-tier">
              <span className="u26-kicker">{tier}</span>
              <span aria-hidden="true" className="u26-item-pips">
                <i />
                <i />
                <i />
              </span>
            </p>
            <div aria-hidden="true" className="u26-item-art">
              {art}
            </div>
            <h3 className="u26-display u26-item-name">{name}</h3>
            <p className="u26-item-body">{children}</p>
            <ul className="u26-item-stats">
              {stats.map((s) => (
                <li key={s.label}>
                  <b className="u26-num">{s.value}</b>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
            {href ? (
              <a
                className="u26-item-go"
                href={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {go} <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
        </div>
        <div aria-hidden="true" className="u26-item-back">
          <span className="u26-display">?</span>
        </div>
      </div>
    </Tilt>
  );
}

const DRAWER_ART = (
  <svg aria-hidden="true" viewBox="0 0 120 90">
    <g stroke="var(--ink)" strokeLinejoin="round" strokeWidth="3.5">
      <rect fill="var(--paper-3)" height="74" rx="8" width="48" x="62" y="8" />
      <rect fill="var(--tier)" height="34" rx="6" width="48" x="62" y="48" />
      <path d="M80 57 h12" strokeLinecap="round" />
      <rect fill="var(--paper-3)" height="20" rx="5" width="44" x="8" y="10" />
      <rect fill="var(--tier)" height="42" rx="5" width="44" x="8" y="36" />
      <path
        d="M16 48 h26 M16 58 h20 M16 68 h24"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </g>
  </svg>
);

const REPO_ART = (
  <svg aria-hidden="true" viewBox="0 0 120 90">
    <g stroke="var(--ink)" strokeLinejoin="round" strokeWidth="3.5">
      <rect fill="var(--paper-3)" height="26" rx="4" width="40" x="12" y="56" />
      <rect fill="var(--tier)" height="26" rx="4" width="40" x="56" y="56" />
      <rect fill="var(--tier)" height="26" rx="4" width="40" x="26" y="30" />
      <rect fill="var(--paper-3)" height="26" rx="4" width="40" x="70" y="30" />
      <rect fill="var(--paper-3)" height="26" rx="4" width="40" x="44" y="4" />
      <path
        d="M22 69 h20 M66 69 h20 M36 43 h20 M80 43 h20 M54 17 h20"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </g>
  </svg>
);

function Inventory() {
  return (
    <Rise className="u26-inv">
      <div className="u26-inv-head">
        <h3 className="u26-display u26-inv-title">
          Inventory: the apps inside Ryu
        </h3>
        <p className="u26-tag u26-tag--paper">
          {RYU_APPS.length} of {RYU_APPS.length} slots filled
        </p>
      </div>
      <ul className="u26-inv-grid">
        {RYU_APPS.map((app, i) => {
          const vars: Vars = { "--slot": INKS[i % INKS.length] };
          return (
            <li key={app} style={vars}>
              <i aria-hidden="true" />
              {app.replace(/-/g, " ")}
            </li>
          );
        })}
      </ul>
    </Rise>
  );
}

export function Drops() {
  const [open, setOpen] = useState(false);
  const [ref, seen] = useSeen<HTMLDivElement>(0.8);
  const touched = useRef(false);

  // The crate opens itself if it is left alone, so nobody misses the drops
  useEffect(() => {
    if (!seen) {
      return;
    }
    const id = window.setTimeout(() => {
      if (!touched.current) {
        setOpen(true);
      }
    }, 2400);
    return () => window.clearTimeout(id);
  }, [seen]);

  const toggle = () => {
    touched.current = true;
    setOpen((o) => !o);
  };

  return (
    <section
      aria-labelledby="drops-title"
      className="u26-band u26-band--alt u26-drops u26-dots"
      id="drops"
    >
      <div className="u26-wrap">
        <ChapterHead center day="Day 4" id="drops-title" title="Item drops">
          Everything that shipped this year came out of one crate. Open it.
        </ChapterHead>

        <div className="u26-crate-stage" data-open={open}>
          <div className="u26-crate-wrap" data-seen={seen} ref={ref}>
            <Crate open={open} />
            <button
              aria-expanded={open}
              className="u26-btn u26-btn--accent u26-crate-btn"
              onClick={toggle}
              type="button"
            >
              {open ? "Pack it up" : "Open the crate"}
            </button>
          </div>

          <div className="u26-items" data-open={open}>
            <Card
              art={DRAWER_ART}
              go="DropDrawer on GitHub"
              href="https://github.com/jiaweing/DropDrawer"
              index={1}
              ink="var(--cyan)"
              name="DropDrawer"
              open={open}
              stats={[
                {
                  value: String(CODE_STATS.dropDrawerStars),
                  label: "stars on GitHub",
                },
              ]}
              tier="Rare"
            >
              A responsive dropdown and drawer component for shadcn/ui. Still
              picking up stars.
            </Card>
            <Card
              art={
                <>
                  <span className="u26-item-ring" />
                  <Image alt="" height={84} src="/logos/ryu.png" width={84} />
                </>
              }
              foil
              go="ryuhq.com"
              href={RYU?.href}
              index={0}
              ink="var(--amber)"
              name="Ryu"
              open={open}
              stats={[
                { value: String(CODE_STATS.ryuApps), label: "apps" },
                { value: `${CODE_STATS.models}+`, label: "models" },
                { value: `${CODE_STATS.mcpTools}+`, label: "MCP tools" },
                { value: String(CODE_STATS.ryuStars), label: "stars" },
              ]}
              tier="Legendary"
            >
              {RYU?.body} Introduced to the world on Oct 29.
            </Card>
            <Card
              art={REPO_ART}
              index={2}
              ink="var(--magenta)"
              name="The A Major shelf"
              open={open}
              stats={[
                {
                  value: String(CODE_STATS.amajorRepos),
                  label: "new repos this year",
                },
              ]}
              tier="Epic"
            >
              New repositories at A Major this year. A studio needs a lot of
              shelves.
            </Card>
          </div>
        </div>

        <Inventory />
      </div>
    </section>
  );
}
