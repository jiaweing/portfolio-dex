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
    // Use RSS feed with CHANNEL_ID — more reliable than scraping /live page
    // which returns recommended streams from other channels on datacenter IPs
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return notLive;

    const xml = await res.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];

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
    // Extract unique video IDs from the page (11-char YouTube IDs)
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
