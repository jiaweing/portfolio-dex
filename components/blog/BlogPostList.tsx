"use client";

import { useQuery } from "@tanstack/react-query";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  formatDate,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  List,
  Radio,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BlogPostHoverCard } from "@/components/blog/BlogPostHoverCard";
import { ScrollProgress } from "@/components/core/scroll-progress";
import { FadeIn } from "@/components/ui/fade-in";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { BlogPost } from "@/lib/notion";
import { getTagColorClass } from "@/lib/tag-colors";
import { cn } from "@/lib/utils";

interface BlogPostListProps {
  allPosts: BlogPost[];
  ssrGeneratedAt: number;
}

const PAGE_SIZE = 10;
const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function BlogPostList({ allPosts, ssrGeneratedAt }: BlogPostListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") ?? "";
  const [inputValue, setInputValue] = useState(urlSearch);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const viewMode = (
    searchParams.get("view") === "calendar" ? "calendar" : "list"
  ) as "list" | "calendar";

  const setViewMode = (mode: "list" | "calendar") => {
    const params = new URLSearchParams(searchParams.toString());
    if (mode === "calendar") {
      params.set("view", "calendar");
    } else {
      params.delete("view");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };
  const [calendarDate, setCalendarDate] = useState(() =>
    startOfMonth(new Date())
  );
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [pickerYear, setPickerYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    setInputValue(urlSearch);
  }, [urlSearch]);

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
  const selectedTags = useMemo(() => {
    const tags = searchParams.get("category");
    if (!tags) return [];
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, [searchParams]);

  const selectedPostTags = useMemo(() => {
    const posttags = searchParams.get("tags");
    if (!posttags) return [];
    return posttags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, [searchParams]);

  const { data } = useQuery<{ posts: BlogPost[]; generatedAt: number }>({
    queryKey: ["blog-posts-full"],
    queryFn: async () => {
      const res = await fetch("/api/content/blog");
      if (!res.ok) throw new Error("Failed to fetch posts");
      return res.json();
    },
    initialData: { posts: allPosts, generatedAt: ssrGeneratedAt },
    initialDataUpdatedAt: ssrGeneratedAt,
    staleTime: 1_800_000,
  });

  const posts = data.posts;

  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setDisplayCount(PAGE_SIZE);
  }, [search, selectedTags.join(","), selectedPostTags.join(",")]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const post of posts) {
      for (const tag of post.tags ?? []) {
        tags.add(tag);
      }
    }
    return [...tags].sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const allPostTags = useMemo(() => {
    const tags = new Set<string>();
    for (const post of posts) {
      for (const tag of post.postTags ?? []) {
        tags.add(tag);
      }
    }
    return [...tags].sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const tagColors = useMemo(() => {
    const colorMap: Record<string, string> = {};
    for (const post of posts) {
      for (const tag of post.tags ?? []) {
        const color = post.tagColors?.[tag];
        if (color && !colorMap[tag]) {
          colorMap[tag] = color;
        }
      }
    }
    return colorMap;
  }, [posts]);

  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const post of posts) {
      const matchesPostTags =
        selectedPostTags.length === 0 ||
        selectedPostTags.some((t) => post.postTags?.includes(t));
      if (!matchesPostTags) continue;
      for (const tag of post.tags ?? []) {
        counts[tag] = (counts[tag] ?? 0) + 1;
      }
    }
    return counts;
  }, [posts, selectedPostTags]);

  const postTagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const post of posts) {
      const matchesCat =
        selectedTags.length === 0 ||
        selectedTags.some((t) => post.tags?.includes(t));
      if (!matchesCat) continue;
      for (const tag of post.postTags ?? []) {
        counts[tag] = (counts[tag] ?? 0) + 1;
      }
    }
    return counts;
  }, [posts, selectedTags]);

  const [tagsExpanded, setTagsExpanded] = useState(
    () => selectedPostTags.length > 0
  );

  const hasActiveFilters =
    search.trim().length > 0 ||
    selectedTags.length > 0 ||
    selectedPostTags.length > 0;

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        search.length === 0 ||
        post.title.toLowerCase().includes(search) ||
        post.description.toLowerCase().includes(search) ||
        post.tags?.some((t) => t.toLowerCase().includes(search));
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((t) => post.tags?.includes(t));
      const matchesPostTags =
        selectedPostTags.length === 0 ||
        selectedPostTags.some((t) => post.postTags?.includes(t));
      return matchesSearch && matchesTags && matchesPostTags;
    });
  }, [posts, search, selectedTags, selectedPostTags]);

  const visiblePosts = filteredPosts.slice(0, displayCount);
  const hasMore = displayCount < filteredPosts.length;

  const { pinnedPosts, groups } = useMemo(() => {
    const pinned: BlogPost[] = [];
    const grouped: { label: string; posts: BlogPost[] }[] = [];

    if (!hasActiveFilters) {
      for (const post of posts) {
        if (post.pinned) pinned.push(post);
      }
    }

    for (const post of visiblePosts) {
      const label = post.date
        ? formatDate(new Date(post.date), "MMM yyyy")
        : "Unknown";
      const existing = grouped.find((group) => group.label === label);
      if (existing) {
        existing.posts.push(post);
      } else {
        grouped.push({ label, posts: [post] });
      }
    }

    return { pinnedPosts: pinned, groups: grouped };
  }, [visiblePosts, posts, hasActiveFilters]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setDisplayCount((c) => c + PAGE_SIZE);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore]);

  const postsByDay = useMemo(() => {
    const map = new Map<string, BlogPost[]>();
    for (const post of posts) {
      if (!post.date) continue;
      const key = formatDate(new Date(post.date), "yyyy-MM-dd");
      const existing = map.get(key);
      if (existing) {
        existing.push(post);
      } else {
        map.set(key, [post]);
      }
    }
    return map;
  }, [posts]);

  const filteredPostsByDay = useMemo(() => {
    if (selectedTags.length === 0 && selectedPostTags.length === 0)
      return postsByDay;
    const map = new Map<string, BlogPost[]>();
    for (const [key, dayPosts] of postsByDay) {
      const filtered = dayPosts.filter((post) => {
        const matchesCat =
          selectedTags.length === 0 ||
          selectedTags.some((tag) => post.tags?.includes(tag));
        const matchesPostTags =
          selectedPostTags.length === 0 ||
          selectedPostTags.some((tag) => post.postTags?.includes(tag));
        return matchesCat && matchesPostTags;
      });
      if (filtered.length > 0) map.set(key, filtered);
    }
    return map;
  }, [postsByDay, selectedTags, selectedPostTags]);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(calendarDate);
    const monthEnd = endOfMonth(calendarDate);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [calendarDate]);

  const selectedDayPosts = useMemo(() => {
    if (!selectedDay) return [];
    const key = formatDate(selectedDay, "yyyy-MM-dd");
    return filteredPostsByDay.get(key) ?? [];
  }, [selectedDay, filteredPostsByDay]);

  const currentMonthPostCount = useMemo(() => {
    const monthKey = formatDate(calendarDate, "yyyy-MM");
    let count = 0;
    for (const [key, dayPosts] of filteredPostsByDay) {
      if (key.startsWith(monthKey)) count += dayPosts.length;
    }
    return count;
  }, [calendarDate, filteredPostsByDay]);

  const { minMonth, maxMonth } = useMemo(() => {
    const dates = posts
      .filter((p) => p.date)
      .map((p) => startOfMonth(new Date(p.date!)));
    const min =
      dates.length > 0
        ? dates.reduce((a, b) => (a < b ? a : b))
        : startOfMonth(new Date());
    return { minMonth: min, maxMonth: startOfMonth(new Date()) };
  }, [posts]);

  const toggleTag = (tag: string) => {
    const nextTags = selectedTags.includes(tag)
      ? selectedTags.filter((value) => value !== tag)
      : [...selectedTags, tag];

    const params = new URLSearchParams(searchParams.toString());
    if (nextTags.length > 0) {
      params.set("category", nextTags.join(","));
    } else {
      params.delete("category");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const togglePostTag = (tag: string) => {
    const nextTags = selectedPostTags.includes(tag)
      ? selectedPostTags.filter((value) => value !== tag)
      : [...selectedPostTags, tag];

    const params = new URLSearchParams(searchParams.toString());
    if (nextTags.length > 0) {
      params.set("tags", nextTags.join(","));
    } else {
      params.delete("tags");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const handlePrevMonth = () => {
    setCalendarDate((d) => {
      const prev = new Date(d);
      prev.setMonth(prev.getMonth() - 1);
      return startOfMonth(prev);
    });
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCalendarDate((d) => {
      const next = new Date(d);
      next.setMonth(next.getMonth() + 1);
      return startOfMonth(next);
    });
    setSelectedDay(null);
  };

  const handleDayClick = (day: Date) => {
    const key = formatDate(day, "yyyy-MM-dd");
    if (!postsByDay.has(key)) return;
    setSelectedDay((prev) => (prev && isSameDay(prev, day) ? null : day));
  };

  const canGoPrev = calendarDate > minMonth;
  const canGoNext = calendarDate < maxMonth;

  return (
    <div className="space-y-6 pt-3 pb-10 text-sm leading-relaxed">
      <ScrollProgress className="fixed top-0 left-0 z-50 w-full bg-[#0090FF]" />
      <FadeIn delay={0}>
        <div className="mb-4 flex items-center gap-2">
          <h3 className="font-semibold">writing</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  aria-label="RSS feed"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href="/feed.xml"
                >
                  <Radio className="h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Subscribe to my RSS feed to get new posts in your reader</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="ml-auto flex shrink-0 items-center">
            <Toggle
              aria-label="List view"
              onPressedChange={() => setViewMode("list")}
              pressed={viewMode === "list"}
              size="sm"
            >
              <List />
            </Toggle>
            <Toggle
              aria-label="Calendar view"
              onPressedChange={() => setViewMode("calendar")}
              pressed={viewMode === "calendar"}
              size="sm"
            >
              <CalendarDays />
            </Toggle>
          </div>
        </div>
      </FadeIn>

      <div className="space-y-3">
        <FadeIn delay={0}>
          <div className="relative z-0 mx-2 -mb-4 rounded-xl rounded-b-none bg-muted/50">
            <div className="flex flex-wrap items-center justify-center px-1 py-2">
              {allTags
                .filter(
                  (tag) =>
                    (tagCounts[tag] ?? 0) > 0 || selectedTags.includes(tag)
                )
                .sort((a, b) => (tagCounts[b] ?? 0) - (tagCounts[a] ?? 0))
                .map((tag) => (
                  <Toggle
                    aria-label={`Filter by ${tag}`}
                    className="h-7 gap-1.5 border-0 px-2 text-foreground text-xs shadow-none hover:text-current"
                    key={tag}
                    onPressedChange={() => toggleTag(tag)}
                    pressed={selectedTags.includes(tag)}
                    size="sm"
                    variant="default"
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        getTagColorClass(tag, tagColors[tag])
                      )}
                    />
                    <span className="capitalize">{tag}</span>
                    {(tagCounts[tag] ?? 0) > 0 && (
                      <span className="text-muted-foreground/40">
                        {tagCounts[tag]}
                      </span>
                    )}
                  </Toggle>
                ))}
              {hasActiveFilters && (
                <button
                  aria-label="Clear all filters"
                  className="flex h-7 items-center rounded px-2 text-muted-foreground/50 text-xs transition-colors hover:text-muted-foreground"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("search");
                    params.delete("category");
                    params.delete("tags");
                    setInputValue("");
                    const query = params.toString();
                    router.replace(query ? `${pathname}?${query}` : pathname, {
                      scroll: false,
                    });
                  }}
                  type="button"
                >
                  ×
                </button>
              )}
              {allPostTags.length > 0 && (
                <button
                  aria-label={tagsExpanded ? "Collapse tags" : "Expand tags"}
                  className="flex h-7 items-center gap-0.5 rounded px-2 text-muted-foreground/50 text-xs transition-colors hover:text-muted-foreground"
                  onClick={() => setTagsExpanded((v) => !v)}
                  type="button"
                >
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform",
                      tagsExpanded && "rotate-180"
                    )}
                  />
                </button>
              )}
            </div>

            {allPostTags.length > 0 && tagsExpanded && (
              <div className="flex flex-wrap justify-center border-muted-foreground/10 border-t px-1 py-2">
                {allPostTags
                  .filter(
                    (tag) =>
                      (postTagCounts[tag] ?? 0) > 0 ||
                      selectedPostTags.includes(tag)
                  )
                  .sort(
                    (a, b) => (postTagCounts[b] ?? 0) - (postTagCounts[a] ?? 0)
                  )
                  .map((tag) => (
                    <Toggle
                      aria-label={`Filter by tag ${tag}`}
                      className="h-7 gap-1.5 border-0 px-2 text-foreground text-xs shadow-none hover:text-current"
                      key={tag}
                      onPressedChange={() => togglePostTag(tag)}
                      pressed={selectedPostTags.includes(tag)}
                      size="sm"
                      variant="default"
                    >
                      <span className="capitalize">{tag}</span>
                      {(postTagCounts[tag] ?? 0) > 0 && (
                        <span className="text-muted-foreground/40">
                          {postTagCounts[tag]}
                        </span>
                      )}
                    </Toggle>
                  ))}
              </div>
            )}
          </div>
        </FadeIn>
        <FadeIn delay={0.05}>
          <Input
            className="!bg-muted relative z-10 h-12 border-0 shadow-none"
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Search"
            value={inputValue}
          />
        </FadeIn>
      </div>

      {viewMode === "calendar" && (
        <FadeIn delay={0.1}>
          <div className="space-y-4">
            {/* Calendar header */}
            <div className="flex items-center justify-between">
              <button
                aria-label="Previous month"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                  showMonthPicker
                    ? pickerYear > minMonth.getFullYear()
                      ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                      : "cursor-default text-muted-foreground/30"
                    : canGoPrev
                      ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                      : "cursor-default text-muted-foreground/30"
                )}
                disabled={
                  showMonthPicker
                    ? pickerYear <= minMonth.getFullYear()
                    : !canGoPrev
                }
                onClick={() => {
                  if (showMonthPicker) {
                    setPickerYear((y) => y - 1);
                  } else {
                    handlePrevMonth();
                  }
                }}
                type="button"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex flex-col items-center gap-0.5">
                <button
                  className="font-medium text-sm transition-colors hover:text-muted-foreground"
                  onClick={() => {
                    setPickerYear(calendarDate.getFullYear());
                    setShowMonthPicker((v) => !v);
                  }}
                  type="button"
                >
                  {showMonthPicker
                    ? pickerYear
                    : formatDate(calendarDate, "MMMM yyyy")}
                </button>
                {!showMonthPicker && (
                  <div className="flex items-center gap-2">
                    {currentMonthPostCount > 0 && (
                      <span className="text-muted-foreground text-xs">
                        {currentMonthPostCount}{" "}
                        {currentMonthPostCount === 1 ? "post" : "posts"}
                      </span>
                    )}
                    {!isSameMonth(calendarDate, new Date()) && (
                      <button
                        className="text-muted-foreground text-xs underline-offset-2 transition-colors hover:text-foreground hover:underline"
                        onClick={() => {
                          setCalendarDate(startOfMonth(new Date()));
                          setSelectedDay(null);
                        }}
                        type="button"
                      >
                        today
                      </button>
                    )}
                  </div>
                )}
              </div>
              <button
                aria-label="Next month"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md transition-colors",
                  showMonthPicker
                    ? pickerYear < maxMonth.getFullYear()
                      ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                      : "cursor-default text-muted-foreground/30"
                    : canGoNext
                      ? "text-muted-foreground hover:bg-muted hover:text-foreground"
                      : "cursor-default text-muted-foreground/30"
                )}
                disabled={
                  showMonthPicker
                    ? pickerYear >= maxMonth.getFullYear()
                    : !canGoNext
                }
                onClick={() => {
                  if (showMonthPicker) {
                    setPickerYear((y) => y + 1);
                  } else {
                    handleNextMonth();
                  }
                }}
                type="button"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Month picker grid */}
            {showMonthPicker && (
              <div className="grid grid-cols-3 gap-1">
                {Array.from({ length: 12 }, (_, i) => {
                  const monthDate = new Date(pickerYear, i, 1);
                  const isDisabled =
                    monthDate < minMonth || monthDate > maxMonth;
                  const isActive = isSameMonth(monthDate, calendarDate);
                  return (
                    <button
                      className={cn(
                        "rounded-md px-2 py-2 font-medium text-xs transition-colors",
                        isDisabled
                          ? "cursor-default text-muted-foreground/30"
                          : isActive
                            ? "bg-foreground text-background"
                            : "hover:bg-muted"
                      )}
                      disabled={isDisabled}
                      key={i}
                      onClick={() => {
                        setCalendarDate(startOfMonth(monthDate));
                        setSelectedDay(null);
                        setShowMonthPicker(false);
                      }}
                      type="button"
                    >
                      {formatDate(monthDate, "MMM")}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 text-center">
              {DAY_LABELS.map((label) => (
                <div
                  className="py-1 font-medium text-muted-foreground text-xs"
                  key={label}
                >
                  {label}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day) => {
                const key = formatDate(day, "yyyy-MM-dd");
                const dayPosts = filteredPostsByDay.get(key) ?? [];
                const hasPosts = dayPosts.length > 0;
                const isCurrentMonth = isSameMonth(day, calendarDate);
                const isSelected = selectedDay
                  ? isSameDay(day, selectedDay)
                  : false;
                const isTodayDate = isToday(day);

                return (
                  <button
                    className={cn(
                      "relative flex min-h-[3rem] flex-col items-center gap-1 rounded-md p-1.5 text-xs transition-colors",
                      isCurrentMonth
                        ? "text-foreground"
                        : "text-muted-foreground/40",
                      hasPosts && isCurrentMonth
                        ? "cursor-pointer hover:bg-muted"
                        : "cursor-default",
                      isSelected ? "bg-muted" : "bg-transparent"
                    )}
                    disabled={!(hasPosts && isCurrentMonth)}
                    key={key}
                    onClick={() => handleDayClick(day)}
                    type="button"
                  >
                    <span
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full font-medium tabular-nums",
                        isTodayDate && "bg-foreground text-background"
                      )}
                    >
                      {formatDate(day, "d")}
                    </span>
                    {hasPosts && isCurrentMonth && (
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="flex flex-wrap justify-center gap-0.5">
                          {dayPosts
                            .slice(0, 3)
                            .flatMap((post) =>
                              (post.tags ?? [])
                                .slice(0, 2)
                                .map((tag) => (
                                  <span
                                    className={cn(
                                      "h-1 w-1 rounded-full",
                                      getTagColorClass(
                                        tag,
                                        post.tagColors?.[tag]
                                      )
                                    )}
                                    key={`${post.id}-${tag}`}
                                  />
                                ))
                            )}
                        </div>
                        <span
                          className="text-muted-foreground tabular-nums"
                          style={{ fontSize: "0.6rem" }}
                        >
                          {dayPosts.length}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Expanded day posts */}
            {selectedDay && selectedDayPosts.length > 0 && (
              <div>
                <p className="mb-2 font-medium text-muted-foreground">
                  {formatDate(selectedDay, "MMMM d, yyyy")}
                </p>
                <TooltipProvider>
                  <div className="group/list grid gap-1 space-y-1">
                    {selectedDayPosts.map((post) => (
                      <article
                        className="group hover:!opacity-100 hit-area-y-2 relative flex flex-col gap-2 transition-opacity duration-1000 ease-out hover:duration-50 group-hover/list:opacity-30 sm:flex-row sm:items-center sm:justify-between"
                        key={post.id}
                        style={{ pointerEvents: "auto" }}
                      >
                        <div className="relative z-10 flex min-w-0 items-center gap-2">
                          {post.date && (
                            <time
                              className="flex h-6 w-6 shrink-0 items-center justify-center rounded border font-medium text-xs tabular-nums"
                              dateTime={post.date}
                            >
                              {formatDate(new Date(post.date), "d")}
                            </time>
                          )}
                          <BlogPostHoverCard post={post}>
                            <Link
                              className="relative z-10 min-w-0 cursor-pointer truncate text-foreground leading-relaxed"
                              href={`/blog/${post.slug}`}
                            >
                              {post.title}
                            </Link>
                          </BlogPostHoverCard>
                          <div className="flex items-center gap-1">
                            {post.tags?.map((tag) => (
                              <Tooltip key={`${post.id}-${tag}`}>
                                <TooltipTrigger asChild>
                                  <span
                                    className={cn(
                                      "inline-flex h-1.5 w-1.5 shrink-0 rounded-full",
                                      getTagColorClass(
                                        tag,
                                        post.tagColors?.[tag]
                                      )
                                    )}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="flex flex-col gap-0.5">
                                    <p className="capitalize">{tag}</p>
                                    {post.postTags &&
                                      post.postTags.length > 0 && (
                                        <p className="text-muted-foreground/70">
                                          {post.postTags.join(", ")}
                                        </p>
                                      )}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            ))}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </TooltipProvider>
              </div>
            )}
          </div>
        </FadeIn>
      )}

      {viewMode === "list" && (
        <>
          {groups.length === 0 && (
            <p className="text-muted-foreground text-sm">No posts found.</p>
          )}

          <FadeIn delay={0.1}>
            <TooltipProvider>
              <div className="group/list space-y-6">
                {!hasActiveFilters && pinnedPosts.length > 0 && (
                  <>
                    <p className="mb-2 font-medium text-muted-foreground">
                      Pinned
                    </p>
                    <div className="grid gap-1 space-y-1">
                      {pinnedPosts.map((post) => (
                        <article
                          className="group hover:!opacity-100 hit-area-y-2 relative flex flex-col gap-2 transition-opacity duration-1000 ease-out hover:duration-50 group-hover/list:opacity-30 sm:flex-row sm:items-center sm:justify-between"
                          key={post.id}
                          style={{ pointerEvents: "auto" }}
                        >
                          <div className="relative z-10 flex min-w-0 items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center">
                              <div className="flex items-center gap-1">
                                {post.tags?.map((tag) => (
                                  <Tooltip key={`${post.id}-${tag}`}>
                                    <TooltipTrigger asChild>
                                      <span
                                        className={cn(
                                          "inline-flex h-1.5 w-1.5 shrink-0 rounded-full",
                                          getTagColorClass(
                                            tag,
                                            post.tagColors?.[tag]
                                          )
                                        )}
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <div className="flex flex-col gap-0.5">
                                        <p className="capitalize">{tag}</p>
                                        {post.postTags &&
                                          post.postTags.length > 0 && (
                                            <p className="text-muted-foreground/70">
                                              {post.postTags.join(", ")}
                                            </p>
                                          )}
                                      </div>
                                    </TooltipContent>
                                  </Tooltip>
                                ))}
                              </div>
                            </div>
                            <BlogPostHoverCard post={post}>
                              <Link
                                className="relative z-10 min-w-0 cursor-pointer truncate text-foreground leading-relaxed"
                                href={`/blog/${post.slug}`}
                              >
                                {post.title}
                              </Link>
                            </BlogPostHoverCard>
                          </div>
                          {post.date && (
                            <time
                              className="relative z-10 hidden shrink-0 text-muted-foreground text-xs tabular-nums sm:block"
                              dateTime={post.date}
                            >
                              {formatDate(new Date(post.date), "MMM d, yyyy")}
                            </time>
                          )}
                        </article>
                      ))}
                    </div>
                  </>
                )}

                {groups.map((group) => (
                  <div key={group.label}>
                    <p className="mb-2 font-medium text-muted-foreground">
                      {group.label}
                    </p>
                    <div className="grid gap-1 space-y-1">
                      {group.posts.map((post) => (
                        <article
                          className="group hover:!opacity-100 hit-area-y-2 relative flex flex-col gap-2 transition-opacity duration-1000 ease-out hover:duration-50 group-hover/list:opacity-30 sm:flex-row sm:items-center sm:justify-between"
                          key={post.id}
                          style={{ pointerEvents: "auto" }}
                        >
                          <div className="relative z-10 flex min-w-0 items-center gap-2">
                            {post.date && (
                              <time
                                className="flex h-6 w-6 shrink-0 items-center justify-center rounded border font-medium text-xs tabular-nums"
                                dateTime={post.date}
                              >
                                {formatDate(new Date(post.date), "d")}
                              </time>
                            )}
                            <BlogPostHoverCard post={post}>
                              <Link
                                className="relative z-10 min-w-0 cursor-pointer truncate text-foreground leading-relaxed"
                                href={`/blog/${post.slug}`}
                              >
                                {post.title}
                              </Link>
                            </BlogPostHoverCard>
                            <div className="flex items-center gap-1">
                              {post.tags?.map((tag) => (
                                <Tooltip key={`${post.id}-${tag}`}>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={cn(
                                        "inline-flex h-1.5 w-1.5 shrink-0 rounded-full",
                                        getTagColorClass(
                                          tag,
                                          post.tagColors?.[tag]
                                        )
                                      )}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="flex flex-col gap-0.5">
                                      <p className="capitalize">{tag}</p>
                                      {post.postTags &&
                                        post.postTags.length > 0 && (
                                          <p className="text-muted-foreground/70">
                                            {post.postTags.join(", ")}
                                          </p>
                                        )}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              ))}
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TooltipProvider>
          </FadeIn>

          {/* Infinite scroll sentinel */}
          <div className="h-4" ref={sentinelRef} />
          {hasMore && (
            <div className="flex justify-center">
              <button
                className="flex items-center gap-1.5 text-muted-foreground text-xs transition-colors hover:text-foreground"
                onClick={() => setDisplayCount((c) => c + PAGE_SIZE)}
                type="button"
              >
                <ChevronDown className="h-3.5 w-3.5" />
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
