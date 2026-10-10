export type Season = "halloween" | "christmas" | "newyear";

export function isSeason(season: Season, now = new Date()) {
  const month = now.getMonth();
  const date = now.getDate();
  if (season === "halloween") return month === 9;
  if (season === "christmas") return month === 11 && date <= 30;
  return (month === 11 && date === 31) || (month === 0 && date === 1);
}

export function currentSeason(now = new Date()): Season | null {
  for (const season of ["halloween", "christmas", "newyear"] as const) {
    if (isSeason(season, now)) return season;
  }
  return null;
}

// The year a season "belongs" to, so New Year's Eve counts toward the new year
export function seasonYear(season: Season, now = new Date()) {
  return season === "newyear" && now.getMonth() === 11
    ? now.getFullYear() + 1
    : now.getFullYear();
}
