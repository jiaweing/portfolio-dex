import Link from "next/link";
import { PostDate } from "@/components/blog/PostDate";
import { PostTags } from "@/components/blog/PostTags";
import { FadeIn } from "@/components/ui/fade-in";
import { generateMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/lib/notion";

export const revalidate = 3600; // Update every hour

export const metadata = generateMetadata({
  title: "Blog",
  description: "Thoughts on software engineering, design, and technology.",
  url: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <FadeIn>
        <h3 className="mb-2 font-semibold">blog</h3>
      </FadeIn>
      <div className="grid gap-1 space-y-1 text-sm leading-relaxed">
        {posts.map((post, index) => (
          <FadeIn delay={index * 0.1} key={post.id}>
            <article className="group relative flex flex-col gap-2 border-b last:border-0 sm:flex-row sm:items-center sm:justify-between">
              <Link
                className="min-w-0 max-w-sm truncate font-medium text-foreground hover:underline"
                href={`/blog/${post.slug}`}
              >
                {post.title}
              </Link>
              <div className="flex shrink-0 items-center gap-2 text-muted-foreground text-sm">
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
