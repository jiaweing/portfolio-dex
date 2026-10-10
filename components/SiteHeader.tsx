"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import * as React from "react";
import { ProgressiveBlur } from "@/components/ui/skiper-ui/progressive-blur";
import { WheelSidebarNav } from "@/components/WheelSidebarNav";
import { WrappedBanner } from "@/components/wrapped/wrapped-banner";
import { WrappedPageBorder } from "@/components/wrapped/wrapped-page-border";

export function SiteHeader() {
  const pathname = usePathname();
  const [isBannerHovered, setIsBannerHovered] = React.useState(false);

  return (
    <>
      <div className="fixed top-6 left-1/2 z-[100] w-[calc(100%-2rem)] -translate-x-1/2 md:w-auto">
        <WrappedBanner onHoverChange={setIsBannerHovered} />
      </div>

      <AnimatePresence>
        {(isBannerHovered || pathname === "/wrapped") && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              pointerEvents: "none",
            }}
            transition={{ duration: 0.5 }}
          >
            <WrappedPageBorder />
          </motion.div>
        )}
      </AnimatePresence>

      <ProgressiveBlur
        blurAmount="6px"
        className="hidden lg:block"
        position="left"
        useThemeBackground
        width="180px"
        zIndex={40}
      />

      <WheelSidebarNav />
    </>
  );
}
