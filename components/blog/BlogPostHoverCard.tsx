"use client";

import { formatDate } from "date-fns";
import { Clock } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogPost } from "@/lib/notion";

interface PreviewData {
  description: string | null;
  readingTime: number;
  cover: string | null;
}

interface BlogPostHoverCardProps {
  post: BlogPost;
  children: React.ReactNode;
}

export function BlogPostHoverCard({ post, children }: BlogPostHoverCardProps) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      timerRef.current = setTimeout(() => {
        setVisible(true);
        if (!fetchedRef.current) {
          fetchedRef.current = true;
          setLoading(true);
          fetch(`/api/blog/preview/${post.slug}`)
            .then((r) => r.json())
            .then((data: PreviewData) => {
              setPreview(data);
              setLoading(false);
            })
            .catch(() => setLoading(false));
        }
      }, 250);
    },
    [post.slug]
  );

  const handleMouseLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  const cardWidth = 320;
  const offsetX = 16;
  const offsetY = 12;

  const left =
    mounted && pos.x + offsetX + cardWidth > window.innerWidth
      ? pos.x - cardWidth - offsetX
      : pos.x + offsetX;
  const top = pos.y + offsetY;

  const cover = preview?.cover ?? post.cover;

  return (
    <>
      <span
        className="contents"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {children}
      </span>

      {mounted &&
        visible &&
        createPortal(
          <div
            className="pointer-events-none fixed z-50 w-80 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md"
            style={{ left, top }}
          >
            {cover && (
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <img
                  alt={post.title}
                  className="h-full w-full object-cover"
                  src={cover}
                />
              </div>
            )}
            <div className="flex flex-col gap-2 p-4">
              <p className="font-semibold text-sm leading-snug">{post.title}</p>

              <div className="flex flex-wrap items-center gap-1.5 text-muted-foreground text-xs">
                {post.date && (
                  <time dateTime={post.date}>
                    {formatDate(new Date(post.date), "MMMM d, yyyy")}
                  </time>
                )}
                {post.tags && post.tags.length > 0 && (
                  <>
                    <span>•</span>
                    {post.tags.map((tag) => (
                      <span className="capitalize" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </>
                )}
                {preview && preview.readingTime > 0 && (
                  <span className="inline-flex items-center gap-1">
                    <Clock aria-hidden="true" className="size-3" />
                    <span>
                      {preview.readingTime}{" "}
                      {preview.readingTime === 1 ? "min" : "mins"} read
                    </span>
                  </span>
                )}
              </div>

              {loading ? (
                <div className="flex flex-col gap-1.5 pt-1">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-5/6" />
                  <Skeleton className="h-3 w-4/6" />
                </div>
              ) : preview?.description ? (
                <p className="line-clamp-4 text-muted-foreground text-xs leading-relaxed">
                  {preview.description}
                </p>
              ) : null}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
