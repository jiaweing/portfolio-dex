"use client";

import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { useIsMobile } from "@/hooks/use-mobile"; // Fixed import path
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { ProgressiveBlur } from "./ui/skiper-ui/progressive-blur";

interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const { setTheme } = useTheme();

  if (!isMobile) return null;

  return (
    <>
      {/* Floating Menu Button - Bottom Right */}
      <div className={`fixed right-6 bottom-6 z-[100] md:hidden ${className}`}>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              size="icon"
              className="bg-background/20 hover:bg-background/30 ring-0.5 h-14 w-14 rounded-full border border-white/10 shadow-2xl inset-shadow-2xs backdrop-blur-xl transition-all duration-200"
            >
              <Menu className="text-foreground size-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[100vh]">
            <ProgressiveBlur
              position="top"
              height="50px"
              className="z-10 rounded-t-4xl"
              blurAmount="50px"
              useThemeBackground
            />
            <div className="flex flex-col gap-12 overflow-auto px-6 py-6 pb-20">
              <div className="flex flex-col gap-4">
                <div className="text-muted-foreground text-sm font-medium">
                  Menu
                </div>
                <div className="flex flex-col gap-3">
                  <MobileLink href="/" onOpenChange={setOpen}>
                    Home
                  </MobileLink>
                  <MobileLink href="/about" onOpenChange={setOpen}>
                    About
                  </MobileLink>
                  <MobileLink href="/blog" onOpenChange={setOpen}>
                    Blog
                  </MobileLink>
                  <MobileLink href="/projects" onOpenChange={setOpen}>
                    Projects
                  </MobileLink>
                  <MobileLink href="/oss" onOpenChange={setOpen}>
                    OSS
                  </MobileLink>
                  <MobileLink href="/setup" onOpenChange={setOpen}>
                    Setup
                  </MobileLink>
                  <MobileLink href="/books" onOpenChange={setOpen}>
                    Books
                  </MobileLink>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="text-muted-foreground text-sm font-medium">
                  Theme
                </div>
                <div className="flex flex-col gap-3">
                  <MobileLink
                    href="#"
                    onOpenChange={setOpen}
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </MobileLink>
                  <MobileLink
                    href="#"
                    onOpenChange={setOpen}
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </MobileLink>
                  <MobileLink
                    href="#"
                    onOpenChange={setOpen}
                    onClick={() => setTheme("system")}
                  >
                    System
                  </MobileLink>
                </div>
              </div>
            </div>
            <ProgressiveBlur
              position="bottom"
              height="100px"
              className="z-10 rounded-b-4xl"
              blurAmount="50px"
              useThemeBackground
            />
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Link> & {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={(e) => {
        // Only prevent default and control navigation if it's not a simple anchor
        if (href.toString().startsWith("#")) {
          // allow default?
        }
        // Actually, just let Link handle it unless we need to close drawer
        onOpenChange?.(false);
      }}
      className={cn("text-2xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
