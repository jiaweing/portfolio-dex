import { PostDate } from "@/components/blog/PostDate";
import { PostTags } from "@/components/blog/PostTags";
import { FadeIn } from "@/components/ui/fade-in";
import { getBlogPosts } from "@/lib/notion";
import Link from "next/link";

export const revalidate = 3600; // Update every hour

export const metadata = {
  title: "Blog",
  description: "Thoughts on software engineering, design, and technology.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <FadeIn>
        <h3 className="font-semibold mb-2">blog</h3>
      </FadeIn>
      <div className="grid gap-10 space-y-1 text-sm leading-relaxed">
        {posts.map((post, index) => (
          <FadeIn key={post.id} delay={index * 0.1}>
            <article className="group relative flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-8 last:border-0 gap-2">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:underline font-medium text-foreground truncate min-w-0 max-w-sm"
              >
                {post.title}
              </Link>
              <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                <PostDate date={post.date} />
                <PostTags tags={post.tags} />
              </div>
            </article>
          </FadeIn>
        ))}
        {posts.length === 0 && (
          <p className="text-muted-foreground">No posts found.</p>
        )}
      </div>
    </>
  );
}
