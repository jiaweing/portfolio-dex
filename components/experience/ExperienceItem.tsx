import Link from "next/link";
import { Favicon } from "@/components/ui/Favicon";

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
    <div className="flex flex-col leading-relaxed md:flex-row md:items-center md:gap-2">
      <div className="flex min-w-0 shrink-0 items-center gap-1">
        {item.title && (
          <span className="whitespace-nowrap">{item.title} @</span>
        )}
        {item.url ? (
          <Link
            className="truncate text-blue-500 dark:text-sky-500"
            href={item.url as any}
            target={item.url.startsWith("http") ? "_blank" : "_self"}
          >
            <Favicon
              hide={item.hideFavicon}
              invert={item.invertFavicon}
              url={item.url}
            />
            {item.organization}
          </Link>
        ) : (
          <span className="truncate text-muted-foreground">
            {item.organization}
          </span>
        )}
      </div>
      <span className="text-muted-foreground text-xs md:max-w-md">
        {item.description}
      </span>
    </div>
  );
}
