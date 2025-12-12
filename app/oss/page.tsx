import { OpenSourceSection } from "@/components/experience/OpenSourceSection";
import { FadeIn } from "@/components/ui/fade-in";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Source",
  description: "My contributions to open source projects.",
};

export const revalidate = 3600;

export default async function OpenSourcePage() {
  return (
    <div className="space-y-8">
      <FadeIn>
        <h3 className="font-semibold mb-2">open source</h3>
      </FadeIn>

      <FadeIn delay={0.1}>
        <OpenSourceSection />
      </FadeIn>
    </div>
  );
}