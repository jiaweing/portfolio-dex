"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface LiveStatus {
  isLive: boolean;
  videoId: string | null;
  title: string | null;
  channelName: string | null;
}

const CHANNEL_URL = "https://www.youtube.com/@jiaweihq";

interface Props {
  isHovered: boolean;
}

export function YouTubeLiveBadge({ isHovered }: Props) {
  const [status, setStatus] = useState<LiveStatus>({
    isLive: false,
    videoId: null,
    title: null,
    channelName: null,
  });

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

  const dot = status.isLive ? (
    <span className="absolute -right-0.5 -bottom-0.5 flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
    </span>
  ) : (
    <span className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full bg-muted-foreground/30" />
  );

  const iconWithDot = (
    <span className="relative shrink-0">
      <svg
        aria-hidden="true"
        className="size-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
      {dot}
    </span>
  );

  const label = (
    <AnimatePresence>
      {isHovered && (
        <motion.span
          animate={{ opacity: 1, width: "auto" }}
          className="overflow-hidden whitespace-nowrap font-medium text-sm"
          exit={{ opacity: 0, width: 0 }}
          initial={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {status.isLive ? "Live Now" : "YouTube"}
        </motion.span>
      )}
    </AnimatePresence>
  );

  const baseClass = cn(
    "flex items-center gap-3 rounded-full px-3 py-2 transition-all duration-300",
    status.isLive
      ? "text-red-500 hover:text-red-400"
      : "text-muted-foreground hover:text-foreground"
  );

  if (!status.isLive) {
    return (
      <Link
        className={baseClass}
        href={CHANNEL_URL}
        rel="noopener noreferrer"
        target="_blank"
      >
        {iconWithDot}
        {label}
      </Link>
    );
  }

  return (
    <Popover>
      <PopoverTrigger className={cn(baseClass, "cursor-pointer")}>
        {iconWithDot}
        {label}
      </PopoverTrigger>
      <PopoverContent
        className="!p-0 w-80 overflow-hidden"
        side="right"
        sideOffset={16}
      >
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${status.videoId}?autoplay=0`}
            title={status.title ?? "Live stream"}
          />
        </div>
        <div className="p-3">
          {status.title && (
            <p className="line-clamp-2 font-medium text-sm">{status.title}</p>
          )}
          <Link
            className="mt-1 flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
            href={`https://www.youtube.com/watch?v=${status.videoId}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            open in YouTube
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
