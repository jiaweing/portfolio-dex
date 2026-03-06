import { PastSection } from "@/components/experience/PastSection";
import { PresentSection } from "@/components/experience/PresentSection";
import type { Project } from "@/lib/notion";

interface ExperienceSectionProps {
  projects?: Project[];
}

export function ExperienceSection({ projects }: ExperienceSectionProps) {
  return (
    <div className="mx-auto my-8 mt-6 space-y-6">
      <PresentSection />
      <PastSection />
    </div>
  );
}
