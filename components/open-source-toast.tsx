"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { sileo } from "sileo";

const GITHUB_URL = "https://github.com/jiaweing/portfolio-dex";
const STORAGE_KEY = "has-seen-open-source-toast";

export function OpenSourceToast() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const isDark = resolvedTheme === "dark";

    const timer = setTimeout(() => {
      let id: string;

      const dismiss = (e?: React.MouseEvent | React.KeyboardEvent) => {
        e?.stopPropagation();
        sileo.dismiss(id);
        localStorage.setItem(STORAGE_KEY, "true");
      };

      const githubIconSrc = isDark
        ? "/logos/github_light.svg"
        : "/logos/github_white.svg";
      const githubBtnClass = isDark
        ? "flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-black/10 px-3 py-1.5 text-xs font-medium text-black transition-colors hover:bg-black/20"
        : "flex cursor-pointer items-center gap-1.5 rounded-full border-0 bg-white/15 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/25";
      const dismissBtnClass =
        "flex cursor-pointer items-center justify-center rounded-full bg-transparent px-3 py-1.5 text-xs font-medium text-muted-foreground transition-opacity hover:opacity-70";

      id = sileo.show({
        title: "This site is open source",
        description: (
          <span className="flex flex-col gap-3">
            <span>
              Built in public. Explore the code, learn from it, or give it a
              star if you find it useful ⭐
            </span>
            <span className="flex items-center justify-center gap-2">
              <a
                className={githubBtnClass}
                href={GITHUB_URL}
                onClick={(e) => {
                  e.stopPropagation();
                  localStorage.setItem(STORAGE_KEY, "true");
                }}
                onPointerDown={(e) => e.stopPropagation()}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  alt="GitHub"
                  height={14}
                  src={githubIconSrc}
                  width={14}
                />
                GitHub
              </a>
              <span
                className={dismissBtnClass}
                onClick={dismiss}
                onKeyDown={(e) => e.key === "Enter" && dismiss(e)}
                onPointerDown={(e) => e.stopPropagation()}
                role="button"
                tabIndex={0}
              >
                Dismiss
              </span>
            </span>
          </span>
        ),
        duration: null,
        icon: <Image alt="GitHub" height={20} src={githubIconSrc} width={20} />,
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [resolvedTheme]);

  return null;
}
