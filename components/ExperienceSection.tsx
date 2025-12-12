import { PastSection } from "@/components/experience/PastSection";
import { PresentSection } from "@/components/experience/PresentSection";
import { Project } from "@/lib/notion";

interface ExperienceSectionProps {
  projects?: Project[];
}

export function ExperienceSection({ projects }: ExperienceSectionProps) {
  return (
    <div className="mx-auto my-8 mt-14 space-y-6">
      {/* Present section appears immediately */}
      <div className="mb-6">
        <PresentSection />
      </div>

      {/* Past section appears when scrolled into view */}
      <div className="mb-6">
        <PastSection />
      </div>
    </div>
  );
}