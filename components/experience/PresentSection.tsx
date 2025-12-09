import profileData from "@/data/profile.json";
import { ExperienceItem, ExperienceItemType } from "./ExperienceItem";

export function PresentSection() {
  return (
    <div>
      <h3 className="font-semibold mb-2">present</h3>
      <div className="space-y-3 md:space-y-1.5 text-sm leading-relaxed">
        {(profileData.present as unknown as ExperienceItemType[]).map(
          (item, index) => (
            <ExperienceItem key={index} item={item} />
          )
        )}
      </div>
    </div>
  );
}
