/**
 * Scrapes public follower counts from social profiles and appends to data/social-growth.ts.
 * Run via: bun scripts/scrape-social-stats.ts
 * Called daily by .github/workflows/update-social-stats.yml
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const HANDLES = {
  youtube: process.env.YOUTUBE_HANDLE || "jiaweihq",
  twitch: process.env.TWITCH_HANDLE || "jiaweihq",
  tiktok: process.env.TIKTOK_HANDLE || "jiaweihq",
  instagram: process.env.INSTAGRAM_HANDLE || "jiaweihq",
  threads: process.env.THREADS_HANDLE || "jiaweihq",
  x: process.env.X_HANDLE || "jiaweihq",
};

async function scrapeYouTube(
  browser: Awaited<ReturnType<typeof puppeteer.launch>>,
  handle: string
): Promise<number | null> {
  const page = await browser.newPage();
  try {
    await page.goto(`https://www.youtube.com/@${handle}`, {
      waitUntil: "networkidle2",
      timeout: 30_000,
    });
    await page.waitForSelector("#subscriber-count", { timeout: 10_000 });
    const text = await page.$eval(
      "#subscriber-count",
      (el) => el.textContent ?? ""
    );
    return parseCount(text);
  } catch {
    return null;
  } finally {
    await page.close();
  }
}

async function scrapeTwitch(
  browser: Awaited<ReturnType<typeof puppeteer.launch>>,
  handle: string
): Promise<number | null> {
  const page = await browser.newPage();
  try {
    await page.goto(`https://www.twitch.tv/${handle}`, {
      waitUntil: "networkidle2",
      timeout: 30_000,
    });
    await new Promise((r) => setTimeout(r, 3000));
    const text = await page.evaluate(() => {
      const el = document.querySelector('[data-a-target="followers-count"]');
      return el?.textContent ?? null;
    });
    return text ? parseCount(text) : null;
  } catch {
    return null;
  } finally {
    await page.close();
  }
}

async function scrapeTikTok(
  browser: Awaited<ReturnType<typeof puppeteer.launch>>,
  handle: string
): Promise<number | null> {
  const page = await browser.newPage();
  try {
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );
    await page.goto(`https://www.tiktok.com/@${handle}`, {
      waitUntil: "networkidle2",
      timeout: 30_000,
    });
    await new Promise((r) => setTimeout(r, 3000));
    const text = await page.evaluate(() => {
      const el = document.querySelector('[data-e2e="followers-count"]');
      return el?.textContent ?? null;
    });
    return text ? parseCount(text) : null;
  } catch {
    return null;
  } finally {
    await page.close();
  }
}

async function scrapeInstagram(
  browser: Awaited<ReturnType<typeof puppeteer.launch>>,
  handle: string
): Promise<number | null> {
  const page = await browser.newPage();
  try {
    await page.goto(`https://www.instagram.com/${handle}/`, {
      waitUntil: "networkidle2",
      timeout: 30_000,
    });
    await new Promise((r) => setTimeout(r, 3000));
    const text = await page.evaluate(() => {
      const metas = document.querySelectorAll("meta");
      for (const m of metas) {
        const content = m.getAttribute("content") ?? "";
        if (content.includes("Followers")) {
          const match = content.match(/^([\d,KkMm.]+)\s*Followers/);
          return match?.[1] ?? null;
        }
      }
      return null;
    });
    return text ? parseCount(text) : null;
  } catch {
    return null;
  } finally {
    await page.close();
  }
}

async function scrapeThreads(
  browser: Awaited<ReturnType<typeof puppeteer.launch>>,
  handle: string
): Promise<number | null> {
  const page = await browser.newPage();
  try {
    await page.goto(`https://www.threads.net/@${handle}`, {
      waitUntil: "networkidle2",
      timeout: 30_000,
    });
    await new Promise((r) => setTimeout(r, 3000));
    const text = await page.evaluate(() => {
      const spans = document.querySelectorAll("span");
      for (const span of spans) {
        if (/followers/i.test(span.textContent ?? "")) {
          const prev = span.previousElementSibling;
          if (prev) return prev.textContent;
        }
      }
      return null;
    });
    return text ? parseCount(text) : null;
  } catch {
    return null;
  } finally {
    await page.close();
  }
}

async function scrapeX(
  browser: Awaited<ReturnType<typeof puppeteer.launch>>,
  handle: string
): Promise<number | null> {
  const page = await browser.newPage();
  try {
    await page.goto(`https://x.com/${handle}`, {
      waitUntil: "networkidle2",
      timeout: 30_000,
    });
    await new Promise((r) => setTimeout(r, 3000));
    const text = await page.evaluate(() => {
      const links = document.querySelectorAll('a[href$="/followers"]');
      for (const link of links) {
        const spans = link.querySelectorAll("span");
        for (const span of spans) {
          if (/^[\d,.KkMm]+$/.test(span.textContent?.trim() ?? "")) {
            return span.textContent ?? null;
          }
        }
      }
      return null;
    });
    return text ? parseCount(text) : null;
  } catch {
    return null;
  } finally {
    await page.close();
  }
}

function parseCount(raw: string): number | null {
  const s = raw.trim().replace(/,/g, "");
  const match = s.match(/^([\d.]+)([KkMmBb]?)$/);
  if (!match) return null;
  const num = Number.parseFloat(match[1]);
  const suffix = match[2].toUpperCase();
  if (suffix === "K") return Math.round(num * 1000);
  if (suffix === "M") return Math.round(num * 1_000_000);
  if (suffix === "B") return Math.round(num * 1_000_000_000);
  return Math.round(num);
}

async function main() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const dataPath = join(__dirname, "..", "data", "social-growth.ts");
  const source = readFileSync(dataPath, "utf8");

  // Find the last day number
  const dayMatches = [...source.matchAll(/day:\s*(\d+)/g)];
  const lastDay = dayMatches.length
    ? Math.max(...dayMatches.map((m) => Number.parseInt(m[1])))
    : 0;
  const nextDay = lastDay + 1;

  const today = new Date().toISOString().slice(0, 10);

  // Skip if already have today's data
  if (source.includes(`date: "${today}"`)) {
    console.log("Already have today's data, skipping.");
    return;
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  console.log("Scraping social stats...");

  const [youtube, twitch, tiktok, instagram, threads, x] = await Promise.all([
    scrapeYouTube(browser, HANDLES.youtube),
    scrapeTwitch(browser, HANDLES.twitch),
    scrapeTikTok(browser, HANDLES.tiktok),
    scrapeInstagram(browser, HANDLES.instagram),
    scrapeThreads(browser, HANDLES.threads),
    scrapeX(browser, HANDLES.x),
  ]);

  await browser.close();

  console.log({ youtube, twitch, tiktok, instagram, threads, x });

  // Fall back to previous day values for any failed scrapes
  const lastSnapshotMatch = source.match(/\{[\s\S]*?\}/g);
  const snapshots = lastSnapshotMatch
    ? lastSnapshotMatch
        .map((s) => {
          try {
            return Function(`"use strict"; return (${s})`)() as Record<
              string,
              number | string
            >;
          } catch {
            return null;
          }
        })
        .filter(Boolean)
    : [];
  const prev = snapshots[snapshots.length - 1] as Record<
    string,
    number | string
  > | null;

  const newEntry = `  {
    day: ${nextDay},
    date: "${today}",
    tiktok: ${tiktok ?? prev?.tiktok ?? 0},
    twitch: ${twitch ?? prev?.twitch ?? 0},
    youtube: ${youtube ?? prev?.youtube ?? 0},
    instagram: ${instagram ?? prev?.instagram ?? 0},
    threads: ${threads ?? prev?.threads ?? 0},
    x: ${x ?? prev?.x ?? 0},
  },`;

  const updated = source.replace(/^];\s*$/m, `${newEntry}\n];`);

  writeFileSync(dataPath, updated, "utf8");
  console.log(`Added Day ${nextDay} stats.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
