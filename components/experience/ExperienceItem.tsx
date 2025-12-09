import { Favicon } from "@/components/ui/Favicon";
import Link from "next/link";

export type ExperienceItemType = {
  title: string;
  organization: string;
  url: string;
  description: string;
  invertFavicon?: boolean | "light" | "dark" | "always";
  hideFavicon?: boolean;
  image?: string;
};

export function ExperienceItem({ item }: { item: ExperienceItemType }) {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between md:gap-2 leading-relaxed">
      <div className="flex items-center gap-1 min-w-0">
        {item.title && (
          <span className="whitespace-nowrap">{item.title} @</span>
        )}
        {item.url ? (
          <Link
            href={item.url}
            className="text-blue-500 dark:text-sky-500 truncate"
            target={item.url.startsWith("http") ? "_blank" : "_self"}
          >
            <Favicon
              url={item.url}
              invert={item.invertFavicon}
              hide={item.hideFavicon}
            />
            {item.organization}
          </Link>
        ) : (
          <span className="text-muted-foreground truncate">
            {item.organization}
          </span>
        )}
      </div>
      <span className="text-muted-foreground text-sm md:text-right md:max-w-xs shrink-0">
        {item.description}
      </span>
    </div>
  );
}
