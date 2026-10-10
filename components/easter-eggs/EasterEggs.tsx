"use client";

import { useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  EGG_FOUND_EVENT,
  type EggId,
  findEgg,
  OPEN_TRACKER_EVENT,
  TOTAL_EGGS,
} from "@/lib/easter-eggs";
import { RewardDialog } from "./EggReward";
import { EggUnlock, type Unlock } from "./EggUnlock";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

const KEY_SEQUENCE = [
  "up",
  "up",
  "down",
  "down",
  "left",
  "right",
  "left",
  "right",
  "b",
  "a",
];
const TOUCH_SEQUENCE = [...KEY_SEQUENCE.slice(0, 8), "tap", "tap"];

const KEY_MAP: Record<string, string> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  b: "b",
  B: "b",
  a: "a",
  A: "a",
};

const TOURIST_STOPS = ["/", "/about", "/blog", "/projects", "/books", "/setup"];
const VISITED_KEY = "easter-eggs:visited";

const endsWith = (input: string[], seq: string[]) =>
  input.length >= seq.length &&
  seq.every((step, i) => input[input.length - seq.length + i] === step);

function matchStop(pathname: string) {
  return TOURIST_STOPS.find((stop) =>
    stop === "/" ? pathname === "/" : pathname.startsWith(stop)
  );
}

function trackVisit(pathname: string) {
  const stop = matchStop(pathname);
  if (!stop) return;
  try {
    const visited = new Set<string>(
      JSON.parse(localStorage.getItem(VISITED_KEY) ?? "[]")
    );
    visited.add(stop);
    localStorage.setItem(VISITED_KEY, JSON.stringify([...visited]));
    if (TOURIST_STOPS.every((s) => visited.has(s))) findEgg("tourist");
  } catch {
    // Storage blocked, skip tracking
  }
}

export function EasterEggs() {
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();
  const [celebrate, setCelebrate] = useState<"small" | "big" | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [queue, setQueue] = useState<Unlock[]>([]);
  const [rewardOpen, setRewardOpen] = useState(false);

  const nextUnlock = useCallback(() => setQueue((q) => q.slice(1)), []);
  const openTracker = useCallback(
    () => window.dispatchEvent(new Event(OPEN_TRACKER_EVENT)),
    []
  );

  useEffect(() => {
    trackVisit(pathname);
    if (pathname.startsWith("/wrapped")) findEgg("capsule");
  }, [pathname]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 5) findEgg("owl");

    console.log(
      "%c🥚 psst. There are %d easter eggs hidden on this site.",
      "font-size:14px;font-weight:600",
      TOTAL_EGGS
    );
    console.log("Find them all for a little something from Ryu.");

    let hiddenAt = 0;
    const onVisibility = () => {
      if (document.hidden) hiddenAt = Date.now();
      else if (hiddenAt && Date.now() - hiddenAt > 3000) findEgg("comeback");
    };

    const onCopy = () => {
      if (window.getSelection()?.toString().trim()) findEgg("copycat");
    };

    let input: string[] = [];
    const push = (step: string) => {
      input = [...input, step].slice(-KEY_SEQUENCE.length);
      if (endsWith(input, KEY_SEQUENCE) || endsWith(input, TOUCH_SEQUENCE)) {
        input = [];
        findEgg("konami");
      }
    };
    const onKey = (e: KeyboardEvent) => {
      const step = KEY_MAP[e.key];
      if (step) push(step);
      else input = [];
    };

    let start: { x: number; y: number } | null = null;
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      start = { x: t.clientX, y: t.clientY };
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!start) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      start = null;
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) push("tap");
      else if (Math.abs(dx) > 40 || Math.abs(dy) > 40) {
        // Swiping up moves your finger up, so it maps to the up arrow
        if (Math.abs(dy) > Math.abs(dx)) push(dy < 0 ? "up" : "down");
        else push(dx < 0 ? "left" : "right");
      }
    };

    const onFound = (e: Event) => {
      const { id, count, seasonal } = (
        e as CustomEvent<{ id: EggId; count: number; seasonal: boolean }>
      ).detail;
      if (seasonal) {
        setQueue((q) => [...q, { id, count, seasonal }]);
        setCelebrate((c) => c ?? "small");
      } else if (count >= TOTAL_EGGS) {
        setQueue([]);
        setRewardOpen(true);
        setCelebrate("big");
      } else {
        setQueue((q) => [...q, { id, count }]);
        setCelebrate((c) => c ?? "small");
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("copy", onCopy);
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener(EGG_FOUND_EVENT, onFound);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("copy", onCopy);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener(EGG_FOUND_EVENT, onFound);
    };
  }, []);

  useEffect(() => {
    if (!celebrate) return;
    setSize({ width: window.innerWidth, height: window.innerHeight });
    const timer = setTimeout(
      () => setCelebrate(null),
      celebrate === "big" ? 7000 : 3500
    );
    return () => clearTimeout(timer);
  }, [celebrate]);

  const small = celebrate === "small";
  // Small bursts shoot up from where the unlock card sits
  const source = {
    x: size.width / 2 - 120,
    y: size.height - (size.width >= 1024 ? 90 : 150),
    w: 240,
    h: 10,
  };

  return (
    <>
      <EggUnlock
        onDone={nextUnlock}
        onOpenTracker={openTracker}
        unlock={queue[0] ?? null}
      />
      <RewardDialog onOpenChange={setRewardOpen} open={rewardOpen} />
      {celebrate && !reducedMotion && (
        <div className="pointer-events-none fixed inset-0 z-[220]">
          <Confetti
            colors={["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]}
            confettiSource={small ? source : undefined}
            gravity={small ? 0.3 : 0.1}
            height={size.height}
            initialVelocityY={small ? 14 : 10}
            key={celebrate}
            numberOfPieces={small ? 70 : 300}
            recycle={false}
            width={size.width}
          />
        </div>
      )}
    </>
  );
}
