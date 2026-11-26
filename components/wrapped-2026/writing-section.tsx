"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CountUp, Eyebrow, RevealWords, useWrapped } from "./primitives";

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

function Column({
  titles,
  duration,
  reverse,
}: {
  titles: PostTitle[];
  duration: number;
  reverse?: boolean;
}) {
  const { reduced } = useWrapped();
  const doubled = [...titles, ...titles];
  return (
    <div className="relative h-[70svh] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
      <motion.div
        animate={
          reduced ? undefined : { y: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }
        }
        className="flex flex-col gap-3"
        transition={{
          duration,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        {doubled.map((post, i) => (
          <Link
            className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/80 transition hover:border-fuchsia-400/60 hover:bg-white/[0.08] hover:text-white md:text-base"
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
  const third = Math.ceil(posts.length / 3);
  const cols = [0, 1, 2].map((i) => posts.slice(i * third, (i + 1) * third));

  return (
    <section className="relative px-6 py-32 md:px-16 md:py-48">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div>
          <Eyebrow>Chapter 5 · Wrote</Eyebrow>
          <h2 className="mt-4 font-black text-[clamp(5rem,18vw,13rem)] leading-[0.85] tracking-tighter">
            <CountUp
              className="bg-gradient-to-br from-cyan-300 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
              explode
              to={total}
            />
          </h2>
          <p className="mt-4 text-2xl text-white/80 md:text-4xl">
            <RevealWords text="blog posts this year." />
          </p>
          <p className="mt-3 text-lg text-white/60">
            {max} in {MONTH_NAMES[peak]} alone.
          </p>

          <div className="mt-10 flex h-40 items-end gap-1.5 md:gap-2">
            {perMonth.map((n, i) => (
              <div
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                key={MONTH_NAMES[i]}
              >
                <motion.div
                  className="w-full rounded-t-md bg-gradient-to-t from-violet-600 to-fuchsia-400"
                  initial={{ height: 0 }}
                  style={{
                    boxShadow:
                      i === peak ? "0 0 24px rgba(232,121,249,0.7)" : undefined,
                  }}
                  transition={{
                    delay: i * 0.05,
                    type: "spring",
                    stiffness: 90,
                    damping: 14,
                  }}
                  viewport={{ once: true }}
                  whileInView={{ height: `${Math.max(2, (n / max) * 100)}%` }}
                />
                <span className="font-mono text-[10px] text-white/40">
                  {MONTHS[i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          <Column duration={70} titles={cols[0]} />
          <Column duration={85} reverse titles={cols[1]} />
          <div className="hidden md:block">
            <Column duration={60} titles={cols[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}
