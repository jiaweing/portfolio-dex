"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { MILESTONES, type Milestone } from "@/lib/wrapped-2026-data";
import { EASE, SectionTitle } from "./primitives";

function Entry({ m, index }: { m: Milestone; index: number }) {
  const title = (
    <span className="inline-flex items-center gap-2">
      {m.title}
      {m.icon ? (
        <Image
          alt=""
          className={cn(
            "corner-squircle size-5 object-contain",
            m.invertDark && "dark:invert"
          )}
          height={20}
          src={m.icon}
          width={20}
        />
      ) : null}
    </span>
  );

  return (
    <motion.li
      className="relative pl-10"
      initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
      transition={{ duration: 0.6, ease: EASE }}
      viewport={{ once: true, margin: "-15% 0px" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    >
      {/* The dot fills in as the line reaches it */}
      <motion.span
        className="absolute top-[0.55rem] left-[7px] size-[9px] rounded-full bg-border ring-4 ring-background"
        initial={{ scale: 0.6 }}
        transition={{ duration: 0.4, ease: EASE, delay: 0.15 }}
        viewport={{ once: true, margin: "-40% 0px" }}
        whileInView={{ scale: 1, backgroundColor: "var(--foreground)" }}
      />
      <p className="text-muted-foreground text-sm">
        <span className="font-mono tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="mx-2 text-muted-foreground/40">/</span>
        {m.kicker}
      </p>
      <h3 className="mt-1 font-medium text-foreground text-lg md:text-xl">
        {m.href ? (
          <a
            className="border-muted-foreground/40 border-b border-dashed transition-colors duration-300 hover:border-foreground"
            href={m.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            {title}
          </a>
        ) : (
          title
        )}
      </h3>
      <p className="mt-1 text-muted-foreground leading-relaxed">{m.body}</p>
    </motion.li>
  );
}

// A timeline whose line draws itself as you scroll down it
export function Milestones() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end 0.6"],
  });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section>
      <SectionTitle aside={`${MILESTONES.length} moments`}>
        what actually happened
      </SectionTitle>
      <ol className="relative space-y-10" ref={ref}>
        <span className="absolute top-3 bottom-3 left-[11px] w-px bg-border" />
        <motion.span
          className="absolute top-3 bottom-3 left-[11px] w-px origin-top bg-foreground"
          style={{ scaleY: line }}
        />
        {MILESTONES.map((m, i) => (
          <Entry index={i} key={m.id} m={m} />
        ))}
      </ol>
    </section>
  );
}
