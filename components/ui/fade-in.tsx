"use client";

import { motion, type UseInViewOptions, useInView } from "framer-motion";
import { useRef } from "react";

type Direction = "up" | "down" | "left" | "right";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  fullWidth?: boolean;
  viewOptions?: UseInViewOptions;
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  direction = "up",
  fullWidth = false,
  viewOptions,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-10% 0px",
    ...viewOptions,
  });

  const directionOffset = {
    up: { y: 20, x: 0 },
    down: { y: -20, x: 0 },
    left: { x: 20, y: 0 },
    right: { x: -20, y: 0 },
  };

  const initial = {
    opacity: 0,
    ...directionOffset[direction],
  };

  const animate = isInView
    ? {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration,
          delay,
          ease: "easeOut" as const,
        },
      }
    : { ...initial };

  return (
    <motion.div
      animate={animate}
      className={`${className} ${fullWidth ? "w-full" : ""}`}
      initial={initial}
      ref={ref}
    >
      {children}
    </motion.div>
  );
}
