"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { NAV_ITEMS } from "@/components/nav-items";
import { cn } from "@/lib/utils";

// Original hover-to-expand icon rail. Kept around as an alternative to the wheel.
export function ClassicSidebarNav() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = React.useState(false);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="fixed top-1/2 left-6 z-[100] hidden -translate-y-1/2 lg:block">
      <nav
        className="flex flex-col items-start gap-8 rounded-3xl bg-transparent p-2 transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {NAV_ITEMS.map((item) => (
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
  );
}
