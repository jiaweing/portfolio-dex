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
    <div className="flex items-center gap-2 md:gap-2">
      <div className="flex min-w-0 shrink flex-col gap-2.5 md:flex-row md:items-center">
        <div className="flex min-w-0 shrink-0 items-center gap-1">
          {item.url ? (
            <Link
              className="truncate"
              href={item.url as any}
              target={item.url.startsWith("http") ? "_blank" : "_self"}
            >
              <Favicon
                hide={item.hideFavicon}
                invert={item.invertFavicon}
                url={item.url}
              />
              <span className="border-muted-foreground/40 border-b border-dashed font-medium leading-relaxed transition-colors duration-300 hover:border-foreground dark:text-white">
                {item.organization}
              </span>
            </Link>
          ) : (
            <span className="truncate text-muted-foreground leading-relaxed">
              {item.organization}
            </span>
          )}
        </div>
        {item.description && (
          <>
            {/* <span className="text-muted-foreground">&bull;</span> */}
            <span className="text-muted-foreground/80 leading-relaxed dark:text-muted-foreground/70">
              {item.description}
            </span>
          </>
        )}
      </div>
      {item.title && (
        <span className="shrink-0 whitespace-nowrap rounded-full border border-muted/50 px-2 text-xs leading-relaxed">
          {item.title}
        </span>
      )}
    </div>
  );
}
