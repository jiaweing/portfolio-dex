"use client";

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
  ChevronLeft,
  ChevronRight,
  List,
  Radio,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { BlogPostHoverCard } from "@/components/blog/BlogPostHoverCard";
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
  posts: BlogPost[];
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function BlogPostList({ posts }: BlogPostListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearch = searchParams.get("search") ?? "";
  const [inputValue, setInputValue] = useState(urlSearch);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [calendarDate, setCalendarDate] = useState(() =>
    startOfMonth(new Date())
  );
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [pickerYear, setPickerYear] = useState(() => new Date().getFullYear());

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
  const selectedTags = useMemo(() => {
    const tags = searchParams.get("tags");
    if (!tags) {
      return [];
    }

    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, [searchParams]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const post of posts) {
      for (const tag of post.tags ?? []) {
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

  const filteredPosts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        post.title.toLowerCase().includes(normalizedSearch) ||
        post.description.toLowerCase().includes(normalizedSearch) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((selectedTag) => post.tags?.includes(selectedTag));

      return matchesSearch && matchesTags;
    });
  }, [posts, search, selectedTags]);

  const { pinnedPosts, groups } = useMemo(() => {
    const pinned: BlogPost[] = [];
    const grouped: { label: string; posts: BlogPost[] }[] = [];

    for (const post of filteredPosts) {
      // Add to pinned list if pinned
      if (post.pinned) {
        pinned.push(post);
      }

      // Add to date groups (pinned posts appear in both)
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
  }, [filteredPosts]);

  // Map of date string (yyyy-MM-dd) -> posts for calendar view (uses all posts, no filters)
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
    return postsByDay.get(key) ?? [];
  }, [selectedDay, postsByDay]);

  const currentMonthPostCount = useMemo(() => {
    const monthKey = formatDate(calendarDate, "yyyy-MM");
    let count = 0;
    for (const [key] of postsByDay) {
      if (key.startsWith(monthKey)) count += postsByDay.get(key)!.length;
    }
    return count;
  }, [calendarDate, postsByDay]);

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

  const hasActiveFilters = search.trim().length > 0 || selectedTags.length > 0;

  const toggleTag = (tag: string) => {
    const nextTags = selectedTags.includes(tag)
      ? selectedTags.filter((value) => value !== tag)
      : [...selectedTags, tag];

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
          <div className="relative z-0 mx-2 -mb-4 flex flex-wrap justify-center rounded-xl rounded-b-none bg-muted/50 px-1 py-2">
            {allTags.map((tag) => (
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
              </Toggle>
            ))}
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
                const dayPosts = postsByDay.get(key) ?? [];
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
                                  <p className="capitalize">{tag}</p>
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
                                      <p className="capitalize">{tag}</p>
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
                                    <p className="capitalize">{tag}</p>
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
        </>
      )}
    </div>
  );
}
