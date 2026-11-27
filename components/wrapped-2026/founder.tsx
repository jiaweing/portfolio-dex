import Image from "next/image";
import type { ReactNode } from "react";
import { MILESTONES, type Milestone } from "@/lib/wrapped-2026-data";
import { ChapterHead, Rise, Tilt, type Vars } from "./parts";

/* Day 2: the new class and its achievements. The class card on the left is
   the founder's character sheet; each milestone of the year is an enamel
   pin with its own drawing. */

const stroke = {
  fill: "none",
  stroke: "var(--ink)",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      {children}
    </svg>
  );
}

// One drawing and one spot ink for each milestone, by its id
const PINS: Record<string, { ink: string; art: ReactNode }> = {
  graduated: {
    ink: "var(--cyan)",
    art: (
      <Glyph>
        <path d="M3 13 L16 7 L29 13 L16 19Z" fill="var(--ink)" />
        <path {...stroke} d="M8.5 16.5 V22 C8.5 25.5 23.5 25.5 23.5 22 V16.5" />
        <path {...stroke} d="M29 13 V21" />
        <circle cx="29" cy="23" fill="var(--ink)" r="2" />
      </Glyph>
    ),
  },
  "better-age": {
    ink: "var(--green)",
    art: (
      <Glyph>
        <rect {...stroke} height="24" rx="3.5" width="15" x="8.5" y="4" />
        <path {...stroke} d="M12 15.5 l3 3 l5.5 -6" />
        <path {...stroke} d="M14 24 h4" />
      </Glyph>
    ),
  },
  ceo: {
    ink: "var(--amber)",
    art: (
      <Image
        alt=""
        className="u26-pin-logo"
        height={34}
        src="/logos/amajor.svg"
        width={34}
      />
    ),
  },
  live: {
    ink: "var(--pink)",
    art: (
      <Glyph>
        <circle cx="16" cy="16" fill="var(--ink)" r="4" />
        <path {...stroke} d="M10 10 a8.5 8.5 0 0 0 0 12" />
        <path {...stroke} d="M22 10 a8.5 8.5 0 0 1 0 12" />
        <path {...stroke} d="M5.5 5.5 a15 15 0 0 0 0 21" />
        <path {...stroke} d="M26.5 5.5 a15 15 0 0 1 0 21" />
      </Glyph>
    ),
  },
  block71: {
    ink: "var(--lime)",
    art: <span className="u26-pin-word">71</span>,
  },
  ryu: {
    ink: "var(--paper-3)",
    art: (
      <Image
        alt=""
        className="u26-pin-img"
        height={40}
        src="/logos/ryu.png"
        width={40}
      />
    ),
  },
  anthropic: {
    ink: "var(--paper-3)",
    art: <Image alt="" height={34} src="/logos/claude.svg" width={34} />,
  },
  comebck: {
    ink: "var(--indigo)",
    art: (
      <Glyph>
        <circle {...stroke} cx="11.5" cy="10" r="4" />
        <path {...stroke} d="M3.5 26 C3.5 17 19.5 17 19.5 26" />
        <circle cx="22.5" cy="13" fill="var(--ink)" r="3.2" />
        <path {...stroke} d="M22 19.5 C26 19.5 28.5 22 28.5 26" />
      </Glyph>
    ),
  },
  grind: {
    ink: "var(--magenta)",
    art: (
      <Glyph>
        <path
          d="M16 3 C18 9 25 11 25 19 a9 9 0 0 1 -18 0 C7 15 10 13.5 11 9.5 C13 12 15 11 16 3Z"
          fill="var(--ink)"
        />
        <path
          d="M16 15.5 C17 18.5 20 19 20 22.5 a4 4 0 0 1 -8 0 C12 20.5 14.5 19.5 16 15.5Z"
          fill="var(--amber)"
        />
      </Glyph>
    ),
  },
};

function Achievement({ item, index }: { item: Milestone; index: number }) {
  const pin = PINS[item.id];
  const vars: Vars = { "--pin": pin?.ink ?? "var(--amber)" };
  const body = (
    <>
      <span aria-hidden="true" className="u26-pin">
        {pin?.art}
      </span>
      <span className="u26-ach-text">
        <span className="u26-kicker u26-ach-kicker">{item.kicker}</span>
        <b className="u26-head">{item.title}</b>
        <span className="u26-ach-body">{item.body}</span>
      </span>
      {item.href ? (
        <span aria-hidden="true" className="u26-ach-go">
          ↗
        </span>
      ) : null}
    </>
  );
  return (
    <Rise delay={(index % 2) * 90}>
      {item.href ? (
        <a
          className="u26-ach"
          href={item.href}
          rel="noopener noreferrer"
          style={vars}
          target="_blank"
        >
          {body}
        </a>
      ) : (
        <div className="u26-ach" style={vars}>
          {body}
        </div>
      )}
    </Rise>
  );
}

function ClassCard() {
  return (
    <Tilt className="u26-class" max={7}>
      <div className="u26-class-foil u26-foil">
        <div className="u26-class-face">
          <p className="u26-class-top">
            <span className="u26-kicker">Class</span>
            <span className="u26-kicker">v26.0</span>
          </p>
          <div aria-hidden="true" className="u26-class-art">
            <div className="u26-class-rays" />
            <Image
              alt=""
              className="u26-class-logo"
              height={120}
              src="/logos/amajor.svg"
              width={120}
            />
          </div>
          <p className="u26-display u26-class-name">Founder</p>
          <p className="u26-class-role">Full-time CEO of A Major</p>
          <ul className="u26-class-perks">
            <li>
              <span className="u26-kicker">Funding</span>
              Bootstrapped, no outside money
            </li>
            <li>
              <span className="u26-kicker">Loadout</span>
              Two dev machines, on 24/7
            </li>
            <li>
              <span className="u26-kicker">Stamina</span>
              15 hour days, 7 days a week
            </li>
          </ul>
        </div>
      </div>
    </Tilt>
  );
}

export function Founder() {
  return (
    <section
      aria-labelledby="founder-title"
      className="u26-band u26-band--alt u26-founder u26-dots"
      id="founder"
    >
      <div className="u26-wrap">
        <ChapterHead
          day="Day 2"
          id="founder-title"
          title={
            <>
              New class:
              <br />
              Founder
            </>
          }
        >
          Nobody hands you this class. You pick it, and then the achievements
          start coming in. Nine of them this year.
        </ChapterHead>
        <div className="u26-founder-grid">
          <div className="u26-founder-side">
            <ClassCard />
            <p className="u26-hand u26-founder-note">
              {MILESTONES.length} of {MILESTONES.length} unlocked
            </p>
          </div>
          <div className="u26-ach-grid">
            {MILESTONES.map((item, index) => (
              <Achievement index={index} item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
