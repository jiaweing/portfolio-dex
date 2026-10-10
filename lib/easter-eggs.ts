"use client";

import { useSyncExternalStore } from "react";
import { isSeason, type Season } from "@/lib/seasons";

export { isSeason, type Season } from "@/lib/seasons";

export type EggId =
  | "konami"
  | "poke"
  | "fire"
  | "hold"
  | "memory"
  | "lost"
  | "owl"
  | "indecisive"
  | "search"
  | "tourist"
  | "capsule"
  | "bookworm"
  | "comeback"
  | "copycat"
  | "ghostbuster"
  | "hohoho"
  | "countdown"
  | "goldenegg"
  | "smitten"
  | "huat";

export interface Egg {
  id: EggId;
  name: string;
  hint: string;
  found: string;
  /** Seasonal eggs only unlock on real dates and are a bonus on top of the reward */
  season?: Season;
}

export const EGGS: Egg[] = [
  {
    id: "konami",
    name: "Old School",
    hint: "Thirty extra lives, if you still remember the code. Swipes count too.",
    found: "Up, up, down, down, left, right, left, right, B, A.",
  },
  {
    id: "poke",
    name: "Poke",
    hint: "The face in the intro looks very pokeable.",
    found: "You poked Jay five times. He felt every one.",
  },
  {
    id: "fire",
    name: "On Fire",
    hint: "Some emojis can't handle the heat.",
    found: "Stoked the fire until it got way too hot.",
  },
  {
    id: "hold",
    name: "Hold That Thought",
    hint: "A good name is worth holding onto.",
    found: "Held onto the name long enough to learn it.",
  },
  {
    id: "memory",
    name: "Total Recall",
    hint: "Remember every project? Prove it.",
    found: "Beat the memory game on the projects page.",
  },
  {
    id: "lost",
    name: "Lost in the Void",
    hint: "Go somewhere that doesn't exist.",
    found: "Found the 404 page. Most people only find it by accident.",
  },
  {
    id: "owl",
    name: "Night Owl",
    hint: "Some visitors only show up after midnight.",
    found: "Browsing portfolios between midnight and 5am. Respect.",
  },
  {
    id: "indecisive",
    name: "Indecisive",
    hint: "Light, dark, light, dark, light, dark...",
    found: "Flipped the theme six times in ten seconds.",
  },
  {
    id: "search",
    name: "Search Party",
    hint: "Ask the search bar about the next big thing.",
    found: "Searched for Ryu. Good taste.",
  },
  {
    id: "tourist",
    name: "Tourist",
    hint: "See every stop on the map.",
    found: "Visited home, about, writing, projects, books and setup.",
  },
  {
    id: "capsule",
    name: "Time Capsule",
    hint: "Last year is still wrapped up somewhere.",
    found: "Unwrapped the yearly recap.",
  },
  {
    id: "bookworm",
    name: "Bookworm",
    hint: "Read a post all the way to the very end.",
    found: "Reached the end of a blog post. Rare behaviour.",
  },
  {
    id: "comeback",
    name: "Missed Me?",
    hint: "Leave for a bit. Come back.",
    found: "Switched tabs and came back. Welcome home.",
  },
  {
    id: "copycat",
    name: "Copycat",
    hint: "Good artists copy.",
    found: "Copied something off the site. Great artists steal.",
  },
  {
    id: "ghostbuster",
    name: "Ghostbuster",
    hint: "Halloween only. Something is floating up the page. Catch it.",
    found: "Caught a ghost mid float. Who you gonna call?",
    season: "halloween",
  },
  {
    id: "hohoho",
    name: "Ho Ho Ho",
    hint: "Christmas only. Someone is wearing a festive hat. Give it a tap.",
    found: "Tapped the Santa hat. Merry Christmas!",
    season: "christmas",
  },
  {
    id: "countdown",
    name: "Countdown",
    hint: "New Year only. Party hats are made for tapping.",
    found: "Tapped the party hat. Happy new year!",
    season: "newyear",
  },
  {
    id: "huat",
    name: "Huat Ah",
    hint: "Lunar New Year only. Grab an ang bao while it drifts past.",
    found: "Caught a red packet. Huat ah, gong xi fa cai!",
    season: "lunarnewyear",
  },
  {
    id: "smitten",
    name: "Smitten",
    hint: "Valentine's only. Love is in the air, literally. Catch some.",
    found: "Caught a floating heart. Happy Valentine's!",
    season: "valentines",
  },
  {
    id: "goldenegg",
    name: "Golden Egg",
    hint: "Easter weekend only. One egg in the shower is not like the others.",
    found: "Found the golden egg. An easter egg about Easter eggs.",
    season: "easter",
  },
];

export const CORE_EGGS = EGGS.filter((e) => !e.season);
export const SEASONAL_EGGS = EGGS.filter((e) => e.season);
export const TOTAL_EGGS = CORE_EGGS.length;
const CORE_IDS = new Set(CORE_EGGS.map((e) => e.id));

export const SEASON_LABEL: Record<Season, string> = {
  newyear: "Dec 31 to Jan 1",
  lunarnewyear: "Lunar New Year",
  valentines: "Feb 12 to 14",
  easter: "Easter weekend",
  halloween: "October",
  christmas: "December",
};

// Seasonal eggs can only be found while their season is on
export function findSeasonalEgg(id: EggId, season: Season) {
  if (isSeason(season)) findEgg(id);
}

export const countCore = (ids: EggId[]) =>
  ids.filter((id) => CORE_IDS.has(id)).length;
export const EGG_FOUND_EVENT = "easterEggFound";
export const OPEN_TRACKER_EVENT = "easterEggsOpenTracker";

// Base64 so the reward does not show up in a plain text search of the page
const REWARD = "UllVMTA=";
export const REWARD_URL = "https://ryuhq.com";
export const getRewardCode = () => atob(REWARD);

const STORAGE_KEY = "easter-eggs:v1";
const CHANGE_EVENT = "easterEggsChange";

let cache: EggId[] | null = null;

function read(): EggId[] {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as EggId[]) : [];
    const valid = new Set(EGGS.map((e) => e.id));
    cache = parsed.filter((id) => valid.has(id));
  } catch {
    cache = [];
  }
  return cache;
}

function write(ids: EggId[]) {
  cache = ids;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Storage blocked, progress lives for this page view only
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function findEgg(id: EggId) {
  if (typeof window === "undefined") return;
  const current = read();
  if (current.includes(id)) return;
  const next = [...current, id];
  write(next);
  window.dispatchEvent(
    new CustomEvent(EGG_FOUND_EVENT, {
      detail: { id, count: countCore(next), seasonal: !CORE_IDS.has(id) },
    })
  );
}

export function resetEggs() {
  write([]);
}

function subscribe(callback: () => void) {
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    cache = null;
    callback();
  };
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", onStorage);
  };
}

const EMPTY: EggId[] = [];

export function useFoundEggs(): EggId[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY);
}

// Calls onHit once `count` triggers land inside `windowMs`
export function createBurst(
  count: number,
  windowMs: number,
  onHit: () => void
) {
  let hits: number[] = [];
  return () => {
    const now = Date.now();
    hits = [...hits.filter((t) => now - t < windowMs), now];
    if (hits.length >= count) {
      hits = [];
      onHit();
    }
  };
}
