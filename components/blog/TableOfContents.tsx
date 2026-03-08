"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useActiveHeading } from "@/hooks/use-active-heading";

export interface TocHeading {
  id: string;
  text: string;
  level: 1 | 2 | 3;
}

function getLineWidth(level: 1 | 2 | 3) {
  switch (level) {
    case 1:
      return "24px";
    case 2:
      return "16px";
    case 3:
      return "8px";
  }
}

function getPaddingLeft(level: 1 | 2 | 3) {
  switch (level) {
    case 1:
      return "0px";
    case 2:
      return "12px";
    case 3:
      return "24px";
  }
}

function TOCItemLink({
  heading,
  isActive,
}: {
  heading: TocHeading;
  isActive: boolean;
}) {
  return (
    <Link
      className="relative flex min-h-5 w-full flex-col justify-start"
      href={`#${heading.id}`}
      onClick={(e) => {
        e.preventDefault();
        document.getElementById(heading.id)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }}
      title={heading.text}
    >
      {/* Line indicator */}
      <div
        className={`absolute top-2.5 right-0 h-[2px] -translate-y-1/2 rounded-full transition-all duration-300 ${
          isActive
            ? "bg-foreground"
            : "bg-muted-foreground/30 dark:bg-muted-foreground/50"
        }`}
        style={{ width: getLineWidth(heading.level) }}
      />

      {/* Animated text — slides in on group hover */}
      <div className="grid w-full grid-rows-[0fr] transition-[grid-template-rows] delay-200 duration-300 ease-in-out group-hover:grid-rows-[1fr] group-hover:delay-0">
        <div className="overflow-hidden">
          <div className="flex min-h-5 flex-col justify-center">
            <span
              className={`block w-full -translate-x-4 py-0.5 pr-8 text-left font-medium text-sm opacity-0 transition-all delay-0 duration-200 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:delay-150 group-hover:duration-300 ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
              style={{ paddingLeft: getPaddingLeft(heading.level) }}
            >
              {heading.text}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function TableOfContents({ headings }: { headings: TocHeading[] }) {
  const headingIds = useMemo(() => headings.map((h) => h.id), [headings]);
  const activeId = useActiveHeading(headingIds);

  if (headings.length === 0) return null;

  return (
    <nav className="group max-h-[75vh] w-full overflow-y-auto pr-10">
      <div className="flex flex-col gap-1">
        {headings.map((heading) => (
          <TOCItemLink
            heading={heading}
            isActive={activeId === heading.id}
            key={heading.id}
          />
        ))}
      </div>
    </nav>
  );
}
