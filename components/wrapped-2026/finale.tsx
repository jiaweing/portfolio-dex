"use client";

import { DistortionWave, type DistortionWaveHandle } from "distortion-waves";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSeen } from "./parts";

/* The end of the update. Once it scrolls into view, a Distortion Wave rings
   out of 2026 and leaves the next update behind: 2027, on the same sunburst
   the page opened with. */

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

export function Finale() {
  const [ref, seen] = useSeen<HTMLDivElement>(0.7);
  const year = useRef<HTMLParagraphElement>(null);
  const wave = useRef<DistortionWaveHandle>(null);
  const [next, setNext] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!seen) {
      return;
    }
    const id = window.setTimeout(() => setNext(true), 1100);
    return () => window.clearTimeout(id);
  }, [seen]);

  const replay = () => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
  };

  const share = async () => {
    const url = `${window.location.origin}/2026`;
    try {
      if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ title: "2026: A Major Update", url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Sharing was dismissed; nothing to do
    }
  };

  return (
    <section
      aria-labelledby="next-title"
      className="u26-band u26-finale"
      id="next"
    >
      <div className="u26-wrap">
        <p className="u26-hand u26-finale-kicker">that&apos;s the update.</p>
        <div ref={ref}>
          <DistortionWave
            className="u26-stage u26-stage--year"
            palette={WAVE_PALETTE}
            ref={wave}
            revealed={next}
            revealedContent={
              <div className="u26-year u26-year--next">
                <div aria-hidden="true" className="u26-founded-rays" />
                <div className="u26-year-inner">
                  <p className="u26-tag u26-tag--paper">Next update</p>
                  <p className="u26-display u26-year-big" id="next-title">
                    2027
                  </p>
                  <p className="u26-hand u26-year-note">
                    in development. see you there.
                  </p>
                </div>
              </div>
            }
            source={year}
            type="center"
          >
            <div className="u26-year">
              <div className="u26-year-inner">
                <p className="u26-tag">Installed</p>
                <p className="u26-display u26-year-big" ref={year}>
                  2026
                </p>
                <p className="u26-hand u26-year-note">update complete.</p>
              </div>
            </div>
          </DistortionWave>
        </div>
        <div className="u26-finale-ctas">
          <a
            className="u26-btn u26-btn--foil"
            href="https://ryuhq.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Check out Ryu <span aria-hidden="true">↗</span>
          </a>
          <button className="u26-btn" onClick={share} type="button">
            {copied ? "Link copied" : "Share this update"}
          </button>
          <button className="u26-btn" onClick={replay} type="button">
            Play it again
          </button>
          <Link className="u26-btn" href="/2025">
            Previous update: 2025 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
