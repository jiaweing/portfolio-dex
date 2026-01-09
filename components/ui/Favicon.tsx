"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type FaviconProps = {
  url: string;
  className?: string;
  invert?: boolean | "light" | "dark" | "always";
  hide?: boolean;
};

export function Favicon({
  url,
  className = "",
  invert = false,
  hide = false,
}: FaviconProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (hide || !url || url === "#" || url.startsWith("/")) return null;
  if (!mounted) return null;

  const shouldInvert =
    invert === "always" ||
    invert === true ||
    (invert === "light" && resolvedTheme === "light") ||
    (invert === "dark" && resolvedTheme === "dark");

  try {
    const domain = new URL(url).hostname;
    // Size 32 for better quality on high DPI screens, displayed as 16px
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

    return (
      <img
        alt=""
        className={`mr-1 inline-block h-4 w-4 rounded-sm align-text-bottom ${className} ${
          shouldInvert ? "invert" : ""
        }`}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
        src={faviconUrl}
      />
    );
  } catch (e) {
    return null;
  }
}
