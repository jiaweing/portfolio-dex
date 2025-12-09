interface PostTagsProps {
  tags?: string[];
}

export function PostTags({ tags }: PostTagsProps) {
  if (!tags || tags.length === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <span>•</span>
      <div className="flex gap-1">
        {tags.map((tag) => (
          <span key={tag} className="capitalize">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
