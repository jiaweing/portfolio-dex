const TAG_COLOR_CLASSES = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-lime-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
] as const;

const NOTION_TAG_COLOR_CLASS_MAP: Record<string, string> = {
  default: "bg-gray-500",
  gray: "bg-gray-500",
  brown: "bg-amber-700",
  orange: "bg-orange-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  red: "bg-red-500",
};

export function getTagColorClass(
  tag: string,
  notionColor?: string | null
): string {
  if (notionColor) {
    const mapped = NOTION_TAG_COLOR_CLASS_MAP[notionColor.toLowerCase()];
    if (mapped) return mapped;
  }

  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = (hash * 31 + tag.charCodeAt(i)) | 0;
  }

  const index = Math.abs(hash) % TAG_COLOR_CLASSES.length;
  return TAG_COLOR_CLASSES[index];
}
