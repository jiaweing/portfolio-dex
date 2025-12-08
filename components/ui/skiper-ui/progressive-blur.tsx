"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ProgressiveBlurProps = {
  className?: string;
  backgroundColor?: string;
  position?: "top" | "bottom";
  height?: string;
  blurAmount?: string;
  useThemeBackground?: boolean;
};

const ProgressiveBlur = ({
  className = "",
  backgroundColor,
  position = "top",
  height = "150px",
  blurAmount = "4px",
  useThemeBackground = false,
}: ProgressiveBlurProps) => {
  const isTop = position === "top";

  // Get theme context for theme detection
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if dark theme is active
  const isDarkTheme =
    theme?.theme === "dark" ||
    (theme?.theme === "system" && theme?.systemTheme === "dark");

  // Get background color based on theme or props
  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor;
    if (useThemeBackground) {
      // Use exact colors from global.css
      if (isDarkTheme) {
        return "oklch(0.141 0.005 285.823)"; // Dark background from global.css
      }
      return "oklch(1 0 0)"; // Light background from global.css
    }
    return "#ffffff"; // default
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const bgColor = getBackgroundColor();

  return (
    <div
      className={`pointer-events-none fixed left-0 w-full select-none ${className} z-50`}
      style={{
        [isTop ? "top" : "bottom"]: 0,
        height,
        background: isTop
          ? `linear-gradient(to top, transparent, ${bgColor})`
          : `linear-gradient(to bottom, transparent, ${bgColor})`,
        maskImage: isTop
          ? `linear-gradient(to bottom, ${bgColor} 50%, transparent)`
          : `linear-gradient(to top, ${bgColor} 50%, transparent)`,
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    />
  );
};

export { ProgressiveBlur };

/**
 * Skiper 41 Canvas_Landing_004 — React + framer motion
 * Inspired by and adapted from https://devouringdetails.com/
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the devouringdetails.com . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
