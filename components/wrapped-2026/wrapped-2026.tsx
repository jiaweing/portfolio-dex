"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { AppsSection } from "./apps-section";
import { BurstCanvas, type BurstHandle } from "./burst-canvas";
import { CodeSection, type Day } from "./code-section";
import { Finale } from "./finale";
import { Hero } from "./hero";
import { Milestones } from "./milestones";
import { PlotTwist } from "./plot-twist";
import { Wrapped2026Context } from "./primitives";
import { type SocialSeries, SocialsSection } from "./socials-section";
import { type PostTitle, WritingSection } from "./writing-section";

// The page takes over the whole screen with its own scroll container, so it
// can stay dark and full bleed regardless of the site theme and layout.
export function Wrapped2026({
  days,
  posts,
  postTotal,
  perMonth,
  social,
  socialSince,
}: {
  days: Day[];
  posts: PostTitle[];
  postTotal: number;
  perMonth: number[];
  social: SocialSeries[];
  socialSince: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const burst = useRef<BurstHandle>(null);
  const reduced = Boolean(useReducedMotion());
  const ctx = useMemo(() => ({ scroller, burst, reduced }), [reduced]);

  const { scrollYProgress } = useScroll({ container: scroller });
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // The page underneath must not scroll while this is open
  useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    scroller.current?.focus({ preventScroll: true });

    // The layout wraps pages in a z-indexed section, which would cap this
    // overlay below the site's floating nav, toasts and buttons. Lift those
    // ancestors while the page is open so it really covers everything.
    const lifted: [HTMLElement, string][] = [];
    let el = scroller.current?.parentElement ?? null;
    while (el && el !== document.body) {
      const style = getComputedStyle(el);
      if (style.zIndex !== "auto" && style.position !== "static") {
        lifted.push([el, el.style.zIndex]);
        el.style.zIndex = "2147483000";
      }
      el = el.parentElement;
    }

    return () => {
      html.style.overflow = prev;
      for (const [node, z] of lifted) {
        node.style.zIndex = z;
      }
    };
  }, []);

  return (
    <Wrapped2026Context.Provider value={ctx}>
      <div
        className="fixed inset-0 z-[10000] overflow-y-auto overflow-x-hidden overscroll-contain bg-[#05010d] font-sans text-white outline-none selection:bg-fuchsia-500/40"
        ref={scroller}
        tabIndex={-1}
      >
        <BurstCanvas enabled={!reduced} />

        <motion.div
          className="fixed top-0 right-0 left-0 z-[20] h-[3px] origin-left bg-gradient-to-r from-violet-500 via-pink-500 to-orange-400"
          style={{ scaleX: progress }}
        />
        <div className="pointer-events-none fixed top-0 right-0 left-0 z-[20] flex items-center justify-between p-4 md:p-6">
          <Link
            className="pointer-events-auto rounded-full border border-white/15 bg-black/30 px-4 py-2 font-mono text-white/80 text-xs backdrop-blur-md transition hover:border-white/40 hover:text-white"
            href="/"
          >
            ← jiaweing.com
          </Link>
          <Link
            className="pointer-events-auto rounded-full border border-white/15 bg-black/30 px-4 py-2 font-mono text-white/80 text-xs backdrop-blur-md transition hover:border-white/40 hover:text-white"
            href="/2025"
          >
            2025 →
          </Link>
        </div>

        <main className="relative z-[10]">
          <Hero />
          <PlotTwist />
          <Milestones />
          <CodeSection days={days} />
          <AppsSection />
          <WritingSection perMonth={perMonth} posts={posts} total={postTotal} />
          <SocialsSection series={social} since={socialSince} />
          <Finale />
        </main>
      </div>
    </Wrapped2026Context.Provider>
  );
}
