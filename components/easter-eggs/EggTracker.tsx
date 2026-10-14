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

// Rows follow the dropdown menu item styling used across the site
function EggRow({ egg, found }: { egg: Egg; found: EggId[] }) {
  const isFound = found.includes(egg.id);
  const inSeason = egg.season ? isSeason(egg.season) : false;
  return (
    <li className="flex items-start gap-2.5 rounded-2xl px-3 py-2 text-sm">
      {isFound ? (
        <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
      ) : (
        <Lock className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" />
      )}
      <div className="min-w-0 flex-1">
        <p className={cn("font-medium", !isFound && "text-muted-foreground")}>
          {isFound ? egg.name : "Hidden"}
          {egg.season && (
            <span
              className={cn(
                "font-normal text-xs",
                inSeason ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {" · "}
              {inSeason ? "in season" : SEASON_LABEL[egg.season]}
            </span>
          )}
        </p>
        <p className="text-muted-foreground text-xs leading-relaxed">
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
      <PopoverContent align="end" className="w-80 gap-0 p-1.5">
        <div className="px-3 pt-2.5 pb-2">
          <div className="flex items-baseline justify-between text-sm">
            <p className="font-medium">Easter eggs</p>
            <p className="text-muted-foreground text-xs tabular-nums">
              {count} of {TOTAL_EGGS}
            </p>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
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

        {complete && (
          <div className="px-1.5 pb-1.5">
            <RewardCard />
          </div>
        )}

        <div className="-mx-1.5 my-1 h-px bg-border/50" />

        <div
          className="scroll-fade-effect-y max-h-[min(50vh,360px)] overflow-y-auto"
          data-lenis-prevent
        >
          <ul>
            {CORE_EGGS.map((egg) => (
              <EggRow egg={egg} found={found} key={egg.id} />
            ))}
          </ul>
          <p className="px-3 pt-3 pb-1 text-muted-foreground text-xs">
            Seasonal bonus, only in season
          </p>
          <ul>
            {SEASONAL_EGGS.map((egg) => (
              <EggRow egg={egg} found={found} key={egg.id} />
            ))}
          </ul>
        </div>
      </PopoverContent>
    </Popover>
  );
}
