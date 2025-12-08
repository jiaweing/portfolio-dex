"use client";

import { useTheme } from "next-themes";

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
  const { resolvedTheme } = useTheme(); // Use resolvedTheme to handle 'system' preference

  if (hide || !url || url === "#" || url.startsWith("/")) return null;

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
        src={faviconUrl}
        alt=""
        className={`inline-block w-4 h-4 mr-1 rounded-sm align-text-bottom ${className} ${
          resolvedTheme === "dark" ? "opacity-90" : ""
        } ${shouldInvert ? "invert" : ""}`}
        loading="lazy"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  } catch (e) {
    return null;
  }
}
