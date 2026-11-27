"use client";

import { useEffect, useState } from "react";

/* The chapter trail: a small rail on the left edge of wide screens that
   shows which day of the update you are on and jumps between them. */

const STOPS = [
  { id: "queue", label: "Day 1", name: "Matchmaking failed" },
  { id: "founder", label: "Day 2", name: "New class: Founder" },
  { id: "grind", label: "Day 3", name: "The grind" },
  { id: "drops", label: "Day 4", name: "Item drops" },
  { id: "broadcast", label: "Day 5", name: "Now live" },
  { id: "patch-notes", label: "Notes", name: "Patch notes" },
  { id: "next", label: "Next", name: "2027" },
] as const;

export function Trail() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = STOPS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      // A thin line across the middle of the screen decides the chapter
      { rootMargin: "-50% 0px -50% 0px" }
    );
    for (const el of sections) {
      io.observe(el);
    }
    const onScroll = () => {
      const first = sections[0];
      if (first && first.getBoundingClientRect().top > window.innerHeight / 2) {
        setActive(null);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav aria-label="Chapters" className="u26-trail" data-on={active !== null}>
      <ol>
        {STOPS.map((stop) => (
          <li key={stop.id}>
            <a
              aria-current={active === stop.id ? "step" : undefined}
              href={`#${stop.id}`}
            >
              <i aria-hidden="true" />
              <span>
                <b>{stop.label}</b> {stop.name}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
