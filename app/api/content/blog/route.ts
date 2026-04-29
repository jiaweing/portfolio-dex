import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/notion";

export const revalidate = 1800;

export async function GET() {
  const posts = await getBlogPosts();
  return NextResponse.json(
    { posts, generatedAt: Date.now() },
    {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
      },
    }
  );
}
