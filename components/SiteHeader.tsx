"use client";

import { SantaAvatar } from "@/components/SantaAvatar";
import { WrappedBanner } from "@/components/wrapped/wrapped-banner";
import { WrappedGiftIcon } from "@/components/wrapped/wrapped-gift-icon";
import { WrappedPageBorder } from "@/components/wrapped/wrapped-page-border";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark02Icon as Book,
  BookOpen02Icon as GalleryHorizontalEnd,
  Globe02Icon as Globe,
  FavouriteIcon as Heart,
  Search01Icon as Search,
  UserIcon as User,
} from "hugeicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export function SiteHeader() {
	const pathname = usePathname();
	const [isHovered, setIsHovered] = React.useState(false);
	const [isBannerHovered, setIsBannerHovered] = React.useState(false);

	const isActive = (path: string) =>
		path === "/" ? pathname === "/" : pathname.startsWith(path);

	const items = [
		{ href: "/wrapped", icon: WrappedGiftIcon, label: "2025 Wrapped!" },
		{ href: "/about", icon: User, label: "About" },
		{ href: "/blog", icon: Book, label: "Blog" },
		{ href: "/projects", icon: Search, label: "Projects" },
		{ href: "/oss", icon: Globe, label: "Open Source" },
		{ href: "/books", icon: GalleryHorizontalEnd, label: "Books" },
		{ href: "/setup", icon: Heart, label: "Setup" },
	];

	return (
		<>
			<Link
				href="/"
				className="fixed left-9 top-6 z-[200] hidden lg:block group"
			>
				<SantaAvatar className="size-10" />
			</Link>

			<div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden md:block">
				<WrappedBanner onHoverChange={setIsBannerHovered} />
			</div>

			<AnimatePresence>
				{(isBannerHovered || pathname === "/wrapped") && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						style={{
							position: "fixed",
							inset: 0,
							zIndex: 50,
							pointerEvents: "none",
						}}
					>
						<WrappedPageBorder />
					</motion.div>
				)}
			</AnimatePresence>

			<header className="fixed left-6 top-1/2 z-[100] hidden -translate-y-1/2 lg:block">
				<nav
					className="flex flex-col items-start gap-8 rounded-3xl bg-transparent p-2 transition-all duration-300"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{items.map((item) => (
						<Link
							key={item.href}
							href={item.href as any}
							className={cn(
								"group flex items-center gap-3 rounded-full px-3 py-2 transition-all duration-300",
								isActive(item.href)
									? "text-foreground"
									: "text-muted-foreground hover:text-foreground",
							)}
						>
							<item.icon className="size-5 shrink-0" strokeWidth={3} />
							<AnimatePresence>
								{isHovered && (
									<motion.span
										initial={{ opacity: 0, width: 0 }}
										animate={{ opacity: 1, width: "auto" }}
										exit={{ opacity: 0, width: 0 }}
										transition={{ duration: 0.2, ease: "easeInOut" }}
										className="whitespace-nowrap text-sm font-medium overflow-hidden"
									>
										{item.label === "2025 Wrapped!" ? (
											<motion.span
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
												{item.label}
											</motion.span>
										) : (
											item.label
										)}
									</motion.span>
								)}
							</AnimatePresence>
						</Link>
					))}
				</nav>
			</header>
		</>
	);
}
