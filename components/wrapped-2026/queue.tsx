"use client";

import { DistortionWave } from "distortion-waves";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HOOK } from "@/lib/wrapped-2026-data";
import { ChapterHead, useSeen } from "./parts";

/* Chapter 1, the plot twist. A grey matchmaking lobby counts up 3,800
   applications and finds 0 interviews. Pressing "Host my own" sends a
   Distortion Wave up from the button and leaves the company behind. */

// The stops of the 2026 gradient as RGB, for the wave
const WAVE_PALETTE = {
  colors: [
    [255, 184, 87],
    [255, 80, 173],
    [224, 54, 255],
    [115, 126, 255],
    [62, 241, 255],
    [105, 255, 160],
    [210, 255, 80],
  ] as [number, number, number][],
  ahead: [255, 80, 173] as [number, number, number],
  behind: [62, 241, 255] as [number, number, number],
};

const nf = new Intl.NumberFormat("en-US");
const FEED = [0, 1, 2, 3, 4, 5];

function Lobby({ count, done }: { count: number; done: boolean }) {
  return (
    <div className="u26-lobby">
      <div className="u26-lobby-bar">
        <span aria-hidden="true" className="u26-lobby-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="u26-kicker">Quick play: find a job</span>
        <span className="u26-lobby-status" data-done={done}>
          <i aria-hidden="true" />
          {done ? "No match found" : "Searching"}
        </span>
      </div>
      <div className="u26-lobby-body">
        <div className="u26-lobby-stats">
          <div>
            <p className="u26-kicker">Applications sent</p>
            <p className="u26-num u26-lobby-big">
              <span className="sr-only">{nf.format(HOOK.applied)}</span>
              <span aria-hidden="true">{nf.format(count)}</span>
            </p>
          </div>
          <div>
            <p className="u26-kicker">Interviews found</p>
            <p className="u26-num u26-lobby-big u26-lobby-zero">
              {HOOK.interviews}
            </p>
          </div>
        </div>
        <ol aria-hidden="true" className="u26-lobby-feed">
          {FEED.map((back) => {
            const n = count - back;
            return (
              <li data-empty={n < 1} key={back}>
                <span className="u26-lobby-no">
                  #{nf.format(Math.max(n, 0))}
                </span>
                <span>Application sent</span>
                <span className="u26-lobby-chip">No interview</span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function Founded() {
  return (
    <div className="u26-founded">
      <div aria-hidden="true" className="u26-founded-rays" />
      <div className="u26-founded-inner">
        <p className="u26-hand u26-founded-so">So I started</p>
        <p className="u26-display u26-founded-big">
          my own
          <br />
          company.
        </p>
        <div className="u26-founded-card">
          <span className="u26-founded-logo">
            <Image alt="" height={44} src="/logos/amajor.svg" width={44} />
          </span>
          <span>
            <b>A Major</b>
            My own software studio. Bootstrapped, no outside money.
          </span>
        </div>
      </div>
    </div>
  );
}

export function Queue() {
  const [ref, seen] = useSeen<HTMLDivElement>(0.45);
  const button = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const touched = useRef(false);

  // Count the applications up once the lobby is on screen
  useEffect(() => {
    if (!seen) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(HOOK.applied);
      setDone(true);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 2600);
      setCount(Math.round(HOOK.applied * (1 - (1 - t) ** 3)));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [seen]);

  // Nobody should leave thinking the story ends in the queue: if the button
  // is left alone for a while, it presses itself
  useEffect(() => {
    if (!done || revealed || touched.current) {
      return;
    }
    const id = window.setTimeout(() => {
      if (!touched.current) {
        setRevealed(true);
      }
    }, 5200);
    return () => window.clearTimeout(id);
  }, [done, revealed]);

  const toggle = () => {
    touched.current = true;
    setRevealed((r) => !r);
  };

  return (
    <section
      aria-labelledby="queue-title"
      className="u26-band u26-queue"
      id="queue"
    >
      <div className="u26-wrap">
        <ChapterHead
          day="Chapter 1"
          id="queue-title"
          title="Matchmaking failed"
        >
          The year starts in a queue that never popped: 3,800 job applications,
          and not one interview.
        </ChapterHead>
        <div ref={ref}>
          <DistortionWave
            className="u26-stage"
            overlay={
              <div className="u26-stage-foot">
                <p
                  className="u26-hand u26-stage-note"
                  data-on={done && !revealed}
                >
                  nobody is letting me in. fine.
                </p>
                <button
                  className={`u26-btn ${revealed ? "" : "u26-btn--foil"} u26-stage-btn`}
                  data-pulse={done && !revealed}
                  onClick={toggle}
                  ref={button}
                  type="button"
                >
                  {revealed ? "Back to the queue" : "Host my own"}
                </button>
              </div>
            }
            palette={WAVE_PALETTE}
            revealed={revealed}
            revealedContent={<Founded />}
            source={button}
            type="vertical"
          >
            <Lobby count={count} done={done} />
          </DistortionWave>
        </div>
        <p className="u26-queue-proof">
          <a href={HOOK.href} rel="noopener noreferrer" target="_blank">
            The post about it is pinned on Threads, with {HOOK.likes} likes
            <span aria-hidden="true"> ↗</span>
          </a>
        </p>
      </div>
    </section>
  );
}
