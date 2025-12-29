import { OpenSourceSection } from "@/components/experience/OpenSourceSection";
import { FadeIn } from "@/components/ui/fade-in";
import { generateMetadata } from "@/lib/metadata";

export const metadata = generateMetadata({
  title: "Open Source",
  description: "My contributions to open source projects.",
  url: "/oss",
});

export const revalidate = 3600;

export default async function OpenSourcePage() {
  return (
    <div className="space-y-8">
      <FadeIn>
        <h3 className="mb-2 font-semibold">open source</h3>
      </FadeIn>

      <FadeIn delay={0.1}>
        <OpenSourceSection />
      </FadeIn>
    </div>
  );
}
