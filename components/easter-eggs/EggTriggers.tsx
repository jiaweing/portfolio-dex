"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { createBurst, type EggId, findEgg } from "@/lib/easter-eggs";
import { cn } from "@/lib/utils";

type TapEggProps = {
  id: EggId;
  taps?: number;
  windowMs?: number;
  effect?: "spin" | "flare";
  className?: string;
  children: React.ReactNode;
};

// Unlocks after `taps` quick clicks, with a small reaction on every click
export function TapEgg({
  id,
  taps = 5,
  windowMs = 3000,
  effect = "spin",
  className,
  children,
}: TapEggProps) {
  const controls = useAnimationControls();
  const burst = useMemo(
    () => createBurst(taps, windowMs, () => findEgg(id)),
    [id, taps, windowMs]
  );

  const onTap = () => {
    burst();
    controls.start(
      effect === "spin"
        ? { rotate: [0, 360], transition: { duration: 0.5 } }
        : {
            scale: [1, 1.6, 1],
            rotate: [0, -12, 12, 0],
            transition: { duration: 0.4 },
          }
    );
  };

  return (
    <motion.span
      animate={controls}
      className={cn("inline-block cursor-pointer", className)}
      onClick={onTap}
    >
      {children}
    </motion.span>
  );
}

type HoldEggProps = {
  id: EggId;
  ms?: number;
  className?: string;
  children: React.ReactNode;
};

// Unlocks after pressing and holding for `ms`
export function HoldEgg({ id, ms = 1200, className, children }: HoldEggProps) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancel = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  return (
    <span
      className={cn(
        "inline-block select-none [-webkit-touch-callout:none]",
        className
      )}
      onContextMenu={(e) => e.preventDefault()}
      onPointerCancel={cancel}
      onPointerDown={() => {
        cancel();
        timer.current = setTimeout(() => findEgg(id), ms);
      }}
      onPointerLeave={cancel}
      onPointerUp={cancel}
    >
      {children}
    </span>
  );
}

// Unlocks once this marker scrolls into view
export function SeenEgg({ id }: { id: EggId }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        findEgg(id);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [id]);

  return <div aria-hidden className="h-px" ref={ref} />;
}
