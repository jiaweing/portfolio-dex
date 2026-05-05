import { NextResponse } from "next/server";

export const revalidate = 60;

interface VideoMeta {
  videoId: string;
  title: string | null;
  channelName: string | null;
}

interface LiveResult {
  isLive: boolean;
  videoId: string | null;
  title: string | null;
  channelName: string | null;
  startedAt: string | null;
  latestReplay: VideoMeta | null;
}

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
};

const HANDLE = process.env.YOUTUBE_HANDLE ?? "jiaweihq";
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID ?? "UCOReq1qWCsrNRvlq8S1n57Q";
const API_KEY = process.env.YOUTUBE_API_KEY;

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

type LiveCheckResult = {
  isLive: boolean;
  videoId: string | null;
  title: string | null;
  channelName: string | null;
  startedAt: string | null;
};

const NOT_LIVE: LiveCheckResult = {
  isLive: false,
  videoId: null,
  title: null,
  channelName: null,
  startedAt: null,
};

async function getOEmbed(
  videoId: string
): Promise<{ title: string | null; channelName: string | null }> {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch%3Fv%3D${videoId}&format=json`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return { title: null, channelName: null };
    const meta = await res.json();
    return {
      title: meta.title ?? null,
      channelName: meta.author_name ?? null,
    };
  } catch {
    return { title: null, channelName: null };
  }
}

// ── YouTube Data API v3 (primary — reliable from datacenter IPs) ──────────────
// Uses playlistItems.list + videos.list: only 2 quota units per check.
// Free quota is 10,000 units/day; at 60s revalidate that's ~2,880 units/day.
async function checkLiveViaAPI(): Promise<LiveCheckResult | null> {
  if (!API_KEY) return null; // Not configured — fall through to scraping

  try {
    // The uploads playlist ID is the channel ID with UC → UU
    const uploadsPlaylistId = CHANNEL_ID.replace(/^UC/, "UU");

    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${uploadsPlaylistId}&maxResults=5&key=${API_KEY}`,
      { next: { revalidate: 60 } }
    );
    if (!playlistRes.ok) return NOT_LIVE;

    const playlistData = (await playlistRes.json()) as {
      items?: { contentDetails: { videoId: string } }[];
    };
    const videoIds = playlistData.items?.map((i) => i.contentDetails.videoId);
    if (!videoIds?.length) return NOT_LIVE;

    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=${videoIds.join(",")}&key=${API_KEY}`,
      { next: { revalidate: 60 } }
    );
    if (!videosRes.ok) return NOT_LIVE;

    const videosData = (await videosRes.json()) as {
      items?: {
        id: string;
        snippet: { title: string; channelTitle: string };
        liveStreamingDetails?: {
          actualStartTime?: string;
          actualEndTime?: string;
        };
      }[];
    };

    for (const video of videosData.items ?? []) {
      const lsd = video.liveStreamingDetails;
      // actualStartTime present + actualEndTime absent = currently live
      if (lsd?.actualStartTime && !lsd.actualEndTime) {
        return {
          isLive: true,
          videoId: video.id,
          title: video.snippet.title ?? null,
          channelName: video.snippet.channelTitle ?? null,
          startedAt: lsd.actualStartTime,
        };
      }
    }

    return NOT_LIVE;
  } catch {
    return NOT_LIVE;
  }
}

// ── Scraping fallback (when no API key is configured) ─────────────────────────

function extractPlayerResponse(html: string): Record<string, unknown> | null {
  const marker = "ytInitialPlayerResponse = ";
  const start = html.indexOf(marker);
  if (start === -1) return null;

  let depth = 0;
  let jsonStart = -1;
  let jsonEnd = -1;
  for (let i = start + marker.length; i < html.length; i++) {
    const ch = html[i];
    if (ch === "{") {
      if (depth === 0) jsonStart = i;
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0) {
        jsonEnd = i;
        break;
      }
    }
  }
  if (jsonStart === -1 || jsonEnd === -1) return null;
  try {
    return JSON.parse(html.slice(jsonStart, jsonEnd + 1)) as Record<
      string,
      unknown
    >;
  } catch {
    return null;
  }
}

async function checkVideoPageIsLive(
  videoId: string
): Promise<LiveCheckResult & { videoId: string }> {
  const notLive = { ...NOT_LIVE, videoId };
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: { "User-Agent": UA },
      next: { revalidate: 60 },
    });
    if (!res.ok) return notLive;

    const html = await res.text();
    const playerData = extractPlayerResponse(html);
    if (!playerData) return notLive;

    const vd = playerData.videoDetails as Record<string, unknown> | undefined;
    if (!vd || vd.channelId !== CHANNEL_ID || !vd.isLive) return notLive;

    const mf = (playerData.microformat as Record<string, unknown> | undefined)
      ?.playerMicroformatRenderer as Record<string, unknown> | undefined;
    const lbd = mf?.liveBroadcastDetails as Record<string, unknown> | undefined;

    return {
      isLive: true,
      videoId,
      title: (vd.title as string) ?? null,
      channelName: (vd.author as string) ?? null,
      startedAt: (lbd?.startTimestamp as string) ?? null,
    };
  } catch {
    return notLive;
  }
}

async function checkLiveViaScraping(): Promise<LiveCheckResult> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return NOT_LIVE;

    const xml = await res.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

    // Pass 1: RSS explicit liveBroadcastContent=live
    for (const entry of entries) {
      const block = entry[1];
      const videoIdMatch = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      const broadcastMatch = block.match(
        /<yt:liveBroadcastContent>([^<]+)<\/yt:liveBroadcastContent>/
      );
      if (!videoIdMatch) continue;
      if (broadcastMatch?.[1]?.trim() !== "live") continue;

      const videoId = videoIdMatch[1];
      const publishedMatch = block.match(/<published>([^<]+)<\/published>/);
      const startedAt = publishedMatch?.[1] ?? null;
      const meta = await getOEmbed(videoId);
      return { isLive: true, videoId, startedAt, ...meta };
    }

    // Pass 2: verify top 3 RSS entries via direct video page fetch
    // (handles active streams not yet tagged in RSS)
    const topIds = entries
      .slice(0, 3)
      .map((e) => e[1].match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1])
      .filter((id): id is string => !!id);

    const checks = await Promise.all(topIds.map(checkVideoPageIsLive));
    for (const check of checks) {
      if (check.isLive) return check;
    }

    // Pass 3: channel /live page with ytInitialPlayerResponse channel verification
    const livePage = await fetch(
      `https://www.youtube.com/channel/${CHANNEL_ID}/live`,
      { headers: { "User-Agent": UA }, next: { revalidate: 60 } }
    );
    if (livePage.ok) {
      const liveHtml = await livePage.text();
      const playerData = extractPlayerResponse(liveHtml);
      const vd = playerData?.videoDetails as
        | Record<string, unknown>
        | undefined;
      if (vd && vd.channelId === CHANNEL_ID && vd.isLive) {
        const videoId = vd.videoId as string;
        const mf = (
          playerData!.microformat as Record<string, unknown> | undefined
        )?.playerMicroformatRenderer as Record<string, unknown> | undefined;
        const lbd = mf?.liveBroadcastDetails as
          | Record<string, unknown>
          | undefined;
        return {
          isLive: true,
          videoId,
          title: (vd.title as string) ?? null,
          channelName: (vd.author as string) ?? null,
          startedAt: (lbd?.startTimestamp as string) ?? null,
        };
      }
    }

    return NOT_LIVE;
  } catch {
    return NOT_LIVE;
  }
}

async function checkLive(): Promise<LiveCheckResult> {
  // Prefer the YouTube Data API when configured — reliable from datacenter IPs
  const apiResult = await checkLiveViaAPI();
  if (apiResult !== null) return apiResult;

  // Fall back to HTML scraping
  return checkLiveViaScraping();
}

async function getLatestReplayFromRss(): Promise<VideoMeta | null> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const xml = await res.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

    for (const entry of entries) {
      const block = entry[1];
      const videoIdMatch = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
      const viewsMatch = block.match(/<media:statistics views="(\d+)"/);
      const broadcastMatch = block.match(
        /<yt:liveBroadcastContent>([^<]+)<\/yt:liveBroadcastContent>/
      );

      if (!videoIdMatch) continue;
      const videoId = videoIdMatch[1];
      const views = Number.parseInt(viewsMatch?.[1] ?? "0", 10);
      const broadcastContent = broadcastMatch?.[1]?.trim() ?? "none";

      if (broadcastContent === "upcoming" || broadcastContent === "live")
        continue;
      if (views === 0) continue;

      const meta = await getOEmbed(videoId);
      return { videoId, ...meta };
    }
    return null;
  } catch {
    return null;
  }
}

async function getLatestReplayFromStreamsPage(): Promise<VideoMeta | null> {
  try {
    const res = await fetch(`https://www.youtube.com/@${HANDLE}/streams`, {
      headers: { "User-Agent": UA },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const html = await res.text();
    const matches = [...html.matchAll(/"videoId":"([a-zA-Z0-9_-]{11})"/g)];
    const seen = new Set<string>();
    for (const m of matches) {
      const videoId = m[1];
      if (seen.has(videoId)) continue;
      seen.add(videoId);
      const meta = await getOEmbed(videoId);
      // oEmbed fails for live/private videos — a successful response means it's a valid replay
      if (meta.title) return { videoId, ...meta };
    }
    return null;
  } catch {
    return null;
  }
}

async function getLatestReplay(): Promise<VideoMeta | null> {
  const rss = await getLatestReplayFromRss();
  if (rss) return rss;
  return getLatestReplayFromStreamsPage();
}

export async function GET() {
  try {
    const liveResult = await checkLive();

    const result: LiveResult = {
      ...liveResult,
      latestReplay: liveResult.isLive ? null : await getLatestReplay(),
    };

    return NextResponse.json(result, { headers: CACHE_HEADERS });
  } catch {
    return NextResponse.json(
      {
        isLive: false,
        videoId: null,
        title: null,
        channelName: null,
        startedAt: null,
        latestReplay: null,
      },
      { headers: CACHE_HEADERS }
    );
  }
}
