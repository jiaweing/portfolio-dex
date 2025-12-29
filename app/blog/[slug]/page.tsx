import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostDate } from "@/components/blog/PostDate";
import { PostTags } from "@/components/blog/PostTags";
import { NotionRenderer } from "@/components/NotionRenderer";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/fade-in";
import { generateBlogMetadata } from "@/lib/metadata";
import { getBlogPost, getBlogPosts } from "@/lib/notion";

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
  const { post } = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return generateBlogMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const { post, blocks } = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
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
                <ArrowLeft /> back to blog
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

      <FadeIn delay={0.2}>
        <NotionRenderer blocks={blocks} />
      </FadeIn>

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
  );
}
