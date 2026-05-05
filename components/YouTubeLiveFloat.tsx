"use client";

import { motion, useDragControls } from "framer-motion";
import { GripHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SantaAvatar } from "@/components/SantaAvatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  startedAt: string | null;
  latestReplay: VideoMeta | null;
}

const MIN_W = 240;
const ASPECT = 9 / 16;
const DEFAULT_W = 480;
const PANEL_MARGIN = 16; // px gap from screen edges on mobile
const AVATAR_H = 40; // size-10
const GAP = 8;

function clampWidth(w: number) {
  if (typeof window === "undefined") return w;
  return Math.min(w, window.innerWidth - PANEL_MARGIN);
}

const SIMULATE_VIDEO_ID = "jfKfPfyJRdk";

function Embed({
  videoId,
  title,
  show,
  width,
}: {
  videoId: string;
  title: string | null;
  show: boolean;
  width: number;
}) {
  return (
    <div style={{ width, height: Math.round(width * ASPECT) }}>
      {show && (
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&playsinline=1&cc_load_policy=1&color=white&controls=1`}
          title={title ?? "YouTube video"}
        />
      )}
    </div>
  );
}

function FloatPanel({
  open,
  direction,
  children,
  width,
  onResize,
}: {
  open: boolean;
  direction: "up" | "down";
  children: (width: number) => React.ReactNode;
  width: number;
  onResize: (e: ReactPointerEvent) => void;
}) {
  const controls = useDragControls();
  const height = Math.round(width * ASPECT);
  // up: panel bottom sits GAP above avatar top (y=0)
  // down: panel top sits GAP below avatar bottom
  const initY = direction === "up" ? -(height + GAP) : AVATAR_H + GAP;

  return (
    <div
      className="absolute top-0 left-0"
      style={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.15s",
      }}
    >
      <motion.div
        className="group/panel overflow-hidden rounded-lg border bg-popover shadow-lg"
        drag
        dragControls={controls}
        dragListener={false}
        dragMomentum={false}
        initial={{ y: initY }}
        style={{ width, height }}
      >
        {/* Grip — invisible until hover */}
        <div
          className="absolute top-0 right-0 left-0 z-10 flex cursor-grab select-none items-center justify-center bg-muted/50 opacity-0 transition-opacity duration-200 active:cursor-grabbing group-hover/panel:opacity-100"
          onPointerDown={(e) => controls.start(e)}
          style={{ height: 28 }}
        >
          <GripHorizontal className="h-4 w-4 text-muted-foreground" />
        </div>

        {children(width)}

        {/* Bottom-right resize handle */}
        <div
          className="absolute right-0 bottom-0 z-10 h-4 w-4 cursor-se-resize opacity-0 transition-opacity duration-200 group-hover/panel:opacity-100"
          onPointerDown={(e) => {
            e.stopPropagation();
            onResize(e);
          }}
        />
      </motion.div>
    </div>
  );
}

export function YouTubeLiveFloat() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHome = pathname === "/";
  const simulateLive = searchParams.get("live") === "1";

  const [status, setStatus] = useState<LiveStatus>({
    isLive: false,
    videoId: null,
    title: null,
    channelName: null,
    startedAt: null,
    latestReplay: null,
  });
  const [replayOpen, setReplayOpen] = useState(false);
  const [liveOpen, setLiveOpen] = useState(simulateLive);
  const [panelWidth, setPanelWidth] = useState(() => clampWidth(DEFAULT_W));
  const [direction, setDirection] = useState<"up" | "down">(() =>
    typeof window !== "undefined" && window.innerWidth >= 1024 ? "down" : "up"
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [durationLabel, setDurationLabel] = useState("");

  const effectiveStatus: LiveStatus = simulateLive
    ? {
        isLive: true,
        videoId: SIMULATE_VIDEO_ID,
        title: "Live Stream Preview",
        channelName: null,
        startedAt: new Date(Date.now() - 47 * 60 * 1000).toISOString(),
        latestReplay: null,
      }
    : status;

  useEffect(() => {
    const startedAt = effectiveStatus.startedAt;
    if (!startedAt) return;
    const compute = () => {
      const mins = Math.floor(
        (Date.now() - new Date(startedAt).getTime()) / 60_000
      );
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      setDurationLabel(h > 0 ? `${h}h ${m}m` : `${m}m`);
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, [effectiveStatus.startedAt]);

  useEffect(() => {
    const update = () => {
      setDirection(window.innerWidth >= 1024 ? "down" : "up");
      setPanelWidth((w) => clampWidth(w));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (simulateLive) return;
    const check = async () => {
      try {
        const res = await fetch("/api/youtube/live");
        if (res.ok) {
          const data = await res.json();
          setStatus(data);
          if (isHome && window.innerWidth >= 1024) {
            if (data.isLive) setLiveOpen(true);
            else if (data.latestReplay) setReplayOpen(true);
          }
        }
      } catch {
        /* ignore */
      }
    };
    check();
    const interval = setInterval(check, 120_000);
    return () => clearInterval(interval);
  }, [isHome, simulateLive]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setReplayOpen(false);
        setLiveOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleResize = useCallback(
    (e: ReactPointerEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startW = panelWidth;
      const onMove = (ev: PointerEvent) =>
        setPanelWidth(
          Math.max(
            MIN_W,
            Math.min(
              startW + (ev.clientX - startX),
              window.innerWidth - PANEL_MARGIN
            )
          )
        );
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [panelWidth]
  );

  const wrapperCls =
    "fixed z-[9999] bottom-20 left-4 lg:bottom-auto lg:top-6 lg:left-9";
  const tooltipSide =
    direction === "down" ? ("right" as const) : ("top" as const);

  const liveDot = (
    <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500 ring-2 ring-background" />
    </span>
  );

  // Offline with replay
  if (!effectiveStatus.isLive && effectiveStatus.latestReplay) {
    return (
      <div className={wrapperCls} ref={wrapperRef}>
        <FloatPanel
          direction={direction}
          onResize={handleResize}
          open={replayOpen}
          width={panelWidth}
        >
          {(w) => (
            <Embed
              show={replayOpen}
              title={effectiveStatus.latestReplay!.title}
              videoId={effectiveStatus.latestReplay!.videoId}
              width={w}
            />
          )}
        </FloatPanel>
        <TooltipProvider delay={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                aria-label="Latest stream replay"
                className="relative block"
                onClick={() => setReplayOpen((v) => !v)}
                type="button"
              >
                <SantaAvatar className="size-10" />
              </button>
            </TooltipTrigger>
            <TooltipContent
              className="flex flex-col gap-0.5 px-2 py-1.5 text-xs"
              side={tooltipSide}
            >
              <span className="font-medium">Currently Offline</span>
              {effectiveStatus.latestReplay.title && (
                <span className="text-muted-foreground">
                  {effectiveStatus.latestReplay.title}
                </span>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  // Offline no replay — navigate home
  if (!effectiveStatus.isLive) {
    return (
      <div className={wrapperCls}>
        <TooltipProvider delay={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link aria-label="Home" href="/">
                <SantaAvatar className="size-10" />
              </Link>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs" side={tooltipSide}>
              Currently Offline
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  // Live
  return (
    <div className={wrapperCls} ref={wrapperRef}>
      <FloatPanel
        direction={direction}
        onResize={handleResize}
        open={liveOpen}
        width={panelWidth}
      >
        {(w) => (
          <Embed
            show={liveOpen}
            title={effectiveStatus.title}
            videoId={effectiveStatus.videoId!}
            width={w}
          />
        )}
      </FloatPanel>
      <TooltipProvider delay={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              aria-label="Watch live stream"
              className="relative block"
              onClick={() => setLiveOpen((v) => !v)}
              type="button"
            >
              <SantaAvatar className="size-10" />
              {liveDot}
            </button>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs" side={tooltipSide}>
            Live now on YouTube{durationLabel ? ` · ${durationLabel}` : ""}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
