"use client";

import { cn } from "@/lib/utils";
import type { IconName, WrappedItem } from "@/lib/wrapped-data";
import { motion } from "framer-motion";
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
import { Ghost, Plus } from "lucide-react";
import Link from "next/link";
import {
    Credenza,
    CredenzaContent,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from "../ui/credenza";

interface BentoCardProps {
	item: WrappedItem;
	className?: string;
	index: number;
}

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

// Added categoryDefaultIcons
const categoryDefaultIcons: Record<string, any> = {
	milestone: Award01Icon,
	creation: BulbIcon,
	travel: Globe02Icon,
	personal: FavouriteIcon,
	social: UserGroupIcon,
};

const MotionLink = motion(Link);

export function BentoCard({ item, className, index }: BentoCardProps) {
	const Icon =
		(item.iconName
			? iconMap[item.iconName]
			: categoryDefaultIcons[item.category]) || StarIcon;
	const color = item.color || "zinc";

	// Dynamic color classes based on the item's color prop
	const getThemeClasses = (color: string) => {
		// This is a comprehensive map to ensure Tailwind picks up these classes.
		const map: Record<
			string,
			{ card: string; icon: string; text: string; subtext: string }
		> = {
			amber: {
				card: "bg-amber-50/50 dark:bg-amber-900/10 hover:bg-amber-100/50 dark:hover:bg-amber-900/20",
				icon: "bg-amber-100 dark:bg-amber-800",
				text: "text-amber-900 dark:text-amber-100",
				subtext: "text-amber-700/80 dark:text-amber-200/60",
			},
			rose: {
				card: "bg-rose-50/50 dark:bg-rose-900/10 hover:bg-rose-100/50 dark:hover:bg-rose-900/20",
				icon: "bg-rose-100 dark:bg-rose-800",
				text: "text-rose-900 dark:text-rose-100",
				subtext: "text-rose-700/80 dark:text-rose-200/60",
			},
			purple: {
				card: "bg-purple-50/50 dark:bg-purple-900/10 hover:bg-purple-100/50 dark:hover:bg-purple-900/20",
				icon: "bg-purple-100 dark:bg-purple-800",
				text: "text-purple-900 dark:text-purple-100",
				subtext: "text-purple-700/80 dark:text-purple-200/60",
			},
			orange: {
				card: "bg-orange-50/50 dark:bg-orange-900/10 hover:bg-orange-100/50 dark:hover:bg-orange-900/20",
				icon: "bg-orange-100 dark:bg-orange-800",
				text: "text-orange-900 dark:text-orange-100",
				subtext: "text-orange-700/80 dark:text-orange-200/60",
			},
			indigo: {
				card: "bg-indigo-50/50 dark:bg-indigo-900/10 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/20",
				icon: "bg-indigo-100 dark:bg-indigo-800",
				text: "text-indigo-900 dark:text-indigo-100",
				subtext: "text-indigo-700/80 dark:text-indigo-200/60",
			},
			sky: {
				card: "bg-sky-50/50 dark:bg-sky-900/10 hover:bg-sky-100/50 dark:hover:bg-sky-900/20",
				icon: "bg-sky-100 dark:bg-sky-800",
				text: "text-sky-900 dark:text-sky-100",
				subtext: "text-sky-700/80 dark:text-sky-200/60",
			},
			emerald: {
				card: "bg-emerald-50/50 dark:bg-emerald-900/10 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/20",
				icon: "bg-emerald-100 dark:bg-emerald-800",
				text: "text-emerald-900 dark:text-emerald-100",
				subtext: "text-emerald-700/80 dark:text-emerald-200/60",
			},
			slate: {
				card: "bg-slate-50/50 dark:bg-slate-900/10 hover:bg-slate-100/50 dark:hover:bg-slate-900/20",
				icon: "bg-slate-100 dark:bg-slate-800",
				text: "text-slate-900 dark:text-slate-100",
				subtext: "text-slate-700/80 dark:text-slate-200/60",
			},
			yellow: {
				card: "bg-yellow-50/50 dark:bg-yellow-900/10 hover:bg-yellow-100/50 dark:hover:bg-yellow-900/20",
				icon: "bg-yellow-100 dark:bg-yellow-800",
				text: "text-yellow-900 dark:text-yellow-100",
				subtext: "text-yellow-700/80 dark:text-yellow-200/60",
			},
			zinc: {
				card: "bg-zinc-50/50 dark:bg-zinc-900/10 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/20",
				icon: "bg-zinc-100 dark:bg-zinc-800",
				text: "text-zinc-900 dark:text-zinc-100",
				subtext: "text-zinc-700/80 dark:text-zinc-200/60",
			},
			blue: {
				card: "bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-100/50 dark:hover:bg-blue-900/20",
				icon: "bg-blue-100 dark:bg-blue-800",
				text: "text-blue-900 dark:text-blue-100",
				subtext: "text-blue-700/80 dark:text-blue-200/60",
			},
			teal: {
				card: "bg-teal-50/50 dark:bg-teal-900/10 hover:bg-teal-100/50 dark:hover:bg-teal-900/20",
				icon: "bg-teal-100 dark:bg-teal-800",
				text: "text-teal-900 dark:text-teal-100",
				subtext: "text-teal-700/80 dark:text-teal-200/60",
			},
			red: {
				card: "bg-red-50/50 dark:bg-red-900/10 hover:bg-red-100/50 dark:hover:bg-red-900/20",
				icon: "bg-red-100 dark:bg-red-800",
				text: "text-red-900 dark:text-red-100",
				subtext: "text-red-700/80 dark:text-red-200/60",
			},
			stone: {
				card: "bg-stone-50/50 dark:bg-stone-900/10 hover:bg-stone-100/50 dark:hover:bg-stone-900/20",
				icon: "bg-stone-100 dark:bg-stone-800",
				text: "text-stone-900 dark:text-stone-100",
				subtext: "text-stone-700/80 dark:text-stone-200/60",
			},
			cyan: {
				card: "bg-cyan-50/50 dark:bg-cyan-900/10 hover:bg-cyan-100/50 dark:hover:bg-cyan-900/20",
				icon: "bg-cyan-100 dark:bg-cyan-800",
				text: "text-cyan-900 dark:text-cyan-100",
				subtext: "text-cyan-700/80 dark:text-cyan-200/60",
			},
			pink: {
				card: "bg-pink-50/50 dark:bg-pink-900/10 hover:bg-pink-100/50 dark:hover:bg-pink-900/20",
				icon: "bg-pink-100 dark:bg-pink-800",
				text: "text-pink-900 dark:text-pink-100",
				subtext: "text-pink-700/80 dark:text-pink-200/60",
			},
			lime: {
				card: "bg-lime-50/50 dark:bg-lime-900/10 hover:bg-lime-100/50 dark:hover:bg-lime-900/20",
				icon: "bg-lime-100 dark:bg-lime-800",
				text: "text-lime-900 dark:text-lime-100",
				subtext: "text-lime-700/80 dark:text-lime-200/60",
			},
			violet: {
				card: "bg-violet-50/50 dark:bg-violet-900/10 hover:bg-violet-100/50 dark:hover:bg-violet-900/20",
				icon: "bg-violet-100 dark:bg-violet-800",
				text: "text-violet-900 dark:text-violet-100",
				subtext: "text-violet-700/80 dark:text-violet-200/60",
			},
		};
		return map[color] || map.zinc;
	};

	const styles = getThemeClasses(color);

	const CardContent = (
		<div className="relative z-10 flex items-start justify-between">
			<div className="p-2">
				<Icon
					className={cn(
						"h-6 w-6",
						styles.text,
						item.backgroundImage && "text-white",
					)}
				/>
			</div>
			{item.stat && (
				<span
					className={cn(
						"font-mono font-bold tracking-tighter opacity-20 group-hover:opacity-100 transition-opacity duration-300",
						item.className?.includes("row-span-2") ? "text-5xl" : "text-4xl",
						styles.text,
						item.backgroundImage &&
							"text-white/80 opacity-50 group-hover:opacity-100",
					)}
				>
					{item.stat}
				</span>
			)}
		</div>
	);

	const CardBody = (
		<>
			{item.backgroundImage && (
				<div className="absolute inset-0 z-0">
					<img
						src={item.backgroundImage}
						alt={item.title}
						className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
						style={{ objectPosition: item.backgroundPosition || "center" }}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
				</div>
			)}

			{CardContent}

			<div className="relative z-10 mt-4">
				<h3
					className={cn(
						"text-xl font-semibold leading-tight",
						styles.text,
						item.backgroundImage && "text-white",
					)}
				>
					{item.title}
				</h3>
				{item.description && (
					<p
						className={cn(
							"mt-2 text-sm",
							styles.subtext,
							item.backgroundImage && "text-neutral-200/90",
						)}
					>
						{item.description}
					</p>
				)}
			</div>

			{/* Decorative gradient blob */}
			<div
				className={cn(
					"absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150 opacity-20",
					item.color ? `bg-${item.color}-500` : "bg-zinc-500",
				)}
			/>
		</>
	);

	const containerClasses = cn(
		"group relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 transition-colors duration-300 border-none ring-0 shadow-none text-left",
		styles.card,
		item.className,
		className,
	);

	if (item.detailList) {
		return (
			<Credenza>
				<CredenzaTrigger asChild>
					<motion.button
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: index * 0.05 }}
						className={containerClasses}
					>
						{CardBody}
					</motion.button>
				</CredenzaTrigger>
				<CredenzaContent className="sm:max-w-md max-h-[80vh] flex flex-col">
					<CredenzaHeader>
						<CredenzaTitle>{item.title}</CredenzaTitle>
					</CredenzaHeader>
					<div className="flex-1 overflow-y-auto min-h-0 pr-4 -mr-4">
						<div className="grid grid-cols-2 gap-2 mt-4">
							{item.detailList.map((detail, i) => (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: List is static
									key={i}
									className="flex items-center gap-2 rounded-lg bg-secondary/50 p-2 text-sm"
								>
									<Plus className="h-4 w-4 text-muted-foreground" />
									{detail}
								</div>
							))}
						</div>
					</div>
				</CredenzaContent>
			</Credenza>
		);
	}

	return (
		<MotionLink
			href={item.href || "#"}
			target="_blank"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: index * 0.05 }}
			className={containerClasses}
		>
			{CardBody}
		</MotionLink>
	);
}
