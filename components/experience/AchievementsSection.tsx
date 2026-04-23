import Link from "next/link";
import { Favicon } from "@/components/ui/Favicon";
import profileData from "@/data/profile.json";
import { cn } from "@/lib/utils";
import type { ExperienceItemType } from "./ExperienceItem";

function TrophyCard({ item }: { item: ExperienceItemType }) {
  const inner = (
    <div className="flex h-full flex-col gap-0.5 rounded-sm px-2 py-2 transition-colors duration-150 hover:bg-muted/50">
      <div className="h-10 w-10 shrink-0">
        {item.image ? (
          <div className="h-full w-full p-1.5">
            <img
              alt={item.organization}
              className={cn(
                "h-full w-full rounded-sm object-contain",
                item.invertImage === "dark" && "dark:invert",
                item.invertImage === "light" && "invert dark:invert-0",
                item.invertImage === "always" && "invert"
              )}
              src={item.image}
            />
          </div>
        ) : (
          <div className="h-full w-full rounded-sm p-1.5">
            <Favicon
              className="h-full w-full text-sm"
              fallback={item.organization.charAt(0)}
              hide={item.hideFavicon}
              invert={item.invertFavicon}
              url={item.url}
            />
          </div>
        )}
      </div>
      <span className="font-medium leading-relaxed dark:text-white">
        {item.organization}
      </span>
      {item.description && (
        <span className="text-muted-foreground/80 text-sm leading-relaxed dark:text-muted-foreground/70">
          {item.description}
        </span>
      )}
    </div>
  );

  if (item.url) {
    return (
      <Link
        className="block h-full"
        href={item.url as any}
        target={item.url.startsWith("http") ? "_blank" : "_self"}
      >
        {inner}
      </Link>
    );
  }

  return inner;
}

export function AchievementsSection() {
  const achievements =
    profileData.achievements as unknown as ExperienceItemType[];

  const rows: ExperienceItemType[][] = [];
  for (let i = 0; i < achievements.length; i += 2) {
    rows.push(achievements.slice(i, i + 2));
  }

  return (
    <div>
      <h3 className="mb-2 font-semibold">achievements</h3>
      <div className="overflow-hidden rounded-lg text-sm leading-relaxed">
        {rows.map((row, rowIdx) => (
          <div className="grid grid-cols-2" key={rowIdx}>
            {row.map((item, i) => (
              <TrophyCard item={item} key={i} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
