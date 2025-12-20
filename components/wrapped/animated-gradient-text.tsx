"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AnimatedGradientTextProps {
	children: React.ReactNode;
	className?: string;
}

export function AnimatedGradientText({
	children,
	className,
}: AnimatedGradientTextProps) {
	return (
		<motion.span
			className={cn("inline-block text-transparent bg-clip-text", className)}
			style={{
				backgroundImage:
					"linear-gradient(120deg, rgb(59, 130, 246) 0%, rgb(168, 85, 247) 25%, rgb(239, 68, 68) 50%, rgb(249, 115, 22) 75%, rgb(59, 130, 246) 100%)",
				backgroundSize: "200% auto",
				backgroundClip: "text",
				WebkitBackgroundClip: "text",
				color: "transparent",
			}}
			animate={{
				backgroundPosition: ["0% center", "200% center"],
			}}
			transition={{
				duration: 4,
				ease: "linear",
				repeat: Infinity,
			}}
		>
			{children}
		</motion.span>
	);
}
