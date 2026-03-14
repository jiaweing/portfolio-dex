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
  const isWidePage =
    pathname?.startsWith("/projects") || pathname === "/wrapped";
  const isFullWidthPage = pathname?.startsWith("/setup");

  return (
    <div
      className={cn(
        "relative mx-auto px-6 py-6 pb-20",
        isFullWidthPage ? "max-w-none" : isWidePage ? "max-w-7xl" : "max-w-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}
