import profileData from "@/data/profile.json";
import { ExperienceItem, ExperienceItemType } from "./ExperienceItem";

export function PastSection() {
  return (
    <div>
      <h3 className="font-semibold mb-2">past</h3>
      <div className="space-y-3 md:space-y-1.5 text-sm leading-relaxed">
        {(profileData.past as unknown as ExperienceItemType[]).map(
          (item, index) => (
            <ExperienceItem key={index} item={item} />
          )
        )}
      </div>
    </div>
  );
}
