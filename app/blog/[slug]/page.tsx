import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogTextToSpeech } from "@/components/blog/BlogTextToSpeech";
import { PostDate } from "@/components/blog/PostDate";
import { PostTags } from "@/components/blog/PostTags";
import { ReadingTime } from "@/components/blog/ReadingTime";
import {
  TableOfContents,
  type TocHeading,
} from "@/components/blog/TableOfContents";
import { NotionRenderer } from "@/components/NotionRenderer";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { generateBlogMetadata } from "@/lib/metadata";
import {
  extractDescriptionFromBlocks,
  getBlogPost,
  getBlogPosts,
} from "@/lib/notion";
import { highlightCode } from "@/lib/shiki";

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
      <article>
        <FadeIn>
          <div className="mb-8 flex flex-col">
            <div className="flex flex-col items-start gap-4">
              <Button
                asChild
                className="!p-0 text-muted-foreground"
                variant="link"
              >
                <Link href={"/blog"}>
                  <ArrowLeft /> back to writing
                </Link>
              </Button>
              <h3 className="mb-2 font-semibold">{post.title}</h3>
              {post.description && (
                <p className="text-muted-foreground text-xl">
                  {post.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <PostDate date={post.date} />
              <ReadingTime minutes={post.readingTime} />
              <PostTags tags={post.tags} />
            </div>
          </div>
        </FadeIn>

        {post.cover && (
          <FadeIn delay={0.1}>
            <div className="relative mb-8 aspect-video overflow-hidden rounded-lg bg-muted">
              <img
                alt={post.title}
                className="h-full w-full object-cover"
                src={post.cover}
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
              headline: post.title,
              description: post.description,
              author: [
                {
                  "@type": "Person",
                  name: "Jia Wei Ng",
                  url: "https://jiaweing.com",
                },
              ],
              datePublished: post.date,
              dateModified: post.date,
              image: post.cover ? [post.cover] : undefined,
            }),
          }}
          type="application/ld+json"
        />
      </article>
    </div>
  );
}
