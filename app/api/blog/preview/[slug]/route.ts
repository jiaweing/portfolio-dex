import { type NextRequest, NextResponse } from "next/server";
import { extractDescriptionFromBlocks, getBlogPost } from "@/lib/notion";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { post, blocks } = await getBlogPost(slug);

  if (!post) {
    return NextResponse.json({ description: null }, { status: 404 });
  }

  const description =
    post.description || extractDescriptionFromBlocks(blocks, 300);

  return NextResponse.json({
    description,
    readingTime: post.readingTime,
    cover: post.cover,
  });
}
