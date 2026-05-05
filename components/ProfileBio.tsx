"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import profileData from "@/data/profile.json";
import { cn } from "@/lib/utils";
import { Quotes } from "./core/quotes";
import { SlidingNumber } from "./motion-primitives/sliding-number";
import { TextShimmer } from "./motion-primitives/text-shimmer";
import { SantaAvatar } from "./SantaAvatar";
import { Favicon } from "./ui/Favicon";
import { YouTubeLiveBanner } from "./YouTubeLiveBanner";

function getAge(birthDateString: string) {
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  },
};

type FaviconItem = {
  url?: string;
  src?: string;
  name: string;
  brandBg?: string;
  invertDark?: boolean;
  invertLight?: boolean;
};

function StackedFavicons({
  items,
  isProject = false,
}: {
  items: FaviconItem[];
  isProject?: boolean;
}) {
  // Tag duplicate src items with a single-letter badge so they look distinct
  const srcCounts = items.reduce<Record<string, number>>((acc, item) => {
    if (item.src) acc[item.src] = (acc[item.src] ?? 0) + 1;
    return acc;
  }, {});
  const merged = items.map((item) => {
    if (item.src && srcCounts[item.src] > 1) {
      // Extract first letter inside parens, e.g. "YouTube (Tech)" → "T"
      const match = item.name.match(/\((\w)/);
      const letter = match ? match[1] : item.name[0];
      return { ...item, badge: letter };
    }
    return item;
  }) as (FaviconItem & { badge?: string })[];

  return (
    <TooltipProvider delay={0}>
      <motion.span
        className={cn(
          "mx-1 inline-flex items-center transition-all duration-900",
          isProject ? "-space-x-2 hover:space-x-2" : "space-x-1 hover:space-x-2"
        )}
        initial="rest"
        whileHover="hover"
      >
        {merged.map((item, i) => (
          <Tooltip key={item.name + i}>
            <TooltipTrigger asChild>
              <motion.a
                className="relative"
                href={item.url}
                rel="noopener noreferrer"
                target="_blank"
                variants={{
                  rest: {
                    rotate:
                      (i - (merged.length - 1) / 2) * (isProject ? 15 : 12),
                    x: isProject ? i * -2 : 0,
                    zIndex: i,
                  },
                  hover: {
                    rotate: 0,
                    x: 0,
                    zIndex: 10,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  },
                }}
              >
                {item.src ? (
                  <span
                    className={cn(
                      "relative flex h-5 w-5 items-center justify-center overflow-visible",
                      isProject && "corner-squircle overflow-hidden"
                    )}
                  >
                    <Image
                      alt={item.name}
                      className={cn(
                        "h-full w-full object-contain",
                        isProject && "rounded-sm",
                        (item.invertDark ||
                          (!isProject &&
                            [
                              "X/Twitter",
                              "GitHub",
                              "Threads",
                              "Instagram",
                            ].includes(item.name))) &&
                          "dark:brightness-0 dark:invert",
                        item.invertLight && "invert dark:invert-0"
                      )}
                      height={16}
                      src={item.src}
                      width={16}
                    />
                    {item.badge && (
                      <span className="absolute -right-1.5 -bottom-1 flex h-3 w-3 items-center justify-center rounded-full bg-muted font-bold text-[7px] text-muted-foreground leading-none ring-1 ring-background">
                        {item.badge}
                      </span>
                    )}
                  </span>
                ) : (
                  <Favicon
                    className={cn("corner-squircle h-7 w-7")}
                    invert={item.name === "Base 7" ? "light" : false}
                    url={item.url!}
                  />
                )}
              </motion.a>
            </TooltipTrigger>
            <TooltipContent className="px-2 py-1 text-xs" side="top">
              {item.name}
            </TooltipContent>
          </Tooltip>
        ))}
      </motion.span>
    </TooltipProvider>
  );
}

export function ProfileBio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const [currentAge, setCurrentAge] = useState(0);
  const [players, setPlayers] = useState(0);
  const [mau, setMau] = useState(0);

  const ageMotion = useMotionValue(0);
  const ageSpring = useSpring(ageMotion, {
    stiffness: 20,
    damping: 10,
    mass: 1.5,
  });
  const [ageDisplay, setAgeDisplay] = useState(0);

  const playersMotion = useMotionValue(0);
  const playersSpring = useSpring(playersMotion, {
    stiffness: 15,
    damping: 10,
    mass: 1.5,
  });
  const [playersDisplay, setPlayersDisplay] = useState(0);

  const mauMotion = useMotionValue(0);
  const mauSpring = useSpring(mauMotion, {
    stiffness: 20,
    damping: 10,
    mass: 1.5,
  });
  const [mauDisplay, setMauDisplay] = useState(0);
  const [singaporeIcon, setSingaporeIcon] = useState(
    "/images/icons/Sun Behind Small Cloud.png"
  );
  const [weatherAdjective, setWeatherAdjective] = useState("sunny");

  useEffect(() => {
    return ageSpring.on("change", (v) => setAgeDisplay(Math.round(v)));
  }, [ageSpring]);
  useEffect(() => {
    return playersSpring.on("change", (v) => setPlayersDisplay(Math.round(v)));
  }, [playersSpring]);
  useEffect(() => {
    return mauSpring.on("change", (v) => setMauDisplay(Math.round(v)));
  }, [mauSpring]);

  useEffect(() => {
    if (isInView) {
      const age = getAge("2000-08-11");
      setCurrentAge(age);
      setPlayers(470);
      setMau(10);
      ageMotion.set(age);
      playersMotion.set(470);
      mauMotion.set(10);

      // Singapore Icon Logic
      const date = new Date();
      const month = date.getMonth(); // 0-11

      if (month === 9) {
        // October
        setSingaporeIcon("/images/icons/Jack-O-Lantern.png");
        const adjectives = ["spooky"];
        setWeatherAdjective(
          adjectives[Math.floor(Math.random() * adjectives.length)]
        );
      } else if (month === 11) {
        // December
        setSingaporeIcon("/images/icons/Snowman.png");
        const adjectives = ["snowy", "festive"];
        setWeatherAdjective(
          adjectives[Math.floor(Math.random() * adjectives.length)]
        );
      } else {
        // Randomly pick Sun or Rain
        const isSunny = Math.random() > 0.5;
        setSingaporeIcon(
          isSunny
            ? "/images/icons/Sun Behind Small Cloud.png"
            : "/images/icons/Umbrella with Rain Drops.png"
        );
        setWeatherAdjective(isSunny ? "sunny" : "rainy");
      }
    }
  }, [isInView]);

  return (
    <motion.div
      animate={isInView ? "show" : "hidden"}
      className="mx-auto max-w-2xl space-y-8 pt-4 text-muted-foreground text-xl leading-relaxed md:pt-20 md:text-2xl"
      initial="hidden"
      ref={ref}
      variants={containerVariants}
    >
      <motion.p variants={itemVariants}>
        <span className="font-normal text-muted-foreground">Hi, I&apos;m </span>
        <SantaAvatar
          className="corner-squircle mr-1 inline-block size-5 align-middle md:size-6.5"
          hatClassName="-top-3 -left-1 size-7"
        />
        <span className="text-black text-foreground dark:text-white">
          <TextShimmer
            className="inline-block"
            duration={1.2}
            hoverDuration={0.5}
          >
            Jia Wei Ng
          </TextShimmer>
        </span>{" "}
        <span className="whitespace-nowrap text-lg text-muted-foreground">
          (Jay,{" "}
          <SlidingNumber
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              mass: 0.8,
            }}
            value={ageDisplay}
          />
          , from {weatherAdjective}
          <Image
            alt="Singapore Weather Icon"
            className="corner-squircle mx-1 inline-block align-text-bottom transition-transform duration-300 hover:scale-110"
            height={30}
            src={singaporeIcon}
            width={30}
          />
          Singapore)
        </span>
        , a founder, designer & engineer
        <Image
          alt="Fire"
          className="corner-squircle mx-1 inline-block align-text-bottom transition-transform duration-300 hover:scale-110"
          height={30}
          src="/images/icons/Fire.png"
          width={30}
        />
      </motion.p>

      <motion.p variants={itemVariants}>
        I&apos;m currently the CEO at{" "}
        <Link
          className="border-muted-foreground/40 border-b border-dashed text-black text-foreground transition-colors duration-300 hover:border-foreground dark:text-white"
          href="https://amajor.ai"
          rel="noopener noreferrer"
          target="_blank"
        >
          A Major
        </Link>{" "}
        <StackedFavicons
          isProject
          items={[
            {
              url: "https://amajor.ai",
              src: "/logos/amajor.svg",
              name: "amajor.ai",
              invertDark: true,
            },
          ]}
        />
        , building and scaling{" "}
        <Link
          className="border-muted-foreground/40 border-b border-dashed text-black text-foreground transition-colors duration-300 hover:border-foreground dark:text-white"
          href="https://updatenight.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Update Night
        </Link>{" "}
        and{" "}
        <Link
          className="border-muted-foreground/40 border-b border-dashed text-black text-foreground transition-colors duration-300 hover:border-foreground dark:text-white"
          href="https://ryuhq.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Ryu
        </Link>{" "}
        <StackedFavicons
          isProject
          items={[
            {
              url: "https://updatenight.com",
              src: "/logos/updatenight.png",
              name: "Update Night",
            },
            {
              url: "https://ryuhq.com",
              src: "/logos/ryu.png",
              name: "Ryu",
            },
          ]}
        />
      </motion.p>

      <motion.p variants={itemVariants}>
        I also wear{" "}
        <Link
          className="border-muted-foreground/40 border-b border-dashed text-black text-foreground transition-colors duration-300 hover:border-foreground dark:text-white"
          href="https://supply.tf"
          rel="noopener noreferrer"
          target="_blank"
        >
          supply.tf
        </Link>{" "}
        <StackedFavicons
          isProject
          items={[
            {
              url: "https://supply.tf",
              src: "/logos/supply.png",
              name: "supply.tf",
            },
          ]}
        />
        , a clothing brand for those who dare to stand out, chase their dreams,
        and refuse to blend in.
      </motion.p>

      <motion.p variants={itemVariants}>
        Previously, I scaled{" "}
        <Link
          className="border-muted-foreground/40 border-b border-dashed text-black text-foreground transition-colors duration-300 hover:border-foreground dark:text-white"
          href="https://titan.tf"
          rel="noopener noreferrer"
          target="_blank"
        >
          titan.tf
        </Link>{" "}
        <StackedFavicons
          isProject
          items={[
            {
              url: "https://titan.tf",
              src: "/logos/titan.png",
              name: "titan.tf",
              invertLight: true,
            },
          ]}
        />
        to{" "}
        <SlidingNumber
          className="text-black text-foreground dark:text-white"
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.8,
          }}
          value={playersDisplay}
        />
        <span className="text-black text-foreground dark:text-white">k</span>{" "}
        unique players and{" "}
        <SlidingNumber
          className="text-black text-foreground dark:text-white"
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.8,
          }}
          value={mauDisplay}
        />
        <span className="text-black text-foreground dark:text-white">k</span>{" "}
        monthly active users.
      </motion.p>

      {/* <motion.p variants={itemVariants}>
        I love{" "}
        <Link
          className="border-muted-foreground/40 border-b border-dashed text-black text-foreground transition-colors duration-300 hover:border-foreground dark:text-white"
          href="https://en.wikipedia.org/wiki/Psychology"
          rel="noopener noreferrer"
          target="_blank"
        >
          psychology
        </Link>
        ,{" "}
        <Link
          className="border-muted-foreground/40 border-b border-dashed text-black text-foreground transition-colors duration-300 hover:border-foreground dark:text-white"
          href="https://en.wikipedia.org/wiki/Outer_space"
          rel="noopener noreferrer"
          target="_blank"
        >
          space
        </Link>
        ,{" "}
        <Link
          className="border-muted-foreground/40 border-b border-dashed text-black text-foreground transition-colors duration-300 hover:border-foreground dark:text-white"
          href="https://en.wikipedia.org/wiki/Quantum_mechanics"
          rel="noopener noreferrer"
          target="_blank"
        >
          quantum mechanics
        </Link>
        , strange anomalies and mysteries of the universe
        <Image
          alt="Milky Way"
          className="corner-squircle mx-1 inline-block align-text-bottom transition-transform duration-300 hover:scale-110"
          height={30}
          src="/images/icons/Milky Way.png"
          width={30}
        />
      </motion.p> */}

      <motion.div variants={itemVariants}>
        <p>
          I livestream{" "}
          <Link
            className="border-muted-foreground/40 border-b border-dashed text-black text-foreground transition-colors duration-300 hover:border-foreground dark:text-white"
            href="https://amajor.link/live"
            rel="noopener noreferrer"
            target="_blank"
          >
            every weekday 2–5PM Singapore time
          </Link>
          <StackedFavicons
            items={[
              {
                url: "https://www.twitch.tv/jiaweihq",
                src: "/logos/twitch.svg",
                name: "Twitch",
              },
              {
                url: "https://amajor.link/jy",
                src: "/logos/youtube.svg",
                name: "YouTube (Tech)",
              },
            ]}
          />
        </p>
        <Suspense>
          <YouTubeLiveBanner />
        </Suspense>
      </motion.div>

      <motion.div className="space-y-1.5" variants={itemVariants}>
        <p>
          <span className="chroma-text chroma-text-animate">
            I document my life &amp; build in public at
          </span>
        </p>
        <StackedFavicons
          items={profileData.social
            .filter((s) => s.name !== "LinkedIn" && s.name !== "GitHub")
            .map((s) => ({
              url: s.url,
              src: s.icon,
              name: s.name,
            }))}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Quotes />
      </motion.div>
    </motion.div>
  );
}
