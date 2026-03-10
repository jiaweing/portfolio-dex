import { Radio } from "lucide-react";
import Link from "next/link";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { FadeIn } from "@/components/ui/fade-in";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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



  return (
    <>
      <FadeIn>
        <div className="mb-4 flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <h3 className="font-semibold">writing</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    aria-label="RSS feed"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    href="/feed.xml"
                  >
                    <Radio className="h-4 w-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Subscribe to my RSS feed to get new posts in your reader
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <h3 className="font-semibold text-muted-foreground">
            about life, psychology, business, tech and AI
          </h3>
        </div>
      </FadeIn>
      <FadeIn delay={0.05}>
        <BlogPostList posts={posts} />
      </FadeIn>
    </>
  );
}
