"use client";

import { WrappedStoryView } from "@/components/wrapped/wrapped-story-view";
import type { WrappedItem } from "@/lib/wrapped-data";
import { AnimatePresence } from "framer-motion";
import { PlayCircleIcon } from "hugeicons-react";
import { useState } from "react";

interface WrappedStoryTriggerProps {
	data: WrappedItem[];
}

export function WrappedStoryTrigger({ data }: WrappedStoryTriggerProps) {
	const [showStory, setShowStory] = useState(false);

	return (
		<>
			<button
				type="button"
				onClick={() => setShowStory(true)}
				className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-3 transition-transform active:scale-95 bg-foreground text-background hover:bg-foreground/90"
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
