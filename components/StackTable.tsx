"use client";

import { ChevronDownIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Favicon } from "@/components/ui/Favicon";
import { Input } from "@/components/ui/input";
import type { StackItem } from "@/lib/notion";
import { cn } from "@/lib/utils";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") ?? "";
  const [inputValue, setInputValue] = useState(urlSearch);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Sync input with URL on popstate (back/forward navigation)
  useEffect(() => {
    setInputValue(urlSearch);
  }, [urlSearch]);

  // Debounce URL updates
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      if (inputValue !== urlSearch) {
        const params = new URLSearchParams(searchParams.toString());
        if (inputValue.trim().length > 0) {
          params.set("search", inputValue);
        } else {
          params.delete("search");
        }
        const query = params.toString();
        router.replace(query ? `${pathname}?${query}` : pathname, {
          scroll: false,
        });
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [inputValue, urlSearch, searchParams, router, pathname]);

  const search = urlSearch;
  const selectedCategories = useMemo(() => {
    const categories = searchParams.get("categories");
    if (!categories) {
      return [];
    }

    return categories
      .split(",")
      .map((cat) => cat.trim())
      .filter(Boolean);
  }, [searchParams]);

  const selectedPlatforms = useMemo(() => {
    const platforms = searchParams.get("platforms");
    if (!platforms) {
      return [];
    }

    return platforms
      .split(",")
      .map((plat) => plat.trim())
      .filter(Boolean);
  }, [searchParams]);

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    for (const item of items) {
      if (item.category) {
        categories.add(item.category);
      }
    }
    return [...categories].sort((a, b) => a.localeCompare(b));
  }, [items]);

  const allPlatforms = useMemo(() => {
    const platforms = new Set<string>();
    for (const item of items) {
      for (const platform of item.platforms) {
        platforms.add(platform.name);
      }
    }
    return [...platforms].sort((a, b) => a.localeCompare(b));
  }, [items]);

  const categoryColors = useMemo(() => {
    const colorMap: Record<string, string> = {};
    for (const item of items) {
      if (item.category && item.categoryColor && !colorMap[item.category]) {
        colorMap[item.category] = item.categoryColor;
      }
    }
    return colorMap;
  }, [items]);

  const platformColors = useMemo(() => {
    const colorMap: Record<string, string> = {};
    for (const item of items) {
      for (const platform of item.platforms) {
        if (platform.color && !colorMap[platform.name]) {
          colorMap[platform.name] = platform.color;
        }
      }
    }
    return colorMap;
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch) ||
        item.category?.toLowerCase().includes(normalizedSearch) ||
        item.platforms.some((plat) =>
          plat.name.toLowerCase().includes(normalizedSearch)
        );

      const matchesCategories =
        selectedCategories.length === 0 ||
        selectedCategories.some((selectedCat) => item.category === selectedCat);

      const matchesPlatforms =
        selectedPlatforms.length === 0 ||
        selectedPlatforms.some((selectedPlat) =>
          item.platforms.some((plat) => plat.name === selectedPlat)
        );

      return matchesSearch && matchesCategories && matchesPlatforms;
    });
  }, [items, search, selectedCategories, selectedPlatforms]);

  const toggleCategory = (category: string) => {
    const nextCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((value) => value !== category)
      : [...selectedCategories, category];

    const params = new URLSearchParams(searchParams.toString());
    if (nextCategories.length > 0) {
      params.set("categories", nextCategories.join(","));
    } else {
      params.delete("categories");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const togglePlatform = (platform: string) => {
    const nextPlatforms = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter((value) => value !== platform)
      : [...selectedPlatforms, platform];

    const params = new URLSearchParams(searchParams.toString());
    if (nextPlatforms.length > 0) {
      params.set("platforms", nextPlatforms.join(","));
    } else {
      params.delete("platforms");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("categories");
    params.delete("platforms");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const hasActiveFilters =
    selectedCategories.length > 0 || selectedPlatforms.length > 0;

  if (items.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground text-sm">
        No items found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredItems.length === 0 ? (
        <div className="flex h-40 items-center justify-center text-muted-foreground text-sm">
          No items match your filters.
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse text-lg">
            <thead>
              <tr className="bg-muted/50 text-left text-muted-foreground text-xs">
                <th className="w-[700px] px-4 py-2.5 font-medium lg:pl-[10rem]">
                  Name
                </th>
                <th className="px-4 py-2.5 font-medium">Description</th>
                <th className="w-[350px] px-4 py-2.5 font-medium">
                  <div className="flex items-center gap-2">
                    {allCategories.length > 0 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-1.5 transition-colors hover:text-foreground">
                            Category
                            {selectedCategories.length > 0 && (
                              <Badge
                                className="h-4 rounded-sm px-1.5 text-[10px]"
                                variant="secondary"
                              >
                                {selectedCategories.length}
                              </Badge>
                            )}
                            <ChevronDownIcon className="size-3.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="max-h-[300px] w-56 overflow-y-auto">
                          <DropdownMenuLabel>
                            Filter by Category
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {allCategories.map((category) => (
                            <DropdownMenuCheckboxItem
                              checked={selectedCategories.includes(category)}
                              key={category}
                              onCheckedChange={() => toggleCategory(category)}
                              onSelect={(e) => e.preventDefault()}
                            >
                              <span
                                className={cn(
                                  "mr-2 h-2 w-2 rounded-full",
                                  NOTION_COLOR_MAP[categoryColors[category]] ??
                                    NOTION_COLOR_MAP.default
                                )}
                              />
                              {category}
                            </DropdownMenuCheckboxItem>
                          ))}
                          {selectedCategories.length > 0 && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={clearFilters}>
                                Clear filters
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    {allCategories.length === 0 && "Category"}
                  </div>
                </th>
                <th className="w-[500px] px-4 py-2.5 font-medium">
                  <div className="flex items-center gap-2">
                    {allPlatforms.length > 0 && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="flex items-center gap-1.5 transition-colors hover:text-foreground">
                            Platforms
                            {selectedPlatforms.length > 0 && (
                              <Badge
                                className="h-4 rounded-sm px-1.5 text-[10px]"
                                variant="secondary"
                              >
                                {selectedPlatforms.length}
                              </Badge>
                            )}
                            <ChevronDownIcon className="size-3.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="max-h-[300px] w-56 overflow-y-auto">
                          <DropdownMenuLabel>
                            Filter by Platform
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {allPlatforms.map((platform) => (
                            <DropdownMenuCheckboxItem
                              checked={selectedPlatforms.includes(platform)}
                              key={platform}
                              onCheckedChange={() => togglePlatform(platform)}
                              onSelect={(e) => e.preventDefault()}
                            >
                              <span
                                className={cn(
                                  "mr-2 h-2 w-2 rounded-full",
                                  NOTION_COLOR_MAP[platformColors[platform]] ??
                                    NOTION_COLOR_MAP.default
                                )}
                              />
                              {platform}
                            </DropdownMenuCheckboxItem>
                          ))}
                          {selectedPlatforms.length > 0 && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={clearFilters}>
                                Clear filters
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                    {allPlatforms.length === 0 && "Platforms"}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
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
      )}

      {/* Floating Search Bar */}
      <div className="fixed bottom-6 left-1/2 z-999 -translate-x-1/2 px-6">
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            isSearchFocused ? "w-[600px]" : "w-48"
          )}
        >
          <Input
            className="h-14 rounded-3xl border-0 bg-background/70 pl-6 shadow-xl backdrop-blur-xl"
            onBlur={() => setIsSearchFocused(false)}
            onChange={(event) => setInputValue(event.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Search"
            value={inputValue}
          />
        </div>
      </div>
    </div>
  );
}
