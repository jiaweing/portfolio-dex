"use client";

import { AnimatePresence } from "framer-motion";
import { PlayCircleIcon } from "hugeicons-react";
import { useState } from "react";
import { WrappedStoryView } from "@/components/wrapped/wrapped-story-view";
import type { WrappedItem } from "@/lib/wrapped-data";

interface WrappedStoryTriggerProps {
  data: WrappedItem[];
}

export function WrappedStoryTrigger({ data }: WrappedStoryTriggerProps) {
  const [showStory, setShowStory] = useState(false);

  return (
    <>
      <button
        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-8 py-3 text-background transition-transform hover:bg-foreground/90 active:scale-95"
        onClick={() => setShowStory(true)}
        type="button"
      >
        <PlayCircleIcon className="relative z-10 h-5 w-5" />
        <span className="relative z-10 font-medium">Watch Story</span>
      </button>

      <AnimatePresence>
        {showStory && (
          <WrappedStoryView data={data} onClose={() => setShowStory(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
