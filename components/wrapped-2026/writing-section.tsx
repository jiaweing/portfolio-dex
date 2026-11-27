"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Counter, EASE, Reveal, SectionTitle } from "./primitives";

export interface PostTitle {
  title: string;
  slug: string;
}

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Post titles drifting upwards on a loop, faded at both ends
function Column({
  posts,
  duration,
  reverse,
}: {
  posts: PostTitle[];
  duration: number;
  reverse?: boolean;
}) {
  const reduced = useReducedMotion();
  const doubled = [...posts, ...posts];
  return (
    <div className="relative h-72 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
      <motion.div
        animate={
          reduced ? undefined : { y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
        }
        className="flex flex-col"
        transition={{
          duration,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        {doubled.map((post, i) => (
          <Link
            className="truncate py-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
            href={`/blog/${post.slug}`}
            key={`${post.slug}-${i}`}
          >
            {post.title}
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

export function WritingSection({
  posts,
  total,
  perMonth,
}: {
  posts: PostTitle[];
  total: number;
  perMonth: number[];
}) {
  const max = Math.max(1, ...perMonth);
  const peak = perMonth.indexOf(max);
  const half = Math.ceil(posts.length / 2);

  return (
    <section>
      <SectionTitle
        aside={
          <Link
            className="transition-colors hover:text-foreground"
            href="/blog"
          >
            all posts →
          </Link>
        }
      >
        writing
      </SectionTitle>

      <Reveal>
        <p className="font-semibold text-7xl text-foreground leading-none tracking-tighter md:text-8xl">
          <Counter stiffness={14} to={total} />
        </p>
        <p className="mt-3 text-muted-foreground text-xl md:text-2xl">
          posts this year. <span className="text-foreground">{max}</span> of
          them in {MONTH_NAMES[peak]} alone.
        </p>
      </Reveal>

      <div className="mt-10 flex h-36 items-end gap-1.5 md:gap-2">
        {perMonth.map((n, i) => (
          <div
            className="flex h-full flex-1 flex-col items-center justify-end gap-2"
            key={MONTH_NAMES[i]}
            title={`${n} in ${MONTH_NAMES[i]}`}
          >
            <motion.div
              className={cn(
                "w-full rounded-t-[4px]",
                i === peak ? "bg-foreground" : "bg-muted-foreground/25"
              )}
              initial={{ height: 0 }}
              transition={{ delay: i * 0.05, duration: 0.8, ease: EASE }}
              viewport={{ once: true, margin: "-10% 0px" }}
              whileInView={{ height: `${Math.max(2, (n / max) * 100)}%` }}
            />
            <span className="text-[10px] text-muted-foreground/70">
              {MONTHS[i]}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
        <Column duration={60} posts={posts.slice(0, half)} />
        <div className="hidden sm:block">
          <Column duration={70} posts={posts.slice(half)} reverse />
        </div>
      </div>
    </section>
  );
}
