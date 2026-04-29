"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  className?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export function ScrollProgress({
  className,
  containerRef,
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = containerRef?.current ?? document.documentElement;

    const update = () => {
      const scrollTop = containerRef?.current
        ? containerRef.current.scrollTop
        : window.scrollY;
      const scrollHeight = target.scrollHeight - target.clientHeight;
      setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    };

    const el = containerRef?.current ?? window;
    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => el.removeEventListener("scroll", update);
  }, [containerRef]);

  return (
    <div
      className={cn("h-0.5 origin-left transition-transform", className)}
      style={{ transform: `scaleX(${progress})` }}
    />
  );
}
