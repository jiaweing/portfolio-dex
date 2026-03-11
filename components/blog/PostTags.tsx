import { getTagColorClass } from "@/lib/tag-colors";
import { cn } from "@/lib/utils";

interface PostTagsProps {
  tags?: string[];
  tagColors?: Record<string, string>;
}

export function PostTags({ tags, tagColors }: PostTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex items-center gap-1">
      {tags.map((tag) => (
        <span
          aria-label={tag}
          className={cn(
            "inline-flex h-1.5 w-1.5 shrink-0 rounded-full",
            getTagColorClass(tag, tagColors?.[tag])
          )}
          key={tag}
          title={tag}
        />
      ))}
    </div>
  );
}
