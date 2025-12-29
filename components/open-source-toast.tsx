"use client";

import { GithubIcon } from "hugeicons-react";
import { useEffect } from "react";
import { toast } from "sonner";

const GITHUB_URL = "https://github.com/jiaweing/portfolio-dex";
const STORAGE_KEY = "has-seen-open-source-toast";

export function OpenSourceToast() {
  useEffect(() => {
    // Check if toast was dismissed/shown
    const hasSeenToast = localStorage.getItem(STORAGE_KEY);
    if (hasSeenToast) return;

    // Small delay to ensure the Toaster is mounted
    const timer = setTimeout(() => {
      toast("Like my website? 🩷", {
        description:
          "It's open source and you can freely use the code for whatever you want, just give it a star ⭐",
        duration: Number.POSITIVE_INFINITY,
        dismissible: true,
        onDismiss: () => {
          localStorage.setItem(STORAGE_KEY, "true");
        },
        onAutoClose: () => {
          localStorage.setItem(STORAGE_KEY, "true");
        },
        action: {
          label: (
            <span className="flex items-center gap-1.5">
              <GithubIcon className="h-3.5 w-3.5" />
              GitHub
            </span>
          ) as unknown as string,
          onClick: () => {
            localStorage.setItem(STORAGE_KEY, "true");
            window.open(GITHUB_URL, "_blank");
          },
        },
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
