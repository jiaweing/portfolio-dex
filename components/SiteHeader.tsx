"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-3 right-18 z-[100] hidden md:block">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-right">
        <nav className="flex items-center gap-1">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">home</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/blog">blog</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/setup">setup</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/books">books</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
