"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Egg, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { EGGS, type EggId, TOTAL_EGGS } from "@/lib/easter-eggs";

export type Unlock = { id: EggId; count: number };

const DISPLAY_MS = 4500;
const CRACK_DELAY = 0.7;

// Egg wobbles, splits in half and lets the sparkles out
function CrackingEgg({ still }: { still: boolean }) {
  const halfTransition = { delay: still ? 0 : CRACK_DELAY, duration: 0.35 };

  return (
    <div className="relative flex size-14 shrink-0 items-center justify-center rounded-2xl bg-foreground text-background">
      <motion.div
        animate={still ? undefined : { rotate: [0, -14, 12, -9, 6, 0] }}
        className="absolute inset-0 flex items-center justify-center"
        transition={{ duration: CRACK_DELAY, ease: "easeInOut" }}
      >
        <motion.span
          animate={{ y: -10, x: -3, rotate: -28, opacity: 0 }}
          className="absolute [clip-path:inset(0_0_52%_0)]"
          initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
          transition={halfTransition}
        >
          <Egg className="size-7" />
        </motion.span>
        <motion.span
          animate={{ y: 6, opacity: 0 }}
          className="absolute [clip-path:inset(48%_0_0_0)]"
          initial={{ y: 0, opacity: 1 }}
          transition={halfTransition}
        >
          <Egg className="size-7" />
        </motion.span>
      </motion.div>
      <motion.span
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        initial={{ scale: 0, rotate: -45, opacity: 0 }}
        transition={{
          delay: still ? 0 : CRACK_DELAY + 0.1,
          type: "spring",
          stiffness: 300,
          damping: 12,
        }}
      >
        <Sparkles className="size-7" />
      </motion.span>
    </div>
  );
}

export function EggUnlock({
  unlock,
  onDone,
  onOpenTracker,
}: {
  unlock: Unlock | null;
  onDone: () => void;
  onOpenTracker: () => void;
}) {
  const still = Boolean(useReducedMotion());
  const egg = unlock ? EGGS.find((e) => e.id === unlock.id) : null;

  useEffect(() => {
    if (!unlock) return;
    const timer = setTimeout(onDone, DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [unlock, onDone]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[210] flex justify-center px-4 lg:bottom-8">
      <AnimatePresence mode="wait">
        {unlock && egg && (
          <motion.button
            animate={{ opacity: 1, y: 0, scale: 1 }}
            aria-live="polite"
            className="pointer-events-auto flex w-full max-w-sm items-center gap-4 rounded-3xl border bg-popover p-3 pr-5 text-left text-popover-foreground shadow-2xl"
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            key={unlock.id}
            onClick={() => {
              onDone();
              onOpenTracker();
            }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            type="button"
          >
            <CrackingEgg still={still} />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-[10px] text-muted-foreground uppercase tracking-widest">
                Easter egg found
              </p>
              <p className="truncate font-semibold text-lg leading-tight">
                {egg.name}
              </p>
              <p className="line-clamp-2 text-muted-foreground text-xs leading-snug">
                {egg.found}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    animate={{ width: `${(unlock.count / TOTAL_EGGS) * 100}%` }}
                    className="h-full rounded-full bg-foreground"
                    initial={{
                      width: `${((unlock.count - 1) / TOTAL_EGGS) * 100}%`,
                    }}
                    transition={{
                      delay: still ? 0 : CRACK_DELAY + 0.2,
                      type: "spring",
                      stiffness: 120,
                      damping: 16,
                    }}
                  />
                </div>
                <span className="text-muted-foreground text-xs tabular-nums">
                  {unlock.count}/{TOTAL_EGGS}
                </span>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
