"use client";

import { ExternalLink, RadioOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface VideoMeta {
  videoId: string;
  title: string | null;
  channelName: string | null;
}

interface LiveStatus {
  isLive: boolean;
  videoId: string | null;
  title: string | null;
  channelName: string | null;
  latestReplay: VideoMeta | null;
}

const CHANNEL_URL = "https://www.youtube.com/@jiaweihq";
const SCHEDULE_URL = "https://amajor.link/live";

function YTIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function EmbedPopoverContent({
  videoId,
  title,
  autoplay,
  showSchedule,
}: {
  videoId: string;
  title: string | null;
  autoplay: boolean;
}) {
  return (
    <>
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        {autoplay && (
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
            title={title ?? "YouTube video"}
          />
        )}
      </div>
    </>
  );
}

const popoverContentClass = "w-[480px] overflow-hidden !p-0";
const popoverProps = {
  align: "end" as const,
  side: "bottom" as const,
  sideOffset: 8,
};
const btnClass =
  "relative inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-foreground";

export function YouTubeLiveIndicator() {
  const [status, setStatus] = useState<LiveStatus>({
    isLive: false,
    videoId: null,
    title: null,
    channelName: null,
    latestReplay: null,
  });
  const [replayOpen, setReplayOpen] = useState(false);
  const [liveOpen, setLiveOpen] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/youtube/live");
        if (res.ok) setStatus(await res.json());
      } catch {
        // ignore
      }
    };
    check();
    const interval = setInterval(check, 120_000);
    return () => clearInterval(interval);
  }, []);

  const liveDot = (
    <span className="absolute top-1 right-1 flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
    </span>
  );

  // Offline with replay
  if (!status.isLive && status.latestReplay) {
    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <Popover onOpenChange={setReplayOpen} open={replayOpen}>
            <TooltipTrigger asChild>
              <PopoverTrigger
                aria-label="Latest YouTube video"
                className={cn(btnClass, "cursor-pointer text-muted-foreground")}
              >
                <RadioOff className="h-4 w-4" />
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent
              className="flex flex-col gap-0.5 px-2 py-1.5 text-xs"
              side="bottom"
            >
              <span className="font-medium">Currently Offline</span>
              {status.latestReplay.title && (
                <span className="text-muted-foreground">
                  {status.latestReplay.title}
                </span>
              )}
              <Link
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                href={SCHEDULE_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                view stream schedule
                <ExternalLink className="h-3 w-3" />
              </Link>
            </TooltipContent>
            <PopoverContent className={popoverContentClass} {...popoverProps}>
              <EmbedPopoverContent
                autoplay={replayOpen}
                title={status.latestReplay.title}
                videoId={status.latestReplay.videoId}
              />
            </PopoverContent>
          </Popover>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Offline without replay
  if (!status.isLive) {
    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              aria-label="YouTube channel (offline)"
              className={cn(btnClass, "text-muted-foreground")}
              href={CHANNEL_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              <RadioOff className="h-4 w-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs" side="bottom">
            currently offline · YouTube
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Live
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <Popover onOpenChange={setLiveOpen} open={liveOpen}>
          <TooltipTrigger asChild>
            <PopoverTrigger
              aria-label="Watching live on YouTube"
              className={cn(btnClass, "cursor-pointer text-red-500")}
            >
              <YTIcon className="h-4 w-4" />
              {liveDot}
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs" side="bottom">
            Live now · YouTube
          </TooltipContent>
          <PopoverContent className={popoverContentClass} {...popoverProps}>
            <EmbedPopoverContent
              autoplay={liveOpen}
              title={status.title}
              videoId={status.videoId!}
            />
          </PopoverContent>
        </Popover>
      </Tooltip>
    </TooltipProvider>
  );
}
