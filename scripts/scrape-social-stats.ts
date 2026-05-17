/**
 * Scrapes public follower counts from social profiles and appends to data/social-growth.ts.
 * Run via: bun scripts/scrape-social-stats.ts
 * Called daily by .github/workflows/update-social-stats.yml
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteerExtra from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteerExtra.use(StealthPlugin());

const HANDLES = {
  youtube: process.env.YOUTUBE_HANDLE || "jiaweihq",
  twitch: process.env.TWITCH_HANDLE || "jiaweihq",
  tiktok: process.env.TIKTOK_HANDLE || "jiaweihq",
  instagram: process.env.INSTAGRAM_HANDLE || "jiaweihq",
  threads: process.env.THREADS_HANDLE || "jiaweihq",
  x: process.env.X_HANDLE || "jiaweihq",
};

type Browser = Awaited<ReturnType<typeof puppeteerExtra.launch>>;

async function scrapeYouTube(
  browser: Browser,
  handle: string
): Promise<number | null> {
  const page = await browser.newPage();
  try {
    await page.goto(`https://www.youtube.com/@${handle}`, {
      waitUntil: "networkidle2",
      timeout: 45_000,
    });
    await new Promise((r) => setTimeout(r, 4000));
    const debug = await page.evaluate(() => {
      const data = (window as any).ytInitialData;
      const headerKeys = data?.header ? Object.keys(data.header) : [];
      // c4TabbedHeaderRenderer (older layout)
      const c4 = data?.header?.c4TabbedHeaderRenderer;
      const c4Sub =
        c4?.subscriberCountText?.simpleText ??
        c4?.subscriberCountText?.runs?.[0]?.text ??
        null;
      // pageHeaderRenderer (newer layout ~2023+)
      const ph = data?.header?.pageHeaderRenderer;
      const metadata =
        ph?.content?.pageHeaderViewModel?.metadata?.contentMetadataViewModel;
      let phSub: string | null = null;
      for (const row of metadata?.metadataRows ?? []) {
        for (const part of row?.metadataParts ?? []) {
          const t = part?.text?.content ?? "";
          if (/subscriber/i.test(t)) {
            phSub = t;
            break;
          }
        }
        if (phSub) break;
      }
      // DOM fallback
      const domSub =
        document.querySelector("#subscriber-count")?.textContent?.trim() ??
        document
          .querySelector("yt-formatted-string#subscriber-count")
          ?.textContent?.trim() ??
        null;
      return { headerKeys, c4Sub, phSub, domSub, title: document.title };
    });
    console.log("[YouTube debug]", JSON.stringify(debug));
    const raw = debug.c4Sub ?? debug.phSub ?? debug.domSub;
    if (!raw) return null;
    // Subscriber text may be "44 subscribers" or "1.5K subscribers" — extract leading count
    const match = raw.match(/^([\d,.]+[KkMmBb]?)/i);
    return match ? parseCount(match[1]) : null;
  } catch (e) {
    console.warn("YouTube scrape failed:", e);
    return null;
  } finally {
    await page.close();
  }
}

async function scrapeTwitch(
  browser: Browser,
  handle: string
): Promise<number | null> {
  const page = await browser.newPage();
  try {
    // Use the about page which surfaces follower count in the stats panel
    await page.goto(`https://www.twitch.tv/${handle}/about`, {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    await new Promise((r) => setTimeout(r, 6000));
    const text = await page.evaluate(() => {
      // Search the full page text for a "N followers" pattern
      const bodyText = document.body.innerText;
      const match = bodyText.match(/([\d,.]+[KkMm]?)\s*[Ff]ollowers/);
      return match?.[1] ?? null;
    });
    return text ? parseCount(text) : null;
  } catch (e) {
    console.warn("Twitch scrape failed:", e);
    return null;
  } finally {
    await page.close();
  }
}

async function scrapeTikTok(
  browser: Browser,
  handle: string
): Promise<number | null> {
  const page = await browser.newPage();
  try {
    await page.goto(`https://www.tiktok.com/@${handle}`, {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    await new Promise((r) => setTimeout(r, 4000));
    const text = await page.evaluate(() => {
      const el = document.querySelector('[data-e2e="followers-count"]');
      return el?.textContent?.trim() ?? null;
    });
    return text ? parseCount(text) : null;
  } catch (e) {
    console.warn("TikTok scrape failed:", e);
    return null;
  } finally {
    await page.close();
  }
}

async function scrapeInstagram(
  browser: Browser,
  handle: string
): Promise<number | null> {
  const page = await browser.newPage();
  try {
    await page.goto(`https://www.instagram.com/${handle}/`, {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    await new Promise((r) => setTimeout(r, 4000));
    const text = await page.evaluate(() => {
      for (const m of document.querySelectorAll("meta")) {
        const content = m.getAttribute("content") ?? "";
        const match = content.match(/([\d,.KkMm]+)\s*Followers/);
        if (match) return match[1];
      }
      return null;
    });
    return text ? parseCount(text) : null;
  } catch (e) {
    console.warn("Instagram scrape failed:", e);
    return null;
  } finally {
    await page.close();
  }
}

async function scrapeThreads(
  browser: Browser,
  handle: string
): Promise<number | null> {
  const page = await browser.newPage();
  try {
    await page.goto(`https://www.threads.net/@${handle}`, {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    await new Promise((r) => setTimeout(r, 5000));
    const text = await page.evaluate(() => {
      // Meta tags are populated before the login gate renders
      for (const m of document.querySelectorAll("meta")) {
        const content = m.getAttribute("content") ?? "";
        const match = content.match(/([\d,.KkMm]+)\s*[Ff]ollowers/);
        if (match) return match[1];
      }
      // DOM fallback: span adjacent to a "followers" label
      for (const span of document.querySelectorAll("span")) {
        if (/followers/i.test(span.textContent ?? "")) {
          const prev = span.previousElementSibling;
          if (prev) return prev.textContent?.trim() ?? null;
        }
      }
      return null;
    });
    return text ? parseCount(text) : null;
  } catch (e) {
    console.warn("Threads scrape failed:", e);
    return null;
  } finally {
    await page.close();
  }
}

async function scrapeX(
  browser: Browser,
  handle: string
): Promise<number | null> {
  const page = await browser.newPage();
  try {
    await page.goto(`https://x.com/${handle}`, {
      waitUntil: "domcontentloaded",
      timeout: 30_000,
    });
    // Wait for the followers link to appear (href ends in /followers or /verified_followers)
    await page.waitForSelector(`a[href*="/${handle}/verified_followers"], a[href*="/${handle}/followers"]`, {
      timeout: 15_000,
    }).catch(() => null);
    const text = await page.evaluate((handle) => {
      for (const link of document.querySelectorAll(
        `a[href*="/${handle}/verified_followers"], a[href*="/${handle}/followers"]`
      )) {
        for (const span of link.querySelectorAll("span")) {
          const t = span.textContent?.trim() ?? "";
          if (/^[\d,.KkMm]+$/.test(t)) return t;
        }
      }
      return null;
    }, handle);
    console.log("[X] followers text:", text);
    return text ? parseCount(text) : null;
  } catch (e) {
    console.warn("X scrape failed:", e);
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

function getLastSnapshot(
  source: string
): Record<string, number | string> | null {
  const snapshotSection =
    source.match(/socialGrowthData[^[]*\[([\s\S]*)\]/)?.[1] ?? "";
  const blocks = [...snapshotSection.matchAll(/\{([^}]+)\}/g)];
  if (!blocks.length) return null;
  const last = blocks[blocks.length - 1][1];
  const result: Record<string, number | string> = {};
  for (const match of last.matchAll(/(\w+):\s*([^\n,]+)/g)) {
    const val = match[2].trim().replace(/['"]/g, "");
    result[match[1]] = Number.isNaN(Number(val)) ? val : Number(val);
  }
  return result;
}

async function main() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const dataPath = join(__dirname, "..", "data", "social-growth.ts");
  const source = readFileSync(dataPath, "utf8");

  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const dayOfWeek = now.getUTCDay(); // 0 = Sunday, 6 = Saturday

  if ((dayOfWeek === 0 || dayOfWeek === 6) && !process.env.FORCE_SCRAPE) {
    console.log("Weekend — skipping scrape.");
    return;
  }

  if (source.includes(`date: "${today}"`)) {
    console.log("Already have today's data, skipping.");
    return;
  }

  const dayMatches = [...source.matchAll(/day:\s*(\d+)/g)];
  const lastDay = dayMatches.length
    ? Math.max(...dayMatches.map((m) => Number.parseInt(m[1])))
    : 0;
  const nextDay = lastDay + 1;

  const browser = await puppeteerExtra.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled",
      "--ignore-certificate-errors",
    ],
  });

  console.log("Scraping social stats...");

  const [youtube, tiktok, instagram, threads, x, twitch] = await Promise.all([
    scrapeYouTube(browser, HANDLES.youtube),
    scrapeTikTok(browser, HANDLES.tiktok),
    scrapeInstagram(browser, HANDLES.instagram),
    scrapeThreads(browser, HANDLES.threads),
    scrapeX(browser, HANDLES.x),
    scrapeTwitch(browser, HANDLES.twitch),
  ]);

  await browser.close();

  console.log({ youtube, twitch, tiktok, instagram, threads, x });

  const prev = getLastSnapshot(source);

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

  const lastBracket = source.lastIndexOf("];");
  const updated = source.slice(0, lastBracket) + `${newEntry}\n];\n`;

  writeFileSync(dataPath, updated, "utf8");
  console.log(`Added Day ${nextDay} stats.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
