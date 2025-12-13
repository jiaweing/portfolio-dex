"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bookmark02Icon as Book,
  BookOpen02Icon as GalleryHorizontalEnd,
  Globe02Icon as Globe,
  FavouriteIcon as Heart,
  Search01Icon as Search,
  UserIcon as User,
} from "hugeicons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = React.useState(false);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  const items = [
    { href: "/about", icon: User, label: "About" },
    { href: "/blog", icon: GalleryHorizontalEnd, label: "Blog" },
    { href: "/projects", icon: Search, label: "Projects" },
    { href: "/oss", icon: Globe, label: "Open Source" },
    { href: "/books", icon: Book, label: "Books" },
    { href: "/setup", icon: Heart, label: "Setup" },
  ];

  return (
    <>
      <Link href="/" className="fixed left-9 top-6 z-[200] hidden lg:block">
        <Avatar className="size-10 rounded-xl border border-white/10 shadow-xl hover:scale-110 transition-transform duration-300">
          <AvatarImage src="/images/avatars/shadcn.png" alt="Jia Wei Ng" />
          <AvatarFallback>JW</AvatarFallback>
        </Avatar>
      </Link>

      <header className="fixed left-6 top-1/2 z-[100] hidden -translate-y-1/2 lg:block">
        <nav
          className="flex flex-col items-start gap-8 rounded-3xl bg-transparent p-2 transition-all duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href as any}
              className={cn(
                "group flex items-center gap-3 rounded-full px-3 py-2 transition-all duration-300",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="size-5 shrink-0" strokeWidth={3} />
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="whitespace-nowrap text-sm font-medium overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
