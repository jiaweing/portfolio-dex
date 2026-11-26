import type { SocialSeries } from "@/components/wrapped-2026/socials-section";
import { Wrapped2026 } from "@/components/wrapped-2026/wrapped-2026";
import contributionsSnapshot from "@/data/contributions-2026.json";
import { socialGrowthData } from "@/data/social-growth";
import { getBlogPosts } from "@/lib/content";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "2026 Wrapped",
  description:
    "I applied to 3,800 jobs and got 0 interviews, so I started my own company. My 2026.",
  url: "/2026",
});

export const revalidate = 86_400;

const YEAR = "2026";

// Twitch is left out: its scraped follower count jumps to a flat 6,000 in
// August, which is a scraper glitch, not growth
const PLATFORMS: Omit<SocialSeries, "values">[] = [
  { key: "youtube", label: "YouTube", color: "#ff3b3b" },
  { key: "threads", label: "Threads", color: "#e5e5e5" },
  { key: "x", label: "X", color: "#38bdf8" },
  { key: "instagram", label: "Instagram", color: "#f97316" },
  { key: "tiktok", label: "TikTok", color: "#ec4899" },
];

export default async function Wrapped2026Page() {
  const [contributions, allPosts] = await Promise.all([
    getCachedContributions("jiaweing", YEAR),
    getBlogPosts(),
  ]);

  // The contributions API rate limits during builds. Fall back to the
  // calendar saved on 27 Nov 2026 so the heatmap is never empty.
  const live = contributions.filter((d) => d.date.startsWith(YEAR));
  const days = live.length > 0 ? live : contributionsSnapshot;

  const yearPosts = allPosts.filter((p) => p.date?.startsWith(YEAR));
  const perMonth = Array.from({ length: 12 }, () => 0);
  for (const p of yearPosts) {
    perMonth[Number(p.date.slice(5, 7)) - 1]++;
  }
  // Every 7th post keeps the scrolling columns varied without shipping 800+ titles
  const posts = yearPosts
    .filter((_, i) => i % 7 === 0)
    .slice(0, 90)
    .map((p) => ({ title: p.title, slug: p.slug }));

  // One point a week is plenty for a sparkline
  const snapshots = socialGrowthData.filter(
    (_s, i, all) => i % 7 === 0 || i === all.length - 1
  );
  const social: SocialSeries[] = PLATFORMS.map((p) => ({
    ...p,
    values: snapshots.map((s) => s[p.key]),
  }));
  const first = socialGrowthData[0]?.date ?? `${YEAR}-05-04`;
  const socialSince = new Date(`${first}T00:00:00Z`).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      timeZone: "UTC",
    }
  );

  return (
    <Wrapped2026
      days={days}
      perMonth={perMonth}
      posts={posts}
      postTotal={yearPosts.length}
      social={social}
      socialSince={socialSince}
    />
  );
}
