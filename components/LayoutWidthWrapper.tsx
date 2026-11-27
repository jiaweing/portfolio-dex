"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function LayoutWidthWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const isWidePage = pathname?.startsWith("/projects") || pathname === "/2025";
  const isFullWidthPage =
    pathname?.startsWith("/setup") || pathname === "/analytics";

  // The 2026 Wrapped is a full-bleed update page with its own backdrop
  const isBleedPage = pathname === "/2026";

  return (
    <div
      className={cn(
        "relative mx-auto",
        isBleedPage ? "pt-6" : "py-6 pb-20",
        isFullWidthPage || isBleedPage
          ? "max-w-none"
          : isWidePage
            ? "max-w-7xl px-6"
            : "max-w-2xl px-6",
        className
      )}
    >
      {children}
    </div>
  );
}
