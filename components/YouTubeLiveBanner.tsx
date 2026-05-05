"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface LiveStatus {
  isLive: boolean;
  videoId: string | null;
  title: string | null;
  startedAt: string | null;
}

const SIMULATE_VIDEO_ID = "jfKfPfyJRdk";
const SIMULATE_STARTED_AT = new Date(Date.now() - 47 * 60 * 1000).toISOString(); // 47 min ago

function useLiveDuration(startedAt: string | null) {
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!startedAt) return;
    const compute = () => {
      const diffMs = Date.now() - new Date(startedAt).getTime();
      const totalMins = Math.floor(diffMs / 60_000);
      const h = Math.floor(totalMins / 60);
      const m = totalMins % 60;
      if (h > 0) setLabel(`Live for ${h}h ${m}m`);
      else setLabel(`Live for ${m}m`);
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, [startedAt]);

  return label;
}

export function YouTubeLiveBanner() {
  const searchParams = useSearchParams();
  const simulateLive = searchParams.get("live") === "1";
  const [status, setStatus] = useState<LiveStatus | null>(null);

  useEffect(() => {
    if (simulateLive) return;
    const check = async () => {
      try {
        const res = await fetch("/api/youtube/live");
        if (res.ok) setStatus(await res.json());
      } catch {
        /* ignore */
      }
    };
    check();
    const interval = setInterval(check, 120_000);
    return () => clearInterval(interval);
  }, [simulateLive]);

  const effective = simulateLive
    ? {
        isLive: true,
        videoId: SIMULATE_VIDEO_ID,
        title: null,
        startedAt: SIMULATE_STARTED_AT,
      }
    : status;

  const durationLabel = useLiveDuration(effective?.startedAt ?? null);

  if (!(effective?.isLive && effective.videoId)) return null;

  return (
    <div className="mt-1">
      <div className="mb-8 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
        </span>
        <span className="font-semibold text-green-500 text-sm">
          {durationLabel || "Live now"}
        </span>
      </div>
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{ paddingTop: "56.25%" }}
      >
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${effective.videoId}?autoplay=1&mute=1&rel=0&playsinline=1&cc_load_policy=1&color=white&controls=1`}
          title="Live stream"
        />
      </div>
    </div>
  );
}
