import { ContributionsBanner } from "@/components/ContributionsBanner";
import { getCachedContributions } from "@/lib/get-cached-contributions";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "GitHub Contributions",
  description: "A full view of my GitHub contribution history.",
  url: "/contributions",
});

export default function ContributionsPage() {
  const contributions = getCachedContributions("jiaweing", "all");

  return (
    <div>
      <ContributionsBanner contributions={contributions} fullPage />
    </div>
  );
}
