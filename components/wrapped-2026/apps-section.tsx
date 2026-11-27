"use client";

import { useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { CODE_STATS, RYU_APPS } from "@/lib/wrapped-2026-data";
import { Counter, Reveal, SectionTitle } from "./primitives";

function Chips({ lit, show }: { lit?: boolean; show: boolean }) {
  return (
    <div aria-hidden={lit} className="flex flex-wrap gap-1.5">
      {RYU_APPS.map((name, i) => (
        <span
          className={cn(
            "rounded-md px-2 py-1 font-mono text-xs",
            lit
              ? "bg-foreground text-background"
              : "bg-muted/50 text-muted-foreground"
          )}
          key={name}
          style={
            show
              ? {
                  animation: `cellPop 450ms cubic-bezier(0.21,0.47,0.32,0.98) ${i * 18}ms both`,
                }
              : { opacity: 0 }
          }
        >
          {name}
        </span>
      ))}
    </div>
  );
}

// Every Ryu app as a chip. A spotlight follows the pointer and inverts the
// chips under it, so the wall lights up wherever you look.
export function AppsSection() {
  const wall = useRef<HTMLDivElement>(null);
  const inView = useInView(wall, { once: true, amount: 0.3 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = wall.current;
    if (!el || e.pointerType !== "mouse") {
      return;
    }
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
    el.style.setProperty("--r", "110px");
  };

  return (
    <section>
      <SectionTitle
        aside={
          <a
            className="transition-colors hover:text-foreground"
            href="https://github.com/amajorai"
            rel="noopener noreferrer"
            target="_blank"
          >
            open source ↗
          </a>
        }
      >
        <Image
          alt=""
          className="corner-squircle size-5"
          height={20}
          src="/logos/ryu.png"
          width={20}
        />
        ryu
      </SectionTitle>

      <Reveal>
        <p className="font-semibold text-7xl text-foreground leading-none tracking-tighter md:text-8xl">
          <Counter to={CODE_STATS.ryuApps} />
        </p>
        <p className="mt-3 max-w-lg text-muted-foreground text-xl leading-relaxed md:text-2xl">
          open source apps. Last year Ryu was a side project. This year it{" "}
          <a
            className="border-muted-foreground/40 border-b border-dashed text-foreground transition-colors duration-300 hover:border-foreground"
            href="https://ryuhq.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            runs on all of these
          </a>
          .
        </p>
      </Reveal>

      <div
        className="relative mt-10 [--r:0px] [--x:50%] [--y:50%]"
        onPointerLeave={() => wall.current?.style.setProperty("--r", "0px")}
        onPointerMove={onMove}
        ref={wall}
      >
        <Chips show={inView} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            maskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y), black 40%, transparent)",
            WebkitMaskImage:
              "radial-gradient(circle var(--r) at var(--x) var(--y), black 40%, transparent)",
          }}
        >
          <Chips lit show={inView} />
        </div>
      </div>
      <p className="mt-4 hidden text-muted-foreground/70 text-xs [@media(hover:hover)]:block">
        move your cursor over them
      </p>
    </section>
  );
}
