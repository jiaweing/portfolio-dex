"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Flame,
  Flower2,
  Heart,
  PartyPopper,
  Rabbit,
  Snowflake,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  type SeasonalEffect,
  triggerSeasonalEffect,
  useSeasonalEffect,
} from "@/hooks/use-seasonal-effect";
import { cn } from "@/lib/utils";

const EFFECTS: {
  effect: NonNullable<SeasonalEffect>;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { effect: "confetti", label: "New Year", Icon: PartyPopper },
  { effect: "blossoms", label: "Lunar New Year", Icon: Flower2 },
  { effect: "hearts", label: "Valentine's", Icon: Heart },
  { effect: "eggs", label: "Easter", Icon: Rabbit },
  { effect: "embers", label: "Halloween", Icon: Flame },
  { effect: "snow", label: "Christmas", Icon: Snowflake },
];

const buttonClass =
  "rounded-md p-1 text-muted-foreground transition-all hover:scale-125 hover:text-foreground";

// One icon showing the active effect; click it to slide the rest out to the left
export function EffectPicker() {
  const effect = useSeasonalEffect();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = EFFECTS.find((e) => e.effect === effect);
  const TriggerIcon = active?.Icon ?? Sparkles;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const options = [
    ...EFFECTS,
    { effect: null, label: "Clear effects", Icon: X },
  ] as const;

  return (
    <TooltipProvider delay={0}>
      <div className="flex items-center" ref={ref}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              animate={{ width: "auto", opacity: 1 }}
              className="flex items-center gap-1 overflow-hidden pr-1"
              exit={{ width: 0, opacity: 0 }}
              initial={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 36 }}
            >
              {options.map(({ effect: value, label, Icon }, i) => (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <motion.button
                      animate={{ opacity: 1, x: 0 }}
                      aria-label={label}
                      aria-pressed={value === effect}
                      className={cn(
                        buttonClass,
                        value === effect
                          ? "bg-muted text-foreground"
                          : "opacity-50 hover:opacity-100"
                      )}
                      initial={{ opacity: 0, x: 12 }}
                      onClick={() => {
                        triggerSeasonalEffect(value);
                        setOpen(false);
                      }}
                      // Items fan out from the trigger, nearest first
                      transition={{ delay: (options.length - 1 - i) * 0.03 }}
                      type="button"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent className="px-2 py-1 text-xs" side="top">
                    {label}
                  </TooltipContent>
                </Tooltip>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              aria-expanded={open}
              aria-label="Seasonal effects"
              className={cn(
                buttonClass,
                open ? "text-foreground" : "opacity-60 hover:opacity-100"
              )}
              onClick={() => setOpen((o) => !o)}
              type="button"
            >
              <motion.span
                animate={{ rotate: open ? 90 : 0 }}
                className="block"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <TriggerIcon className="h-3.5 w-3.5" />
              </motion.span>
            </button>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs" side="top">
            {active ? `${active.label} effect` : "Seasonal effects"}
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
