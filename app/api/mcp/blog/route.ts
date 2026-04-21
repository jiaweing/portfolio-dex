import { getBlogPosts } from "@/lib/notion";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getBlogPosts().catch(() => []);
  const data = posts.map((p) => ({
    title: p.title,
    slug: p.slug,
    date: p.date,
    description: p.description,
    tags: p.tags,
    url: `https://jiaweing.com/blog/${p.slug}`,
  }));
  return Response.json(data);
}
