import profileData from "@/data/profile.json";
import { ExperienceItem, type ExperienceItemType } from "./ExperienceItem";

export function AchievementsSection() {
  return (
    <div>
      <h3 className="mb-2 font-semibold">achievements</h3>
      <div className="text-sm leading-relaxed">
        {(profileData.achievements as unknown as ExperienceItemType[]).map(
          (item, index) => (
            <ExperienceItem item={item} key={index} />
          )
        )}
      </div>
    </div>
  );
}
