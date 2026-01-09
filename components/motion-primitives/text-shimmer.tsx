"use client";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type TextShimmerProps = {
  children: string;
  className?: string;
  duration?: number;
  hoverDuration?: number;
  spread?: number;
};

function TextShimmerComponent({
  children,
  className,
  duration = 2,
  hoverDuration,
  spread = 2,
}: TextShimmerProps) {
  const [isHovered, setIsHovered] = useState(false);

  const dynamicSpread = useMemo(() => {
    return children.length * spread;
  }, [children, spread]);

  const currentDuration = isHovered && hoverDuration ? hoverDuration : duration;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <span
      className={cn(hoverDuration && "cursor-pointer", "inline-block")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.span
        animate={{ backgroundPosition: "0% center" }}
        className={cn(
          "relative inline-block bg-[length:250%_100%,auto] bg-clip-text",
          "text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]",
          "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]",
          "dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff] dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]",
          className
        )}
        initial={{ backgroundPosition: "100% center" }}
        key={isHovered ? "hovered" : "default"}
        style={
          {
            "--spread": `${dynamicSpread}px`,
            backgroundImage:
              "var(--bg), linear-gradient(var(--base-color), var(--base-color))",
          } as React.CSSProperties
        }
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: currentDuration,
          ease: "linear",
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export const TextShimmer = React.memo(TextShimmerComponent);
