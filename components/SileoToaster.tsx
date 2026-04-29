"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sileo";

export function SileoToaster() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Toaster
      options={
        isDark
          ? undefined
          : {
              fill: "#171717",
              styles: {
                title: "text-white!",
                description: "text-white/75!",
                badge: "bg-white/10!",
                button: "bg-white/10! hover:bg-white/15! text-white!",
              },
            }
      }
      position="bottom-right"
      theme="system"
    />
  );
}
