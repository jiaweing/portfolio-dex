import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogLLMMenu } from "@/components/blog/BlogLLMMenu";
import { BlogTextToSpeech } from "@/components/blog/BlogTextToSpeech";
import { MobileTocSheet } from "@/components/blog/MobileTocSheet";
import { PostDate } from "@/components/blog/PostDate";
import { ReadingTime } from "@/components/blog/ReadingTime";
import {
  TableOfContents,
  type TocHeading,
} from "@/components/blog/TableOfContents";
import { ScrollProgress } from "@/components/core/scroll-progress";
import { NotionRenderer } from "@/components/NotionRenderer";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createBlogMarkdown } from "@/lib/blog-markdown";
import { generateBlogMetadata, siteConfig } from "@/lib/metadata";
import {
  extractDescriptionFromBlocks,
  getBlogPost,
  getBlogPosts,
} from "@/lib/notion";
import { highlightCode } from "@/lib/shiki";
import { getTagColorClass } from "@/lib/tag-colors";
import { cn } from "@/lib/utils";

export const revalidate = 3600;

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { post, blocks } = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const description = post.description || extractDescriptionFromBlocks(blocks);
  return generateBlogMetadata({ ...post, description });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [{ post, blocks }, allPosts] = await Promise.all([
    getBlogPost(slug),
    getBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const postTagCounts: Record<string, number> = {};
  for (const p of allPosts) {
    for (const tag of p.postTags ?? []) {
      postTagCounts[tag] = (postTagCounts[tag] ?? 0) + 1;
    }
  }

  // Sort posts by date descending (same order as blog list)
  const sortedPosts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const currentIndex = sortedPosts.findIndex((p) => p.slug === post.slug);
  const prevPost =
    currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;

  // Relevant posts: share postTags or category, exclude current, top 3 by overlap score
  const relevantPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      const sharedPostTags = (p.postTags ?? []).filter((t) =>
        post.postTags?.includes(t)
      ).length;
      const sharedTags = (p.tags ?? []).filter((t) =>
        post.tags?.includes(t)
      ).length;
      return { post: p, score: sharedPostTags * 2 + sharedTags };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ post: p }) => p);

  const highlightedCodeMap: Record<string, string> = {};
  await Promise.all(
    blocks
      .filter((b) => b.type === "code")
      .map(async (block) => {
        const b = block as Extract<typeof block, { type: "code" }>;
        const code = b.code.rich_text.map((t) => t.plain_text).join("");
        const html = await highlightCode(code, b.code.language);
        if (html) highlightedCodeMap[block.id] = html;
      })
  );

  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  const postMarkdown = createBlogMarkdown({
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
    url: postUrl,
    blocks,
  });

  const headings: TocHeading[] = blocks
    .filter(
      (
        b
      ): b is Extract<
        typeof b,
        { type: "heading_1" | "heading_2" | "heading_3" }
      > =>
        b.type === "heading_1" ||
        b.type === "heading_2" ||
        b.type === "heading_3"
    )
    .map((b) => {
      if (b.type === "heading_1")
        return {
          id: b.id,
          text: b.heading_1.rich_text.map((t) => t.plain_text).join(""),
          level: 1 as const,
        };
      if (b.type === "heading_2")
        return {
          id: b.id,
          text: b.heading_2.rich_text.map((t) => t.plain_text).join(""),
          level: 2 as const,
        };
      return {
        id: b.id,
        text: b.heading_3.rich_text.map((t) => t.plain_text).join(""),
        level: 3 as const,
      };
    })
    .filter((h) => h.text.length > 0);

  return (
    <div className="relative">
      <ScrollProgress className="fixed top-0 left-0 z-50 w-full bg-[#0090FF]" />
      {headings.length > 0 && (
        <div className="fixed top-1/2 right-0 z-50 hidden w-64 -translate-y-1/2 xl:block">
          <TableOfContents headings={headings} />
        </div>
      )}
      {headings.length > 0 && <MobileTocSheet headings={headings} />}
      <article>
        <FadeIn>
          <div className="mb-8 flex flex-col">
            <div className="flex flex-col items-start gap-4">
              <div className="flex w-full items-start justify-between gap-3">
                <Button
                  className="!p-0 text-muted-foreground"
                  render={
                    <Link className="flex items-center gap-1" href="/blog" />
                  }
                  variant="link"
                >
                  <ArrowLeft /> back to writing
                </Button>
                <BlogLLMMenu
                  postMarkdown={postMarkdown}
                  postTitle={post.title}
                  postUrl={postUrl}
                />
              </div>

              <div className="mb-2 flex items-center gap-2">
                <h1 className="font-semibold">{post.title}</h1>
                {post.tags && post.tags.length > 0 && (
                  <TooltipProvider>
                    <div className="flex items-center gap-1.5">
                      {post.tags.map((tag) => (
                        <Tooltip key={`${post.id}-${tag}`}>
                          <TooltipTrigger asChild>
                            <span
                              className={cn(
                                "inline-flex h-2 w-2 shrink-0 rounded-full",
                                getTagColorClass(tag, post.tagColors?.[tag])
                              )}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="capitalize">{tag}</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </TooltipProvider>
                )}
              </div>
              {post.description && (
                <p className="text-muted-foreground text-xl">
                  {post.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <PostDate date={post.date} />
              <ReadingTime minutes={post.readingTime} />
            </div>
          </div>
        </FadeIn>

        {post.cover && (
          <FadeIn delay={0.1}>
            <div className="relative mb-8 aspect-video overflow-hidden rounded-lg bg-muted">
              <img
                alt={post.title}
                className="h-full w-full object-cover"
                src={`/api/notion-image?pageId=${post.id}&prop=cover`}
              />
            </div>
          </FadeIn>
        )}

        <BlogTextToSpeech blocks={blocks}>
          <FadeIn delay={0.2}>
            <NotionRenderer
              blocks={blocks}
              highlightedCodeMap={highlightedCodeMap}
            />
          </FadeIn>
        </BlogTextToSpeech>

        <FadeIn delay={0.3}>
          <div className="mt-16 space-y-8 text-sm">
            {post.postTags && post.postTags.length > 0 && (
              <div className="flex flex-wrap gap-3 text-muted-foreground">
                {post.postTags.map((tag) => (
                  <Link
                    className="transition-colors hover:text-foreground"
                    href={`/blog?tags=${encodeURIComponent(tag)}`}
                    key={tag}
                  >
                    {tag}
                    {postTagCounts[tag] && (
                      <span className="ml-1 text-muted-foreground/40">
                        {postTagCounts[tag]}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}

            {(prevPost || nextPost) && (
              <div className="flex w-full items-center justify-between gap-4 text-muted-foreground">
                {prevPost ? (
                  <Link
                    className="flex min-w-0 items-center gap-1.5 transition-colors hover:text-foreground"
                    href={`/blog/${prevPost.slug}`}
                  >
                    <ArrowLeft className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{prevPost.title}</span>
                  </Link>
                ) : (
                  <span />
                )}
                {nextPost && (
                  <Link
                    className="flex min-w-0 items-center gap-1.5 transition-colors hover:text-foreground"
                    href={`/blog/${nextPost.slug}`}
                  >
                    <span className="truncate text-right">
                      {nextPost.title}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                  </Link>
                )}
              </div>
            )}

            {relevantPosts.length > 0 && (
              <div className="pt-2">
                <p className="mb-3 font-medium text-muted-foreground text-xs">
                  You might also enjoy
                </p>
                <TooltipProvider>
                  <div className="group/list space-y-1">
                    {relevantPosts.map((p) => (
                      <article
                        className="group hover:!opacity-100 relative flex items-center justify-between gap-2 transition-opacity duration-300 group-hover/list:opacity-40"
                        key={p.id}
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          {p.date && (
                            <time
                              className="flex h-6 w-6 shrink-0 items-center justify-center rounded border font-medium text-muted-foreground text-xs tabular-nums"
                              dateTime={p.date}
                            >
                              {new Date(p.date).getDate()}
                            </time>
                          )}
                          <Link
                            className="min-w-0 truncate leading-relaxed"
                            href={`/blog/${p.slug}`}
                          >
                            {p.title}
                          </Link>
                          {p.tags && p.tags.length > 0 && (
                            <div className="flex shrink-0 items-center gap-1">
                              {p.tags.map((tag) => (
                                <Tooltip key={`${p.id}-${tag}`}>
                                  <TooltipTrigger asChild>
                                    <span
                                      className={cn(
                                        "inline-flex h-1.5 w-1.5 shrink-0 rounded-full",
                                        getTagColorClass(
                                          tag,
                                          p.tagColors?.[tag]
                                        )
                                      )}
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <div className="flex flex-col gap-0.5">
                                      <p className="capitalize">{tag}</p>
                                      {p.postTags && p.postTags.length > 0 && (
                                        <p className="text-muted-foreground/70">
                                          {p.postTags.join(", ")}
                                        </p>
                                      )}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              ))}
                            </div>
                          )}
                        </div>
                        {p.date && (
                          <span className="shrink-0 text-muted-foreground/50 text-xs tabular-nums">
                            {new Date(p.date).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        )}
                      </article>
                    ))}
                  </div>
                </TooltipProvider>
              </div>
            )}
          </div>
        </FadeIn>

        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "@id": `${siteConfig.url}/blog/${post.slug}#article`,
              headline: post.title,
              ...(post.description ? { description: post.description } : {}),
              url: `${siteConfig.url}/blog/${post.slug}`,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${siteConfig.url}/blog/${post.slug}`,
              },
              author: [
                {
                  "@type": "Person",
                  "@id": "https://jiaweing.com/#person",
                  name: "Jia Wei Ng",
                  url: "https://jiaweing.com",
                },
              ],
              publisher: {
                "@type": "Person",
                "@id": "https://jiaweing.com/#person",
                name: "Jia Wei Ng",
                url: siteConfig.url,
              },
              datePublished: post.date,
              dateModified: post.lastEdited ?? post.date,
              inLanguage: "en-US",
              image: post.cover
                ? [
                    `${siteConfig.url}/api/notion-image?pageId=${post.id}&prop=cover`,
                  ]
                : undefined,
            }),
          }}
          type="application/ld+json"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: siteConfig.url,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Writing",
                  item: `${siteConfig.url}/blog`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.title,
                  item: `${siteConfig.url}/blog/${post.slug}`,
                },
              ],
            }),
          }}
          type="application/ld+json"
        />
      </article>
    </div>
  );
}
