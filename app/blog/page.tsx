import { BlogPostList } from "@/components/blog/BlogPostList";
import { getBlogPosts } from "@/lib/content";
import { generateMetadata } from "@/lib/metadata";

export const revalidate = 3600;

export const metadata = generateMetadata({
  title: "Blog",
  description: "Thoughts on software engineering, design, and technology.",
  url: "/blog",
});

export default async function BlogPage() {
  const allPosts = await getBlogPosts();

  return <BlogPostList allPosts={allPosts} ssrGeneratedAt={Date.now()} />;
}
