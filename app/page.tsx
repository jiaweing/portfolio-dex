import { formatDate } from "date-fns";
import { Radio } from "lucide-react";
import Link from "next/link";
import { AppDeck } from "@/components/AppDeck";
import { PostTags } from "@/components/blog/PostTags";
import { ContributionsBanner } from "@/components/ContributionsBanner";
import { ExperienceSection } from "@/components/ExperienceSection";
import { BuiltInPublicBanner } from "@/components/growth/BuiltInPublicBanner";
import { ProfileBio } from "@/components/ProfileBio";
import { StatsBento } from "@/components/StatsBento";
import { FadeIn } from "@/components/ui/fade-in";
import { PhotoGallery } from "@/components/ui/gallery";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import { generateMetadata } from "@/lib/metadata";
import { getBlogPosts, getProjects } from "@/lib/notion";

export const metadata = generateMetadata({
  title: "a founder, designer & engineer",
  description:
    "Just an ordinary guy who makes software, with unique and original digital experiences.",
  url: "/",
});

export default async function Home() {
  const contributions = getCachedContributions("jiaweing");
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
      <h1 className="sr-only">Jia Wei Ng</h1>
      <p className="sr-only">
        Jia Wei Ng (Jay) is a Singapore-based founder, software engineer, and
        designer. He is CEO of amajor.ai, building AI agent products including
        ryu, a consumer AI assistant launching in 2026. He also founded
        supply.tf (streetwear), hosts the Update Night podcast, and previously
        built titan.tf which reached 470,000 unique players and 10,000 monthly
        active users. Awards: Google APAC Solution Challenge 2025 Top 1
        Singapore, two-time Dell Cloud Native Award winner (1st place), Dell
        Innovatefest 2025 finalist (featured in Business Times), GovTech ×
        OpenAI Hackathon 2024 top 10%. BSc Computing Science, University of
        Glasgow / Singapore Institute of Technology.
      </p>
      {/* Banner is absolute — sits in background, doesn't push content */}
      <div className="relative">
        <ContributionsBanner contributions={contributions} />
        <div className="relative z-10">
          <BuiltInPublicBanner />
          <ProfileBio />
          <FadeIn delay={0.2}>
            <div className="mt-16">
              <PhotoGallery />
            </div>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="mt-12">
              <AppDeck projects={projects} />
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-16">
              <h3 className="mb-4 font-semibold">at a glance</h3>
              <StatsBento />
            </div>
          </FadeIn>
          {recentPosts.length > 0 && (
            <FadeIn delay={0.3}>
              <div className="mt-16">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
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
                            Subscribe to my RSS feed to get new posts in your
                            reader
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
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
                            className="group relative flex"
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
                                className="min-w-0 truncate font-medium text-foreground leading-relaxed"
                                href={`/blog/${post.slug}`}
                              >
                                {post.title}
                              </Link>
                              <PostTags
                                tagColors={post.tagColors}
                                tags={post.tags}
                              />
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
        </div>
      </div>
    </>
  );
}
