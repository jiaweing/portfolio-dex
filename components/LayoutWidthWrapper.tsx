"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function LayoutWidthWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const isProjectsPage = pathname === "/projects";

  return (
    <div
      className={cn(
        "relative mx-auto px-6 py-6 pb-20",
        isProjectsPage ? "max-w-7xl" : "max-w-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}
