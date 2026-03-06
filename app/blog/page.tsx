import { formatDate } from "date-fns";
import Link from "next/link";
import { PostTags } from "@/components/blog/PostTags";
import { FadeIn } from "@/components/ui/fade-in";
import { generateMetadata } from "@/lib/metadata";
import { getBlogPosts } from "@/lib/notion";

export const revalidate = 3600;

export const metadata = generateMetadata({
  title: "Blog",
  description: "Thoughts on software engineering, design, and technology.",
  url: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();

  // Group posts by "MMM yyyy" (e.g. "Mar 2026"), preserving newest-first order
  const groups: { label: string; posts: typeof posts }[] = [];
  for (const post of posts) {
    const label = post.date
      ? formatDate(new Date(post.date), "MMM yyyy")
      : "Unknown";
    const existing = groups.find((g) => g.label === label);
    if (existing) {
      existing.posts.push(post);
    } else {
      groups.push({ label, posts: [post] });
    }
  }

  return (
    <>
      <FadeIn>
        <h3 className="mb-4 font-semibold">blog</h3>
      </FadeIn>
      {posts.length === 0 && (
        <p className="text-muted-foreground text-sm">No posts found.</p>
      )}
      <div className="space-y-6 text-sm leading-relaxed">
        {groups.map((group, groupIndex) => (
          <FadeIn delay={groupIndex * 0.05} key={group.label}>
            <div>
              <p className="mb-2 font-medium text-muted-foreground">
                {group.label}
              </p>
              <div className="grid gap-1 space-y-1">
                {group.posts.map((post) => (
                  <article
                    className="group relative flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                    key={post.id}
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      {post.date && (
                        <time
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded border font-medium text-xs tabular-nums"
                          dateTime={post.date}
                        >
                          {formatDate(new Date(post.date), "d")}
                        </time>
                      )}
                      <Link
                        className="min-w-0 truncate font-medium text-foreground hover:underline"
                        href={`/blog/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 text-muted-foreground text-sm">
                      <PostTags tags={post.tags} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
