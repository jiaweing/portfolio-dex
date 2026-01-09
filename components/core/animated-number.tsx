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
  as?: React.ElementType;
};

export function AnimatedNumber({
  value,
  className,
  springOptions,
  as = "span",
}: AnimatedNumberProps) {
  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  const Component = motion[as as keyof typeof motion] || motion.span;

  return (
    <Component className={cn("inline-block", className)}>{display}</Component>
  );
}
