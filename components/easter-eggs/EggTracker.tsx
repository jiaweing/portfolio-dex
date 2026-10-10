"use client";

import { Check, Lock, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CORE_EGGS,
  countCore,
  type Egg,
  type EggId,
  isSeason,
  OPEN_TRACKER_EVENT,
  SEASON_LABEL,
  SEASONAL_EGGS,
  TOTAL_EGGS,
  useFoundEggs,
} from "@/lib/easter-eggs";
import { cn } from "@/lib/utils";
import { RewardCard } from "./EggReward";
import { SeasonalEggIcon } from "./SeasonalEggIcon";

function EggRow({ egg, found }: { egg: Egg; found: EggId[] }) {
  const isFound = found.includes(egg.id);
  const inSeason = egg.season ? isSeason(egg.season) : true;
  return (
    <li className="flex items-start gap-2.5 rounded-xl px-2 py-1.5">
      <span
        className={cn(
          "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[11px]",
          isFound
            ? "bg-foreground text-background"
            : "bg-muted text-muted-foreground"
        )}
      >
        {isFound ? <Check className="size-3" /> : <Lock className="size-2.5" />}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "flex items-center gap-1.5 font-medium text-xs",
            !isFound && "text-muted-foreground"
          )}
        >
          {isFound ? egg.name : "???"}
          {egg.season && (
            <span
              className={cn(
                "rounded-full px-1.5 py-px font-normal text-[10px]",
                inSeason
                  ? "bg-orange-500/15 text-orange-600 dark:text-orange-400"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {inSeason ? "in season" : SEASON_LABEL[egg.season]}
            </span>
          )}
        </p>
        <p className="text-muted-foreground text-xs leading-snug">
          {isFound ? egg.found : egg.hint}
        </p>
      </div>
    </li>
  );
}

export function EggTracker() {
  const found = useFoundEggs();
  const count = countCore(found);
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
          <SeasonalEggIcon className={cn(count > 0 && "text-foreground")} />
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

        <div
          className="-mx-1 max-h-[min(50vh,360px)] overflow-y-auto"
          data-lenis-prevent
        >
          <ul className="space-y-0.5">
            {CORE_EGGS.map((egg) => (
              <EggRow egg={egg} found={found} key={egg.id} />
            ))}
          </ul>
          <p className="mt-3 mb-1 px-2 font-medium text-[10px] text-muted-foreground uppercase tracking-widest">
            Seasonal bonus
          </p>
          <ul className="space-y-0.5">
            {SEASONAL_EGGS.map((egg) => (
              <EggRow egg={egg} found={found} key={egg.id} />
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
