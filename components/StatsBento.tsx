"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Briefcase, Trophy } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SlidingNumber } from "@/components/motion-primitives/sliding-number";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  },
};

type StatDef = {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  wide?: boolean;
  tall?: boolean;
  decimals?: number;
};

const YTIcon = (
  <Image
    alt="YouTube"
    className="h-4 w-4"
    height={16}
    src="/logos/youtube.svg"
    width={16}
  />
);
const LinkedInIcon = (
  <Image
    alt="LinkedIn"
    className="h-4 w-4"
    height={16}
    src="/logos/linkedin.svg"
    width={16}
  />
);
const ThreadsIcon = (
  <Image
    alt="Threads"
    className="h-4 w-4 dark:invert"
    height={16}
    src="/logos/threads.svg"
    width={16}
  />
);
const TitanIcon = (
  <Image
    alt="titan.tf"
    className="h-4 w-4"
    height={16}
    src="/logos/titan.png"
    width={16}
  />
);
const GoogleIcon = (
  <Image
    alt="Google"
    className="h-4 w-4"
    height={16}
    src="/logos/google.svg"
    width={16}
  />
);
const InstagramIcon = (
  <Image
    alt="Instagram"
    className="h-4 w-4 dark:invert"
    height={16}
    src="/logos/instagram.svg"
    width={16}
  />
);
const UnsplashIcon = (
  <Image
    alt="Unsplash"
    className="h-4 w-4 dark:invert"
    height={16}
    src="/logos/unsplash.svg"
    width={16}
  />
);

// Layout (3-col, grid-flow-dense):
// Row 1: [18 ventures 2×2] [2 companies]
// Row 2: [18 ventures 2×2] [10 years]
// Row 3: [4000 jobs wide ] [5 hackathons tall]
// Row 4: [2 wins][460k   ] [5 hackathons tall]
// Row 5: [100k YT][860sub] [52k LinkedIn     ]
// Row 6: [300k Threads 2×2][16800 Threads    ]
// Row 7: [300k Threads 2×2][6200 Instagram   ]
const STATS: StatDef[] = [
  // ── Building ─────────────────────────────────────────────
  {
    target: 18,
    label: "ventures built",
    sublabel: "serial entrepreneur",
    icon: (
      <Image
        alt="Jia Wei"
        className="h-4 w-4 rounded-full object-cover"
        height={16}
        src="/images/avatars/jiawei.jpg"
        width={16}
      />
    ),
    wide: true,
    tall: true,
  },
  {
    target: 2,
    label: "companies incorporated",
    sublabel: "in Singapore",
    icon: (
      <span className="flex items-center gap-1">
        <Image
          alt="Base7"
          className="h-4 w-4 dark:invert"
          height={16}
          src="/logos/base7-submark.svg"
          width={16}
        />
        <Image
          alt="Amajor"
          className="h-4 w-4 dark:invert"
          height={16}
          src="/logos/amajor.svg"
          width={16}
        />
      </span>
    ),
  },
  {
    target: 10,
    label: "years shipping software",
    sublabel: "since titan.tf at 15",
    icon: TitanIcon,
  },
  // ── Career ───────────────────────────────────────────────
  {
    target: 4.1,
    suffix: "k",
    label: "jobs applied",
    sublabel: "0 interviews",
    icon: <Briefcase className="h-4 w-4" />,
    wide: true,
    decimals: 1,
  },
  // ── Hackathons ───────────────────────────────────────────
  {
    target: 5,
    label: "hackathons joined",
    sublabel: "Google, Dell, GovTech",
    icon: GoogleIcon,
    tall: true,
  },
  {
    target: 2,
    label: "first place wins",
    sublabel: "hackathon wins",
    icon: <Trophy className="h-4 w-4" />,
  },
  // ── Photography ──────────────────────────────────────────
  {
    target: 460,
    suffix: "k",
    label: "photo views",
    sublabel: "Unsplash — top 25%",
    icon: UnsplashIcon,
  },
  // ── YouTube ──────────────────────────────────────────────
  {
    target: 100,
    suffix: "k",
    label: "YouTube views",
    sublabel: "across channels",
    icon: YTIcon,
  },
  {
    target: 860,
    suffix: "+",
    label: "YouTube subscribers",
    sublabel: "lifestyle channel",
    icon: YTIcon,
  },
  {
    target: 52,
    suffix: "k",
    label: "LinkedIn impressions",
    sublabel: "past year",
    icon: LinkedInIcon,
  },
  // ── Social reach ─────────────────────────────────────────
  {
    target: 300,
    suffix: "k",
    label: "Threads lifetime views",
    sublabel: "and growing",
    icon: ThreadsIcon,
    wide: true,
    tall: true,
  },
  {
    target: 27,
    suffix: "k",
    label: "Threads views",
    sublabel: "past 90 days",
    icon: ThreadsIcon,
  },
  {
    target: 6.2,
    suffix: "k",
    label: "Instagram views",
    sublabel: "past 90 days",
    icon: InstagramIcon,
    decimals: 1,
  },
];

function StatCard({ stat, value }: { stat: StatDef; value: number }) {
  const { wide, tall } = stat;
  const hero = wide && tall;

  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    stiffness: hero ? 12 : wide || tall ? 15 : 20,
    damping: 10,
    mass: 1.5,
  });
  const factor = 10 ** (stat.decimals ?? 0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  useEffect(() => {
    return springVal.on("change", (v) =>
      setDisplay(Math.round(v * factor) / factor)
    );
  }, [springVal, factor]);

  return (
    <motion.div
      className={cn(
        "group flex flex-col justify-between gap-4 rounded-2xl border bg-background/50 p-5 transition-colors hover:bg-muted/30",
        wide && "col-span-2",
        tall && "row-span-2"
      )}
      variants={itemVariants}
    >
      <span className="flex items-center gap-1.5 text-muted-foreground">
        {stat.icon}
        <span className="text-xs">{stat.sublabel}</span>
      </span>
      <div>
        <p
          className={cn(
            "font-semibold text-foreground tabular-nums leading-none",
            hero
              ? "text-6xl md:text-7xl"
              : wide
                ? "text-5xl md:text-6xl"
                : "text-3xl md:text-4xl"
          )}
        >
          {stat.prefix && <span>{stat.prefix}</span>}
          <SlidingNumber
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              mass: 0.8,
            }}
            value={display}
          />
          {stat.suffix && (
            <span className="ml-0.5 text-[0.6em]">{stat.suffix}</span>
          )}
        </p>
        <p className="mt-2 text-muted-foreground text-sm">{stat.label}</p>
      </div>
    </motion.div>
  );
}

export function StatsBento() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [values, setValues] = useState<number[]>(STATS.map(() => 0));

  useEffect(() => {
    if (isInView) {
      setValues(STATS.map((s) => s.target));
    }
  }, [isInView]);

  return (
    <div ref={ref}>
      <motion.div
        animate={isInView ? "show" : "hidden"}
        className="grid auto-rows-[160px] grid-cols-2 gap-3 [grid-auto-flow:dense] sm:grid-cols-3"
        initial="hidden"
        variants={containerVariants}
      >
        {STATS.map((stat, i) => (
          <StatCard key={stat.label + i} stat={stat} value={values[i]} />
        ))}
      </motion.div>
    </div>
  );
}
