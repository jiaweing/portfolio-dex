"use client";

import {
  motion,
  type SpringOptions,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export type AnimatedNumberProps = {
  value: number;
  className?: string;
  springOptions?: SpringOptions;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
}: AnimatedNumberProps) {
  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={cn("inline-block", className)}>
      {display}
    </motion.span>
  );
}
