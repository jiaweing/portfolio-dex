"use client";

import { BookOpen, FolderGit2, Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LEFT_ITEMS = [
  { name: "Writing", href: "/blog", icon: BookOpen },
  { name: "Projects", href: "/projects", icon: FolderGit2 },
];

const RIGHT_ITEMS = [{ name: "About", href: "/about", icon: User }];

export function MobileBottomNav() {
  const pathname = usePathname();

  function navCls(href: string) {
    const isActive = pathname === href || pathname.startsWith(`${href}/`);
    return `flex flex-col items-center gap-1 duration-150 hover:text-accent-foreground ${isActive ? "text-foreground" : "text-muted-foreground"}`;
  }

  return (
    <div className="lg:hidden">
      <nav className="fixed bottom-0 z-[60] w-full">
        <div
          className="relative grid items-center px-6 pt-3 pb-6"
          style={{
            gridTemplateColumns: `repeat(${LEFT_ITEMS.length + RIGHT_ITEMS.length + 1}, minmax(0, 1fr))`,
          }}
        >
          {LEFT_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                className={navCls(item.href)}
                href={item.href}
                key={item.name}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px]">{item.name}</span>
              </Link>
            );
          })}

          {/* Center placeholder */}
          <div aria-hidden="true" />

          {RIGHT_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                className={navCls(item.href)}
                href={item.href}
                key={item.name}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px]">{item.name}</span>
              </Link>
            );
          })}

          {/* Floating center home button */}
          <Link
            className="absolute top-0 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-foreground text-background shadow-lg duration-150 active:scale-95"
            href="/"
          >
            <Home className="h-6 w-6" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
