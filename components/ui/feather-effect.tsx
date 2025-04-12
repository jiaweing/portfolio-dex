"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface FeatherEffectProps {
  position: "top" | "bottom";
  className?: string;
  intensity?: "none" | "light" | "medium" | "strong";
}

export function FeatherEffect({
  position,
  className,
  intensity = "none",
}: FeatherEffectProps) {
  const isTop = position === "top";

  // Blur intensity based on prop
  const blurAmount = {
    none: "blur(0px)",
    light: "blur(1px)",
    medium: "blur(3px)",
    strong: "blur(5px)",
  }[intensity];

  return (
    <motion.div
      className={cn(
        "fixed left-0 right-0 pointer-events-none",
        isTop ? "top-0 h-24" : "bottom-0 h-24",
        "w-full",
        className
      )}
      initial={{ opacity: 0, y: isTop ? -15 : 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        zIndex: 50,
        background: isTop
          ? "linear-gradient(to bottom, var(--background) 0%, var(--background) 30%, rgba(var(--background-rgb), 0.9) 50%, rgba(var(--background-rgb), 0.6) 70%, rgba(var(--background-rgb), 0.3) 85%, transparent 100%)"
          : "linear-gradient(to top, var(--background) 0%, var(--background) 30%, rgba(var(--background-rgb), 0.9) 50%, rgba(var(--background-rgb), 0.6) 70%, rgba(var(--background-rgb), 0.3) 85%, transparent 100%)",
        backdropFilter: blurAmount,
      }}
    >
      {/* Subtle decorative elements */}
      <motion.div
        className="absolute w-full opacity-5"
        style={{
          height: "100%",
          background: `radial-gradient(ellipse at ${
            isTop ? "bottom" : "top"
          }, rgba(var(--background-rgb), 0.1) 0%, transparent 70%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 1.5 }}
      />

      {/* Extra gradient for smoother transition */}
      <div
        className="absolute w-full"
        style={{
          height: "100%",
          background: isTop
            ? "linear-gradient(to bottom, transparent 0%, rgba(var(--background-rgb), 0.02) 40%, rgba(var(--background-rgb), 0.05) 80%, rgba(var(--background-rgb), 0.1) 100%)"
            : "linear-gradient(to top, transparent 0%, rgba(var(--background-rgb), 0.02) 40%, rgba(var(--background-rgb), 0.05) 80%, rgba(var(--background-rgb), 0.1) 100%)",
          opacity: 0.3,
        }}
      />

      {/* Very subtle border line */}
      {isTop && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border/20 opacity-30" />
      )}
      {!isTop && (
        <div className="absolute top-0 left-0 right-0 h-px bg-border/20 opacity-30" />
      )}
    </motion.div>
  );
}
