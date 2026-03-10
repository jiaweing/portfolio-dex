"use client";

import { formatDate } from "date-fns";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BlogPostHoverCard } from "@/components/blog/BlogPostHoverCard";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/notion";
import { getTagColorClass } from "@/lib/tag-colors";

interface BlogPostListProps {
  posts: BlogPost[];
}

export function BlogPostList({ posts }: BlogPostListProps) {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    for (const post of posts) {
      for (const tag of post.tags ?? []) {
        tags.add(tag);
      }
    }

    return [...tags].sort((a, b) => a.localeCompare(b));
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

  const groups = useMemo(() => {
    const grouped: { label: string; posts: BlogPost[] }[] = [];

    for (const post of filteredPosts) {
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

    return grouped;
  }, [filteredPosts]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((value) => value !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6 pt-6 pb-10 text-sm leading-relaxed">
      <div className="space-y-3">
        <Input
          className="border-0 bg-muted shadow-none"
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search posts..."
          value={search}
        />
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Toggle
              aria-label={`Filter by ${tag}`}
              className="h-8 gap-1.5 border-0 px-2 shadow-none"
              key={tag}
              onPressedChange={() => toggleTag(tag)}
              pressed={selectedTags.includes(tag)}
              size="sm"
              variant="default"
            >
              <span
                className={cn("h-1.5 w-1.5 rounded-full", getTagColorClass(tag))}
              />
              <span className="capitalize">{tag}</span>
            </Toggle>
          ))}
        </div>
      </div>

      {groups.length === 0 && (
        <p className="text-muted-foreground text-sm">No posts found.</p>
      )}

      <TooltipProvider>
        {groups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 font-medium text-muted-foreground">{group.label}</p>
            <div className="grid gap-1 space-y-1">
              {group.posts.map((post) => (
                <article
                  className="group relative flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                  key={post.id}
                >
                  <div className="flex min-w-0 items-center gap-2">
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
                        className="min-w-0 truncate font-medium text-foreground hover:underline"
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
                                getTagColorClass(tag)
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
      </TooltipProvider>
    </div>
  );
}
