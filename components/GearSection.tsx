"use client";
import Link from "next/link";
import { Favicon } from "@/components/ui/Favicon";
import profileData from "@/data/profile.json";

type GearItem = {
  name: string;
  description: string;
  url: string;
  category: string;
  invertFavicon?: boolean | "light" | "dark" | "always";
  hideFavicon?: boolean;
};

export function GearSection() {
  return (
    <div>
      <h3 className="mb-2 font-semibold">setup & gear</h3>
      <div className="space-y-1 text-sm leading-relaxed">
        {profileData.gear &&
          (profileData.gear as unknown as GearItem[]).map((item, index) => (
            <GearListItem item={item} key={index} />
          ))}
      </div>
    </div>
  );
}

function GearListItem({ item }: { item: GearItem }) {
  return (
    <p className="leading-relaxed">
      {item.url && item.url !== "#" ? (
        <Link
          className="text-blue-500 dark:text-sky-500"
          href={item.url as any}
          target="_blank"
        >
          <Favicon
            hide={item.hideFavicon}
            invert={item.invertFavicon}
            url={item.url}
          />
          {item.name}
        </Link>
      ) : (
        <span className="text-muted-foreground">{item.name}</span>
      )}{" "}
      <span className="text-muted-foreground">· {item.description}</span>
    </p>
  );
}
