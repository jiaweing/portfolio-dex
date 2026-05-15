import { GrowthChart } from "@/components/growth/GrowthChart";
import { GrowthDashboard } from "@/components/growth/GrowthDashboard";
import { FadeIn } from "@/components/ui/fade-in";
import { socialGrowthData } from "@/data/social-growth";
import { generateMetadata } from "@/lib/metadata";
import { getProjects } from "@/lib/notion";

export const metadata = generateMetadata({
  title: "Analytics",
  description:
    "Building in public from zero — daily follower growth across YouTube, Twitch, TikTok, Instagram, Threads, and X.",
  url: "/analytics",
});

export default async function AnalyticsPage() {
  const allProjects = await getProjects();
  const currentProjects = allProjects.filter((p) => {
    const t = p.title.toLowerCase();
    if (
      t.includes("update night agent") ||
      t.includes("updatenight agent") ||
      t.includes("update night podcast") ||
      t.includes("updatenight podcast")
    )
      return false;
    return (
      t.includes("backstage") ||
      t.includes("update night") ||
      t.includes("updatenight")
    );
  });

  return (
    <FadeIn>
      <div className="space-y-10 pb-10">
        <div className="mx-auto max-w-2xl px-6">
          <GrowthDashboard projects={currentProjects} />
        </div>

        <div>
          <GrowthChart data={socialGrowthData} />
        </div>
      </div>
    </FadeIn>
  );
}
