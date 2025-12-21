"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BentoGridProps {
	children: ReactNode;
	className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
	return (
		<div
			className={cn(
				"grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[minmax(180px,auto)]",
				className,
			)}
		>
			{children}
		</div>
	);
}
