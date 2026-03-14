"use client";

import { List } from "lucide-react";
import { useState } from "react";
import type { TocHeading } from "@/components/blog/TableOfContents";
import { TableOfContents } from "@/components/blog/TableOfContents";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function MobileTocSheet({ headings }: { headings: TocHeading[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-1/2 right-4 z-[200] -translate-y-1/2 xl:hidden">
      <Drawer direction="right" onOpenChange={setOpen} open={open}>
        <DrawerTrigger asChild>
          <button className="rounded-full border border-border bg-background p-3 shadow-lg">
            <List className="h-5 w-5" />
            <span className="sr-only">Table of contents</span>
          </button>
        </DrawerTrigger>
        <DrawerContent className="w-72 overflow-y-auto">
          <DrawerHeader>
            <DrawerTitle>Contents</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <TableOfContents
              alwaysExpanded
              headings={headings}
              onItemClick={() => setOpen(false)}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
