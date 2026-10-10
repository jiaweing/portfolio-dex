"use client";

import { Check, Egg, Lock, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  EGGS,
  OPEN_TRACKER_EVENT,
  TOTAL_EGGS,
  useFoundEggs,
} from "@/lib/easter-eggs";
import { cn } from "@/lib/utils";
import { RewardCard } from "./EggReward";

export function EggTracker() {
  const found = useFoundEggs();
  const count = found.length;
  const complete = count >= TOTAL_EGGS;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_TRACKER_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_TRACKER_EVENT, onOpen);
  }, []);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        aria-label={`Easter eggs: ${count} of ${TOTAL_EGGS} found`}
        className="relative inline-flex h-9 min-w-9 items-center justify-center gap-1.5 rounded-md text-muted-foreground text-xs tabular-nums transition-colors hover:bg-accent hover:text-foreground sm:px-2"
      >
        {complete ? (
          <Trophy className="size-4" />
        ) : (
          <Egg className={cn("size-4", count > 0 && "text-foreground")} />
        )}
        <span className="hidden sm:inline">
          {count}/{TOTAL_EGGS}
        </span>
        <span className="absolute top-0.5 right-0 rounded-full bg-foreground px-1 font-medium text-[9px] text-background leading-tight sm:hidden">
          {count}
        </span>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 gap-3 p-3">
        <div className="px-1 pt-1">
          <div className="flex items-baseline justify-between">
            <p className="font-medium">Easter eggs</p>
            <p className="text-muted-foreground text-xs tabular-nums">
              {count}/{TOTAL_EGGS} found
            </p>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground transition-[width] duration-500"
              style={{ width: `${(count / TOTAL_EGGS) * 100}%` }}
            />
          </div>
          {!complete && (
            <p className="mt-2 text-muted-foreground text-xs">
              Find all {TOTAL_EGGS} to unlock a discount on Ryu.
            </p>
          )}
        </div>

        {complete && <RewardCard />}

        <ul
          className="-mx-1 max-h-[min(50vh,360px)] space-y-0.5 overflow-y-auto"
          data-lenis-prevent
        >
          {EGGS.map((egg) => {
            const isFound = found.includes(egg.id);
            return (
              <li
                className="flex items-start gap-2.5 rounded-xl px-2 py-1.5"
                key={egg.id}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[11px]",
                    isFound
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isFound ? (
                    <Check className="size-3" />
                  ) : (
                    <Lock className="size-2.5" />
                  )}
                </span>
                <div className="min-w-0">
                  <p
                    className={cn(
                      "font-medium text-xs",
                      !isFound && "text-muted-foreground"
                    )}
                  >
                    {isFound ? egg.name : "???"}
                  </p>
                  <p className="text-muted-foreground text-xs leading-snug">
                    {isFound ? egg.found : egg.hint}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
