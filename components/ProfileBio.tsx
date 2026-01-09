"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import profileData from "@/data/profile.json";
import { cn } from "@/lib/utils";
import { AnimatedNumber } from "./core/animated-number";
import { Quotes } from "./core/quotes";
import { TextShimmer } from "./motion-primitives/text-shimmer";
import { SantaAvatar } from "./SantaAvatar";
import { Favicon } from "./ui/Favicon";

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
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  },
};

function StackedFavicons({
  items,
  isProject = false,
}: {
  items: { url?: string; src?: string; name: string; brandBg?: string }[];
  isProject?: boolean;
}) {
  return (
    <TooltipProvider delayDuration={0}>
      <motion.span
        className={cn(
          "inline-flex items-center transition-all duration-300",
          isProject ? "-space-x-2" : "-space-x-1"
        )}
        initial="rest"
        whileHover="hover"
      >
        {items.map((item, i) => (
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
                      (i - (items.length - 1) / 2) * (isProject ? 15 : 12),
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
                  <div
                    className={cn(
                      "corner-squircle flex h-7 w-7 items-center justify-center overflow-hidden p-1.5 shadow-sm",
                      isProject
                        ? "border border-border bg-background"
                        : "bg-transparent"
                    )}
                  >
                    <Image
                      alt={item.name}
                      className={cn(
                        "h-full w-full object-contain",
                        !isProject &&
                          ["X/Twitter", "GitHub", "Threads"].includes(
                            item.name
                          ) &&
                          "dark:brightness-0 dark:invert"
                      )}
                      height={16}
                      src={item.src}
                      width={16}
                    />
                  </div>
                ) : (
                  <Favicon
                    className={cn(
                      "corner-squircle h-7 w-7 p-1 shadow-sm",
                      isProject
                        ? "border border-border bg-background"
                        : "bg-transparent"
                    )}
                    url={item.url!}
                  />
                )}
              </motion.a>
            </TooltipTrigger>
            <TooltipContent
              className="px-2 py-1 font-medium text-xs"
              side="top"
            >
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
  const [singaporeIcon, setSingaporeIcon] = useState(
    "/images/icons/Sun Behind Small Cloud.png"
  );
  const [weatherAdjective, setWeatherAdjective] = useState("sunny");

  useEffect(() => {
    if (isInView) {
      setCurrentAge(getAge("2000-08-11"));
      setPlayers(460);
      setMau(10);

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
      className="mx-auto max-w-2xl space-y-8 text-muted-foreground text-xl leading-relaxed md:pt-20 md:text-2xl"
      initial="hidden"
      ref={ref}
      variants={containerVariants}
    >
      <motion.p variants={itemVariants}>
        <span className="font-normal text-muted-foreground">Hi, I&apos;m </span>
        <SantaAvatar className="corner-squircle mr-2 inline-block size-5 align-middle md:size-6.5" />
        <span className="font-medium text-black text-foreground dark:text-white">
          <TextShimmer className="inline-block" duration={1.2}>
            Jia Wei Ng
          </TextShimmer>
        </span>{" "}
        <span className="whitespace-nowrap text-lg text-muted-foreground">
          (Jay,{" "}
          <AnimatedNumber
            springOptions={{ bounce: 0, duration: 2000 }}
            value={currentAge}
          />
          , from {weatherAdjective}
          <Image
            alt="Singapore Weather Icon"
            className="corner-squircle mx-1 inline-block border border-white/10 align-text-bottom shadow-xl transition-transform duration-300 hover:scale-110"
            height={30}
            src={singaporeIcon}
            width={30}
          />
          Singapore)
        </span>
        , a serial entrepreneur, designer & software engineer who loves building
        cool shit
        <Image
          alt="Fire"
          className="corner-squircle mx-1 inline-block border border-white/10 align-text-bottom shadow-xl transition-transform duration-300 hover:scale-110"
          height={30}
          src="/images/icons/Fire.png"
          width={30}
        />
      </motion.p>

      <motion.p variants={itemVariants}>
        I currently build and scale products at{" "}
        <Link
          className="border-muted-foreground/30 border-b border-dotted font-medium text-black text-foreground transition-colors hover:border-foreground dark:text-white"
          href="https://base07.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Base 7
        </Link>
        ,{" "}
        <Link
          className="border-muted-foreground/30 border-b border-dotted font-medium text-black text-foreground transition-colors hover:border-foreground dark:text-white"
          href="https://updatenight.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Update Night
        </Link>
        ,{" "}
        <Link
          className="border-muted-foreground/30 border-b border-dotted font-medium text-black text-foreground transition-colors hover:border-foreground dark:text-white"
          href="https://supply.tf"
          rel="noopener noreferrer"
          target="_blank"
        >
          supply.tf
        </Link>
        , and{" "}
        <Link
          className="border-muted-foreground/30 border-b border-dotted font-medium text-black text-foreground transition-colors hover:border-foreground dark:text-white"
          href="https://decosmic.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Decosmic
        </Link>{" "}
        <StackedFavicons
          isProject
          items={[
            { url: "https://base07.com", name: "Base 7" },
            { url: "https://updatenight.com", name: "Update Night" },
            { url: "https://supply.tf", name: "supply.tf" },
            { url: "https://decosmic.com", name: "Decosmic" },
          ]}
        />
      </motion.p>

      <motion.p variants={itemVariants}>
        Previously, I scaled{" "}
        <Link
          className="border-muted-foreground/30 border-b border-dotted font-medium text-black text-foreground transition-colors hover:border-foreground dark:text-white"
          href="https://titan.tf"
          rel="noopener noreferrer"
          target="_blank"
        >
          titan.tf
        </Link>{" "}
        <StackedFavicons
          isProject
          items={[{ url: "https://titan.tf", name: "titan.tf" }]}
        />
        to{" "}
        <AnimatedNumber
          className="font-medium text-black text-foreground dark:text-white"
          springOptions={{ bounce: 0, duration: 3000 }}
          value={players}
        />
        <span className="font-medium text-black text-foreground dark:text-white">
          k
        </span>{" "}
        unique players and{" "}
        <AnimatedNumber
          className="font-medium text-black text-foreground dark:text-white"
          springOptions={{ bounce: 0, duration: 3000 }}
          value={mau}
        />
        <span className="font-medium text-black text-foreground dark:text-white">
          k
        </span>{" "}
        monthly active users.
      </motion.p>

      <motion.p variants={itemVariants}>
        I love{" "}
        <Link
          className="border-muted-foreground/30 border-b border-dotted text-black text-foreground transition-colors hover:border-foreground dark:text-white"
          href="https://en.wikipedia.org/wiki/Psychology"
          rel="noopener noreferrer"
          target="_blank"
        >
          psychology
        </Link>
        ,{" "}
        <Link
          className="border-muted-foreground/30 border-b border-dotted text-black text-foreground transition-colors hover:border-foreground dark:text-white"
          href="https://en.wikipedia.org/wiki/Outer_space"
          rel="noopener noreferrer"
          target="_blank"
        >
          space
        </Link>
        ,{" "}
        <Link
          className="border-muted-foreground/30 border-b border-dotted text-black text-foreground transition-colors hover:border-foreground dark:text-white"
          href="https://en.wikipedia.org/wiki/Quantum_mechanics"
          rel="noopener noreferrer"
          target="_blank"
        >
          quantum mechanics
        </Link>
        , strange anomalies and mysteries of the universe
        <Image
          alt="Milky Way"
          className="corner-squircle mx-1 inline-block border border-white/10 align-text-bottom shadow-xl transition-transform duration-300 hover:scale-110"
          height={30}
          src="/images/icons/Milky Way.png"
          width={30}
        />
      </motion.p>

      <motion.p variants={itemVariants}>
        I document my life & build in public at{" "}
        <StackedFavicons
          items={profileData.social.map((s) => ({
            url: s.url,
            src: s.icon,
            name: s.name,
          }))}
        />
      </motion.p>

      <motion.div variants={itemVariants}>
        <Quotes />
      </motion.div>
    </motion.div>
  );
}
