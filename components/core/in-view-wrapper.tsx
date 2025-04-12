"use client";

import { InView } from "@/components/ui/in-view";
import { Transition, UseInViewOptions, Variant } from "motion/react";
import { ReactNode } from "react";

type InViewWrapperProps = {
  children: ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
};

export function InViewWrapper({
  children,
  variants = {
    hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  transition = { duration: 0.5, ease: "easeInOut" },
  viewOptions = { margin: "0px 0px -200px 0px", once: true },
}: InViewWrapperProps) {
  return (
    <InView
      variants={variants}
      transition={transition}
      viewOptions={viewOptions}
    >
      {children}
    </InView>
  );
}
