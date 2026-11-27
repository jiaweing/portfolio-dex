"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Counter, container, item } from "./primitives";

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  wide?: boolean;
  href?: string;
  // Extra content under the number, such as a sparkline
  children?: React.ReactNode;
}

// The same card as the home page's "at a glance" grid
function Tile({ stat }: { stat: Stat }) {
  const external = stat.href?.startsWith("http");
  const inner = (
    <>
      <span className="flex items-center gap-1.5 text-muted-foreground">
        {stat.icon}
        <span className="text-xs">{stat.sublabel}</span>
      </span>
      {stat.children}
      <div>
        <p
          className={cn(
            "font-semibold text-foreground leading-none",
            stat.wide ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl"
          )}
        >
          <Counter stiffness={stat.wide ? 15 : 20} to={stat.value} />
          {stat.suffix ? (
            <span className="ml-0.5 text-[0.6em]">{stat.suffix}</span>
          ) : null}
        </p>
        <p className="mt-2 text-muted-foreground text-sm">{stat.label}</p>
      </div>
    </>
  );
  const className = cn(
    "group relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-2xl bg-muted/30 p-5 transition-colors hover:bg-muted/50",
    stat.href && "cursor-pointer"
  );

  return (
    <motion.div
      className={cn("h-full", stat.wide && "col-span-2")}
      variants={item}
    >
      {stat.href ? (
        <a
          className={className}
          href={stat.href}
          rel={external ? "noopener noreferrer" : undefined}
          target={external ? "_blank" : undefined}
        >
          {inner}
        </a>
      ) : (
        <div className={className}>{inner}</div>
      )}
    </motion.div>
  );
}

export function StatGrid({
  stats,
  className,
}: {
  stats: Stat[];
  className?: string;
}) {
  return (
    <motion.div
      className={cn(
        "grid auto-rows-[160px] grid-cols-2 gap-3 [grid-auto-flow:dense] sm:grid-cols-3",
        className
      )}
      initial="hidden"
      variants={container}
      viewport={{ once: true, margin: "-10% 0px" }}
      whileInView="show"
    >
      {stats.map((s) => (
        <Tile key={s.label + s.sublabel} stat={s} />
      ))}
    </motion.div>
  );
}
