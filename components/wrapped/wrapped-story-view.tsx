"use client";

import { cn } from "@/lib/utils";
import type { IconName, WrappedItem } from "@/lib/wrapped-data";
import { AnimatePresence, motion } from "framer-motion";
import {
	Airplane01Icon,
	Award01Icon,
	BankIcon,
	Bicycle01Icon,
	Book01Icon,
	Briefcase01Icon,
	Building02Icon,
	BulbIcon,
	Car01Icon,
	CodeIcon,
	ConferenceIcon,
	CpuIcon,
	DentalToothIcon,
	EarthIcon,
	EiffelTowerIcon,
	EuroIcon,
	FavouriteIcon,
	File01Icon,
	GitBranchIcon,
	GitCommitIcon,
	GithubIcon,
	Globe02Icon,
	HappyIcon,
	LaurelWreathFirst02Icon,
	LocationUser03Icon,
	Mail01Icon,
	MailAtSign01Icon,
	MapsCircle01Icon,
	Mic01Icon,
	News01Icon,
	Notion02Icon,
	Rocket01Icon,
	Search01Icon,
	ShoppingBag01Icon,
	SkullIcon,
	SparklesIcon,
	SpotifyIcon,
	StarIcon,
	ThreadsIcon,
	TShirtIcon,
	UserGroupIcon,
	YoutubeIcon,
} from "hugeicons-react";
import { Ghost, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const iconMap: Record<IconName, any> = {
	Airplane01Icon,
	Award01Icon,
	BankIcon,
	Bicycle01Icon,
	Book01Icon,
	Briefcase01Icon,
	Building02Icon,
	BulbIcon,
	Car01Icon,
	CodeIcon,
	Search01Icon,
	ConferenceIcon,
	CpuIcon,
	DentalToothIcon,
	EarthIcon,
	EiffelTowerIcon,
	EuroIcon,
	FavouriteIcon,
	File01Icon,
	GitBranchIcon,
	GitCommitIcon,
	GithubIcon,
	Globe02Icon,
	HappyIcon,
	LaurelWreathFirst02Icon,
	Mail01Icon,
	MailAtSign01Icon,
	MapsCircle01Icon,
	Mic01Icon,
	News01Icon,
	Notion02Icon,
	Rocket01Icon,
	Ghost,
	ShoppingBag01Icon,
	SkullIcon,
	SparklesIcon,
	SpotifyIcon,
	StarIcon,
	ThreadsIcon,
	TShirtIcon,
	LocationUser03Icon,
	UserGroupIcon,
	YoutubeIcon,
};

const categoryDefaultIcons: Record<string, any> = {
	milestones: Award01Icon,
	builds: BulbIcon,
	travel: Globe02Icon,
	life: FavouriteIcon,
	social: UserGroupIcon,
};

const DURATION_PER_SLIDE = 5000; // 5 seconds

interface WrappedStoryViewProps {
	data: WrappedItem[];
	onClose: () => void;
	startIndex?: number;
}

export function WrappedStoryView({
	data,
	onClose,
	startIndex = 0,
}: WrappedStoryViewProps) {
	const [currentIndex, setCurrentIndex] = useState(startIndex);
	const [isPaused, setIsPaused] = useState(false);

	const handleNext = useCallback(() => {
		if (currentIndex < data.length - 1) {
			setCurrentIndex((prev) => prev + 1);
		} else {
			onClose();
		}
	}, [currentIndex, data.length, onClose]);

	const handlePrev = useCallback(() => {
		if (currentIndex > 0) {
			setCurrentIndex((prev) => prev - 1);
		}
	}, [currentIndex]);

	// Auto-advance
	useEffect(() => {
		if (isPaused) return;
		const timer = setTimeout(handleNext, DURATION_PER_SLIDE);
		return () => clearTimeout(timer);
	}, [currentIndex, isPaused, handleNext]);

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowRight") handleNext();
			if (e.key === "ArrowLeft") handlePrev();
			if (e.key === " ") setIsPaused((prev) => !prev);
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [handleNext, handlePrev, onClose]);

	const currentItem = data[currentIndex];

	const Icon =
		(currentItem.iconName
			? iconMap[currentItem.iconName]
			: categoryDefaultIcons[currentItem.category]) || StarIcon;

	// Dynamic color classes (copied from BentoCard logic)
	const getThemeClasses = (color: string) => {
		const map: Record<
			string,
			{ bg: string; text: string; subtext: string; progress: string }
		> = {
			amber: {
				bg: "bg-amber-950",
				text: "text-amber-100",
				subtext: "text-amber-200/60",
				progress: "bg-amber-500",
			},
			rose: {
				bg: "bg-rose-950",
				text: "text-rose-100",
				subtext: "text-rose-200/60",
				progress: "bg-rose-500",
			},
			purple: {
				bg: "bg-purple-950",
				text: "text-purple-100",
				subtext: "text-purple-200/60",
				progress: "bg-purple-500",
			},
			orange: {
				bg: "bg-orange-950",
				text: "text-orange-100",
				subtext: "text-orange-200/60",
				progress: "bg-orange-500",
			},
			indigo: {
				bg: "bg-indigo-950",
				text: "text-indigo-100",
				subtext: "text-indigo-200/60",
				progress: "bg-indigo-500",
			},
			sky: {
				bg: "bg-sky-950",
				text: "text-sky-100",
				subtext: "text-sky-200/60",
				progress: "bg-sky-500",
			},
			emerald: {
				bg: "bg-emerald-950",
				text: "text-emerald-100",
				subtext: "text-emerald-200/60",
				progress: "bg-emerald-500",
			},
			slate: {
				bg: "bg-slate-950",
				text: "text-slate-100",
				subtext: "text-slate-200/60",
				progress: "bg-slate-500",
			},
			yellow: {
				bg: "bg-yellow-950",
				text: "text-yellow-100",
				subtext: "text-yellow-200/60",
				progress: "bg-yellow-500",
			},
			zinc: {
				bg: "bg-zinc-950",
				text: "text-zinc-100",
				subtext: "text-zinc-200/60",
				progress: "bg-zinc-500",
			},
			blue: {
				bg: "bg-blue-950",
				text: "text-blue-100",
				subtext: "text-blue-200/60",
				progress: "bg-blue-500",
			},
			teal: {
				bg: "bg-teal-950",
				text: "text-teal-100",
				subtext: "text-teal-200/60",
				progress: "bg-teal-500",
			},
			red: {
				bg: "bg-red-950",
				text: "text-red-100",
				subtext: "text-red-200/60",
				progress: "bg-red-500",
			},
			stone: {
				bg: "bg-stone-950",
				text: "text-stone-100",
				subtext: "text-stone-200/60",
				progress: "bg-stone-500",
			},
			cyan: {
				bg: "bg-cyan-950",
				text: "text-cyan-100",
				subtext: "text-cyan-200/60",
				progress: "bg-cyan-500",
			},
			pink: {
				bg: "bg-pink-950",
				text: "text-pink-100",
				subtext: "text-pink-200/60",
				progress: "bg-pink-500",
			},
			lime: {
				bg: "bg-lime-950",
				text: "text-lime-100",
				subtext: "text-lime-200/60",
				progress: "bg-lime-500",
			},
			violet: {
				bg: "bg-violet-950",
				text: "text-violet-100",
				subtext: "text-violet-200/60",
				progress: "bg-violet-500",
			},
		};
		return map[color] || map.zinc;
	};

	const theme = getThemeClasses(currentItem.color || "zinc");

	const hasImage = !!currentItem.backgroundImage;

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-[999] flex items-center justify-center bg-black"
		>
			<div className="relative h-full w-full md:max-h-[90vh] md:max-w-xl md:overflow-hidden md:rounded-3xl bg-black">
				{/* Background Image / Color */}
				<div
					className={cn(
						"absolute inset-0 transition-colors duration-700",
						theme.bg,
					)}
				>
					{currentItem.backgroundImage ? (
						<>
							<motion.img
								key={currentItem.backgroundImage}
								initial={{ scale: 1.1, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ duration: 0.7 }}
								src={currentItem.backgroundImage}
								alt="Background"
								className="h-full w-full object-cover opacity-60"
								style={{
									objectPosition: currentItem.backgroundPosition || "center",
								}}
							/>
							<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
						</>
					) : (
						<div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/60" />
					)}
				</div>

				{/* Progress Bars */}
				<div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-3 pt-6 md:pt-4">
					{data.map((_, index) => (
						<div
							key={index}
							className="h-1 flex-1 overflow-hidden rounded-full bg-white/20"
						>
							{index === currentIndex ? (
								<motion.div
									key="active"
									className="h-full bg-white"
									initial={{ width: "0%" }}
									animate={{ width: "100%" }}
									transition={{
										duration: DURATION_PER_SLIDE / 1000,
										ease: "linear",
									}}
								/>
							) : (
								<div
									className={cn(
										"h-full bg-white",
										index < currentIndex ? "w-full" : "w-0",
									)}
								/>
							)}
						</div>
					))}
				</div>

				{/* Header */}
				<div className="absolute top-10 left-0 right-0 z-20 flex items-center justify-between px-4 pt-4 md:pt-0">
					<div className="flex items-center gap-2">
						<div
							className={cn("rounded-full p-1 bg-white/10 backdrop-blur-md")}
						>
							<Icon className="h-6 w-6 text-white p-1" />
						</div>
						<span
							className={cn(
								"font-semibold text-white text-sm tracking-wider opacity-90",
								hasImage && "drop-shadow-md",
							)}
						>
							{currentItem.category.charAt(0).toUpperCase() +
								currentItem.category.slice(1)}
						</span>
					</div>
					<button
						type="button"
						onClick={onClose}
						className="rounded-full bg-black/20 p-2 text-white hover:bg-black/40 backdrop-blur-md"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				{/* Content */}
				<div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center">
					<AnimatePresence mode="wait">
						<motion.div
							key={currentIndex}
							initial={{ opacity: 0, y: 20, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -20, scale: 0.95 }}
							transition={{ duration: 0.4 }}
							className="space-y-6 flex flex-col items-center"
						>
							<motion.div
								initial={{ scale: 0, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								transition={{ delay: 0.1, type: "spring" }}
							>
								<Icon
									className={cn(
										"h-12 w-12 text-white",
										hasImage && "drop-shadow-xl",
									)}
								/>
							</motion.div>

							{currentItem.stat && (
								<motion.div
									initial={{ scale: 0.5, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									transition={{ delay: 0.2, type: "spring" }}
									className={cn(
										"text-7xl font-bold tracking-tighter text-white",
										hasImage ? "drop-shadow-2xl" : "drop-shadow-xl",
										// If it's a very long stat, shrink it slightly
										currentItem.stat.length > 5 && "text-5xl",
									)}
								>
									{currentItem.stat}
								</motion.div>
							)}

							<h2
								className={cn(
									"text-3xl font-bold leading-tight text-white",
									hasImage ? "drop-shadow-xl" : "drop-shadow-md",
									!currentItem.stat && "text-4xl",
								)}
							>
								{currentItem.title}
							</h2>

							{currentItem.description && (
								<p
									className={cn(
										"text-xl text-white/90",
										hasImage ? "drop-shadow-lg" : "drop-shadow-md",
									)}
								>
									{currentItem.description}
								</p>
							)}
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Navigation Overlay */}
				<div className="absolute inset-0 z-10 flex">
					<div
						className="h-full w-1/3"
						onClick={handlePrev}
						onMouseDown={() => setIsPaused(true)}
						onMouseUp={() => setIsPaused(false)}
						onTouchStart={() => setIsPaused(true)}
						onTouchEnd={() => setIsPaused(false)}
					/>
					<div
						className="h-full w-2/3"
						onClick={handleNext}
						onMouseDown={() => setIsPaused(true)}
						onMouseUp={() => setIsPaused(false)}
						onTouchStart={() => setIsPaused(true)}
						onTouchEnd={() => setIsPaused(false)}
					/>
				</div>

				{/* Bottom Footer / Branding */}
				<div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center">
					<span className="text-white/40 text-xs uppercase tracking-widest font-mono">
						2025 Wrapped · Jia Wei Ng
					</span>
				</div>
			</div>
		</motion.div>
	);
}
