import { ArrowLeft } from "lucide-react";
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
  const { post, blocks } = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

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
