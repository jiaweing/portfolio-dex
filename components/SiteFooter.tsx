"use client";

import { Mail, PartyPopper, Snowflake, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { triggerSeasonalEffect } from "@/hooks/use-seasonal-effect";
import { siteConfig } from "@/lib/metadata";

const socialLinks = [
  {
    name: "GitHub",
    href: siteConfig.links.github,
    icon: "/logos/github_light.svg",
    filterClass: "brightness-0 dark:brightness-0 dark:invert",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/jiaweing",
    icon: "/logos/linkedin.svg",
    filterClass: "brightness-0 dark:brightness-0 dark:invert",
  },
  {
    name: "X/Twitter",
    href: siteConfig.links.twitter,
    icon: "/logos/x.svg",
    filterClass: "brightness-0 dark:brightness-0 dark:invert",
    sizeClass: "h-3 w-3",
  },
];

const seasonalButtons: {
  effect: "snow" | "confetti";
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  { effect: "snow", label: "Snow", Icon: Snowflake },
  { effect: "confetti", label: "Confetti", Icon: PartyPopper },
];

export function SiteFooter() {
  return (
    <footer className="fixed right-0 bottom-0 left-0 z-0 hidden h-[400px] w-full flex-col justify-between overflow-hidden bg-muted/10 lg:flex">
      <div className="mx-auto flex w-full max-w-2xl flex-col px-4 pt-8">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="font-medium text-sm">{siteConfig.name}</p>
            <p className="text-muted-foreground text-xs">
              founder, designer & engineer in Singapore
            </p>
            <div className="mt-3 flex items-center gap-2">
              <Button
                className="normal-case"
                nativeButton={false}
                render={
                  <a
                    href="https://www.notion.so/jiaweing/4d94f7ab64b9464d93aa24902719d3d3?pvs=106"
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                }
                size="sm"
              >
                contact me
              </Button>
              <a
                aria-label="Email"
                className="text-muted-foreground opacity-60 transition-all hover:opacity-100"
                href="mailto:hey@jiaweing.com"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                aria-label="Telegram"
                className="opacity-60 transition-all hover:opacity-100"
                href="https://t.me/jiaweihq"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Image
                  alt="Telegram"
                  className="h-4 w-4 grayscale transition-all hover:grayscale-0"
                  height={16}
                  src="/logos/telegram.svg"
                  width={16}
                />
              </a>
            </div>
          </div>
          <TooltipProvider delay={0}>
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => (
                <Tooltip key={s.name}>
                  <TooltipTrigger asChild>
                    <Link
                      href={s.href}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Image
                        alt={s.name}
                        className={`opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0 ${s.sizeClass ?? "h-4 w-4"} ${s.filterClass}`}
                        height={16}
                        src={s.icon}
                        width={16}
                      />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    className="px-2 py-1 font-medium text-xs"
                    side="top"
                  >
                    {s.name}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        </div>

        <div className="mt-6 flex items-center justify-between pt-3">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Jia Wei Ng. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {seasonalButtons.map(({ effect, label, Icon }) => (
                <TooltipProvider delay={0} key={effect}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="rounded-md p-1 text-muted-foreground opacity-40 transition-all hover:scale-125 hover:text-foreground hover:opacity-100"
                        onClick={() => triggerSeasonalEffect(effect)}
                        type="button"
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="px-2 py-1 text-xs" side="top">
                      {label}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
              <TooltipProvider delay={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="rounded-md p-1 text-muted-foreground opacity-40 transition-all hover:scale-125 hover:text-foreground hover:opacity-100"
                      onClick={() => triggerSeasonalEffect(null)}
                      type="button"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="px-2 py-1 text-xs" side="top">
                    Clear effects
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-muted-foreground text-xs">
              Designed &amp; built with{" "}
              <span className="relative inline-flex items-center justify-center transition-transform hover:scale-150">
                <span className="absolute animate-ping text-red-400 opacity-75">
                  ♥
                </span>
                <span className="absolute animate-ping text-red-400 opacity-40 [animation-delay:600ms] [animation-duration:1.5s]">
                  ♥
                </span>
                <span className="relative text-red-400">♥</span>
              </span>{" "}
              by Jia Wei
            </p>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden px-3 pb-4">
        <p
          className="bg-gradient-to-r from-foreground/[0.12] via-foreground/[0.06] to-foreground/[0.02] bg-clip-text text-center font-bold text-transparent leading-none tracking-tight dark:from-foreground/[0.10] dark:via-foreground/[0.05] dark:to-transparent"
          style={{ fontSize: "11vw" }}
        >
          jiawei
        </p>
      </div>
    </footer>
  );
}
