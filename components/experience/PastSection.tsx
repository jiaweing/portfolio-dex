import profileData from "@/data/profile.json";
import { ExperienceItem, type ExperienceItemType } from "./ExperienceItem";

export function PastSection() {
  return (
    <div>
      <h3 className="mb-2 font-semibold">past</h3>
      <div className="space-y-3 text-sm leading-relaxed md:space-y-1.5">
        {(profileData.past as unknown as ExperienceItemType[]).map(
          (item, index) => (
            <ExperienceItem item={item} key={index} />
          )
        )}
      </div>
    </div>
  );
}
