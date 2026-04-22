import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { siteConfig } from "@/lib/metadata";

const socialLinks = [
  {
    name: "GitHub",
    href: siteConfig.links.github,
    icon: "/logos/github_light.svg",
    filterClass: "invert dark:brightness-0 dark:invert",
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
    filterClass: "dark:brightness-0 dark:invert",
    sizeClass: "h-3 w-3",
  },
];

export function SiteFooter() {
  return (
    <footer className="fixed right-0 bottom-0 left-0 z-0 hidden h-[400px] w-full flex-col justify-between overflow-hidden bg-muted/10 lg:flex">
      <div className="mx-auto flex w-full max-w-2xl flex-col px-4 pt-8">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="font-medium text-sm">{siteConfig.name}</p>
            <p className="text-muted-foreground text-xs">
              {siteConfig.description}
            </p>
            <Button asChild className="mt-3 normal-case" size="sm">
              <a
                href="mailto:hey@jiaweing.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                contact me
              </a>
            </Button>
          </div>
          <TooltipProvider delayDuration={0}>
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
                        className={`opacity-30 grayscale transition-all hover:opacity-100 hover:grayscale-0 ${s.sizeClass ?? "h-4 w-4"} ${s.filterClass}`}
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

        <div className="mt-6 border-border border-t" />

        <div className="flex items-center justify-between pt-3">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Jia Wei Ng. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Designed &amp; built with{" "}
            <span className="animate-pulse text-red-400">♥</span> by Jia Wei
          </p>
        </div>
      </div>

      <div className="w-full overflow-hidden px-3 pb-4">
        <p
          className="text-center font-bold text-foreground/[0.07] leading-none tracking-tight dark:text-foreground/[0.05]"
          style={{ fontSize: "11vw" }}
        >
          jiawei
        </p>
      </div>
    </footer>
  );
}
