"use client";

import { Favicon } from "@/components/ui/Favicon";
import type { StackItem } from "@/lib/notion";

// Map Notion colors to Tailwind classes
const NOTION_COLOR_MAP: Record<string, string> = {
  default: "bg-muted text-muted-foreground",
  gray: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  brown: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  orange:
    "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  yellow:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300",
  green: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  purple:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  pink: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

interface StackTableProps {
  items: StackItem[];
}

export function StackTable({ items }: StackTableProps) {
  if (items.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground text-sm">
        No items found.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-lg">
        <thead>
          <tr className="bg-muted/50 text-left text-muted-foreground text-xs">
            <th className="w-[700px] px-4 py-2.5 font-medium lg:pl-[10rem]">
              Name
            </th>
            <th className="px-4 py-2.5 font-medium">Description</th>
            <th className="w-[350px] px-4 py-2.5 font-medium">Category</th>
            <th className="w-[500px] px-4 py-2.5 font-medium">Platforms</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr
              className={`border-border/60 border-b transition-colors hover:bg-muted/40 ${
                item.url ? "cursor-pointer" : ""
              }`}
              key={item.id}
              onClick={() => {
                if (item.url) {
                  window.open(item.url, "_blank", "noopener,noreferrer");
                }
              }}
            >
              <td className="w-[220px] px-4 py-4 lg:pl-[10rem]">
                <div className="flex items-center gap-3 font-medium">
                  {!item.hideFavicon && item.url && (
                    <Favicon
                      className="corner-squircle size-7 shrink-0"
                      url={item.url}
                    />
                  )}
                  <span className="truncate">{item.name}</span>
                </div>
              </td>
              <td className="px-4 py-4 text-muted-foreground">
                {item.description}
              </td>
              <td className="w-[140px] px-4 py-4">
                {item.category && (
                  <span
                    className={`inline-flex items-center rounded-sm px-3 py-1 font-medium text-sm ${
                      NOTION_COLOR_MAP[item.categoryColor] ??
                      NOTION_COLOR_MAP.default
                    }`}
                  >
                    {item.category}
                  </span>
                )}
              </td>
              <td className="w-[220px] px-4 py-4">
                <div className="flex flex-wrap gap-1">
                  {item.platforms.map((platform) => (
                    <span
                      className={`inline-flex items-center rounded-sm px-3 py-1 font-medium text-sm ${
                        NOTION_COLOR_MAP[platform.color] ??
                        NOTION_COLOR_MAP.default
                      }`}
                      key={platform.name}
                    >
                      {platform.name}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
