import { BlogPostList } from "@/components/blog/BlogPostList";
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

  return <BlogPostList posts={posts} />;
}
