"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="Back to top"
      className={cn(
        "fixed right-4 bottom-6 z-50 hidden lg:flex",
        "h-10 w-10 items-center justify-center rounded-full",
        "border bg-background text-muted-foreground shadow-sm",
        "transition-all duration-300 hover:text-foreground",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      )}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      type="button"
    >
      <ArrowUp className="h-3.5 w-3.5" />
    </button>
  );
}
