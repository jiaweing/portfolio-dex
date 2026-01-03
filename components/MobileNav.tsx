"use client";

import { motion } from "framer-motion";
import { Menu01Icon as Menu } from "hugeicons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
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
      <div className={`fixed right-6 bottom-6 z-[100] lg:hidden ${className}`}>
        <Drawer onOpenChange={setOpen} open={open}>
          <DrawerTrigger asChild>
            <Button
              className="inset-shadow-2xs h-14 w-14 rounded-full border border-white/10 bg-background/20 shadow-2xl ring-0.5 backdrop-blur-xl transition-all duration-200 hover:bg-background/30"
              size="icon"
            >
              <Menu className="size-6 text-foreground" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[100vh]">
            <ProgressiveBlur
              blurAmount="50px"
              className="z-10 rounded-t-4xl"
              height="50px"
              position="top"
              useThemeBackground
            />
            <div className="flex flex-col gap-12 overflow-auto px-6 py-6 pb-20">
              <div className="flex flex-col gap-4">
                <div className="font-medium text-muted-foreground text-sm">
                  Menu
                </div>
                <div className="flex flex-col gap-3">
                  <MobileLink href="/wrapped" onOpenChange={setOpen}>
                    <span className="flex items-center gap-3">
                      <motion.span
                        animate={{
                          backgroundPosition: ["0% center", "200% center"],
                        }}
                        style={{
                          backgroundImage:
                            "linear-gradient(120deg, rgb(59, 130, 246) 0%, rgb(168, 85, 247) 25%, rgb(239, 68, 68) 50%, rgb(249, 115, 22) 75%, rgb(59, 130, 246) 100%)",
                          backgroundSize: "200% auto",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          color: "transparent",
                        }}
                        transition={{
                          duration: 4,
                          ease: "linear",
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        2025 Wrapped!
                      </motion.span>
                    </span>
                  </MobileLink>
                  <MobileLink href="/" onOpenChange={setOpen}>
                    Home
                  </MobileLink>
                  <MobileLink href={"/about" as any} onOpenChange={setOpen}>
                    About
                  </MobileLink>
                  <MobileLink href="/blog" onOpenChange={setOpen}>
                    Blog
                  </MobileLink>
                  <MobileLink href="/projects" onOpenChange={setOpen}>
                    Projects
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
                <div className="font-medium text-muted-foreground text-sm">
                  Theme
                </div>
                <div className="flex flex-col gap-3">
                  <MobileLink
                    href="#"
                    onClick={() => setTheme("light")}
                    onOpenChange={setOpen}
                  >
                    Light
                  </MobileLink>
                  <MobileLink
                    href="#"
                    onClick={() => setTheme("dark")}
                    onOpenChange={setOpen}
                  >
                    Dark
                  </MobileLink>
                  <MobileLink
                    href="#"
                    onClick={() => setTheme("system")}
                    onOpenChange={setOpen}
                  >
                    System
                  </MobileLink>
                </div>
              </div>
            </div>
            <ProgressiveBlur
              blurAmount="50px"
              className="z-10 rounded-b-4xl"
              height="100px"
              position="bottom"
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
      className={cn("font-medium text-2xl", className)}
      href={href}
      onClick={(e) => {
        // Only prevent default and control navigation if it's not a simple anchor
        if (href.toString().startsWith("#")) {
          // allow default?
        }
        // Actually, just let Link handle it unless we need to close drawer
        onOpenChange?.(false);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
