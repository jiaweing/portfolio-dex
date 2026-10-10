"use client";

import { useEffect, useState } from "react";
import { currentSeason, SEASON_EFFECT, type SeasonEffect } from "@/lib/seasons";

export const SEASONAL_EVENT = "seasonalEffectChange";

export type SeasonalEffect = SeasonEffect | null;

function getDateEffect(): SeasonalEffect {
  const season = currentSeason();
  return season ? SEASON_EFFECT[season] : null;
}

export function useSeasonalEffect(): SeasonalEffect {
  const [effect, setEffect] = useState<SeasonalEffect>(null);

  useEffect(() => {
    setEffect(getDateEffect());

    const handler = (e: Event) => {
      setEffect((e as CustomEvent<{ effect: SeasonalEffect }>).detail.effect);
    };
    window.addEventListener(SEASONAL_EVENT, handler);
    return () => window.removeEventListener(SEASONAL_EVENT, handler);
  }, []);

  return effect;
}

export function triggerSeasonalEffect(effect: SeasonalEffect) {
  window.dispatchEvent(new CustomEvent(SEASONAL_EVENT, { detail: { effect } }));
}
