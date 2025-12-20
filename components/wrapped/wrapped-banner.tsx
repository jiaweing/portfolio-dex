"use client";

import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function WrappedBanner({
	onHoverChange,
}: {
	onHoverChange?: (isHovered: boolean) => void;
}) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Check if the banner has been dismissed previously
		const isDismissed = localStorage.getItem("wrapped-banner-dismissed-2025");
		if (!isDismissed) {
			setIsVisible(true);
		}
	}, []);

	const handleDismiss = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsVisible(false);
		localStorage.setItem("wrapped-banner-dismissed-2025", "true");
	};

	if (!isVisible) return null;

	const gradientStyle = {
		background:
			"linear-gradient(174.024deg, rgb(59, 130, 246), rgb(168, 85, 247), rgb(239, 68, 68), rgb(249, 115, 22))",
	};

	return (
		<AnimatePresence>
			<motion.div
				initial={{ height: 0, opacity: 0 }}
				animate={{ height: "auto", opacity: 1 }}
				exit={{ height: 0, opacity: 0 }}
				className="relative overflow-hidden"
			>
				<Link
					href="/wrapped"
					className="group relative block w-fit rounded-xl"
				>
					{/* Border Container */}
					<div className="relative overflow-hidden rounded-xl">

						<div 
							className="relative flex items-center justify-center gap-2 rounded-xl px-4 py-3 pr-10 text-sm font-medium transition-colors"
							onMouseEnter={() => onHoverChange?.(true)}
							onMouseLeave={() => onHoverChange?.(false)}
						>
                            {/* Icon Shimmer Gradient Definition */}
                            <svg className="absolute w-0 h-0">
                                <defs>
                                    <linearGradient id="icon-shimmer" x1="0" y1="0" x2="1" y2="0" spreadMethod="repeat">
                                        <stop offset="0" stopColor="rgb(59, 130, 246)" />
                                        <stop offset="0.25" stopColor="rgb(168, 85, 247)" />
                                        <stop offset="0.5" stopColor="rgb(239, 68, 68)" />
                                        <stop offset="0.75" stopColor="rgb(249, 115, 22)" />
                                        <stop offset="1" stopColor="rgb(59, 130, 246)" />
                                        <animateTransform
                                            attributeName="gradientTransform"
                                            type="translate"
                                            from="-1 0"
                                            to="0 0"
                                            dur="4s"
                                            repeatCount="indefinite"
                                        />
                                    </linearGradient>
                                </defs>
                            </svg>
                            
							<span className="text-zinc-600 dark:text-zinc-400">
								My
							</span>
							<motion.div
								className="font-semibold"
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
								<span>2025 Wrapped</span>
							</motion.div>
							<span className="text-zinc-600 dark:text-zinc-400">
								 is here! Happy holidays!
							</span>
						</div>

						{/* Dismiss Button */}
						<button
							type="button"
							onClick={handleDismiss}
							className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors z-20"
							aria-label="Dismiss banner"
						>
							<XIcon className="h-4 w-4" />
						</button>
					</div>
				</Link>
			</motion.div>
		</AnimatePresence>
	);
}
