"use client";

import { useEffect, useState } from "react";

export const SEASONAL_EVENT = "seasonalEffectChange";

export type SeasonalEffect = "snow" | "confetti" | null;

function getDateEffect(): SeasonalEffect {
  const now = new Date();
  const month = now.getMonth();
  const date = now.getDate();
  if (month === 11 && date <= 30) return "snow";
  if ((month === 11 && date === 31) || (month === 0 && date === 1))
    return "confetti";
  return null;
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
