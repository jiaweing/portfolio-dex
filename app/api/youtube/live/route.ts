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

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

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
    return { title: meta.title ?? null, channelName: meta.author_name ?? null };
  } catch {
    return { title: null, channelName: null };
  }
}

// Extract ytInitialPlayerResponse JSON from a YouTube page HTML
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

// Check if a specific video is currently live and belongs to our channel
async function checkVideoPageIsLive(videoId: string): Promise<{
  isLive: boolean;
  title: string | null;
  channelName: string | null;
  startedAt: string | null;
}> {
  const notLive = {
    isLive: false,
    title: null,
    channelName: null,
    startedAt: null,
  };
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: { "User-Agent": UA },
      next: { revalidate: 60 },
    });
    if (!res.ok) return notLive;

    const html = await res.text();
    const playerData = extractPlayerResponse(html);
    if (!playerData) return notLive;

    const videoDetails = playerData.videoDetails as
      | Record<string, unknown>
      | undefined;
    if (!videoDetails) return notLive;
    // Only accept videos from our channel
    if (videoDetails.channelId !== CHANNEL_ID) return notLive;
    if (!videoDetails.isLive) return notLive;

    const mf = (playerData.microformat as Record<string, unknown> | undefined)
      ?.playerMicroformatRenderer as Record<string, unknown> | undefined;
    const lbd = mf?.liveBroadcastDetails as Record<string, unknown> | undefined;

    return {
      isLive: true,
      title: (videoDetails.title as string) ?? null,
      channelName: (videoDetails.author as string) ?? null,
      startedAt: (lbd?.startTimestamp as string) ?? null,
    };
  } catch {
    return notLive;
  }
}

async function checkLive(): Promise<{
  isLive: boolean;
  videoId: string | null;
  title: string | null;
  channelName: string | null;
  startedAt: string | null;
}> {
  const notLive = {
    isLive: false,
    videoId: null,
    title: null,
    channelName: null,
    startedAt: null,
  };

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return notLive;

    const xml = await res.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

    // Pass 1: RSS explicit liveBroadcastContent=live entries
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

    // Pass 2: verify top 3 recent RSS entries directly via their video pages.
    // Handles active streams that RSS hasn't tagged with liveBroadcastContent yet.
    const topIds = entries
      .slice(0, 3)
      .map((e) => e[1].match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1])
      .filter((id): id is string => !!id);

    const checks = await Promise.all(
      topIds.map(async (videoId) => ({
        videoId,
        ...(await checkVideoPageIsLive(videoId)),
      }))
    );

    for (const check of checks) {
      if (check.isLive) {
        return {
          isLive: true,
          videoId: check.videoId,
          title: check.title,
          channelName: check.channelName,
          startedAt: check.startedAt,
        };
      }
    }

    // Pass 3: scrape the channel /live page as final fallback for streams not yet in RSS.
    // Use channel ID URL to avoid handle resolution issues.
    // ytInitialPlayerResponse lets us verify channelId to reject datacenter recommendations.
    const livePage = await fetch(
      `https://www.youtube.com/channel/${CHANNEL_ID}/live`,
      {
        headers: { "User-Agent": UA },
        next: { revalidate: 60 },
      }
    );
    if (livePage.ok) {
      const liveHtml = await livePage.text();
      const playerData = extractPlayerResponse(liveHtml);
      const videoDetails = playerData?.videoDetails as
        | Record<string, unknown>
        | undefined;

      if (
        videoDetails &&
        videoDetails.channelId === CHANNEL_ID &&
        videoDetails.isLive
      ) {
        const videoId = videoDetails.videoId as string;
        const mf = (
          playerData!.microformat as Record<string, unknown> | undefined
        )?.playerMicroformatRenderer as Record<string, unknown> | undefined;
        const lbd = mf?.liveBroadcastDetails as
          | Record<string, unknown>
          | undefined;

        return {
          isLive: true,
          videoId,
          title: (videoDetails.title as string) ?? null,
          channelName: (videoDetails.author as string) ?? null,
          startedAt: (lbd?.startTimestamp as string) ?? null,
        };
      }
    }

    return notLive;
  } catch {
    return notLive;
  }
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
      // oEmbed fails for live/private videos, so a successful response means it's a valid replay
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
