import { formatDate } from "date-fns";
import Link from "next/link";
import { PostTags } from "@/components/blog/PostTags";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProfileBio } from "@/components/ProfileBio";
import { FadeIn } from "@/components/ui/fade-in";
import { PhotoGallery } from "@/components/ui/gallery";
import { generateMetadata } from "@/lib/metadata";
import { getBlogPosts, getProjects } from "@/lib/notion";
import JsonLd from "./jsonld";

export const metadata = generateMetadata({
  title: "Jia Wei Ng",
  description:
    "Just an ordinary guy who makes software, with unique and original digital experiences.",
  url: "/",
});

export default async function Home() {
  const [projects, allPosts] = await Promise.all([
    getProjects(),
    getBlogPosts(),
  ]);
  const recentPosts = allPosts.slice(0, 5);
  const groups: { label: string; posts: typeof recentPosts }[] = [];
  for (const post of recentPosts) {
    const label = post.date
      ? formatDate(new Date(post.date), "MMM yyyy")
      : "Unknown";
    const existing = groups.find((g) => g.label === label);
    if (existing) existing.posts.push(post);
    else groups.push({ label, posts: [post] });
  }

  return (
    <>
      <JsonLd />
      <ProfileBio />
      <FadeIn delay={0.2}>
        <div className="mt-16">
          <PhotoGallery />
        </div>
      </FadeIn>
      {recentPosts.length > 0 && (
        <FadeIn delay={0.3}>
          <div className="mt-16">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">writing</h3>
              <Link
                className="text-muted-foreground text-sm hover:text-foreground"
                href="/blog"
              >
                all {allPosts.length} posts →
              </Link>
            </div>
            <div className="space-y-6 text-sm leading-relaxed">
              {groups.map((group) => (
                <div key={group.label}>
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
              ))}
            </div>
          </div>
        </FadeIn>
      )}
      <FadeIn delay={0.4}>
        <ExperienceSection projects={projects} />
      </FadeIn>
    </>
  );
}
