"use client";

import { formatDate } from "date-fns";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
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

export function BlogPostList({ posts }: BlogPostListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
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

  const updateSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim().length > 0) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="space-y-6 pt-3 pb-10 text-sm leading-relaxed">
      <div className="space-y-3">
        <FadeIn delay={0}>
          <Input
            className="!text-xl h-14 rounded-3xl border-0 bg-muted shadow-none"
            onChange={(event) => updateSearch(event.target.value)}
            placeholder="Search posts..."
            value={search}
          />
        </FadeIn>
        <FadeIn delay={0.05}>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Toggle
                aria-label={`Filter by ${tag}`}
                className="h-8 gap-1.5 border-0 px-2 text-foreground shadow-none hover:text-current"
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
      </div>

      {groups.length === 0 && (
        <p className="text-muted-foreground text-sm">No posts found.</p>
      )}

      <FadeIn delay={0.1}>
        <TooltipProvider>
          <div className="group/list space-y-6">
            {!hasActiveFilters && pinnedPosts.length > 0 && (
              <>
                <p className="mb-2 font-medium text-muted-foreground">Pinned</p>
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
                            className="relative z-10 min-w-0 cursor-pointer truncate text-foreground"
                            href={`/blog/${post.slug}`}
                          >
                            {post.title}
                          </Link>
                        </BlogPostHoverCard>
                      </div>
                      {post.date && (
                        <time
                          className="relative z-10 shrink-0 text-muted-foreground text-xs tabular-nums"
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
                            className="relative z-10 min-w-0 cursor-pointer truncate text-foreground"
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
                                    getTagColorClass(tag, post.tagColors?.[tag])
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
    </div>
  );
}
