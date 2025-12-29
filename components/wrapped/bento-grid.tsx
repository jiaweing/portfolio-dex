"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid auto-rows-[minmax(180px,auto)] grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6",
        className
      )}
    >
      {children}
    </div>
  );
}
