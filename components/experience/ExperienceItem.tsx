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
  invertImage?: "light" | "dark" | "always";
};

export function ExperienceItem({ item }: { item: ExperienceItemType }) {
  const inner = (
    <>
      <div className="h-10 w-10 shrink-0">
        {item.image ? (
          <div className="h-full w-full p-1.5">
            <img
              alt={item.organization}
              className={`h-full w-full rounded-sm object-contain${
                item.invertImage === "dark"
                  ? "dark:invert"
                  : item.invertImage === "light"
                    ? "invert dark:invert-0"
                    : item.invertImage === "always"
                      ? "invert"
                      : ""
              }`}
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
      <div className="flex min-w-0 flex-col gap-0.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="shrink-0 font-medium leading-relaxed dark:text-white">
            {item.organization}
          </span>
          {item.title && (
            <span className="shrink-0 whitespace-nowrap rounded-full bg-muted px-2 text-xs leading-relaxed">
              {item.title}
            </span>
          )}
        </div>
        {item.description && (
          <span className="text-muted-foreground/80 text-sm leading-relaxed dark:text-muted-foreground/70">
            {item.description}
          </span>
        )}
      </div>
    </>
  );

  if (item.url) {
    return (
      <Link
        className="-mx-2 flex min-w-0 items-center gap-3 rounded-sm px-2 py-2 transition-colors duration-150 hover:bg-muted/50"
        href={item.url as any}
        target={item.url.startsWith("http") ? "_blank" : "_self"}
      >
        {inner}
      </Link>
    );
  }

  return <div className="flex min-w-0 items-center gap-3 py-2">{inner}</div>;
}
