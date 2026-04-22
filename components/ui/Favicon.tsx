"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type FaviconProps = {
  url: string;
  className?: string;
  invert?: boolean | "light" | "dark" | "always";
  hide?: boolean;
  fallback?: string;
};

const AVATAR_COLORS: [string, string][] = [
  ["#f87171", "#7f1d1d"],
  ["#fb923c", "#7c2d12"],
  ["#facc15", "#713f12"],
  ["#4ade80", "#14532d"],
  ["#34d399", "#064e3b"],
  ["#38bdf8", "#0c4a6e"],
  ["#818cf8", "#1e1b4b"],
  ["#c084fc", "#4a044e"],
  ["#f472b6", "#500724"],
  ["#94a3b8", "#0f172a"],
];

function letterColor(letter: string): [string, string] {
  const idx = letter.toUpperCase().charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

function LetterAvatar({
  letter,
  className,
}: {
  letter: string;
  className: string;
}) {
  const [bg, fg] = letterColor(letter);
  return (
    <span
      className={`inline-flex items-center justify-center font-semibold ${className}`}
      style={{ background: bg, color: fg, borderRadius: "22%" }}
    >
      {letter.toUpperCase()}
    </span>
  );
}

export function Favicon({
  url,
  className = "h-4 w-4",
  invert = false,
  hide = false,
  fallback,
}: FaviconProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showFallback =
    fallback && (hide || !url || url === "#" || url.startsWith("/") || errored);

  if (!mounted) return null;

  if (hide || !url || url === "#" || url.startsWith("/")) {
    return showFallback ? (
      <LetterAvatar className={className} letter={fallback!} />
    ) : null;
  }

  if (errored && fallback) {
    return <LetterAvatar className={className} letter={fallback} />;
  }

  const shouldInvert =
    invert === "always" ||
    invert === true ||
    (invert === "light" && resolvedTheme === "light") ||
    (invert === "dark" && resolvedTheme === "dark");

  try {
    const domain = new URL(url).hostname;
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

    return (
      <img
        alt=""
        className={`inline-block rounded-sm object-contain ${className} ${
          shouldInvert ? "invert" : ""
        }`}
        loading="lazy"
        onError={() => setErrored(true)}
        src={faviconUrl}
      />
    );
  } catch {
    return fallback ? (
      <LetterAvatar className={className} letter={fallback} />
    ) : null;
  }
}
