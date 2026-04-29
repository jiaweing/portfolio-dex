import { type NextRequest, NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/notion";

const DEFAULT_PAGE_SIZE = 10;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = searchParams.get("search")?.trim().toLowerCase() ?? "";
  const tags =
    searchParams
      .get("category")
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean) ?? [];
  const posttags =
    searchParams
      .get("tags")
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean) ?? [];
  const offset = Math.max(
    0,
    Number.parseInt(searchParams.get("offset") ?? "0", 10)
  );
  const limit = Math.max(
    1,
    Number.parseInt(searchParams.get("limit") ?? String(DEFAULT_PAGE_SIZE), 10)
  );

  const allPosts = await getBlogPosts();

  const filtered = allPosts.filter((post) => {
    const matchesSearch =
      search.length === 0 ||
      post.title.toLowerCase().includes(search) ||
      post.description.toLowerCase().includes(search) ||
      post.tags?.some((tag) => tag.toLowerCase().includes(search));

    const matchesTags =
      tags.length === 0 ||
      tags.some((selectedTag) => post.tags?.includes(selectedTag));

    const matchesPostTags =
      posttags.length === 0 ||
      posttags.some((selectedTag) => post.postTags?.includes(selectedTag));

    return matchesSearch && matchesTags && matchesPostTags;
  });

  const slice = filtered.slice(offset, offset + limit);
  const nextOffset =
    offset + slice.length < filtered.length ? offset + slice.length : null;

  return NextResponse.json({
    posts: slice,
    nextOffset,
    total: filtered.length,
  });
}
