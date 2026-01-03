"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark02Icon as Book,
  BookOpen02Icon as GalleryHorizontalEnd,
  FavouriteIcon as Heart,
  Search01Icon as Search,
  UserIcon as User,
} from "hugeicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { SantaAvatar } from "@/components/SantaAvatar";
import { WrappedBanner } from "@/components/wrapped/wrapped-banner";
import { WrappedGiftIcon } from "@/components/wrapped/wrapped-gift-icon";
import { WrappedPageBorder } from "@/components/wrapped/wrapped-page-border";
import { cn } from "@/lib/utils";

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

    { href: "/books", icon: GalleryHorizontalEnd, label: "Books" },
    { href: "/setup", icon: Heart, label: "Setup" },
  ];

  return (
    <>
      <Link
        className="group fixed top-6 left-9 z-[200] hidden lg:block"
        href="/"
      >
        <SantaAvatar className="size-10" />
      </Link>

      <div className="fixed top-6 left-1/2 z-[100] w-[calc(100%-2rem)] -translate-x-1/2 md:w-auto">
        <WrappedBanner onHoverChange={setIsBannerHovered} />
      </div>

      <AnimatePresence>
        {(isBannerHovered || pathname === "/wrapped") && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              pointerEvents: "none",
            }}
            transition={{ duration: 0.5 }}
          >
            <WrappedPageBorder />
          </motion.div>
        )}
      </AnimatePresence>

      <header className="fixed top-1/2 left-6 z-[100] hidden -translate-y-1/2 lg:block">
        <nav
          className="flex flex-col items-start gap-8 rounded-3xl bg-transparent p-2 transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {items.map((item) => (
            <Link
              className={cn(
                "group flex items-center gap-3 rounded-full px-3 py-2 transition-all duration-300",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              href={item.href as any}
              key={item.href}
            >
              <item.icon className="size-5 shrink-0" strokeWidth={3} />
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    animate={{ opacity: 1, width: "auto" }}
                    className="overflow-hidden whitespace-nowrap font-medium text-sm"
                    exit={{ opacity: 0, width: 0 }}
                    initial={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    {item.label === "2025 Wrapped!" ? (
                      <motion.span
                        animate={{
                          backgroundPosition: ["0% center", "200% center"],
                        }}
                        style={{
                          backgroundImage:
                            "linear-gradient(120deg, rgb(59, 130, 246) 0%, rgb(168, 85, 247) 25%, rgb(239, 68, 68) 50%, rgb(249, 115, 22) 75%, rgb(59, 130, 246) 100%)",
                          backgroundSize: "200% auto",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                        }}
                        transition={{
                          duration: 4,
                          ease: "linear",
                          repeat: Number.POSITIVE_INFINITY,
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
